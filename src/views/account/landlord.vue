<template>
  <div>
    <search-card>
      <Form :label-width="150" class="block" @submit.native.prevent>
        <FormItem label="姓名或手机号：">
          <Input
            v-model="searchData.address"
            placeholder="请输入姓名或手机号"
            class="common-input"
            search
            enter-button="搜索"
            @on-search="search"
          />
        </FormItem>
      </Form>
    </search-card>
    <Divider />
    <Card shadow>
      <h4 slot="title">房东列表</h4>
      <v-table
        :table="{data:data,loading:tableLoaing}"
        @change-page="changePage"
        :total="total"
        :current.sync="curPage"
        :pageSize.sync="pageSize"
        :showPage="true"
      >
        <div key="name" title="姓名"></div>
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
        <div title="操作">
          <div slot-scope="scope">
            <Button type="info" size="small" @click="edit(scope)">编辑</Button>
          </div>
        </div>
      </v-table>
    </Card>
  </div>
</template>

<script>
import util from "@/util";
import tableMixin from "@/mixin/table.js";
export default {
  mixins: [tableMixin],
  name: "",
  data() {
    return {
      url: ""
    };
  }
};
</script>

<style lang="" scoped>
</style>