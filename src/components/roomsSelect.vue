<template>
  <Select v-model="val" :placeholder="placeholder" filterable :disabled="disabled">
    <Option :key="item.id" v-for="item in data" :value="item.id">{{item.name}}</Option>
  </Select>
</template>

<script>
import util from "@/util";
export default {
  props: {
    value: "",
    aid:"",
  },
  name: "",
  data() {
    return {
      data: [],
      val:"",
      disabled:false,
      placeholder:""
    };
  },
  methods:{
      getRooms(){
          console.log(this.aid);
          if(this.aid == null){
             this.disabled=true;
             this.val = "";
             this.placeholder = "请先选择地址"; 
             return;
          }else{
            this.disabled=false;
            this.placeholder = "请选择门牌号"; 
          }
          util.ajax.get("admin/room/list",{params:{buildingId:this.aid}}).then(({code,data})=>{
            if(code == 0){
              this.data = data;
              if(data.length==0){
                this.$Message.warning("该房源暂无房屋");
                this.disabled=true;
              }
            }
          })
      }
  },
  mounted(){
    this.val = this.value;
    this.getRooms();
    
  },
  watch:{
      value(value){
          this.val = value;
      },
      val(value){
          this.$emit("input",value);
      },
      aid(){
        this.$emit("input",null);
        this.getRooms();
      }
  }
};
</script>

<style lang="" scoped>
</style>