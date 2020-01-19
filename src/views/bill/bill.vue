<template>
  <div>
    <search-card>
      <Form :label-width="150" class="block" @submit.native.prevent>
        <FormItem label="地址：">
          <address-select v-model="searchData.buildingId" @change="addressChange"></address-select>
        </FormItem>
        <FormItem label="日期：">
          <DatePicker type="month" v-model="searchData.date" :clearable="false" @on-change="getData"></DatePicker>
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
      <bill-table :data="data" @update="dataUpdata" :readonly="true" @edit="edit" @save="save" :loading="loading"></bill-table>
    </Card>
  </div>
</template>

<script>
import searchCard from "@/components/searchCard.vue";
import addressSelect from "@/components/addressSelect.vue";
import billTable from "@/components/billTable.vue";
import util from "@/util";
let address="";
export default {
  components: { billTable, addressSelect, searchCard },
  name: "",
  data() {
    return {
      searchData: {
        buildingId: null,
        date: new Date()
      },
      data: [],
      loading:false,
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
        address = item.name;
        this.getData();
      }
    },
    getData() {
      const { buildingId, date } = this.searchData;
      this.loading = true;
      util
        .ajax("/admin/rentinfo/list", {
          params: {
            buildingId,
            year: date.getFullYear(),
            month: date.getMonth() + 1
          }
        })
        .then(({ code, data }) => {
          this.$nextTick(()=>{
            this.loading = false;
          })
          if (code == 0) {
            if (data.length == 0) {
              this.$Message.warning("该房源地址暂无账单");
            }
            this.data = data.map(item => {
              item.isSave = true;
              item.isEdit = false;
              return item;
            });
          }
        });
    },
    dataUpdata(item) {
      const index = item._index;
      item.isSave = false;
      // this.data[index] = { ...item, isSave: false };
    },
    exportData() {
      if(!this.checkBuildingId()){
        return;
      }
      const { buildingId, date } = this.searchData;
      const params  = {buildingId,year: date.getFullYear(),month: date.getMonth() + 1}
      util.exportFile("admin/rentinfo/export",params,`账单-${address}-${params.year}-${params.month}.xls`)
    },
    print() {
      if(!this.checkBuildingId()){
        return;
      }
      const { buildingId, date } = this.searchData;
      window.open(`#/bill/list/print/${buildingId}/${date.getFullYear()}/${date.getMonth() + 1}`);
    },
    edit(item) {
      item.isEdit = true;
    },
    save(item) {
      item.isEdit = false;
    },
    checkBuildingId(){
      if(this.searchData.buildingId){
        return true;
      }
      this.$Message.warning("请先选择地址");
      return false;
    }
  }
};
</script>

<style lang="less" >
.m-button {
  text-align: right;
}
</style>