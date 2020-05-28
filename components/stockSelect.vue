<template>
  <v-layout wrap class="select-stock mt-2">
    <v-flex md3>
      <v-select
        v-model="stock"
        :items="items"
        full-width
        solo
        hide-details
        class="selectStock"
        color="blue"
        label="select stock"
        item-text="type"
        item-value="name"
        return-object
      ></v-select>
    </v-flex>
    <v-flex md3>
      <v-select
        v-model="stockName"
        :items="stockNames"
        label="Stock Name"
        class="selectStock"
        prepend-icon="navigate_next"
        color="blue"
        full-width
        solo
        hide-details
        id="stockName"
        item-text="stockName"
        item-value="name"
        return-object
      ></v-select>
    </v-flex>
    <v-flex md3>
      <v-select
        v-model="minute"
        :items="minutes"
        label="min"
        class="selectStock"
        prepend-icon="navigate_next"
        color="blue"
        full-width
        solo
        hide-details
        item-text="loopName"
        item-value="loopName"
        return-object
        id="minute"
      >
        <template slot="selection" slot-scope="data"
          >{{ data.item.loopName }} min
        </template>
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-tile-content>{{ data.loopName }} min</v-list-tile-content>
          </template>
          <template v-else>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ data.item.loopName }} min
              </v-list-tile-title>
            </v-list-tile-content>
          </template>
        </template>
      </v-select>
    </v-flex>
    <v-flex md3>
      <v-text-field
        v-model="gameId"
        label="game id"
        prepend-icon="navigate_next"
        color="blue"
        full-width
        solo
        hide-details
        disabled
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; // impor the vuex library frist, before use vuex
import config from "../config/config.global";
import secureStorage from "../plugins/secure-storage";

