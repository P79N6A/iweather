<template>
   <!-- <div> -->
       <header class="header">
         <!-- <el-container> -->
           <!--  style="height: 56px;min-width: 1580px"  v-bind:style="{ padding-bottom: height + 'px'}"-->
             <el-header style="height: 100%">
                 <el-row>
                      <el-col :span="4" style="padding: 0.5%">
                           <img src="../../assets/images/logo.png">
                      </el-col>
                      <el-col :span="20">
                           <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                                <el-menu-item v-for="item in menuitem" :index="item.id" :key="item.id">{{ item.name }}</el-menu-item>
                           </el-menu>
                           <el-tag type="warning" v-if="resinitIsDataError === false"> <i class="el-icon-delete"></i> {{resinitExplain}}</el-tag>
                      </el-col>
                 </el-row>
             </el-header>
         <!-- </el-container> -->
       </header>
   <!-- </div> -->
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      activeIndex: '',
      menuitem: [
        {id: '0', name: '暂无数据'}
      ],
      name: '',
      resinitIsDataError: true,
      resinitExplain: '数据来源异常！',
      height: ''
    }
  },
  created () {
    this.getMenuBar()
  },
  watch:{
    DataCollectionError(val){  // 数据异常提示
      this.resinitIsDataError=val
      if(this.$store.state.DataCollectionError.errExplain)
         this.resinitExplain = this.$store.state.DataCollectionError.errExplain
    }
  },
  methods: {
    getMenuBar () {
      this.$get(GetMenuBarUrl).then(resmenu => {  console.log(resmenu)
         let resMenuBar = JSON.parse(resmenu)
         if(resMenuBar.firstmenu){
           this.menuitem=[]
           var arr = resMenuBar.firstmenu
           arr.forEach((val)=>{
             // if( val.id == "0" ) //只显示降水
               this.menuitem.push({id:val.id,name:val.name})
           })
           this.activeIndex = arr[0].id
           this.name = arr[0].name
         }
      })
        .catch(error => {
          console.log(error)
        })
    },
    handleSelect (key, keyPath) {
      this.$emit('listenToHeaderEvent', key)
      var obj = this.menuitem.find( (val) => {return val.id==key} )
      this.$store.commit('setMenuBarName',{menuid:key,menuName:obj.name}) //降水0 气温1
      this.$store.state.clearLabel = !this.$store.state.clearLabel
    }
  },
  computed: {
    DataCollectionError(){
      return this.$store.state.DataCollectionError.IsDataError
    }
  }
}
</script>

<style scoped>
  .header{
    overflow: hidden;
    position: relative;
    width: 100%;
    top: 0;
    z-index: 999;
  }

  .header .el-header {
    background-color: #0588c2;
    color: #333;
    padding: 0px;
  }

  .header .el-header .el-menu {
     float: left;
     background: none;
  }

  .header .el-header .el-menu .el-menu-item {
     height: inherit;
     text-align: center;
     /*padding: 33%;*/
  }
  .header .el-menu--horizontal {
      border: none;
  }

  .header .el-header .el-menu--horizontal > .el-menu-item {
     color: #e0f5ff;
     border: none;
     /*padding: 0 43% 0 43%;*/
     line-height: 400%;
  }

  .header .el-header .el-menu--horizontal>.el-menu-item.is-active {
     background: #006fa0;
     border-bottom: none;
     color: #fff;
     /* padding: 43%; */
    /*padding: 0 43% 0 43%;*/
    line-height: 400%;
  }

  .header .el-header .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
     background: #006fa0;
     border-bottom: none;
     color: #fff;
  }

  .header .el-header .el-tag--warning{
    height: inherit;
    line-height: inherit;
    border-radius: 5px;
    background-color: #e87e04;
    text-align: center;
    border: rgba(255,255,255,0.6) 2px solid;
    color: #ffffff;
    float: right;
    padding: 0.2% 0.7% 0.2% 0.7%;
    font-size: 14px;
    margin: 0.8% 1%;
  }
  </style>
