<template>
  <div class="d-flex justify-center">
    <v-img v-if="isShow" :src="setsrc" :width="size" class="show-chip">
      <span>{{ amount }}</span>
    </v-img>
    <!-- <v-img v-show="amounts > 0 " src="/chip/danger.png'" width="20" class="show-chip" />
    <v-img v-show="amounts >=500" src="/chip/primary.png" width="25" class="show-chip" />
    <v-img v-show="amounts >=1000" src="/chip/success.png" width="30" class="show-chip" />
    <v-img v-show="amounts >=5000" src="/chip/warning.png" width="35" class="show-chip" />
    <v-img v-show="amounts >=10000" src="/chip/black.png" width="40" class="show-chip" />-->
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  computed: {
    isShow() {
      if (this.amount > 0) {
        return true;
      } else {
        return false;
      }
    },
    setsrc() {
      if (this.amount > 0) {
        return this.amount <= 100
          ? "/showChips/chip100.png"
          : this.amount <= 200
          ? "/showChips/chip200.png"
          : this.amount <= 300
          ? "/showChips/chip300.png"
          : this.amount <= 400
          ? "/showChips/chip400.png"
          : this.amount <= 500
          ? "/showChips/chip500.png"
          : this.amount <= 600
          ? "/showChips/chip600.png"
          : this.amount <= 700
          ? "/showChips/chip700.png"
          : this.amount <= 800
          ? "/showChips/chip800.png"
          : this.amount <= 900
          ? "/showChips/chip900.png"
          : this.amount <= 1000
          ? "/showChips/chip1000.png"
          : this.amount <= 1100
          ? "/showChips/chip1100.png"
          : this.amount <= 1200
          ? "/showChips/chip1200.png"
          : this.amount <= 1300
          ? "/showChips/chip1300.png"
          : this.amount <= 1400
          ? "/showChips/chip1400.png"
          : this.amount <= 1500
          ? "/showChips/chip1500.png"
          : this.amount <= 1600
          ? "/showChips/chip1600.png"
          : this.amount <= 1700
          ? "/showChips/chip1700.png"
          : this.amount <= 1800
          ? "/showChips/chip1800.png"
          : this.amount <= 1900
          ? "/showChips/chip1900.png"
          : this.amount <= 2000
          ? "/showChips/chip2000.png"
          : this.amount <= 2500
          ? "/showChips/chip2500.png"
          : this.amount <= 3000
          ? "/showChips/chip3000.png"
          : this.amount <= 3500
          ? "/showChips/chip3500.png"
          : this.amount <= 4000
          ? "/showChips/chip4000.png"
          : this.amount <= 4500
          ? "/showChips/chip4500.png"
          : this.amount <= 5000
          ? "/showChips/chip5000.png"
          : this.amount <= 10000
          ? "/showChips/chip10000.png"
          : "/showChips/chipbig.png";
      } else {
        return "";
      }
    }
  }
};
</script>

<style>
.show-chip {
  position: absolute;
  margin-top: 20px;
}

.v-responsive__content {
  align-self: center !important;
  font-size: 12px;
}
</style>
