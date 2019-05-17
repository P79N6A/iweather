/**
 * 地图操作工具类：mapTool
 * 地图初始化类：initMaps
 */
import esriLoader from 'esri-loader'
const options = {
  url: apiBaseUrl
}
let _this=this
// 初始化地图
let initMaps = esriLoader.loadModules(['esri/map',
  'esri/layers/ArcGISTiledMapServiceLayer',
  'esri/layers/ArcGISDynamicMapServiceLayer',
  'esri/SpatialReference',
  'esri/geometry/Extent',
  'esri/layers/MapImage',
  'dojo/on',
  'esri/geometry/Point',
  'esri/layers/MapImageLayer',
  'esri/toolbars/navigation',
  'esri/toolbars/draw',
  "esri/graphic",
  'dojo/query',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/geometry/projection',
  'esri/tasks/GeometryService',
  'esri/layers/GraphicsLayer',
  "esri/symbols/Font",
  "esri/Color",
  "esri/symbols/TextSymbol",
  'esri/layers/FeatureLayer',
  "esri/renderers/UniqueValueRenderer",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  'esri/config'
], options)
  .then((Api) => {
    _this.Map = Api[0]
    _this.TiledMapServiceLayer = Api[1]
    _this.ArcGISDynamicMapServiceLayer = Api[2]
    _this.SpatialReference = Api[3]
    _this.Extent = Api[4]
    _this.MapImage = Api[5]
    _this.on = Api[6]
    _this.Point = Api[7]
    _this.MapImageLayer = Api[8]
    _this.Navigation = Api[9]
    _this.Draw = Api[10]
    _this.Graphic = Api[11]
    _this.Query = Api[12]
    _this.SimpleMarkerSymbol = Api[13]
    _this.Projection = Api[14]
    _this.GeometryService = Api[15]
    _this.GraphicsLayer = Api[16]
    _this.Font = Api[17]
    _this.Color = Api[18]
    _this.curTextSymbol = Api[19]
    _this.FeatureLayer = Api[20]
    _this.UniqueValueRenderer = Api[21]
    _this.SimpleFillSymbol = Api[22]
    _this.SimpleLineSymbol= Api[23]
    _this.esriConfig = Api[24]
    // 地图服务代理
    esriConfig.defaults.io.proxyUrl = PROXYURL
    esriConfig.defaults.io.alwaysUseProxy = true
    return _this
  }).catch(err => {
    console.error(err)
  })

// 地图工具
let mapTool ={
// 范围计算，这个方法在有一定缺陷
  extentCompute : function (geos) {
    let e3 = geos[0]
    for(let i =1 ;i<geos.length;i++){
      var e1 = geos[i]
      // var e2 = geo2[i-1].getExtent()
      e3.YMIN = parseInt(e1.YMIN)>parseInt(e3.YMIN)? parseInt(e3.YMIN):parseInt(e1.YMIN)
      e3.XMAX = parseInt(e1.XMAX)>parseInt(e3.XMAX)? parseInt(e1.XMAX):parseInt(e3.XMAX)
      e3.XMIN = parseInt(e1.XMIN)>parseInt(e3.XMIN)? parseInt(e3.XMIN):parseInt(e1.XMIN)
      e3.YMAX = parseInt(e1.YMAX)>parseInt(e3.YMAX)? parseInt(e1.YMAX):parseInt(e3.YMAX)
    }
     console.log(e3)
    return e3
  },
  // 获取范围
  getExtent: function (obj) {
     if(typeof(obj) =='geometry'){
     }else {
     }
  }

}

export default {
  initMaps,
  mapTool
}
