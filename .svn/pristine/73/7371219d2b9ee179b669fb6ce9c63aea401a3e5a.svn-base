<template>
   <div class="mainClass" style="position: relative;">
       <!-- 主布局 -->
       <!-- <el-container style="position: relative;"> -->
           <!-- 控制工具栏的缩放-->
           <el-radio-group v-model="isCollapse" class="radioGroup">
               <el-radio-button class="radioButton" :label="true" v-show="isCollapse === false">
                   <img src="../../assets/images/toolbar_open.png" />
               </el-radio-button>
               <el-radio-button class="radioButton" :label="false" v-show="isCollapse === true">
                   <img src="../../assets/images/toolbar_close.png" />
               </el-radio-button>
           </el-radio-group>
           <el-aside style="width: 4.6%;float: left;height:100%;height: -webkit-fill-available;" class="toolBaraside" v-show="isCollapse" v-if="mainShow">
                <toolBar/>
           </el-aside>
           <!-- 侧边栏 -->
           <el-main style="padding: 0.2%;">
               <el-row :class="{'CollapseCla': !isCollapse}">
                   <el-col :span="15">
                       <div  class="grid-content bg-purple">
                            <Webmap />
                       </div>
                   </el-col>
                   <el-col :span="9">
                       <div class="grid-content bg-purple-light">
                            <DataCollection />
                       </div>
                   </el-col>
               </el-row>
           </el-main>
       <!-- </el-container> -->
   </div>
</template>

<script>
import toolBar from '../toolBar/toolBar.vue'
import Webmap from '@/components/webmap/Webmap'
import DataCollection from '@/components/statisticdata/DataCollection'
export default {
  name: 'Main',
  components: {
    toolBar,
    Webmap,
    DataCollection
  },
  data () {
    return {
      name: '123',
      width: '80',
      isCollapse: true
    }
  },
  props: ['mainCom', 'mainShow']
}
</script>

<style>
  .mainClass {
    /* height: 0px; */
    width: -webkit-fill-available;
    background: #f0f0f0;
    padding-top: 0.2%;
    margin-bottom: 3.3%;
    padding-right: 0.2%;
    overflow: hidden;
    height:100%;
    height: -webkit-fill-available;
  }
 .mainClass .el-radio-button__inner{
    background-color:transparent;
    border:none;
  }
 .CollapseCla {  /*控制缩进后地图距左边的距离*/
   margin-left: 30px;
 }
 .mainClass .radioGroup {
   position: absolute;
   top: -6px;
   left: -15px;
   z-index: 2;
  }
.mainClass .el-main {
    border-left: none;
    background-color: #f0f0f0;
    overflow: hidden;
    height:100%;
    /* height: -webkit-fill-available; */
}
.mainClass .toolBaraside {
    height: 100%;
    padding-left: 0.4%;
    line-height: normal;
    overflow: hidden;
    padding-top: 0.2%;
}
  .mainClass .el-row {
    height: inherit;
  }
  .mainClass .el-col-9,.mainClass .el-col-15 {
    height:100%;
    height: -webkit-fill-available;
  }
  .mainClass .el-col-9 .grid-content,.mainClass .el-col-15 .grid-content {
    height:100%;
    height: -webkit-fill-available;
  }
  </style>
