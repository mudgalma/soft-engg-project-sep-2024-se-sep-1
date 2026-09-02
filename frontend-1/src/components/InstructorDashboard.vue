<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'
import StatisticsCard from '../components/StatisticsCard.vue'

const props = defineProps({
  project_id: Number,
})

const total_milestones = ref(0)
const total_students = ref(0)
const average_completion_rate = ref(0)

const stats = ref({
  buckets: [] as number[],
  milestone_submission_stats: [] as number[],
})

const fetchChartData = async () => {
  try {
    const projectResponse = await fetch(
      `http://localhost:5000/projects/statistics/` +
      localStorage.getItem('user_id') +
      '/' +
      props.project_id,
      {
        headers: {
          'Authentication-Token': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (projectResponse.ok) {
      const projectData = await projectResponse.json()

      total_milestones.value = projectData.total_milestones
      total_students.value = projectData.total_students
      average_completion_rate.value =
        projectData.average_completion_rate

      stats.value.buckets = projectData.buckets
      stats.value.milestone_submission_stats =
        projectData.milestone_submission_stats
    }

    renderCharts(
      stats.value.buckets,
      stats.value.milestone_submission_stats
    )
  } catch (error) {
    console.error('Error fetching chart data:', error)
  }
}

const renderCharts = (
  buckets: number[],
  milestone_submission_stats: number[]
) => {
  renderHistogram(buckets)
  renderMilestonePieChart(milestone_submission_stats)
}

const renderHistogram = (buckets: number[]) => {
  const ctx = document.getElementById(
    'milestoneCompletionRate'
  ) as HTMLCanvasElement

  if (!ctx) return

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        '0-20%',
        '20-40%',
        '40-60%',
        '60-80%',
        '80-100%',
      ],
      datasets: [
        {
          label: 'Milestones',
          data: buckets,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Milestone Completion Rate',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Milestones',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Milestone Completion Rate Distribution',
        },
      },
    },
  })
}

const renderMilestonePieChart = (
  milestone_submission_stats: number[]
) => {
  const ctx = document.getElementById(
    'submissionDistribution'
  ) as HTMLCanvasElement

  if (!ctx) return

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['On Time', 'Late', 'Early'],
      datasets: [
        {
          data: milestone_submission_stats,
          backgroundColor: [
            '#2196f3',
            '#f44336',
            '#4caf50',
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Milestone Submission Stats',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
  })
}

onMounted(() => {
  fetchChartData()
})
</script>

<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="pt-3 pb-2 mb-3 border-bottom">
      <h1>Instructor Dashboard</h1>
    </div>

    <div class="row mb-4">
      <div class="col-md-4">
        <StatisticsCard
          title="Total Students"
          :value="total_students"
          type="primary"
        />
      </div>

      <div class="col-md-4">
        <StatisticsCard
          title="Total Milestones"
          :value="total_milestones"
          type="success"
        />
      </div>

      <div class="col-md-4">
        <StatisticsCard
          title="Average Completion Rate"
          :value="average_completion_rate"
          type="warning"
        />
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-6 d-flex justify-content-center">
        <canvas id="milestoneCompletionRate"></canvas>
      </div>

      <div class="col-md-6 d-flex justify-content-center">
        <canvas id="submissionDistribution"></canvas>
      </div>
    </div>
  </main>
</template>
