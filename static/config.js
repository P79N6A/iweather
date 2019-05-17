/**
 * file config.js
 * abstract 项目配置
 */
/**
 * 代理路径
 */
// var PROXYURL = 'http://192.168.15.216:8087/DotNet1.1.0/proxy.ashx'
var innerMapIP = '10.20.71.254:6080'

/**
 * 代理路径
 *
 */
var PROXYURL = 'http://10.20.90.140/DotNet1.1.0/proxy.ashx'
/**
 * 配置数据源地址
 *
 */
let apiBaseUrl = ''
let baseMapUrl = ''
let proCapitalUrl = ''
let disasterUrl = ''
let FirstgradeRive
let HighwayUrl = ''
let RiversUrl = ''
let ProvincialBoundaryUrl = ''
let GPServerUrl =''
let GeometryServiceUrl = ''
let HiddenRiversDangersUrl = ''
let MountainFloodDangerUrl = ''
let DebrisflowUrl = ''
let landslidUrl = ''
let MainHighwayUrl= ''
let AllRoadsUrl= ''
let TwogradeRiversUrl= ''
let ThreegradeRiversUrl= ''
let FourgradeRiversUrl= ''
let FivegradeRiversUrl= ''
var DynamicBaseMapUrl=''
let FactorRiverMaskUrl=''
var FactorNoteOfFirstgradeRiver=''
var OceanicNameUrl=''
// 开发环境、生产环境
apiBaseUrl = 'http://10.20.90.140/arcgis_js_api/library/3.25/init.js'
// 底图
baseMapUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/OneMap/MapServer'
// 南海岛屿
sounthSeaUrl='http://'+ innerMapIP +'/arcgis/rest/services/iWeatherOneMap/NanhaiIslands/MapServer'
// 一级河流
FirstgradeRiverUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/FirstgradeRiver/MapServer'
// 省会标注
proCapitalUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/ProvincialCapital/MapServer'
// 灾害点
disasterUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/DisasterPoint/MapServer'
// 交通公路
HighwayUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/Highway/MapServer'
// 河流（二、三、四、五级河流）
RiversUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/Rivers/MapServer'
//省线（全国）
ProvincialBoundaryUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/ProvincialBoundary/MapServer'
// 地图打印GP服务地址
GPServerUrl = 'http://'+ innerMapIP +'/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task'
// 几何服务地址
GeometryServiceUrl = 'http://'+ innerMapIP +'/arcgis/rest/services/Utilities/Geometry/GeometryServer'
// 中小河流隐患点
HiddenRiversDangersUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/HiddenRiversDangers/MapServer'
// 山洪沟隐患点
MountainFloodDangerUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/MountainFloodDanger/MapServer'
// 泥石流隐患点
DebrisflowUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/Debrisflow/MapServer'
// 滑坡隐患点
landslidUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/landslid/MapServer'
// 主要公路
MainHighwayUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/MainHighway/MapServer'
// 全部公路
AllRoadsUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/AllRoads/MapServer'
//二级河流
TwogradeRiversUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/TwogradeRivers/MapServer'
//三级河流
ThreegradeRiversUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/ThreegradeRivers/MapServer'
//四级河流
FourgradeRiversUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/FourgradeRivers/MapServer'
//五级河流
FivegradeRiversUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/FivegradeRivers/MapServer'
// 省mask layer
maskLayerUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/FactorProvincialMask/MapServer/0'
// GEOMETRY 服务
GeometryServerUrl = 'http://'+ innerMapIP +'/arcgis/rest/services/Utilities/Geometry/GeometryServer'
// 动态服务
DynamicBaseMapUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/FactorOneMap/MapServer'
// 河流 RiverArea_Mask
FactorRiverMaskUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/FactorRiverMask/MapServer/1'
// 切换范围-一级河流
FactorNoteOfFirstgradeRiver = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/FactorNoteOfFirstgradeRiver/MapServer'
//海洋标注（海洋名称、台湾岛）
OceanicNameUrl = 'http://'+ innerMapIP +'/arcgis/rest/services//iWeatherOneMap/OceanicName/MapServer'


// 后台数据接口
var GetMenuBarUrl = ''
var StatisticDataUrl = ''
var tableinitdataUrl = ''
var legendImageDataUrl = ''
var southSeaImageDataUrl = ''
var GetMapElementInfoUrl = ''
var ImageDataUrl = ''
var mapElementUrl = ''
let RegionExtentUrl =''
var GetWeaWordInfoUrl = ''
//一二级菜单目录
// GetMenuBarUrl = 'http://10.20.90.140:63247/api/Dataservice/GetMenuBar'
GetMenuBarUrl ='http://10.20.90.140:86/api/elementserver/GetMenuBar'
// 11项头部数据
// StatisticDataUrl = 'http://10.20.90.140:63247/api/Dataservice/GetData?type=HEADINFO'
StatisticDataUrl = 'http://10.20.90.140:86/api/dataserver/GetData?type=HEADINFO'
// 11项统计表参数
// tableinitdataUrl = 'http://10.20.90.140:63247/api/Dataservice/GetData?type='
tableinitdataUrl = 'http://10.20.90.140:86/api/dataserver/GetData?type='
// 业务图
// businessLayerUrl = 'http://10.20.90.140:63247/api/Dataservice/ImageData'
businessLayerUrl = 'http://10.20.90.140:86/api/pictureserver/GetPicData'
// 地图元素...获取标题信息 -----------
//mapElementUrl = GetMapElementInfoUrl = 'http://10.20.90.140:63247/api/Dataservice/GetMapElementInfo'
mapElementUrl = GetMapElementInfoUrl = "http://10.20.90.140:86/api/elementserver/GetMapElementInfo"
// 站点 -------------
stationDataUrl = 'http://10.20.90.140:86/api/dataserver/GetData?type=SumRain'
// 区域选择
//RegionExtentUrl= 'http://10.20.90.140:63247/api/Dataservice/GetRegionExtentInfo'
RegionExtentUrl='http://10.20.90.140:86/api/elementserver/GetRegionExtentInfo'
// 站点过滤
//stationFilter='http://10.20.90.140:63247/api/Dataservice/DataFilter'
stationFilter='http://10.20.90.140:86/api/dataserver/DataFilter'
// 文字描述
GetWeaWordInfoUrl='http://10.20.90.140:86/api/wordserver/GetWeaWordInfo'
// 'http://10.20.90.140:63247/api/Dataservice/GetData?type=headinfo&startTime=startTimeArgs&endTime=endTimeArgs
//获取市标注信息
CityRegionInfo = 'http://10.20.90.140:86/api/elementserver/GetCityRegionInfo'
//获取县标注信息
GetCountyRegionInfo ='http://10.20.90.140:86/api/elementserver/GetCountyRegionInfo'
