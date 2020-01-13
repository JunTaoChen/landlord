<template>
    <Button v-show="isShowPrint" @click="print">打印</Button>
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
        },
    }
</script>

<style lang="" scoped>
    
</style>