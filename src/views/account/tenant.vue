<template>
  <div>
    <search-card>
      <Form :label-width="100" class="block" @submit.native.prevent>
        <FormItem label="名称：">
          <Input v-model="searchData.name" placeholder="请输入名称" class="common-input" />
        </FormItem>
        <FormItem label="手机号码：">
          <Input v-model="searchData.name" placeholder="请输入名称" class="common-input" />
        </FormItem>
        <FormItem label="身份证号：">
          <Input v-model="searchData.name" placeholder="请输入名称" class="common-input" />
        </FormItem>
        <FormItem label="交租日期：">
          <DatePicker type="date" placeholder="选择交租日期" class="common-input"></DatePicker>
        </FormItem>
        <FormItem>
          <Button @click="search" type="primary" icon="ios-search">搜索</Button>
          <Button @click="reset" icon="md-return-left">重置</Button>
        </FormItem>
      </Form>
    </search-card>
    <Divider />
    <Card shadow>
      <h4 slot="title">
        租客列表
        <Button type="primary" icon="md-add" @click="openAddedModal">新增</Button>
      </h4>
      <v-table
        :table="{data:data,loading:tableLoaing}"
        @change-page="changePage"
        :total="total"
        :current.sync="curPage"
        :pageSize.sync="pageSize"
      >
        <div key="name" title="姓名"></div>
        <div key="phone" title="手机号码"></div>
        <div key="card" title="身份证"></div>
        <div key="card" title="房源名称"></div>
        <div key="card" title="门牌号"></div>
        <div key="card" title="租金"></div>
        <div key="card" title="押金"></div>
        <div key="card" title="入住时间"></div>
        <div key="card" title="到期时间"></div>
        <div key="card" title="交租日期"></div>
        <div title="操作">
          <div slot-scope="scope">
            <Button type="warning" size="small" @click="edit(scope)" v-if="operation.set">编辑</Button>
            <Button type="error" size="small" @click="del(scope)" v-if="operation.del">删除</Button>
          </div>
        </div>
      </v-table>
    </Card>
    <Modal v-model="modal.visible" :title="modal.title" width="500">
      <Form ref="form" :model="modal.data" :rules="modal.rules" :label-width="100">
        <Row>
          <FormItem prop="name" label="姓名：">
            <Input v-model="modal.data.name" placeholder="请输入姓名" />
          </FormItem>
        </Row>
        <Row>
          <FormItem prop="phone" label="手机号码：">
            <Input v-model="modal.data.phone" placeholder="请输入手机号码" />
          </FormItem>
        </Row>
        <Row>
          <FormItem prop="idcard" label="身份证：">
            <Input v-model="modal.data.idcard" placeholder="请输入身份证" />
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
export default {
  mixins: [tableMixin],
  data() {
    return {
      searchData: {
        name: ""
      },
      modal: {
        visible: false,
        title: "",
        rules: {},
        data: {}
      }
    };
  },
  methods: {
    openAddedModal() {
      this.modal.title = "新增租客";
      this.showModal();
    },
    showModal() {
      this.modal.visible = true;
    },
    confirm() {
      this.modal.visible = false;
    }
  }
};
</script>