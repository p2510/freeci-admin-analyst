<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { apiRoutes, baseUrl } from '../../utils/api.js'
import axios from 'axios'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const labels = ref([
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre'
])
let dataGFreelancer = ref([])
let chartDataGFreelancer = ref({
  labels: labels,
  datasets: [
    {
      label: "Courbe d'évolution Freelancer ",
      backgroundColor: '#354899',
      pointStyle: 'circle',
      pointRadius: 8,
      pointHoverRadius: 12,
      data: dataGFreelancer.value
    }
  ]
})
let chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false
})
let gFreelancer = () => {
  axios
    .get(apiRoutes['gfreelancer'])
    .then(function (response) {
      dataGFreelancer.value = response.data?.data
      loading.value = false
    })
    .catch(function (error) {
      // handle
    })
}

watch(dataGFreelancer, (newValue) => {
  chartDataGFreelancer.value.datasets[0].data = newValue
})

onMounted(() => {
  gFreelancer()
})
</script>

<template>
  <div class="h-60">
    <Line
      aria-label="Sales"
      aria-describedby="my-data-table"
      :id="'chart-id-' + 10"
      :options="chartOptions"
      :data="chartDataGFreelancer"
      v-if="dataGFreelancer.length > 0"
    />
  </div>
</template>
