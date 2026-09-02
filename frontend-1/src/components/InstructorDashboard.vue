const stats = ref({
  buckets: [] as number[],
  milestone_submission_stats: [] as number[],
});

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
    );

    if (projectResponse.ok) {
      const projectData = await projectResponse.json();

      total_milestones.value = projectData.total_milestones;
      total_students.value = projectData.total_students;
      average_completion_rate.value = projectData.average_completion_rate;

      stats.value.buckets = projectData.buckets;
      stats.value.milestone_submission_stats =
        projectData.milestone_submission_stats;
    }

    renderCharts(
      stats.value.buckets,
      stats.value.milestone_submission_stats
    );
  } catch (error) {
    console.error('Error fetching chart data:', error);
  }
};

const renderCharts = (
  buckets: number[],
  milestone_submission_stats: number[]
) => {
  renderHistogram(buckets);
  renderMilestonePieChart(milestone_submission_stats);
};

const renderHistogram = (buckets: number[]) => {
  // ...
};

const renderMilestonePieChart = (
  milestone_submission_stats: number[]
) => {
  // ...
};
