<template>
    <div class="print">
        <bill-detail :id="id"></bill-detail>
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
                id:"",
            }
        },
        created(){
            this.id = this.$route.params.id;
        }
    }
</script>

<style lang="" scoped>
    
</style>