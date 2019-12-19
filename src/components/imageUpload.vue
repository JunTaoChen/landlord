<style scoped>
.guide-map{display: block;max-width: 100%;cursor: pointer;}
</style>

<template>
  <div>
    <img :src="url" v-show="url!=''" class="guide-map" @click="showImg">
    <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" :id="id" class="none"  @change="update"  />
    <label class="ivu-btn ivu-btn-primary" :for="id" @click="initImageUpload" v-show="!readonly"><Icon type="image"></Icon>&nbsp;选择图片</label>
  </div>
</template>
<script>
import util from "@/util";
let fileTarget;
export default {
  data(){
      return {
          uploadKey:"",
          uploadToken:"",
          file:"",
          id:"fileInpu_"+util.generateMixed(6)
      };
  },
  props:{"readonly":{default:false},url:{default:""},width:{default:0},height:{default:0},scale:{default:0},maxsize:{default:0},public:{default:false},prefix:{default:"qiniu"}},
  methods:{
      update(e){
        fileTarget = e.target;
        let file = fileTarget.files[0];
        if(!file){
            return;
        }
        if(this.maxsize!=0 && file.size/1024>this.maxsize){
            this.$Message.warning(`图片大小不能大于${this.maxsize}K`);
            return;
        }
        if(this.width == 0 && this.height == 0 && this.scale == 0){
            this.upload(file);
        }else{
            let reader = new FileReader();
            reader.onload = e=>{
                let image = new Image();
                image.onload = ()=>{
                    if(this.width!=0 && image.width != this.width){
                        this.$Message.warning(`图片宽度必须为${this.width}像素`);
                        return;
                    }
                    if(this.height!=0 && image.height != this.height){
                        this.$Message.warning(`图片宽度必须为${this.height}像素`);
                        return;
                    }
                    if(this.scale != 0){
                        const ss = this.scale.split(":").map(i=>parseInt(i));
                        if(image.width/image.height != ss[0]/ss[1]){
                            this.$Message.warning(`请上传宽高比${this.scale}的图片`);
                            return;
                        }
                    }
                     this.upload(file);
                }
                image.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    },
    upload(file){
        let param = new FormData(); //创建form对象
        param.append('key',this.uploadKey)
        param.append('token',this.uploadToken);
        param.append('file',file,file.name)
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        util.ajax.post('//upload-z2.qiniup.com',param,config)
        .then(result=>{
          util.ajax(this.prefix+(this.public?"/get_static_url":"/geturl"),{params:{fileName:this.uploadKey}}).then(result=>{
            if(result.code === 200){
              this.$emit('upload',this.uploadKey)
              this.$emit('onChange');
              this.$emit('update:url',result.data.url)
              fileTarget.value = "";
            }
          })
        })
    },
    initImageUpload(){
      let key = util.formatTime(new Date(),"yyMMdd")+util.generateMixed(6);
      this.uploadKey = key;
      util.ajax(this.prefix+(this.public?"/static_token":"/token"),{params:{fileName:key}}).then(result=>{
        if(result.code === 200){
          this.uploadToken = result.data.token;
        }
      });
    },
    showImg(){
        util.showBigImg(this.url);
    }
  }
}
</script>

