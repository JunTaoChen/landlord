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
            <Input v-model="data.name" placeholder="请输入姓名" :maxlength="15" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="手机号：">
            <Input v-model="data.phone" placeholder="请输入手机号" :maxlength="11" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="身份证号：">
            <Input v-model="data.p1" placeholder="请输入身份证号" :maxlength="18" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="日期：">
            <DatePicker type="daterange" split-panels placeholder="请选择日期" class="block" v-model="data.p2" ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="phone" label="户型：">
            <Row>
              <Col span="4">
                <InputNumber v-model="data.p5" class="block"></InputNumber>
              </Col>
              <Col span="2">&nbsp;室</Col>
              <Col span="4">
                <InputNumber v-model="data.p5" class="block"></InputNumber>
              </Col>
              <Col span="2">&nbsp;厅</Col>
              <Col span="4">
                <InputNumber v-model="data.p5" class="block"></InputNumber>
              </Col>
              <Col span="2">&nbsp;厨</Col>
              <Col span="4">
                <InputNumber v-model="data.p5" class="block"></InputNumber>
              </Col>
              <Col span="2">&nbsp;卫</Col>
            </Row>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="name" label="房屋用途：">
            <Select v-model="data.p4" placeholder="请选择房屋用途" >
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
          <FormItem prop="name" label="租金：" >
            <InputNumber v-model="data.p5" placeholder="请输入租金" class="block"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="押金：">
            <InputNumber v-model="data.p5" placeholder="请输入押金" class="block"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="管理费：">
            <InputNumber v-model="data.p5" placeholder="请输入管理费" class="block"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="网费：">
            <InputNumber v-model="data.p5" placeholder="请输入网费" class="block"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="水表底数：">
            <InputNumber v-model="data.p5" placeholder="请输入水表底数" class="block"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="电表底数：">
            <InputNumber v-model="data.p5" placeholder="请输入电表底数" class="block"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="水费单价：">
            <InputNumber v-model="data.p5" placeholder="请输入水费单价" class="block"></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="电表单价：">
            <InputNumber v-model="data.p5" placeholder="请输入电表单价" class="block"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row class="buttons">
        <Button type="success" size="large" class="comfirm">确定</Button>
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
      data: {
        aid: "",
        rid: "",
        p5:null,
      },
      rules: {},
      title: "新增租约"
    };
  },
  computed: {
    status() {
      return status;
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
.block{
  width: 100%;
}
</style>