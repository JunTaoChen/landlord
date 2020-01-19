<template>
  <div>
    <search-card>
      <Form :label-width="150" class="block" @submit.native.prevent>
        <FormItem label="地址：">
          <address-select v-model="searchData.aid" @change="addressChange"></address-select>
        </FormItem>
        <FormItem label="日期：">
          <DatePicker
            type="month"
            v-model="searchData.date"
            @on-change="getData"
            :clearable="false"
          ></DatePicker>
        </FormItem>
      </Form>
    </search-card>
    <Divider />
    <Card shadow>
      <h4 slot="title">账单列表</h4>
      <div class="m-button">
        <Button type="primary" icon="md-add" @click="saveAll">全部保存</Button>
      </div>
      <bill-table :data="data" @change="change" @update="dataUpdata"></bill-table>
    </Card>
    <Divider />
    <Card shadow>
      <div class="m-button">
        <Button type="primary" icon="md-add" @click="saveAllFirstData">全部保存</Button>
      </div>
      <h4 slot="title">首月入住</h4>
      <bill-table :data="dataFirst" @change="cannal" :isFirst="true" @update="dataFirstUpdate"></bill-table>
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
      data: [],
      dataFirst: []
    };
  },
  computed: {
    months() {
      return Array.from({ length: 12 }, (v, k) => k + 1);
    }
  },
  methods: {
    addressChange(item) {
      if (item) {
        this.getData();
      }
    },
    getData() {
      const { aid, date } = this.searchData;
      util
        .ajax("/admin/rentinfo/list", {
          params: {
            buildingId: this.searchData.aid,
            year: date.getFullYear(),
            month: date.getMonth() + 1,
          }
        })
        .then(({ code, data }) => {
          if (code == 0) {
            if(data.rentInfoList.length == 0){
              this.$Message.warning("该房源地址暂无账单");
            }
            this.data = data.rentInfoList;
            this.dataFirst.length=0;
          }
        });
    },
    change(index) {
      let item = this.data.splice(index, 1)[0];
      item.p10 = item.p1 + item.p4 * item.p5 + item.p8 * item.p9;
      this.dataFirst.push(item);
    },
    cannal(index) {
      let item = this.dataFirst.splice(index, 1)[0];
      item.p10 = item.p1 + item.p4 * item.p5 + item.p8 * item.p9;
      this.data.push(item);
    },
    dataUpdata(item) {
      const index = item._index;
      this.data[index] = { ...item, isSave: false };
    },
    dataFirstUpdate(item) {
      const index = item._index;
      this.dataFirst[index] = { ...item, isSave: false };
    },
    saveAll() {},
    saveAllFirstData() {}
  }
};
</script>

<style lang="less" >
.m-button {
  text-align: right;
}
</style>