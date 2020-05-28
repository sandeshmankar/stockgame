<template>
  <div>
    <v-card class="my-bg pa-5">
      <v-layout row wrap justify-center></v-layout>
      <v-switch :label="$t('msg.music')" v-model="switch1" inset></v-switch>
      <v-slider
        v-model="length"
        color="#003e70"
        min="1"
        max="15"
        :label="$t('msg.customLength')"
      ></v-slider>
      <v-layout row wrap justify-center>
        <v-btn class="my-btn">{{ $t("msg.save") }}</v-btn>
        <v-btn class="my-btn cancel">{{ $t("msg.cancel") }}</v-btn>
      </v-layout>
    </v-card>
  </div>
</template>
<script>
import { Howl, Howler } from "howler";
export default {
  data() {
    return {
      switch1: true,
      length: 5
    };
  },
  watch: {},
  mounted() {
    Howler.volume(0.1);
  }
};
</script>
