<template>
    <Poptip trigger="hover" :content="phone" :width="100" popper-class="phone-tip">
        {{phone | phoneFormat}}
    </Poptip>
</template>
<script>
export default {
    props:["phone"]
}
</script>
<style>
.phone-tip {
    text-align: center;
}
</style>


