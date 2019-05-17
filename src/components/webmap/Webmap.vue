<template>
  <div id="Webmap">
    <!-- {{ name }} -->
    <div class="eail">
      <!--  style="height: -webkit-fill-available;width: 100%;" -->
      <div id="mapDivId" @drop="onDrop" @dragover="ondragover" @dragenter="ondragenter" style="height:inherit;width: 100%;">
    </div>
    <!--地图元素-->
    <div class="ele">
      <titleEle></titleEle>
    </div>
    <!--图例元素-->
      <div class="legend">
        <legendEle></legendEle>
      </div>
      <!--南海小地图-->
      <div v-show="southSeaVisible" class="southSea">
        <southSea></southSea>
      </div>
    </div>
    <!-- 放大缩小 -->
    <div class="mapWidget" data-html2canvas-ignore="true">
      <el-tooltip class="item"  :disabled="true">
        <img id="widgetItem" name="放大" src="../../assets/images/enlarge.png" />
        <!-- <el-button>左上</el-button> -->
      </el-tooltip>
      <el-tooltip class="item"  :disabled="true">
        <img id="widgetItem" name="缩小" src="../../assets/images/narrow.png" />
      </el-tooltip>
      <el-tooltip class="item"  :disabled="true">
        <img id="widgetItem" name="移动" src="../../assets/images/move.png" />
      </el-tooltip>
      <el-tooltip class="item" :disabled="true">
        <img id="widgetItem" name="全图" src="../../assets/images/total_graph.png" />
      </el-tooltip>
      <el-tooltip class="item" :disabled="true">
        <div name="全国" id="widgetItem" style="background-color:#fff;width: 32px;height: 32px;float: left; vertical-align: middle;">
          <img  name="全国" src="../../assets/images/a3.png" style="width:21px;margin-left: 4px;margin-top: 7px;"/>
        </div>
      </el-tooltip>
      <el-tooltip class="item" :disabled="true">
        <img id="widgetItem" name="清除" src="../../assets/images/clear.png" />
      </el-tooltip>
      <!--<el-tooltip class="item" effect="dark" content="切换" placement="left-end">-->
      <!--<img id="widgetItem" name="切换" src="../../assets/images/clear.png" />-->
      <!--</el-tooltip>-->
    </div>
    <!--时间选择-->
    <div data-html2canvas-ignore="true">
      <timeMenu></timeMenu>
    </div>
  </div>
</template>

