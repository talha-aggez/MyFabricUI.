<template>
  <card class="card" :title="table1.title">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Çalışma Merkezi Adı"
              placeholder="Çalışma Merkezi Adı"
              v-model="table1.user.workCenterName"
            >
            </fg-input>
          </div>
          <div class="col-md-6">
            
          </div>
          <div class="col-md-6">
          <div>
            <input
              type="checkbox"
              v-model="table1.user.active"
              style="font-size:24px"
            />
           Aktif mi ?
          </div>
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
      },
      title: String,
      buttonTitle: String
    };
  },
  created() {
    this.titleMethod();
    let test = this.$route.params.id;
    if (test != undefined) {
      axios.get(`https://localhost:44397/api/workcenters/${test}`).then(res => {
        console.log(res.data);
        this.table1.user = res.data;
      });
    }
    // axios.get("https://localhost:44397/api/producttype").then(res => {
    //   console.log(res.data);
    //   this.table1.productType = res.data;
    // });
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
          "https://localhost:44397/api/workcenters",
          article
        );
        alert(response.data);
      } else {
        const article = this.table1.user;
        console.log(article);
        const response = await axios.put(
          "https://localhost:44397/api/workcenters",
          article
        );
        alert(response.data);
      }
      this.$router.push("/workCenterList");
    },
    titleMethod() {
      let test = this.$route.params.id;
      if (test != undefined) {
        this.table1.title = "Çalışma Merkezi Güncelleme";
        this.table1.buttonTitle = "Çalışma Merkezi Güncelle";
      } else {
        this.table1.title = "Çalışma Merkezi Ekleme";
        this.table1.buttonTitle = "Çalışma Merkezi Ekle";
      }
    }
  }
};
</script>
<style></style>
