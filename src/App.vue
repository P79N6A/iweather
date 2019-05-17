<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <div class="router-view" style="">
         <Header id="Headerdiv" ref="elememt" v-on:listenToHeaderEvent="handleSelect"/>
         <!-- <Main :style="{'margin-top': screenHeight+'px'}" :main-com="maincom" :main-show="show" /> -->
         <Main :main-com="maincom" :main-show="show" />
    </div>
  </div>
</template>
<script>
import "babel-polyfill"
import Header from '@/components/header/Header'
import Main from '@/components/main/Main'
export default {
  name: 'App',
  components: {
    Header,
    Main
  },
  data () {
    return {
      maincom: '强降水',
      show: true
    }
  },
  methods: {
    handleSelect (namedata) {
      this.maincom = namedata
      console.log(this.maincom)
    }
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  /* font-family: '微软雅黑'; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*min-width: 1580px;*/
  height: 100%;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
.router-view{
  height: 99%;
  height: -webkit-fill-available;
}
</style>
