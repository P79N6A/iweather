<template>
    <div id="gpEdit" v-show="gpShow">
      <div class="header clearfix">
        <span> 导出材料 </span>
        <el-button style="float: right; padding: 0px;color: #fff;font-size: 18px;" type="text" icon="el-icon-close" @click="handleonClick"></el-button>
      </div>
      <p>自定义名字：<el-input  id="path" v-model="printName" style="width: 65%" @change="printNamehandle"></el-input></p>
      <p>打印格式：
        <el-select v-model="printFormat" placeholder="请选择" @change="initPrintFormat" style="width: 65%;margin-left: 3%">
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.printFormat">
          </el-option>
        </el-select>
      </p>
      <!-- <p>下载路径：<el-button size="small" type="primary" @click="ExportData" style="width: 40%; margin-left: 4%">点击选择下载路径</el-button></p> -->
      <p class="btn" style="position: relative;min-height: 35px;"><el-button @click="cancel">取消</el-button><el-button @click="okClick">确定</el-button></p>
    </div>
</template>
<script>
import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
export  default  {
  name: 'gpEdit',
  components: {ElButton},
  props: ['gpShow'],
  data () {
    return {
      show: true,
      options: [{
          value: 'image/png',
          label: 'image/png',
          printFormat: 'png'
        },{
          value: 'image/jpg',
          label: 'image/jpg',
          printFormat: 'jpg'
        },{
          value: 'image/gif',
          label: 'image/gif',
          printFormat: 'gif'
        },{
          value: 'image/tif',
          label: 'image/tif',
          printFormat: 'tif'
        },{
          value: 'image/bmp',
          label: 'image/bmp',
          printFormat: 'bmp'
        }
      ],
      value: 'image/png',
      printName: this.$store.state.initPrint.printName,
      printFormat: this.$store.state.initPrint.printFormat
    }
  },
  methods: {
    initPrintFormat: function (value) {
      this.$store.commit("setPrintFormat",value)
    },
    okClick: function () {
      this.show = false
      this.$emit('gpHandle', this.gpShow)
      this.$confirm('此操作将导出地图并保存为图片','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      }).then(() => {
        var that=this
        window.setTimeout(function(){ that.$store.state.isprint=!that.$store.state.isprint },500)
      }).catch(() => {
          this.$message({
              type: 'info',
              message: '已取消'
          })
      })
    },
    cancel: function () {
      this.show = false
      this.$emit('gpHandle', this.gpShow)
    },
    handleonClick:function(){
      this.show = false
      this.$emit('gpHandle', this.gpShow)
    },
    printNamehandle: function (value) {
      // console.log(value)
      this.$store.commit("setPrintName",value)
      console.log(this.setPrintName)
    },
    ExportData: function () {
      // try {
      //   var Message = "\u8bf7\u9009\u62e9\u6587\u4ef6\u5939" // 选择框提示信息
      //   var Shell = new ActiveXObject("Shell.Application")
      //   var Folder = Shell.BrowseForFolder(0, Message, 64, 17); //起始目录为：我的电脑
      //   //var Folder = Shell.BrowseForFolder(0, Message, 0); //起始目录为：桌面
      //   if (Folder != null) {
      //       Folder = Folder.items(); // 返回 FolderItems 对象
      //       Folder = Folder.item(); // 返回 Folderitem 对象
      //       Folder = Folder.Path; // 返回路径
      //       if (Folder.charAt(Folder.length - 1) != "\\") {
      //           Folder = Folder + "\\";
      //       }
      //       document.getElementById('path').value = Folder;
      //       return Folder;
      //   }
      // }
      // catch (e) {
      //     alert(e.message);
      // }
    }
  },
  watch: {
  },
  computed: {
    setPrintName () {
      return this.$store.state.initPrint.printName
    }
  }
}

</script>
<style scope>
  #gpEdit {
    min-width: 340px;
    background-color: #fff;
    position: absolute;
    left: 5%;
    top: 45%;
    border: solid 2px #0588c2;
    z-index: 10;
    padding-bottom: 1% ;
  }
  #gpEdit p {
    margin:3%;
    width: 98%;
    padding-left: 2%;
    vertical-align: middle;
    font-size:14px;
  }
  #gpEdit .el-color-picker__color {
    border: 1px solid #0688c2;
  }
  .el-color-picker__trigger {
    width: 30%;
  }
  #gpEdit .header {
    padding: 2% 2% 2% 3%;
    overflow: hidden;
    background: #0688c2;
    color: #fff;
    font-size: 14px;
    max-width: 100%;
  }
  #gpEdit .el-input__inner{
    height: 34px;
  }
  #gpEdit p.btn button{
    font-size: 14px;
    color:white;
    padding:1.5% 6%;
    background-color: #0688c2;
    border-color:#0688c2;
    position: absolute;
    top:42%;
  }
  #gpEdit .el-input-number__decrease,#gpEdit .el-input-number__increase{
    height: 31px;
    line-height: 31px;
    top: 4px;
  }
  #gpEdit p.btn button:last-child{
    right: 20%;
    /*background-color: #0688c2;*/
  }
  #gpEdit p.btn button:first-child{
    left: 20%;
    /*background-color: #0688c2;*/
  }
</style>
