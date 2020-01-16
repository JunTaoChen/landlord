<template>
  <Card shadow :title="title">
    <Form ref="form" :model="data" :rules="rules" :label-width="100">
      <Row>
        <Col span="12">
          <FormItem prop="buildingId" label="地址：">
            <address-select v-model="data.buildingId"></address-select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="roomId" label="门牌号：">
            <rooms-select v-model="data.roomId" :aid="data.aid"></rooms-select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="姓名：">
            <Input
              :readonly="disable"
              :clearable="!disable"
              v-model="data.name"
              placeholder="请输入姓名"
              :maxlength="15"
            />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="mobile" label="手机号：">
            <Input
              :readonly="disable"
              :clearable="!disable"
              v-model="data.mobile"
              placeholder="请输入手机号"
              :maxlength="11"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="idCardNo" label="身份证号：">
            <Input
              :readonly="disable"
              :clearable="!disable"
              v-model="data.idCardNo"
              placeholder="请输入身份证号"
              :maxlength="18"
              clearable
            />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="dates" label="日期：">
            <DatePicker
              :disabled="disable"
              type="daterange"
              split-panels
              placeholder="请选择日期"
              class="block"
              v-model="data.dates"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem  label="户型：">
            <Row>
              <Col span="4">
                <InputNumber :min="0" :max="9" :readonly="disable" v-model="data.houseType1" class="block"></InputNumber>
              </Col>
              <Col span="2">&nbsp;室</Col>
              <Col span="4">
                <InputNumber :min="0" :max="9" :readonly="disable" v-model="data.houseType2" class="block"></InputNumber>
              </Col>
              <Col span="2">&nbsp;厅</Col>
              <Col span="4">
                <InputNumber :min="0" :max="9" :readonly="disable" v-model="data.houseType3" class="block"></InputNumber>
              </Col>
              <Col span="2">&nbsp;厨</Col>
              <Col span="4">
                <InputNumber :min="0" :max="9" :readonly="disable" v-model="data.houseType4" class="block"></InputNumber>
              </Col>
              <Col span="2">&nbsp;卫</Col>
            </Row>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="type" label="房屋用途：">
            <Select :disabled="disable" v-model="data.type" placeholder="请选择房屋用途">
              <Option :value="0">个人</Option>
              <Option :value="1">宿舍</Option>
              <!-- <Option value="3">办公</Option>
              <Option value="4">工商业</Option>
              <Option value="5">其他</Option> -->
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="baseRent" label="租金：">
            <InputNumber :readonly="disable" v-model="data.baseRent" placeholder="请输入租金" class="block"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="deposit" label="押金：">
            <InputNumber :readonly="disable" v-model="data.deposit" placeholder="请输入押金" class="block"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="manageFee" label="管理费：">
            <InputNumber :readonly="disable" v-model="data.manageFee" placeholder="请输入管理费" class="block"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="netFee" label="网费：">
            <InputNumber :readonly="disable" v-model="data.netFee" placeholder="请输入网费" class="block"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="watermeterBase" label="水表底数：">
            <InputNumber :readonly="disable" v-model="data.watermeterBase" placeholder="请输入水表底数" class="block"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="elecmeterBase" label="电表底数：">
            <InputNumber :readonly="disable" v-model="data.elecmeterBase" placeholder="请输入电表底数" class="block"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="waterFee" label="水费单价：">
            <InputNumber :readonly="disable" v-model="data.waterFee" placeholder="请输入水费单价" class="block"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="elecFee" label="电表单价：">
            <InputNumber :readonly="disable" v-model="data.elecFee" placeholder="请输入电表单价" class="block"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="gasFee" label="燃气费：">
            <InputNumber :readonly="disable" v-model="data.gasFee" placeholder="请输入水表底数" class="block"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="hotWaterFee" label="热水费：">
            <InputNumber :readonly="disable" v-model="data.hotWaterFee" placeholder="请输入电表底数" class="block"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="firstRent" label="首次租金：">
            <InputNumber :readonly="disable" v-model="data.firstRent" placeholder="请输入水表底数" class="block"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="firstRentDate" label="首次账单日期：">
            <DatePicker
              :disabled="disable"
              type="date"
              placeholder="请选择首次账单日期"
              class="block"
              v-model="data.firstRentDate"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row class="buttons">
        <Button v-if="status==1" type="success" size="large" class="comfirm">新增</Button>
        <Button v-else-if="status==2" type="info" size="large" class="comfirm">修改</Button>
        <Button v-else type="primary" size="large" class="comfirm" @click="print">打印</Button>
      </Row>
    </Form>
  </Card>
