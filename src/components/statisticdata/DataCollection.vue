<!-- 数据列表 2018-08-28 -->
<template>
    <div id="DataCollection" data-html2canvas-ignore="true">
         <div class="CollectionTime">
             <el-row>
                  <el-col :span="2">
                       <div class="CollectionTime-icon">
                           <img src="../../assets/images/time.png" style="width: 100%; height: 100%;" />
                       </div>
                  </el-col>
                  <!-- 数据收集时间 -->
                  <el-col :span="22">
                      <span>{{ DataArriveExplain }} : {{ DataArriveTime }}</span>
                  </el-col>
             </el-row>
         </div>
         <!-- 数据表格 -->
         <div class="CollectionList">
           <!-- 折叠面板 -->
             <el-collapse v-model="activeNames" @change="handleChange" accordion>
                 <el-collapse-item v-for="key in initkey" :key="key" :name="key" v-if="datas[key]">
                     <template slot="title">  <!-- 头  -->
                       <span :title="datas[key]['Explain']" v-if="key === 'Rain50' && 'Rain100'">
                          <i class="el-icon-star-on" style="line-height: unset;"></i> {{datas[key]['Explain']}}
                       </span>
                       <span :title="datas[key]['Explain']" v-else-if="key === 'Rain100'">
                          <i class="el-icon-star-on" style="line-height: unset;"></i> {{datas[key]['Explain']}}
                       </span>
                       <span :title="datas[key]['Explain']" v-else-if="key === 'Rain250'">
                          <i class="el-icon-star-on" style="line-height: unset;"></i> {{datas[key]['Explain']}}
                       </span>
                       <span :title="datas[key]['Explain']" v-else-if="key === activeNames">
                          <i class="el-icon-arrow-down" style="line-height: unset;"></i> {{datas[key]['Explain']}}
                           <!-- {{datas[key]['Explain'].length>16?datas[key]['Explain'].slice(0,15)+'..':datas[key]['Explain']}} -->
                       </span>
                       <span :title="datas[key]['Explain']" v-else-if="screenWidth < 600 && screenWidth > 520">
                          <i class="el-icon-arrow-right" style="line-height: unset;"></i>
                            <!-- {{datas[key]['Explain']}} -->
                           {{datas[key]['Explain'].length>33?datas[key]['Explain'].slice(0,32)+'..':datas[key]['Explain']}}
                       </span>
                       <span :title="datas[key]['Explain']" v-else>
                          <i class="el-icon-arrow-right" style="line-height: unset;"></i> {{datas[key]['Explain']}}
                           <!-- {{datas[key]['Explain'].length>16?datas[key]['Explain'].slice(0,15)+'..':datas[key]['Explain']}} -->
                       </span>
                        <div class="CollectionAbstract" v-if="screenWidth > 300 ">
                           <!-- <div class="itemTag" v-if="datas[key]['Explain'].length<16" v-for="(x,y) in datas[key]['Statistic']" :key="y" :title="x">
                              &nbsp;{{y}}&nbsp;:&nbsp;{{datas[key]['Explain'].length>16?x.slice(0,5)+'..':x}}&nbsp;
                               v-if="datas[key]['Explain'].length<25"
                           </div> -->
                           <div class="itemTag" v-if="datas[key]['Explain'].length<25 && screenWidth > 650" v-for="(x,y) in datas[key]['Statistic']" :key="y" :title="x">
                              <!-- &nbsp;{{y}}&nbsp;:&nbsp;{{x.length>10?x.slice(0,9)+'..':x}}&nbsp; -->
                              <!-- &nbsp;{{y}}&nbsp;:&nbsp;{{x.length>10?x.slice(0,9)+'..':x}}&nbsp; -->
                              &nbsp;{{y}}&nbsp;:&nbsp;{{x.length>15?x.slice(0,14)+'..':x}}&nbsp;
                           </div>
                           <div class="itemTag" v-else-if="datas[key]['Explain'].length>23 || screenWidth<600" :title="x">
                               <!-- &nbsp;{{x}}&nbsp; -->
                             
                              &nbsp;{{x.length>15?x.slice(0,14)+'..':x}}&nbsp;
                              <!-- &nbsp;{{x==''?1:x}}&nbsp; -->

                           </div>
                           <div class="itemTag" v-else :title="x">
                              &nbsp;{{y.length>5?y.slice(0,4)+'..':y}}&nbsp;:&nbsp;{{x.length>12?x.slice(0,10)+'..':x}}&nbsp;
                           </div>
                        </div>
                     </template>
                     <!--  height="450"  -->
                     <div class="CollectionTableList"   v-if="key!='Rain50'&&key!='Rain100'&&key!='Rain250'"> <!-- 内容  -->
                          <div id="CollectionTableList">
                            <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.8)" :data="statisticdata" border style="width: 100%;">
                                <el-table-column type="index" label="#" width="48">
                                </el-table-column>
                                <el-table-column v-for="(x,y) in statisticdata[0]" :key="y" :label="y" :prop="y">
                                </el-table-column>
                            </el-table>
                          </div>
                     </div>
                 </el-collapse-item>
             </el-collapse>
             <!-- 当没有查询到本时间段数据时显示 -->
             <el-collapse accordion v-if="itemTagval === 'err'" v-model="activeNames">
                 <el-collapse-item v-for="keye in explain" :key="keye" :name='keye'>
                     <template slot="title">
                        <span v-if="keye === activeNames"><i class="el-icon-arrow-down" style="line-height: unset;"></i> {{keye}}</span>
                        <span v-else><i class="el-icon-arrow-right" style="line-height: unset;"></i> {{keye}}</span>
                        <div class="CollectionAbstract" style="margin-right: 0.5%;">
                            <div class="itemTag" v-bind:style="{background: back}">
                               &nbsp;&nbsp;没有查询到本时间段数据！&nbsp;
                            </div>
                        </div>
                     </template>
                     <div class="CollectionTableList">
                        <p class="noQuery">暂无查询数据</p>
                     </div>
                 </el-collapse-item>
              </el-collapse>
         </div>
         <!-- 文字描述 -->
         <TextDescription />
    </div>
