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
          <ICountUp :startVal="0" :endVal="unRentNum" />
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
      unRentNum: 0
    };
  },
  methods: {
    getData() {
      const id = this.id;
      let url = "admin/building/page";
      const data = { pageSize: 1 };
      if (id) {
        url = "admin/room/list";
        data.buildingId = id;
      } else if (id == "") {
        return;
      }
      util.ajax.post(url, data).then(({ code, data }) => {
        if (code == 0) {
          this.rentedNum = data.rentedNum;
          this.unRentNum = data.unRentNum?data.unRentNum:data.unRentedNum;
        }
      });
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
    id: function(val) {
      console.log(val, this.id);
      this.getData();
    }
  }
};
</script>