<script>
import esriLoader from 'esri-loader'
// import config from '../../config'
import titleEle from '../webmap/mapele/title.vue'
import legendEle from '../webmap/mapele/legend.vue'
import timeMenu from '../menu/timeMenu.vue'
import southSea from '../webmap/mapele/southSea.vue'
import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
// import { mapState, mapMutations, mapActions } from 'vuex'
const citys=["110000", "120000", "310000", "500000", "130000", "140000", "210000", "220000", "320000", "330000", "340000", "350000", "360000", "370000", "410000", "420000", "430000", "440000", "460000", "510000", "520000", "530000", "610000", "620000", "630000", "710000", "230000", "150000", "450000", "540000", "640000", "650000", "810000", "820000"]
export default {
  name: 'Webmap',
  components: {
    ElInput,
    titleEle,
    legendEle,
    timeMenu,
    southSea
  },
  data () {
    return {
      name: '地图',
      curMap: '',
      mapFullExtent:'',
      initExtent:'',
      southSeaVisible: true,
      curBusinessLayer: '',
      curTool: '',
      lastTool:'',
      firstGradeRiver:'',
      firstGradeRegionRiver:'',
      firstGradeVisible:''
    }
  },
  created: function () {
    this.createMap()
  },
  methods: {
    createMap: function () {
      var _this=this
      console.log(_this.myMap)
      this.myMap.initMaps.then(function (MapApi) {
        _this.$store.commit("setMapApi",MapApi)
        _this.curGraphicsLayer = new MapApi.GraphicsLayer({id:'graphicsId'})
        _this.myGraphicsLayer = new MapApi.GraphicsLayer({id:'graphicsId'})
        _this.getCityGraphicsLayer = new MapApi.GraphicsLayer({id:"graphicsCity"})
      //  _this.getCountryGraphicsLayer = new MapApi.GraphicsLayer({id:"graphicsCountry"})

        var  startExtent = new MapApi.Extent({
          xmin:  -2767796.9226729777,
          ymin: -1913769.4434461233,
          xmax: 2333963.4937154553,
          ymax: 2219972.1128664752,
          spatialReference:{wkt:'PROJCS["Albers Conical Equal Area",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Albers"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",105.0],PARAMETER["Standard_Parallel_1",27.0],PARAMETER["Standard_Parallel_2",45.0],PARAMETER["Latitude_Of_Origin",35.0],UNIT["Meter",1.0]]'}
        })
        let myMap = new MapApi.Map('mapDivId', {
//        center: [-2777796.922672978, -2005769.4434461233, 2358163.4937154553, 2319972.1128664752],
          extent: startExtent,
          logo: false,
          slider: false,
          isKeyboardNavigation:false
          // navigationMode:"classic"
        })
        if(navigator.userAgent.indexOf('Chrome')>-1 && _this.is360() != '360') // ! 360
          myMap.navigationMode = 'classic'

        _this.$store.dispatch('setMap', {
          mapinfo: myMap
        })
        var baseMapLayer = new MapApi.TiledMapServiceLayer(baseMapUrl, {id: '底图'})
        baseMapLayer.FullExtent = startExtent
        myMap.addLayer(baseMapLayer)
        _this.addBusinessLayer(PROXYURL + '?' + businessLayerUrl+'?jobid=' + _this.jobId + "&weather=" + _this.$store.state.oneMapModel.weaType +"&isDays="+ _this.$store.state.oneMapModel.boolDays)

        _this.firstGradeRiver = new MapApi.TiledMapServiceLayer(FirstgradeRiverUrl, {id: '一级河流'})//全国时候的一级河流
        _this.firstGradeRegionRiver = new MapApi.ArcGISDynamicMapServiceLayer(FactorNoteOfFirstgradeRiver, {id: '一级河流'})//切换城市后的一级河流
        myMap.addLayer(_this.firstGradeRiver)

       // var HighwayLayer = new MapApi.TiledMapServiceLayer(HighwayUrl, {id: '交通'})
       // HighwayLayer.visible = false
       // myMap.addLayer(HighwayLayer)
        var sounthSeaLayer = new MapApi.TiledMapServiceLayer(sounthSeaUrl, {id: '南海岛屿'})
        myMap.addLayer(sounthSeaLayer)

        var OceanicNameLayer = new MapApi.TiledMapServiceLayer(OceanicNameUrl, {id: '海洋标注'})
        myMap.addLayer(OceanicNameLayer)

        var MainHighwayLayer = new MapApi.TiledMapServiceLayer(MainHighwayUrl, {id: '主要公路'})
        MainHighwayLayer.visible = false
        myMap.addLayer(MainHighwayLayer)
        var AllRoadsLayer = new MapApi.TiledMapServiceLayer(AllRoadsUrl, {id: '全部公路'})
        AllRoadsLayer.visible = false
        myMap.addLayer(AllRoadsLayer)

       // var RiversLayer = new MapApi.TiledMapServiceLayer(RiversUrl, {id: '其他河流'})
       // RiversLayer.visible = false
       // myMap.addLayer(RiversLayer)
        var TwogradeRiversLayer = new MapApi.TiledMapServiceLayer(TwogradeRiversUrl, {id: '二级河流'})
        TwogradeRiversLayer.visible = false
        myMap.addLayer(TwogradeRiversLayer)
        var ThreegradeRiversLayer = new MapApi.TiledMapServiceLayer(ThreegradeRiversUrl, {id: '三级河流'})
        ThreegradeRiversLayer.visible = false
        myMap.addLayer(ThreegradeRiversLayer)
        var FourgradeRiversLayer = new MapApi.TiledMapServiceLayer(FourgradeRiversUrl, {id: '四级河流'})
        FourgradeRiversLayer.visible = false
        myMap.addLayer(FourgradeRiversLayer)
        var FivegradeRiversLayer = new MapApi.TiledMapServiceLayer(FivegradeRiversUrl, {id: '五级河流'})
        FivegradeRiversLayer.visible = false
        myMap.addLayer(FivegradeRiversLayer)

       var proCapitalLayer = new MapApi.TiledMapServiceLayer(proCapitalUrl, {id: '省会标注'})
       myMap.addLayer(proCapitalLayer)
        _this.initExtent = myMap.extent

        // var disasterPointLayer = new MapApi.TiledMapServiceLayer(disasterUrl, {id: '风险点'})
        // disasterPointLayer.visible = false
        // myMap.addLayer(disasterPointLayer)
        var HiddenRiversDangersLayer = new MapApi.TiledMapServiceLayer(HiddenRiversDangersUrl, {id: '中小河流隐患点'})
        HiddenRiversDangersLayer.visible = false
        myMap.addLayer(HiddenRiversDangersLayer)
        var MountainFloodDangerLayer = new MapApi.TiledMapServiceLayer(MountainFloodDangerUrl, {id: '山洪沟隐患点'})
        MountainFloodDangerLayer.visible = false
        myMap.addLayer(MountainFloodDangerLayer)
        var DebrisflowLayer = new MapApi.TiledMapServiceLayer(DebrisflowUrl, {id: '泥石流'})
        DebrisflowLayer.visible = false
        myMap.addLayer(DebrisflowLayer)
        var landslidLayer = new MapApi.TiledMapServiceLayer(landslidUrl, {id: '滑坡'})
        landslidLayer.visible = false
        myMap.addLayer(landslidLayer)


        _this.curGeometryService = MapApi.GeometryService(GeometryServerUrl)

        myMap.on('click', function (e) {
          console.log(e.mapPoint.x)
          console.log(e.mapPoint.y)
          var point = myMap.toScreen(e.mapPoint)
        })

        // 添加拉框放大缩小
        // toolbar工具条
        var navToolbar = new MapApi.Navigation(myMap)
        var draw = new MapApi.Draw(myMap, { showTooltips: false })
        var queryThis = _this
        // 给按钮添加绑定事件
        MapApi.Query('.item').on('click', function (event) {
          // queryThis.curTool = this.name
          queryThis.curTool = event.target.name
          console.log(event.target.name)
          switch (event.target.name) {
            case '移动':
              navToolbar.activate(MapApi.Navigation.PAN)
              myMap.setMapCursor("Pointer");
              break
            case '放大':
              draw.deactivate()
              navToolbar.activate(MapApi.Navigation.ZOOM_IN)
              myMap.setMapCursor('url(../../assets/cursor/zoom-in.cur), auto')
              break
            case '缩小':
              draw.deactivate()
              navToolbar.activate(MapApi.Navigation.ZOOM_OUT)
              myMap.setMapCursor('url(../../assets/cursor/zoom-out.cur), auto')
              break
            case '全图':
              if(_this.mapFullExtent.xmin && _this.lastTool=='') {
                myMap.setExtent(_this.mapFullExtent)
                return
              }
              var  startExtent = new MapApi.Extent({
                xmin:queryThis.initExtent.xmin,
                ymin:queryThis.initExtent.ymin,
                xmax:queryThis.initExtent.xmax,
                ymax:queryThis.initExtent.ymax,
                spatialReference:{wkt:'PROJCS["Albers Conical Equal Area",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Albers"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",105.0],PARAMETER["Standard_Parallel_1",27.0],PARAMETER["Standard_Parallel_2",45.0],PARAMETER["Latitude_Of_Origin",35.0],UNIT["Meter",1.0]]'}
              })
              var outSpatialReference = new MapApi.SpatialReference('PROJCS["Albers Conical Equal Area",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Albers"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",105.0],PARAMETER["Standard_Parallel_1",27.0],PARAMETER["Standard_Parallel_2",45.0],PARAMETER["Latitude_Of_Origin",35.0],UNIT["Meter",1.0]]');
              queryThis.curGeometryService.project([ startExtent ], outSpatialReference, function(projectedPoints) {
                myMap.setExtent(projectedPoints[0])
              })
              queryThis.southSeaVisible = true
              break
            case '全国':
              queryThis.$store.commit('setCurrentArea', {areaId:['0'],maskUrl:''})
              queryThis.$store.commit("setAreaid", queryThis.jobID +'&area='+ ["0"])
              queryThis.$store.state.clearRegion = !queryThis.$store.state.clearRegion
              queryThis.$store.commit('initRegion',{index:'4',data:'',title:'全国'}) //预留:全国之后区域是否清空
              queryThis.$store.commit('setGetCityRegionID', '')
              myMap.removeLayer(_this.getCityGraphicsLayer)
           //   myMap.removeLayer(_this.getCountryGraphicsLayer)
              break
            case '清除':
              navToolbar.deactivate()
              draw.deactivate()
              if(queryThis.curGraphicsLayer.graphics.length==0){
                alert('当前地图没有标注!')
              }
              queryThis.$store.state.clearLabel = !queryThis.$store.state.clearLabel
              queryThis.$store.commit('changLabelModel', {returnLabel: {}}) //清除"标记"的记住
              myMap.removeLayer(queryThis.curGraphicsLayer)
              break
            case '切换':
              queryThis.switchDynamicMap()
          }
        })
        myMap.on("zoom-end", _this.zoomEnd)
        // 绘制点  11-21
        // myMap.on("load", _this.getCityRegionInfo)
        // console.log(_this.getCityGraphicsLayer.graphics)
      })
    },
    getCityRegionInfo (citydata) {
      var _this = this
      if(!citydata)   citydata=citys
      let cityUrl = PROXYURL + '?' +CityRegionInfo+'?id=' + citydata
      _this.getCityGraphicsLayer.graphics = []
      _this.mapData.removeLayer(_this.getCityGraphicsLayer)
      this.getCityReq(cityUrl,23,_this.getCityGraphicsLayer);
      /*  县标注   暂时没有用到
      if(this.mapData.getZoom()>28){
        let countryUrl = PROXYURL + '?' +GetCountyRegionInfo+'?id=' + citydata
        _this.getCountryGraphicsLayer.graphics = []
        _this.mapData.removeLayer(_this.getCountryGraphicsLayer)
        this.getCityReq(countryUrl,29,_this.getCountryGraphicsLayer);}
       */
    },
    getCityReq (url,zoomi,layeri) {
      let getCityPointArray = []
      let getCityTextData = []
      let Data = {}
      var _this=this
      _this.$get(url).then(resgetCity => {
        if(resgetCity) { Data = JSON.parse(resgetCity)} else { Data = resgetCity }
        console.log(Data)
        for(var j=0;j < Data.length;j++) {
          var pt = new _this.mapApi.Point({
            "x": Data[j].V06001,
            "y": Data[j].V05001,
            "spatialReference": 4326
          })
          var tet = {
            "text": Data[j].NAMEBZ
          }
          if(pt.x != '' && pt.y != '' && tet.text!=''){
            getCityPointArray.push(pt)
            getCityTextData.push(tet)
          }
        }
        _this.mapData.addLayer(layeri)

        if(_this.mapData.getZoom()<zoomi)
          _this.mapData.removeLayer(layeri);
        // 文字
        var getSpatialReference = new _this.mapApi.SpatialReference('PROJCS["Albers Conical Equal Area",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Albers"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",105.0],PARAMETER["Standard_Parallel_1",27.0],PARAMETER["Standard_Parallel_2",45.0],PARAMETER["Latitude_Of_Origin",35.0],UNIT["Meter",1.0]]')
        _this.curGeometryService.project(getCityPointArray, getSpatialReference, (projectedPoints)=> {
          projectedPoints.forEach((json, index)=>{
            var getCitysymbol =  new _this.mapApi.curTextSymbol({
              'text': getCityTextData[index].text,
              'color': {a:1,r:0,g:0,b:0}, // {a:1,r:0,g:0,b:0},  //{a:1,r:255,g:255,b:255}
              'angle': 0,
              'xoffset': 15,
              'yoffset': 3,
              'font': new _this.mapApi.Font("10pt",
                _this.mapApi.Font.STYLE_NORMAL,
                _this.mapApi.Font.VARIANT_NORMAL,
                _this.mapApi.Font.WEIGHT_BOLD, "微软雅黑"
              )
            })
            var getCityGraphic = new _this.mapApi.Graphic(projectedPoints[index],getCitysymbol)
            getCityGraphic.setGeometry(projectedPoints[index])
            getCityGraphic.setSymbol(getCitysymbol)
            layeri.add(getCityGraphic)
          })
        })
      })
        .catch(error => {
          console.log(error)
        })
    },
    onDrop: function (evt) {
    },
    ondragover: function (evt) {
      evt.preventDefault()
    },
    ondragenter: function (evt) {
      evt.preventDefault()
    },
    // 业务图
    addBusinessLayer: function () {
      var layer = this.mapData.getLayer("业务")
      if(layer) this.mapData.removeLayer(layer)
      console.log(this.url)
      var mapImage = new this.mapApi.MapImage({
        'extent': {
          'xmin': -2786796.922672978,
          'ymin': -1996769.4434461233,
          'xmax': 2356863.4937154553,
          'ymax': 2302672.1128664752,
          'spatialReference': { wkt: 'PROJCS["Albers Conical Equal Area",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Albers"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",105.0],PARAMETER["Standard_Parallel_1",27.0],PARAMETER["Standard_Parallel_2",45.0],PARAMETER["Latitude_Of_Origin",35.0],UNIT["Meter",1.0]]'
          }},
          'href': this.url
      })
      var mil = this.mapApi.MapImageLayer()
      mil.id = '业务'
      mil.addImage(mapImage)
      this.mapData.addLayer(mil)
      this.mapData.reorderLayer(mil,0)
    },
    // 打印地图
    initCopy: function (name, format){
      var targetDom = $('.eail')
      var zoom = $('body').css('zoom')
      var imgDiv = $('.eail #mapDivId_业务').clone(true)
      imgDiv.attr('id','tempimg')
      console.log(imgDiv)
      $('.eail')[0].insertBefore(imgDiv[0],$('.eail #mapDivId')[0])
      //克隆截图区域
      var copyDom = targetDom.clone(true)
      copyDom.width(targetDom.width() + "px")
      copyDom.height(targetDom.height() + "px")
      copyDom.attr("id", "copyDom").attr("style", 'position: absolute; z-index:-1; top: 0px; left: 0px;')
      copyDom.css('zoom',zoom)
      targetDom.append(copyDom)
      if (typeof html2canvas !== 'undefined') {
        var canvas1,parentNode,svgElem
        //以下是对svg的处理
        var nodesToRecover = [];
        var nodesToRemove = [];
        svgElem = $('#copyDom svg')
        svgElem.each(function (index, node) {
          parentNode = node.parentNode;
          var svg = node.outerHTML.trim();
          canvas1 = document.createElement('canvas');
          canvg(canvas1, svg);
          if (node.style.position) {
            canvas1.style.position += node.style.position;
            canvas1.style.left += node.style.left;
            canvas1.style.top += node.style.top;
          }
          nodesToRecover.push({
            parent: parentNode,
            child: node
          });
          parentNode.removeChild(node);
          nodesToRemove.push({
            parent: parentNode,
            child: canvas1
          });
          parentNode.appendChild(canvas1);
        });
        //html2canvas截图
        html2canvas(copyDom[0], {
          useCORS: true,
          imageTimeout:2000,
          taintTest: false,
          // foreignObjectRendering : true
          // proxy: "/" + ctxPath + "/proxy"
        }).then(function (canvas) {
         var context = canvas.getContext("2d")
          context.lineWidth = 2
          context.strokeStyle = '#000'
          context.strokeRect(1,1,targetDom.width()-1.5,targetDom.height()-1.5)
          imgDiv.remove()
          //克隆DOM删除
          copyDom.remove()
          if (navigator.userAgent.indexOf('Edge')!=-1 || navigator.userAgent.indexOf('Trident')!=-1){
            var blob = canvas.msToBlob();
            window.navigator.msSaveBlob(blob,name + "." + format);
            return;
          }
          var url = canvas.toDataURL("image/" + format, 1.0);
          //创建下载a标签
          var a = document.createElement("a")
          a.setAttribute("id", "download")
          document.body.appendChild(a)
          //以下代码为下载此图片功能
          var triggerDownload = $("#download").attr("href", url).attr("download", name + "." + format)
          triggerDownload[0].click()
          //移除下载a标签
          document.body.removeChild(a)
          parentNode.removeChild(canvas1);
        })
      }
    },
    labelLayerSet: function () {
      var layer = this.mapData.getLayer('graphicsId')
      if(layer != undefined) layer.clear()
      // 站点数据
      let _this = this
      let filter = ''
      if(_this.labelModel.order =='') {
        let min= _this.labelModel.Range.min==''?-999:_this.labelModel.Range.min
        let max= _this.labelModel.Range.max==''?8888:_this.labelModel.Range.max
        filter = stationFilter+ "?jobid="+this.jobID+"&area="+this.areaId+"&minValue="+min+"&maxValue="+max+"&weather="+this.$store.state.oneMapModel.weaType;
      } else {
        filter = stationFilter+ "?jobid="+this.jobID+"&area="+this.areaId+"&topValue="+_this.labelModel.order+"&weather="+this.$store.state.oneMapModel.weaType;
      }
      this.$get(filter).then(returnData => {
        if(returnData.length===0)
          this.$message({
            type: 'info',
            message: '当前筛选条件没有值'
          })
        returnData = JSON.parse(returnData);
        if(returnData.length>2000) {
          this.$confirm('当前显示数据量超过5000条, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.dataFilter(returnData)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
            return
          })}else {
          this.dataFilter(returnData)
        }
      })
    },
    dataFilter: function (returnData) {
      const loading = this.Loading.service({
        target: document.querySelector('#Webmap'),
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.4)'
      });
      let pointArray = []
      returnData.forEach((json, index)=>{
        // 如果降水量不在范围不显示
        if (parseFloat(json.RAIN) > parseFloat(this.labelModel.Range.max) || parseFloat(this.labelModel.Range.min) > parseFloat(json.RAIN)) {
          return false
        }
        // 如果index超出不显示
        if (this.labelModel.order != '' && index > this.labelModel.order)
          throw e
        var p = new this.mapApi.Point({
          "x": json.V06001,
          "y": json.V05001,
          "spatialReference": 4326
        })
        pointArray.push(p)
      });
      var outSpatialReference = new this.mapApi.SpatialReference('PROJCS["Albers Conical Equal Area",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Albers"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",105.0],PARAMETER["Standard_Parallel_1",27.0],PARAMETER["Standard_Parallel_2",45.0],PARAMETER["Latitude_Of_Origin",35.0],UNIT["Meter",1.0]]');
      this.mapData.addLayer(this.curGraphicsLayer)
      // console.log(this.curGraphicsLayer.graphics.length) //0
      this.curGeometryService.project(pointArray, outSpatialReference, (projectedPoints)=> {
        projectedPoints.forEach((json, index)=>{
          var symbol = new this.mapApi.SimpleMarkerSymbol({
            "color": [255, 255, 255, 64],
            "size": 25,
            "angle": -30,
            "xoffset": 0,
            "yoffset": 0,
            "type": "esriSMS",
            "style": "esriSMSCircle",
            "outline": {
              "color": [255, 0, 0, 255],
              "width": 5,
              "type": "esriSLS",
              "style": "esriSLSSolid"
            }
          })
          var font = new this.mapApi.Font(this.labelModel.size, this.mapApi.Font.STYLE_NORMAL, this.mapApi.Font.VARIANT_NORMAL, this.mapApi.Font.WEIGHT_BOLD);
          var textSymbol = new this.mapApi.curTextSymbol(returnData[index].RAIN, font, this.labelModel.color)
          var graphic = new this.mapApi.Graphic(projectedPoints[index], textSymbol)
          graphic.setGeometry(projectedPoints[index])
          graphic.setSymbol(textSymbol)
          this.curGraphicsLayer.add(graphic)
        })
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loading.close();
        });
      })
    },
    visibleLayer: function () {
      var layer = this.mapData.getLayer('graphicsId')
      if(layer === undefined) {
        this.mapData.addLayer(this.curGraphicsLayer)
        return
      }
      if(layer.visible) layer.hide()
      else if(!layer.visible) layer.show()
    },
    zoomEnd: function (evt) {
      console.log(this.mapData.getZoom())
      /*
      if(this.mapData.getZoom() <= 28){ //县
         this.mapData.removeLayer(this.getCountryGraphicsLayer)
      }
      else{
        if(!this.mapData.getLayer('graphicsCountry')) this.mapData.addLayer(this.getCountryGraphicsLayer)
      }
      */
      if(this.mapData.getZoom() <= 22) {//县
        this.mapData.removeLayer(this.getCityGraphicsLayer)
      }
      else{
        if(!this.mapData.getLayer('graphicsCity')) this.mapData.addLayer(this.getCityGraphicsLayer)
        if(this.areaId=='0' || this.areaId[0]=='0' || this.curTool=='全国'){
          this.getCityRegionInfo(citys)
        }
      }
      if(this.curTool=='全图') {
        this.curTool = ''
        return
      }else if(this.curTool=='全国') {
        this.curTool = ''
        this.southSeaVisible = true
        return
      }
      this.southSeaVisible = false
    },
    // 切换动态地图
    switchDynamicMap: function () {
      var DynamicBaseLayer = new this.mapApi.ArcGISDynamicMapServiceLayer(DynamicBaseMapUrl, {id: '动态底图'})
      let baseLayer = this.mapData.getLayer("底图")
      this.mapData.removeLayer(baseLayer)
      this.mapData.addLayer(DynamicBaseLayer)
      this.mapData.reorderLayer(DynamicBaseLayer,0)
    },
    // 切换范围
    switchArea: function (args) {
      this.lastTool  = ''
//      this.switchDynamicMap()
      var layer = this.mapData.getLayer("maskLayer")
      if (layer) this.mapData.removeLayer(layer)
      var layer = this.mapData.getLayer("一级河流")
      this.firstGradeVisible = layer.visible
      if (layer) this.mapData.removeLayer(layer)
      if(args[0] === '0') {
        this.lastTool  = '全国'
        this.mapData.setExtent(this.initExtent)
        this.mapFullExtent = this.initExtent
        this.mapData.addLayer(this.firstGradeRiver)
        if(this.firstGradeVisible) this.mapData.getLayer("一级河流").show()
        else this.mapData.getLayer("一级河流").hide()
        return
      }
      let area = "'"+args.join("','")+"'"
      let  _this = this

      if(this.curGraphicsLayer.graphics.length!=0)
        this.mapData.removeLayer(this.curGraphicsLayer)
      this.curGraphicsLayer.clear()
      this.$store.state.clearLabel = !this.$store.state.clearLabel
      this.$store.commit('changLabelModel', {returnLabel: {}}) //清除"标记"的记住

      this.mapData.addLayer(this.firstGradeRegionRiver) //切换区域时切换一级河流
      if(!this.firstGradeVisible) this.mapData.getLayer("一级河流").hide()
      else this.mapData.getLayer("一级河流").show()

      this.$get(RegionExtentUrl+"?id="+this.areaId.join(",")).then(returnData => {
        if(returnData.length < 1) return
        returnData = JSON.parse(returnData)
        let extent = _this.myMap.mapTool.extentCompute(returnData)
        let UseSpatialReference = 4326
        var startExtent = new _this.mapApi.Extent({
          xmin:extent.XMIN,
          ymin:extent.YMIN,
          xmax:extent.XMAX,
          ymax:extent.YMAX,
          spatialReference:UseSpatialReference
        })
        var outSpatialReference = new _this.mapApi.SpatialReference('PROJCS["Albers Conical Equal Area",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Albers"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",105.0],PARAMETER["Standard_Parallel_1",27.0],PARAMETER["Standard_Parallel_2",45.0],PARAMETER["Latitude_Of_Origin",35.0],UNIT["Meter",1.0]]');
        _this.curGeometryService.project([ startExtent ], outSpatialReference, function(projectedPoints) {
          _this.mapData.setExtent(projectedPoints[0])
          _this.mapFullExtent = projectedPoints[0]
          console.log(projectedPoints[0])
        })
      })
      this.renderMaskLayer()
    },
    // 渲染图层
    renderMaskLayer: function () {
      let layer = new this.mapApi.FeatureLayer(this.maskUrl, {id: 'maskLayer',mode:this.mapApi.FeatureLayer.MODE_ONDEMAND,outFields: ["*"]})
      var defaultSymbol = new this.mapApi.SimpleFillSymbol().setColor(new this.mapApi.Color([255,255,255]))
      defaultSymbol.outline.setStyle(this.mapApi.SimpleLineSymbol.STYLE_SOLID).setColor(new this.mapApi.Color([255,255,255]))
      var renderer = new this.mapApi.UniqueValueRenderer(defaultSymbol, "SGB_1");
      for(let area of this.areaId) {
        renderer.addValue(area, new this.mapApi.SimpleFillSymbol().setStyle(this.mapApi.SimpleLineSymbol.STYLE_NULL).outline.setStyle(this.mapApi.SimpleLineSymbol.STYLE_SOLID).setColor(new this.mapApi.Color([0,0,0])).setWidth(2))
      }
      layer.setRenderer(renderer)
      this.mapData.addLayer(layer)

//      var ProvincialBoundary = new this.mapApi.ArcGISDynamicMapServiceLayer('http://10.28.21.91:6080/arcgis/rest/services//onemap/FactorMunicipalLabel/MapServer', {id: '省线1'})
//      this.mapData.addLayer(ProvincialBoundary)
    },
    _mime:function(option, value) {
      var mimeTypes = navigator.mimeTypes;
      for (var mt in mimeTypes) {
        if (mimeTypes[mt][option] == value)
          return true;
      }
      return false;
    },
    is360:function() {
      var is360 = this._mime("type", "application/vnd.chromium.remoting-viewer");
      var browserType;
      if (is360) {
        browserType = '360';
      } else {
        browserType = "谷歌";
      }
      return browserType;
    },
  },
  mounted: function () {
    //在这里写试试
    console.log('mounted')
//    this.addLayer()
  },
  watch: {
    isprint:function(){
      this.initCopy(this.printName,this.printFormat)
    },
    labelModel:function(val){
      if (val.color)
        this.labelLayerSet()
    },
    mapData: function(){
      console.log('mapdata')
    },
    // 切换业务图地址
    url: function () {
      this.addBusinessLayer()
      if(this.curGraphicsLayer.graphics.length!=0)
      this.mapData.removeLayer(this.curGraphicsLayer)
      this.curGraphicsLayer.clear()
    },
    printName: function () {
    },
    areaId: function () {
      this.switchArea(this.areaId)
    },
    // ltt 11-25
    getCityRegionID: function () {
      this.getCityRegionInfo(this.getCityRegionID)
    }
  },
  computed: {
    mapData (){
      return this.$store.state.map
    },
    isprint(){
      return this.$store.state.isprint
    },
    labelModel(){
      return this.$store.state.labelModel
    },
    url (){
      return  PROXYURL + '?' + businessLayerUrl+'?jobid=' + this.$store.state.oneMapModel.jobId + "&weather=" + this.$store.state.oneMapModel.weaType +"&isDays="+this.$store.state.oneMapModel.boolDays + "&dataType=" + this.$store.state.dataType
    },
    jobID (){
      return  this.$store.state.oneMapModel.jobId
    },
    mapApi(){
      return this.$store.state.mapApi
    },
    printName () {
      return this.$store.state.initPrint.printName
    },
    printFormat () {
      return this.$store.state.initPrint.printFormat
    },
    areaId(){
      return this.$store.state.oneMapModel.areaId
    },
    maskUrl(){
      return this.$store.state.oneMapModel.maskUrl
    },
    getCityRegionID () {
      return this.$store.state.getCityRegionID
    }
  }
}
</script>

