<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { apiRoutes, baseUrl } from '../../utils/api.js'
import axios from 'axios'

import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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
      label: "Courbe d'évolution du CA ",
      backgroundColor: '#DC143C',
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
    .get(apiRoutes['gturnover'])
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
    <Bar
      aria-label="Sales"
      aria-describedby="my-data-table"
      :id="'chart-id-' + 10"
      :options="chartOptions"
      :data="chartDataGFreelancer"
      v-if="dataGFreelancer.length > 0"
    />
  </div>
</template>
