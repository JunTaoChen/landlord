<template>
  <Card shadow :title="title">
    <Form ref="form" :model="data" :rules="rules" :label-width="100">
      <Row>
        <Col span="12">
          <FormItem prop="buildingId" label="地址：">
            <address-select @change="addressChange" v-model="data.buildingId"></address-select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="roomId" label="房间：">
            <rooms-select v-model="data.roomId" :aid="data.buildingId" @change="roomChange"></rooms-select>
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
          <FormItem prop="houseType" label="户型：">
            <Row>
              <!-- <Select :disabled="disable" v-model="data.houseType" placeholder="请选择户型">
              <Option v-for="item in houseTypes" :key="item" :value="item">{{item}}</Option>
              </Select>-->
              <Dropdown class="block" @on-click="houseTypeChange">
                <Input
                  :readonly="disable"
                  :clearable="!disable"
                  v-model="data.houseType"
                  placeholder="请输入户型"
                />
                <DropdownMenu slot="list" >
                  <DropdownItem :name="item" v-for="item in houseTypes"  :key="item">{{item}}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Row>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="type" label="房屋用途：">
            <Select :disabled="disable" v-model="data.type" placeholder="请选择房屋用途">
              <Option v-for="item in types" :value="item.key" :key="item.key">{{item.value}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="baseRent" label="租金：">
            <InputNumber
              :readonly="disable"
              v-model="data.baseRent"
              placeholder="请输入租金"
              class="block"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="deposit" label="押金：">
            <InputNumber
              :readonly="disable"
              v-model="data.deposit"
              placeholder="请输入押金"
              class="block"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="manageFee" label="管理费：">
            <InputNumber
              :readonly="disable"
              v-model="data.manageFee"
              placeholder="请输入管理费"
              class="block"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="netFee" label="网费：">
            <InputNumber
              :readonly="disable"
              v-model="data.netFee"
              placeholder="请输入网费"
              class="block"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="watermeterBase" label="水表底数：">
            <InputNumber
              :readonly="disable"
              v-model="data.watermeterBase"
              placeholder="请输入水表底数"
              class="block"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="elecmeterBase" label="电表底数：">
            <InputNumber
              :readonly="disable"
              v-model="data.elecmeterBase"
              placeholder="请输入电表底数"
              class="block"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="waterFee" label="水费单价：">
            <InputNumber
              :readonly="disable"
              v-model="data.waterFee"
              placeholder="请输入水费单价"
              class="block"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="elecFee" label="电表单价：">
            <InputNumber
              :readonly="disable"
              v-model="data.elecFee"
              placeholder="请输入电表单价"
              class="block"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="gasFee" label="燃气费：">
            <InputNumber
              :readonly="disable"
              v-model="data.gasFee"
              placeholder="请输入燃气费"
              class="block"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="hotWaterFee" label="热水费：">
            <InputNumber
              :readonly="disable"
              v-model="data.hotWaterFee"
              placeholder="请输入热水费"
              class="block"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="rentDay" label="每月交租日：">
            <Select :disabled="disable" v-model="data.rentDay" placeholder="请选择每月交租日" filterable>
              <Option v-for="item in days" :key="item" :value="item">{{item}}日</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="firstRent" label="首次租金：">
            <InputNumber
              :readonly="disable"
              v-model="data.firstRent"
              placeholder="请输入首次租金"
              class="block"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
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
        <Button v-if="status==1" type="success" size="large" class="comfirm" @click="comfirm">新增</Button>
        <template v-else-if="status==2">
          <Button type="info" size="large" class="comfirm" @click="comfirm">修改</Button>
          <Button type="primary" size="large" class="comfirm" @click="print">打印</Button>
          <Button type="success" size="large" class="comfirm" @click="exportData">导出</Button>
          <Button type="error" size="large" class="comfirm" @click="del">删除</Button>
        </template>
      </Row>
    </Form>
  </Card>
</template>

<script>
import addressSelect from "@/components/addressSelect.vue";
import roomsSelect from "@/components/roomsSelect.vue";
import util from "@/util";
import { CONTRACT_TYPE } from "@/util/constant.js";
//1新增 2编辑 3打印
let status = 1;
let rules = util.getRules();
const HOUST_TYPE = [
  "一室一厨一卫",
  "两室一厅一卫",
  "三室一厅一卫",
  "三室两厅一卫",
  "四室两厅两卫"
];
// const DAYS = Array(28)
//   .fill(" ")
//   .map((e, i) => i + 1);
const formatDay = date => util.formatTime(date, "YYYY-MM-dd");
Object.freeze(CONTRACT_TYPE);
Object.freeze(HOUST_TYPE);
export default {
  components: { addressSelect, roomsSelect },
  name: "",
  data() {
    return {
      data: {
        buildingId: null,
        roomId: "",
        name: "",
        idCardNo: "",
        dates: [],
        houseType: null,
        type: null,
        baseRent: null,
        deposit: null,
        manageFee: null,
        netFee: null,
        watermeterBase: null,
        elecmeterBase: null,
        waterFee: null,
        elecFee: null,
        gasFee: null,
        hotWaterFee: null,
        firstRent: null,
        firstRentDate: null,
        rentDay: null
      },
      rules: {
        roomId: util.getRequiredRule("请选择门牌号"),
        name: util.getRequiredRule("姓名不能为空"),
        mobile: rules.phone,
        idCardNo: rules.idCardNum,
        dates: {
          type: "array",
          required: true,
          len: 2,
          trigger: "change",
          message: "日期不能为空",
          fields: {
            0: { type: "date", message: "日期不能为空" },
            1: { type: "date", message: "日期不能为空" }
          }
        },
        type: util.getRequiredRuleOnChange("房屋用途不能为空"),
        baseRent: util.getRequiredRule("租金不能为空"),
        deposit: util.getRequiredRule("押金不能为空"),
        manageFee: util.getRequiredRule("管理费不能为空"),
        netFee: util.getRequiredRule("网费不能为空"),
        watermeterBase: util.getRequiredRule("水表底数不能为空"),
        elecmeterBase: util.getRequiredRule("电表底数不能为空"),
        waterFee: util.getRequiredRule("水费单价不能为空"),
        elecFee: util.getRequiredRule("电表单价不能为空"),
        gasFee: util.getRequiredRule("燃气费不能为空"),
        hotWaterFee: util.getRequiredRule("热水费不能为空"),
        rentDay: util.getRequiredRuleOnChange("每月交租日不能为空")
      },
      title: "新增租约",
      address: "",
      room: "",
      types: CONTRACT_TYPE,
      houseTypes: HOUST_TYPE,
      addTypeLoading: false
    };
  },
  computed: {
    status() {
      return status;
    },
    disable() {
      return this.status === 3;
    },
    days() {
      return [1,15];
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
    } else {
      status = 1;
      this.title = "新增租约";
    }
  },
  methods: {
    addressChange(item) {
      if (item) {
        this.address = item.name;
      }
    },
    roomChange(item) {
      if (this.status == 1) {
        return;
      }
      if (item) {
        this.room = item.name;
      }
      const { roomId, buildingId } = this.data;
      if (roomId) {
        util
          .ajax("/admin/contract", { params: { roomId } })
          .then(({ code, data }) => {
            if (code == 0) {
              if (data) {
                data.dates = [data.checkinDate, data.dueDate];
                delete data.checkinDate;
                delete data.dueDate;
                this.data = { ...data, roomId, buildingId };
              } else {
                this.$refs.form.resetFields();
                this.data.roomId = roomId;
                this.data.buildingId = buildingId;
                this.$Message.warning("该房间暂无合同");
              }
            }
          });
      }
    },
    exportData() {
      if (!this.checkId()) {
        return;
      }
      util.exportFile(
        "/admin/contract/export",
        { contractId: this.data.id },
        `合同-${this.data.name}.xls`
      );
    },
    del() {
      if (!this.checkId()) {
        return;
      }
      util.ajax
        .delete("/admin/contract", { params: { contractId: this.data.id } })
        .then(({ code }) => {
          if (code == 0) {
            this.$Message.success("删除成功");
            this.$refs.form.resetFields();
          }
        });
    },
    print() {
      if (!this.checkId()) {
        return;
      }
      window.open(
        `#/contract/print/${this.data.roomId}?address=${this.address}&room=${this.room}`
      );
    },
    comfirm() {
      if (this.status == 2 && !this.checkId()) {
        return;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          const data = { ...this.data };
          const { dates, firstRentDate } = data;
          let method = "post";
          data.checkinDate = formatDay(dates[0]);
          data.dueDate = formatDay(dates[1]);
          delete data.dates;
          delete data.buildingId;
          data.firstRentDate = formatDay(firstRentDate);
          if (this.status == 2) {
            delete data.roomAddress;
            delete data.img;
            delete data.attachContactList;
            // method = "put";
          }
          util.ajax("admin/contract", { method, data }).then(({ code }) => {
            if (code == 0) {
              if (this.status == 1) {
                this.$Message.success("新增成功");
              } else if (this.status == 2) {
                this.$Message.success("修改成功");
              }
            }
          });
        }
      });
    },
    checkId() {
      if (!this.data.id) {
        this.$Message.warning("请先选择房屋");
        return false;
      }
      return true;
    },
    houseTypeChange(value){
      this.data.houseType = value;
    }
  }
};
</script>

<style lang="less" scoped>
.buttons {
  text-align: center;
  .comfirm {
    width: 220px;
    margin: 0 10px;
  }
}
.block {
  width: 100%;
}
</style>