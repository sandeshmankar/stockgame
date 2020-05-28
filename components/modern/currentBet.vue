<template>
  <v-layout row class="justify-center">
    <v-flex md10 lg10 mt-5>
      <v-data-table
        :items="currentBets"
        :rows-per-page-items="[10]"
        ref="table"
        :search="search"
        class="current-bet"
      >
        <v-progress-linear
          v-slot:progress
          color="blue"
          indeterminate
        ></v-progress-linear>
        <template v-slot:headers="headers">
          <tr class="tableStyle">
            <th scope="col">{{ $t("msg.betId") }}</th>
            <th scope="col">{{ $t("msg.gameId") }}</th>
            <th scope="col">{{ $t("msg.betDetail") }}</th>
            <th scope="col">{{ $t("msg.time") }}</th>
            <th scope="col">{{ $t("msg.amount") }}</th>
            <th scope="col">{{ $t("msg.payout") }}</th>
            <th scope="col">{{ $t("msg.betStatus") }}</th>
          </tr>
        </template>
        <template v-slot:items="item">
          <td>{{ item.item.betUUID }}</td>
          <td>{{ item.item.gameUUID }}</td>
          <td>
            {{ item.item.ruleName }} - ({{ item.item.payout }})
            {{ item.item.stockName }} / {{ item.item.loop }}
            {{ $t("msg.minutes") }}
          </td>
          <td>{{ item.item.createdDate }} {{ item.item.createdTime }}</td>
          <td>{{ item.item.betAmount | toCurrency }}</td>
          <td>{{ item.item.payout }}</td>
          <td v-if="item.item.betResult == 'win'">
            <v-chip
              color="green"
              text-color="white"
              class="text-uppercase betresult"
              >{{ $t("msg.win") }}</v-chip
            >
          </td>
          <td v-if="item.item.betResult == 'lose'">
            <v-chip
              color="red"
              text-color="white"
              class="text-uppercase betresult"
              >{{ $t("msg.lose") }}</v-chip
            >
          </td>
          <td v-if="item.item.betResult == 'pending'">
            <v-chip
              color="yellow "
              text-color="black"
              class="text-uppercase betresult"
              >{{ $t("msg.pending") }}...</v-chip
            >
          </td>
        </template>
        <template slot="no-data">
          <td colspan="7">
            {{ $t("currentBet.noBets") }}
          </td>
        </template>
        <template slot="footer">
          <tr>
            <td>{{ $t("msg.total") }}</td>
            <td colspan="3">
              {{ currentBets.length }} {{ $t("leaderBoard.bets") }}
            </td>
            <td>
              <strong>{{ TotalAmount | toCurrency }}</strong>
            </td>
            <td colspan="2"></td>
          </tr>
        </template>
      </v-data-table>
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
      // format the value to the curreny
      if (typeof value !== "number") {
        // defind the value is number not string
        return value; // after the value is not a number  we return value out
      }
      var formatter = new Intl.NumberFormat("en-US", {
        // if the value is number
        style: "currency", // you also can change the curreny to other curreny that you like
        currency: "USD", // in this case we choose the USD
        minimumFractionDigits: 0 // minumum the value is not equal than 0
      });
      return formatter.format(value); // after get the currency that you prefer, than we return out with value
    }
  },
  computed: {
    TotalAmount() {
      // make the new value to make the frontend get this value from the computed
      let total = null; // create the new varible before return
      this.currentBets.map(item => {
        // before loading component the computed we defind the value from props
        total += item.betAmount; // after get the value from props, you have the plus the value with the value with lenght
      });
      return total; // after get the value, return the value out.
    }
  }
};
</script>
<style scoped>
.lose {
  border-radius: 15px;
  padding: 4px 10px;
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #e05858;
}
.win {
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
</style>
