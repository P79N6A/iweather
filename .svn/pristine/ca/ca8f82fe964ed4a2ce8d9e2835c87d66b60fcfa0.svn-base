<template>
  <div id="southSeaEle"  @mousemove="mouseMove" @mousedown="mouseDown" @mouseup="mouseUp" >
    <div>
      <img  id="southSeaImg" v-bind:src="imgUrl" onmousedown="event.preventDefault();"/>
    </div>
  </div>
</template>
<script>
  // 从存储池获取
  import {mapGetters} from 'vuex'
  export default {
    props: ['seaVisible'],
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
    computed: {
      imgUrl () {
        return  PROXYURL + '?'+businessLayerUrl+'?jobid='+this.$store.state.oneMapModel.jobId+'&type=Southsea'+ "&weather=" + this.$store.state.oneMapModel.weaType+"&isDays="+this.$store.state.oneMapModel.boolDays + "&dataType=" + this.$store.state.dataType
      }
    },
    methods: {
      dragStart: function (evt) {
        console.log('strat')
      },
      mouseDown: function (evt) {
        this.clickstatus = true;
        let legendEle = document.getElementById('southSeaEle')
        this.lastX = legendEle.offsetLeft;
        this.lastY = legendEle.offsetTop;
        this.lastcX = evt.clientX;
        this.lastcY = evt.clientY;

      },
      mouseMove: function (evt) {
        let legendEle = document.getElementById('southSeaEle')
        if(this.clickstatus){
          legendEle.style.left = this.lastX + (evt.clientX - this.lastcX - 10) + 'px'
          legendEle.style.top = this.lastY + (evt.clientY - this.lastcY - 10) + 'px'
        }
      },
      mouseUp: function () {
        console.log('this.clickstatus ')
        this.clickstatus = false;
        this.lastX = 0;
        this.lastY = 0;
        this.lastcX = 0;
        this.lastcY = 0;
      }
    }
  }
</script>
<style scoped>
  #southSeaEle {
    width: 80px;
    cursor: move;
  }
  #southSeaImg {
    /*width: 130px;*/
    width: 1.5rem;
  }
</style>
