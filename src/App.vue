<template>
  <main class="container">
    <img id="main-logo" src="/images/logo.gif" alt="logo" @click="goHome" />
    <router-view style="min-width: 1280px"></router-view>
  </main>
</template>
<script>
export default {
  name: 'App',
  methods: {
    goHome(event) {
      if (!confirm('이 사이트에서 나가시겠습니까?')) return
      else {
        event.preventDefault()
        event.returnValue = ''
      }
      this.$router.push({ path: `/` })
    },
    unLoadEvent: function (event) {
      if (this.isLeaveSite) return

      event.preventDefault()
      event.returnValue = ''
    }
  }
  // mounted() {
  //   window.addEventListener('beforeunload', this.unLoadEvent)
  // },
  // beforeUnmount() {
  //   window.removeEventListener('beforeunload', this.unLoadEvent)
  // }
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
