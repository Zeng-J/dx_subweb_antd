<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default{
  mounted() {
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState() {
        sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  }
}
</script>

<style>
  #app {
    height: 100%;
  }
</style>
