<template>
  <VueApexCharts type="bar" height="350" :options="chartOptions" :series="series" :key="componentKey" />
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    VueApexCharts: VueApexCharts
  },
  props: [
"xaxis",
"chartData",
"componentKey"
  ],
  watch:{
    chartData(val) {
      console.log('chart data', val);
    },
    xaxis(val){
     console.log(val)
    }
  },
  data() {
    return {
      series: [{
        data: this.chartData
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar',
          },
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: this.xaxis,
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        }
      },
    };
  }
};
</script>

<style>
</style>



    