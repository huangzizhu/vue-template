<template>
  <div class="flex flex-col items-center justify-center h-screen text-center p-8">
    <div class="bg-white/30 backdrop-blur-lg rounded-3xl p-10 shadow-lg">
      <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p class="text-3xl text-gray-600">Oops! Page not found</p>
      <router-link to="/" class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition mt-4">
        Go Home
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Optional: custom styles for frosted glass effect and other elements */
</style>