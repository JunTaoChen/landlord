<template>
  <div>
    <search-card>
      <Form :label-width="150" class="block" @submit.native.prevent>
        <FormItem label="地址：">
          <address-select v-model="searchData.aid"></address-select>
        </FormItem>
        <FormItem label="日期：">
          <DatePicker type="month" v-model="searchData.date" :clearable="false"></DatePicker>
        </FormItem>
      </Form>
    </search-card>
    <Divider />
    <Card shadow>
      <h4 slot="title">账单列表</h4>
      <div class="m-button">
        <Button type="success" @click="exportData">导出</Button>&nbsp;
        <Button type="primary" @click="print">打印</Button>
      </div>
      <bill-table :data="data" @update="dataUpdata" :readonly="true" @edit="edit" @save="save"></bill-table>
    </Card>
  </div>
</template>

<script>
import searchCard from "@/components/searchCard.vue";
import addressSelect from "@/components/addressSelect.vue";
import billTable from "@/components/billTable.vue";
import util from "@/util";
export default {
  components: { billTable, addressSelect, searchCard },
  name: "",
  data() {
    return {
      searchData: {
        aid: "",
        date: new Date()
      },
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
      ],
      dataFirst: []
    };
  },
  computed: {
    months() {
      return Array.from({ length: 12 }, (v, k) => k + 1);
    }
  },
  methods: {
    dataUpdata(item) {
      const index = item._index;
      this.data[index] = { ...item, isSave: false };
    },
    exportData() {},
    print() {
      window.open("#/bill/list/print/123/2020-01")
    },
    edit(item) {
      item.isEdit = true;
    },
    save(item) {
      item.isEdit = false;
    }
  }
};
</script>

<style lang="less" >
.m-button {
  text-align: right;
}
</style>