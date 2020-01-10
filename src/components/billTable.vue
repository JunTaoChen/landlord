<template>
  <v-table ref="table" :table="{data:data,loading:loading}" class="bill-list">
    <div key="id" title="房号"></div>
    <div title="总费用" :width="80">
      <div slot-scope="scope">
        <span v-if="!isFirst">{{scope.p1+scope.p4*scope.p5+scope.p8*scope.p9}}</span>
        <InputNumber :min="0" v-else v-model="scope.p10"></InputNumber>
      </div>
    </div>
    <div key="p1" title="租金"></div>
    <div title="上月电">
      <div slot-scope="scope">
        <InputNumber
          :disabled="readonly&&!scope.isEdit"
          :min="0"
          v-model="scope.p2"
          @on-change="calculateElectricity(scope)"
        ></InputNumber>
      </div>
    </div>
    <div title="本月电">
      <div slot-scope="scope">
        <InputNumber
          :disabled="readonly&&!scope.isEdit"
          :min="0"
          v-model="scope.p3"
          @on-change="calculateElectricity(scope)"
        ></InputNumber>
      </div>
    </div>
    <div title="实用电">
      <div slot-scope="scope">
        <InputNumber
          :min="0"
          @on-change="verificationElectricity(scope)"
          :class="{'bg-warning':scope.electricityWarning}"
          v-model="scope.p4"
          :disabled="readonly&&!scope.isEdit"
        ></InputNumber>
      </div>
    </div>
    <div key="p5" title="电单价"></div>
    <div title="总电费">
      <div slot-scope="scope">{{scope.p4*scope.p5}}</div>
    </div>
    <div title="上月水">
      <div slot-scope="scope">
        <InputNumber
          :disabled="readonly&&!scope.isEdit"
          :min="0"
          v-model="scope.p6"
          @on-change="calculateWaterFee(scope)"
        ></InputNumber>
      </div>
    </div>
    <div title="本月水">
      <div slot-scope="scope">
        <InputNumber
          :disabled="readonly&&!scope.isEdit"
          :min="0"
          v-model="scope.p7"
          @on-change="calculateWaterFee(scope)"
        ></InputNumber>
      </div>
    </div>
    <div title="实用水">
      <div slot-scope="scope">
        <InputNumber
          :min="0"
          @on-change="verificationWaterFee(scope)"
          :class="{'bg-warning':scope.waterFeeWarming}"
          v-model="scope.p8"
          :disabled="readonly&&!scope.isEdit"
        ></InputNumber>
      </div>
    </div>
    <div key="p9" title="电单价"></div>
    <div title="总水费">
      <div slot-scope="scope">{{scope.p8*scope.p9}}</div>
    </div>
    <div title="操作" :width="90">
      <div slot-scope="scope">
        <Button type="info" size="small" @click="change(scope)" v-if="!isFirst && !readonly">首月入住</Button>
        <Button type="primary" size="small" @click="change(scope)" v-if="isFirst">取消</Button>
        <Button type="warning" size="small" @click="edit(scope)" v-if="readonly && !scope.isEdit">修改</Button>
        <Button type="info" size="small" @click="save(scope)" v-if="readonly && scope.isEdit">保存</Button>
      </div>
    </div>
  </v-table>
</template>

<script>
import vTable from "@/components/vTable.vue";
import util from "@/util";
export default {
  components: { vTable },
  name: "",
  props: {
    data: {},
    loading: { default: false },
    isFirst: { default: false },
    readonly: { default: false }
  },
  data() {
    return {};
  },
  methods: {
    calculateElectricity(item) {
      const { p3, p2 } = item;
      if (util.isEmpty(p2) || util.isEmpty(p3)) {
        return;
      }
      item.p4 = p3 - p2;
      item.electricityWarning = false;
      this.update(item);
    },
    verificationElectricity(item) {
      const { p3, p2, p4 } = item;
      if (p4 != p3 - p2) {
        item.electricityWarning = true;
      } else {
        item.electricityWarning = false;
      }
      this.update(item);
    },
    calculateWaterFee(item) {
      const { p6, p7 } = item;
      if (util.isEmpty(p6) || util.isEmpty(p7)) {
        return;
      }
      item.p8 = p7 - p6;
      item.waterFeeWarming = false;
      this.update(item);
    },
    verificationWaterFee(item) {
      const { p6, p7, p8 } = item;
      if (p8 != p7 - p6) {
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
    edit(item){
      this.$emit("edit", item);
    },
    save(item){
      this.$emit("save", item);
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
.bill-list .ivu-input-number-disabled{
  background: transparent;
  color: #515a6e;
  border: none;
  input{
    color: #515a6e;
    cursor: text;
    background: transparent;
    opacity: 1;
  }
}
</style>