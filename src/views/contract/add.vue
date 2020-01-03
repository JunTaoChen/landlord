<template>
  <Card shadow title="新增租约">
    <Form ref="form" :model="data" :rules="rules" :label-width="100">
      <Row>
        <Col span="12">
          <FormItem prop="name" label="地址：">
            <Input v-model="data.name" placeholder="请输入地址" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="门牌号：">
            <Input v-model="data.phone" placeholder="请输入门牌号" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="姓名：">
            <Input v-model="data.name" placeholder="请输入姓名" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="手机号：">
            <Input v-model="data.phone" placeholder="请输入手机号" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="身份证号：">
            <Input v-model="data.name" placeholder="请输入身份证号" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="户型：">
            <Input v-model="data.phone" placeholder="请输入户型" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="房屋用途：">
            <Input v-model="data.name" placeholder="房屋用途" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="日期：">
            <Input v-model="data.phone" placeholder="请输入日期" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="租金：">
            <Input v-model="data.name" placeholder="请输入租金" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="押金：">
            <Input v-model="data.phone" placeholder="请输入押金" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="水表底数：">
            <Input v-model="data.name" placeholder="请输入水表底数" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="电表底数：">
            <Input v-model="data.phone" placeholder="请输入电表底数" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="管理费：">
            <Input v-model="data.name" placeholder="请输入管理费" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="网费：">
            <Input v-model="data.phone" placeholder="请输入网费" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="name" label="水费单价：">
            <Input v-model="data.name" placeholder="请输入水费单价" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="phone" label="电表底价：">
            <Input v-model="data.phone" placeholder="请输入电表底价" />
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
export default {
  name: "",
  data() {
    return {
      data: {
          
      },
      rules: {}
    };
  }
};
</script>

<style lang="less" scoped>
    .buttons{
        text-align: center;
        .comfirm{
            width: 300px;
        }
    }
</style>