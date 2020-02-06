<template>
  <div>
    <search-card>
      <Form :label-width="150" class="block" @submit.native.prevent>
        <FormItem label="地址：">
          <address-select v-model="searchData.buildingId" @change="addressChange"></address-select>
        </FormItem>
        <FormItem label="日期：">
          <DatePicker type="month" v-model="searchData.date" @on-change="getData" :clearable="false"></DatePicker>
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
        buildingId: "",
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
    checkBuildingId() {
      if (this.searchData.buildingId) {
        return true;
      }
      this.$Message.warning("请先选择地址");
      return false;
    },
    addressChange(item) {
      if (item) {
        this.getData();
      }
    },
    getData() {
      const { buildingId, date } = this.searchData;
      util.ajax
        .post("admin/room/rentNoFilled/list", {
          buildingId: this.searchData.buildingId,
          year: date.getFullYear(),
          month: date.getMonth() + 1
        })
        .then(({ code, data }) => {
          if (code == 0) {
            if (data.length == 0) {
              this.$Message.warning({content:"该房源此月份暂无需要添加的账单",duration: 3});
            }
            this.data = data.map(item=>{
              item.elecmeterThismonth = item.elecmeterLastmonth;
              item.watermeterThismonth = item.watermeterLastmonth;
              item.practicalElecmeter = 0;
              item.practicalWatermeter = 0;
              return item;
            });
            this.dataFirst = [];
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
    save(data, isCalc) {
      if (!this.checkBuildingId()) {
        return;
      }
      if (data.length == 0) {
        this.$Message.warning("暂无可保存的数据");
        return;
      }
      data = data.map(item => {
        const temp = util.getRentInfo(item);
        isCalc ? (temp.rentFee = util.getRentFee(item)) : "";
        return temp;
      });
      console.log(data);
      this.$Modal.confirm({
        title: "提示",
        content: "是否保存所有数据?",
        onOk: () => {
          util.ajax.post("admin/rentinfo/batch", data).then(({ code }) => {
            if (code == 0) {
              this.$Message.success("保存成功");
            }
          });
        }
      });
    },
    saveAll() {
      this.save(this.data, true);
    },
    saveAllFirstData() {
      this.save(this.dataFirst);
    }
  }
};
</script>

<style lang="less" >
.m-button {
  text-align: right;
}
</style>