<template>
  <div id="root">
    <nav class="navbar">
      <i class="material-icons menu-icon">
        menu
      </i>
      <div class="logo">
        <img
          src="https://github.com/subeshb1/GrabCheap/blob/master/img/logo_inverse.jpg?raw=true"
          alt="logo"
        />
        <div class="text">GrabCheap</div>
      </div>
      <div class="item search right" tabindex="0">
        <div class="search-group">
          <select>
            <option value="all">All</option>
            <option value="all">Mens</option>
            <option value="all">Womens</option>
            <option value="all">Winter</option>
            <option value="all">Summer</option>
          </select>
          <input type="text" />
          <i class="material-icons search-icon ti-search"> </i>
        </div>
      </div>

      <a href="" class="item" style="margin-right: 1%;">
        <div class="group">
          <i style="font-size:25px; margin: right 2.5em;" class="ti-user"> </i>
        </div>
      </a>

      <div class="group" style="margin-right: 2.5%">
        <i
          style="font-size:25px; margin: left 2.5em; margin-right: 2.5%; cursor: pointer;"
          class="ti-shopping-cart"
          @click="table1.showModel = true"
        >
        </i>
      </div>
    </nav>
    <div class="row m-4 ">
      <div
        class="col-3 mb-4"
        v-for="item in table1.products"
        :key="item.productName"
      >
        <div class="card h-100 shadow-sm">
          <img
            src="../assets/img/vue-logo.png"
            class="img-fluid bg-info"
            style="cursor:pointer"
          />

          <div class="card-body d-flex flex-column">
            <a>
              <h4 class="text-uppercase text-center">{{ item.productName }}</h4>
            </a>
            <div class="btn-group mt-auto">
              <button
                style="font-size: 18px"
                type="button"
                class="btn btn-sm btn-outline-info p-3"
                @click="addBasket(item)"
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="modal"  >
      <div class="modal-mask" v-if="table1.showModel">
        <div class="modal-wrapper">
          <div class="modal-container" style="width:1000px;">
            <div class="" >
               <h3 style="text-align:center !important"> Sepet </h3>
            </div>

            <div class="modal-body" >
              <slot name="body">
                <div
                  class="d-flex justify-content-start align-items-center mt-4 "
                   v-for="item in table1.listBasket"
                   :key="item.productName"
                >
                <table class="table table-striped"> 
                  <tr>
                    <td style="margin-right: 2%;"> {{item.productName}} </td>
                    <td><input class="text-right" type="number" v-model="item.amount" min="0" style="margin-left: 2%; width:80px; float: right;"></td>
                  </tr>
                </table>
                </div>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                 <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2 btn-black" style="color: black;"></b-form-datepicker>
                <button
                  class="btn btn-outline-primary  ml-4 btn-block text-center d-inline"
                  @click="saveOrder()"
                >
                  Sipariş Ver
                </button>
                 <button
                  class="btn btn-outline-danger  ml-4 btn-block text-center d-inline"
                  @click="table1.showModel = false"
                >
                  iptal
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
import Vue from 'vue'
import Button from "../components/Button.vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);
export default {
  components: { Button,BootstrapVue },
  data() {
    return {
      table1: {
        products: [],
        listBasket: [],
        showModel: false
        ,deadLine: ''
      }
      ,value : ''
    };
  },
  created() {
    axios
      .get("https://localhost:44397/api/products/GetProductSalable")
      .then(res => {
        console.log(res.data);
        this.table1.products = res.data;
        console.log(this.table1.products);
      });
  },
  computed:{
   data(item){ return item.amount;}
  },
  methods: {
    async saveOrder(){
      console.log(this.value);
      let  myObj = { "OrderItems": this.table1.listBasket, "DeadLine": this.value , "AppUserId" : 1};
       const response = await axios.post(
          "https://localhost:44397/api/order",
          myObj
        );
      this.table1.showModel = false; console.log(this.table1.deadLine);
    },
    increment(item){
      item.amount += 1;
    },
    decrement(item){
      item.amount -= 1;
      if(item.amount < 0){
        item.amount = 0;
      }
    },
    addBasket(item) {
      for(let i = 0 ; i < this.table1.listBasket.length ; i++){
          if(this.table1.listBasket[i].productName == item.productName){
            let temp = parseInt(item.amount);
            temp += 1;
            item.amount = temp;
            //alert("Ürün daha önceden eklenmiş ");
            return;
          }
      }
      item.amount = 1;
      //item.date = new Date(2018, 11, 24);
      this.table1.listBasket.push(item);
      console.log(this.table1.listBasket);
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
    }
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
