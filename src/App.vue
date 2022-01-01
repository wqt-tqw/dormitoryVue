<template>
  <!-- <keep-alive> -->
     <!-- <router-view :key="$route.fullPath"></router-view> -->
     <router-view v-if="isRouterShow"></router-view>
  <!-- </keep-alive> -->
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterShow: true
    }
  },
  methods: {
    async reload () {
      this.isRouterShow = false
      await this.$nextTick()
      this.isRouterShow = true
    }
  }
}
</script>
