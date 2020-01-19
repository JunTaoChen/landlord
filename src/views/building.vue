<template>
  <div>
    <rental-statistics id></rental-statistics>
    <Divider />
    <search-card>
      <Form :label-width="150" class="block" @submit.native.prevent>
        <FormItem label="地址、姓名或手机号：">
          <Input
            v-model="searchData.param"
            placeholder="请输入房源地址、房东姓名或者手机号码"
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
      <h4 slot="title">
        房源列表
        <!-- <Button type="primary" icon="md-add" @click="openAddedModal">新增</Button> -->
      </h4>
      <v-table
        :table="{data:data,loading:tableLoaing}"
        @change-page="changePage"
        :total="total"
        :current.sync="curPage"
        :pageSize.sync="pageSize"
        :showPage="true"
      >
        <div key="name" title="房源地址"></div>
        <div key="rentedRoomNum" title="出租房间数量"></div>
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
        <div key="cont" title="联系人"></div>
        <div title="操作" :width="250">
          <div slot-scope="scope">
            <!-- <Button type="warning" size="small" @click="edit(scope)" >编辑</Button>
            <Button type="error" size="small" @click="del(scope)">删除</Button>-->
            <Button type="warning" size="small" @click="viewHouse(scope)">查看房屋</Button>
            <Button type="info" size="small" @click="edit(scope)">编辑联系人</Button>
          </div>
        </div>
      </v-table>
    </Card>
    <Modal v-model="modal.visible" title="编辑联系人" width="500">
      <Form ref="form" :model="modal.data" :rules="modal.rules" :label-width="150">
        <Row>
          <FormItem label="选择房管(可不选)：">
            <Select placeholder="选择房管" :value="modal.manager" filterable @on-change="managersChange" clearable>
              <Option
                :key="item.id"
                v-for="(item,index) in modal.managers"
                :value="index"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem prop="name" label="姓名：">
            <Input v-model="modal.data.name" placeholder="请输入姓名" />
          </FormItem>
        </Row>
        <Row>
          <FormItem prop="mobile" label="手机号：">
            <Input v-model="modal.data.mobile" placeholder="请输入手机号" />
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
import rentalStatistics from "@/components/rentalStatistics";
let roomIndex;
export default {
  mixins: [tableMixin],
  components: {
    rentalStatistics
  },
  data() {
    return {
      url: "admin/building/page",
      searchData: {
        param: ""
      },
      data: [],
      modal: {
        visible: false,
        title: "",
        rules: {
          name: util.getRequiredRule("姓名不能为空"),
          mobile: util.getRules().phone
        },
        data: {
          mobile: "",
          name: "",
          id: null
        },
        manager:null,
        managers: []
      }
    };
  },
  methods: {
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          util.ajax
            .put("/admin/contact", this.modal.data)
            .then(({ code, data }) => {
              if (code == 0) {
                this.$Message.success("编辑成功");
                this.modal.visible = false;
                this.changePage(this.curPage);
              }
            });
        }
      });
    },
    viewHouse({ id }) {
      this.$router.push({ name: "rooms", query: { id } });
    },
    edit(item) {
      this.modal.data.mobile = "";
      this.modal.data.name = "";
      this.modal.manager = undefined;
      // this.modal.managers = [];
      this.modal.data.id = item.id;
      util
        .ajax("admin/building/managers", { params: { buildingId: item.id } })
        .then(({ code, data }) => {
          if (code == 0) {
            if(data){
              this.modal.managers = [data];
            }
          }
        });
      this.modal.visible = true;
    },
    managersChange(index) {
      if (index == undefined) {
        this.modal.data.mobile = "";
        this.modal.data.name = "";
        return;
      }
      const { mobile, name } = this.modal.managers[index];
      this.modal.data.mobile = mobile;
      this.modal.data.name = name;
    }
  },
  activated() {
    const { id } = this.$route.query;
    if (id) {
      this.queryTerms = { landlordId: id };
      this.changePage(1);
    }
  },
  mounted() {
    this.changePage(1);
  }
};
</script>
<style lang="less">
.room {
  display: inline-block;
  width: 60px;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  color: #fff;
  background: #2059a8;
  text-align: center;
  border-radius: 5px;
  margin: 0 15px 0 0;
  position: relative;
  cursor: pointer;
}
.room .close {
  position: absolute;
  background: #999;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  width: 20px;
  height: 20px;
  top: -10px;
  right: -10px;
  line-height: 20px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
}
.add {
  font-size: 24px;
  width: 40px;
  color: #666;
  border: 1px dotted #666;
  background: #fff;
  margin: 10px 0 0 10px;
  cursor: pointer;
  vertical-align: bottom;
}
</style>