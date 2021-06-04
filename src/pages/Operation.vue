<template>
  <div>
    <div class="text-end mb-2">
      <button class="btn btn-success " @click="addProduct()">
        Operasyon Ekle
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
import { PaperTable } from "@/components";
import axios from "axios";
const tableColumns = ["id", "name", "productTypeName"];
let tableData = [];
const tableHeaderTitles = ["Id", "Operasyon Adı", "Ürün Tpi"];

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table1: {
        title: "Operasyonlar",
        subTitle: "",
        columns: [...tableColumns],
        products: [],
        headerTitles: [...tableHeaderTitles]
      }
    };
  },
  created() {
    axios.get("https://localhost:44397/api/operation/getOperationWithProductType").then(res => {
      console.log(res.data);
      this.table1.products = res.data;
      console.log(this.table1.products);
    });
  },
  methods: {
    addProduct() {
      this.$router.push("/addOperation");
    },
    removeProduct(id) {
      console.log(id + "solda");
      axios.delete("https://localhost:44397/api/operation/" + id).then(res => {
        alert(res.data);
        this.$router.go(this.$router.currentRoute);
      });
    },
    updateProduct(id) {
      console.log(id + "solda");
      this.$router.push(`/addOperation/${id}`);
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
