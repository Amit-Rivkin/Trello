<template>
  <div>
    <app-header></app-header>
    <homePage/>
    <router-view></router-view>
  </div>
</template>

<script>
import appHeader from './components/app-header.vue'
import homePage from './views/home-page.vue'
export default {
  name: "main-app",
  props: [],
  components: {
    appHeader,
    homePage,
  },
  data() {
    return {
    }
  },
  methods: {
  },

  created() {
  },

};
</script>

<style>

</style>

