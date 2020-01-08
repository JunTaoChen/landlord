<template>
    <div class="print">
        <Row>
            <Col span="4" class="right">地址：</Col>
            <Col span="8">福田区下沙村8坊70号</Col>
            <Col span="4" class="right">门牌号：</Col>
            <Col span="8">101</Col>
        </Row>
        <Row>
            <Col span="4" class="right">地址：</Col>
            <Col span="8">test</Col>
            <Col span="4" class="right">手机号：</Col>
            <Col span="8">188888888888</Col>
        </Row>
        <Row>
            <Col span="4" class="right">身份证号：</Col>
            <Col span="8">1000</Col>
            <Col span="4" class="right">日期：</Col>
            <Col span="8">101</Col>
        </Row>
        <Row>
            <Col span="4" class="right">户型：</Col>
            <Col span="8">3室4厅5厨6卫</Col>
            <Col span="4" class="right">房屋用途：</Col>
            <Col span="8">住宅</Col>
        </Row>
        <Row>
            <Col span="4" class="right">租金：</Col>
            <Col span="8">8</Col>
            <Col span="4" class="right">押金：</Col>
            <Col span="8">9</Col>
        </Row>
        <Row>
            <Col span="4" class="right">管理费：</Col>
            <Col span="8">10</Col>
            <Col span="4" class="right">网费：</Col>
            <Col span="8">11</Col>
        </Row>
        <Row>
            <Col span="4" class="right">水表底数：</Col>
            <Col span="8">11</Col>
            <Col span="4" class="right">电表底数：</Col>
            <Col span="8">11</Col>
        </Row>
         <Row>
            <Col span="4" class="right">水费单价：</Col>
            <Col span="8">11</Col>
            <Col span="4" class="right">电表单价：</Col>
            <Col span="8">11</Col>
        </Row>
        <Button v-show="isShowPrint" @click="print">打印</Button>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                isShowPrint:true,
            }
        },
        methods:{
            print(){
                this.isShowPrint = false;
                this.$nextTick(()=>{
                    window.print();
                });
                
            }
        }
    }
</script>

<style lang="less" scoped>
    .print{
        width: 210mm;
        margin: 0 auto;
        padding: 10mm 0 0;
        font-size: 18px;
    }
    .right{text-align: right}
</style>