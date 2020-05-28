<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <div class="tab-container">
      <div class="tab-item">
        <v-btn
          block
          :class="active === 0 ? 'active-tab' : ''"
          @click="active = 0"
        >
          {{ $t("menu.chipAmount") }}
        </v-btn>
      </div>
      <div class="tab-item">
        <v-btn
          block
          :class="active === 1 ? 'active-tab' : ''"
          @click="active = 1"
        >
          {{ $t("setting.account") }}
        </v-btn>
      </div>

      <div class="tab-content">
        <chipamount v-if="active === 0" />
        <soundcontrol v-else />
      </div>
    </div>
  </div>
</template>
<script>
import chipamount from "~/components/mobile/chipamount";
import soundcontrol from "~/components/mobile/soundcontrol";

export default {
  layout: "default",
  components: {
    chipamount,
    soundcontrol
  },
  data() {
    return {
      tabs: ["chipAmount", "soundControl"],
      active: 0
    };
  }
};
</script>
<style scoped>
.tab-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.active-tab {
  background-color: #1db42f !important;
  color: aliceblue;
}
.tab-item {
  padding: 0px 35px;
  width: 100%;
}
.tab-content {
  padding-top: 35px;
  margin: 10px;
}
</style>
