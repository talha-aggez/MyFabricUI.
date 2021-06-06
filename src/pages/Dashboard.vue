<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div
        class="col-md-6 col-xl-4"
        v-for="stats in statsCards"
        :key="stats.title"
      >
        <stats-card>
          <div
            class="icon-big text-center"
            :class="`icon-${stats.type}`"
            slot="header"
          >
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{ stats.title }}</p>
            {{ stats.value }}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{ stats.footerText }}
          </div>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">
      <div class="col-md-6 col-xl-6">
      <h3>En çok Sipariş Edilen Ürünler</h3>
      <GChart type="PieChart" :data="chartData" :options="chartOptions" />
      </div>
      <div class="col-md-6 col-xl-6">
      <h3>En Çok Sipariş Veren Müşteriler</h3>
      <GChart type="PieChart" :data="chartData2" :options="chartOptions" />
      </div>
    </div>
    <div class="row"></div>
  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from "chartist";
import Vue from "vue";
import axios from "axios";
import { GChart } from "vue-google-charts";
Vue.use(GChart);
export default {
  components: {
    StatsCard,
    ChartCard,
    GChart
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Bugunkü Sipariş Sayısı",
          value: "105GB"
          // footerText: "Updated now",
          // footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "Toplam Sipariş Sayısı",
          value: "$1,345"
          // footerText: "Last day",
          // footerIcon: "ti-calendar"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Çalışan Makina Sayısı",
          value: "23"
          // footerText: "In the last hour",
          // footerIcon: "ti-timer"
        },
        {
          type: "info",
          icon: "ti-harddrives",
          title: "Toplam Makina Sayısı",
          value: "+45"
          // footerText: "Updated now",
          // footerIcon: "ti-reload"
        },
        {
          type: "info",
          icon: "ti-user",
          title: "Toplam Müşteri Sayısı",
          value: "+45"
          // footerText: "Updated now",
          // footerIcon: "ti-reload"
        },
        {
          type: "info",
          icon: "ti-gift",
          title: "Toplam Ürün Sayısı",
          value: "+45"
          // footerText: "Updated now",
          // footerIcon: "ti-reload"
        }
      ],
      usersChart: {
        data: {
          labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM"
          ],
          series: [
            [287, 385, 490, 562, 594, 626, 698, 895, 952],
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410]
          ]
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false
        }
      },
      activityChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
      preferencesChart: {
        data: {
          labels: [],
          series: [["Ürünler", "Yüzde"]],
          products: []
        },
        options: {}
      },
      chartData: [["Year", "Sales"]],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2017-2020"
        }
      },
      chartData2: [["Name", "Number"]]
    };
  },
  // mounted(){
  //   this.$router.go(this.$router.currentRoute);
  // }
  created() {
    axios
      .get("https://localhost:44397/api/order/GetTodayOrderCount")
      .then(res => {
        console.log(res.data);
        this.statsCards[0].value = res.data;
        console.log(this.statsCards[0].value);
      });
    axios
      .get("https://localhost:44397/api/order/GetTotalOrderCount")
      .then(res => {
        console.log(res.data);
        this.statsCards[1].value = res.data;
        console.log(this.statsCards[1].value);
      });
    axios
      .get(
        "https://localhost:44397/api/workcenters/GetActiveWorkCenterTotalCount"
      )
      .then(res => {
        console.log(res.data);
        this.statsCards[2].value = res.data;
        console.log(this.statsCards[2].value);
      });
    //GetWorkCenterTotalCount
    axios
      .get("https://localhost:44397/api/workcenters/GetWorkCenterTotalCount")
      .then(res => {
        console.log(res.data);
        this.statsCards[3].value = res.data;
        console.log(this.statsCards[3].value);
      });
    axios
      .get("https://localhost:44397/api/appuser/GetTotalCustomerCount")
      .then(res => {
        console.log(res.data);
        this.statsCards[4].value = res.data;
        console.log(this.statsCards[4].value);
      });
    axios
      .get("https://localhost:44397/api/products/GetTotalProductCount")
      .then(res => {
        console.log(res.data);
        this.statsCards[5].value = res.data;
        console.log(this.statsCards[5].value);
      });
    axios
      .get("https://localhost:44397/api/order/GetMostActive3Product")
      .then(res => {
        console.log(res.data);
        this.preferencesChart.data.products = res.data;
        console.log(this.preferencesChart.data.products);
        let toplam = 0;
        for (let i = 0; i < this.preferencesChart.data.products.length; i++) {
          toplam += this.preferencesChart.data.products[i].number;
        }
        for (let i = 0; i < this.preferencesChart.data.products.length; i++) {
          this.chartData.push([
            this.preferencesChart.data.products[i].name,
            Number(
              Math.round(
                (this.preferencesChart.data.products[i].number / toplam) * 100
              ).toString()
            )
          ]);
        }
      });
    axios
      .get("https://localhost:44397/api/order/GetMostActive3Person")
      .then(res => {
        console.log("res data:");
        console.log(res.data);
        let toplam = 0;
        for (let i = 0; i < res.data.length; i++) {
          toplam += res.data[i].number;
        }
        for (let i = 0; i < res.data.length; i++) {
          this.chartData2.push([
            res.data[i].name,
            Number(Math.round((res.data[i].number / toplam) * 100).toString())
          ]);
        }
        console.log("charData2");
        console.log(this.chartData2);
      });
      // this.$router.go(this.$router.currentRoute)
  }
};
</script>
<style></style>
