<template>
  <div>
    <canvas ref="planetchart" height="500vh" width="100%"></canvas>
  </div>
</template>

<script>
import { Line, mixins } from "vue-chartjs";
import VueCharts from "vue-chartjs";
import Chart from "chart.js";
export default {
  props: ["dataGet"],
  data() {
    return {
      load: false,
      stockname: [],
      betwon: []
    };
  },
  mounted() {
    this.dataGet.forEach(element => {
      this.stockname.push(
        element.rule.split("-")[1] >= 0
          ? this.$root.$t("gamemsg." + element.rule.split("-")[0]) +
              "-" +
              element.rule.split("-")[1]
          : this.$root.$t("gamemsg." + element.rule.split("-")[0]) +
              "-" +
              this.$root.$t("gamemsg." + element.rule.split("-")[1])
      );
      this.betwon.push(element.totalAmount);
    });
    this.gradient = this.$refs.planetchart
      .getContext("2d")
      .createLinearGradient(255, 0, 0, 0);
    this.gradient.addColorStop(0, "#003f70");
    this.gradient.addColorStop(1, "#ffffff");

    var config = {
      type: "horizontalBar",
      data: {
        labels: this.stockname,
        datasets: [
          {
            data: this.betwon,
            label: this.$root.$t("msg.amount"),
            // fill: false,
            backgroundColor: this.gradient,
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        barPercentage: 1.6,
        maintainAspectRatio: false,
        legend: {
          display: false,
          position: "top"
        },
        title: {
          display: true,
          text: this.$root.$t("msg.stockLiveData")
        },
        tooltips: {
          enabled: false
        },
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        }
      }
    };

    const ctx = this.$refs.planetchart;
    const mychart = new Chart(ctx, config);
  }
};
</script>
