<template>
   <div id="toolBar">
        <!-- {{ name }} -->
     <div class="toolbarcon">
       <el-menu default-active="1-4-1" class="el-menu-vertical-demo toolBarmenu" @select="handleSelect">
         <el-menu-item index="1" style="padding-left: 0px;background-color: #0688c2;" @click="styleControll('1')" :class="{'dbActive':regionObj['key1']}">
           <img src="../../assets/images/tool_range.png">
           <br/>
           <span slot="title">范围选择</span>
         </el-menu-item>
         <el-menu-item @click="toolClick('一级河流');styleControll('6')"  index="6" style="padding-left: 0px;background-color: #0688c2;" :class="{'dbActive':regionObj['key6']}">
           <img src="../../assets/images/tool_firstorder_stream.png">
           <br/>
           <span slot="title">一级河流</span>
         </el-menu-item>
         <el-menu-item @click="toolClick('其他河流'); styleControll('2')" index="2" style="padding-left: 0px;background-color: #0688c2;" :class="{'dbActive':regionObj['key2']}">
           <img src="../../assets/images/tool_river.png">
           <br/>
           <span slot="title">河流</span>
         </el-menu-item>
         <el-menu-item @click="toolClick('交通');styleControll('3')" index="3" style="padding-left: 0px;background-color: #0688c2;" :class="{'dbActive':regionObj['key3']}">
           <img src="../../assets/images/tool_traffic.png">
           <br/>
           <span slot="title">交通</span>
         </el-menu-item>
         <el-menu-item @click="toolClick('风险点');styleControll('4')" index="4" :class="{'dbActive':regionObj['key4'] }" style="padding-left: 0px;background-color: #0688c2;">
           <img src="../../assets/images/tool_risk.png">
           <br/>
           <span slot="title">风险点</span>
         </el-menu-item>
         <el-menu-item index="5" style="padding-left: 0px;background-color: #0688c2;" @click="styleControll('5')" :class="{'dbActive':regionObj['key5'] }">
           <img src="../../assets/images/tool_label.png">
           <br/>
           <span slot="title">标注</span>
         </el-menu-item>
         <el-menu-item index="7" style="padding-left: 0px;background-color: #0688c2;" @click="styleControll('7')" :class="{'dbActive':regionObj['key7']}">
           <img src="../../assets/images/tool_export.png">
           <br/>
           <span slot="title">导出材料</span>
         </el-menu-item>
         <!-- <el-menu-item index="8" style="padding-left: 0px;background-color: #0688c2;" @click="styleControll('8')" :class="{'dbActive':regionObj['key8']}">
           <img src="../../assets/images/file.png" style="width: 42px;height: 42px;">
           <input type="file" name="file" id="file" v-on:change="fileHandleChange()" style="display: none;" ref="uploadFile">
           <br/>
           <span slot="title">上传文件</span>
         </el-menu-item> -->
       </el-menu>
     </div>
     <!--区域选择-->
     <region v-if="regionShow" :regionShow="regionShow" @returnHandle="regionHandle"></region>
     <!-- 标注 -->
     <labelEdit v-if="labelShow" @returnHandle="returnHandle" :labelShow="labelShow"></labelEdit>
     <!-- 导出材料 -->
     <gpEdit v-if="gpShow" @gpHandle="gpHandle" :gpShow="gpShow"></gpEdit>
     <!--河流-->
     <riverEdit v-if="riverShow" @riverHandle="riverHandle" :riverShow="riverShow" :checkRiver="checkRiver" ></riverEdit>
     <!--交通-->
     <trafficEdit v-if="trafficShow" @trafficHandle="trafficHandle" :trafficShow="trafficShow" :checktraffic="checktraffic"></trafficEdit>
     <!--风险点-->
     <disasterEdit v-if="disasterShow" @disasterHandle="disasterHandle" :disasterShow="disasterShow" :checkDisaster="checkDisaster"></disasterEdit>
   </div>
</template>

