<template>
  <v-container>
    <v-layout row class="justify-center">
      <v-flex md10 lg10>
        <v-data-table
          hide-actions
          :items="betHistory"
          :pagination.sync="pagination"
          :rows-per-page-items="[rowPageCount]"
          ref="table"
          class="current-bet"
          show-expand
        >
          <template v-slot:headers="headers">
            <tr class="tableStyle">
              <th scope="col" class="bg-colors">{{ $t("msg.betId") }}</th>
              <th scope="col" class="bg-colors">{{ $t("msg.gameId") }}</th>
              <th scope="col" class="bg-colors">{{ $t("msg.betDetail") }}</th>
              <th scope="col" class="bg-colors">{{ $t("msg.time") }}</th>
              <th scope="col" class="bg-colors">{{ $t("msg.amount") }}</th>
              <th scope="col" class="bg-colors">{{ $t("msg.payout") }}</th>
              <th scope="col" class="bg-colors">{{ $t("msg.betStatus") }}</th>
            </tr>
          </template>
          <template v-slot:items="item">
            <tr @click="clicked(item.item.betUUID)" class="selectRow">
              <td>
                <a href="#">{{ item.item.betUUID }}</a>
              </td>
              <td>{{ item.item.gameUUID }}</td>
              <td>
                {{ item.item.ruleName }} - ({{ item.item.payout }})
                {{ item.item.stockName }} / {{ item.item.loop }}
                {{ $t("msg.minutes") }}
              </td>
              <td>{{ item.item.createdDate }} {{ item.item.createdTime }}</td>
              <td>{{ item.item.betAmount | toCurrency }}</td>

              <td v-if="item.item.betResult == 'win'">
                <span class="winning">{{ item.item.rollingAmount }}</span>
              </td>
              <td v-if="item.item.betResult == 'lose'">
                <span class="losing">- {{ item.item.betAmount }}</span>
              </td>
              <td
                v-if="item.item.isFollowBet == 1"
                class="text-uppercase text-center"
              >
                <div class="following">{{ $t("currentBet.byFollowers") }}</div>
              </td>
              <td v-if="item.item.isFollowBet == 0" class="text-uppercase">
                <div class="original">{{ $t("currentBet.original") }}</div>
              </td>
            </tr>
            <tr style="display:none;" class="extraInfo" :id="item.item.betUUID">
              <td colspan="2">
                <span class="betDraw">{{ $t("betHistory.betDraw") }} : </span>
                <span
                  class="gameDraw"
                  v-html="$options.filters.lastDraw(item.item.gameDraw)"
                ></span>
              </td>
              <td colspan="3" class="allDigit">
                {{ $t("gamemsg.firstdigit") }}
                <span
                  v-html="$options.filters.firstDigit(item.item.gameDraw)"
                ></span>
                {{ $t("gamemsg.lastdigit") }}
                <span
                  v-html="$options.filters.lastDigit(item.item.gameDraw)"
                ></span>
                {{ $t("gamemsg.bothdigit") }}
                <span
                  v-html="$options.filters.bothDigit(item.item.gameDraw)"
                ></span>
                {{ $t("gamemsg.twodigit") }}
                <span
                  v-html="$options.filters.twoDigit(item.item.gameDraw)"
                ></span>
              </td>
              <td colspan="2" v-if="item.item.rollingAmount == 0">
                <span class="betDraw"
                  >{{ $t("betHistory.yourLosingAmount") }} :</span
                >
                <span class="lossAmount">{{ item.item.betAmount }}</span>
              </td>
              <td colspan="3" v-if="item.item.rollingAmount != 0">
                <span class="betDraw"
                  >{{ $t("betHistory.yourWinningAmount") }} :</span
                >
                <span class="winAmount">{{ item.item.rollingAmount }}</span>
              </td>
            </tr>
          </template>
          <template slot="no-data">
            <td colspan="7">
              {{ $t("betHistory.noBets") }}
            </td>
          </template>
          <template slot="footer">
            <tr>
              <td>{{ $t("msg.total") }}</td>
              <td colspan="3">
                {{ betHistory.length }} {{ $t("leaderBoard.bets") }}
              </td>
              <td>
                <strong>{{ TotalAmount | toCurrency }}</strong>
              </td>
              <td>
                <span
                  class="totalRollingWin"
                  v-if="TotalAmount < TotalRolling"
                  >{{ TotalRolling | toCurrency }}</span
                >
                <span
                  class="totalRollingLoss"
                  v-if="TotalAmount > TotalRolling"
                  >{{ TotalRolling | toCurrency }}</span
                >
              </td>
              <td colspan="1"></td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-layout row class="justify-center">
      <v-flex md10 lg10>
        <div class="text-right my-3 my-pagination" v-if="betHistory.length > 4">
          <v-pagination
            v-model="pagination.page"
            color="#1db42f"
            :length="Math.ceil(betHistory.length / rowPageCount)"
          ></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ["userBetHistory", "search"],
  data: () => ({
    rowPageCount: 10,
    pagination: {
      page: 1
    }
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
  methods: {
    clicked(betUUID) {
      // $(".extraInfo").hide();
      $("#" + betUUID).toggle();
    }
  },
  computed: {
    //Filter Bet Details Content
    betHistory() {
      return this.userBetHistory.filter(data => {
        return data.ruleName.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    TotalAmount() {
      let total = null;
      this.betHistory.map(item => {
        total += item.betAmount;
      });
      return total;
    },
    TotalRolling() {
      let totalRolling = null;
      let totalbBetting = null;
      this.betHistory.map(item => {
        totalRolling += item.rollingAmount;
        if (item.betResult == "lose") {
          totalbBetting += item.betAmount;
        }
      });
      return totalRolling - totalbBetting;
    }
  }
};
</script>
<style scoped>
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
  margin: 0 auto;
  width: 150px;
  border-radius: 15px;
  padding: 4px 10px;
  color: #333333;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #fec623;
}
.following {
  margin: 0 auto;
  width: 150px;
  border-radius: 15px;
  padding: 4px 16px;
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #2bb13b;
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
.betDraw {
  color: #545353;
  font-size: 16px;
  font-weight: 600;
}
.gameDraw {
  border: 1.5px solid #3a79ff;
  border-radius: 8px;
  padding: 4px 20px;
  font-size: 16px;
  font-weight: 600;
}
.winAmount {
  border: 1.5px solid #0eb03e;
  border-radius: 8px;
  padding: 4px 20px;
  font-size: 16px;
  color: #0eb03e;
  font-weight: 600;
}
.lossAmount {
  border: 1.5px solid #fc0020;
  border-radius: 8px;
  padding: 4px 12px;
  font-size: 16px;
  color: #fc0020;
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
