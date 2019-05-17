<template>
  <div class="trafficEdit dialog" v-show="trafficShow" v-clickoutside="handleClose">
    <el-checkbox-group v-model="checktraffics" @change="handleCheckedtrafficChange">
      <el-checkbox v-for="item in traffics" :label="item.value" :key="item.id">{{item.value}}</el-checkbox>
    </el-checkbox-group>
    <div class="line"></div>
  </div>
</template>
<script>
  const trafficOptions = [{id:'1',value:'主要公路'},{id:'2',value:'全部公路'}]
  export default{
    data(){
      return {
        traffics:trafficOptions,
        checktraffics:[]
      }
    },
    props:['trafficShow',"checktraffic"],
    created(){
      this.checktraffics = this.checktraffic
      this.$emit('trafficHandle',{"traffics": this.checktraffic,"allTraffic":trafficOptions})
    },
    methods:{
      handleCheckedtrafficChange(val){
        console.log(val) //选中值的label
        this.$emit('trafficHandle',{"traffics": val,"allTraffic":trafficOptions})
      },
      handleClose(){
        this.$emit('trafficHandle',{"traffics": this.checktraffics,"allTraffic":trafficOptions,'isshow':true})
      }
    }
  }
</script>
<style>
  div.trafficEdit{
    top:30%;
  }
</style>