<script>
import region from '../dialog/region.vue'
import webMap from  '../webmap/Webmap.vue'
import labelEdit from '../dialog/labelEdit.vue'
import gpEdit from  '../dialog/gpEdit.vue'
import riverEdit from '../dialog/riverEdit.vue'
import trafficEdit from '../dialog/trafficEdit.vue'
import disasterEdit from '../dialog/disasterEdit.vue'
export default {
  name: 'MenuPrecipitation',
  components: {
    region, webMap, gpEdit, labelEdit, riverEdit, trafficEdit, disasterEdit
  },
  data () {
    return {
      name: '',
      isCollapse: false,
      gpShow: false, //导出材料的弹框
      labelShow: false,labelactive:false, //标记弹框
      regionShow:false,regionactive:false, //区域选择的弹框
      riverShow:false,riverActive:false,//河流弹框
      trafficShow:false,trafficActive:false,
      disasterShow:false,disasterActive:false,
      regionObj:{key1:false,key2:false,key3:false,key4:false,key5:false,key6:true,key7:false,key8:false}, //控制toolbar的激活样式
      checkDisaster:[],
      checkRiver:[],
      checktraffic:[]
    }
  },
  methods: {
    // 工具栏点击控制图层
    toolClick (args) {
      // var layer = this.mapData.getLayer(args)
      // if (layer.visible) {
      //   layer.hide()
      // } else {
      //   layer.show()
      // }
    },
    fileHandleChange:function(){
      console.log(this.$refs.uploadFile.files[0])
      var formDate = new FormData();
      formDate.append("file",this.$refs.uploadFile.files[0])
      console.log(formDate)
    },
    layerShow (init,args) {
      init.forEach(item=>{ //重置
        this.mapData.getLayer(item).hide()
      })
      args.forEach(item=> { //显示选中的
        this.mapData.getLayer(item).show()
      })
    },
    styleControll(index){
      this.regionObj['key'+index] = !this.regionObj['key'+index]
      //如果当前为激活状态,再次点击时还应是激活样式
      if(this.labelactive == true){
        this.regionObj['key5']=true
      } if(this.regionactive == true){
        this.regionObj['key1']=true
      } if(this.riverActive == true){
        this.regionObj['key2']=true
      } if(this.trafficActive == true){
        this.regionObj['key3']=true
      } if(this.disasterActive == true){
        this.regionObj['key4']=true
      }
    },
    //点击侧边栏,控制弹框的显示与隐藏
    handleSelect (key, keyPath) {
      this.name='';
      switch (key) {
        case '1':
          this.name = '范围选择'
          this.regionShow = !this.regionShow
          this.labelShow=this.gpShow=false;
          this.regionObj['key5']=this.regionObj['key7']=false
          break
        case '2':
          this.name = '河流'
          this.riverShow = !this.riverShow
          break
        case '3':
          this.name = '交通'
          this.trafficShow = !this.trafficShow
          break
        case '4':
          this.name = '风险点'
          this.disasterShow = !this.disasterShow
          break
        case '5':
          this.name = '标注'
          this.labelShow = !this.labelShow
          this.regionShow=this.gpShow=false;
          this.regionObj['key1']=this.regionObj['key7']=false
//          this.$store.state.labelVisible=!this.$store.state.labelVisible
          break
        case '6':
          this.name = '一级河流'
          var layer = this.mapData.getLayer('一级河流')
          if (layer.visible) {
            layer.hide()
          } else {
            layer.show()
          }
          break
        case '7':
          this.name = '导出材料'
          this.gpShow = !this.gpShow
          this.regionShow =this.labelShow =false
          this.regionObj['key5']=this.regionObj['key1']=false
          // this.$confirm('此操作将导出地图并保存为图片','提示',{
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
          //   this.$store.state.isprint=!this.$store.state.isprint
          // }).catch(() => {
          //     this.$message({
          //         type: 'info',
          //         message: '已取消'
          //     })
          // })
          break;
        case '8':
          // console.log(this.$refs.uploadFile)
          this.name = "上传文件";
          $(this.$refs.uploadFile).trigger("click");
          break;
        default:
          console.log('点击的不是资源目录')
          break
      }
//      this.show = !this.show
      console.log(key, keyPath)
    },
    //子组件点击 确定/取消 传值给父组件
    returnHandle (val)  { //标注
      this.labelShow = false
      this.labelactive=val.isActive
      this.regionObj['key5'] = val.isActive
    },
    gpHandle () { //导出材料
      this.regionObj['key7'] = false
      this.gpShow = false
    },
    regionHandle(val) {  //区域
      this.regionShow=false
      this.regionactive=val.isActive
      this.regionObj['key1'] = val.isActive
      console.log(this.regionactive)
    },
    riverHandle(val){ //河流
      var aa=[]
      val.allRiver.forEach(item=>aa.push(item.value))
      this.layerShow(aa,val.rivers)
      this.checkRiver=val.rivers
      if(val.rivers.length) this.riverActive=this.regionObj['key2']=true
      else this.riverActive = false
      if(val.isshow==true){ //点击空白的情况
        this.riverShow=false
        if (val.rivers.length == 0) this.regionObj['key2']=false
      }
    },
    trafficHandle(val){ //交通
      var aa=[]
      val.allTraffic.forEach(item=>aa.push(item.value))
      this.layerShow(aa,val.traffics)
      this.checktraffic=val.traffics
      if(val.traffics.length) this.trafficActive=this.regionObj['key3']=true
      else this.trafficActive = false
      if(val.isshow==true){ //点击空白的情况
        this.trafficShow=false
        if (val.traffics.length == 0) this.regionObj['key3']=false
      }
    },
    disasterHandle(val){ //风险点
      var aa=[]
      val.allDisaster.forEach(item=>aa.push(item.value))
      this.layerShow( aa , val.disasters ) //控制显示的图层
      this.checkDisaster=val.disasters //记住上次选项
      if(val.disasters.length > 0) this.disasterActive=this.regionObj['key4']=true //选-激活
      else this.disasterActive=false //没选-不激活
      if(val.isshow==true){ //点击空白的情况
        this.disasterShow=false
        if (val.disasters.length == 0) this.regionObj['key4']=false
      }
    }
  },
  computed: {
    mapData () {
      return this.$store.state.map
    },
    clearLabel:function(){  //清除标记
      return this.$store.state.clearLabel
    },
    clearRegion:function(){  //点击全国之后 ,清除范围选择
      return this.$store.state.clearRegion
    }
  },
  watch:{
    clearLabel:function(){
       this.regionObj['key5']=false
       this.labelactive=false
    },
    clearRegion:function(){  //点击全国之后,就不再激活区域选择
       this.regionObj['key1']=false
       this.regionactive=false
    }
  }
}
</script>

