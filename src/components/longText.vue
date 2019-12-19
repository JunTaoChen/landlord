<template>
    <Poptip v-show="text!=''" trigger="hover" word-wrap :width="400"  :content="text" class="long-tip" placement="top">
        {{text}}
    </Poptip>
</template>
<script>
export default {
    props:["text"]
}
</script>
<style lang="less">
.long-tip{
    width:100%;
    .ivu-poptip-rel{
        text-overflow:ellipsis;
        overflow:hidden;
        white-space:nowrap;
         width:100%;
    }
    
}
</style>


