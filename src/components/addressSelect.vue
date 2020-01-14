<template>
  <Select v-model="val" placeholder="请选择地址" filterable >
    <Option :key="item.id" v-for="item in data" :value="item.id">{{item.name}}</Option>
  </Select>
</template>

<script>
import rentalStatistics from "@/components/rentalStatistics";
export default {
  props: {
    value: ""
  },
  name: "",
  data() {
    return {
      data: [
        { name: "福田区下沙村8坊70号", id: "1" },
        { name: "福田区下沙村8坊71号", id: "2" },
        { name: "福田区下沙村8坊72号", id: "3" }
      ],
      val:"",
    };
  },
  mounted(){
    this.val = this.value;

  },
  watch:{
      value(value){
          this.val = value;
      },
      val(value){
          this.$emit("input",value);
      }
  }
};
</script>

<style lang="" scoped>
</style>