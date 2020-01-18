<template>
  <Select v-model="val" placeholder="请选择地址" filterable>
    <Option :key="item.id" v-for="item in data" :value="item.id">{{item.name}}</Option>
  </Select>
</template>

<script>
import util from "@/util";
export default {
  props: {
    value: ""
  },
  name: "",
  data() {
    return {
      data: [],
      val: null
    };
  },
  mounted() {
    util.ajax("admin/building/list").then(({ code, data }) => {
      if (code == 0) {
        this.data = data;
        this.val = this.value;
      }
    });
  },
  watch: {
    value(value) {
      this.val = value;
    },
    val(value) {
      this.$emit("input", value);
      this.$nextTick(()=>{
        this.$emit('change',this.data.find(i=>i.id==value));
      })
    }
  }
};
</script>

<style lang="" scoped>
</style>