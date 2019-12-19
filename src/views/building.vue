<template>
  <div>
    <!-- <search-card>
      <Form :label-width="100" class="block" @submit.native.prevent>
        <FormItem label="地址：">
          <Input
            v-model="searchData.address"
            placeholder="请输入地址"
            class="common-input"
            search
            enter-button="查找"
            @on-search="search"
          />
        </FormItem>
        <FormItem label="楼名：">
          <Input
            v-model="searchData.name"
            placeholder="请输入楼名"
            class="common-input"
            search
            enter-button="查找"
            @on-search="search"
          />
        </FormItem>
      </Form>
    </search-card>
    <Divider /> -->
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
      >
        <div key="name" title="楼名"></div>
        <div key="address" title="详细地址"></div>
        <!-- <div key="card" title="楼层数量"></div>
        <div key="card" title="单层房源数量"></div> -->
        <div title="操作">
          <div slot-scope="scope">
            <!-- <Button type="warning" size="small" @click="edit(scope)" >编辑</Button>
            <Button type="error" size="small" @click="del(scope)">删除</Button> -->
            <Button type="warning" size="small" @click="viewHouse(scope)" >查看楼层房屋</Button>
            <Button type="info" size="small" @click="toBill(scope)" >查看租金账单</Button>
          </div>
        </div>
      </v-table>
    </Card>
    <Modal v-model="modal.visible" :title="modal.title" width="500">
      <Form ref="form" :model="modal.data" :rules="modal.rules" :label-width="100">
        <Row>
          <FormItem prop="address" label="详细地址：">
            <Input v-model="modal.data.address" placeholder="请输入详细地址" />
          </FormItem>
        </Row>
        <Row>
          <FormItem prop="name" label="楼名：">
            <Input v-model="modal.data.name" placeholder="请输入楼名" />
          </FormItem>
        </Row>
        <Row>
          <FormItem prop="n1" label="楼层数量：">
            <InputNumber :min="1" :max="99" v-model="modal.data.n1" placeholder="请输入楼层数量" />
          </FormItem>
        </Row>
        <Row>
          <FormItem prop="n2" label="单层房屋数量：">
            <InputNumber :min="1" :max="99" v-model="modal.data.n2" placeholder="请输入单层房屋数量" />
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="modal.visible=false">取消</Button>
        <Button @click="next" type="primary">下一步</Button>
      </div>
    </Modal>
    <Modal v-model="roomModal.visible" title="房屋信息" width="720">
      <!-- <Alert show-icon>点击房屋查看账单</Alert> -->
      <Collapse v-model="roomModal.value" >
        <!-- <CheckboxGroup v-model="roomModal.rows"> -->
        <Panel v-for="(value,key) in roomModal.data" :key="key"  name="1">
          <!-- <Checkbox  :label="index" @click.native.stop>{{key}}</Checkbox> -->
          {{key}}
          <div slot="content">
            <div class="room" v-for="(item, index) in value" :key="index" >
              {{item.name}}
              <!-- <span class="close" @click="delRoom(index,ind)">✖</span> -->
            </div>
            <!-- <div class="room add" @click="addRoom(index)">+</div> -->
          </div>
        </Panel>
        <!-- </CheckboxGroup> -->
      </Collapse>
      <div slot="footer">
        <Button type="text" size="large" @click="roomModal.visible=false">取消</Button>
        <Button @click="confirm" type="primary">确定</Button>
      </div>
    </Modal>
    <Modal v-model="nameModal.visible" title="新增房屋" width="320">
      <Form ref="form" :model="nameModal.data" :rules="nameModal.rules" :label-width="100">
        <Row>
          <FormItem prop="name" label="房屋名称：">
            <Input v-model="nameModal.data.name" placeholder="请输入房屋名称" />
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="nameModal.visible=false">取消</Button>
        <Button @click="comfirmRoom" type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import util from "@/util";
import tableMixin from "@/mixin/table.js";
let roomIndex;
export default {
  mixins: [tableMixin],
  data() {
    return {
      url:"admin/landlord/houses",
      searchData: {
        name: ""
      },
      modal: {
        visible: false,
        title: "",
        rules: {},
        data: {
          n1: 1,
          n2: 2
        }
      },
      roomModal: {
        visible: false,
        data: [],
        rows: [],
        value:[],
      },
      nameModal:{
        visible:false,
        rules:{},
        data:{
          name:""
        }
      }
    };
  },
  methods: {
    openAddedModal() {
      this.modal.title = "新增房源";
      this.showModal();
    },
    showModal() {
      this.modal.visible = true;
    },
    confirm() {
      
    },
    next() {
      this.roomModal.data = Array.apply(null, Array(this.modal.data.n1)).map(
        (o, i) =>
          Array.apply(null, Array(this.modal.data.n2)).map(
            (o, j) => i + 1 + util.prefixInteger(j + 1, 2)
          )
      );
      this.modal.visible = false;
      this.roomModal.visible = true;
    },
    delRoom(p, c) {
      this.roomModal.data[p].splice(c, 1);
    },
    addRoom(p){
      roomIndex = p;
      this.nameModal.data.name="";
      this.nameModal.visible = true;
    },
    comfirmRoom(){
      this.roomModal.data[roomIndex].push(this.nameModal.data.name);
      this.nameModal.visible = false;
    },
    viewHouse({roomInfo}){
      this.roomModal.data = roomInfo;
      this.roomModal.visible = true;
      this.$nextTick(()=>{
        this.roomModal.value = ["1"];
      })
    },
    toBill({id}){
      this.$router.push({ name: 'bill', query: { buildingId:id }})
      this.roomModal.visible = false;
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
<style lang="less" scoped>
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