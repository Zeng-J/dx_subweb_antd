<template>
    <a-breadcrumb :routes="routes" :style="{ margin: '16px 0 2px', background:'#fff',padding:'10px 15px' }">
        <template slot="itemRender" slot-scope="{route, params, routes, paths}">
            <span v-if="routes.indexOf(route) === routes.length - 1">
            {{route.meta.title}}
            </span>
            <span v-else :to="paths.join('/')">
            {{route.meta.title}}
            </span>
        </template>
    </a-breadcrumb>
</template>
<script>
  export default {
    data(){
      return {
        routes: this.$route.matched
      }
    },
    methods:{
    },
    watch: {
        $route () {
        // console.log(this.$route.matched);
        this.routes=this.$route.matched;
        }
    }
  }
</script>


