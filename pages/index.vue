<template>
  <v-container fluid grid-list-lg fill-height class="image-bg">
    <v-fade-transition mode="out-in">
      <v-layout align-center column>
        <v-img src="/bg/group33.png" width="500" height="100" />
        <div class="errorBox" v-if="getLoginError.length > 0">
          <h4 v-for="(data, index) in getLoginError" :key="index">
            {{ data }}
          </h4>
        </div>
        <div class="preloader-wrap">
          <div class="percentage" id="percent"></div>
          <div class="loader">
            <div class="trackbar">
              <div class="loadbar"></div>
            </div>
            <div class="glow"></div>
          </div>
        </div>
      </v-layout>
    </v-fade-transition>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import config from "~/config/config.global";
import { isMobile } from "mobile-device-detect";
import secureStorage from "../plugins/secure-storage";
import log from "roarr";

export default {
  layout: "nolayout",
  middleware: ["checkAuth"],

  data() {
    return {
      stockName: config.homePageStockName,
      linkto: ""
    };
  },
  mounted() {
    if (this.getLoginError.length > 0) {
    } else {
      // Set referrer Url
      secureStorage.setItem(
        "referrerUrl",
        document.referrer.match(/:\/\/(.[^/]+)/)[1]
      );
      this.setReferrer(document.referrer.match(/:\/\/(.[^/]+)/)[1]);
      this.getProgress();
    }
  },
  watch: {
    "$screen.width"() {
      if (this.$screen.width <= 1204) {
        this.linkto = "modern";
      } else {
        this.linkto = "/modern/desktop/" + this.stockName;
      }
    }
  },
  computed: {
    ...mapGetters(["getLoginError"])
  },
  methods: {
    ...mapActions(["setReferrer"]),
    getProgress() {
      let width = 100,
        perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
        EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
        time = 1000;
      // Load bar Animation
      $(".loadbar").animate(
        {
          width: width + "%"
        },
        time
      );
      // Load bar Glow Animation
      $(".glow").animate(
        {
          width: width + "%"
        },
        time
      );

      // Percentage Increment Animation
      let PercentageID = $("#percent"),
        start = 0,
        end = 100,
        duration = time;
      this.animateValue(PercentageID, start, end, duration);

      // Fading Out Loadbar on Finised
      setTimeout(function() {
        $(".preloader-wrap").fadeOut(100);
      }, time);
    },
    animateValue(id, start, end, duration) {
      let range = end - start,
        current = start,
        increment = end > start ? 1 : -1,
        stepTime = Math.abs(Math.floor(duration / range)),
        obj = $(id);

      let timer = setInterval(() => {
        current += increment;
        //   $(obj).text(current + "%");  //sHOW BY %
        $(obj).text("lOADING..."); // SHOW BY LOADING
        obj.innerHTML = current;
        if (current == end) {
          clearInterval(timer);
          this.$router.push(
            isMobile ? "/modern" : `/modern/desktop/${this.stockName}`
          );
        }
      }, stepTime);
    }
  }
};
</script>

<style scoped>
.errorBox {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 5px;
  font-size: 23px;
}

.errorBox h2 {
  color: #333;
}
</style>
