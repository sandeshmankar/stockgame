<template>
  <div v-if="dataArray.length > 0">
    <v-layout wrap row pl-3 pa-2>
      <v-flex xs1 md1 lg1 xl1 v-if="!isFullscreen" mt-4>
        <v-layout>
          <v-flex xs9 lg8>
            <v-btn
              block
              class="text-white firstDigit"
              color="#003e70"
              @click="changeChartType('firstDigit')"
            >{{ $t("gamemsg.firstdigits") }}</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex class="triangle-right" v-show="activeType == 'firstDigit'"></v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs9 lg8>
            <v-btn
              block
              class="text-white lastDigit"
              color="#003e70"
              @click="changeChartType('lastDigit')"
            >{{ $t("gamemsg.lastdigits") }}</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex class="triangle-right" v-show="activeType == 'lastDigit'"></v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs9 lg8>
            <v-btn
              block
              class="text-white bothDigit"
              color="#003e70"
              @click="changeChartType('bothDigit')"
            >{{ $t("gamemsg.bothdigits") }}</v-btn>
          </v-flex>
          <v-spacer></v-spacer>

          <v-flex class="triangle-right" v-show="activeType == 'bothDigit'"></v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs9 lg8>
            <v-btn
              block
              class="text-white twoDigit"
              color="#003e70"
              @click="changeChartType('twoDigit')"
            >{{ $t("gamemsg.twodigits") }}</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex class="triangle-right" v-show="activeType == 'twoDigit'"></v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs9 md10 lg11 xl11>
        <v-layout row wrap>
          <v-flex xs12 lg12 md12 style="position:relative">
            <slot></slot>
            <trendMap
              :dataArray="dataArray"
              :trendType="activeType"
              :isFullscreen="isFullscreen"
              :key="
                dataArray[dataArray.length - 1].stockTimeStamp +
                  activeType +
                  getLocale
              "
            ></trendMap>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import trendMap from "~/components/modern/trendMap";
export default {
  data() {
    return {
      trendTypes: ["firstDigit", "lastDigit", "bothDigit", "twoDigit"],
      trendType: null
    };
  },
  props: {
    index: {
      type: Number
    },
    dataArray: {
      type: Array,
      required: true
    },
    isShowMultigameButton: {
      type: Number,
      required: true
    },
    isFullscreen: {
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  components: {
    trendMap
  },
  computed: {
    ...mapGetters(["getLocale"]),
    activeType() {
      if (this.trendType === null) {
        return this.trendTypes[this.index];
      } else {
        return this.trendType;
      }
    }
  },
  methods: {
    changeChartType(value) {
      this.trendType = value;
    }
  }
};
</script>

<style scoped>
.triangle-right {
  width: 0;
  height: 0;
  border-top: 18px solid transparent;
  border-left: 20px solid #2754af;
  border-bottom: 18px solid transparent;
  align-self: center;
}
</style>
