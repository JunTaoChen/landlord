<template>
  <div>
    <div>
      <Row class="info-card"  :gutter="20">
        <Col :span="12">
          <Card :padding="0" shadow>
            <div class="left" style="background:#ff9900">
              <Icon type="ios-log-in"/>
            </div>
            <div class="right">
              <ICountUp :startVal="0" :endVal="1000"/>
              <p>已出租</p>
            </div>
          </Card>
        </Col>
        <Col :span="12">
          <Card :padding="0" shadow>
            <div class="left" style="background:#2d8cf0">
              <Icon type="ios-log-out"/>
            </div>
            <div class="right">
              <ICountUp :startVal="0" :endVal="1000"/>
              <p>未出租</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
    <Divider />
    <search-card>
      <Form :label-width="100" class="block" @submit.native.prevent>
        <FormItem label="地址：">
            福田区下沙村8坊70号
        </FormItem>
        <FormItem label="状态：">
           <RadioGroup v-model="searchData.name">
                <Radio label="">全部</Radio>
                <Radio :label="1">未出租</Radio>
                <Radio :label="2">已出租</Radio>
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
      >
        <div key="name" title="门牌号"></div>
        <div key="card" title="户型"></div>
        <div key="card" title="租客姓名"></div>
        <div title="手机号码">
          <div slot-scope="scope">
            <phone-tip :id="scope.phone"></phone-tip>
          </div>
        </div>
        <div title="身份证号码">
          <div slot-scope="scope">
            <id-tip :id="scope.address"></id-tip>
          </div>
        </div>
        <div key="card" title="租约日期"></div>
        <div title="操作">
          <div slot-scope="scope">
            <Button type="warning" size="small" @click="edit(scope)" >编辑房间名</Button>
            <Button type="info" size="small" @click="toBill(scope)" >查看租金账单</Button>
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
import ICountUp from "vue-countup-v2";
let roomIndex;
export default {
  mixins: [tableMixin],
  components: {
    ICountUp,
  },
  data() {
    return {
      url:"admin/landlord/houses",
      searchData: {
        name: ""
      },
      modal:{
          visible:true,
          data:{
              name:""
          },
          rules: {name:util.getRequiredRule("房间名称不能为空")},
      }
    };
  },
  methods: {
      toBill(data){

      },
      edit(){

      },
      comfirmRoom(){

      }
  },
  activated(){
    const {id} = this.$route.query;
    if(id){
      this.queryTerms = {landlordId:id};
      this.changePage(1);
    }
  }
};
</script>
<style lang="less">
</style>