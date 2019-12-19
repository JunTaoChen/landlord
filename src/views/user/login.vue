<template>
    <div class="login">
        <Card class="card">
            <h3 class="title">东客管理后台</h3>
            <Form ref="loginForm" :model="form" :rules="rules">
                <FormItem prop="username">
                    <Input prefix="ios-person" v-model="form.username" placeholder="请输入用户名" />
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" prefix="md-lock" v-model="form.password" placeholder="请输入密码"  @on-keyup="keyUp" />
                </FormItem>
                <FormItem v-show="isShowVerificationCode" prop="code">
                    <Input  v-model="form.captcha" placeholder="请输入验证码" class="verification-code" @on-keyup="keyUp" >
                        <img  slot="append" :src="imgSrc"  @click="changeImg">
                    </Input>
                </FormItem>
                <FormItem>
                    <Button @click="handleSubmit"  long>登录</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
import util from '@/util'
export default {
    data(){
        return {
            isShowVerificationCode:false,
            imgSrc:"",
            imgToken:"",
            form:{
                username:"12345678910",
                password:"666666",
                captcha: ""
            },
            rules: {
                username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
                password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
                code: []
            },
        };
    },
    methods:{
        handleSubmit() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    const {username,password} = this.form;
                    let data = {mobile:username,password};
                    // if(this.isShowVerificationCode){
                    //     data.token = this.imgToken;
                    // }else{
                    //     delete data.captcha;
                    // }
                    let url = "user/login";
                    util.ajax.post(url, data).then(({code,data})=>{
                            if(code === 0){
                                localStorage.token =  data.token;
                               this.$router.push({ name: "account" });
                            }else{
                                // if(code === 1348 || code === 1345){
                                //     this.imgToken = data;
                                //     this.showCode();
                                // }
                                
                                // this.changeImg();
                            }
                        });
                    }
                });
            },
            showCode() {
                this.isShowVerificationCode = true;
                this.rules.code = [
                    { required: true, message: "验证码不能为空", trigger: "blur" }
                ];
            },
            changeImg(){
                this.imgSrc = util.baseURL+"captcha?token="+this.imgToken+"&_="+util.generateMixed(10);
            },
            keyUp(e){
                if(e.key === "Enter"){
                    this.handleSubmit();
                }
            }
    }
}
</script>

<style lang="less">
.login{
    background: url('../../assets/login-bg.jpg') no-repeat center center ;
    background-size: 100% 100%;
    height: 100%;
    display:flex;
    box-align: center;
    align-items: center;
    justify-content: space-around;
    .text{
        width: 50%;
    }
    .card{
        margin: auto;
        width: 360px;
        padding: 20px 30px 0px 30px;
        border-radius: 10px;
    }
    .ivu-btn{
        background: #1c6194;
        color: #FFF;
        &:hover{
           background:  lighten(#1c6194, 5%);
        }
    }
    .title{
        font-size: 26px;
        color: #666;
        margin: 0 auto 20px auto;
        text-align: center;
        font-weight: 700;
    }
}
</style>

