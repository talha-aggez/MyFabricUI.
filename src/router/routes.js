import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import AddProduct from "@/pages/AddProduct.vue";
import Login from "@/pages/Login.vue";
import ProductType from "@/pages/ProductType.vue";
import AddProductType from "@/pages/AddProductType.vue";
import Operation from "@/pages/Operation.vue";
import AddOperation from "@/pages/AddOperation.vue";
import SubProductTree from "@/pages/SubProductTree.vue";
import AddSubProductTree from "@/pages/AddSubProductTree.vue";
import CustomerClientPage from "@/pages/CustomerClientPage.vue";
const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      },
      {
        path: "addProduct",
        name: "addProduct",
        component: AddProduct
      },
      {
        path: "addProduct/:id"
        ,name: "addProduct/:id"
        ,component: AddProduct
      },
      {
        path: "addProductType/:id"
        ,name: "addProductType/:id"
        ,component: AddProductType
      },
      {
        path: "productType"
        ,name: "productType"
        ,component: ProductType
      },
      {
        path: "addProductType"
        ,name: "addProductType"
        ,component: AddProductType
      },
      {
        path: "operation"
        ,name: "operation"
        ,component: Operation
      },
      {
        path: "addOperation"
        ,name: "addOperation"
        ,component: AddOperation
      },
      {
        path: "subProductTree"
        ,name: "subProductTree"
        ,component: SubProductTree
      },
      {
        path: "addSubProductTree"
        ,name: "addSubProductTree"
        ,component: AddSubProductTree
      },
      {
        path: "addSubProductTree/:id"
        ,name: "addSubProductTree/:id"
        ,component: AddSubProductTree
      },
    ]
  },
  { path: "*", component: NotFound }
  ,{
    path: "/login"
    ,name: "login"
    ,component: Login
  },
  {
    path: "/customerClientPage"
    ,name: "customerClientPage"
    ,component: CustomerClientPage
  }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
