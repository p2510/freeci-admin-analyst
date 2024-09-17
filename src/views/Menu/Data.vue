<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { apiRoutes, baseUrl } from '../../utils/api.js'
import axios from 'axios'

let variants = ref([])
let loading = ref(true)
let loadingBtn = ref(false)
let selectedTime = ref('tous')
let start_at = ref()
let end_at = ref()

let getData = () => {
  axios
    .get(apiRoutes['analyst.variants'])
    .then(function (response) {
      variants.value = response.data
    })
    .catch(function (error) {
      // handle error
    })
}
watch(selectedTime, () => {
  if (selectedTime.value === 'today') {
    axios
      .get(apiRoutes['analyst.variants.today'])
      .then(function (response) {
        variants.value = response.data
        loading.value = false
      })
      .catch(function (error) {
        // handle error
        loading.value = true
      })
  } else {
    getData()
  }
})
let variantsByPeriod = () => {
  if (start_at.value && end_at.value) {
    axios
      .get(apiRoutes['analyst.variants.period'] + `/${start_at.value}` + `/${end_at.value}`)
      .then(function (response) {
        variants.value = response.data
        loading.value = false
      })
      .catch(function (error) {
        // handle error
        loading.value = true
      })
  }
}
onMounted(() => {
  getData()
})
</script>

