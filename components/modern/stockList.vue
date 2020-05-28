<template>
  <div>
    <v-layout>
      <v-flex pa-2 class="headerStockBar">{{ $t("menu.stockList") }}</v-flex>
    </v-layout>
    <v-flex id="style-3">
      <div class="table-responsive">
        <table class="table">
          <tr>
            <th>{{ $t("msg.stockName") }}</th>
            <th>{{ $t("msg.livePrice") }}</th>
            <th>{{ $t("msg.status") }}</th>
            <th>{{ $t("msg.countDown") }}</th>
          </tr>
          <tr v-for="(stock, index) in getStockListPrice[0]" :key="stock.stockUUID">
            <td>
              <nuxt-link :to="'/modern/desktop/' + stock.stockName">
                {{ $t(`stockName.${stock.stockName}`)
                }}{{ stock.stockName == "btc5" ? "5" : "" }}
              </nuxt-link>
            </td>
            <td
              v-html="
                getStockListPrice.length > 1
                  ? $options.filters.livePriceColor(
                      stock.stockPrice,
                      getStockListPrice[1][index].stockPrice
                    )
                  : stock.stockPrice
              "
            ></td>

            <td>
              <span
                v-if="stock.stockStatus === 'Closed'"
                :style="{ color: 'red' }"
              >{{$t("msg.closed")}}</span>
              <span
                v-if="
                  stock.stockStatus !== 'Closed' && getStockListCountdown[index]
                "
              >
                {{
                getStockListCountdown[index].gameEndTimeCountDownInSec
                | betstatus(getStockLoop(stock.stockName))
                }}
              </span>
            </td>
            <td>
              <span v-if="getStockListCountdown[index]">
                {{
                getStockListCountdown[index].gameEndTimeCountDownInSec
                | lotterydraw(getStockLoop(stock.stockName))
                }}
              </span>
            </td>
          </tr>
        </table>
      </div>
    </v-flex>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getStockLoop",
      "getStockListPrice",
      "getStockListCountdown"
    ])
  }
};
</script>
<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  border-right: #ddd;
  text-transform: uppercase;
}

td a {
  color: #003e70 !important;
}
th {
  background-color: #cccccc;
}

th {
  text-transform: capitalize;
  padding: 5px;
}
td {
  text-align: center;
  padding: 5px;
  border: 1px solid #ddd;
}

.table-responsive {
  overflow: hidden;
}
</style>
