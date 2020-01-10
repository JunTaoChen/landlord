<template>
  <div>
    <search-card>
      <Form :label-width="150" class="block" @submit.native.prevent>
        <FormItem label="填写状态：">
          <RadioGroup v-model="searchData.status">
            <Radio :label="1">已填写</Radio>
            <Radio :label="2">未填写</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="日期：">
          <DatePicker type="month" v-model="searchData.date" :clearable="false"></DatePicker>
        </FormItem>
      </Form>
    </search-card>
    <Divider />
    <Card shadow>
      <h4 slot="title">房源列表</h4>
      <v-table
        :table="{data:data,loading:tableLoaing}"
        @change-page="changePage"
        :total="total"
        :current.sync="curPage"
        :pageSize.sync="pageSize"
      >
        <div key="addr" title="房源地址"></div>
        <div key="num" title="剩余未填写数量"></div>
        <div key="name" title="房东姓名"></div>
        <div key="phone" title="手机号码">
          <div slot-scope="scope">
            <phone-tip :phone="scope.phone"></phone-tip>
          </div>
        </div>
        <div key="card" title="身份证号码">
          <div slot-scope="scope">
            <id-tip :id="scope.card"></id-tip>
          </div>
        </div>
        <div key="cont" title="联系人"></div>
      </v-table>
    </Card>
  </div>
</template>

<script>
import billTable from "@/components/billTable.vue";
import util from "@/util";
import tableMixin from "@/mixin/table.js";
export default {
  mixins: [tableMixin],
  components: { billTable },
  name: "build_list_bill",
  data() {
    return {
      searchData: {
        date: new Date(),
        status: 1
      },
    };
  },
  mounted() {
    this.data = [
      {
        name: "张鑫",
        num: "1",
        card: "450203198605050730",
        addr: "福田区下沙村8坊70号",
        phone: "18888888888",
        cont: "张琪(189999999999)"
      }
    ];
  },
};
</script>

<style lang="" scoped>
</style>