<template>
<div>
    <nav class="navbar">
      <i class="material-icons menu-icon">
        menu
      </i>
      <div class="logo">
        <img
          src="https://github.com/subeshb1/GrabCheap/blob/master/img/logo_inverse.jpg?raw=true"
          alt="logo"
        />
        <div style="cursor:pointer" class="text" @click="homePage()">GrabCheap</div>
      </div>
      <div class="item search right" tabindex="0">
        <div class="search-group">
          <input type="text" />
          <i class="material-icons search-icon ti-search"> </i>
        </div>
      </div>
       <h3 style="text-transform: capitalize;margin-right:2%;">Hoş Geldin {{table1.userName}}</h3>
      <a href="" class="item" style="margin-right: 1%;">
        <div class="group">
          <i style="font-size:25px; margin: right 2.5em;" class="ti-user"> </i>
        </div>
      </a>
      <div class="group" style="margin-right: 1.5%">
           <i
          style="font-size:25px; margin: left 2.5em; margin-right: 2.5%; cursor: pointer;"
          class="ti-view-list-alt"
          @click="table1.showModel = true"
        >
        </i>
      </div>
      <div class="group" style="margin-right: 2.5%">
        <i
          style="font-size:25px; margin: left 2.5em; margin-right: 2.5%; cursor: pointer;"
          class="ti-shopping-cart"
        >
        </i>
      </div>
      <div class="group" style="margin-right: 2.5%; cursor:pointer; background-color:red; padding:2px;" @click="signOut()">
        <i
          style="font-size:25px; margin: left 2.5em; margin-right: 2.5%; cursor: pointer;"
          class="ti-close"
        >
        </i>
      </div>
     
    </nav>
     <div class="row">
      <div class="col-12">
        <card>
          <div slot="raw-content" class="table-responsive container mt-5">
            <table class="table table-dark">
              <thead class="table" style="color:white; background-color: #3761AF;">
                <tr>
                  <th v-for="column in table1.headerTitles" :key="column">
                    {{ column }}
                  </th>
                  <th>Sipariş Detayı</th>
                </tr>
              </thead>
              <tbody>
                    <tr v-for="(item, index) in table1.tempOrderId" :key="index">
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
                                @click="listOrder(item.orderID)"
                                class="btn btn-danger"
                            >
                            Sipraiş Detayı
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
     <transition name="modal"  >
      <div class="modal-mask" v-if="table1.showModel">
        <div class="modal-wrapper">
          <div class="modal-container" style="width:300px;">
            <div class="" >
               <h3 style="text-align:center !important"> Sipariş Detayınız </h3>
            </div>

            <div class="modal-body" >
              <slot name="body">
                <div
                  class="d-flex justify-content-start align-items-center mt-4 "
                   v-for="item in table1.orderItems"
                   :key="item.id"
                >
                <table class="table table-danger"> 
                  <tbody>
                  <tr>
                    <!-- <td style="width:80px"> {{item.orderID}} </td> -->
                    <td style="width:80px;">{{item.productName}}</td>
                    <td style="width:80px;">Adet: {{item.amount}}</td>
                  </tr>
                  </tbody>
                </table>
                </div>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <!-- <span >Termin Tarihi</span> -->
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
import Vue from 'vue'
import Button from "../components/Button.vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import moment from 'moment'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);
const tableColumns = ["orderID", "orderDate", "deadLine"];
let tableData = [];
const tableHeaderTitles = ["Id",  "Sipariş Tarihi", "Bitiş Tarihi"];
export default {
  components: { Button,BootstrapVue,PaperTable,moment },
  data() {
    return {
      table1: {
        title: "Siparişler",
        subTitle: "",
        orders: [],
        orderItems: [],
        tempOrderId: [],
        headerTitles: [...tableHeaderTitles]
        ,columns: [...tableColumns]
        ,showModel: false
      }
    };
  },
  created() {
    this.table1.userName = localStorage.userName;
    axios
      .get("https://localhost:44397/api/order/getOrdersFromAppUserId/"+localStorage.userID)
      .then(res => {
        console.log(res.data);
        //this.table1.tempOrderId = res.data
        for(let i=0 ; i < res.data.length ; i++){
          let flag = 0;
            for(let j = i+1 ; j <  res.data.length ; j++){
              if(res.data[i].orderID ==  res.data[j].orderID){
                 flag = 1;
              }
            }
          if(flag == 0){
            this.table1.tempOrderId.push(res.data[i])
          }
        }
        this.table1.orders = res.data;
        console.log(this.table1.orders);
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
    listOrder(id) {
      this.table1.orderItems = [];
       for(let i = 0 ; i < this.table1.orders.length ; i++){
          if(this.table1.orders[i].orderID == id){
             this.table1.orderItems.push(this.table1.orders[i]);
          }
       }
      this.table1.showModel = true;
    },
    homePage(){
      this.$router.push(`/customerClientPage`);
    },
    signOut(){
      localStorage.clear();
      this.$router.push(`/login`);
    }
  }
}
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
