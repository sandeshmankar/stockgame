<template>
  <div>
    <breadcrumbs
      :title="$t('breadcrumbs.betHistory')"
      linkItem="current-bet"
      :titlebtn="$t('breadcrumbs.currentBet')"
    />
    <section class="filter">
      <v-container>
        <v-layout class="filter-history" align-center justify-center>
          <v-flex xs12 sm12 md5 lg5>
            <v-layout>
              <v-flex xs12 sm12 md4>
                <v-menu
                  v-model="from"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      hide-details
                      v-model="dateFrom"
                      :label="$t('msg.from')"
                      append-icon="fa-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker color="#1db42f" :max="maxDate" v-model="dateFrom" @input="from = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-menu
                  v-model="to"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      hide-details
                      v-model="dateTo"
                      :label="$t('msg.to')"
                      append-icon="fa-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker color="#1db42f" :max="maxDate" v-model="dateTo" @input="to = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm12 md2>
                <v-btn class="goButton" @click="searchBetHistory()">
                  <i v-if="loadingImage" class="fa fa-circle-o-notch fa-spin"></i>
                  &nbsp;{{ $t("msg.go") }}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm12 md2 lg2></v-flex>
          <v-flex xs12 sm12 md3 lg3>
            <v-layout>
              <v-flex xs6 md6>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  :placeholder="$t('betHistory.searchByName')"
                  single-line
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex xs6 md>
                <v-select
                  @change="sortingBy"
                  v-model="sortby"
                  hide-details
                  :items="[$t('betHistory.today'),$t('betHistory.thisWeek'),$t('betHistory.thisMonth')]"
                  :placeholder="$t('msg.sortBy')"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <!-- Bet History Data Table -->
    <bethistory :search="search" :userBetHistory="userBetHistory" />
  </div>
</template>
<script>
import bethistory from "~/components/modern/betHistory";
import breadcrumbs from "~/components/breadcrumbs";
import { mapState } from "vuex";
import config from "../../../config/config.global";
import secureStorage from "../../../plugins/secure-storage";

export default {
  layout: "desktopModern",
  components: {
    breadcrumbs,
    bethistory
  },
  data() {
    return {
      today: new Date(),
      sortby: "",
      maxDate: new Date().toISOString(),
      search: "",
      loadingImage: false,
      dateFrom: "",
      from: false,
      dateTo: "",
      to: false,
      // dropdown_font: [
      //   this.$root.$t("bethistory.today"),
      //   this.$root.$t("bethistory.thisWeek"),
      //   this.$root.$t("bethistory.thisMonth")
      // ],
      userBetHistory: []
    };
  },
  computed: {
    // Get 2 data from vuex first, in the computed
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    })
  },
  mounted() {
    const lastWeek = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getDate() - 7
    )
      .toISOString()
      .substr(0, 10);
    this.dateFrom = lastWeek;
    this.dateTo = this.today.toISOString().substring(0, 10);
    this.fetchBetHsitory();
  },
  methods: {
    // Sorting By Today,Week, Month
    sortingBy() {
      if (this.sortby == "Today") {
        const lastWeek = new Date(
          this.today.getFullYear(),
          this.today.getMonth(),
          this.today.getDate() + 1
        )
          .toISOString()
          .substr(0, 10);
        this.dateFrom = lastWeek;
        this.dateTo = this.today.toISOString().substring(0, 10);
        this.fetchBetHsitory();
      } else if (this.sortby == "This Week") {
        const lastWeek = new Date(
          this.today.getFullYear(),
          this.today.getMonth(),
          this.today.getDate() - 5
        )
          .toISOString()
          .substr(0, 10);
        this.dateFrom = lastWeek;
        this.dateTo = this.today.toISOString().substring(0, 10);
        this.fetchBetHsitory();
      } else if (this.sortby == "This Month") {
        const lastWeek = new Date(
          this.today.getFullYear(),
          this.today.getMonth(),
          this.today.getDate() - 30
        )
          .toISOString()
          .substr(0, 10);
        this.dateFrom = lastWeek;
        this.dateTo = this.today.toISOString().substring(0, 10);
        this.fetchBetHsitory();
      }
    },
    searchBetHistory() {
      this.loadingImage = true;
      if (this.dateFrom && this.dateTo) {
        this.fetchBetHsitory();
      }
    },
    // Fetch bet History user wise
    async fetchBetHsitory() {
      try {
        var reqBody = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          version: config.version,
          betResult: [0, 1],
          dateRangeFrom: this.dateFrom,
          dateRangeTo: this.dateTo
        };
        var { data } = await this.$axios.post(config.getAllBets.url, reqBody, {
          headers: config.header
        });
        if (data.status) {
          this.userBetHistory = data.data;
          this.loadingImage = false;
        } else {
          throw new Error(data.message);
          this.loadingImage = false;
        }
      } catch (ex) {
        console.log(data.message);
        this.$swal({
          title: ex.message,
          type: "error",
          timer: 1000
        });
        this.loadingImage = false;
      }
    }
  }
};
</script>

<style scoped>
.filter {
  background-color: #fff;
  padding: 25px;
}
.goButton {
  background-color: #1db42f;
  color: #fff !important;
  font-size: 16px;
  border-radius: 8px;
  height: 40px;
  background: rgba(10, 177, 118, 1);
  background: -moz-linear-gradient(
    left,
    rgba(10, 177, 118, 1) 0%,
    rgba(14, 177, 30, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(10, 177, 118, 1)),
    color-stop(100%, rgba(14, 177, 30, 1))
  );
  -webkit-box-shadow: 17px -5px 133px 6px rgba(186, 186, 186, 0.64);
  -moz-box-shadow: 17px -5px 133px 6px rgba(186, 186, 186, 0.64);
  box-shadow: 17px -5px 133px 6px rgba(186, 186, 186, 0.64);
  background: -webkit-linear-gradient(
    left,
    rgba(10, 177, 118, 1) 0%,
    rgba(14, 177, 30, 1) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(10, 177, 118, 1) 0%,
    rgba(14, 177, 30, 1) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(10, 177, 118, 1) 0%,
    rgba(14, 177, 30, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(10, 177, 118, 1) 0%,
    rgba(14, 177, 30, 1) 100%
  );
  filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#0ab176', endColorstr='#0eb11e', GradientType=1);
}
</style>