</template>
<script>
import TextDescription from '../statisticdata/TextDescription.vue'
const initkeyOptions = []
const Explain = [
  '最大累计降水量',
  '最大1小时降水量',
  '最大3小时降水量',
  '最大6小时降水量',
  '累计降水量超过50/100/200毫米的站点数',
  '最大1小时降水量超过50/70/90/100毫米的站点数',
  '降水量突破月极值站点数',
  '降水量突破历史极值站点数',
  '50毫米以上降水',
  '100毫米以上降水',
  '250毫米以上降水'
]
const ExplainTemp = [
  '历史最高温',
  '历史同月最高温',
  '历史同期最高温',
  '高温I级(≥35℃)II级(≥37℃)III级(≥39℃)',
  '日最高温',
  '高温连续日数',
  '小时最高温',
  '最大连续高温日数',
  '高温站点数'
]
export default {
  name: 'DataCollection',
  components: {
    TextDescription
  },
  data () {
    return {
      name: 'Vue.js',
      DataArriveTime: '暂无数据', //数据收集时间
      DataArriveExplain: '数据收集时间', //数据收集时间
      activeNames: '', // 是否手风琴模式
      initkey: initkeyOptions, // 标题数据
      explain: Explain, // 标题数据(当数据加载异常时，使用)
      datas: [], // 表头数据data
      itemTagval: '',
      back: '', // 背景颜色
      tinitdatas: [], // 表格数据
      statisticdata: [],
      initRain: '',
      initTemp: '',
      loading: true, // 加载
      show: true,
      screenWidth: 0,
      StatisticDataUrl: StatisticDataUrl,
      initjobIdData: 362
    }
  },
  mounted () {  
    // 获取右侧数据栏的实时宽度
     const that = this
     this.screenWidth =  document.getElementById("DataCollection").offsetWidth
     window.onresize = () => {
       return (() => {
           var x = document.getElementById("DataCollection").offsetWidth
           that.screenWidth = x
       })()
     }
  },

  methods: {
    // 点击控制面板
    handleChange (val) {
      console.log(val)
      this.loading = true
      this.statisticdata = []
      if(this.MenuBarId == 0) {
        this.initRain = val
      }else {
        this.initTemp = val
      }
      this.itemTagval = val.toUpperCase()
      if (this.itemTagval) {        
          this.getData()
      // setTimeout(() => {
      //   this.loading = false
      // }, 2000);
      } else {
        console.log('没有查询到本时间段数据！')
      }    
    },
    // 数据处理
    getData () {
      let tableinitdata = this.itemTagval
      if (tableinitdata === 'RAIN50') {
        this.loading = false
        this.show = false
      } else if (tableinitdata === 'RAIN100') {
        this.loading = false
        this.show = false
      } else if (tableinitdata === 'RAIN250') {
        this.loading = false
        this.show = false
      } else {
        this.show = true
        // this是指向当前vue实例，千万不能丢掉，不然会报方法或对象undefined
        // 调用的接口是豆瓣公开的，可以直接测试调用
        let url = tableinitdataUrl + tableinitdata + '&jobid=' + this.initjobIdData + '&weather=' + this.$store.state.oneMapModel.weaType + '&dataType=' + this.$store.state.dataType
        console.log(url)
        this.$get(url).then(restable => {
          restable = JSON.parse(restable)
          console.log(restable)
          this.tinitdatas = restable
          setTimeout(() => {
            this.loading = false
            if(this.MenuBarId == 0) {
              console.log(1)
              this.run()
            }else {
              this.runTemp()
            }
          }, 400)
        })
          .catch(err => {
            this.tinitdatas = []
            this.loading = false
            console.log(err)
          })
      }
    },
    // 数据处理
    toTreeData (data) {
      let resObj = [data]
      let tree = []
      this.initkey = []
      for (let i = 0; i < resObj.length; i++) {
        let Sobj = [{
            Rain50: {
                'Explain': resObj[i].Rain50.Explain,
                'Statistic': {
                  面积: resObj[i].Rain50.Statistic.面积 + '万平方千米',
                  人口: resObj[i].Rain50.Statistic.人口 + '万',
                  GDP: resObj[i].Rain50.Statistic.GDP + '亿'
                }
            },
            Rain100: {
              'Explain': resObj[i].Rain100.Explain,
              'Statistic': {
                面积: resObj[i].Rain100.Statistic.面积 + '万平方千米',
                人口: resObj[i].Rain100.Statistic.人口 + '万',
                GDP: resObj[i].Rain100.Statistic.GDP + '亿'
              }
            },
            Rain250: {
              'Explain': resObj[i].Rain250.Explain,
              'Statistic': {
                面积: resObj[i].Rain250.Statistic.面积 + '万平方千米',
                人口: resObj[i].Rain250.Statistic.人口 + '万',
                GDP: resObj[i].Rain250.Statistic.GDP + '亿'
              }
            }
        }]
        for (var j=0; j < Sobj.length; j++) {
          let obj = {
            SumRain: resObj[i].SumRain,
            Rain1H: resObj[i].Rain1H,
            Rain3H: resObj[i].Rain3H,
            Rain6H: resObj[i].Rain6H,
            SumRainExcess: resObj[i].SumRainExcess,
            Rain1HExcess: resObj[i].Rain1HExcess,
            MonthMax: resObj[i].MonthMax,
            HisMax: resObj[i].HisMax,
            Rain50: Sobj[j].Rain50,
            Rain100: Sobj[j].Rain100,
            Rain250: Sobj[j].Rain250,
          }
          for(var key in obj){  //控制数据显示的顺序
            this.initkey.push(key)
          }
          tree.push(obj)
          resObj.splice(i, 1)
        }
      }
      // tree 根节点，resData当前没有遍历到的节点
      // this.run(resObj, tree)
      this.initTreeData(tree)
      return tree
    },
    toTreeDataTemp(data) {
      let resObj = [data]
      console.log(data)
      console.log(resObj)
      let tree = []
      this.initkey = []
      // 高温、低温
      if(resObj[0].HTEMPAGP) {
        for (let i = 0; i < resObj.length; i++) { 
          let Sobj = [{
              HTEMPAGP: {
                  'Explain': resObj[i].HTEMPAGP.Explain,
                  'Statistic': {
                    温度: resObj[i].HTEMPAGP.Statistic.温度,                
                    面积: resObj[i].HTEMPAGP.Statistic.面积 + '万平方千米',
                    人口: resObj[i].HTEMPAGP.Statistic.人口 + '万',
                    GDP: resObj[i].HTEMPAGP.Statistic.GDP + '亿'
                  }
              }        
          }]
          for (var j=0; j < Sobj.length; j++) {
            let obj = {
              HISHTEMP: resObj[i].HISHTEMP,
              HISMONTHHTEMP: resObj[i].HISMONTHHTEMP,
              HISSAMEDAYHTEMP: resObj[i].HISSAMEDAYHTEMP,
              HTEMPD: resObj[i].HTEMPD,
              HTEMPDAYS: resObj[i].HTEMPDAYS,
              HTEMPH: resObj[i].HTEMPH,
              HTEMPMAXDAYS: resObj[i].HTEMPMAXDAYS,
              HTEMPSTACOUNT: resObj[i].HTEMPSTACOUNT,            
              HTEMPAGP: Sobj[j].HTEMPAGP,
            }
            for(var key in obj){  //控制数据显示的顺序
              this.initkey.push(key)
            }
            tree.push(obj)
            resObj.splice(i, 1)
          }
        }
      }else if(resObj[0].LTEMPAGP){
        for (let i = 0; i < resObj.length; i++) {      
          let Sobj = [{
              LTEMPAGP: {
                  'Explain': resObj[i].LTEMPAGP.Explain.substring(0,resObj[i].LTEMPAGP.Explain.length-1),
                  'Statistic': {
                    温度: resObj[i].LTEMPAGP.Statistic.温度,                
                    面积: resObj[i].LTEMPAGP.Statistic.面积 + '万平方千米',
                    人口: resObj[i].LTEMPAGP.Statistic.人口 + '万',
                    GDP: resObj[i].LTEMPAGP.Statistic.GDP + '亿'
                  }
              }        
          }]
          for (var j=0; j < Sobj.length; j++) {
            let obj = {
              HISLTEMP: resObj[i].HISLTEMP,
              HISMONTHLTEMP: resObj[i].HISMONTHLTEMP,
              HISSAMEDAYLTEMP: resObj[i].HISSAMEDAYLTEMP,
              LTEMPD: resObj[i].LTEMPD,
              LTEMPDAYS: resObj[i].LTEMPDAYS,
              LTEMPH: resObj[i].LTEMPH,
              LTEMPMAXDAYS: resObj[i].LTEMPMAXDAYS,
              LTEMPSTACOUNT: resObj[i].LTEMPSTACOUNT,            
              LTEMPAGP: Sobj[j].LTEMPAGP,
            }
            for(var key in obj){  //控制数据显示的顺序
              this.initkey.push(key)
            }
            tree.push(obj)
            resObj.splice(i, 1)
          }
        }
      }
      // tree 根节点，resData当前没有遍历到的节点
      // this.run(resObj, tree)
      console.log(tree);
      this.initTreeData(tree)
      return tree
    },
    initTreeData (initTreeData) {
      this.datas = []
      // console.log('initTreeData', initTreeData)
      for (var i = 0; i < initTreeData.length; i++) {
        this.datas = initTreeData[i]
      }    
      // console.log(this.initkey)
    },
    run () {
      this.statisticdata = []
      if (this.initRain === 'SumRainExcess') {
        for (var i = 0; i < this.tinitdatas.length; i++) {
          let obj = {
            超过50: this.tinitdatas[i]['RAIN50'] + '个',
            超过100: this.tinitdatas[i]['RAIN100'] + '个',
            超过250: this.tinitdatas[i]['RAIN250'] + '个'
          }
          this.statisticdata.push(obj)
        }
      } else if (this.initRain === 'Rain1HExcess') {
        for (var i = 0; i < this.tinitdatas.length; i++) {
          let obj = {
            超过40: this.tinitdatas[i]['RAIN40'] + '个',
            超过50: this.tinitdatas[i]['RAIN50'] + '个',
            超过60: this.tinitdatas[i]['RAIN60'] + '个',
            超过70: this.tinitdatas[i]['RAIN70'] + '个',
            超过80: this.tinitdatas[i]['RAIN80'] + '个',
            超过90: this.tinitdatas[i]['RAIN90'] + '个',
            超过100: this.tinitdatas[i]['RAIN100'] + '个'
          }
          this.statisticdata.push(obj)
        }
      } else {
        for (var i = 0; i < this.tinitdatas.length; i++) {
          var rain = this.tinitdatas[i]['RAIN'];
          if(typeof rain == 'string' && rain.indexOf('.')>-1) { //小数
            rain = Number(rain).toFixed(1) //保留一位小数
          }else if(typeof rain == 'string' && rain.indexOf('.') == -1){ //整数
            rain = rain+".0"
          }
          let obj = {
            // tinitData: this.tinitdatas[i],
            // initStatisData: this.datas[this.initRain]['Statistic'],
            站点: this.tinitdatas[i]['CNAME'] + '(' + this.tinitdatas[i]['V01300'] + ')',
            位置: this.tinitdatas[i]['PROVINCENAME'] + this.tinitdatas[i]['CITYNAME'] + this.tinitdatas[i]['CNTYNAME'],
            '降水量(毫米)': rain
          }
          // '降水量(毫米)': this.tinitdatas[i]['RAIN']
          // '数据时间':this.tinitdatas[i]['D_DATETIME']
          if(this.tinitdatas[i]['D_DATETIME']){
            var time1 = this.tinitdatas[i]['D_DATETIME']
            time1=time1.split(' ')[0] + " " + time1.split(' ')[1].split(":")[0] +"时"
            obj['数据时间']= time1
          }
          this.statisticdata.push(obj)
        }
      }
    },
    runTemp() {
      this.statisticdata = []
      if (this.initTemp === 'HTEMPAGP' || this.initTemp === 'LTEMPAGP') {
        for (var i = 0; i < this.tinitdatas.length; i++) {
          let obj = {
            温度: this.tinitdatas[i]['温度'],
            面积: this.tinitdatas[i]['面积'] + '万平方千米',
            人口: this.tinitdatas[i]['人口'] + '万',
            GDP: this.tinitdatas[i]['GDP'] + '亿'
          }
          this.statisticdata.push(obj)
        }
      } else if (this.initTemp === 'HTEMPSTACOUNT') {
        for (var i = 0; i < this.tinitdatas.length; i++) {
          let obj = {
            '高温III级(≥39℃)': this.tinitdatas[i]['高温III级(≥39℃)'] + '个',
            '高温II级(≥37℃)': this.tinitdatas[i]['高温II级(≥37℃)'] + '个',
            '高温I级(≥35℃)': this.tinitdatas[i]['高温I级(≥35℃)'] + '个'            
          }
          this.statisticdata.push(obj)
        }
      }else if (this.initTemp === 'LTEMPSTACOUNT') {
        for (var i = 0; i < this.tinitdatas.length; i++) {
          let obj = {
            '低温(≤-20℃)': this.tinitdatas[i]['低温(≤-20℃)'] + '个',         
          }
          this.statisticdata.push(obj)
        }
      } else {
        for (var i = 0; i < this.tinitdatas.length; i++) {
          var temp = this.tinitdatas[i]['TEMP'];
          if(typeof temp == 'string' && temp.indexOf('.')>-1) { //小数
            temp = Number(temp).toFixed(1) //保留一位小数
          }else if(typeof temp == 'string' && temp.indexOf('.') == -1){ //整数
            temp = temp+".0"
          }
          let obj = {
            // tinitData: this.tinitdatas[i],
            // initStatisData: this.datas[this.initRain]['Statistic'],
            站点: this.tinitdatas[i]['CNAME'] + '(' + this.tinitdatas[i]['V01300'] + ')',
            位置: this.tinitdatas[i]['PROVINCENAME'] + this.tinitdatas[i]['CITYNAME'] + this.tinitdatas[i]['CNTYNAME'],
          }
          // '降水量(毫米)': this.tinitdatas[i]['RAIN']
          // '数据时间':this.tinitdatas[i]['D_DATETIME']
          if(this.tinitdatas[i]['TEMP']){          
            obj['温度(℃)']= temp
          }
          if(this.tinitdatas[i]['COUNT35']){          
            obj['气温≥35℃站点数']= this.tinitdatas[i]['COUNT35']
          }
          if(this.tinitdatas[i]['COUNT37']){          
            obj['气温≥37℃站点数']= this.tinitdatas[i]['COUNT37']
          }
          if(this.tinitdatas[i]['COUNT40']){          
            obj['气温≥40℃站点数']= this.tinitdatas[i]['COUNT40']
          }
          if(this.tinitdatas[i]['MAXCOUNT']){          
            obj['最大站点数']= this.tinitdatas[i]['MAXCOUNT']
          }
          
          if(this.tinitdatas[i]['D_DATETIME']){
            var time1 = this.tinitdatas[i]['D_DATETIME']
            time1=time1.split(' ')[0] + " " + time1.split(' ')[1].split(":")[0] +"时"
            obj['数据时间']= time1
          }
          this.statisticdata.push(obj)
        }
      }
    },
    setStatisticDatajobId (val) {
      console.log(this.$store.state.dataType)
      if (val) {
        this.initjobIdData = val
        this.loading = true
        setTimeout(() => {
          this.activeNames = ''
        }, 400)
        var url = this.StatisticDataUrl + '&jobid=' + val + '&weather=' + this.$store.state.oneMapModel.weaType + '&dataType=' + this.$store.state.dataType ;
         console.log(url)
        this.$get(url).then(res => {
          let resData = {}
          if(res) { resData = JSON.parse(res)} else {resData =res}
          console.log(resData)
          /* RAIN
          * SUMRAIN: 总降水量
          * SUMRAINEXCESS: 总的降水量超过
          * MAX1HOURRAIN: 最大一个小时的降水量
          * MAX1HOURRAINEXCESS: 最大一个小时的降水量超过
          * MAX3HOURRAIN: 最大三个小时的降水量
          * MAX6HOURRAIN: 最大6个小时的降水量
          * RAIN50: 50毫米以上降水量
          * RAIN100: 100毫米以上降水量
          * RAIN250: 250毫米以上降水量
          * EXCESSHISMAX: 降水量突破历史极值站点
          * EXCESSMONTHMAX: 降水量突破月极值站点
          */
          if(this.MenuBarId == 0) {
            this.$store.commit('setResinitIsDataError',{isDataErr:resData.DataError.IsDataError,errExplain:resData.DataError.Explain})
            let collectionData = resData.Rain
            this.toTreeData(collectionData)
            console.log(resData)
            this.itemTagval = ''
            this.back = ''
            let collectionDataArriveTime = resData.DataArriveTime
            this.DataArriveTime = collectionDataArriveTime.DataArriveTime
            this.DataArriveExplain = collectionDataArriveTime.Explain
          }else {
            this.$store.commit('setResinitIsDataError',{isDataErr:resData.DATAERROR.IsDataError,errExplain:resData.DATAERROR.Explain})
            let collectionData = resData.Temp  
            console.log(collectionData)        
            this.toTreeDataTemp(collectionData)
            this.itemTagval = ''
            this.back = ''
            let collectionDataArriveTime = resData.DATAARRIVETIME
            this.DataArriveTime = collectionDataArriveTime.DataArriveTime
            this.DataArriveExplain = collectionDataArriveTime.Explain  
          }          
        })
          .catch(error => {
          this.$store.commit('setResinitIsDataError',{isDataErr:false})
            this.itemTagval = 'err'
            this.back = '#e87e04'
            this.datas = []
            this.initkey = []
            this.statisticdata = []
            console.log(error)
          })
      } else {
        console.log('暂无要查询的时间段')
      }
    },
  },
  watch: {
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
            console.log(that.screenWidth)
            that.timer = false
        }, 400)
      }
    },
    initAreaid () {
      this.setStatisticDatajobId(this.initAreaid)
    },
    MenuBarId:function(val) {
      if(val=='0') {        
        this.explain = Explain
        this.setStatisticDatajobId(this.initjobId)
      }
      else if(val=='1') {   
        this.explain = ExplainTemp   
        this.setStatisticDatajobId(this.initjobId)
      }
    },
  },
  computed: {
    initjobId () {  //时间
      return  this.$store.state.oneMapModel.jobId
    },
    initAreaid () {  //区域
      return  this.$store.state.oneMapModel.areaid1
    },
    MenuBarId:function(){ //顶部导航 降水0/气温1
      return this.$store.state.MenuBarId
    }
  },
  created () {
    this.setStatisticDatajobId(this.initjobId)
  }
}
</script>
<style>
   #DataCollection {
     width: 100%;
     height: inherit;
     border: 1px solid #d6d6d6;
     border-radius: 3px;
     background: #fff;
   }
   #DataCollection .CollectionTime {
     margin: 0.7% 0.7% 0.5% 0.7%;
     width: auto;
     line-height: 0px;
   }
   #DataCollection .CollectionTime .CollectionTime-icon {
     background: #0588c2;
     padding: 16% 55% 20% 22%;
     text-align: center;
     border-radius: 8px 0 0 0;
   }
   #DataCollection .CollectionTime span{
     display: inline-block;
     width:99%;
     width: -webkit-fill-available;
     padding: 2.5%;
     padding-left: 1%;
     font-size: 13px;
     background: #e6eff2;
     border: 1px solid #d6d6d6;
     border-left: none;
     border-radius: 0 8px 0 0;
     color: #000000;
     margin-left: -2.5%;
   }
   #DataCollection .CollectionList {
     float: left;
     width:99%;
     /* width: 100%; */
     margin: 0.7%;
     margin-top: 0;
   }
   #DataCollection .CollectionList .CollectionAbstract {
     position: absolute;
     right: 2px;
     top: 16%;
   }
   #DataCollection .CollectionList .el-collapse {
     border-top: none;
     border-bottom: none;
   }
   #DataCollection .CollectionList .el-collapse-item__header {
     border-radius: 8px 8px 0 0;
     background: #019eb6;
     padding: 2.3%;
     text-align: left;
     color: #fff;
     margin-bottom: 0.3%;
     border-bottom: none;
     position: relative;
   }
   #DataCollection .CollectionList .el-collapse-item__arrow, #DataCollection .CollectionList .el-collapse-item__header {
     /* position: relative; */
     font-size: 12px;
     line-height: 0px;
     height: 0px;
   }
   #DataCollection .CollectionList .el-collapse-item__arrow {
     float: left;
     padding: 0.1%;
     margin-left: -1%;
     margin-right: 1%;
     display: none;
   }
   #DataCollection .CollectionList .el-collapse-item:last-child .el-collapse-item__arrow,
    #DataCollection .CollectionList .el-collapse-item:nth-last-child(2) .el-collapse-item__arrow,
    #DataCollection .CollectionList .el-collapse-item:nth-last-child(3) .el-collapse-item__arrow {
     display: none;
   }
   #DataCollection .CollectionList .el-collapse-item:last-child .el-collapse-item__header span,
    #DataCollection .CollectionList .el-collapse-item:nth-last-child(2) .el-collapse-item__header span,
    #DataCollection .CollectionList .el-collapse-item:nth-last-child(3) .el-collapse-item__header span {
     left: 2%;
   }
   #DataCollection .CollectionList .el-collapse-item__content {
     padding-bottom: 0px;
   }
   #DataCollection .CollectionList .el-collapse-item__header span {
      position: absolute;
      left: 2%;
      top: 46%;
      z-index: 5;
      background: rgb(1, 158, 182);
   }
   .el-collapse-item__wrap {
       width: -webkit-fill-available;
   }
   #DataCollection .CollectionList .itemTag {
      float: left;
      margin-left: 2px;
      line-height: 150%;
      border-radius: 7px 7px 0 0;
      border: 1px solid rgba(255,255,255,0.6);
      background: #049372;
      font-size: 12px;
   }
   #DataCollection .CollectionList .itemTag:nth-child(1) {
      border-radius: 19px 7px 0 0;
      text-indent: 8px;
   }
   #DataCollection .CollectionList .itemTag:nth-child(2) {
      background: #e87e04;
   }
   #DataCollection .CollectionList .itemTag:nth-child(3) {
      background: #d64541;
   }
   #DataCollection .CollectionList .itemTag:nth-child(4) {
      background: #8e44ad;
      margin-left: 0px;
   }
   .CollectionTableList .noQuery {
     padding: 3%;
     background: #e6f2f2;
   }
   /*  */
   #CollectionTableList{
      max-height: 280px;
      padding-bottom: 1%;
      padding-top: 0.1%;
   }
   #CollectionTableList .el-table {
      max-height: inherit;
      overflow: auto;
      font-size: 12px;
   }
   #CollectionTableList .el-table th {
      background: #e6f2f2;
      color: #010101;
   }
   #CollectionTableList .el-table td {
      border-bottom: 1px solid #c1d1de;
   }
   #CollectionTableList .el-table--border td, #CollectionTableList .el-table--border th, #CollectionTableList .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
      border-right: 1px solid #c1d1de;
   }
   #CollectionTableList .el-table td, #CollectionTableList .el-table th {
      padding: 1%;
      text-align: center;
   }
   #CollectionTableList div.el-table--border, #CollectionTableList .el-table--group {
      border: 1px solid #c1d1de;
   }
   #CollectionTableList .el-table--border::after, #CollectionTableList .el-table--group::after, #CollectionTableList .el-table::before {
      background: none;
   }
   #CollectionTableList .el-table .el-table__row td:first-child {
      background: #e6f2f2;
   }
   #CollectionTableList .el-table .cell, #CollectionTableList .el-table--border td:first-child .cell, #CollectionTableList .el-table--border th:first-child .cell {
     padding: 1%;
     line-height: 160%;
   }
   #DataCollection .el-alert{
    padding:6px 16px
  }
   #DataCollection .el-collapse-item__wrap{
     overflow: visible;
   }
   #DataCollection .el-table__body-wrapper{
     overflow: visible;
     z-index: 10;
   }
   #DataCollection .el-table__header-wrapper{
     border-bottom: 1px solid #c1d1de;
     padding-bottom: 0.3px ;
     margin-top: 0.3px;
   }
   #DataCollection .el-table__footer-wrapper, .el-table__header-wrapper{
     overflow: visible;
   }
   .el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper{
     width:max-content;
   }
</style>
