<template>
    <div class="print">
        <bill-detail :data="data"></bill-detail>
        <print-button></print-button>
    </div>
    
</template>

<script>
import billDetail from "@/components/billDetail.vue";
import printButton from "@/components/printButton.vue";
    export default {
        components:{
            billDetail,
            printButton
        },
        name: '',
        data() {
            return {
                data:{},
            }
        },
        created(){
            const {id} = this.$route.params;
            const data = sessionStorage[id];
            if(data){
                this.data = JSON.parse(data);
            }
        }
    }
</script>

<style lang="" scoped>
    
</style>