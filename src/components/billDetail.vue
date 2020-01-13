<template>
    <Form :label-width="120"> 
        <Row>
          <Col :span="12">
            <FormItem label="地址：">福田下沙村十一巷7坊211栋301</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="租金：">2000元</FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="上个月水表数：">100</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="上个月电表数：">166</FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="当月水表数：">120</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="当月电表数：">296</FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="水表总数：">20</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="电表总数：">130</FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="水费单价：">8元/方</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="电费单价：">1.5元度</FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="管理费：">200元</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="网费：">100元</FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="合同到期日：">30天</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="9月份需缴纳：">3235元（已交租）</FormItem>
          </Col>
        </Row>
      </Form>
</template>

<script>
    export default {
        props:{
            id:"",
        },
        name: '',
        data() {
            return {
                
            }
        },
    }
</script>

<style lang="less" scoped>
    
</style>