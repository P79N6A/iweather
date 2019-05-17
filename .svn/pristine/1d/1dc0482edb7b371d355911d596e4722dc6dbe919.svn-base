<template>
  <div id="titleEdit">
    <el-dialog
      title="标题"
      :visible.sync="dialogStatus"
      width="34%"
      :before-close="handleClose">
      <!--实际信息-->
      <div id="editInfo">
        <el-row>
          <el-col :span="3"><div style="text-align: center;vertical-align: middle;" >内容：</div></el-col>
          <el-col :span="20"><div >
            <el-input v-model="editInfo.title" ></el-input>
          </div>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="3"><div style="text-align: center;vertical-align: middle;" >字体：</div></el-col>
          <el-col :span="7"><div >
            <el-select v-model="editInfo.style['font-family']" >
              <el-option
                v-for="item in fontOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div></el-col>

          <el-col :span="3"><div style="text-align: center;vertical-align: middle;" >字号：</div></el-col>
          <el-col :span="3"><div class="fontSno">
            <el-input v-model="editInfo.style.fontSize"></el-input>
          </div></el-col>

          <el-col :span="3"><div style="text-align: center;vertical-align: middle;" >颜色：</div></el-col>
          <el-col :span="2"><div >
            <el-color-picker  v-model="editInfo.style.color"></el-color-picker>
          </div></el-col>
        </el-row>
      </div>
      <span class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="okClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

  import ElCol from "element-ui/packages/col/src/col";

  export default {
    components: {ElCol},
    name: '',
    props: ['dialogVisible', 'whichElement', 'editInfo'],
    data () {
      return {
        mycolor:'#fff',
        dialogStatus: this.dialogVisible,
        fontSizeOptions: [{
          value: '10px',
          label: '10px'
        }, {
          value: '20px',
          label: '20px'
        }, {
          value: '30px',
          label: '30px'
        }, {
          value: '40px',
          label: '40px'
        }],
        fontOptions: [{
          value: '宋体',
          label: '宋体'
        }, {
          value: '黑体',
          label: '黑体'
        }, {
          value: '微软雅黑',
          label: '微软雅黑'
        }, {
          value: '仿宋',
          label: '仿宋'
        }, {
          value: '楷体',
          label: '楷体'
        }, {
          value: '楷体_GB2312',
          label: '楷体_GB2312'
        }, {
          value: '仿宋_GB2312',
          label: '仿宋_GB2312'
        }],
        value: '',
        myData:{}
      }
    },
    created(){},
    mounted:function(){},
    methods: {
      okClick: function () {
        var info = {whichElement: this.whichElement, isVisible: false, returnTitle: this.editInfo}
        this.$emit('returnTitle', info)
        this.dialogStatus = false
      },
      quxiao: function () {
        var info = {whichElement: this.whichElement, isVisible: false, returnTitle: this.editInfo}
        this.$emit('returnTitle', info)
        this.dialogStatus = false
      },
      handleClose: function () {
        this.$confirm('确认关闭？')
          .then(_ => {
          this.dialogStatus = false
        var info = {whichElement: this.whichElement, isVisible: false, returnTitle: this.editInfo}
        this.$emit('returnTitle', info)
      })
      .catch(_ => {
        })
      }
    },
    watch: {
      dialogVisible (val) {
        this.dialogStatus = val
        this.myData = this.editInfo
      },
    }
  }
</script>
<style >
  #editInfo div {
    margin: 0.5%;
  }
  #titleEdit .el-dialog__body {
    padding: 13px;
  }
  #titleEdit .el-dialog {
    border:solid 4px #186dc6;
  }
  #titleEdit .el-dialog__header {
    background-color: #186dc6;
    padding:2%;
    text-align: left;
  }
  #titleEdit .el-dialog__title {
    color: white;
  }
  #titleEdit .el-row {
    /*margin-bottom: 15px;*/
  }
  #titleEdit .el-col {
    border-radius: 4px;
    line-height:240%;
  }
  #titleEdit .bg-purple-dark {
    background: #99a9bf;
  }
  #titleEdit .bg-purple {
    background: #d3dce6;
  }
  #titleEdit .bg-purple-light {
    background: #e5e9f2;
  }
  #titleEdit .grid-content {
    border-radius: 4px;
    min-height: 45px;
  }
  #titleEdit .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  #titleEdit .el-dialog__headerbtn i.el-dialog__close{
    color: #fff;
    font-size: 20px;
  }
  #titleEdit .el-dialog__headerbtn{
    top: 12px;
    right: 12px;
  }
  #titleEdit .el-input__inner{
    padding: 0 8px;
  }
  span.dialog-footer .el-button{
    margin-top: 5%;
    padding: 8px 16px;
  }
</style>
