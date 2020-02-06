<template>
  <div>
    <v-table ref="table" :table="{data:data,loading:loading,border:disableOperating}" class="bill-list">
      <div :minWidth="commonMinWidth" key="roomNo" title="房号"></div>
      <div title="总费用" :minWidth="80">
        <div slot-scope="scope">
          <span v-if="!isFirst">{{scope.rentFee}}</span>
          <InputNumber :min="0" v-else v-model="scope.rentFee" @on-change="rentFeeChange(scope)"></InputNumber>
        </div>
      </div>
      <div :minWidth="commonMinWidth" key="baseRent" title="租金"></div>
      <div :minWidth="commonMinWidth" key="elecmeterLastmonth" title="上月电"></div>
      <div :minWidth="commonMinWidth" title="本月电">
        <div slot-scope="scope">
          <InputNumber :disabled="readonly&&!scope.isEdit" :min="0" v-model="scope.elecmeterThismonth" @on-change="calculateElectricity(scope)"></InputNumber>
        </div>
      </div>
      <div :minWidth="commonMinWidth" title="实用电">
        <div slot-scope="scope">
          <InputNumber :min="0" @on-change="verificationElectricity(scope)" :class="{'bg-warning':scope.electricityWarning}" v-model="scope.practicalElecmeter" :disabled="readonly&&!scope.isEdit"></InputNumber>
        </div>
      </div>
      <div :minWidth="commonMinWidth" key="elecFee" title="电单价"></div>
      <div :minWidth="commonMinWidth" title="总电费">
        <div slot-scope="scope">{{scope.practicalElecmeter*scope.elecFee}}</div>
      </div>
      <div :minWidth="commonMinWidth" key="watermeterLastmonth" title="上月水"></div>
      <div :minWidth="commonMinWidth" title="本月水">
        <div slot-scope="scope">
          <InputNumber :disabled="readonly&&!scope.isEdit" :min="0" v-model="scope.watermeterThismonth" @on-change="calculateWaterFee(scope)"></InputNumber>
        </div>
      </div>
      <div :minWidth="commonMinWidth" title="实用水">
        <div slot-scope="scope">
          <InputNumber :min="0" @on-change="verificationWaterFee(scope)" :class="{'bg-warning':scope.waterFeeWarming}" v-model="scope.practicalWatermeter" :disabled="readonly&&!scope.isEdit"></InputNumber>
        </div>
      </div>
      <div key="waterFee" :minWidth="commonMinWidth" title="水单价"></div>
      <div :minWidth="commonMinWidth" title="总水费">
        <div slot-scope="scope">{{scope.practicalWatermeter*scope.waterFee}}</div>
      </div>
      <div v-if="readonly" :minWidth="commonMinWidth+10" title="出租状态">
        <div slot-scope="scope">{{getStatus(scope.status)}}</div>
      </div>
      <div :minWidth="90" title="其他费用">
        <template slot-scope="scope">
          <Tooltip transfer :content="`${scope.netFee}(网费)+${scope.manageFee}(管理费)+${scope.hotWaterFee}(热水费)+${scope.gasFee}(燃气费)`" :max-width="300">
            {{scope.gasFee+scope.hotWaterFee+scope.manageFee+scope.netFee}} <Icon type="ios-help-circle-outline" size="14" />
          </Tooltip>
        </template>
      </div>

      <div title="操作" v-if="!disableOperating" :width="readonly?130:90" >
        <div slot-scope="scope">
          <Button type="info" size="small" @click="change(scope)" v-if="!isFirst && !readonly">首月入住</Button>

          <Button type="primary" size="small" @click="change(scope)" v-if="isFirst">取消</Button>

          <Button type="warning" size="small" @click="edit(scope)" v-if="readonly && !scope.isEdit">修改</Button>
          <Button type="primary" size="small" @click="save(scope)" v-if="readonly && scope.isEdit">保存</Button>
          <Button type="info" size="small" @click="detail(scope)" v-if="readonly">详情</Button>
        </div>
      </div>
    </v-table>
    <Modal v-model="modal.visible" title="账单详情" :width="660">
      <bill-detail :data="modal.data"></bill-detail>
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
import {RENT_STATUS} from "@/util/constant";
export default {
  components: { vTable, billDetail },
  name: "",
  props: {
    data: {},
    loading: { default: false },
    isFirst: { default: false },
    readonly: { default: false },
    disableOperating: { default: false },
    commonMinWidth:{default: 75 },
  },
  data() {
    return {
      modal: {
        visible: false,
        data: {},
      },
    };
  },
  methods: {
    getRentFee:util.getRentFee,
    getStatus(status){
      return RENT_STATUS.find(i=>i.key==status).value;
    },
    calculateElectricity(item) {
      const { elecmeterLastmonth, elecmeterThismonth } = item;
      if (
        util.isEmpty(elecmeterThismonth) ||
        util.isEmpty(elecmeterLastmonth)
      ) {
        return;
      }
      item.practicalElecmeter = elecmeterThismonth - elecmeterLastmonth;
      item.electricityWarning = false;
      item.rentFee =util.getRentFee(item);
      this.update(item);
    },
    verificationElectricity(item) {
      const {
        practicalElecmeter,
        elecmeterThismonth,
        elecmeterLastmonth
      } = item;
      if (practicalElecmeter != elecmeterThismonth - elecmeterLastmonth) {
        item.electricityWarning = true;
      } else {
        item.electricityWarning = false;
      }
      item.rentFee =util.getRentFee(item);
      this.update(item);
    },
    calculateWaterFee(item) {
      const { watermeterLastmonth, watermeterThismonth } = item;
      if (
        util.isEmpty(watermeterThismonth) ||
        util.isEmpty(watermeterThismonth)
      ) {
        return;
      }
      item.practicalWatermeter = watermeterThismonth - watermeterLastmonth;
      item.waterFeeWarming = false;
      item.rentFee =util.getRentFee(item);
      this.update(item);
    },
    verificationWaterFee(item) {
      const {
        practicalWatermeter,
        watermeterThismonth,
        watermeterLastmonth
      } = item;
      if (practicalWatermeter != watermeterThismonth - watermeterLastmonth) {
        item.waterFeeWarming = true;
      } else {
        item.waterFeeWarming = false;
      }
      item.rentFee =util.getRentFee(item);
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
      this.modal.data = item;
      // this.modal.id = item.id;
      this.modal.visible = true;
    },
    print() {
      sessionStorage[this.modal.data.id] = JSON.stringify(this.modal.data);
      window.open("#/bill/print/"+this.modal.data.id);
    },
    rentFeeChange(item){
      this.update(item);
    }
  }
};
</script>

<style lang="less" >
.bill-list {
  .ivu-input-number {
    max-width: 100%;
  }
  .ivu-btn-small{
    margin: 0 5px 0 0;
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