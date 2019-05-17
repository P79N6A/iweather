<template>
  <div id='mapele' @mousedown="mouseDown">
    <p class="title" @dblclick="setTitle" v-bind:style="titleObj.style">{{titleObj.title}}</p>
    <p class="time" @dblclick="setTitle" v-bind:style="timeObj.style">{{timeObj.title}}</p>
    <p class="unit" @dblclick="setTitle" v-bind:style="unitObj.style">{{unitObj.title}}</p>
    <titles  @returnTitle="returnTitle" :editInfo="editInfo" :whichElement="whichElement" :dialogVisible="dialogVisible"></titles>
  </div>
</template>
<script>
import titles from '../../dialog/titleEdit.vue'
var titleTemp = '全国气温实况图'
var titleRain = '全国气温实况图'
export default {
  data () {
    return {
      dialogVisible: false,
      whichElement: '',
      editInfo: '',
      titleObj: {
        title: '全国降水量实况图',
        style: {
          color: '#000',
          fontSize: '36px',
          'font-family': '宋体',
          'font-weight':'bold'
        }
      },
      timeObj: {
        title: '7月24日-8月10日',
        style: {
          color: '#000',
          fontSize: '31px',
          'font-family': '宋体',
        }
      },
      unitObj: {
        title: '中央气象台',
        style: {
          color: '#000',
          fontSize: '31px',
          'font-family': '黑体',
        }
      }
    }
  },
  components: {
    titles
  },
  mounted: function () {
    this.loadMapEle(this.url)
  },
  methods: {
    setTitle: function (evt) {
      if(this.dialogVisible){
        return
      }
      // 判断是那个点击
      this.whichElement = evt.srcElement.className
      switch (this.whichElement)
      {
        case  'title':
          this.editInfo = this.titleObj
          break
        case  'time':
          this.editInfo = this.timeObj
          break
        case  'unit':
          this.editInfo = this.unitObj
          break
      }
      this.dialogVisible = !this.dialogVisible
    },
    mouseDown: function (evt) {
        console.log('mouseDown')
        let e = evt || event;
        let mapele = document.getElementById('mapele')
        let disX = e.clientX - mapele.offsetLeft;
        let disY = e.clientY - mapele.offsetTop;
      document.getElementById('Webmap').onmousemove = (e)=>{       //鼠标按下并移动的事件
        if(this.dialogVisible)
           if (e.target != e.currentTarget) {
             return;
           }
           let left = e.clientX - disX;
           let top = e.clientY - disY;
           //移动当前元素
           mapele.style.left = left + 'px';
           mapele.style.top = top + 'px';
       };
      document.onmouseup = (e) => {
        document.getElementById('Webmap').onmousemove = null;
        document.onmouseup = null;
       };
    },
    returnTitle: function (val) {
      // 如果子组件可见，不响应
      if(val.isVisible)
        return
      var returnTitle = val.returnTitle
      if(returnTitle.style.fontSize.indexOf('px')==-1){ //保证px单位
        returnTitle.style.fontSize = returnTitle.style.fontSize+"px"
      }
      var whichElement = val.whichElement
      if(whichElement === 'title')
      {
        this.titleObj = returnTitle
      }
      if(whichElement === 'time')
      {
        this.timeObj = returnTitle
      }
      if(whichElement === 'unit')
      {
        this.unitObj = returnTitle
      }
      this.dialogVisible = val.isVisible
    },
    loadMapEle: function(){
      console.log(this.url)
      this.$get(this.url)
        .then(response => {
          var model = JSON.parse(response)
          console.log(model)
          // this.titleObj.title = model.TitleModel.Title //返回的一直是全国降水量...
          var titlename = '降水量'
          if(this.$store.state.MenuBarId=='0') titlename = '降水量'
          else if(this.$store.state.MenuBarId=='1') titlename = '气温'
          this.titleObj.title= this.$store.state.regionData.title + titlename +"实况图"
          this.timeObj.title = model.TimeModel.Title
          this.unitObj.title = model.CompanyModel.Title
        })
        .catch(error => console.log(error))
    },
  },
  created () {
    var date=new Date; 
    var month=date.getMonth()+1;
    var daynow = date.getDate();
    var daypre = date.getDate()-1;
    month =(month<10 ? "0"+month:month); 
    daynow =(daynow<10 ? "0"+daynow:daynow); 
    daypre =(daypre<10 ? "0"+daypre:daypre); 
    this.timeObj.title = month + "月" + daypre + "日-" + daynow + "日";
  },
  updated () {
    this.$store.commit('setPrintName',this.titleObj.title)
  },
  watch:{
    url (){
      this.loadMapEle()
    },
    AnytimeUrl(){
      return mapElementUrl + '?jobid=362' +"&isDays="+this.$store.state.oneMapModel.boolDays+"&weather="+this.$store.state.oneMapModel.weaType;
    },
    regionDataTitle(){
      var titlename = '降水量'
      if(this.$store.state.MenuBarId=='0') titlename = '降水量'
      else if(this.$store.state.MenuBarId=='1') titlename = '气温'
      this.titleObj.title= this.$store.state.regionData.title + titlename +"实况图"
    },
    MenuBarId:function(val) {
      if(val=='0') {        
        this.titleObj.title = titleRain
      }
      else if(val=='1') {   
        this.titleObj.title = titleTemp
      }
    },
  },
  computed: {
    url() {
      return mapElementUrl + '?jobid='+this.$store.state.oneMapModel.jobId+"&isDays="+this.$store.state.oneMapModel.boolDays+"&weather="+this.$store.state.oneMapModel.weaType + "&dataType=" + this.$store.state.dataType;
    },
    AnytimeUrl() {
      return mapElementUrl + '?jobid=362' +"&isDays="+this.$store.state.oneMapModel.boolDays+"&weather="+this.$store.state.oneMapModel.weaType;
    },
    jobID (){
      return  this.$store.state.oneMapModel.jobId
    },
    regionDataTitle(){ //判断当前显示的区域
      return this.$store.state.regionData.title
    },
    MenuBarId:function(){ //顶部导航 降水0/气温1
      return this.$store.state.MenuBarId
    }
  }
}
</script>
<style scoped>
#mapele {
 font-family: "Avenir LT W01 35 Light", Arial, Helvetica, sans-serif;
 width: 405px;
 font-weight: 500;
 text-align: center;
 position: absolute;
  cursor: move;
  -moz-user-select: none; -khtml-user-select: none; user-select: none;
}
.title{
  font-size: xx-large;
}
.time{
  font-size: x-large;
}
.unit{
  font-size: x-large;
}
</style>
