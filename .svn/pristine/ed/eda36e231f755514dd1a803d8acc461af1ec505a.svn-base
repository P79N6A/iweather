<template>
  <div class="riverEdit dialog" v-show="riverShow" v-clickoutside="handleClose">
    <el-checkbox-group v-model="checkRivers" @change="handleCheckedRiverChange">
      <el-checkbox v-for="item in rivers" :label="item.value" :key="item.id">{{item.value}}</el-checkbox>
    </el-checkbox-group>
    <div class="line"></div>
  </div>
</template>
<script>
  const riverOptions = [{id:'2',value:'二级河流'},{id:'3',value:'三级河流'},{id:'4',value:'四级河流'},{id:'5',value:'五级河流'}]
  export default{
    data(){
      return {
        rivers:riverOptions,
        checkRivers:[]
      }
    },
    props:['riverShow',"checkRiver"],
    created(){
      this.checkRivers=this.checkRiver
      this.$emit('riverHandle',{"rivers":this.checkRiver,"allRiver":riverOptions}) //为了单纯激活而不传值
    },
    methods:{
      handleCheckedRiverChange(val){
        console.log(val) //选中值的label所设置的值
        this.$emit('riverHandle',{"rivers":val,"allRiver":riverOptions})
      },
      handleClose(){
        this.$emit('riverHandle',{"rivers":this.checkRivers,"allRiver":riverOptions,'isshow':true})
      }
    }
  }
</script>
<style>
div.riverEdit{
  top:21%;
  /*top: 190px;*/
}

</style>
