<template>
  <div>
    <search-card>
      <Form :label-width="150" class="block" @submit.native.prevent>
        <!-- <FormItem label="填写状态：">
          <RadioGroup v-model="searchData.status">
            <Radio :label="1">已填写</Radio>
            <Radio :label="2">未填写</Radio>
          </RadioGroup>
        </FormItem> -->
        <FormItem label="日期：">
          <DatePicker type="month" v-model="date" :clearable="false" @on-change="dateChange"></DatePicker>
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
        :showPage="true"
      >
        <div key="name" title="房源地址"></div>
        <div key="unFilledNum" title="未填写数量"></div>
        <div key="filledNum" title="已填写数量"></div>
        <div key="landlordName" title="房东姓名"></div>
        <div title="手机号码">
          <div slot-scope="scope">
            <phone-tip :phone="scope.mobile"></phone-tip>
          </div>
        </div>
        <div title="身份证号码">
          <div slot-scope="scope">
            <id-tip :id="scope.idCardNo"></id-tip>
          </div>
        </div>
        <div key="address" title="详细地址"></div>
        <!-- <div key="cont" title="联系人"></div> -->
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
      url: "admin/rent/building/page",
      date: new Date(),
    };
  },
  mounted() {
    this.dateChange();
  },
  methods:{
    dateChange(){
      const date = this.date;
      this.searchData.year = date.getFullYear();
      this.searchData.month = date.getMonth()+1;
      this.search();
    }
  }
};
</script>

<style lang="" scoped>
</style>