</template>

<script>
import addressSelect from "@/components/addressSelect.vue";
import roomsSelect from "@/components/roomsSelect.vue";
import util from "@/util";
//1新增 2编辑 3打印
let status = 1;
let rules = util.getRules();
export default {
  components: { addressSelect, roomsSelect },
  name: "",
  data() {
    return {
      data: {
        buildingId:"",
        roomId:"",
        name:"",
        idCardNo:"",
        dates:[],
        houseType1:2,
        houseType2:undefined,
        houseType3:null,
        houseType4:null,
        type:null,
        baseRent:null,
        deposit:null,
        manageFee:null,
        netFee:null,

        watermeterBase:null,
        elecmeterBase:null,
        waterFee:null,
        elecFee:null,
        gasFee:null,
        hotWaterFee:null,
        firstRent:null,
        firstRentDate:null,
      },
      rules: {
        roomId:util.getRequiredRuleOnChange(),
        name:util.getRequiredRule("姓名不能为空"),
        mobile:rules.phone,
        idCardNo:rules.idCardNum,
        dates:{
          type:"array",
          required: true,
          len: 2,
          trigger: 'change',
          message:"日期不能为空"
        },
        type:util.getRequiredRuleOnChange("房屋用途不能为空"),
        baseRent:util.getRequiredRule("租金不能为空"),
        deposit:util.getRequiredRule("押金不能为空"),
        manageFee:util.getRequiredRule("管理费不能为空"),
        netFee:util.getRequiredRule("网费不能为空"),
        watermeterBase:util.getRequiredRule("水表底数不能为空"),
        elecmeterBase:util.getRequiredRule("电表底数不能为空"),
        waterFee:util.getRequiredRule("水费单价不能为空"),
        elecFee:util.getRequiredRule("电表单价不能为空"),
        gasFee:util.getRequiredRule("燃气费不能为空"),
        hotWaterFee:util.getRequiredRule("热水费不能为空"),
      },
      title: "新增租约"
    };
  },
  computed: {
    status() {
      return status;
    },
    disable() {
      return this.status === 3;
    }
  },
  created() {
    const { path } = this.$route;
    if (path == "/contract_update") {
      status = 2;
      this.title = "编辑租约";
    } else if (path == "/contract_print") {
      status = 3;
      this.title = "打印租约";
    }
    if (status == 1) {
      this.data = {
        buildingId:"",
        roomId:"",
        name:"",
        idCardNo:"",
        dates:[],
        houseType1:null,
        houseType2:null,
        houseType3:null,
        houseType4:null,
        type:null,
        baseRent:null,
        deposit:null,
        manageFee:null,
        netFee:null,

        watermeterBase:null,
        elecmeterBase:null,
        waterFee:null,
        elecFee:null,
        gasFee:null,
        hotWaterFee:null,
        firstRent:null,
        firstRentDate:null,
      };
    } else {
      this.data = {};
    }
  },
  methods:{
    print(){
      window.open("#/contract/print/123")
    }
  }
};
</script>

<style lang="less" scoped>
.buttons {
  text-align: center;
  .comfirm {
    width: 300px;
  }
}
.block {
  width: 100%;
}
</style>