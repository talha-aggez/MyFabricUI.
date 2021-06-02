<template>
  <card class="card" :title="table1.title">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-6">
            <fg-input
              type="number"
              label="Hız "
              placeholder="-"
              v-model="table1.workCenterOperation.speed"
            >
            </fg-input>
          </div>
          <div class="col-md-6">
            <label>Work Center Operation Türü</label>
            <select class="form-control" @change="changeWorkCenterOperation($event)">
              <option value="" selected disabled>Choose</option>
              <option
                v-for="jobTitle in table1.workCenterType"
                :value="jobTitle.id"
                :key="jobTitle.id"
                :selected="jobTitle.id == table1.workCenterOperation.workCenterID"
                >{{ jobTitle.workCenterName }}</option
              >
            </select>
          </div>
          <div class="col-md-6">
            <label>Operasyon Türü</label>
            <select class="form-control" @change="changeJobTitle($event)">
              <option value="" selected disabled>Choose</option>
              <option
                v-for="jobTitle in table1.operationType"
                :value="jobTitle.id"
                :key="jobTitle.id"
                :selected="jobTitle.id == table1.workCenterOperation.operationID"
                >{{ jobTitle.name }}</option
              >
            </select>
          </div>
        <div class="text-center">
          <p-button type="info" round @click.native.prevent="addProduct">
            {{ table1.buttonTitle }}
          </p-button>
        </div>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      table1: {
        workCenterOperation: {},
        operationType: []
        ,workCenterType: []

      },
      title: String,
      buttonTitle: String
    };
  },
  created() {
    this.titleMethod();
    let test = this.$route.params.id;
    if (test != undefined) {
      axios.get(`https://localhost:44397/api/workcenteroperations/${test}`).then(res => {
        console.log(res.data);
        this.table1.workCenterOperation = res.data;
      });
    }
    axios.get("https://localhost:44397/api/operation").then(res => {
      console.log(res.data);
      this.table1.operationType = res.data;
    });
      axios.get("https://localhost:44397/api/workcenters").then(res => {
      console.log("deneme");
      console.log(res.data);
      this.table1.workCenterType = res.data;
    });
  },
  methods: {
    async addProduct() {
      let test = this.$route.params.id;
      console.log(test + "test");
      //const response;
      if (test == undefined) {
        const article = this.table1.workCenterOperation;
        console.log(article);
        const response = await axios.post(
          "https://localhost:44397/api/workcenteroperations",
          article
        );
        alert(response.data);
      } else {
        const article = this.table1.workCenterOperation;
        console.log(article);
        const response = await axios.put(
          "https://localhost:44397/api/workcenteroperations",
          article
        );
        alert(response.data);
      }
      this.$router.push("/workCenterOperation");
    },
    changeJobTitle(event) {
      //this.table1.selectedProductType = event.target.options[event.target.options.selectedIndex].value
      this.table1.workCenterOperation.operationID =
        event.target.options[event.target.options.selectedIndex].value;
    //   console.log("selectedProductType" + this.table1.selectedProductType);
    },
    changeWorkCenterOperation(event) {
      //this.table1.selectedProductType = event.target.options[event.target.options.selectedIndex].value
      this.table1.workCenterOperation.workcenterID =
        event.target.options[event.target.options.selectedIndex].value;
    //   console.log("selectedProductType" + this.table1.selectedProductType);
    },
    titleMethod() {
      let test = this.$route.params.id;
      if (test != undefined) {
        this.table1.title = "Work Center Operations Güncelleme";
        this.table1.buttonTitle = "Work Center Operations Güncelle";
      } else {
        this.table1.title = "Work Center Operations  Ekleme";
        this.table1.buttonTitle = "Work Center Operations  Ekle";
      }
    }
  }
};
</script>
<style></style>
