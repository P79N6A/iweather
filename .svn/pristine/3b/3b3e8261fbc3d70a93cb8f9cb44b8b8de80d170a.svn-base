import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 存储图片和对应的统计表信息,统计表数据来源
export default new Vuex.Store({
  state: {
    mapApi:'',
    // 业务图层数组
    BusiLayers: '',
    busiElements:'',
    // 数据模型
    oneMapModel:{
        // 当前作业ID
        jobId:'362',
        //类型  降水0/气温1
        weaType:"Rain",
        // 日数据/小时数据
        boolDays:false,
        // 范围选择
        areaid1: '',
        // 当前业务图
        busiLayer: '',
        // 当前范围
        areaId: 0,
        // 当前业务图标题、图例
        busiElement:{
          legend :'',
          title:''
        },
        maskUrl:'',
        // 当前数据概要
        statistics_important:''
        // let  TiledMapServiceLayer,ArcGISDynamicMapServiceLayer,MapImageLayer,MapImage,GraphicsLayer={}
        // let  Draw,Graphic,Point, Query, Projection,GeometryService={}
        // let  SimpleMarkerSymbol,curTextSymbol,Font,Color= {}
        // let  on,esriConfig={}
    },
    // 地图状态
    map: {},
    // 标注的显示
    labelModel:{},
    labelVisible:false,
    isprint:false,
    // 导出材料
    initPrint: {
      printName: '全国降水量实况图',  // 自定义名字
      printFormat: 'png' // 格式
    },
    regionData:{title:'全国'},
    clearLabel:false, //左侧工具栏中 的 标注按钮是否激活
    clearRegion:false,
    getCityRegionID: '',
    DataCollectionError:{IsDataError:'',errExplain:''} ,//数据统计是否异常
    MenuBarName:'降水量', //顶部导航菜单数据
    MenuBarId:'0',
    dataType: 'HighTemp'
  },
  getters: {
    // 数据解析
  },
  actions: {
    setCurrentJob: (state, data) => {
      state.oneMapModel.jobId = data
      let index = state.BusiLayers.indexOf(data)
      if(index==-1){
          // 加载数据
        var mapImage = new this.curMapImage({
          'extent': {
            'xmin': -2777796.922672978,
            'ymin': -2005769.4434461233,
            'xmax': 2358163.4937154553,
            'ymax': 2319972.1128664752,
            'spatialReference': { wkt: 'PROJCS["Albers Conical Equal Area",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Albers"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",105.0],PARAMETER["Standard_Parallel_1",27.0],PARAMETER["Standard_Parallel_2",45.0],PARAMETER["Latitude_Of_Origin",35.0],UNIT["Meter",1.0]]' }},
          'href': url
        })
        var mil = this.curMapImageLayer()
        mil.id = '业务'
        mil.addImage(mapImage)
        this.mapData.addLayer(mil)
      }
      else {
        state.oneMapModel.jobId = data
        state.oneMapModel.busiLayer = state.BusiLayers[index]
        state.oneMapModel.busiElement = state.busiElements[index]
      }
    },
    setVisible ({ commit }) {
      commit('setVisible')
    },
    setMap ({commit}, map) {
      commit('setMap', map)
    },
    loadLayers ({ commit }) {
      this.$get('http://10.28.16.156:63247/api/Dataservice/GetMapElementInfo?jobid=362')
        .then(response => {
        })
        .catch(error => console.log(error))
    },
    loadStatisticData ({ commit }, statisData) {
      this.$get('http://10.28.16.156:8080/api/Dataservice/GetData?type=HEADINFO')
        .then(response => {
          const statisData = response.results
          commit('StatisticData', statisData)
        })
        .catch(error => console.log(error))
    },
    checkData ({ state }) {
      var boolBussLayer = state.BusinessLayers.has(state.dataID)
      var boolStatisImportant = state.statistics_important.has(state.dataID)

      if (boolBussLayer) {
        state.BusinessLayer = state.BusinessLayers.get(state.dataID)
      }
      if (boolStatisImportant) {
        state.statistic_important = state.statistics_important.get(state.dataID)
      }
    },
    addLayerLabel ({commit}, state){
      let url = 'http://10.28.16.156:8080/api/Dataservice/GetData?type=SumRain'
      this.$get(url).then(returnData => {
        returnData = JSON.parse(returnData)

        var markerSymbol = {
          type: "simple-marker",
          color: [226, 119, 40]
        };
        returnData.forEach(function (json,index) {
          var x = json.V06001;
          var y = json.V05001;
          var point={
            type: "point",
            longitude: x,
            latitude: y
          };
          var graphic =new this.Gra(point, markerSymbol)
          graphic.setGeometry(point)
          graphic.setSymbol(markerSymbol);
          this.mapData.graphics.add(graphic)
          commit('addLayerLabel', map)
        })
      })
    }
  },
  mutations: {
    changDataType: (state,data) => {
      state.dataType = data.dataType
    },
    setMapApi: (state, data)=>{
      state.mapApi = data
    },
    setCurrentJob: (state, data) => {
      state.oneMapModel.jobId = data.jobid
      state.oneMapModel.weaType = data.weaType
      state.oneMapModel.boolDays = data.boolDays
    },
    changLabelModel: (state, data) => {
      console.log(data.returnLabel)
      state.labelModel=data.returnLabel
    },
    setMap (state, map) {
      console.log(map.mapinfo)
      state.map = map.mapinfo
    },
    setVisible (state) {
      state.map.visible = false
    },
    setCurrentArea: (state, data) => {
      state.oneMapModel.areaId = data.areaId
      state.oneMapModel.maskUrl =data.maskUrl
    },
    ADD_LAYERS (state, layer) {
      if (!state.BusinessLayers.length < 10) {
        state.BusinessLayer.set(state.dataID, layer)
      }
    },
    StatisticData (state, statisData) {
      if (!state.statistics_important.length < 10) {
        console.log(statisData)
        state.statistic_important.set(state.dataID, JSON.parse(statisData))
      }
    },
    addLayerLabel ({commit}, state){
    },
    // 导出材料的名字
    setPrintName (state, data) {
      state.initPrint.printName = data
    },
    // 导出材料的格式
    setPrintFormat (state, data) {
      state.initPrint.printFormat = data
    },
    setAreaid (state, data) {
      state.oneMapModel.areaid1 = data
    },
    //1.记住上次选择的区域  2.区域同步标题
    initRegion:(state,data)=>{
      state.regionData=data;
    },
    // 城市标注范围选择ID
    setGetCityRegionID (state,data) {
      state.getCityRegionID = data
    },
    //是否数据异常
    setResinitIsDataError (state,data){
      state.DataCollectionError.IsDataError = data.isDataErr
      if(data.errExplain){
        state.DataCollectionError.errExplain = data.errExplain
      }
    },
    //顶部导航  降水0/气温1
    setMenuBarName(state,data){
      state.MenuBarId = data.menuid
      state.MenuBarName = data.menuName
    },
  }
})
