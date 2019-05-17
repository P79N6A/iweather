<!-- 范围选择 -->
<!-- 2018-08-06 -->
<template>
    <div id="menuPrecipitationRegion">
         <el-row v-show="regionShow">
              <el-col :span="24">
                  <el-card class="box-card">
                     <div slot="header" class="clearfix header">
                         <span> {{ name }}</span>
                         <el-button style="float: right; padding: 0px;color: #fff;font-size: 18px;" type="text" icon="el-icon-close" @click="handleonClick"></el-button>
                     </div>
                     <div class="text item">
                         <div class="itemProvince">
                              <div class="itemProvince-header">
                                  <span class="ProvinceText"> 省份</span>
                                  <!-- <div style="float: right;margin-right: 5px;"> -->
                                  <el-checkbox style="float: right;margin-right: 2%;" :indeterminate="isIndeterminate1" v-model="checkAllCitys" @change="handleCheckAllCitys">全选</el-checkbox>
                                  <!-- </div> -->
                              </div>
                              <div class="itemProvince-body">
                                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                      <el-checkbox v-for="city in cities" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
                                </el-checkbox-group>
                              </div>
                         </div>
                         <div class="itemProvince itemWeather">
                         <div class="itemProvince-header">
                           <span class="ProvinceText"> 气象中心</span>
                           <el-checkbox style="float: right;margin-right: 2%;" :indeterminate="isIndeterminate3" v-model="checkAllWeather" @change="handleCheckAllWeather">全选</el-checkbox>
                         </div>
                         <div class="itemProvince-body">
                           <el-checkbox-group v-model="checkedWeahter" @change="handlecheckedWeatherChange">
                             <el-checkbox v-for="(weath,index) in weathers" :label="weath.value" :key="index">{{weath.name}}</el-checkbox>
                           </el-checkbox-group>
                         </div>
                       </div>
                         <div class="itemProvince">
                              <div class="itemProvince-header">
                                  <span class="ProvinceText"> 河流</span>
                                  <el-checkbox style="float: right;margin-right: 2%;" :indeterminate="isIndeterminate2" v-model="checkAllRivers" @change="handleCheckAllRivers">全选</el-checkbox>
                              </div>
                              <div class="itemProvince-body">
                                <el-checkbox-group v-model="checkedRivers" @change="handlecheckedRiversChange">
                                      <el-checkbox v-for="river in rivers" :label="river.id" :key="river.id">{{river.name}}</el-checkbox>
                                </el-checkbox-group>
                              </div>
                         </div>
                         <div style="position: relative;min-height: 35px;">
                             <el-button type="success" @click="clickOk">确定</el-button>
                         </div>
                     </div>
                  </el-card>
              </el-col>
         </el-row>
    </div>
