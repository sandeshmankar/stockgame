<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <!-- filter -->
    <SlideMenu class="mt-5" ref="refslideleft" title="filter">
      <v-list class="pt-0 text-primary" dense>
        <!-- filter stock name -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2" @click="showfilterStock = !showfilterStock">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">{{
              $t("stock")
            }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <div
          class="filter-centent-container text-uppercase text-primary pa-0"
          v-show="showfilterStock"
        >
          <div class="item-content text-color">
            <v-checkbox
              v-model="filter.stock.china"
              color="#003e70"
              label="china"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="filter.stock.usa"
              color="#003e70"
              label="usa"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="filter.stock.crypto"
              color="#003e70"
              label="crypto"
              hide-details
            ></v-checkbox>
          </div>
        </div>
        <!--filter game type -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2">
          <v-list-tile-content @click="showfilterType = !showfilterType">
            <v-list-tile-title class="text-uppercase">{{
              $t("gameType")
            }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <div
          class="filter-centent-container text-uppercase text-primary pa-0"
          v-show="showfilterType"
        >
          <div class="item-content text-color">
            <v-checkbox
              v-model="filter.gameType.loop1"
              color="#003e70"
              label="1 minute"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="filter.gameType.loop5"
              color="#003e70"
              label="5 minute"
              hide-details
            ></v-checkbox>
          </div>
        </div>

        <v-divider></v-divider>
        <v-list-tile class="py-2" @click="defaultFilter">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">{{
              $t("default")
            }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
    </SlideMenu>
    <!-- sort -->
    <SlideMenu
      class="filter-style mt-5"
      ref="refslideright"
      title="sort"
      :right="true"
    >
      <v-list class="pt-0 text-primary" dense>
        <!-- sort stock name -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2" @click="sortBy = 'name'">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">{{
              $t("stockList.stockName")
            }}</v-list-tile-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-icon class="icon-primary" v-if="sortBy === 'name'">done</v-icon>
        </v-list-tile>

        <!--sort game type -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2" @click="sortBy = 'type'">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">{{
              $t("stockType")
            }}</v-list-tile-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-icon class="icon-primary" v-if="sortBy === 'type'">done</v-icon>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="py-2" @click="sortBy = ''">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">{{
              $t("default")
            }}</v-list-tile-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <!-- <v-btn icon class="hidden-xs-only" @click.stop="drawer = !drawer">
                    <v-icon class="icon-primary">done</v-icon>
          </v-btn>-->
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
      <v-spacer></v-spacer>
    </SlideMenu>
    <div class="text-center mt-2">
      <v-flex order-xs6 class="text-center d-flex justify-center">
        <v-btn text flat @click="filterClick" class="buttonGreen">
          <span class="body-2 uppercase-text white--text">{{
            $t("filter")
          }}</span>
        </v-btn>
        <!-- </v-flex>
        <v-flex offset-xs6 class="text-center d-flex justify-center">-->
        <v-btn text flat @click="sortClick" class="buttonGreen">
          <span class="body-2 uppercase-text white--text">{{
            $t("sort")
          }}</span>
        </v-btn>
      </v-flex>
    </div>
    <v-layout row wrap px-2 pt-2>
      <v-flex pa-1 v-for="(data, index) in showStocks" :key="index" xs6 sm4 md4>
        <nuxt-link :to="'/modern/betting/' + data.stockName">
          <v-card class="v-card-style chartDesign">
            <!-- bet close -->
            <div
              class="close-bet-chart"
              v-if="
                getTimerByStockName(data.stockName) &&
                  getTimerByStockName(data.stockName).stockStatus === 'Closed'
              "
            >
              <span class="text-close-bet">{{ $t('msg.marketClosed') }}</span>
            </div>
            <v-card-title class="px-1 py-0 pa-2" style="font-size:11px;">
              <v-layout>
                <v-flex xs6 class="text-xs-left">
                  <span class="text-primary">{{
                    getStockLiveTime(data.stockName).split(" ")[1]
                  }}</span>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs6 class="text-xs-right">
                  <span class="text-price">
                    {{ getStockLivePrice(data.stockName) }}
                  </span>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-text class="pa-0" min-height="156">
              <chartIndex :stockName="data.stockName"></chartIndex>
            </v-card-text>
          </v-card>
          <div class="pt-2">
            <h3 class="text-primary text-uppercase text-center">
              {{ data.stockName }}
            </h3>
            <h4 style="line-height: 1">
              <div class="text-center">
                <em>{{ data.loop }}  {{ $t("msg.minuteGame") }} </em>
              </div>
            </h4>
          </div>
        </nuxt-link>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import chartIndex from "~/components/mobile/chartIndex";
import SlideMenu from "~/components/mobile/SlideMenu.vue";

export default {
  components: {
    SlideMenu,
    chartIndex
  },
  data() {
    return {
      sortBy: "",
      filter: {
        stock: {
          china: true,
          usa: true,
          crypto: true
        },
        gameType: {
          loop1: true,
          loop5: true
        }
      },
      checkbox1: false,
      showfilterStock: false,
      showfilterType: false
    };
  },
  computed: {
    ...mapGetters([
      "getAllStocks",
      "getTimerByStockName",
      "getStockLiveTime",
      "getStockLivePrice"
    ]),
    showStocks() {
      let result = [];
      let stockType = [];
      this.getAllStocks.forEach(element => {
        // filter type
        if (element.type === "crypto") {
          this.filter.stock.crypto == true ? stockType.push(element) : "";
        } else if (element.type === "china") {
          this.filter.stock.china == true ? stockType.push(element) : "";
        } else {
          this.filter.stock.usa == true ? stockType.push(element) : "";
        }
      });
      // filter loop
      stockType.forEach(element => {
        if (element.loop === 1) {
          this.filter.gameType.loop1 == true ? result.push(element) : "";
        } else if (element.loop === 5) {
          this.filter.gameType.loop5 == true ? result.push(element) : "";
        }
      });
      // sort by name function
      function sortByName(a, b) {
        if (a.stockName < b.stockName) {
          return -1;
        }
        if (a.stockName > b.stockName) {
          return 1;
        }
        return 0;
      }
      // sort by type function
      function sortByType(a, b) {
        if (a.type < b.type) {
          return -1;
        }
        if (a.type > b.type) {
          return 1;
        }
        return 0;
      }
      if (this.sortBy === "name") {
        result.sort(sortByName);
      } else if (this.sortBy === "type") {
        result.sort(sortByType);
      }
      return result;
    }
  },
  methods: {
    defaultFilter() {
      this.filter.stock.china = true;
      this.filter.stock.usa = true;
      this.filter.stock.crypto = true;
      this.filter.gameType.loop1 = true;
      this.filter.gameType.loop5 = true;
    },
    filterClick() {
      this.$refs.refslideleft.showMenu();
    },
    sortClick() {
      this.$refs.refslideright.showMenu();
    }
  }
};
</script>

<style scoped>
.chartDesign {
  border-radius: 5px;
  border: 1px solid #dddddd;
}
.text-price {
  color: green;
  font-size: 14px;
}

.filter-style {
  height: 66% !important;
  transform: translateX(0px);
  width: 300px !important;
}
.filter-centent-container {
  display: flex;
  flex-direction: column;
}
.item-content {
  padding: 15px;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
}
</style>
