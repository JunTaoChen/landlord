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
          <Button type="success" size="large">确定</Button>
        </FormItem>
      </Form>
    </search-card>
    <Divider />
    <Card shadow>
      <h4 slot="title">账单列表</h4>
      <v-table :table="{data:data,loading:loading,'row-class-name':rowClassName}" class="bill-list" >
        <div key="id" title="房号"></div>
        <div title="总费用">
         <div slot-scope="scope" :class="{first:scope.firstStay}">
          {{scope.p1+scope.p4*scope.p5+scope.p8*scope.p9}}
         </div>
        </div>
        <div key="p1" title="租金"></div>
        <div title="上月电">
          <div slot-scope="scope">
            <InputNumber v-model="scope.p2" @on-change="calculateElectricity(scope)"></InputNumber>
          </div>
        </div>
        <div title="本月电">
          <div slot-scope="scope">
            <InputNumber v-model="scope.p3" @on-change="calculateElectricity(scope)"></InputNumber>
          </div>
        </div>
        <div title="实用电">
          <div slot-scope="scope">
            <InputNumber
              @on-change="verificationElectricity(scope)"
              :class="{'bg-warning':scope.electricityWarning}"
              v-model="scope.p4"
            ></InputNumber>
          </div>
        </div>
        <div key="p5" title="电单价"></div>
        <div title="总电费">
          <div slot-scope="scope">{{scope.p4*scope.p5}}</div>
        </div>
        <div title="上月水">
          <div slot-scope="scope">
            <InputNumber v-model="scope.p6" @on-change="calculateWaterFee(scope)"></InputNumber>
          </div>
        </div>
        <div title="本月水">
          <div slot-scope="scope">
            <InputNumber v-model="scope.p7" @on-change="calculateWaterFee(scope)"></InputNumber>
          </div>
        </div>
        <div title="实用水">
          <div slot-scope="scope">
            <InputNumber
              @on-change="verificationWaterFee(scope)"
              :class="{'bg-warning':scope.waterFeeWarming}"
              v-model="scope.p8"
            ></InputNumber>
          </div>
        </div>
        <div key="p9" title="电单价"></div>
        <div title="总水费">
          <div slot-scope="scope">{{scope.p8*scope.p9}}</div>
        </div>
        <div title="操作">
          
        </div>
      </v-table>
    </Card>
  </div>
</template>

<script>
import searchCard from "@/components/searchCard.vue";
import addressSelect from "@/components/addressSelect.vue";
import vTable from "@/components/vTable.vue";
import util from "@/util";
export default {
  components: { vTable, addressSelect, searchCard },
  name: "",
  data() {
    return {
      searchData: {
        aid: "",
        date: new Date()
      },
      data: [
        {
          id: "101",
          p1: 1000,
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
          electricityWarning: false,
          waterFeeWarming:false,
          firstStay:true,
        }
      ],
      loading: false
    };
  },
  computed: {
    months() {
      return Array.from({ length: 12 }, (v, k) => k + 1);
    }
  },
  methods: {
    calculateElectricity(item) {
      const { p3, p2 } = item;
      if (util.isEmpty(p2) || util.isEmpty(p3)) {
        return;
      }
      item.p4 = p3 - p2;
      item.electricityWarning = false;
    },
    verificationElectricity(item) {
      const { p3, p2, p4 } = item;
      if (p4 != p3 - p2) {
        item.electricityWarning = true;
      } else {
        item.electricityWarning = false;
      }
    },
    calculateWaterFee(item){
      const { p6, p7 } = item;
      if (util.isEmpty(p6) || util.isEmpty(p7)) {
        return;
      }
      item.p8 = p7 - p6;
      item.waterFeeWarming = false;
    },
    verificationWaterFee(item){
      const { p6, p7, p8 } = item;
      if (p8 != p7 - p6) {
        item.waterFeeWarming = true;
      } else {
        item.waterFeeWarming = false;
      }
    },
    rowClassName(row,index){
      console.log("------------------")
      if(row.firstStay){
        return "first-stay";
      }
      return "nothing"
    }
  }
};
</script>

<style lang="less" >
.bill-list {
  .ivu-input-number {
    max-width: 100%;
  }
}
.bg-warning {
  input {
    background-color: #ffe7ba;
  }
}
.first-stay{
    opacity: 0.5;
}
</style>