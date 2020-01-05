<template>
  <div>
    <search-card>
      <Form :label-width="150" class="block" @submit.native.prevent>
        <FormItem label="地址：">
          <address-select v-model="searchData.aid"></address-select>
        </FormItem>
        <FormItem label="日期：">
            <DatePicker type="month" v-model="searchData.date"></DatePicker>
        </FormItem>
        <FormItem>
            <Button type="success" size="large" >确定</Button>
        </FormItem>
      </Form>
    </search-card>
    <Divider />
    <Card shadow>
     <h4 slot="title">
        账单列表 
      </h4>
      <v-table
        :table="{data:data,loading:loading}"
      >
        <div key="id" title="房号"></div>
        <div key="id" title="总费用"></div>
        <div key="p1" title="租金"></div>
        <div key="p2" title="上月电"></div>
        <div key="p3" title="本月电"></div>
        <div key="id" title="实用电">
            <div slot-scope="scope">
                <InputNumber v-model="data.p4" :value="scope.p3-scope.p2"></InputNumber>
            </div>
        </div>
      </v-table>
    </Card>
  </div>
</template>

<script>
import searchCard from "@/components/searchCard.vue";
import addressSelect from "@/components/addressSelect.vue";
import vTable from "@/components/vTable.vue";
export default {
  components: { vTable, addressSelect, searchCard },
  name: "",
  data() {
    return {
      searchData: {
        aid: "",
        date:new Date(),
      },
      data: [
        {
            id:"101",
          p1: 1,
          p2: 1,
          p3: 3,
          p4: 4,
          p5: 5,
          p6: 6,
          p7: 7,
          p8: 8,
          p9: 9,
          p10: 10,
          p11: 11,
          p12: 12,
          p13: 13,
          disable: false
        },
      ],
      loading:false,
    };
  },
  computed:{
      months(){
          return Array.from({ length: 12 }, (v, k) => k+1);
      }
  }
};
</script>

<style lang="" scoped>
</style>