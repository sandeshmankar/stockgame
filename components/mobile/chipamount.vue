<template>
  <div class="chip-setting-container">
    <div class="chip-item" v-for="(chip, index) in chips" :key="index">
      <div class="chip-image">
        <v-img :width="80" :src="chip.image" class="chipImage" />
        <input
          :disabled="editAbleIndex !== index"
          class="input-chip-amount"
          type="text"
          :value="chip.amount"
          :ref="index"
          @keypress="onlyNumber"
        />
      </div>
      <!-- edit -->
      <div
        class="chip-action"
        v-if="editAbleIndex < 0 || editAbleIndex !== index"
      >
        <v-btn class="chipamount" text @click="toEdit(index)">{{
          $t("msg.edit")
        }}</v-btn>
      </div>
      <!-- confirm -->
      <div
        class="chip-action"
        v-if="editAbleIndex >= 0 && editAbleIndex === index"
      >
        <v-btn
          class="chipamount-confirm"
          text
          @click="saveChipAmount(chip.chipID)"
          >{{ $t("msg.confirm") }}</v-btn
        >
        <div class="min-max">
          <span>{{ $t("msg.min") }} = $200</span>
          <span>{{ $t("msg.max") }} = $20,000</span>
        </div>
      </div>
    </div>
    <div class="action-container">
      <v-btn
        text
        @click="reset()"
        style="background-color: #fec623!important;border-radius:8px;"
        >{{ $t("msg.resetToDefault") }}
      </v-btn>
    </div>
    <v-snackbar v-model="snackbar">
      {{ this.snackbarMessage }}
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import chips from "~/data/chips";
import config from "../../config/config.global";
import secureStorage from "../../plugins/secure-storage";

export default {
  data() {
    return {
      snackbar: false,
      snackbarMessage: "",
      amount: [],
      editAbleIndex: -1
    };
  },
  mounted() {
    this.amount = this.getCoinsModern;
  },
  computed: {
    ...mapGetters(["getCoinsModern"]),
    chips() {
      return [
        {
          chipID: "chip1",
          image: "/chip/danger.png",
          amount: this.getCoinsModern[0]
        },
        {
          chipID: "chip2",
          image: "/chip/primary.png",
          amount: this.getCoinsModern[1]
        },
        {
          chipID: "chip3",
          image: "/chip/success.png",
          amount: this.getCoinsModern[2]
        },
        {
          chipID: "chip4",
          image: "/chip/warning.png",
          amount: this.getCoinsModern[3]
        },
        {
          chipID: "chip5",
          image: "/chip/black.png",
          amount: this.getCoinsModern[4]
        }
      ];
    }
  },
  methods: {
    ...mapActions(["setCoinsModern", "setChips"]),
    onlyNumber($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    toEdit(index) {
      this.editAbleIndex = index;
    },
    reset() {
      // default chips
      this.setCoinsModern(["100", "500", "1000", "5000", "10000"]);
      this.editAbleIndex = -1;
      // show success snack bar and set success message
      this.snackbar = true;
      this.snackbarMessage = "Changes saved!";
    },
    saveChipAmount(chipId) {
      let index = this.chips.findIndex(chip => chip.chipID == chipId);
      if (index != -1) {
        if (
          parseInt(this.$refs[index][0].value) >= 100 &&
          this.$refs[index][0].value <= 10000
        ) {
          if (!this.getCoinsModern.includes(this.$refs[index][0].value)) {
            this.setChips({
              index,
              amount: parseInt(this.$refs[index][0].value)
            });
            // reset select chip
            this.editAbleIndex = -1;
            // show success snack bar and set success message
            this.snackbar = true;
            this.snackbarMessage = "Changes saved!";
            // assign new value to amount after successfully update the chip
            this.amount = this.getCoinsModern;
          } else {
            // show error snack bar and set error message
            this.snackbar = true;
            this.snackbarMessage = "Chip Amount already exist";
          }
        } else {
          // show error snack bar and set error message
          this.snackbar = true;
          this.snackbarMessage =
            "Chip amount should be greater than 100 and less than 10000";
        }
      } else {
        // show error snack bar and set error message
        this.snackbar = true;
        this.snackbarMessage = config.error.general;
      }
    }
  }
};
</script>

<style scoped>
.action-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.chip-action {
  text-align: center;
  padding-bottom: 25px;
}
.min-max {
  display: flex;
  flex-direction: column;
}
.chip-setting-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.chip-item {
  display: flex;
  flex-direction: column;
  width: 33%;
}
.setpricechip {
  position: relative;
  top: 22%;
  padding: 0;
  text-align: center;
  color: black;
  font-size: 1.2rem;
}
.chip-image {
  position: relative;
  text-align: center;
}
.input-chip-amount {
  position: relative;
  top: -50px;
  color: black;
  /* background-color: #6424b9; */
  width: 40%;
  text-align: center;
}
.input-chip-amount:focus {
  outline: none;
}
.settingchips {
  text-align: center;
  font-size: 20px;
}

.allchips {
  margin-top: 30px;
  background-color: #f2f4ff;
}

.chipImage {
  margin: 0 auto;
}

.chipamount {
  margin: 0 auto;
  text-align: center;
  background-color: #6424b9 !important;
  border-radius: 8px;
}
.chipamount-confirm {
  margin: 0 auto;
  text-align: center;
  border-radius: 8px;
  background-color: green !important;
}

.v-btn {
  font-size: 14px;
  font-weight: 400;
  color: #ffffff !important;
  padding: 4px 10px;
  margin: 4px;
}
</style>
