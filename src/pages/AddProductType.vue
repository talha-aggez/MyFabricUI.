<template>
  <card class="card" :title= table1.title>
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-12">
            <fg-input type="text"
                      label="Ürün Tipi Adı"
                      placeholder="Ürün Tipi Adı"
                      v-model="table1.user.name">
            </fg-input>
          </div>  
        </div>
        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="addProductType">
            {{table1.buttonTitle}}
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
      

    </div>
  </card>
</template>
<script>
import axios from "axios";
export default {

  data(){
    return {
      table1: {
      user: {
        
      }
      }
      ,title: String
      ,buttonTitle : String
      };
  },
  created () {
          this.titleMethod();
          let test = this.$route.params.id;
          if(test != undefined){
            axios.get(`https://localhost:44397/api/producttype/${test}`).then(res => {
              console.log(res.data);
              this.table1.user = res.data;
            });
          }  
  },
  methods: {
    async addProductType() {
        let test = this.$route.params.id;
        console.log(test + "test");
        //const response;
        if(test == undefined){
          const article = this.table1.user;
          console.log(article);
          const response = await axios.post("https://localhost:44397/api/producttype", article);
          alert(response.data);
        }
        else{
          const article = this.table1.user;
          console.log(article);
          const response = await axios.put("https://localhost:44397/api/producttype", article);
          alert(response.data);
        }
        this.$router.push("/productType");
    },
    titleMethod(){
      let test = this.$route.params.id;
      if(test != undefined){
        this.table1.title = "Ürün Tipi Güncelleme"
        this.table1.buttonTitle = "Ürün Tipi Güncelle"
      }
      else{
        this.table1.title = "Ürün Tipi Ekleme"
        this.table1.buttonTitle = "Ürün Tipi Ekle"
      }
    }
  }
};
</script>
<style>
</style>
