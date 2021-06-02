<template>
    <div>
    <div class="text-end mb-2">
      <button class="btn btn-success " @click="addWorkCenter()">
            Work Center Operations Ekle
      </button>
    </div>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div slot="raw-content" class="table-responsive">
            <table class="table">
              <thead>
                <slot name="columns">
                  <th v-for="column in table1.headerTitles" :key="column">
                    {{ column }}
                  </th>
                  <th>Sil</th>
                  <th>Düzenle</th>
                </slot>
              </thead>
              <tbody>
                <tr v-for="(item, index) in table1.workCenterOperations" :key="index">
                  <slot :row="item">
                    <td
                      v-for="(column, index) in table1.columns"
                      :key="index"
                      v-if="hasValue(item, column)"
                    >
                      {{ itemValue(item, column) }}
                    </td>
                    <td>
                      <button
                        @click="removeWorkCenterOperation(item.id)"
                        class="btn btn-danger"
                      >
                        Sil
                      </button>
                    </td>
                    <td>
                      <button
                        @click="updateProduct(item.id)"
                        class="btn btn-primary"
                      >
                        Güncelle
                      </button>
                    </td>
                  </slot>
                </tr>
              </tbody>
            </table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { PaperTable } from "@/components";
import Vue from 'vue'
import Button from "../components/Button.vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import moment from 'moment'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);
const tableColumns = ["id", "workCenterName", "operationName","speed"];
let tableData = [];
const tableHeaderTitles = ["Id",  "Makine Adı", "Operasyon Adı" , "Hız"];
export default {
  components: { Button,BootstrapVue,PaperTable,moment },
  data() {
    return {
      table1: {
        title: "WorkCenter Operations",
        subTitle: "",
        headerTitles: [...tableHeaderTitles]
        ,columns: [...tableColumns]
        ,workCenterOperations: []
      }
    };
  },
  created() {
    axios
      .get("https://localhost:44397/api/workcenteroperations/getwithall")
      .then(res => {
        console.log("test123");
        console.log(res.data);
        this.table1.workCenterOperations = res.data;
        console.log(this.table1.workCenterOperations);
      });
  },
  methods: {
    hasValue(item, column) {
      return item[column] !== "undefined";
    },
    itemValue(item, column) {
      if(column == "orderDate" || column == "deadLine"){
          item[column] = this.format_date(item[column]);
      }
      return item[column];
    },
    format_date(value){
         if (value) {
           return moment(String(value)).format('YYYY-MM-DD')
          }
    },
     addWorkCenter(){
      this.$router.push("/addWorkCenterOperation");
    },
    removeWorkCenterOperation(id) {
      console.log(id + "solda");
      axios.delete("https://localhost:44397/api/workcenteroperations/" + id).then(res => {
        alert(res.data);
       this.$router.go(this.$router.currentRoute)
      });
    },
    updateProduct(id) {
      console.log(id + "solda");
      this.$router.push(`/addWorkCenterOperation/${id}`);
    },
  }
}
</script>