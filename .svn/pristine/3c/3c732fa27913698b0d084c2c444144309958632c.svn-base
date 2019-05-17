<template>
    <div id="labelEdit" v-show="labelShow">
      <div class="header clearfix">
        <span> 标注 </span>
        <el-button style="float: right; padding: 0px;color: #fff;font-size: 18px;" type="text" icon="el-icon-close" @click="handleonClick"></el-button>
      </div>
      <p>设置颜色：<el-color-picker v-model="returnLabel.color" style="width: 70%;vertical-align: middle;" ></el-color-picker></p>
      <p>设置大小：<el-input-number type="number" style="width: 70%" v-model="returnLabel.size"></el-input-number></p>
      <p v-if="MenuBarId==0">
        降水排名：<el-input v-bind:disabled="readonlyOrder" @keyup.native="keyUp('order')"  style="width: 70%" v-model="returnLabel.order"></el-input>
      </p>
      <p v-else-if="MenuBarId==1">
        气温排名：<el-input v-bind:disabled="readonlyOrder" @keyup.native="keyUp('order')"  style="width: 70%" v-model="returnLabel.order"></el-input>
      </p>
      <p v-if="MenuBarId==0">
        降水量：<el-input v-bind:disabled="readonlyRain" @change="change" @keyup.native="keyUp('min')" style="width: 32%;margin-left: 4%"  v-model="returnLabel.Range.min"></el-input> <span style="color: rgb(5, 136, 194);font-weight: blod;font-size:22px">~</span>  <el-input v-bind:disabled="readonlyRain"  style="width: 31%"  v-model="returnLabel.Range.max"  @keyup.native="keyUp('max')" ></el-input>
      </p>
      <p v-else-if="MenuBarId==1">
        气温：<el-input v-bind:disabled="readonlyRain" @change="change" @keyup.native="keyUp('min')" style="width: 32%;margin-left: 4%"  v-model="returnLabel.Range.min"></el-input> <span style="color: rgb(5, 136, 194);font-weight: blod;font-size:22px">~</span>  <el-input v-bind:disabled="readonlyRain"  style="width: 31%"  v-model="returnLabel.Range.max"  @keyup.native="keyUp('max')" ></el-input>
      </p>
      <p class="btn" style="position: relative;min-height: 35px;"><el-button @click="cancel">取消</el-button><el-button @click="okClick">确定</el-button></p>
    </div>
</template>
<script>
import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
export  default  {
  name: 'labelEdit',
  components: {
    ElInput,
    ElButton},
  props: ['labelShow'],
  data () {
    return {
      readonlyOrder:false,
      readonlyRain:false,
      show: true,
      returnLabel: {
        color: '#000',
        size: '18',
        order: '',
        Range: {
          max: '',
          min: ''
        }
      }
    }
  },
  created(){
    if (this.$store.state.labelModel.color != undefined){
      this.returnLabel = this.deepCopy(this.$store.state.labelModel)
      console.log(this.returnLabel)
    }
  },
  methods: {
    okClick: function () {
      var min = this.returnLabel.Range.min
      var max = this.returnLabel.Range.max
      var order = this.returnLabel.order
      if(order =='' && min=='' && max ==''){
          alert('请选择筛选条件')
          return;
      } else if( order !='' && ( isNaN(Number(order)) || Number(order) <= '0' ) ){ //输入排名并且不是合法数字
        alert('降水排名应为大于0的数字')
        return;
      }else if( min !='' && isNaN(Number(min))){ //输入排名并且不是合法数字
        alert('请输入合理的数字')
        return;
      }else if( max !='' && (isNaN(Number(max)) || Number(max) <='0')){ //输入排名并且不是合法数字
        alert('降水范围的最大值应为大于0的数字')
        return;
      }else if( max!='' && Number(max)< Number(min)){
        alert('降水量范围的最大值应大于最小值')
        return;
      }
      this.$store.commit('changLabelModel', {
        returnLabel: this.returnLabel
      })
      console.log(this.returnLabel)
      this.show = false
      this.$emit('returnHandle', {"isActive":true})
    },
    cancel: function () {
      this.show = false
      this.$emit('returnHandle', {"isActive":false})
    },
    // 设置标注颜色
    setColor: function () {
    },
    // 设置标注大小
    setSize: function () {
    },
    // 设置标注范围
    setLabelRange:function () {
    },
    ranking(){
      this.returnLabel.order.value=this.returnLabel.order.replace(/[^\.\d]/g,'');
      this.returnLabel.order.value=this.returnLabel.order.replace('.','');
    },
    handleonClick:function(){
      this.show = false
      this.$emit('returnHandle',  {"isActive":false})
    },
    change: function (evt) {
    },
    keyUp:function(val){
      if(val=='order'){
        this.readonlyRain = true;
        this.returnLabel.Range.min=this.returnLabel.Range.max=''
      }else if(val=='min' || val=='max'){
        this.readonlyOrder = true;
        this.returnLabel.order='';
      }
      if(!this.returnLabel.order&&!this.returnLabel.Range.min&&!this.returnLabel.Range.max) {
        this.readonlyRain=this.readonlyOrder = false
      }
    },
    deepCopy:function(obj) {
      var result = Array.isArray(obj) ? [] : {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            result[key] = this.deepCopy(obj[key]);   //递归复制
          } else {
            result[key] = obj[key];
          }
        }
      }
      return result;
    }
  },
  computed: {
    MenuBarId:function(){ //顶部导航 降水0/气温1
      return this.$store.state.MenuBarId
    }
  }
}

</script>
<style scope>
  #labelEdit {
    max-width: 340px;
    background-color: #fff;
    position: absolute;
    left: 5%;
    top: 45%;
    border: solid 2px #0588c2;
    z-index: 999;
    padding-bottom: 1% ;
  }
  #labelEdit p {
    margin:3%;
    width: 98%;
    padding-left: 2%;
    vertical-align: middle;
    font-size:14px;
  }
  #labelEdit .el-color-picker__color {
    border: 1px solid #0688c2;
  }
  .el-color-picker__trigger {
    width: 30%;
  }
  #labelEdit .header {
    padding: 2% 2% 2% 3%;
    overflow: hidden;
    background: #0688c2;
    color: #fff;
    font-size: 14px;
    max-width: 100%;
  }
  #labelEdit .el-input__inner{
    height: 34px;
  }
  #labelEdit p.btn button{
    font-size: 14px;
    color:white;
    padding:1.5% 6%;
    background-color: #0688c2;
    border-color:#0688c2;
    position: absolute;
    top:42%;
  }
  #labelEdit .el-input-number__decrease,#labelEdit .el-input-number__increase{
    height: 30px;
    line-height: 30px;
    top: 4px;
  }
  #labelEdit p.btn button:last-child{
    right: 20%;
    /*background-color: #0688c2;*/
  }
  #labelEdit p.btn button:first-child{
    left: 20%;
    /*background-color: #0688c2;*/
  }
</style>
