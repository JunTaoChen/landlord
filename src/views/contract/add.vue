<template>
  <Card shadow :title="title">
    <Form ref="form" :model="data" :rules="rules" :label-width="100">
      <Row>
        <Col span="12">
          <FormItem prop="name" label="地址：">
            <address-select v-model="data.aid"></address-select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="门牌号：">
            <rooms-select v-model="data.rid" :aid="data.aid"></rooms-select>
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
          <FormItem prop="phone" label="手机号：">
            <Input
              :readonly="disable"
              :clearable="!disable"
              v-model="data.phone"
              placeholder="请输入手机号"
              :maxlength="11"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="身份证号：">
            <Input
              :readonly="disable"
              :clearable="!disable"
              v-model="data.p1"
              placeholder="请输入身份证号"
              :maxlength="18"
              clearable
            />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="日期：">
            <DatePicker
              :disabled="disable"
              type="daterange"
              split-panels
              placeholder="请选择日期"
              class="block"
              v-model="data.p2"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="phone" label="户型：">
            <Row>
              <Col span="4">
                <InputNumber :readonly="disable" v-model="data.p3" class="block"></InputNumber>
              </Col>
              <Col span="2">&nbsp;室</Col>
              <Col span="4">
                <InputNumber :readonly="disable" v-model="data.p4" class="block"></InputNumber>
              </Col>
              <Col span="2">&nbsp;厅</Col>
              <Col span="4">
                <InputNumber v-model="data.p5" class="block"></InputNumber>
              </Col>
              <Col span="2">&nbsp;厨</Col>
              <Col span="4">
                <InputNumber :readonly="disable" v-model="data.p6" class="block"></InputNumber>
              </Col>
              <Col span="2">&nbsp;卫</Col>
            </Row>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="name" label="房屋用途：">
            <Select :disabled="disable" v-model="data.p7" placeholder="请选择房屋用途">
              <Option value="1">住宅</Option>
              <Option value="2">仓库</Option>
              <Option value="3">办公</Option>
              <Option value="4">工商业</Option>
              <Option value="5">其他</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="租金：">
            <InputNumber :readonly="disable" v-model="data.p8" placeholder="请输入租金" class="block"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="押金：">
            <InputNumber :readonly="disable" v-model="data.p9" placeholder="请输入押金" class="block"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="管理费：">
            <InputNumber :readonly="disable" v-model="data.p10" placeholder="请输入管理费" class="block"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="网费：">
            <InputNumber :readonly="disable" v-model="data.p11" placeholder="请输入网费" class="block"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="水表底数：">
            <InputNumber :readonly="disable" v-model="data.p12" placeholder="请输入水表底数" class="block"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="电表底数：">
            <InputNumber :readonly="disable" v-model="data.p13" placeholder="请输入电表底数" class="block"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="水费单价：">
            <InputNumber :readonly="disable" v-model="data.p14" placeholder="请输入水费单价" class="block"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="电表单价：">
            <InputNumber :readonly="disable" v-model="data.p15" placeholder="请输入电表单价" class="block"></InputNumber>
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
//1新增 2编辑 3打印
let status = 1;
export default {
  components: { addressSelect, roomsSelect },
  name: "",
  data() {
    return {
      data: {},
      rules: {},
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
        aid: "",
        rid: "",
        name: "",
        phone: "",
        p1: "",
        p2: [],
        p3: null,
        p4: null,
        p5: null,
        p6: null,
        p7: "",
        p8: null,
        p9: null,
        p10: null,
        p11: null,
        p12: null,
        p13: null,
        p14: null,
        p15: null
      };
    } else {
      this.data = {
        aid: "1",
        rid: "1",
        name: "test",
        phone: "188888888888",
        p1: 1000,
        p2: [new Date(), new Date(2021, 1, 1)],
        p3: 3,
        p4: 4,
        p5: 5,
        p6: 6,
        p7: "1",
        p8: 8,
        p9: 9,
        p10: 10,
        p11: 11,
        p12: 12,
        p13: 13,
        p14: 14,
        p15: 15
      };
    }
  },
  methods:{
    print(){
      window.open("landlord#/contract/print/123")
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