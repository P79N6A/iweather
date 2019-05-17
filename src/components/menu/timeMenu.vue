<template>
  <div id="mapTime">
    <el-button type="primary" @click="handleButton(val,ind)" v-for="(val,ind) in datelist" :key="ind" :class="{'btnActive':isActive==ind}">
      {{val.name}}
    </el-button>
    <div class="date-container" id="reservationtime" v-show="isShowTime" style="min-width: 280px;border: 2px solid #0087be; position: relative; background-color: #fff;float:left; height: 100%;overflow: hidden;margin: 0;padding: 0;">
     <span class="el-icon-date" style="float: right;padding: 5px;background-color:#0087be;color: #fff;" ></span>
      <input type="text" style="min-width: 344px;border: none;outline: none;text-align: center;padding-top: 2px;overflow: visible;" name="reservation"  class="" placeholder="起始时间 ~ 终止时间" v-model="datetime"/>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isShowTime: false, // 控制日历的显示与隐藏
        datelist: [{name:'暂无数据'}],
        isActive: 0, // 控制按钮的激活与否
        datetime:'',
        alldates:[], //存放返回来的所有数据
        menuType:"Rain",
        boolDays:false
      }
    },
    created () {
      this.getSecondAllmenu()
    },
    methods: {
      getSecondAllmenu () {
        this.$get(GetMenuBarUrl).then(secondmenu => {
          let Secondmenu = JSON.parse(secondmenu)
          this.alldates = Secondmenu.firstmenu
        })
        .catch(error => {
          console.log(error)
        })
      },
      //通过菜单获取数据 --初始化时和切换导航菜单时调用
      secondmenus(arg){
        console.log(this.alldates)
        var arr = this.alldates.find((val)=>{ return val.id == arg['id'] })
        arr.secondmenu.forEach((val)=>{
          if(val.name === 'AnyTime') val.name = "任意时段"
        })
        this.datelist = arr.secondmenu
        this.boolDays = arr.secondmenu[0].name.indexOf("日")!=-1 ? true : false
        this.$store.commit("setCurrentJob",{jobid:arr.secondmenu[0].jobid,weaType:this.menuType,boolDays:this.boolDays})
        console.log(this.datelist)
      },
      handleButton (val,key) {
        this.isActive = key
        console.log(val)
        console.log(val.dataType)
        if (val.jobid === "AnyTime") {
          this.isShowTime = !this.isShowTime
          // this.isActive = 'AnyTime'
        } else {
          this.boolDays = val.name.indexOf("日")!=-1 ? true : false
          this.isShowTime = false
          this.$store.state.clearLabel = !this.$store.state.clearLabel
          this.$store.commit("changDataType",{dataType:val.dataType})
          this.$store.commit("setCurrentJob",{jobid:val.jobid,weaType:this.menuType,boolDays:this.boolDays})
          this.$store.commit("setAreaid", val.jobid +'&area='+ this.$store.state.oneMapModel.areaId)
          this.$store.commit('changLabelModel', {returnLabel: {}}) //切换时间,清除"标记"的记住
          console.log(this.$store.state.regionData)
        }
      },
    },
    watch:{
      isShowTime:function(val){
        var that=this;
        var _this;
        if (val == true )
          $('#reservationtime').daterangepicker({
            timePicker: true,
            timePickerIncrement: 60,
            minView: "hour",
            format: 'YYYY年MM月DD日HH时', //页面展示的数据格式
            separator:'  ~  ',
            dateLimit : {days :7}, //起止时间的最大间隔
            maxDate:moment(),
            endDate: new Date(),
            timePicker12Hour:false,
            drops:'down',
            startDate: new Date(new Date().getTime()-12*3600*1000),
            locale:{daysOfWeek:["日","一","二","三","四","五","六"]}
          }, function(start, end, label) {
             _this=this
          }).on('apply.daterangepicker',function(ev,picker){ //点击确定时候的回调函数
            var valueStart = picker.startDate.format('YYYY-MM-DD  HH:00:00'); //要发送的数据格式
            var valueEnd = picker.endDate.format('YYYY-MM-DD  HH:00:00');
            if(new Date(valueStart).getTime() >= new Date(valueEnd).getTime()){  that.datetime=''
              alert('提示:终止时间应大于起始时间!');
              _this.container.show()
            }else if(new Date().getTime() <= new Date(valueEnd).getTime()){  that.datetime=''
              alert('提示:终止时间应小于当前时间!');
              _this.container.show()
            }else if(new Date(valueEnd).getTime() - new Date(valueStart).getTime() > 7*24*3600*1000 ){  that.datetime=''
              alert('提示:可查询范围为7天之内!');
              _this.container.show()
            }else if( $('input[name="xuanze"]:checked').val()=='日' ){ that.datetime=''
              alert('提示:暂无数据,可选择按小时查询');
              $('.daterangepicker').show()
            }else{ //小时查询
              that.datetime=picker.startDate.format('YYYY年MM月DD日HH时')+ " ~ " + picker.endDate.format('YYYY年MM月DD日HH时');
              that.$store.state.clearLabel = !that.$store.state.clearLabel
              that.$store.commit("setCurrentJob",{jobid:"{startTime:'"+valueStart+"',endTime:'"+valueEnd+"'}",weaType:that.menuType,boolDays:false})
              that.$store.commit("setAreaid", "{startTime:'"+valueStart+"',endTime:'"+valueEnd+"'}" +'&area='+ that.$store.state.oneMapModel.areaId)
              that.$store.commit('changLabelModel', {returnLabel: {}})
            }
          }).on('cancel.daterangepicker', function(ev, picker) {
            $('#reservationtime').val('');
          });
        else if(val==false)  $('.daterangepicker').hide()
      } ,//end function
      alldates:function(val){   // 确定接收到了返回的数据
        if(val){
          this.secondmenus({id:'0'})
        }
      },
      MenuBarId:function(val) {
        console.log(val)
        this.isActive=0
        if(val=='0')this.menuType="Rain"
        else if(val=='1') this.menuType="Temp"
        this.secondmenus({id:val})
      }
    },//end watch
    computed:{
      MenuBarId:function(){ //顶部导航 降水0/气温1
        return this.$store.state.MenuBarId
      }
    }
  }
</script>
<style>
  #mapTime {
    min-width: 100px;
    min-height: 20px;
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 99;
  }
  #mapTime .el-button--primary:first-child::before {
    left: 5px;
  }
  #mapTime .el-button--primary:nth-last-child(2)::before {
    right: 5px;
  }
  #mapTime .el-button--primary {
    float: left;
    border-radius: 0px;
    padding: 8px;
    background: #0588c2;
    border: none;
    position: relative;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    margin-right: 2px;
    font-size: 12px;
  }
  #mapTime .el-button--primary::before:active {
    background: #006fa0;
    width:inherit;
    height: inherit;
  }
  #mapTime .el-button--primary::before {
    content: '';
    position: absolute;
    top: -0px;
    right: -5px;
    bottom: -0px;
    left: -5px;
    z-index: -1;
    background: #0688c2;
    transform: skewX(-20deg);
  }
  #mapTime button.btnActive{
    background: #006fa0;
  }
  #mapTime button.btnActive::before{
    background: #006fa0;
  }

</style>
