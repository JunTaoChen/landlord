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
      <div class="m-button"><Button type="primary" icon="md-add" @click="saveAll">全部保存</Button></div>
      <bill-table :data="data" @change="change" @update="dataUpdata"></bill-table>
    </Card>
    <Divider />
    <Card shadow>
      <div class="m-button"><Button type="primary" icon="md-add" @click="saveAllFirstData">全部保存</Button></div>
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
          isSave:true,
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
          isSave:true,
        },
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
    change(index) {
      let item = this.data.splice(index, 1)[0];
      item.p10 = item.p1+item.p4*item.p5+item.p8*item.p9;
      this.dataFirst.push(item);
    },
    cannal(index){
      let item = this.dataFirst.splice(index, 1)[0];
      item.p10 = item.p1+item.p4*item.p5+item.p8*item.p9;
      this.data.push(item);
    },
    dataUpdata(item){
      const index = item._index;
      this.data[index] = {...item,isSave:false};
    },
    dataFirstUpdate(item){
      const index = item._index;
      this.dataFirst[index] = {...item,isSave:false};
    },
    saveAll(){

    },
    saveAllFirstData(){

    },
  }
};
</script>

<style lang="less" >
.m-button{
  text-align: right;
}
</style>