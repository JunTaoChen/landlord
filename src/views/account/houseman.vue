<template>
  <div>
    <search-card>
      <Form :label-width="150" class="block" @submit.native.prevent>
        <FormItem label="姓名或手机号：">
          <Input v-model="searchData.address" placeholder="请输入姓名或手机号" class="common-input" search enter-button="搜索" @on-search="search" />
        </FormItem>
      </Form>
    </search-card>
    <Divider />
    <Card shadow>
      <h4 slot="title">房管列表</h4>
      <v-table :table="{data:data,loading:tableLoaing}" @change-page="changePage" :total="total" :current.sync="curPage" :pageSize.sync="pageSize" :showPage="true">
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
    <Modal v-model="modal.visible" title="编辑信息" width="500">
      <Form ref="form" :model="modal.data" :rules="modal.rules" :label-width="100">
        <Row>
          <FormItem prop="name" label="姓名：">
            <Input v-model="modal.data.name" placeholder="请输入姓名" />
          </FormItem>
        </Row>
        <Row>
          <FormItem prop="phone" label="手机号：">
            <Input v-model="modal.data.phone" placeholder="请输入手机号" />
          </FormItem>
        </Row>
        <Row>
          <FormItem prop="idCardNo" label="身份证号码：">
            <Input v-model="modal.data.idCardNo" placeholder="请输入身份证号码" />
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="modal.visible=false">取消</Button>
        <Button @click="confirm" type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import util from "@/util";
import tableMixin from "@/mixin/table.js";
const rules = util.getRules();
export default {
  mixins: [tableMixin],
  name: "",
  data() {
    return {
      url: "",
      modal: {
        visible: false,
        data: {
          name: "",
          phone: "",
          idCardNo: "",
        },
        rules: {
          name:util.getRequiredRule("姓名不能为空"),
          phone:rules.phone,
          idCardNo:rules.idCardNum,
        }
      }
    };
  },
  methods: {
    edit(item) {
      this.modal.data = item;
      this.modal.visible;
    },
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
        }
      });
    }
  }
};
</script>

<style lang="" scoped>
</style>