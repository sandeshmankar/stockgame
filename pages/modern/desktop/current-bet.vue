<template>
  <div>
    <breadcrumbs
      :title="$t('breadcrumbs.currentBet')"
      linkItem="bet-history"
      :titlebtn="$t('breadcrumbs.betHistory')"
    />
    <v-container>
      <!-- Send Data to currentBet Component -->
      <currentBet :currentBets="currentBets" />
    </v-container>
  </div>
</template>
<script>
import currentBet from "~/components/modern/currentBet";
import breadcrumbs from "~/components/breadcrumbs";
import { mapState } from "vuex";
import config from "~/config/config.global";
import secureStorage from "../../../plugins/secure-storage";

export default {
  layout: "desktopModern",
  components: {
    currentBet,
    breadcrumbs
  },
  data() {
    return {
      currentBets: []
    };
  },
  computed: {
    // Get 2 Data from vuex first, in the computed
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }) 
  },
  mounted() {
    this.currentBetData();
  },
  methods: {
    async currentBetData() {
      try {
        var reqBody = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          version: config.version,
          betResult: [-1]
        };
        var { data } = await this.$axios.post(config.getAllBets.url, reqBody, {
          headers: config.header
        });
        if (data.status) {
          this.currentBets = data.data;
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.error(ex);
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
