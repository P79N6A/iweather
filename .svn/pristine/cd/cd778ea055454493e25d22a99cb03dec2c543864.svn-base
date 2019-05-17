<template>
  <div class="disasterEdit dialog" v-show="disasterShow" v-clickoutside="handleClose">
    <el-checkbox-group v-model="checkdisasters" @change="handleCheckeddisasterChange">
      <el-checkbox v-for="item in disasters" :label="item.value" :key="item.id">{{item.value}}</el-checkbox>
    </el-checkbox-group>
    <div class="line"></div>
  </div>
</template>
<script>
  const disasterOptions = [{id:'1',value:'中小河流隐患点'},{id:'2',value:'山洪沟隐患点'},{id:'3',value:'泥石流'},{id:'4',value:'滑坡'}]
  export default{
    data(){
      return {
        disasters:disasterOptions,
        checkdisasters:[]
      }
    },
    props:['disasterShow',"checkDisaster"],
    created(){
      this.checkdisasters = this.checkDisaster
      this.$emit('disasterHandle',{"disasters":this.checkDisaster,"allDisaster":disasterOptions})
    },
    methods:{
      handleCheckeddisasterChange(val){
        console.log(val) //选中值的label值,此时是value
        this.$emit('disasterHandle',{"disasters":val,"allDisaster":disasterOptions})
      },
      handleClose(){
        this.$emit('disasterHandle',{"disasters":this.checkdisasters,"allDisaster":disasterOptions,'isshow':true})
      }
    }
  }
</script>
<style>
  div.disasterEdit{
    top:36%;
  }
</style>
