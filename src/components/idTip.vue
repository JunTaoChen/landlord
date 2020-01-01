<template>
    <Poptip trigger="hover" :content="id" :width="200" popper-class="phone-tip">
        {{id | idFormat}}
    </Poptip>
</template>
<script>
export default {
    props:["id"]
}
</script>
<style>
.phone-tip {
    text-align: center;
}
</style>


