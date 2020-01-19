<template>
    <Form :label-width="120"> 
        <Row>
          <Col :span="12">
            <FormItem label="地址：">{{data.roomAddress}}</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="租金：">{{data.baseRent}}元</FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="上个月水表数：">{{data.watermeterLastmonth}}</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="上个月电表数：">{{data.elecmeterLastmonth}}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="当月水表数：">{{data.watermeterThismonth}}</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="当月电表数：">{{data.elecmeterThismonth}}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="水表总数：">{{data.practicalWatermeter}}</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="电表总数：">{{data.practicalElecmeter}}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="水费单价：">{{data.waterFee}}元/方</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="电费单价：">{{data.elecFee}}元度</FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="管理费：">{{data.manageFee}}元</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="网费：">{{data.netFee}}元</FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="燃气费：">{{data.gasFee}}元</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="热水费：">{{data.hotWaterFee}}元</FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="每月交租日：">{{data.rentDay}}天</FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="需缴纳：">{{data.rentFee}}元（{{status}}）</FormItem>
          </Col>
        </Row>
      </Form>
</template>

<script>
import util from "@/util";
const RENT_STATUS = [{ key: 0, value: "未交租" }, { key: 1, value: "已交租" }, { key: 2, value: "未交租" }, { key: 3, value: "账单未填写" }, { key: 4, value: "待确认" }]
    export default {
        props:["data"],
        name: '',
        computed:{
          //0和2：未交租，1，已交租，3账单未填写，4：待确认
          status(){
            if(this.data.status){
              return RENT_STATUS.find(item=>item.key == this.data.status).value;
            }
            return "";
          }
        }
        // data() {
        //     return {
        //         data:{}
        //     }
        // },
        // watch:{
        //   id(value){
        //     if(value){
        //       util.ajax("admin/rentinfo",{params:{id:value}}).then(({code,data})=>{
        //         if(code == 0){
        //           this.data = data;
        //         }
        //       })
        //     }
        //   }
        // }
    }
</script>

<style lang="less" scoped>
    
</style>