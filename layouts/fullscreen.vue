<template>
  <v-app>
    <div style="height:100%">
      <nuxt />
    </div>
    <!-- Chat Windows-->
    <chat-box
      :gameUUID="getGameUUIDByStockName($route.params.id)"
      :stockName="$route.params.id"
      :pathName="$route.name"
    ></chat-box>
  </v-app>
</template>
<script>
import invitation from "~/components/invitation";
import chatBox from "~/components/modern/chatBox";

import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      stockName: null
    };
  },
  components: {
    invitation,
    chatBox
  },
  created() {
    let path = this.$nuxt.$route.fullPath.split("/");
    this.stockName = path[3];
    this.connectUserBalanceSocket();
  },
  computed: {
    ...mapGetters([
      "getGameUUIDByStockName",
      "getUserUUID",
      "getPortalProviderUUID"
    ])
  },
  methods: {
    ...mapActions(["setUserBalance"]),
    listenUserBalance({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    connectUserBalanceSocket() {
      this.listenUserBalance(
        {
          channelName: `balanceUpdate.${this.getUserUUID}`,
          eventName: "balanceUpdate"
        },
        ({ data }) => {
          try {
            var logData = data;
            if (data.status) {
              this.setUserBalance(data.data.userBalance);
            } else {
              throw new Error(config.error.general);
            }
          } catch (ex) {
            console.log(ex);
          }
        }
      );
    }
  },
  beforeDestroy() {
    window.Echo.leaveChannel(`balanceUpdate.${this.getUserUUID}`);
  }
};
</script>
