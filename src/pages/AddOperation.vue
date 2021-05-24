<template>
  <card class="card" :title= table1.title>
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Operasyon Adı"
                      placeholder="Operasyon Adı"
                      v-model="table1.user.name">
            </fg-input>
          </div>
          <div class="col-md-6">
            <label >Ürün Türü</label>
             <select  class="form-control" @change="changeJobTitle($event)">
                <option value="" selected disabled>Seçiniz</option>
                <option v-for="jobTitle in table1.productType" :value="jobTitle.id" :key="jobTitle.id" :selected="jobTitle.id == table1.user.productTypeID">{{ jobTitle.name }}</option>
              </select>
          </div>
          <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="addOperation">
            {{table1.buttonTitle}}
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
        user: {},
        productType: [],
      },
      title: String,
      buttonTitle: String,
    };
  },
  created() {
    this.titleMethod();
    let test = this.$route.params.id;
    if (test != undefined) {
      axios.get(`https://localhost:44397/api/operation/${test}`).then((res) => {
        console.log(res.data);
        this.table1.user = res.data;
      });
    }
    axios.get("https://localhost:44397/api/producttype").then((res) => {
      console.log(res.data);
      this.table1.productType = res.data;
    });
  },
  methods: {
    async addOperation() {
      let test = this.$route.params.id;
      console.log(test + "test");
      //const response;
      if (test == undefined) {
        const article = this.table1.user;
        console.log(article);
        const response = await axios.post(
          "https://localhost:44397/api/operation",
          article
        );
        alert(response.data);
      } else {
        const article = this.table1.user;
        console.log(article);
        const response = await axios.put(
          "https://localhost:44397/api/operation",
          article
        );
        alert(response.data);
      }
      this.$router.push("/operation");
    },
    changeJobTitle(event) {
      //this.table1.selectedProductType = event.target.options[event.target.options.selectedIndex].value
      this.table1.user.productTypeId =
        event.target.options[event.target.options.selectedIndex].value;
      console.log("selectedProductType" + this.table1.selectedProductType);
    },
    titleMethod() {
      let test = this.$route.params.id;
      if (test != undefined) {
        this.table1.title = "Operasyon Güncelleme";
        this.table1.buttonTitle = "Operasyon Güncelle";
      } else {
        this.table1.title = "Operasyon Ekleme";
        this.table1.buttonTitle = "Operasyon Ekle";
      }
    },
  },
};
</script>
<style>
</style>
