<template>
  <VueApexCharts
    type="area"
    height="200vh"
    :options="chartOptions"
    :series="series"
  />
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    VueApexCharts: VueApexCharts
  },
  props: {
    xaxis: {
      type: Array,
      required: true
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: this.xaxis
        },
        chart: {
          parentHeightOffset: 0,
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        }
      },
      series: [
        {
          name: "minute",
          data: this.chartData
        }
      ]
    };
  }
};
</script>

<style></style>
