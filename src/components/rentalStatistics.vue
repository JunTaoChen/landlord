<template>
  <Row class="info-card" :gutter="20">
    <Col :span="12">
      <Card :padding="0" shadow>
        <div class="left" style="background:#ff9900">
          <Icon type="ios-log-in" />
        </div>
        <div class="right">
          <ICountUp :startVal="0" :endVal="rentedNum" />
          <p>已出租</p>
        </div>
      </Card>
    </Col>
    <Col :span="12">
      <Card :padding="0" shadow>
        <div class="left" style="background:#2d8cf0">
          <Icon type="ios-log-out" />
        </div>
        <div class="right">
          <ICountUp :startVal="0" :endVal="unRentedNum" />
          <p>未出租</p>
        </div>
      </Card>
    </Col>
  </Row>
</template>

<script>
import util from "@/util";
import ICountUp from "vue-countup-v2";
export default {
  components: {
    ICountUp
  },
  name: "",
  props: ["id"],
  data() {
    return {
      rentedNum: 0,
      unRentedNum: 0
    };
  },
  methods: {
    getData() {
      const id = this.id;
      let url = "admin/building/summary";
      const data = { };
      if (id) {
        data.buildingId = id;
      } else if (id == "") {
        return;
      }
      util.ajax(url,{params:data}).then(({ code, data }) => {
        if (code == 0) {
          this.rentedNum = data.rentedNum;
          this.unRentedNum = data.unRentedNum;
        }
      });
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
    id: function(val) {
      this.getData();
    }
  }
};
</script>