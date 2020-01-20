<template>
  <div class="bill_print">
    <div class="v_print">
      <bill-table :data="data" :readonly="true" :disableOperating="true" :loading="loading" :common-min-width="60"></bill-table>
    </div>
    <print-button class="bill_print_button"></print-button>
  </div>
</template>

<script>
import billTable from "@/components/billTable.vue";
import printButton from "@/components/printButton.vue";
import util from "@/util";
export default {
  components: { billTable, printButton },
  name: "",
  data() {
    return {
      data: [],
      loading: true
    };
  },
  mounted() {
    const { id, month, year } = this.$route.params;
    util
      .ajax("/admin/rentinfo/list", {
        params: {
          buildingId:id,
          year,
          month,
        }
      })
      .then(({ code, data }) => {
        this.$nextTick(() => {
          this.loading = false;
        });
        if (code == 0) {
          if (data.rentInfoList.length == 0) {
            this.$Message.warning("该房源地址暂无账单");
          }
          this.data = data.rentInfoList;
        }
      });
  }
};
</script>

<style>
.v_print {
  width: 260mm;
  margin: 0 auto;
  padding: 1px 1mm;
}
.bill_print_button {
  display: block;
  margin: 10px auto;
}
.bill_print .ivu-table-cell{
  padding: 0;
  text-align: center;
}
.bill_print .ivu-table th,.bill_print .ivu-table input{
  text-align: center;
}
.bill_print {
  background: #FFF;
}
</style>