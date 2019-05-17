<template>
  <div id="legendEle"  @mousemove="mouseMove" @mousedown="mouseDown" @mouseup="mouseUp" >
    <div>
      <img id="legendImg"   v-bind:src="imgUrl"  onmousedown="event.preventDefault();"/>
    </div>
  </div>
</template>
<script>
// 从存储池获取
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      imageUrl: '#409EFF',
      clickstatus: false,
      lastX:  0,
      lastY: 0,
      lastcX: 0,
      lastcY: 0
    }
  },
  watch:{
    imgUrl (){
//      this.loadMapEle()
      // console.log('qqqqq')
      console.log(this.imgUrl)
    }
  },
  computed: {
    imgUrl () {
      return  PROXYURL + '?'+businessLayerUrl+'?jobid='+this.$store.state.oneMapModel.jobId+'&type=Legend'+ "&weather=" + this.$store.state.oneMapModel.weaType+"&isDays="+this.$store.state.oneMapModel.boolDays + "&dataType=" + this.$store.state.dataType
    }
  },
  methods: {
    dragStart: function (evt) {
      console.log('strat')
    },
    mouseDown: function (evt) {
      let e = evt || event;
      let legendEle = document.querySelector('.legend')
      let mapEle = document.getElementById("Webmap")
      let disX = e.clientX - legendEle.offsetLeft;
      let disY = e.clientY - legendEle.offsetTop;
      mapEle.onmousemove = (e)=>{       //鼠标按下并移动的事件
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        // if (left <= 0) left=0
        // if (top <= 0 ) top=0
        //移动当前元素
        legendEle.style.left = left + 'px';
        legendEle.style.top = top + 'px';
      };
      document.onmouseup = (e) => {
        mapEle.onmousemove = null;
        document.onmouseup = null;
      };
      // this.clickstatus = true;
      // let legendEle = document.getElementById('legendEle')
      // this.lastX = legendEle.offsetLeft;
      // this.lastY = legendEle.offsetTop;
      // this.lastcX = evt.clientX;
      // this.lastcY = evt.clientY;
    },
    mouseMove: function (evt) {
      // let legendEle = document.getElementById('legendEle')
      // if(this.clickstatus){
      //   legendEle.style.left = this.lastX + (evt.clientX - this.lastcX) + 'px'
      //   legendEle.style.top = this.lastY + (evt.clientY - this.lastcY) + 'px'
      // }
    },
    mouseUp: function () {
      // console.log('this.clickstatus ')
      // this.clickstatus = false;
      // this.lastX = 0;
      // this.lastY = 0;
      // this.lastcX = 0;
      // this.lastcY = 0;
      // this.mouseDown=null;
      // this.mouseMove=null;
    }
  }
}
</script>
<style scoped>
  #legendEle {
    /*left:22%;*/
    position: relative;
    cursor: move;
    background-color: white;
    border: solid 2px gray;
    padding-top: 0px;
    margin-bottom:4px;
  }
  #legendImg {
    /*height: 200px;*/
    height:2.1rem ;
  }
</style>
