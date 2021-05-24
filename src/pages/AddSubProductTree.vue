<template>
  <card class="card" :title="table1.title">
    <div>
      <form @submit.prevent>
         <div class="row">
         <div class="col-md-6">
            <label>Üst Ürün</label>
            <select class="form-control" @change="changeProductTitle($event)">
              <option value="" selected disabled>Choose</option>
              <option
                v-for="jobTitle in table1.products"
               :value="jobTitle.productId"
                :key="jobTitle.productId"
                :selected="jobTitle.productId == table1.user.productID"
                >{{ jobTitle.productName }}</option
              >
            </select>
          </div>
          <div class="col-md-6">
            <label>Alt Ürün</label>
            <select class="form-control" @change="changeSubProductTitle($event)">
              <option value="" selected disabled>Choose</option>
              <option
                v-for="jobTitle in table1.subProduct"
                :value="jobTitle.productId"
                :key="jobTitle.productId"
                :selected="jobTitle.productId == table1.user.subProductID"
                >{{ jobTitle.productName }}</option
              >
            </select>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Miktar"
                      placeholder="Miktar Giriniz"
                      v-model="table1.user.amount">
            </fg-input>
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
        user: {},
        subProduct: []
        ,products: []
      },
      title: String,
      buttonTitle: String
    };
  },
  created() {
    this.titleMethod();
    let test = this.$route.params.id;
    if (test != undefined) {
      axios.get(`https://localhost:44397/api/subproducttree/${test}`).then(res => {
        console.log(res.data);
        this.table1.user = res.data;
      });
    }
    axios.get("https://localhost:44397/api/products/getProductNotSalable").then(res => {
      console.log(res.data);
      this.table1.subProduct = res.data;
    });
    axios.get("https://localhost:44397/api/products/GetProductSalable").then(res => {
      console.log(res.data);
      this.table1.products = res.data;
    });
  },
  methods: {
    async addProduct() {
      let test = this.$route.params.id;
      console.log(test + "test");
      //const response;
      if (test == undefined) {
        const article = this.table1.user;
        console.log(article);
        const response = await axios.post(
          "https://localhost:44397/api/subproducttree",
          article
        );
        alert(response.data);
      } else {
        const article = this.table1.user;
        console.log(article);
        const response = await axios.put(
          "https://localhost:44397/api/subproducttree",
          article
        );
        alert(response.data);
      }
      this.$router.push("/subProductTree");
    },
    changeProductTitle(event) {
      //this.table1.selectedProductType = event.target.options[event.target.options.selectedIndex].value
      this.table1.user.productId =
        event.target.options[event.target.options.selectedIndex].value;
      console.log("selectedProductType" + this.table1.selectedProductType);
    },
    changeSubProductTitle(event) {
      //this.table1.selectedProductType = event.target.options[event.target.options.selectedIndex].value
      this.table1.user.subProductId =
        event.target.options[event.target.options.selectedIndex].value;
      console.log("selectedProductType" + this.table1.selectedProductType);
    },
    titleMethod() {
      let test = this.$route.params.id;
      if (test != undefined) {
        this.table1.title = "Alt Ürün Güncelleme";
        this.table1.buttonTitle = "Alt Ürün Güncelle";
      } else {
        this.table1.title = "Alt Ürün Ekleme";
        this.table1.buttonTitle = "Alt Ürün Ekle";
      }
    }
  }
};
</script>
<style></style>
