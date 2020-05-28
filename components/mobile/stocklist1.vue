<template>
  <v-flex xs12 class="mt-1">
    <div class="v-table__overflow">
      <table class="v-datatable v-table theme--light">
        <thead>
          <tr>
            <th>{{$t('msg.Stock Name')}}</th>
            <th>{{$t("msg.liveprice")}}</th>
            <th class="text-left">{{$t("msg.reference")}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in desserts" :key="index">
            <td>{{item.stockName}}</td>
            <td
              :class="{'text-red': currentPrice,'text-green': !currentPrice}"
            >{{checkStock(item.stockPrice)}}</td>
            <td class="text-left">
              <a
                :href="item.referenceUrl"
                target="_blank"
                style="overflow-y: auto; white-space: nowrap;"
              >
                <b>{{item.referenceUrl}}</b>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </v-flex>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["item"],
  data() {
    return {
      items: ["day", "weeks", "months", "years"],
      last_price: 0,
      stockStatus: false,
      currentPrice: null,
      head: [
        { text: "stock name", value: "stockName" },
        { text: "live price", value: "stockOpenOrClosed" },
        { text: "reference", value: "referenceUrl" }
      ],
      desserts: []
    };
  },
  mounted() {
    this.listenForBroadcast(
      {
        channelName: "stockList.0c0de128-e2bd-41f1-a8ec-40a57c72bae5",
        eventName: "stockList"
      },
      ({ data }) => {
        this.desserts = data.data.stockData;
      }
    );
  },
  watch: {
    item(val) {
      function compare(a, b) {
        if (val == "ascending") {
          if (a.stockName < b.stockName) return -1;
          if (a.stockName > b.stockName) return 1;
          return 0;
        } else {
          if (a.stockName < b.stockName) return 1;
          if (a.stockName > b.stockName) return -1;
          return 1;
        }
      }
      return this.desserts.sort(compare);
    }
  },
  computed: {
    ...mapGetters(["getStockList", "getLivePrice", "getPreviousPrice"])
  },
  methods: {  
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },

    checkStock(value) {
      let close = {};
      if (value == "") {
        close = "Close";
        this.stockStatus = true;
      } else if (value) {
        if (this.last_price > value) {
          // console.log("DOWN " + value);
          this.currentPrice = false;
        } else {
          // console.log("UP " + value);
          this.currentPrice = true;
        }
        this.last_price = value;
        close = value;
      } else {
        close = "NO DATA";
      }
      return close;
    }
  }
};
</script>
<style scoped>
.bg-colors {
  background-color: #003e70 !important;
}
</style>