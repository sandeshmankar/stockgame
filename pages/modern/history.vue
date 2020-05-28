<template>  
    <bethistory :search="search" :userBetHistory="userBetHistory"   @userLimit="loadMoreData" />
</template>

<script>
import bethistory from "~/components/mobile/bethistory";
import breadcrumbs from "~/components/breadcrumbs";
import { mapState } from "vuex";
import config from "~/config/config.global";
import secureStorage from "../../plugins/secure-storage";

export default {
  layout: "default",
  components: {
    breadcrumbs,
    bethistory
  },
  data() {
    return {
      betDataLimit : 10,
      today: new Date(),
      sortby: "",
      search: "",
      loadingImage: false,
      dateFrom: "",
      from: false,
      dateTo: "",
      to: false,
      dropdown_font: [
        this.$root.$t("betHistory.today"),
        this.$root.$t("betHistory.thisWeek"),
        this.$root.$t("betHistory.thisMonth")
      ],
      userBetHistory: []
    };
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }) //get 2 data from vuex first, in the computed
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
    loadMoreData(){
     this.betDataLimit += 10;   
     this.fetchBetHsitory();
    },
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
    async fetchBetHsitory() {
      try {
        var reqBody = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          version: config.version,
          betResult: [0, 1],
          dateRangeFrom: this.dateFrom,
          dateRangeTo: this.dateTo,
          limit : this.betDataLimit
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
        console.log(ex);
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
.input-text {
  border-radius: 5px;
  height: 44px;
  border: 1px solid;
}
.lose {
  border-radius: 15px;
  padding: 4px 10px;
  color: #fff;
  font-size: 13px;
  text-transform: uppercase;
  background-color: #e05858;
}
.win {
  border-radius: 15px;
  padding: 4px 16px;
  color: #fff;
  font-size: 13px;
  text-transform: uppercase;
  background-color: #2bb13b;
}
.pending {
  border-radius: 15px;
  padding: 4px 16px;
  color: #333;
  font-size: 13px;
  text-transform: uppercase;
  background-color: #fec623;
}

label,
.v-select__selection,
.text-white {
  color: white !important;
}

.toolbar-bg {
  background-color: rgb(22, 83, 136);
}

.toolbar-text {
  background-color: white;
  color: black;
  border-bottom: outset;
}

.v-window__container .v-window-item .layout .flex .v-input {
  margin: 0px;
}

.v-window__container
  .v-window-item
  .layout
  .flex
  .v-input
  .v-input__control
  .bg-colors {
  background-color: #9b2121 !important;
  border-radius: 2px;
}

.v-window__container
  .v-window-item
  .layout
  .flex
  .v-input
  .v-input__control
  .v-input__slot
  .v-text-field__slot
  input {
  color: #fff !important;
  font-size: 1.2rem;
  padding: 11px;
}

.goButton {
  /* padding: 6px 4px; */
  background-color: #003e70 !important;
  color: #fff;
  height: 100%;
  margin-top: 0px;
  left: -8px;
  width: 100%;
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
