<template>
  <div>
    <search-card>
      <Form :label-width="150" class="block" @submit.native.prevent>
        <FormItem label="姓名或手机号：">
          <Input
            v-model="searchData.param"
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
      <h4 slot="title">{{title}}</h4>
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
    <Modal v-model="modal.visible" title="编辑信息" width="500">
      <Form ref="form" :model="modal.data" :rules="modal.rules" :label-width="100">
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
//1房东 2房管 3租客
let status = 1;
export default {
  mixins: [tableMixin],
  name: "",
  data() {
    return {
      url: "admin/user/list",
      modal: {
        visible: false,
        data: {
          name: "",
          mobile: "",
          idCardNo: ""
        },
        rules: {
          name: util.getRequiredRule("姓名不能为空"),
          mobile: rules.phone,
          idCardNo: rules.idCardNum
        }
      },
      title: "房东列表",
      searchData: {
        param: "",
        type: 1
      },
    };
  },
  computed: {
    status() {
      return status;
    }
  },
  created() {
    const { name } = this.$route;
    if (name == "houseman") {
      status = 2;
      this.title = "房管列表";
    } else if (name == "tenant") {
      status = 3;
      this.title = "租客列表";
    } else {
      status = 1;
      this.title = "房东列表";
    }
    this.searchData.type = status;
  },
  methods: {
    edit({ id, idCardNo, mobile, name }) {
      this.modal.data = { id, idCardNo, mobile, name };
      this.modal.visible = true;
    },
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          util.ajax.put("admin/user", this.modal.data).then(({ code }) => {
            if (code == 0) {
              this.$Message.success("编辑成功");
              this.modal.visible = false;
              this.changePage(this.curPage);
            }
          });
        }
      });
    }
  },
  mounted() {
    this.search();
  }
};
</script>

<style lang="" scoped>
</style>