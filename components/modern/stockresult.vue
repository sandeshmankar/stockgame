<template>
  <div>
    <v-layout>
      <v-flex pa-2 class="headerStockBar">{{ $t("msg.stockResult") }}</v-flex>
    </v-layout>
    <v-layout>
      <!-- bet result -->
      <v-flex v-if="showStockresult == true">
        <h4 class="text-center">Please Wait...</h4>
      </v-flex>
      <v-flex v-if="showStockresult == false">
        <div class="table-responsive">
          <table class="table">
            <tr>
              <th>{{ $t("msg.stockName") }}</th>
              <th>{{ $t("msg.time") }}</th>
              <th>{{ $t("msg.result") }}</th>
            </tr>
            <tr
              v-for="(data, index) in getStockResult"
              :key="index"
              v-show="getStockResult.length > 0"
            >
              <td>
                <nuxt-link :to="'/modern/desktop/' + data.stockName">
                  {{ $t(`stockName.${data.stockName}`) }}
                  {{ data.stockName == "btc5" ? "5" : "" }}
                </nuxt-link>
              </td>
              <td class="text-xs-center">{{ data.stockTimeStamp }}</td>
              <td class="text-xs-center">{{ roundValue(data.stockValue) }}</td>
            </tr>
          </table>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import config from "~/config/config.global";
import secureStorage from "../../plugins/secure-storage";

export default {
  data() {
    return {
      showStockresult: true,
      selected: 1,
      getStockResult: [],
      apiAttemptCount: 0
    };
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }) //get 2 data from vuex first, in the computed
  },
  mounted() {
    this.stockResult();
  },

  methods: {
    roundValue(value) {
      return `${Number(value).toFixed(2)}`;
    },
    onlyTime(value) {
      let d = value.split(" ");
      return d[1];
    },
    async stockResult() {
      try {
        var reqBody = {
          portalProviderUUID: this.portalProviderUUID,
          version: config.version
        };
        var { data } = await this.$axios.post(config.getAllStock.url, reqBody, {
          headers: config.header
        });
        if (data.status) {
          this.apiAttemptCount = 0;
          this.showStockresult = false;
          this.getStockResult = data.data;
        } else {
          if(this.apiAttemptCount < 3) {
            this.apiAttemptCount++;
            this.stockResult();
          } else {
            throw new Error(config.error.general);
          }
        }
      } catch (ex) {
        console.log(ex);
        this.$swal({
          title: ex.message,
          type: "error",
          timer: 1000
        });
      }
    }
  }
};
</script>
<style scoped>
.betTab {
  border-top: 1px solid #dddddd;
}
.activeTab {
  background-color: #0b2a68;
  color: #fff;
}
table {
  border-collapse: collapse;
  width: 100%;
  border-right: #ddd;
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
  font-weight: 400;
  text-align: center;
  padding: 5px;
  border: 1px solid #ddd;
}
.flex-cursor {
  cursor: pointer;
  height: 100%;
  width: 100%;
}
.table-responsive {
  overflow: hidden;
}
</style>
