<template>
  <div>
    <v-table ref="table" :table="{data:data,loading:loading,border:disableOperating}" class="bill-list">
      <div :minWidth="75" key="roomNo" title="房号"></div>
      <div title="总费用" :minWidth="80">
        <div slot-scope="scope">
          <span v-if="!isFirst">{{scope.baseRent+scope.practicalElecmeter*scope.elecFee+scope.practicalWatermeter*scope.waterFee}}</span>
          <InputNumber :min="0" v-else v-model="scope.p10"></InputNumber>
        </div>
      </div>
      <div :minWidth="75" key="baseRent" title="租金"></div>
      <div :minWidth="75" key="elecmeterLastmonth" title="上月电"></div>
      <div :minWidth="75" title="本月电">
        <div slot-scope="scope">
          <InputNumber
            :disabled="readonly&&!scope.isEdit"
            :min="0"
            v-model="scope.elecmeterThismonth"
            @on-change="calculateElectricity(scope)"
          ></InputNumber>
        </div>
      </div>
      <div :minWidth="75" title="实用电">
        <div slot-scope="scope">
          <InputNumber
            :min="0"
            @on-change="verificationElectricity(scope)"
            :class="{'bg-warning':scope.electricityWarning}"
            v-model="scope.practicalElecmeter"
            :disabled="readonly&&!scope.isEdit"
          ></InputNumber>
        </div>
      </div>
      <div :minWidth="75" key="elecFee" title="电单价"></div>
      <div :minWidth="75" title="总电费">
        <div slot-scope="scope">{{scope.practicalElecmeter*scope.elecFee}}</div>
      </div>
      <div :minWidth="75" key="watermeterLastmonth" title="上月水"></div>
      <div :minWidth="75" title="本月水">
        <div slot-scope="scope">
          <InputNumber
            :disabled="readonly&&!scope.isEdit"
            :min="0"
            v-model="scope.watermeterThismonth"
            @on-change="calculateWaterFee(scope)"
          ></InputNumber>
        </div>
      </div>
      <div :minWidth="75" title="实用水">
        <div slot-scope="scope">
          <InputNumber
            :min="0"
            @on-change="verificationWaterFee(scope)"
            :class="{'bg-warning':scope.waterFeeWarming}"
            v-model="scope.practicalWatermeter"
            :disabled="readonly&&!scope.isEdit"
          ></InputNumber>
        </div>
      </div>
      <div key="waterFee" :minWidth="75" title="水单价"></div>
      <div :minWidth="75" title="总水费">
        <div slot-scope="scope">{{scope.practicalWatermeter*scope.waterFee}}</div>
      </div>
      <div :minWidth="90" title="其他费用"></div>
      <div title="操作" v-if="!disableOperating" :width="readonly?130:90" fixed="right">
        <div slot-scope="scope">
          <Button type="info" size="small" @click="change(scope)" v-if="!isFirst && !readonly">首月入住</Button>

          <Button type="primary" size="small" @click="change(scope)" v-if="isFirst">取消</Button>

          <Button
            type="warning"
            size="small"
            @click="edit(scope)"
            v-if="readonly && !scope.isEdit"
          >修改</Button>
          <Button type="info" size="small" @click="save(scope)" v-if="readonly && scope.isEdit">保存</Button>
          <Button type="info" size="small" @click="detail(scope)" v-if="readonly">详情</Button>
        </div>
      </div>
    </v-table>
    <Modal  v-model="modal.visible" title="账单详情" :width="660">
      <bill-detail id="123"></bill-detail>
      <div slot="footer">
        <Button type="text" size="large" @click="modal.visible=false">取消</Button>
        <Button @click="print" type="primary">打印</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import billDetail from "@/components/billDetail.vue";
import vTable from "@/components/vTable.vue";
import util from "@/util";
export default {
  components: { vTable,billDetail },
  name: "",
  props: {
    data: {},
    loading: { default: false },
    isFirst: { default: false },
    readonly: { default: false },
    disableOperating:{ default: false },
  },
  data() {
    return {
      modal:{
        visible:false,
        data:{}
      }
    };
  },
  methods: {
    calculateElectricity(item) {
      const { elecmeterLastmonth, elecmeterThismonth } = item;
      if (util.isEmpty(elecmeterThismonth) || util.isEmpty(elecmeterLastmonth)) {
        return;
      }
      item.practicalElecmeter = elecmeterThismonth - elecmeterLastmonth;
      item.electricityWarning = false;
      this.update(item);
    },
    verificationElectricity(item) {
      const { practicalElecmeter, elecmeterThismonth, elecmeterLastmonth } = item;
      if (practicalElecmeter != elecmeterThismonth - elecmeterLastmonth) {
        item.electricityWarning = true;
      } else {
        item.electricityWarning = false;
      }
      this.update(item);
    },
    calculateWaterFee(item) {
      const { watermeterLastmonth, watermeterThismonth } = item;
      if (util.isEmpty(watermeterThismonth) || util.isEmpty(watermeterThismonth)) {
        return;
      }
      item.practicalWatermeter = watermeterThismonth - watermeterLastmonth;
      item.waterFeeWarming = false;
      this.update(item);
    },
    verificationWaterFee(item) {
      const { practicalWatermeter, watermeterThismonth, watermeterLastmonth } = item;
      if (practicalWatermeter != watermeterThismonth - watermeterLastmonth) {
        item.waterFeeWarming = true;
      } else {
        item.waterFeeWarming = false;
      }
      this.update(item);
    },
    rowClassName(row, index) {
      if (row.firstStay) {
        return "first-stay";
      }
      return "nothing";
    },
    change(item) {
      this.$emit("change", item._index);
    },
    update(item) {
      this.$emit("update", item);
    },
    edit(item) {
      this.$emit("edit", item);
    },
    save(item) {
      this.$emit("save", item);
    },
    detail(item) {
      this.modal.visible=true;
    },
    print(){
      window.open("#/bill/print/123")
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
.first-stay {
  opacity: 0.5;
}
.bill-list .ivu-input-number-disabled {
  background: transparent;
  color: #515a6e;
  border: none;
  input {
    color: #515a6e;
    cursor: text;
    background: transparent;
    opacity: 1;
  }
}
</style>