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
import CustomerOrderList from "@/pages/CustomerOrderList.vue";
import StaffOrders from "@/pages/StaffOrders.vue";
import WorkCenterList from "@/pages/WorkCenterList.vue";
import AddWorkCenter from "@/pages/AddWorkCenter.vue";
import WorkCenterOperation from "@/pages/WorkCenterOperation.vue";
import AddWorkCenterOperation from "@/pages/AddWorkCenterOperation.vue";
import SiparisYapilandir from "@/pages/SiparisYapilandir.vue";
const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
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
        ,name: "Operasyonlar"
        ,component: Operation
      },
      {
        path: "addOperation"
        ,name: "addOperation"
        ,component: AddOperation
      },
      {
        path: "subProductTree"
        ,name: "Alt ??r??nler"
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
      {
        path: "staffOrders"
        ,name: "Sipari??ler"
        ,component: StaffOrders
      },
      {
        path: "workCenterList"
        ,name: "WorkCenter"
        ,component: WorkCenterList
      },
      {
        path: "addWorkCenter/:id"
        ,name: "addWorkCenter/:id"
        ,component: AddWorkCenter
      },
      {
        path: "/addWorkCenter"
        ,name: "addWorkCenter"
        ,component: AddWorkCenter
      },
      {
        path: "workCenterOperation"
        ,name: "WorkCenterOperation"
        ,component: WorkCenterOperation
      },
      {
        path: "addWorkCenterOperation"
        ,name: "addWorkCenterOperation"
        ,component: AddWorkCenterOperation
      }
      ,{
        path: "addWorkCenterOperation/:id"
        ,name: "addWorkCenterOperation/:id"
        ,component: AddWorkCenterOperation
      },
      {
        path: "siparisYapilandir/:id"
        ,name: "siparisYapilandir"
        ,component: SiparisYapilandir
      },
      {
        path: "addOperation/:id"
        ,name: "addOperation"
        ,component: AddOperation
      }
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
  },
  {
    path: "/customerOrderList"
    ,name: "customerOrderList"
    ,component: CustomerOrderList
  },
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
