<template>
  <v-expansion-panel v-model="panel" >
    <v-expansion-panel-content class="ruleActive ruleHeading">
      <template v-slot:header>
        <div>
          <span class="rules">
            {{ $t("gamemsg.firstdigit") }} (????.<b class="headline1">?</b>?)
          </span>
        </div>
      </template>
      <v-card>
        <v-card-text class="white">
          <span class="text-blue">{{ $t("gamemsg.small") }}</span> – 0, 1, 2, 3,
          4
          <br />
          <span class="text-success">{{ $t("gamemsg.big") }}</span> – 5, 6, 7,
          8, 9
          <br />
          <span class="text-purple">{{ $t("gamemsg.even") }}</span> – 0, 2, 4,
          6, 8
          <br />
          <span class="text-yellow">{{ $t("gamemsg.odd") }}</span> – 1, 3, 5, 7,
          9
          <br />
          <span class="text-blue-light">{{ $t("gamemsg.high") }}</span> – 0, 1,
          2, 3
          <br />
          <span class="text-blue-dark">{{ $t("gamemsg.mid") }}</span> – 4, 5, 6
          <br />
          <span class="text-dont-no">{{ $t("gamemsg.low") }}</span> – 7, 8, 9
          <br />
          <span class="text-red">{{ $t("gamemsg.number") }}</span> – 0, 1, 2, 3,
          4, 5, 6, 7, 8, 9
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>

    <v-expansion-panel-content class="ruleActive ruleHeading">
      <template v-slot:header>
        <div >
          <span class="rules">
            {{ $t("gamemsg.lastdigit") }} (????.?
            <b class="headline1">?</b>)
          </span>
        </div>
      </template>
      <v-card>
        <v-card-text class="white">
          <span class="text-blue">{{ $t("gamemsg.small") }}</span> – 0, 1, 2, 3,
          4
          <br />
          <span class="text-success">{{ $t("gamemsg.big") }}</span> – 5, 6, 7,
          8, 9
          <br />
          <span class="text-purple">{{ $t("gamemsg.even") }}</span> – 0, 2, 4,
          6, 8
          <br />
          <span class="text-yellow">{{ $t("gamemsg.odd") }}</span> – 1, 3, 5, 7,
          9
          <br />
          <span class="text-blue-light">{{ $t("gamemsg.high") }}</span> – 0, 1,
          2, 3
          <br />
          <span class="text-blue-dark">{{ $t("gamemsg.mid") }}</span> – 4, 5, 6
          <br />
          <span class="text-dont-no">{{ $t("gamemsg.low") }}</span> – 7, 8, 9
          <br />
          <span class="text-red">{{ $t("gamemsg.number") }}</span> – 0, 1, 2, 3,
          4, 5, 6, 7, 8, 9
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>

    <v-expansion-panel-content class="ruleActive ruleHeading">
      <template v-slot:header>
        <div>
          <span class="rules">
            {{ $t("gamemsg.bothdigit") }} (????. ?+?
            <b class="headline1">=??</b>
            )
          </span>
        </div>
      </template>
      <v-card>
        <v-card-text class="white">
          <span class="text-blue">{{ $t("gamemsg.small") }}</span>– 1, 2, 3, 4, 5, 6, 7, 8, 9
          <br />
          <span class="text-success">{{ $t("gamemsg.big") }}</span> – 10, 11,
          12, 13, 14, 15, 16, 17, 18
          <br />
          <span class="text-success">{{ $t("gamemsg.tie") }}</span> – 0
          <br />
          <span class="text-purple">{{ $t("gamemsg.even") }}</span> – 0, 2, 4,
          6, 8, 10, 12, 14, 16, 18
          <br />
          <span class="text-yellow">{{ $t("gamemsg.odd") }}</span> – 1, 3, 5, 7,
          9, 11, 13, 15, 17
          <br />
          <span class="text-blue-light">{{ $t("gamemsg.high") }}</span> – 0,
          1, 2, 3, 4, 5
          <br />
          <span class="text-blue-dark">{{ $t("gamemsg.mid") }}</span> – 6, 7, 8,
          9, 10, 11
          <br />
          <span class="text-dont-no">{{ $t("gamemsg.low") }}</span> –12, 13, 14,
          15, 16, 17, 18
          <br />
          <span class="text-red">{{ $t("gamemsg.number") }}</span> – 0, 1, 2, 3,
          4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
    <v-expansion-panel-content class="ruleActive ruleHeading">
      <template v-slot:header>
        <div >
          <span class="rules">
            {{ $t("gamemsg.twodigit") }} (????.
            <b class="headline1">??</b>)
          </span>
        </div>
      </template>
      <v-card>
        <v-card-text class="white">
          <span class="text-blue">{{ $t("gamemsg.small") }}</span> – 01, 02, 03,
          04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
          38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49
          <br />
          <span class="text-success">{{ $t("gamemsg.big") }}</span> – 50, 51, 52,
          53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
          70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
          87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99
          <br />
          <span class="text-success">{{ $t("gamemsg.tie") }}</span> – 00
          <br />
          <span class="text-purple">{{ $t("gamemsg.even") }}</span> – 00, 02,
          04, 06, 08, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
          38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70,
          72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98
          <br />
          <span class="text-yellow">{{ $t("gamemsg.odd") }}</span> –01, 03, 05,
          07, 09, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39,
          41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73,
          75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99
          <br />
          <span class="text-blue-light">{{ $t("gamemsg.high") }}</span> – 00,
          01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17,
          18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33
          <br />
          <span class="text-blue-dark">{{ $t("gamemsg.mid") }}</span> – 34, 35,
          36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
          53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66
          <br />
          <span class="text-dont-no">{{ $t("gamemsg.low") }}</span> – 67, 68,
          69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
          86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99
          <br />
          <span class="text-red">{{ $t("gamemsg.number") }}</span> – 00, 01, 02,
          03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
          54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
          71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
          88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  data() {
    return {
      panel: 0
    };
  },
  methods: {
    setActive(e) {
      $(".ruleHeading").removeClass("ruleHeading");
      $(e.target.parentElement.parentElement).addClass("ruleHeading");
    }
  }
};
</script>

<style>
.v-expansion-panel {
  background-color: #f2f4ff;
  border: none;
}

.theme--light.v-expansion-panel
  .v-expansion-panel__container
  .v-expansion-panel__header
  .v-expansion-panel__header__icon
  .v-icon {
  color: #ffffff !important;
}
.rules {
  color: #ffffff;
  background-color: #0b2a68;
}

.rules span {
  /* color: #0b2a68; */
  background-color: #ffffff;
}

.rules-active {
  background-color: #ffffff;
}

.rules-active span {
  /* color: #0b2a68; */
  background-color: #c9c8c8;
}

.ruleActive {
  /* border-radius: 10px; */
  margin: 7px;
  border: 1px solid #dddddd;
}
.ruleHeading {
  background: linear-gradient(to right, #0b2a68 30%, #0b2a68 51%);
  color: #ffffff;
  text-transform: capitalize;
  border-radius: 10px;
}

.headline1 {
  color: red;
}
</style>
