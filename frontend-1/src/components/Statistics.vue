<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const chart1Data = ref(null);
const chart2Data = ref(null);
const chart3Data = ref(null);
const chart4Data = ref(null);

const fetchData = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/dashboard/statistics`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      chart1Data.value = data.chart1;
      chart2Data.value = data.chart2;
      chart3Data.value = data.chart3;
      chart4Data.value = data.chart4;

      renderCharts();
    } else {
      console.error(
        'Failed to fetch chart data.',
        await response.text()
      );
    }
  } catch (error) {
    console.error('Error fetching chart data:', error);
  }
};

const renderCharts = () => {
