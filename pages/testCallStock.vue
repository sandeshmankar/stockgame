<template>
  <v-container class="mt-3">
    <stockSelect :items="SelectStockItems.data" />
  </v-container>
</template>

<script>
import stockSelect from "~/components/stockSelect";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    stockSelect
  },
  data: () => ({
    stock: [],
    SelectStockItems: []
  }),
  mounted() {
    this.listenForBroadcast(
      {
        channelName: "roadMap.88778f4f-610b-4ec3-937d-65ef7bf24af5",
        eventName: "roadMap"
      },
      ({ data }) => {
        this.SelectStockItems = data;
        console.log(data);
      }
    );
  },

  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID
    })
  },
  methods: {
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName)
        .listen(eventName, callback)
        .on("pusher:subscription_succeeded", member => {});
    }
  }
};
</script>