<template>
  <main class="w-full mx-0 p-4 h-screen">
    <h3
      class="font-bold text-md sm:text-lg lg:text-xl text-black dark:text-white mb-6 flex justify-between items-center"
    >
      Les Variantes
    </h3>
    <div class="flex justify-start gap-6">
      <label>Par période</label>
      <select v-model="selectedTime" class="rounded-md px-2 bg-base1/90 text-white outline-0">
        <option value="tous">Tous</option>
        <option value="today">Aujourd'hui</option>
        <!-- Ajoutez d'autres options selon vos besoins -->
      </select>
      <label>Par Intervalle</label>
      <input
        type="date"
        v-model="start_at"
        class="rounded-md px-2 bg-base1/90 text-white outline-0"
      />
      <span>Au</span>
      <input
        type="date"
        v-model="end_at"
        class="rounded-md px-2 bg-base1/90 text-white outline-0"
      />
      <button
        type="button"
        class="rounded-md px-2 bg-slate-800/90 text-white outline-0"
        @click="variantsByPeriod"
      >
        Voir
      </button>
    </div>
    <div class="mt-4 grid grid-cols-12 gap-4">
      <div class="col-span-4 bg-slate-800 rounded-lg shadow-md p-4">
        <h4 class="text-white font-semibold text-2xl">Variantes Freelancers</h4>
        <ul class="mt-4 space-y-2">
          <li class="rounded-lg bg-zinc-600/40 flex justify-between p-2">
            <span class="font-medium text-lg text-slate-100">Nombre de freelancer</span>
            <span class="text-white bg-yellow-500/30 rounded-full flex items-center px-2">{{
              variants.countFreelancer
            }}</span>
          </li>
          <li class="rounded-lg bg-gray-600/40 flex justify-between p-2">
            <span class="font-medium text-lg text-slate-100">Achat d'abonnement</span>
            <span class="text-white bg-yellow-500/30 rounded-full flex items-center px-2">{{
              variants.countSubscription
            }}</span>
          </li>
        </ul>
      </div>
      <div class="col-span-4 bg-slate-800 rounded-lg shadow-md p-4">
        <h4 class="text-white font-semibold text-2xl">Variantes Projets</h4>
        <ul class="mt-4 space-y-2">
          <li class="rounded-lg bg-zinc-600/40 flex justify-between p-2">
            <span class="font-medium text-lg text-slate-100">Nombre de mission</span>
            <span class="text-white bg-yellow-500/30 rounded-full flex items-center px-2">{{
              variants.countMission
            }}</span>
          </li>
          <li class="rounded-lg bg-gray-600/40 flex justify-between p-2">
            <span class="font-medium text-lg text-slate-100">Nombre de contrat</span>
            <span class="text-white bg-yellow-500/30 rounded-full flex items-center px-2">{{
              variants.countContract
            }}</span>
          </li>
        </ul>
      </div>
      <div class="col-span-4 bg-slate-800 rounded-lg shadow-md p-4">
        <h4 class="text-white font-semibold text-2xl">Variantes Postulats</h4>
        <ul class="mt-4 space-y-2">
          <li class="rounded-lg bg-gray-600/40 flex justify-between p-2">
            <span class="font-medium text-lg text-slate-100">Candidature Mission</span>
            <span class="text-white bg-yellow-500/30 rounded-full flex items-center px-2">{{
              variants.countMissionApplicant
            }}</span>
          </li>
          <li class="rounded-lg bg-stone-600/40 flex justify-between p-2">
            <span class="font-medium text-lg text-slate-100">Candidature Contrat</span>
            <span class="text-white bg-yellow-500/30 rounded-full flex items-center px-2">{{
              variants.countContractApplicant
            }}</span>
          </li>
        </ul>
      </div>
    </div>
    <h3
      class="mt-8 font-bold text-md sm:text-lg lg:text-xl text-black dark:text-white mb-6 flex justify-between items-center"
    >
      Les effets de vente
    </h3>
    <div class="mt-4 grid grid-cols-12 gap-4">
      <div class="col-span-6 bg-slate-800 rounded-lg shadow-md p-4">
        <h4 class="text-white font-semibold text-2xl">Les Rendements</h4>
        <ul class="mt-4 space-y-2">
          <li class="rounded-lg bg-zinc-600/40 flex justify-between p-2">
            <span class="font-medium text-lg text-slate-100">Abonnement Basic </span>
            <span class="text-white bg-yellow-500/30 rounded-full flex items-center px-2">{{
              variants.countBasicSubscription
            }}</span>
          </li>
          <li class="rounded-lg bg-gray-600/40 flex justify-between p-2">
            <span class="font-medium text-lg text-slate-100">Abonnement Pro</span>
            <span class="text-white bg-yellow-500/30 rounded-full flex items-center px-2">{{
              variants.countProSubscription
            }}</span>
          </li>
          <li class="rounded-lg bg-gray-600/40 flex justify-between p-2">
            <span class="font-medium text-lg text-slate-100">Abonnement Expert</span>
            <span class="text-white bg-yellow-500/30 rounded-full flex items-center px-2">{{
              variants.countExpertSubscription
            }}</span>
          </li>
        </ul>
      </div>
      <div class="col-span-6 bg-slate-800 rounded-lg shadow-md p-4">
        <h4 class="text-white font-semibold text-2xl">Statut Abonnement</h4>
        <ul class="mt-4 space-y-2">
          <li class="rounded-lg bg-gray-600/40 flex justify-between p-2">
            <span class="font-medium text-lg text-slate-100">Abonnement Échoué</span>
            <span class="text-white bg-yellow-500/30 rounded-full flex items-center px-2">{{
              variants.countFailSubscription
            }}</span>
          </li>
          <li class="rounded-lg bg-gray-600/40 flex justify-between p-2">
            <span class="font-medium text-lg text-slate-100">Abonnement Réussi</span>
            <span class="text-white bg-yellow-500/30 rounded-full flex items-center px-2">{{
              variants.countSubscription
            }}</span>
          </li>
        </ul>
      </div>
    </div>
    <h3
      class="mt-8 font-bold text-md sm:text-lg lg:text-xl text-black dark:text-white mb-6 flex justify-between items-center"
    >
      Paiment en ligne
    </h3>
    <div class="mt-4 grid grid-cols-12 gap-4  overflow-y-scroll h-96">
      <table
        class="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 col-span-full relative "
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
        >
          <tr>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Email</th>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Plan</th>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Statut</th>
            <th scope="col" class="px-6 py-3 font-semibold text-start">Date transaction</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in variants?.payment"
            :key="item.id"
            class="bg-white dark:bg-gray-800 border-b dark:border-gray-600"
          >
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
              {{ item.email }}
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
              {{ item.plan }}
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
              <span
                v-if="item.statut == 'valider'"
                class="bg-green-700/80 p-1 rounded-md text-white"
                >Payer</span
              >
              <span v-else class="bg-red-700/80 p-1 rounded-md text-white">Échec</span>
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
              {{ item.created_at }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
