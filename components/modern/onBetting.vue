<template>
  <v-layout column wrap>
    <v-btn class="buttonGreen" :to="'/modern/desktop/current-bet'">{{ $t("msg.viewAllResults") }}</v-btn>

    <v-flex pa-2 class="headerStockBar">{{ $t("msg.betting") }}</v-flex>

    <v-flex class="text-xs-center" style="overflow-y: auto;height:200px">
      <h3 v-show="getOnGoingBet.length <= 0" class="pa-5 noBetting">{{ $t("msg.noBetting") }}</h3>

      <v-list three-line class="pa-0" v-show="getOnGoingBet.length > 0">
        <template v-for="(data, index) in getOnGoingBet" class="pa-0">
          <v-divider :key="index" v-if="index > 0"></v-divider>

          <v-list-tile :key="data.index" avatar class="listBet">
            <v-list-tile-content>
              <span class="current-bet">
                <table>
                  <tr>
                    <td>
                      <label>{{$t("liveBetData.betID")}}</label>
                    </td>
                    <td>{{ data.betUUID }}</td>
                  </tr>
                  <tr>
                    <td>
                      <label>{{$t("liveBetData.dateTime")}}</label>
                    </td>
                    <td>{{ data.betDate }} {{ data.betTime }}</td>
                  </tr>
                  <tr>
                    <td>
                      <label>{{$t("liveBetData.bet")}}</label>
                    </td>
                    <td>{{ data.betAmount }} on {{ data.ruleName }}</td>
                  </tr>
                  <tr>
                    <td>
                      <label>{{$t("liveBetData.stockName")}}:</label>
                    </td>
                    <td>{{ data.stockName }}</td>
                  </tr>
                </table>
              </span>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-flex>
    <v-flex pa-2 class="totalAmount">$ {{ getBettingAmount }}</v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getOnGoingBet", "getBettingAmount"])
  }
};
</script>
<style scoped>
.noBetting {
  color: #acacac;
}
.totalAmount {
  font-size: 20px;
}
.current-bet {
  padding: 10px 0px;
  width: 100%;
}
.current-bet label {
  color: #333;
  font-weight: 800;
}
.listBet {
  padding: 5px 0px;
}
table {
  width: 100%;
  border: none;
}
table tr {
  width: 100%;
}
table tr td:first-child {
  width: 40%;
}

.current-bet {
  font-size: 12px;
  color: #000;
}

::-webkit-scrollbar {
  width: 8px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 7px #acacac;
  border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #acacac;
  border-radius: 15px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2c6b9e;
}
</style>
