<style lang="less">
   .layout{
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        height: 100%;
        min-height: 100%;
    }
    .layout .ivu-layout{
        min-height: 100%;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-header-bar .ivu-menu{
        float: right; 
        height: 63px; 
        line-height: 64px;
    }
    .layout-header-bar .ivu-menu::after{
        content: inherit;
        background-color: transparent;
    }
    .layout-logo{
        margin: 15px auto;
        height: 40px;
        font-size: 16px;
        color: #FFF;
        line-height: 40px;
        font-weight: bold;
        white-space:nowrap;
        overflow: hidden;
        text-align: center;
        cursor: pointer;
        background: url('../assets/logo.png') 20px center no-repeat;
        background-size: auto 100%;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item{
        position: fixed;
        width: 240px;
        transition: width .2s ease;
    }
     .menu-item.collapsed-menu{
         width: 78px !important;
     }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 120px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .collapsed-menu .ivu-menu .ivu-menu-item{
       font-size: 12px;
       padding: 14px 0 !important;
       text-align: center
   }
   .collapsed-menu i.ivu-menu-submenu-title-icon{
       display: none;
   }
   .collapsed-menu .layout-logo{
       transition: all .2s ease;
       width: 35px;
       text-indent: -1000px;
       background-position: center;
       background-size: 100% auto;
   }
   .user-menu-con{
       position: absolute;
       top: 0;
       right: 20px;
   }
   .zones-menu .ivu-menu-drop-list{
       max-height: 300px;
       overflow-y: auto;
   }
.ivu-layout-sider-zero-width{
    .collapsed-menu{
        display: none;
    }
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" width="240"  breakpoint="md">
                <Menu ref="menu" :active-name="$route.name" theme="dark"  :class="menuitemClasses"  :open-names="openName" >
                    <div class="layout-logo" @click="$router.push({path:'/'})">东客管理后台</div>
                    <div v-for="(item,index) in menu" :key="index">
                        <Submenu v-if="item.children" :name="item.name">
                            <template slot="title">
                                <Icon :type="item.icon" class="menu-icon" />
                                <span class="title">{{item.title}}</span> 
                            </template>
                            <MenuItem v-for="(child,childIndex) in item.children" :key="index+'_'+childIndex" :name="child.name" :to="{name:child.name}" >
                                {{child.title}}
                            </MenuItem>
                        </Submenu>
                        <MenuItem :name="item.name" :to="{name:item.name}" v-else>
                            <Icon :type="item.icon" class="menu-icon"></Icon><span class="title">{{item.title}}</span> 
                        </MenuItem>
                    </div>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                    <!-- <div class="user-menu-con">
                        <span class="name">{{name}}</span>&nbsp;&nbsp;<Button type="text" @click="logout">退出</Button>
                    </div> -->
                    <Menu mode="horizontal" active-name="1" style="float:right;height:63px;line-height:64px;" @on-select="onChangeZones">
                        <Submenu name="user">
                            <template slot="title">
                                <Icon type="md-contact" />
                                {{name}}
                            </template>
                            <MenuItem name="logout"><Icon type="md-power" /> 退出</MenuItem>
                        </Submenu>
                    </Menu>
                </Header>
                <Content :style="{margin: '0 20px 20px', minHeight: '260px',position:'relative'}">
                    <!-- <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem 
                        v-for="item in currentPath" 
                        :to="{name:item.router}" 
                        :key="item.router"
                    >{{ item.name }}</BreadcrumbItem>
                    </Breadcrumb> -->
                    <div> &nbsp;</div>
                    <div>
                        <keep-alive :exclude="exclude">
                            <router-view></router-view>
                        </keep-alive>
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import {routes} from "../router";
    import {defaultMenu} from "../config/menu";
    import util from '../util';
    export default {
        data(){
            return {
                exclude:["index"],
                isCollapsed: false,
                name:"",
                menuActiveName:"",
                openName:[],
            }
        },
        computed: {
            menu(){
                return defaultMenu;
            },
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            currentPath(){
                let menu = this.menu;
                if(!menu){
                    return;
                }
                let path = [{name: "首页",router: "index"}];
                let {name} = this.$route;
                if(name == 'index'){
                    return [];
                }
               menu.some(item=>{
                    if(item.name == name){
                        path.push({name:item.title,router:name})
                    }
                })
                menu.some(i=>{
                    if(i.children){
                        return i.children.some(j=>{
                            if(j.router == name){
                                path.push(j);
                                this.openName[0] = i.router;
                                this.$nextTick(()=>{
                                    this.$refs.menu.updateOpened();
                                })
                                return true;
                            }else if(j.children){
                               return  j.children.some(k=>{
                                    if(k.router == name){
                                        path.push(j);
                                        path.push(k);
                                        return true;
                                    }else{
                                        return false;
                                    }
                                })
                            }else{
                                return false;
                            }
                        })
                    }else{
                        return false;
                    }
                })
                return path;
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            onChangeZones(key){
                switch(key){
                    case 'logout':
                        this.logout()
                    break;
                    case 'user':
                    case 'zones':
                    break;
                    default:
                    break;
                }
            },
            logout(){
               this.$Modal.confirm({
                    title: "提示",
                    content: "是否退出登录？",
                    onOk: () => {
                        // util.clearSession(false);
                        // let url = "logout";
                        util.ajax("/user/logout").then(r => {
                            localStorage.removeItem("token");
                        });
                        this.$router.push({ name: "login" });
                        // location.href = "./#/login";
                        // this.$store.commit("reset");
                    }
                });
            },
        },
        created() {
            const {meta} =  this.$route;
            if(meta && meta.parent){
                this.openName.push(meta.parent)
            }
            // this.name = localStorage.user;
        },
        mounted(){
            if(!localStorage.token){
                this.$router.push({ name: 'login' });
            }
        }
    }
</script>