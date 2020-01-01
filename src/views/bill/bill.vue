<template>
  <div>
    <search-card>
      <Form :label-width="100" class="block" @submit.native.prevent>
        <!-- <FormItem label="租客姓名：">
          <Input v-model="searchData.name" placeholder="请输入名称" class="common-input" />
        </FormItem>
        <FormItem label="租客手机：">
          <Input v-model="searchData.name" placeholder="请输入租客手机号码" class="common-input" />
        </FormItem>
        <FormItem label="楼名：">
          <Input v-model="searchData.name" placeholder="请输入楼名" class="common-input" />
        </FormItem>
        <FormItem label="门牌号：">
          <Input v-model="searchData.name" placeholder="请输入门牌号" class="common-input" />
        </FormItem>-->
        <FormItem label="日期：">
          <DatePicker
            type="date"
            placeholder="请选择账单日期"
            class="common-input"
            @on-change="dateChange"
            v-model="date"
          ></DatePicker>
        </FormItem>
        <FormItem>
          <Button @click="search" type="primary" icon="ios-search">搜索</Button>
          <Button @click="_reset" icon="md-return-left">重置</Button>
        </FormItem>
      </Form>
    </search-card>
    <Divider />
    <Card shadow>
      <h4 slot="title">
        账单列表
        <!-- <Button type="primary" icon="md-add" @click="openAddedModal">新增</Button> -->
        <Button icon="md-download" @click="exportExcel">导出</Button>
      </h4>
      <v-table
        :table="{data:data,loading:tableLoaing}"
        @change-page="changePage"
        :total="total"
        :current.sync="curPage"
        :pageSize.sync="pageSize"
        :showPage="true"
      >
        <!-- <div key="name" title="租客姓名"></div>
        <div key="phone" title="租客手机"></div>
        <div key="phone" title="楼名"></div> -->
        <div key="roomNo" title="门牌号"></div>
        <div title="水表使用吨数">
           <div slot-scope="scope">
             {{scope.watermeterThismonth-scope.watermeterLastmonth}} 
             ({{scope.watermeterThismonth}}-{{scope.watermeterLastmonth}})
           </div>
        </div>
        <div  title="电表使用度数">
          <div slot-scope="scope">
             {{scope.elecmeterThismonth-scope.elecmeterLastmonth}} 
             ({{scope.elecmeterThismonth}}-{{scope.elecmeterLastmonth}})
           </div>
        </div>
        <div key="manageFee" title="管理费"></div>
        <div key="netFee" title="网费"></div>
        <div key="rentFee" title="需缴纳租金"></div>
        <div key="rentDate" title="账单日期"></div>
        <div title="账单状态">
          <div slot-scope="scope">
            {{status[scope.status]}}
          </div>
        </div>
        <!-- <div title="操作">
          <div slot-scope="scope">
            <Button type="warning" size="small" @click="edit(scope)">编辑</Button>
            <Button type="error" size="small" @click="del(scope)">删除</Button>
          </div>
        </div> -->
      </v-table>
    </Card>
    <Modal v-model="modal.visible" :title="modal.title" width="720">
      <Form ref="form" :model="modal.data" :rules="modal.rules" :label-width="100">
        <Row>
          <Col span="12">
            <FormItem prop="name" label="楼名：">
              <Select v-model="modal.data.loumin" filterable></Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem prop="name" label="门牌号：">
              <Select v-model="modal.data.loumin" filterable></Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem prop="phone" label="当月水表度数：">
              <InputNumber :min="0" v-model="modal.data.shuibiao" placeholder="请输入单月水表度数"></InputNumber>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem prop="phone" label="当月电表度数：">
              <InputNumber :min="0" v-model="modal.data.dianbiao" placeholder="请输入单月电表度数"></InputNumber>
            </FormItem>
          </Col>
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
const BILL_STATUS = {
  0:'未确认',
  1:"确认无误",
  2:"有异议"
}
Object.freeze(BILL_STATUS);
export default {
  mixins: [tableMixin],
  data() {
    return {
      url: "admin/rentinfo",
      searchData: {
      },
      modal: {
        visible: false,
        title: "",
        rules: {},
        data: {}
      },
      date:new Date(),
      status:BILL_STATUS,
    };
  },
  methods: {
    openAddedModal() {
      this.modal.title = "新增房东";
      this.showModal();
    },
    showModal() {
      this.modal.visible = true;
    },
    confirm() {
      this.modal.visible = false;
    },
    exportExcel() {
      util.ajax(
        'admin/rentinfo/export',
        {
          params:{
          ...this.searchData,
          pageNumber:1,
          pageSize:9999999,
        },
        responseType:'blob'
        }
      ).then((rep)=>{
        const blob = new Blob([rep.data])
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download =  '导出信息.xls';
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
    dateChange(localDate) {
      this.searchData = { ...this.queryTerms, localDate };
    },
    _reset() {
      let value;
      this.queryTerms = {buildingId:this.queryTerms.buildingId};
      // this.data = [];
     this.date = null;
      this.changePage(1);
    }
  },
  activated() {
    const { buildingId } = this.$route.query;
    if (buildingId) {
      this.queryTerms = {buildingId};
      this.dateChange(util.formatTime(this.date,"YYYY-MM-dd"));
      this.search();
    }
  }
};
</script>