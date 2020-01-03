<template>
  <Select v-model="val" :placeholder="placeholder" filterable :disabled="disabled">
    <Option :key="item.id" v-for="item in data" :value="item.id">{{item.name}}</Option>
  </Select>
</template>

<script>
export default {
  props: {
    value: "",
    aid:"",
  },
  name: "",
  data() {
    return {
      data: [
        { name: "101", id: "1" },
        { name: "102", id: "2" },
        { name: "103", id: "3" }
      ],
      val:"",
      disabled:false,
      placeholder:""
    };
  },
  methods:{
      getRooms(){
          if(this.aid == ""){
             this.disabled=true;
             this.val = "";
             this.placeholder = "请先选择地址"; 
             return;
          }else{
            this.disabled=false;
            this.placeholder = "请选择门牌号"; 
          }
      }
  },
  mounted(){
      this.getRooms();
  },
  watch:{
      value(value){
          this.val = value;
      },
      val(value){
          if(!value){return}
          this.$emit("input",value);
      },
      aid(){
        this.$emit("input","");
        this.getRooms();
      }
  }
};
</script>

<style lang="" scoped>
</style>