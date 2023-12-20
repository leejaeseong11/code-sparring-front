<template>
  <main class="container">
    <img id="main-logo" src="/images/logo.gif" alt="logo" @click="goHome" />
    <router-view style="min-width: 1280px"></router-view>
    <FooterBar />
  </main>
</template>
<script>
import FooterBar from './components/footer/FooterBar.vue'

export default {
  name: 'App',
  components: { FooterBar },
  methods: {
    goHome() {
      this.$router.push({ path: `/` }).then(() => {
        this.$router.go()
      })
    }
  }
}
</script>
<style>
#main-logo {
  width: 150px;
  margin: 8px 0 0 8px;

  position: absolute;
  z-index: 1;
  cursor: pointer !important;
}
</style>