</template>
<script>
const cityOptions = [{id:'110000',name:'北京'},{id:'120000',name:'天津'},{id:'310000',name:'上海'},{id:'500000',name:'重庆'},{id:'130000',name:'河北'},{id:'140000',name:'山西'},{id:'210000',name:'辽宁'},{id:'220000',name:'吉林'},{id:'320000',name:'江苏'},{id:'330000',name:'浙江'},{id:'340000',name:'安徽'},{id:'350000',name:'福建'},{id:'360000',name:'江西'},{id:'370000',name:'山东'},{id:'410000',name:'河南'},{id:'420000',name:'湖北'},{id:'430000',name:'湖南'},{id:'440000',name:'广东'},{id:'460000',name:'海南'},{id:'510000',name:'四川'},{id:'520000',name:'贵州'},{id:'530000',name:'云南'},{id:'610000',name:'陕西'},{id:'620000',name:'甘肃'},{id:'630000',name:'青海'},{id:'710000',name:'台湾'},{id:'230000',name:'黑龙江'},{id:'150000',name:'内蒙古自治区'},{id:'450000',name:'广西壮族自治区'},{id:'540000',name:'西藏自治区'},{id:'640000',name:'宁夏回族自治区'},{id:'650000',name:'新疆维吾尔自治区'},{id:'810000',name:'香港'},{id:'820000',name:'澳门'}]
const riverOptions=[{id:'800006',name:'长江流域'},{id:'800003',name:'黄河流域'},{id:'800007',name:'珠江流域'},{id:'800001',name:'海河流域'},{id:'800002',name:'淮河流域'},{id:'800004',name:'辽河流域'},{id:'800005',name:'松花江流域'}]
const weatherOptions=[
  {name:'华北区域气象中心',value:[{city:'河北省',id:'130000'},{city:'山西省',id:'140000'},{city:'天津市',id:'120000'},{city:'内蒙古自治区',id:'150000'},{city:'北京市',id:'110000'}] }, { name:'成都区域气象中心',value:[{city:'西藏自治区',id:'540000'},{city:'贵州省',id:'520000'},{city:'重庆市',id:'500000'},{city:'云南省',id:'530000'},{city:'四川省',id:'510000'}]}, {name:'华东区域气象中心',value:[{city:'山东省',id:'370000'},{city:'安徽省',id:'340000'},{city:'浙江省',id:'330000'},{city:'福建省',id:'350000'},{city:'上海市',id:'310000'},{city:'江苏省',id:'320000'}]}, {name:'华南区域气象中心',value:[{city:'江西省',id:'360000'},{city:'广西壮族自治区',id:'450000'},{city:'海南省',id:'460000'},{city:'广东省',id:'440000'}]},
  {name:'华中区域气象中心',value:[{city:'湖南省',id:'430000'},{city:'湖北省',id:'420000'},{city:'河南省',id:'410000'}]},{name:'兰州区域气象中心',value:[{city:'甘肃省',id:'620000'},{city:'陕西省',id:'610000'},{city:'宁夏回族自治区',id:'640000'},{city:'青海省',id:'630000'}]},{name:'沈阳区域气象中心',value:[{city:'黑龙江省',id:'230000'},{city:'吉林省',id:'220000'},{city:'辽宁省',id:'210000'}]},{name:'乌鲁木齐区域气象中心',value:[{city:'新疆维吾尔自治区',id:'650000'}]}]
