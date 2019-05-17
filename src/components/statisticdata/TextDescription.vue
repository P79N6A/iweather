<!-- 文字描述 2018-11-20 -->
<template>
     <!-- 文字描述 -->
     <div id="getWeaWordInfo">
            <el-alert
              title="文字描述"
              type="success"
              center
              :closable="false">
            </el-alert>
            <div id="getword" style="overflow: hidden;">
                <el-input
                  type="textarea"
                  :rows="2"
                  @change="editvalue"
                  placeholder="请输入内容"
                  :autosize="{ minRows: 5, maxRows: 16}"
                  v-model="textarea">
                </el-input>
                <el-button type="primary" @click="IntelligentText" style="float: right;margin-top: 1.5%;line-height: 0.7">智能文本生成</el-button>
            </div>
            <div style="display: none">
              <script id="tmpl" type="text/html">
                  <xdoc version="A.3.0">
                      <body>
                      <para heading="1" lineSpacing="28" align="center">
                          <text class="head" valign="center" fontName="标宋" fontSize="29"><%=title%></text>
                      </para>
                      <para>
                          <img  src="<%=img%>" sizeType="autosize"/>
                      </para>
                      <para lineSpacing="9">
                          <text class="content" fontName="微软雅黑" fontSize="18"><%=content%></text>
                      </para>
                      </body>
                  </xdoc>
              </script>
            </div>
         </div>
</template>
<script>
export default {
  name: 'TextDescription',
  data () {
    return {
      name: 'TextDescription',
      textarea: '暂无文字描述', // 文字处理
      editTextarea:false,
      tempvalue:'',
      dataUrl: ''
    }
  },
  watch: {
    initAreaid () {
      console.log(this.initAreaid)
      this.getWeaWordInfo(this.initAreaid)
    },
    MenuBarId:function(val) {
      this.getWeaWordInfo(this.initjobId+'&area=0')
    }
  },
  methods: {
    // 文字描述
    getWeaWordInfo (val) {
      console.log(val)
      this.textarea = ''
      var url = GetWeaWordInfoUrl + '?jobid=' + val + '&weather=' + this.$store.state.oneMapModel.weaType 
      console.log(url)
      this.$get(url).then(resword => {
        // this.textarea = (resword.indexOf('word') !== -1) ? JSON.parse(resword)[0].word : resword
        if (resword.indexOf('word') !== -1) {
          this.editTextarea = true
          this.textarea = JSON.parse(resword)[0].word
        } else {
          this.editTextarea = false
          this.textarea = resword
          this.tempvalue = resword
        }
      })
        .catch(error => {
          console.log(error)
        })
    },
    editvalue(v){
      if (v.trim() !== this.tempvalue.trim())
        this.editTextarea = true
    },
    IntelligentText () {
      if (this.editTextarea === false) {
        this.$message({
        type: "error",
        message: "导出失败"
        })
      } else {
        // 地图图片
        var targetDom = $('.eail')
        var imgDiv = $('.eail #mapDivId_业务').clone(true)
        imgDiv.attr('id','tempimg')
        $('.eail')[0].insertBefore(imgDiv[0],$('.eail #mapDivId')[0])
        //克隆截图区域
        var copyDom = targetDom.clone(true)
        copyDom.width(targetDom.width() + "px")
        copyDom.height(targetDom.height() + "px")
        copyDom.attr("id", "copyDom").attr("style", 'position: absolute; z-index:-1; top: 0px; left: 0px;')
        targetDom.append(copyDom)
        if (typeof html2canvas !== 'undefined') {
            var canvas1,parentNode,svgElem
            //以下是对svg的处理
            var nodesToRecover = [];
            var nodesToRemove = [];
            svgElem = $('#copyDom svg')
            svgElem.each(function (index, node) {
              parentNode = node.parentNode;
              var svg = node.outerHTML.trim();
              canvas1 = document.createElement('canvas');
              canvg(canvas1, svg);
              if (node.style.position) {
                canvas1.style.position += node.style.position;
                canvas1.style.left += node.style.left;
                canvas1.style.top += node.style.top;
              }
              nodesToRecover.push({
                parent: parentNode,
                child: node
              });
              parentNode.removeChild(node);
              nodesToRemove.push({
                parent: parentNode,
                child: canvas1
              });
              parentNode.appendChild(canvas1);
            });
            //html2canvas截图
            var _this = this
            html2canvas(copyDom[0], {
              useCORS: true,
              imageTimeout:2000,
              taintTest: false
            }).then(function (canvas) {
              canvas.getContext("2d")
              imgDiv.remove()
              //克隆DOM删除
              copyDom.remove()
              _this.dataUrl = canvas.toDataURL("image/png", 1.0);
              // console.log(_this.textarea)
              var type="docx"
              var data = {
                  title: "导出"+type+"文件",
                  img: _this.dataUrl,
                  content: _this.textarea
              }
              var template=$("#tmpl").html();
              var html=template.replace(/<%=title%>/,data.title)
                      .replace(/<%=img%>/,data.img)
                      .replace(/<%=content%>/,data.content);
              $("body").append(html)
              XDoc.to(baidu.template('tmpl', data), type, {})
            })
        }
      }
    }
  },
  computed: {
    initjobId () {  //时间
      return  this.$store.state.oneMapModel.jobId
    },
    initAreaid () {  //区域
      return  this.$store.state.oneMapModel.areaid1
    },
    MenuBarId:function(){ //顶部导航 降水0/气温1
      return this.$store.state.MenuBarId
    }
  },
  created () {
    this.getWeaWordInfo(this.initjobId+'&area=0')
  }
}
</script>
<style>
   #getWeaWordInfo #getword, #getWeaWordInfo .el-alert--success {
     width: 99%;
     margin: 0px auto;
   }
</style>
