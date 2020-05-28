<template>
  <v-layout row class="justify-center" mt-2>
    <v-flex xs12 md12>
      <v-list-tile v-if="currentBets.length == 0" class="notBets">
        <h3>{{$t("currentBet.noBets")}}</h3>
      </v-list-tile>
      <v-list three-line v-if="currentBets.length > 0">
        <template v-for="(item, index) in currentBets" style="margin-bottom:50px;">
          <v-list-tile :key="item.betUUID">
            <v-list-tile-content>
              <v-list-tile-sub-title
                class="headingTitle"
              >{{ item.ruleName }} - ({{ item.payout }}) {{ item.stockName }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>
                <span class="lastDraw" v-html="$options.filters.lastDraw(item.gameDraw)"></span>
              </v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ item.createdDate }} {{ item.createdTime }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <span class="betAmount">{{ item.betAmount | toCurrency }}</span>
              <div v-if="item.isFollowBet == 1" class="following">{{$t("currentBet.byFollowers")}}</div>
              <div v-if="item.isFollowBet == 0" class="original">{{$t("currentBet.original")}}</div>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider :key="index"></v-divider>
        </template>
        <div class="footer" v-if="currentBets.length > 0">
          <div>
            <span>
              <strong>{{$t("currentBet.total")}} :</strong>
              {{ currentBets.length }} {{$t("currentBet.bets")}}
            </span>
            <span>
              <strong>{{$t("currentBet.totalAmount")}}</strong>  
              :{{ TotalAmount | toCurrency }}
            </span>
          </div>
        </div>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["currentBets"],
  data: () => ({
    search: ""
  }),
  filters: {
    toCurrency(value) {
      if (typeof value !== "number") {
        return value;
      }
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
      });
      return formatter.format(value);
    }
  },
  computed: {
    TotalAmount() {
      let total = null;
      this.currentBets.map(item => {
        total += item.betAmount;
      });
      return total;
    }
  }
};
</script>
<style>
.notBets {
  font-size: 16px;
  color: #9e8e8e;
  text-align: center;
  margin: 300px auto;
}
.notBets h3 {
  text-align: center;
  margin: 0 auto;
}
.footer {
  width: 100%;
  background-color: #dddddd;
  padding: 10px 0px;
  position: fixed;
  bottom: 0;
  border-top: 2px solid #dddddd;
}
.footer div {
  text-align: center;
  width: 100%;
}
.footer div span {
  text-align: center;
  font-size: 16px;
  margin: 0px 6px;
}
.betresult {
  width: auto;
}
.headingTitle {
  font-weight: 600;
  color: #003f70 !important;
  font-size: 16px;
}
.original {
  text-align: right;
  width: 100px;
  color: #fec623;
  font-size: 12px;
  text-transform: lowercase;
  font-weight: 600;
}
.following {
  text-align: right;
  width: 100px;
  color: #2bb13b;
  font-size: 12px;
  text-transform: lowercase;
  font-weight: 600;
}
.betAmount {
  font-weight: 600;
  color: #333;
}
</style>
