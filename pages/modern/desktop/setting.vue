<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 md2>
        <v-item-group
          v-model="window"
          class="shrink mr-4"
          mandatory
          tag="v-flex"
        >
          <v-item v-for="n in tabs" :key="n">
            <div slot-scope="{ active, toggle }">
              <v-btn
                :input-value="active"
                block
                class="main-btn"
                @click="toggle"
                >{{ $t("menu." + n) }}</v-btn
              >
            </div>
          </v-item>
        </v-item-group>
      </v-flex>
      <v-flex xs12 md10>
        <v-window v-model="window" class="elevation-1" vertical>
          <!-- rules -->
          <v-window-item>
            <chipamount />
          </v-window-item>
          <!-- rules -->
          <!-- stock list -->
          <v-window-item>
            <soundcontrol />
          </v-window-item>
          <!-- stock list -->
        </v-window>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import chipamount from "~/components/modern/setting/chipamout";
import soundcontrol from "~/components/modern/setting/soundcontrol";

export default {
  layout: "desktopModern",
  components: {
    chipamount,
    soundcontrol
  },
  data() {
    return {
      window: 0,
      tabs: ["chip amount", "sound control"],
      active: null
    };
  },
  mounted() {}
};
</script>