<style>
#toolBar {
     height: 100%;
     height: -webkit-fill-available;
     width: 100%;
     border: 1px solid #d6d6d6;
     /*position: relative;*/
}
#toolBar .toolbarcon{
   height: 100%;
   height: -webkit-fill-available;
 }
#toolBar .toolBarmenu {
     border: none;
     background: #0688c2;
     height: 100%;
     height: -webkit-fill-available;
}
#toolBar .toolBarmenu .el-menu-item {
   height:0px;
     text-align: center;
     width: 100%;
     display: inline-block;
   line-height: 150%;
     color: #fff;
     padding: 0px;
   padding-top: 25%;
   background: #0688c2;
}
#toolBar .toolBarmenu .el-menu-item:first-child {
     margin-top: 36px;
}
#toolBar .el-menu-vertical-demo .el-menu-item.is-active,#menuPrecipitation .el-menu-vertical-demo .el-menu-item:hover,#menuPrecipitation .el-menu-vertical-demo .el-menu-item:focus {
  height: 0px;
}
/*#toolBar .el-menu-item.is-active {*/
  /*font-weight: bold;*/
/*}*/
#toolBar .el-menu-item:focus, .el-menu-item:hover {
     background: none;
}
#toolBar #gpedit {
  position: absolute;
  z-index:100;
  top:120px;
  left:90px;
}
#toolBar .el-menu-item.dbActive {
  font-weight: bold;
  color: yellow;
}
#toolBar .el-menu-item.dbActive img{
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  -khtml-opacity: 0.5;
  opacity: 0.6;
}
/*弹窗样式*/
div.dialog{
  z-index: 10;
  position: absolute;
  left: 5%;
  width: 180px;
  /*background: #f8fdfd;*/
  background-color: aliceblue;
  border: solid 1px #e6ecf0;
  text-align: left;
}
div.dialog label.el-checkbox {
  margin:10px  10px 10px 6px;
  display: block;
  color: #000;
}
div.dialog label.el-checkbox .el-checkbox__label{
  padding-left: 16px;
}
div.dialog .line{
  position: absolute;
  left: 27px;
  top: 0px;
  width: 1.5px;
  height: 100%;
  background-color: #e6ecf0;
}
</style>
