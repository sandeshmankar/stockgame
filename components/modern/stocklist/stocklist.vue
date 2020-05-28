<template>
  <v-flex xs12 class="mt-3" v-if="getStockListPrice.length > 0">
    <div class="v-table__overflow">
      <table>
        <thead>
          <tr>
            <th>{{ $t("msg.stockName") }}</th>
            <th>{{ $t("msg.livePrice") }}</th>
            <th class="text-left">{{ $t("msg.reference") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in stockLists[0]" :key="item.stockUUID">
            <td>
              <b>{{ item.stockName.toUpperCase() }}</b>
            </td>
            <td v-if="item.stockStatus == 'Closed'" :style="{ color: 'red' }">
              Closed
            </td>
            <td
              v-if="item.stockStatus !== 'Closed'"
              v-html="
                stockLists.length > 1
                  ? $options.filters.livePriceColor(
                      item.stockPrice,
                      stockLists[1][index].stockPrice
                    )
                  : item.stockPrice
              "
            ></td>
            <td class="text-left">
              <a
                :href="item.stockReference"
                target="_blank"
                style="overflow-y: auto; white-space: nowrap;"
              >
                <b>{{ item.stockReference }}</b>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </v-flex>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import config from "~/config/config.global";
import stockListVue from '../../../pages/modern/desktop/stock-list.vue';
export default {
  props: {
    sortBy: {
      type: String
    }
  },
  computed: {
    ...mapGetters(["getStockListPrice"]),
    stockLists() {
      function sortByAsc(a, b) {
        if (a.stockName < b.stockName) {
          return -1;
        }
        if (a.stockName > b.stockName) {
          return 1;
        }
        return 0;
      }
      function sortByDesc(a, b) {
        if (a.stockName < b.stockName) {
          return 1;
        }
        if (a.stockName > b.stockName) {
          return -1;
        }
        return 0;
      }
      let stockNewList = [];
      if (this.sortBy === "asc") {
        stockNewList.push(this.getStockListPrice[0].sort(sortByAsc));
        stockNewList.push(this.getStockListPrice[1].sort(sortByAsc));
      } else  if (this.sortBy === "desc") {
        stockNewList.push(this.getStockListPrice[0].sort(sortByDesc));
        stockNewList.push(this.getStockListPrice[1].sort(sortByDesc));
      }else{
        stockNewList.push(this.getStockListPrice[0]);
        stockNewList.push(this.getStockListPrice[1]);
      }
      return stockNewList;
    }
  }
};
</script>
<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  text-align: center;
  padding: 15px 10px;
  border: 1px solid #dddddd;
  background-color: #fff;
}

th {
  background-color: #fff;
  padding: 10px;
  font-size: 16px;
  color: #8c8c8c;
}
</style>
