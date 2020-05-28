<template>
  <v-layout wrap pa-2 v-if="dataArray.length > 0">
    <v-flex lg2 md2 pt-5>
      <v-select
        v-model="trendType"
        :items="typeItems"
        item-text="value"
        item-value="name"
        :height="10"
        solo
        class="rounded-card"
      ></v-select>
      <v-select
        v-model="which_one"
        :items="which_oneItem"
        item-text="value"
        item-value="name"
        solo
        class="rounded-card"
      ></v-select>
    </v-flex>
    <!-- TrendMap Start -->
    <v-flex lg10 md10>
      <trendMap
        v-if="which_one !== ''"
        :dataArray="dataArray"
        :key="
          dataArray[dataArray.length - 1].stockTimeStamp +
            '-' +
            trendType +
            '-' +
            which_one
        "
        :isFullscreen="true"
        :which_one="which_one"
        :trendType="trendType"
      ></trendMap>
    </v-flex>
    <!-- TrendMap Start -->
  </v-layout>
</template>
<script>
import { mapGetters } from "vuex";

import trendMap from "~/components/modern/trendMap";

export default {
  props: {
    dataArray: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      trendType: null,
      selectedType: "",
      typeItems: [
        {
          id: 1,
          name: "firstDigit",
          value: this.$root.$t("gamemsg.firstdigit")
        },
        {
          id: 2,
          name: "lastDigit",
          value: this.$root.$t("gamemsg.lastdigit")
        },
        {
          id: 3,
          name: "bothDigit",
          value: this.$root.$t("gamemsg.bothdigit")
        },
        {
          id: 4,
          name: "twoDigit",
          value: this.$root.$t("gamemsg.twodigit")
        }
      ],
      which_oneItem: [
        {
          id: 1,
          name: "B/S",
          value:
            this.$root.$t("gamemsg.big") + "/" + this.$root.$t("gamemsg.small")
        },
        {
          id: 2,
          name: "O/E",
          value:
            this.$root.$t("gamemsg.odd") + "/" + this.$root.$t("gamemsg.even")
        },
        {
          id: 3,
          name: "U/L",
          value:
            this.$root.$t("gamemsg.high") +
            "/" +
            this.$root.$t("gamemsg.mid") +
            "/" +
            this.$root.$t("gamemsg.low")
        },
        {
          id: 4,
          name: "NUM",
          value: this.$root.$t("gamemsg.number")
        }
      ],
      which_one: "B/S"
    };
  },
  components: {
    trendMap
  },
  computed: {},
  mounted() {
    this.trendType = this.typeItems[this.index]["name"];
  },
  methods: {},
  watch: {
    // which_one() {
    //   alert(this.which_one);
    // }
  }
};
</script>
