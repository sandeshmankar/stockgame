<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <v-layout row wrap>
      <v-flex xs12 md12>
        <notification :notificationData="notificationData" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import config from "~/config/config.global";
import notification from "~/components/mobile/notification";
import secureStorage from "../../plugins/secure-storage";

export default {
  layout: "default",
  components: {
    notification
  },
  data() {
    return {
      window: 0,
      tabs: ["notification"],
      active: null,
      notificationData: []
    };
  },
  created() {
    this.fetch();
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
          // console.log(this.notificationData,"Notification response");
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

<style>
.light-toobar h1 {
  padding: 0px 20px;
}
</style>
