<template>
  <div class="footerBet">
    <div class="total-bet-multigame">
      <span>{{ formatToPrice(getMultiGameFooterBetAmount) }}</span>
    </div>
    <div class="amount-multigame">
      <span>{{ getMultiGameFooterBetAmount }}</span>
    </div>
    <div class="chips-multigame">
      <v-avatar
        size="70"
        v-for="(item, key) in imgChip"
        :key="key"
        class="chips"
      >
        <v-img
          @click="setMultiGameFooterBetAmount(getCoinsModern[key])"
          :src="item.img"
          :width="item.width"
          :alt="item.title"
          :class="item.color"
          class="chipImg"
        >
        <span class="setpricechip">{{ getCoinsModern[key] }}</span>
        </v-img>
      </v-avatar>
    </div>
    <div class="action-multigame">
      <v-btn class="buttonGreen" dark @click="getSending()">
        {{ $t("msg." + texts) }}
      </v-btn>
      <v-btn class="buttonCancel" @click="clearDataMultiGameBet()">
        {{ $t("msg.cancel") }}
      </v-btn>
    </div>
    <div class="max-min-multigame">
      <span>min = $100, max = $10000</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import chips from "~/data/chips";
export default {
  data() {
    return {
      isSending: false,
      texts: "confirm",
      imgChip: chips.chipsData
    };
  },
  methods: {
    ...mapActions([
      "setFooterBetAmount",
      "setMultiGameFooterBetAmount",
      "clearDataMultiGameBet",
      "sendBetting"
    ]),
    formatToPrice(value) {
      return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    },
    getSending() {
      this.isSending = true;
      this.texts = "sending";
      setTimeout(() => {
        this.sendBetting();
        this.isSending = false;
        this.texts = "confirm";
      }, 1200);
    }
  },
  computed: {
    ...mapGetters([
      "getMultiGameFooterBetAmount",
      "getCoinsModern",
      "getAllBettingAmount",
      "getMultiGameBetLength",
      "getIsSendBetting"
    ])
  }
};
</script>

<style scoped>
.footerBet {
  display: flex;
  position: fixed;
  bottom: 20px;
  justify-content: center;
  width: 100%;
  z-index: 99;
  align-items: center;
}
.total-bet-multigame {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: #fff;
  border: #aeadad solid 2px;
  padding: 5px 15px;
  text-transform: uppercase;
  min-width: 120px;
  text-align: center;
  height: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.amount-multigame {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: #fff;
  border: #aeadad solid 2px;
  padding: 5px 15px;
  padding-right: 30px;
  text-transform: uppercase;
  min-width: 50px;
  height: 60px;
  text-align: center;
  font-size: 22px;
  display: flex;
  margin-left: -2px;
  align-items: center;
}
.chips-multigame {
  background-color: #fff;
  border: #aeadad solid 2px;
  padding: 5px 15px;
  text-transform: uppercase;
  min-width: 350px;
  height: 90px;
  text-align: center;
  border-radius: 50px;
  margin-left: -13px;
  z-index: 1;
  align-items: center;
}
.action-multigame {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #fff;
  border: #aeadad solid 2px;
  display: flex;
  height: 55px;
  padding: 0px 15px;
  margin-left: -10px;
  align-items: center;
}
.max-min-multigame {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #fff;
  border: #aeadad solid 2px;
  padding: 5px 15px;
  text-transform: uppercase;
  min-width: 80px;
  text-align: center;
  height: 35px;
  display: flex;
  flex-direction: column;
  margin-left: -2px;
  align-items: center;
}

.chipsdiv {
  padding: 5px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  background-color: #fff;
}
.chips {
  cursor: pointer;
  margin: 2px 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4) !important;

}
.chips:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4) !important;

}
.chipImg {
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.st0 {
  clip-path: url(#SVGID_2_);
}
.st1 {
  fill: #ffffff;
}
.st2 {
  fill: #c1272d;
}
.st3 {
  font-family: "MyriadPro-Regular";
}
.st4 {
  font-size: 9.7577px;
}
.st5 {
  font-size: 13.0102px;
}
.st6 {
  font-size: 11.3839px;
}
</style>
