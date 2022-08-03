<template>
    <div class="d-flex flex-column min-vh-100">
      <Header />
      <router-view />
      <Footer />
    </div>
</template>

<script>
import Header from './componnts/TheHeader.vue'
import Footer from './componnts/TheFooter.vue'

export default({
  components: {
    Header,
    Footer
  }
})
</script>
