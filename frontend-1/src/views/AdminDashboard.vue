<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Chart from 'chart.js/auto'
import StatisticsCard from '../components/StatisticsCard.vue'

const stats = ref({
  daily_submissions: [] as any[],
  milestone_submission_stats: [] as number[],
  milestone_density: [] as any[],
})

const total_projects = ref(0)
const milestones_due_this_week = ref(0)
const milestones_completed_this_week = ref(0)
const total_students = ref(0)

const router = useRouter()

const logout = () => {
  localStorage.clear()
  router.push('/')
}

// Fetch data for Completion Rate Chart
const fetchCompletionRate = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/dashboard/statistics`,
      {
        headers: {
          'Authentication-Token': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.ok) {
      const { data } = await response.json()

      total_projects.value = data.total_projects
      milestones_due_this_week.value = data.milestones_due_this_week
      milestones_completed_this_week.value = data.milestones_completed_this_week
      total_students.value = data.total_students
      stats.value = data
    } else {
      console.error('Failed to fetch chart data.', await response.text())
    }
  } catch (error) {
    console.error('Error fetching chart data:', error)
  }
}

onMounted(() => {
  fetchCompletionRate()
})
</script>
