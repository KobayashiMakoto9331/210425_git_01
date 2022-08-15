<template>
  <div class="d-flex flex-column min-vh-100">
    <TheHeader class="mb-auto" />
    <router-view />
    <TheFooter class="mb-auto" />
  </div>
</template>

<script>
import TheHeader from './componnts/TheHeader.vue'
import TheFooter from './componnts/TheFooter.vue'

export default({
  components: {
    TheHeader,
    TheFooter
  }
})
</script>
