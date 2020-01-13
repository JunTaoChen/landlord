<template>
  <div>
    <div class="v_print">
      <bill-table :data="data" :readonly="true" :disableOperating="true"></bill-table>
    </div>
    <print-button class="button"></print-button>
  </div>
</template>

<script>
import billTable from "@/components/billTable.vue";
import printButton from "@/components/printButton.vue";
export default {
  components: { billTable,printButton },
  name: "",
  data() {
    return {
      data: [
        {
          id: "101",
          p1: 1000,
          p2: 1,
          p3: 3,
          p4: 4,
          p5: 5,
          p6: 6,
          p7: 7,
          p8: 8,
          p9: 9,
          p10: 10,
          p11: 11,
          p12: 12,
          p13: 13,
          electricityWarning: false,
          waterFeeWarming: false,
          isSave: true,
          isEdit: false
        },
        {
          id: "102",
          p1: 1000,
          p2: 1,
          p3: 3,
          p4: 4,
          p5: 5,
          p6: 6,
          p7: 7,
          p8: 8,
          p9: 9,
          p10: 10,
          p11: 11,
          p12: 12,
          p13: 13,
          electricityWarning: false,
          waterFeeWarming: false,
          isSave: true,
          isEdit: false
        }
      ]
    };
  },
  created() {
    const { id, month } = this.$route.params;
  }
};
</script>

<style lang="less" scoped>
.v_print{
    width: 260mm;
    margin: 0 auto;
    padding: 1px 1mm;
}
.button{
    display: block;
    margin: 10px auto;
}
</style>