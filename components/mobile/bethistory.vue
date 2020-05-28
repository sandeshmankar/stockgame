<template>
  <div>
    <v-list-tile v-if="userBetHistory.length == 0" class="notBets">
      <h3>{{ $t("betHistory.noBets") }}.</h3>
    </v-list-tile>
    <v-list three-line v-if="userBetHistory.length > 0">
      <template
        v-for="(item, index) in userBetHistory"
        style="margin-bottom:50px;"
      >
        <v-list-tile
          :key="item.betUUID"
          @click="
            betDetails(
              item.betUUID,
              item.gameDraw,
              item.rollingAmount,
              item.betAmount
            )
          "
        >
          <v-list-tile-content>
            <v-list-tile-sub-title class="headingTitle"
              >{{ item.ruleName }} - ({{ item.payout }})
              {{ item.stockName }}</v-list-tile-sub-title
            >
            <v-list-tile-sub-title>
              <span
                class="lastDraw"
                v-html="$options.filters.lastDraw(item.gameDraw)"
              ></span>
            </v-list-tile-sub-title>
            <v-list-tile-sub-title
              >{{ item.createdDate }}
              {{ item.createdTime }}</v-list-tile-sub-title
            >
          </v-list-tile-content>

          <v-list-tile-action>
            <span v-if="item.betResult == 'lose'" class="lossAmount"
              >-{{ item.betAmount | toCurrency }}</span
            >
            <span v-if="item.betResult == 'win'" class="winAmount"
              >+{{ item.rollingAmount | toCurrency }}</span
            >
            <div v-if="item.isFollowBet == 1" class="following">
              {{ $t("betHistory.byFollowers") }}
            </div>
            <div v-if="item.isFollowBet == 0" class="original">
              {{ $t("betHistory.original") }}
            </div>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider :key="index"></v-divider>
      </template>

      <v-layout text-center mb-5>
        <v-flex>
          <v-btn color="buttonGreen" v-on:click="loadMore()" text>{{
            $t("stockList.loadMore")
          }}</v-btn>
        </v-flex>
      </v-layout>

      <div class="footer" v-if="userBetHistory.length > 0">
        <div>
          <span>
            <strong>{{ $t("betHistory.bets") }} :</strong>
            {{ userBetHistory.length }}
          </span>
          <span>
            <strong>{{ $t("betHistory.total") }}</strong>
            :{{ TotalAmount | toCurrency }}
          </span>
          <span v-if="TotalAmount < TotalRolling">
            <strong>{{ $t("betHistory.rolling") }}</strong> :
            <span style="color:#FFF;">
              {{ TotalRolling | toCurrency }}
            </span>
          </span>

          <span v-if="TotalAmount > TotalRolling">
            <strong>{{ $t("betHistory.rolling") }}</strong> :
            <span style="color: #c13f3f;font-weight: 800;">{{
              TotalRolling | toCurrency
            }}</span>
          </span>
        </div>
      </div>
    </v-list>

    <!-- Follow and UnFollow Diealog Box -->
    <v-dialog v-model="dialog" width="500" class="betDetails">
      <v-card>
        <h1 class="betId">{{ $t("betHistory.bets") }} #{{ this.betUUID }}</h1>

        <v-layout class="betWrap">
          <v-flex xs6 sm6 class="betSide">
            <span>{{ $t("betHistory.betDraw") }}</span>

            <h4 v-html="$options.filters.lastDraw(this.gameDraw)"></h4>
          </v-flex>
          <v-flex xs6 sm6 class="betSide">
            <div v-if="this.rollingAmount == 0">
              <span>{{ $t("betHistory.yourLosingAmount") }}</span>
              <h4 class="lossAmount">{{ this.betAmount }}</h4>
            </div>
            <div v-if="this.rollingAmount != 0">
              <span>{{ $t("betHistory.yourWinningAmount") }}</span>
              <h4 class="winAmount">{{ this.rollingAmount }}</h4>
            </div>
          </v-flex>
        </v-layout>
        <v-flex class="allDigit">
          FD
          <span v-html="$options.filters.firstDigit(this.gameDraw)"></span>
          LD
          <span v-html="$options.filters.lastDigit(this.gameDraw)"></span>
          BD
          <span v-html="$options.filters.bothDigit(this.gameDraw)"></span>
          TD
          <span v-html="$options.filters.twoDigit(this.gameDraw)"></span>
        </v-flex>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["userBetHistory"],
  data() {
    return {
      betAmount: "",
      betUUID: "",
      gameDraw: "",
      rollingAmount: "",
      dialog: false,
      rowPageCount: 10,
      dateTo: new Date().toISOString().substr(0, 10),
      dateFrom: new Date().toISOString().substr(0, 10),
      from: false,
      to: false,
      items: ["Today", "This Week", "This Month"],
      itemss: "",
      itemspage: [5, 10, 25, 50, 100],
      itemspages: 5,
      load: false,
      history: [],
      StockName: null,
      stockId: null,
      sumTotalbetAmount: 0,
      sumTotalrollingAmount: 0,
      page: 1,
      search: "",
      pagination: {
        page: 1
      },
      itemlimit: [100, 300, 500, "all"],
      limit: "",
      limits: -1,
      selected: []
    };
  },
  filters: {
    toCurrency(value) {
      if (typeof value !== "number") {
        return value;
      }
      var formatter = new Intl.NumberFormat("en-US", {
        // if the value is number
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
      this.userBetHistory.map(item => {
        total += item.betAmount;
      });
      return total;
    },
    TotalRolling() {
      let total = null;
      this.userBetHistory.map(item => {
        total += item.rollingAmount;
      });
      return total;
    }
  },
  methods: {
    loadMore() {   
      this.$emit("userLimit");
    },
    betDetails(betUUID, gameDraw, rollAmount, amount) {
      this.dialog = true;
      this.betUUID = betUUID;
      this.gameDraw = gameDraw;
      this.rollingAmount = rollAmount;
      this.betAmount = amount;
    },
    setZero(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    }
  }
};
</script>
<style scoped>
.allDigit {
  padding: 10px;
  text-align: center !important;
  font-size: 12px;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
}
.allDigit span {
  border: 1px solid #a4a4a4;
  color: red;
  font-size: 14px;
  padding: 0px 6px;
  border-radius: 4px;
  margin: 0px 5px;
}

.betId {
  padding: 10px;
  color: #676768;
  font-size: 14px;
  text-align: center;
}
.betWrap {
  background-color: #f5f6fd;
}
.betWrap .betSide {
  padding: 15px 10px;
  text-align: center;
  border: 1px solid #dddddd;
}
.betWrap .betSide span {
  font-size: 14px;
  color: #676768;
  font-weight: 600;
}
.footerWrap {
  text-align: center;
}
.footer {
  left: 0;
  width: 100%;
  background-color: #2bb03e;
  padding: 10px 0px;
  position: fixed;
  bottom: 0;
  color: #fff;
  border-top: 2px solid #1bba33;
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
.lastDraw {
  background-color: #dddddd;
  padding: 0px 6px;
  font-weight: 600;
  border-radius: 4px;
}
.headingTitle {
  font-weight: 600;
  color: #003f70 !important;
  font-size: 14px;
}
.totalRollingWin {
  font-weight: 800;
  color: green;
}
.totalRollingLoss {
  font-weight: 800;
  color: red;
}

.winning {
  color: green;
  font-weight: 800;
}
.losing {
  color: red;
  font-weight: 800;
}
.selectRow {
  cursor: pointer;
}
.extraInfo {
  padding: 10px;
  height: 70px;
  background-color: #f3f3f3;
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
.pending {
  border-radius: 15px;
  padding: 4px 16px;
  color: #333;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #fec623;
}

.gameDraw {
  border: 1.5px solid #3a79ff;
  border-radius: 8px;
  padding: 4px 20px;
  font-size: 16px;
  font-weight: 600;
}
.winAmount {
  font-size: 16px;
  color: #0eb03e;
  font-weight: 600;
}
.lossAmount {
  font-size: 16px;
  color: #d23a4e;
  font-weight: 600;
}
.allDigit {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
}
.allDigit span {
  border: 1px solid #a4a4a4;
  color: red;
  font-size: 16px;
  padding: 0px 6px;
  border-radius: 4px;
  margin: 0px 5px;
}
</style>
