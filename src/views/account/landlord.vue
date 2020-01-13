<template>
  <div>
    <search-card>
      <Form :label-width="150" class="block" @submit.native.prevent>
        <FormItem label="姓名或手机号：">
          <Input
            v-model="searchData.address"
            placeholder="请输入姓名或手机号"
            class="common-input"
            search
            enter-button="搜索"
            @on-search="search"
          />
        </FormItem>
      </Form>
    </search-card>
    <Divider />
  </div>
  
  
</template>

<script>
import util from "@/util";
import tableMixin from "@/mixin/table.js";
  export default {
    mixins: [tableMixin],
    name: '',
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="" scoped>
  
</style>