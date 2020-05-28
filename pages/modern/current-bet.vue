<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <currentbet :currentBets="currentBets"></currentbet>
  </div>
</template>

<script>
import currentbet from "~/components/mobile/currentbet";
import config from "~/config/config.global";
import { mapState } from "vuex";
import secureStorage from "../../plugins/secure-storage";

export default {
  layout: "",
  components: {
    currentbet
  },
  data() {
    return {
      currentBets: []
    };   
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }) //get 2 data from vuex first, in the computed
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        var reqBody = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          version: config.version,
          betResult: [-1],
          limit: "20",
          offset: "0"
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
        console.log(ex);
      }
    }
  }
};
</script>
