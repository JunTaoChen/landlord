<template>
  <div>
    <rental-statistics :id="searchData.buildingId"></rental-statistics>
    <Divider />
    <search-card>
      <Form :label-width="100" class="block" @submit.native.prevent>
        <FormItem label="楼名：">
          <address-select v-model="searchData.buildingId" @on-change="search"></address-select>
        </FormItem>
        <FormItem label="状态：">
          <RadioGroup v-model="searchData.status" @on-change="search">
            <Radio :label="2">已出租</Radio>
            <Radio :label="1">未出租</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </search-card>
    <Divider />
    <Card shadow>
      <h4 slot="title">
        房屋列表
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
        <div key="name" title="门牌号"></div>
        <div key="houseType" title="户型"></div>
        <div key="tenantName" title="租客姓名"></div>
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
        <div key="dueDate" title="租约日期"></div>
        <div title="操作" :width="200">
          <div slot-scope="scope">
            <Button type="warning" size="small" @click="edit(scope)">编辑房间名</Button>
            <Button v-if="searchData.status == 2" type="info" size="small" @click="toBill(scope)">查看账单</Button>
          </div>
        </div>
      </v-table>
    </Card>
    <Modal v-model="modal.visible" title="修改房屋名称" width="320">
      <Form ref="form" :model="modal.data" :rules="modal.rules" :label-width="100">
        <Row>
          <FormItem prop="name" label="房屋名称：">
            <Input v-model="modal.data.name" placeholder="请输入房屋名称" />
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="modal.visible=false">取消</Button>
        <Button @click="comfirmRoom" type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import util from "@/util";
import tableMixin from "@/mixin/table.js";
import rentalStatistics from "@/components/rentalStatistics";
import addressSelect from "@/components/addressSelect.vue";
let roomIndex;
export default {
  mixins: [tableMixin],
  components: {
    rentalStatistics,
    addressSelect,
  },
  data() {
    return {
      url: "admin/room/list",
      searchData: {
        status: 2,
        buildingId: null,
      },
      modal: {
        visible: false,
        data: {
          id:"",
          name: ""
        },
        rules: { name: util.getRequiredRule("房间名称不能为空") }
      },
      address: "",
    };
  },
  methods: {
    toBill(data) {},
    edit(item) {
      this.modal.data.id = item.id;
      this.modal.data.name = item.name;
      this.modal.visible = true;
    },
    comfirmRoom() {
      this.$refs.form.validate(valid => {
        if (valid) {
          util.ajax.put("admin/room",this.modal.data).then(({code})=>{
            if(code == 0){
              this.$Message.success('修改成功');
              this.modal.visible = false;
              this.changePage(this.curPage);
            }
          })
        }
      });
    }
  },
  activated() {
    const { id, address } = this.$route.query;
    if (id) {
      this.searchData.buildingId = parseInt(id);
      this.search();
    }else{
      this.searchData.buildingId = null;
      this.data = [];
    }
    this.searchData.status = 2;
  }
};
</script>
<style lang="less">
</style>