<style>
  @import url('http://10.20.90.140/arcgis_js_api/library/3.25/esri/css/esri.css');
  @import url('http://10.20.90.140/arcgis_js_api/library/3.25/dijit/themes/tundra/tundra.css');
  #Webmap {
    position: relative;
    overflow: hidden;
    height: 95%;
    height: -webkit-fill-available;
    border: 1px solid #d6d6d6;
    border-radius: 3px;
    background: #fff;
    margin-right: 0.4%;
  }
  #Webmap .mapWidget {
       position: absolute;
       bottom: 5px;
       right: 5px;
       z-index: 99;
       max-width: 33px;
  }
  #Webmap .mapWidget img {
       float: left;
       cursor: pointer;
  }
  #mapDivId_gc {
    text-shadow:rgb(255, 255, 255) 2px 1px
  }
  .ele{
    position: absolute;
    top: 8%;
    left: 35%;
  }
  .legend{
    position: absolute;
    bottom: 0px;
    left: 1.7rem;
    /*overflow: hidden;*/
  }
  .southSea{
    position: absolute;
    bottom: 0px;
    left: 1%;
    /*overflow: hidden;*/
  }
  .eail{
    /*position: relative;*/
     /*overflow: hidden;*/
    width: 100%;
    height: 100%;
    height: -webkit-fill-available;
  }

</style>
