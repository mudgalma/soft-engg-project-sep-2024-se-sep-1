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
      `${import.meta.env.VITE_API_URL}/projects/statistics/` +
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
      average_completion_rate.value = projectData.average_completion_rate
      stats.value = projectData
    } else {
      console.error('Failed to fetch chart data.', await projectResponse.text())
    }
  } catch (error) {
    console.error('Error fetching chart data:', error)
  }
}

onMounted(() => {
  fetchChartData()
})
</script>
