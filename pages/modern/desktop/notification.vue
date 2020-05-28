<template>
  <div>
    <breadcrumbs :title="$t('breadcrumbs.notification')" />
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md12 mt-5>
          <notification :notificationData="notificationData" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import breadcrumbs from "~/components/breadcrumbs";
import notification from "~/components/modern/notification";
import config from "~/config/config.global";
import secureStorage from "../../../plugins/secure-storage";
//const { Translate } = require("@google-cloud/translate").v2;

export default {
  layout: "desktopModern",
  components: {
    notification,
    breadcrumbs
  },
  data() {
    return {
      window: 0,
      tabs: ["notification"],
      active: null,
      notificationData: []
    };
  },
  async created() {
    await this.fetch();
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    })
  },
  methods: {
    async fetch() {
      try {
        var reqBody = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          version: config.version
        };
        var res = await this.$axios.$post(
          config.getUserNotification.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (res.status) {
          this.notificationData = res.data;
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
    }
  }
};
</script>
