<style lang="less">
    .search-card {
        .block{
            .ivu-form-item {
                display: block;
                .ivu-form-item-content{
                    display: block;
                }
                .ivu-input-wrapper,
                .ivu-select{
                    width: 300px;
                }
            }
        }
        .ivu-form-item {
            display: inline-block;
            .ivu-input-wrapper,
            .ivu-select{
                width: 200px;
            }
            .big-select{
                .ivu-input-wrapper{
                    width: 300px;
                }
            }
            .ivu-form-item-content {
                display: inline-block;
                margin: 0 8px 0 0;
            }
            .ivu-input-wrapper{
                margin-right: 0;
            }
        }
        &.no-padding .ivu-card-body {
            padding: 0;
        }
        .ivu-btn{
            margin: 0 5px 0 0;
        }
    }
</style>

<template>
    <Card shadow :class="['search-card',{'no-padding': !open }]">
        <p slot="title">
            查询条件
        </p>
        <a href="javascript:;" slot="extra" @click="open = !open">
            <Icon :type="open ? 'ios-arrow-up' : 'ios-arrow-down'"></Icon>
            {{ open ? '收起' : '展开' }}
        </a>
        <div v-show="open">
            <slot></slot>
        </div>
    </Card>
</template>

<script>
    export default {
        data() {
            return {
                open: true
            };
        }
    };
</script>