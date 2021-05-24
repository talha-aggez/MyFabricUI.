<div class="text-center">
          
</div>
<template>
  <div>
    <div class="text-end mb-2">
      <button class="btn btn-success " @click="addProduct()">
        Alt Ürün Ekle
      </button>
    </div>
    <div class="row">
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div slot="raw-content" class="table-responsive">
            <table class="table">
              <thead>
                <slot name="columns">
                  <th v-for="column in table1.headerTitles" :key="column">
                    {{ column }}
                  </th>
                  <th>Sil</th>
                  <th>Güncelle</th>
                </slot>
              </thead>
              <tbody>
                <tr v-for="(item, index) in table1.products" :key="index">
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
                        @click="removeProduct(item.id)"
                        class="btn btn-danger"
                      >
                        Sil
                      </button>
                    </td>
                    <td>
                      <button
                        @click="updateProduct(item.id)"
                        class="btn btn-warning"
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
import { PaperTable } from "@/components";
import axios from "axios";
const tableColumns = ["id", "productName" , "subProductName" ,  "amount"];
let tableData = [];
const tableHeaderTitles = ["Id", "Ürün İsmi" , "Alt Ürün İsmi" , "Miktarı" ];

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table1: {
        title: "Alt Ürün Listesi",
        subTitle: "",
        columns: [...tableColumns],
        products: [],
        headerTitles: [...tableHeaderTitles]
      }
    };
  },
  created() {
    axios
      .get("https://localhost:44397/api/subproducttree/getSubProductTreeWithAll")
      .then(res => {
        console.log(res.data);
        this.table1.products = res.data;
        console.log(this.table1.products);
      });
  },
  methods: {
    addProduct() {
      this.$router.push("/addSubProductTree");
    },
    removeProduct(id) {
      console.log(id + "solda");
      axios.delete("https://localhost:44397/api/subproducttree/" + id).then(res => {
      alert(res.data);
       this.$router.go(this.$router.currentRoute)
      });
    },
    updateProduct(id) {
      console.log(id + "solda");
      this.$router.push(`/addSubProductTree/${id}`);
    },
    hasValue(item, column) {
      return item[column] !== "undefined";
    },
    itemValue(item, column) {
      return item[column];
    }
  }
};
</script>

<style></style>
