<template>
  <div>
    <div v-for="item in table1.products" :key="item.productId">
      <b-button v-b-toggle="'item' + item.productId" class="m-1">{{
        item.productName
      }}</b-button>
      <b-collapse visible v-bind:id="'item' + item.productId">
        <b-card>
          <div class="row">
            <div class="col-12">
              <card>
                <div slot="raw-content" class="table-responsive container mt-5">
                  <table class="table table-dark">
                    <thead
                      class="table"
                      style="color:white; background-color: #3761AF;"
                    >
                      <tr>
                        <th v-for="column in table1.headerTitles" :key="column">
                          {{ column }}
                        </th>
                        <th>Makina Ata</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in item.subProducts"
                        :key="index"
                      >
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
                                @click="listMachine(item.subProductId,item.amount)"
                                class="btn btn-danger"
                            >
                              Makina Ekle
                            </button>
                          </td>
                        </slot>
                      </tr>
                    </tbody>
                  </table>
                  <button class="btn btn-danger" @click="saveMachines(item.productId)">
                     Schedule Oluştur.
                  </button>
                </div>
              </card>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
     <transition name="modal"  >
      <div class="modal-mask" v-if="table1.showModel">
        <div class="modal-wrapper">
          <div class="modal-container" style="width:300px;">
            <div class="" >
               <h3 style="text-align:center !important"> Makinalar </h3>
            </div>
            <div class="modal-body" >
                 <select class="form-control" @change="changeJobTitle($event)">
              <option value="" selected disabled>Work Center Seçiniz...</option>
              <option
                v-for="jobTitle in table1.workCenters"
                :value="jobTitle.workCenterId"
                :key="jobTitle.workCenterId"
                :id="jobTitle.speed"
                :selected="jobTitle.workCenterId == table1.selectedWorkItem"
                >{{jobTitle.workCenterName}} &nbsp &nbsp&nbsp&nbsp HIZI : {{jobTitle.speed}}</option
              >
            </select>
            <p class="text-primary p-3" v-if="table1.showMachine"> Seçili Makina: {{table1.selectedWorkItemName}}</p>
            </div>
            <div class="modal-footer">

              <slot name="footer">
                 <button
                  class="btn btn-outline-danger  ml-4 btn-block text-center d-inline"
                  @click="saveMachine()"
                >
                  Kaydet
                </button>
                 <button
                  class="btn btn-outline-danger  ml-4 btn-block text-center d-inline"
                  @click="table1.showModel = false"
                >
                  Kapat
                </button>
              
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { PaperTable } from "@/components";
import Vue from "vue";
import Button from "../components/Button.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import moment from "moment";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
const tableColumns = ["subProductId", "subProductName", "amount"];
const tableHeaderTitles = ["Alt Ürün Id", "Alt Ürün Adı", "Miktarı"];
Vue.use(BootstrapVue);
export default {
  components: { Button,BootstrapVue,PaperTable,moment },
  data() {
    return {
      table1: {
        order_id: "",
        miktar: "",
        urun_id: "",
        title: "ALT ÜRÜNLER",
        subTitle: "",
        columns: [...tableColumns],
        products: [],
        headerTitles: [...tableHeaderTitles],
        showModel: false,
        selectedWorkItem: "",
        selectedWorkItemName: "",
        workCenters: [],
        schedules: [],
        selectedWorkCenterSpeed: "",
        showMachine: false,
      }
    };
  },
  created() {
    let id = this.$route.params.id;
    axios
      .get(
        "https://localhost:44397/api/order/GetOrderItemsAndSubProductsByOrderId/" +
          id
      )
      .then(res => {
        console.log(res.data);
        this.table1.products = res.data;
        console.log(this.table1.products);
      });
  },
  methods: {
    hasValue(item, column) {
      return item[column] !== "undefined";
    },
    itemValue(item, column) {
      return item[column];
    },
    listMachine(id,miktar) {
      this.table1.selectedWorkItemName = "";
      //this.table1.
       this.table1.selectedWorkItem = "";
       this.table1.showMachine = false;
       axios
      .get(
        "https://localhost:44397/api/schedules/GetScheduleByOrderIdAndProductId?orderId="+  this.$route.params.id + "&productId="+  id
      )
      .then(res => {
        console.log("test - schedule")
        console.log(res.data);
        if(res.data.length != 0){
             this.table1.selectedWorkItem = res.data[0].workCenterID;
             this.table1.selectedWorkItemName = res.data[0].workCenter.workCenterName;
             this.table1.showMachine = true;
        }
      });
       this.table1.showModel = true;
       this.table1.miktar = miktar;
       this.table1.order_id = this.$route.params.id;
       this.table1.urun_id = id;
       axios
      .get(
        "https://localhost:44397/api/workCenters/GetWorkCenterWithProductId/" +
          id
      )
      .then(res => {
        console.log(res.data);
        this.table1.workCenters = res.data;
        console.log("Workcenters");
        console.log(this.table1.workCenters);
      });
    },
    async saveMachine(){
        //this.table1.selectedWorkItem;
        let schedule = {}
        schedule.workCenterID = this.table1.selectedWorkItem;
        schedule.productID = this.table1.urun_id;
        schedule.orderID = this.table1.order_id;
        schedule.speed = Number(this.table1.selectedWorkCenterSpeed);
        this.table1.schedules.push(schedule);
        this.table1.showModel = false;
        // const response = await axios.post(
        //   "https://localhost:44397/api/schedules",
        //   schedule
        // );
    },
     changeJobTitle(event) {
      //this.table1.selectedProductType = event.target.options[event.target.options.selectedIndex].value
      this.table1.selectedWorkItem =
        event.target.options[event.target.options.selectedIndex].value;
      this.table1.selectedWorkCenterSpeed =   event.target.options[event.target.options.selectedIndex].id;
      console.log("Seçilen hız: " + this.table1.selectedWorkCenterSpeed);
    //   console.log("selectedProductType" + this.table1.selectedProductType);
    },
    async saveMachines(id){
      console.log(this.table1.schedules[0].ustUrun = id);
      if(this.table1.schedules.length != 0){
          const response = await axios.post(
              "https://localhost:44397/api/schedules/createScheduleByScheduleList",
            this.table1.schedules
        );
        
        //alert(response.data);
      }
    },
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
.datepicker{
  color:black;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

* {
  margin: 0;
  padding: 0;
  font-family: "Open Sans", sans-serif;
  box-sizing: border-box;
}
.navbar {
  display: flex;
  box-shadow: 0 0 2px 0 grey;
  align-items: center;
  font-size: 1em;

  background-color: #3761af;
  color: white;
}

.item {
  padding: 10px;
  text-decoration: none;
  color: white;
  color: var(--theme-color);
}

.item.right {
  margin: 0 0 0 auto;
}

.navbar .logo {
  font-size: 1.2em;
  align-items: center;
  display: flex;
}

.logo img {
  max-width: 40px;
}
.item.search {
  transition: 0.2s linear;
  display: flex;
  justify-content: center;
  flex-grow: 1;
}
.item.search .search-icon {
  border-left: 1px solid grey;
  margin: 2px;
  padding-left: 10px;
  cursor: pointer;
  color: grey;
}
.item.search .search-icon:hover {
  color: black;
}

.item.search input {
  width: 100%;
  padding: 6px;
  outline: none;
  border: 2px solid grey;
  max-width: 100%;
  border: 0;
}

.item .search-group {
  display: flex;
  width: 100%;
  max-width: 700px;
  border-radius: 20px;
  border: 2px solid grey;
  overflow: hidden;
  background: white;

  border-color: white;
  color: var(--theme-color);
}
.item .search-group select {
  border: 0;
  margin: 2px;
  border-right: 1px solid grey;
  max-width: 5em;
  outline: none;
  color: grey;
}

.item .group {
  display: flex;
  align-items: center;
  font-size: 0.9em;
}
.item .group .sub {
  font-size: 0.8em;
}
.material-icons {
  font-size: 1.8rem;
}
.menu-icon {
  display: none;
}
@media (max-width: 700px) {
  .item.search input {
    display: none;
  }
  .menu-icon {
    display: block;
  }
  .detail,
  .logo .text {
    display: none;
  }
}
</style>