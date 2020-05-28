<template>
  <div id="tutorial-container" v-if="getIsShowTutorial">
    <div id="background-tutorial"></div>
    <div id="guide-container">
      <div
        style="z-index: 10028;position: absolute;right:10px;top:20px;cursor:pointer"
      >
        <v-icon @click="setIsShowTutorial(false)" color="#fff">close</v-icon>
      </div>
      <!-- last draw v-if="getTutorialStepNumber === 1" -->
      <div class="guide-top" v-if="getTutorialStepNumber === 1">
        <span id="result-draw">{{ getLastDraw | lastDraw2 }}</span>
        <span class="guide-description">{{ $t("tutorial.resultDraw") }}</span>
      </div>
      <!-- bet close in  -->
      <div class="guide-top" v-if="getTutorialStepNumber === 2">
        <span class="guide-description text-uppercase" style="font-size:100px"
          >{{ $t("tutorial.calculation") }}...</span
        >
      </div>
      <!-- lottery  -->
      <div class="guide-top" v-if="getTutorialStepNumber === 3">
        <span id="lottery-draw-guide-text">
          {{
            getTimerByStockName($route.params.id) &&
              getTimerByStockName($route.params.id).gameEndTimeCountDownInSec
                | lotterydraw(getStockLoop($route.params.id))
          }}
        </span>
        <span class="guide-description">{{ $t("tutorial.lotteryDraw") }}</span>
      </div>
      <!-- chart  -->
      <!-- has scroll -->
      <div
        class="guide-chart-has-scroll"
        v-if="getTutorialStepNumber === 4 && getIsWindowsHasScroll"
      >
        <span class="guide-title text-uppercase">{{
          $t("tutorial.analyseGraph")
        }}</span>
        <span class="guide-description">{{ $t("tutorial.stockGraph") }}</span>
      </div>
      <!-- no scroll -->
      <div
        class="guide-chart-no-scroll"
        v-if="getTutorialStepNumber === 4 && !getIsWindowsHasScroll"
      >
        <span class="guide-title text-uppercase">{{
          $t("tutorial.analyseGraph")
        }}</span>
        <span class="guide-description">{{ $t("tutorial.stockGraph") }}</span>
      </div>

      <!-- bet on digit  -->
      <div
        class="guide-top"
        style="margin-right: 90px;"
        v-if="getTutorialStepNumber === 5"
      >
        <span class="guide-title text-uppercase">{{
          $t("tutorial.betOnDigits")
        }}</span>
        <span class="guide-description">{{ $t("tutorial.selectDigit") }}</span>
      </div>
      <!-- select chipcamount  -->
      <div
        class="guide-top"
        style="margin-right: 90px;"
        v-if="getTutorialStepNumber === 6"
      >
        <span class="guide-title text-uppercase">{{
          $t("tutorial.betConfirm")
        }}</span>
        <span class="guide-description">{{
          $t("tutorial.betLastDigitEven")
        }}</span>
      </div>
      <!-- enter amount bet -->
      <!-- has scroll  -->
      <div
        class="guide-bottom-has-scroll"
        id="enter-bet-guide"
        v-if="getTutorialStepNumber === 7 && getIsWindowsHasScroll"
      >
        <span class="guide-title text-uppercase">{{
          $t("tutorial.betOnDigits")
        }}</span>
        <span class="guide-description">{{ $t("tutorial.selectChip") }}</span>
      </div>
      <!-- no scroll -->
      <div
        class="guide-bottom-no-scroll"
        id="enter-bet-guide"
        v-if="getTutorialStepNumber === 7 && !getIsWindowsHasScroll"
      >
        <span class="guide-title text-uppercase">{{
          $t("tutorial.betOnDigits")
        }}</span>
        <span class="guide-description">{{ $t("tutorial.selectChip") }}</span>
      </div>
      <!-- to scroll here -->
      <div id="enter-amount-to-bet" hidden>hidden</div>
      <!-- to scroll here -->

      <!-- select stock to play -->
      <div class="guide-top" v-if="getTutorialStepNumber === 8">
        <span class="guide-title text-uppercase">{{
          $t("tutorial.stockGame")
        }}</span>
        <span class="guide-description">{{ $t("tutorial.stockTime") }}</span>
      </div>
      <!-- stock list -->
      <div
        class="guide-top"
        v-if="getTutorialStepNumber === 9"
        style="margin-left: 100px;"
      >
        <span class="guide-title text-uppercase">{{
          $t("tutorial.stockAnalysis")
        }}</span>
        <span class="guide-description">{{
          $t("tutorial.analysisCurrent")
        }}</span>
      </div>
      <!-- stock result -->
      <div
        class="guide-top"
        style="margin-left: 100px;"
        v-if="getTutorialStepNumber === 10"
      >
        <span class="guide-title text-uppercase">{{
          $t("tutorial.stockResult")
        }}</span>
        <span class="guide-description">{{ $t("tutorial.checkUpdate") }}</span>
      </div>
      <!-- road map  -->
      <div class="guide-bottom" v-if="getTutorialStepNumber === 11">
        <span class="guide-title text-uppercase">{{
          $t("tutorial.roadMap")
        }}</span>
        <span class="guide-description">{{ $t("tutorial.analyseStock") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["setIsShowTutorial", "setIsWindowsHasScroll"])
  },
  computed: {
    ...mapGetters([
      "getIsWindowsHasScroll",
      "getTimerByStockName",
      "getStockLoop",
      "getTutorialStepNumber",
      "getIsShowTutorial",
      "getLastDraw"
    ])
  },
  watch: {
    getTutorialStepNumber(newValue) {
      // window.scrollTo(0, document.body.scrollHeight);
      switch (newValue) {
        case 1:
          $("#lastDrawGuideline").css("z-index", "10001");
          break;
        case 2:
          $("#lastDrawGuideline").css("z-index", "1");
          $("#betCloseInGuideline").css("z-index", "10001");
          break;
        case 3:
          $("#betCloseInGuideline").css("z-index", "1");
          $("#lotteryDrawGuidelines").css("z-index", "10001");
          break;
        case 4:
          $("#lotteryDrawGuidelines").css("z-index", "1");
          $("#chartGuidelineNew").css("z-index", "10001");
          if ($(document).height() > $(window).height()) {
            // window.scrollTo(0, document.body.scrollHeight);
            this.setIsWindowsHasScroll(true);
          } else {
            this.setIsWindowsHasScroll(false);
          }
          break;
        case 5:
          $("#chartGuidelineNew").css("z-index", "1");
          $(".betButtonGuide").css("z-index", "10001");
          break;
        case 6:
          $(".betButtonGuide").css("z-index", "1");
          $(".BetButtonGuideEven").css("z-index", "10001");
          break;
        case 7:
          $(".BetButtonGuideEven").click();
          if ($(document).height() > $(window).height()) {
            $("html, body").animate(
              { scrollTop: ($(document).height() - $(window).height()) },
              "slow"
            );
          }
          break;
        case 8:
          $(".BetButtonGuideEven").css("z-index", "1");
          $("html, body").animate({ scrollTop: 0 }, "slow");
          $("#background-tutorial").click();
          $("#selectstockGuidelines").css("z-index", "10001");
          break;
        case 9:
          $("#selectstockGuidelines").css("z-index", "1");
          $("#stocklistGuidelines").css("z-index", "10001");
          break;
        case 10:
          $("#stocklistGuidelines").css("z-index", "1");
          $("#betresultGuidelines").css("z-index", "10001");
          break;
        case 11:
          $("#betresultGuidelines").css("z-index", "1");
          $("#trendmapGuidelines").css("z-index", "10001");
          $("#trendmapGuidelines").css("backgroundColor", "#fff");
          break;
        default:
          $("#trendmapGuidelines").css("z-index", "1");
          $("#trendmapGuidelines").css("backgroundColor", "#f2f4ff");
          this.setIsShowTutorial(false);
      }
    }
  }
};
</script>