export default {
  name: 'menuPrecipitationRegion',
  props: ['regionShow'],
  data () {
    return {
      name: '范围选择',
      checkAllCitys: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate1: false,
      checkAllRivers:false,
      checkedRivers:[],
      rivers:riverOptions,
      isIndeterminate2: false,
      checkedWeahter:[],
      weathers:weatherOptions,
      isIndeterminate3: false,
      checkAllWeather:false,
      allID:[]
    }
  },
  created(){
    if (this.$store.state.regionData) {
      if (this.$store.state.regionData.index == '1') {
        this.checkedCities = this.$store.state.regionData.data
        this.allID = this.checkedCities
        if (this.checkedCities.length === cityOptions.length)
          this.checkAllCitys = true
      }else if(this.$store.state.regionData.index == '2'){
        this.checkedWeahter = this.$store.state.regionData.data
        this.checkedWeahter.forEach(val=>{
          val.forEach(val1=> this.allID.push(val1.id))
        })
        if (this.checkedWeahter.length === weatherOptions.length)
          this.checkAllWeather = true
      }else if(this.$store.state.regionData.index == '3'){
        this.checkedRivers = this.$store.state.regionData.data
        this.allID = this.checkedRivers
        if (this.checkedRivers.length === riverOptions.length)
          this.checkAllRivers = true
      }
      // else{
        // this.checkedRivers=[];this.checkedWeahter=[];this.checkedCities=[] //预留:全国之后区域是否清空
      // }
    }
  },
  methods: {
    handleCheckAllCitys (val) { //city全选
      this.checkedRivers=[];this.checkedWeahter=[];this.allID=[]
      this.isIndeterminate2 = false;this.isIndeterminate3 = false;this.isIndeterminate1 = false
      this.checkAllRivers=false;this.checkAllWeather=false; this.checkAllCitys=val
      cityOptions.forEach(value=>{
        this.allID.push(value.id)
      })
      this.checkedCities = val ? this.allID : []
      console.log('全选', val)
      if(val)
        console.log(this.allID)
      else {
        this.allID=[]
      }
    },
    handleCheckedCitiesChange (value) {//城市单个选,返回数组格式
      console.log(value)
      this.allID=value
      this.checkedRivers=[];this.checkedWeahter=[]
      this.isIndeterminate2 = false;this.isIndeterminate3 = false
      this.checkAllRivers=false;this.checkAllWeather=false
      let checkedCount = value.length
      this.checkAllCitys = checkedCount === this.cities.length
      this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.cities.length
      console.log(this.allID)
    },
    handleCheckAllRivers (val) { //river全选
      this.checkedCities=[];this.checkedWeahter=[];this.allID=[]
      this.checkAllCitys = false;this.checkAllWeather=false;this.checkAllRivers=val
      this.isIndeterminate1=false;this.isIndeterminate3 = false;this.isIndeterminate2 = false
      riverOptions.forEach(value=>{
        this.allID.push(value.id)
      })
      this.checkedRivers = val ? this.allID : []
      console.log('全选', val)
      if(val)
        console.log(this.allID)
      else {
        this.allID=[]
      }
    },
    handlecheckedRiversChange(value){//河流单个选
      this.allID = value
      this.checkedCities=[];this.checkedWeahter=[]
      this.checkAllCitys = false;this.checkAllWeather=false
      this.isIndeterminate1=false;this.isIndeterminate3 = false
      let checkedCount = value.length
      this.checkAllRivers = checkedCount === this.rivers.length
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.rivers.length
      console.log(this.allID)
    },
    handleCheckAllWeather (val) { //weather全选
      this.allID=[] ; this.checkedCities=[] ;this.checkedRivers=[]
      this.checkAllCitys = false;this.checkAllRivers=false; this.checkAllWeather =val
      this.isIndeterminate1=false;this.isIndeterminate2 = false;this.isIndeterminate3 = false
      var weathallID=[]
      weatherOptions.forEach(val=>{
        weathallID.push(val.value)
      })
      this.checkedWeahter = val ? weathallID : []
      console.log('全选', val)
      if(val)
        weathallID.forEach((val,ind)=>{
          val.forEach(val1=> this.allID.push(val1.id))
        })
      else {
        weathallID=[]
      }
      console.log(this.allID)
    },
    handlecheckedWeatherChange:function(value){ //气象中心单个选
      this.allID = [];this.checkedCities=[]; this.checkedRivers=[]
      this.checkAllCitys = false;this.checkAllRivers=false
      this.isIndeterminate1=false;this.isIndeterminate2 = false
      value.forEach((val,ind)=>{
        val.forEach(val1=> this.allID.push(val1.id))
      })
      let checkedCount = value.length
      this.checkAllWeather = checkedCount === this.weathers.length
      this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.weathers.length
      console.log(this.allID)
    },
    handleonClick () {  //关闭按钮
      this.rowdisplay = !this.rowdisplay
      this.$emit('returnHandle',{"isActive":false})
    },
    clickOk () { //确定
      this.rowdisplay = !this.rowdisplay
      if(this.checkAllWeather || this.checkAllCitys) this.allID = ['0']
      if(this.checkedCities.length) this.$store.commit('setCurrentArea',{areaId:this.allID,maskUrl:maskLayerUrl})
      else if(this.checkedWeahter.length) this.$store.commit('setCurrentArea',{areaId:this.allID,maskUrl:maskLayerUrl})
      else if(this.checkedRivers.length) this.$store.commit('setCurrentArea', {areaId:this.checkedRivers,maskUrl:FactorRiverMaskUrl})
      // 获取范围选择数据
      if (this.allID.length === 0) {
        this.$message('没有查询的相关信息,请重新选择')
        this.$emit('returnHandle', {"isActive":false})
      } else {
        this.$store.commit("setAreaid", this.initjobId +'&area='+ this.allID)
        this.$emit('returnHandle', {"isActive":true})
        this.$store.commit('changLabelModel', {returnLabel: {}}) //清除"标记"的记住
        this.$store.commit('setGetCityRegionID', this.allID) //城市标注范围选择ID
//所选城市同步标题
        if(this.checkedCities.length) {
          if (this.checkedCities.length===1){ //只选择了一个城市
            for (var i=0;i<cityOptions.length;i++){
              if(this.checkedCities[0] == cityOptions[i].id){
                console.log(cityOptions[i].name)
                this.$store.commit('initRegion',{index:'1',data:this.allID,title:cityOptions[i].name})
                return ;
              }
            }
          }else if(this.checkAllCitys){ //全选
            this.$store.commit('initRegion',{index:'1',data:this.checkedCities,title:'全国'})
          }else{ //选择N个城市
            this.$store.commit('initRegion',{index:'1',data:this.allID,title:''})
          }
        }
        else if(this.checkedWeahter.length){
          if(this.checkAllWeather) this.$store.commit('initRegion',{index:'2',data:this.checkedWeahter,title:'全国'})
          else this.$store.commit('initRegion',{index:'2',data:this.checkedWeahter,title:''})
        }
        else if(this.checkedRivers.length) this.$store.commit('initRegion',{index:'3',data:this.checkedRivers,title:''})
        else this.$store.commit('initRegion',{index:'4',data:'',title:'全国'})
        console.log(this.allID)
      }
    }
  },
  computed: {
    initAreaid () {
      return  this.$store.state.oneMapModel.areaid
    },
    initjobId () {
      return  this.$store.state.oneMapModel.jobId
    }
  }
}
</script>
<style>
#menuPrecipitationRegion {
   max-width: 635px;
   position: absolute;
   left: 5.1%;
   top: 5.5%;
   z-index: 10;
}
#menuPrecipitationRegion .el-card__header {
     padding: 2% 1% 2% 3%;
     background: #0688c2;
     color: #fff;
     font-size: 14px;
     min-width: 450px;
}
#menuPrecipitationRegion .el-card__body {
     border: 2px solid #0688c2;
     border-top: none;
     margin-top: -2px;
     padding: 1.5% 1% 1% 1%;
}
#menuPrecipitationRegion .el-card__body .itemProvince {
    width: 100%;
    margin-bottom: 1%;
}
#menuPrecipitationRegion .el-card__body .itemProvince .itemProvince-header {
    border: 1px solid #e0e0e0;
    font-size: 12px;
    color: #fff;
    line-height: 200%;
}
#menuPrecipitationRegion .el-card__body .itemProvince .itemProvince-header .ProvinceText {
    background: #0688c2;
    padding: 0.8% 10% 1% 2%;
    position: relative;
    z-index: 10;
}
#menuPrecipitationRegion .el-card__body .itemProvince .itemProvince-header .ProvinceText::before {
  content: '';
  position: absolute;
  top: 0;
  right: -12%;
  bottom: 0;
  left: 8%;
  z-index: -1;
  background: #0688c2;
  -webkit-transform: skewX(-20deg);
  transform: skewX(20deg);
}
#menuPrecipitationRegion .el-card__body .itemProvince .itemProvince-body {
    border: 1px solid #e0e0e0;
    border-top: none;
    padding:2% 0;
}
#menuPrecipitationRegion .el-card__body .el-checkbox__label{
  padding-left: 4px;
}
#menuPrecipitationRegion .el-card__body .itemProvince .el-checkbox{
   margin:0.4% 2.2%;
}
#menuPrecipitationRegion .el-button--success {
    position: absolute;
    right: 1%;
    top: 16%;
    color: #fff;
    background-color: #0688c2;
    border-color: #0688c2;
    padding:1% 4%;
}
#menuPrecipitationRegion .el-card__body .itemWeather .itemProvince-body .el-checkbox+.el-checkbox {
  margin: 0.4% 1.8%;
}
</style>
