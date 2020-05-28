<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    :right="right"
    temporary
    class="slide-navbar"
  >
    <v-list class="pa-0 pr-0 text-primary">
      <v-list-tile class="pr-0">
        <v-list-tile-content>
          <v-list-tile-title class="text-uppercase"
            ><em>{{ $t(`${title}`) }}</em></v-list-tile-title
          >
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="drawer = !drawer" v-if="!isHideClear">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-list-tile>
    </v-list>
    <slot></slot>
    <!-- apply button -->
    <!-- <v-layout style="bottom: 0;position: fixed;width: 100%; background-color:#003e70">
        <v-btn block color="#003e70" large class="white--text">apply</v-btn>
      </v-layout>-->
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    right: {
      type: Boolean,
      default: false
    },
    isHideClear: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    showMenu() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style>
.slide-navbar {
  height: 66%;
  margin-top: 77px;
  transform: translateX(0px);
  width: 300px;
}
</style>
