<template>
  <div style="margin-bottom:250px">
    <v-layout wrap>
      <v-flex
        xs6
        d-flex
        v-for="(stockid, index) in getStockMultiGame"
        :key="stockid"
      >
        <div class="border-flex">
          <multigame
            :class="index % 2 == 0 ? 'pl-0' : 'pr-0'"
            :stockid="stockid"
          ></multigame>
        </div>
      </v-flex>
      <v-flex
        xs6
        class="pt-5 d-flex align-center"
        v-if="getStockMultiGame.length < 4"
      >
        <div>
          <stockSelect />
        </div>
      </v-flex>
      <v-tooltip>
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            rigth
            fab
            @click="$router.push(closeFullscreen)"
            class="fullscreenclose"
            dark
            v-on="on"
            title="Full Screen"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-layout>
    <bottomBetMultigame></bottomBetMultigame>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import multigame from "~/components/modern/multigame";
import stockSelect from "~/components/stockSelect";
import bottomBetMultigame from "~/components/modern/bottomBetMultigame";
import secureStorage from "../../../plugins/secure-storage";

export default {
  layout: "desktopModern",
  components: {
    stockSelect,
    multigame,
    bottomBetMultigame
  },
  data() {
    return {};
  },

  mounted() {
    // call this every page that used "dekstopModern" layout to hide loading
    this.setIsLoadingStockGame(false);

    this.addStockMultiGame(this.$route.params.id);
  },
  methods: {
    ...mapActions(["addStockMultiGame", "setIsLoadingStockGame"])
  },
  computed: {
    closeFullscreen() {
      let fullscreenClose = secureStorage.getItem("fullscreenclosed");
      if (
        secureStorage.getItem("fullscreenclosed") == null ||
        secureStorage.getItem("fullscreenclosed") == "undefined"
      ) {
        fullscreenClose = "desktop";
      }
      return `/modern/${fullscreenClose}/${this.$route.params.id}`;
    },
    ...mapGetters(["getStockMultiGame"])
  }
};
</script>

<style scoped>
.border-flex {
  padding: 15px;
  min-height: 550px;
}

.fullscreenclose {
  position: fixed !important;
  border-radius: 180px;
  bottom: 100px;
  right: 0px;
  width: 50px;
  height: 50px;
  color: #fff;
  background: linear-gradient(
    215deg,
    rgba(156, 44, 205, 1) 35%,
    rgba(121, 59, 204, 1) 100%
  );
}

.fullscreenclose .v-icon {
  font-weight: 800;
  font-size: 30px;
}
</style>