export default {
  data() {
    return {
      stockSocket: false,
      stock: "",
      stockName: "",
      minute: "",
      gameId: "",
      items: [],
      minutes: [],
      stockNames: []
    };
  },
  created() {
    sessionStorage.setItem("STOCK_FULL_URL", this.$route.path);
    const GET_STOCK_TYPE = sessionStorage.getItem("STOCK_TYPE");
    sessionStorage.setItem("STOCK_URL", this.$route.params.id);
    if (GET_STOCK_TYPE !== "crypto") {
      sessionStorage.setItem("STOCK_LOOP", 5);
    } else {
      let stockURL = this.$route.params.id;
      let stockURLName = stockURL.substring(0, stockURL.length - 1);
      let stockURLLoop = stockURL.substr(stockURL.length - 1);
      sessionStorage.setItem("STOCK_LOOP", stockURLLoop);
    }
    this.getActiveGamesByCategory();
  },
  watch: {
    stock(value) {
      let GET_STOCK_TYPE = sessionStorage.getItem("STOCK_TYPE");
      if (value.type === GET_STOCK_TYPE) {
        this.stockSocket = true;
        // this.stockName = ""; // after value is not empty we clear the value is first
        this.stockNames = [];
        this.stockNames = value.stocks;
        $("#stockName").click();
      }

      // when value is changed this value will do the list
      if (this.stockSocket) {
        // check the stockSocket is come or not
        this.stockSocket = false; // after value is come we set value of stickSocket is flase
      } else {
        // after value is false the logic will be come in this case
        if (value !== "") {
          sessionStorage.setItem("STOCK_TYPE", value.type);
          // this.stockName = "";
          this.stockNames = value.stocks;
          $("#stockName").click();
        }
        this.stockSocket = true;
      }
    },
    stockName(value) {
      let GET_STOCK_TYPE = sessionStorage.getItem("STOCK_TYPE");
      if (value.stockName !== undefined) {
        sessionStorage.setItem("STOCK_NAME", this.stockName.stockName);
      }
      if (this.stock.type === GET_STOCK_TYPE) {
        this.minute = "";
        this.minutes = value.loops;
        $("#minute").click();
      }
    },
    minute(value) {
      if (value.loopName !== undefined) {
        sessionStorage.setItem("STOCK_LOOP", value.loopName);
        const GET_STOCK_TYPE = sessionStorage.getItem("STOCK_TYPE");
        if (GET_STOCK_TYPE == "crypto") {
          if (this.stockName === "btc") {
            sessionStorage.setItem(
              "STOCK_URL",
              this.stockName + value.loopName
            );
          } else {
            sessionStorage.setItem(
              "STOCK_URL",
              this.stockName.stockName + value.loopName
            );
          }
        } else {
          sessionStorage.setItem("STOCK_URL", this.stockName.stockName);
        }
      }
      if (value !== "") {
        this.gameId = "";
        this.gameId = value.gameID;
      }
    },
    gameId(value) {
      const GET_STOCK_URL = sessionStorage.getItem("STOCK_URL");
      const GET_STOCK_TYPE = sessionStorage.getItem("STOCK_TYPE");
      const GET_STOCK_NAME = sessionStorage.getItem("STOCK_NAME");
      const GET_STOCK_LOOP = sessionStorage.getItem("STOCK_LOOP");
      const GET_STOCK_FULL_URL = sessionStorage.getItem("STOCK_FULL_URL");
      if (GET_STOCK_FULL_URL !== `/modern/desktop/${GET_STOCK_URL}`) {
        //check multi game
        if (this.$route.name === "modern-desktop-id") {
          this.$router
            .replace(`/modern/desktop/${GET_STOCK_URL}`)
            .catch(ex => {});
        } else {
          // if is multi game then add selected game
          this.addStockMultiGame(GET_STOCK_URL);
        }
      }
    },
    getStockCategory(val) {
      this.items = val;
      this.updateGameUUID(val);
    }
  },
  computed: {
    ...mapGetters(["getStockCategory", "getPortalProviderUUID"])
  },
  methods: {
    ...mapActions(["addStockMultiGame", "setGameId", "setStockCategory"]),
    async getActiveGamesByCategory() {
      try {
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          version: config.version
        };
        var res = await this.$axios.$post(
          config.getActiveGamesByCategory.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (res.status) {
          this.getGameUUID(res.data);
          this.setStockCategory(res.data);
          this.items = res.data;
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.log(ex);
        this.$swal({
          title: ex.message,
          type: "error",
          timer: 1000
        });
      }
    },
    getGameUUID(items) {
      let stockURL = this.$route.params.id;
      let stockURLName = stockURL.substring(0, stockURL.length - 1);
      let stockURLLoop = stockURL.substr(stockURL.length - 1);
      const crypto = items.find(item => {
        if (item.type === "crypto") {
          if (item.stocks.find(({ stockName }) => stockName === stockURLName)) {
            this.stock = item.type;
            sessionStorage.setItem("STOCK_TYPE", item.type);
            item.stocks.map(stockN => {
              this.stockName = stockN.stockName;
              this.stockNames.push(stockN.stockName);
              stockN.loops.map(minute => {
                if (minute.loopName == stockURLLoop) {
                  this.minute = minute.loopName;
                  this.minutes.push(minute);
                  this.setGameId(minute.gameID);
                  this.gameId = minute.gameID;
                }
              });
            });
          }
        } else {
          if (item.stocks.find(({ stockName }) => stockName === stockURL)) {
            this.stock = item.type;
            sessionStorage.setItem("STOCK_TYPE", item.type);
            item.stocks.map(stockN => {
              if (stockN.stockName == stockURL) {
                this.stockName = stockN.stockName;
                this.stockNames.push(stockN.stockName);
                stockN.loops.map(minute => {
                  this.minute = minute.loopName;
                  this.minutes.push(minute);
                  this.setGameId(minute.gameID);
                  this.gameId = minute.gameID;
                });
              }
            });
          }
        }
      });
      this.stockSocket = true;
    },
    updateGameUUID(items) {
      let stockURL = this.$route.params.id;
      let stockURLName = stockURL.substring(0, stockURL.length - 1);
      let stockURLLoop = stockURL.substr(stockURL.length - 1);
      const crypto = items.find(item => {
        if (item.type === "crypto") {
          if (item.stocks.find(({ stockName }) => stockName === stockURLName)) {
            item.stocks.map(stockN => {
              stockN.loops.map(minute => {
                if (minute.loopName == stockURLLoop) {
                  this.gameId = minute.gameID;
                  this.setGameId(minute.gameID);
                }
              });
            });
          }
        } else {
          if (item.stocks.find(({ stockName }) => stockName === stockURL)) {
            item.stocks.map(stockN => {
              if (stockN.stockName == stockURL) {
                stockN.loops.map(minute => {
                  this.gameId = minute.gameID;
                  this.setGameId(minute.gameID);
                });
              }
            });
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.v-list {
  font-size: 12px;
}
</style>
