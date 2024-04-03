<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { apiRoutes, baseUrl } from '../../utils/api.js'
import axios from 'axios'
import Freelancer from '@/components/chart/Freelancer.vue'
import Mission from '@/components/chart/Mission.vue'
import Contract from '@/components/chart/Contract.vue'
import Turnover from '@/components/chart/Turnover.vue'
</script>

<template>
  <main class="w-full mx-0 p-4 h-screen">
    <h3
      class="font-bold text-md sm:text-lg lg:text-xl text-black dark:text-white mb-6 flex justify-between items-center"
    >
      Freelancers
    </h3>

    <Freelancer />
    <h3
      class="mt-10 font-bold text-md sm:text-lg lg:text-xl text-black dark:text-white mb-6 flex justify-between items-center"
    >
      Missions
    </h3>
    <Mission />

    <h3
      class="mt-10 font-bold text-md sm:text-lg lg:text-xl text-black dark:text-white mb-6 flex justify-between items-center"
    >
      Contrats
    </h3>
    <Contract />
    <h3
      class="mt-10 font-bold text-md sm:text-lg lg:text-xl text-black dark:text-white mb-6 flex justify-between items-center"
    >
      Chiffre d'affaire (Abonnement)
    </h3>

    <Turnover />

    <div
      class="relative overflow-auto w-full bg-white dark:bg-slate-800 mt-6 rounded-lg h-4/5"
    ></div>
  </main>
</template>

