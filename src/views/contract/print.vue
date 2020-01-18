<template>
    <div class="print">
        <Row>
            <Col span="4" class="right">地址：</Col>
            <Col span="8">{{address}}</Col>
            <Col span="4" class="right">房间：</Col>
            <Col span="8">{{room}}</Col>
        </Row>
        <Row>
            <Col span="4" class="right">姓名：</Col>
            <Col span="8">{{data.name}}</Col>
            <Col span="4" class="right">手机号：</Col>
            <Col span="8">{{data.mobile}}</Col>
        </Row>
        <Row>
            <Col span="4" class="right">身份证号：</Col>
            <Col span="8">{{data.idCardNo}}</Col>
            <Col span="4" class="right">日期：</Col>
            <Col span="8">{{data.checkinDate}}~{{data.dueDate}}</Col>
        </Row>
        <Row>
            <Col span="4" class="right">户型：</Col>
            <Col span="8">{{data.houseType}}</Col>
            <Col span="4" class="right">房屋用途：</Col>
            <Col span="8">{{type}}</Col>
        </Row>
        <Row>
            <Col span="4" class="right">租金：</Col>
            <Col span="8">{{data.baseRent}}</Col>
            <Col span="4" class="right">押金：</Col>
            <Col span="8">{{data.deposit}}</Col>
        </Row>
        <Row>
            <Col span="4" class="right">管理费：</Col>
            <Col span="8">{{data.manageFee}}</Col>
            <Col span="4" class="right">网费：</Col>
            <Col span="8">{{data.netFee}}</Col>
        </Row>
        <Row>
            <Col span="4" class="right">水表底数：</Col>
            <Col span="8">{{data.watermeterBase}}</Col>
            <Col span="4" class="right">电表底数：</Col>
            <Col span="8">{{data.elecmeterBase}}</Col>
        </Row>
        <Row>
            <Col span="4" class="right">水费单价：</Col>
            <Col span="8">{{data.waterFee}}</Col>
            <Col span="4" class="right">电表单价：</Col>
            <Col span="8">{{data.elecFee}}</Col>
        </Row>
         <Row>
            <Col span="4" class="right">燃气费：</Col>
            <Col span="8">{{data.gasFee}}</Col>
            <Col span="4" class="right">热水费：</Col>
            <Col span="8">{{data.hotWaterFee}}</Col>
        </Row>
        <Row>
            <Col span="4" class="right">每月交租日：</Col>
            <Col span="8">{{data.rentDay}}日</Col>
            <Col span="4" class="right">首次租金：</Col>
            <Col span="8">{{data.firstRent}}</Col>
        </Row>
         <Row>
            <Col span="4" class="right">首次账单日期：</Col>
            <Col span="8">{{data.firstRentDate}}</Col>
        </Row>
        <print-button></print-button>
    </div>
</template>

<script>
    import printButton from "@/components/printButton.vue";
    import {CONTRACT_TYPE} from '@/util/constant.js'
    import util from "@/util";
    export default {
         components:{
            printButton
        },
        name: '',
        data() {
            return {
                data:{},
                address:"",
                room:"",
                type:"",
            }
        },
        created(){
            const id = this.$route.params.id;
            const {address,room}  = this.$route.query;
            this.address = address;
            this.room = room;
            util.ajax("admin/contract",{params:{roomId:id}}).then(({code,data})=>{
                if(code == 0){
                    this.data = data;
                    this.type = CONTRACT_TYPE.find(item=>item.key==data.type).value;
                }
            })
        }
    }
</script>

<style lang="less" scoped>
    .right{text-align: right}
</style>