<template>
  <div>
    <div class="followup">
      <v-card-text style="text-align:center;">
        <img class="pimage" v-bind:src="this.userImage" width="140px" />
        <h3 class="subtitle-1 text-center pt-1" v-if="this.username">
          {{ this.username }}
        </h3>
      </v-card-text>
      <v-flex>
        <p
          v-if="FollwingError"
          v-bind:class="{ 'text-danger': hasError, 'text-sucess': hasSucess }"
        >
          {{ errorMessage }}
        </p>
      </v-flex>

      <div v-if="isFollowing == 1">
        <h4 class="subtitle-1 text-uppercase">
          {{ $t("leaderBoard.followBy") }}
        </h4>
        <v-divider></v-divider>
        <v-card-actions>
          <v-flex lg6 pr-4>
            <v-select
              :items="[
                {
                  id: 1,
                  name: this.$root.$t('leaderBoard.followByAmount'),
                  value: 'Amount'
                },
                {
                  id: 2,
                  name: this.$root.$t('leaderBoard.followByRate'),
                  value: 'Rate'
                }
              ]"
              label="Select Follow type"
              v-model="selectedFollow"
              item-text="name"
              item-value="id"
              v-on:change="changeAmountRate($event)"
              solo
            ></v-select>
          </v-flex>
          <v-flex lg6 pr-2>
            <v-text-field
              :rules="[
                rules.min(10, rateValue, 'Rate'),
                rules.max(100, rateValue, 'Rate')
              ]"
              solo
              label="10%"
              v-if="selectRate"
              append-icon="money"
              v-model="rateValue"
              @keypress="onlyNumber"
            ></v-text-field>
            <v-text-field
              :rules="[
                rules.min(100, amountValue, 'Amount'),
                rules.max(1000, amountValue, 'Amount')
              ]"
              solo
              label="100"
              v-if="selectAmount"
              @keypress="onlyNumber"
              v-model="amountValue"
              append-icon="money"
            ></v-text-field>
          </v-flex>
        </v-card-actions>

        <h4 class="subtitle-1 text-uppercase pt-2">
          {{ $t("leaderBoard.autoStop") }}
        </h4>
        <v-divider></v-divider>
        <v-card-actions>
          <v-radio-group v-model="autoStop" :mandatory="false">
            <v-radio
              v-for="n in autoStopFollow"
              :key="n.id"
              :label="n.name"
              :value="n.id"
              v-on:change="changeAmount(n.value)"
            ></v-radio>

            <v-flex v-if="this.autoStop == 4 || this.autoStop == 5">
              <v-text-field
                :rules="[
                  rulesNew.min(unfollowValue, autoStop),
                  rulesNew.max(unfollowValue, autoStop)
                ]"
                solo
                @keypress="onlyNumber"
                v-model="unfollowValue"
              >
                <span slot="append" color="red">{{ unfollowSign }}</span>
              </v-text-field>
            </v-flex>
            <v-flex v-if="this.autoStop == 3 || this.autoStop == 6">
              <v-slider
                v-model="unfollowValue"
                class="align-center"
                :max="unFollowValueMax"
                :min="unFollowValueMin"
                color="green"
                thumb-color="green"
                track-color="green"
                hide-details
                thumb-size="50"
                inverse-label
                track-fill-color="green"
                :label="`${unfollowValue} ${unfollowSign}`"
              ></v-slider>
            </v-flex>
            <v-flex lg12 mt-2>
              <v-btn
                color="buttonGreensmall"
                v-on:click="followThisUser(FollowerUserUUID, isFollowing)"
                text
                >{{ $t("msg.confirm") }}</v-btn
              >
              <v-btn color="buttonCancel" v-on:click="closePopup" text>
                {{ $t("msg.close") }}
              </v-btn>
            </v-flex>
          </v-radio-group>
        </v-card-actions>
      </div>
      <div v-else>
        <v-flex lg12 text-center>
          <v-btn
            color="buttonGreen"
            v-on:click="followThisUser(FollowerUserUUID, isFollowing)"
            text
            >{{ $t("msg.confirm") }}</v-btn
          >
          <v-btn color="buttonCancel" v-on:click="closePopup" text>
            {{ $t("msg.close") }}
          </v-btn>
        </v-flex>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import config from "~/config/config.global";
import secureStorage from "../../../plugins/secure-storage";

export default {
  props: ["username", "userImage", "FollowerUserUUID", "isFollowing"],
  data() {
    return {
      // Unfollow Default Value Min and Max
      unFollowValueMin: 3,
      unFollowValueMax: 10,
      // AutoStop Follow Validation
      rulesNew: {
        // Min Value
        min(value, text) {
          if (text == 4 || text == 5)
            return (
              (value || "") >= 100 || window.$nuxt.$root.$t("follow.amountMust")
            );
          else if (text == 3)
            return (
              (value || "") >= 1 || window.$nuxt.$root.$t("follow.timeMust")
            );
          else
            return (
              (value || "") >= 1 || window.$nuxt.$root.$t("follow.timeMust")
            );
        },
        // Max value
        max(value, text) {
          if (text == 4 || text == 5)
            return (
              (value || "") <= 1000 || window.$nuxt.$root.$t("follow.amountMay")
            );
          else if (text == 3)
            return (
              (value || "") <= 10 || window.$nuxt.$root.$t("follow.timeMay")
            );
          else
            return (
              (value || "") <= 10 || window.$nuxt.$root.$t("follow.betMay")
            );
        }
      },
      // Follow by Validation
      rules: {
        min(min, v, text) {
          text == "Amount"
            ? (text = window.$nuxt.$root.$t("follow.amount"))
            : (text = window.$nuxt.$root.$t("follow.rate"));
          return (
            (v || "") >= min ||
            `${text} ` + window.$nuxt.$root.$t("follow.mustBe") + ` ${min}`
          );
        },
        max(max, v, text) {
          text == "Amount"
            ? (text = window.$nuxt.$root.$t("follow.amount"))
            : (text = window.$nuxt.$root.$t("follow.rate"));
          return (
            (v || "") <= max ||
            `${text} ` + window.$nuxt.$root.$t("follow.mayNotBe") + ` ${max}.`
          );
        }
      },
      errorMessage: "",
      hasError: false,
      hasSucess: false,
      FollwingError: false,
      unfollowSign: "USD",
      unfollowValue: 100,
      selectAmount: false,
      selectTime: false,
      selectBets: false,
      autoStop: 4, // Select default Auto Stop Follow
      amountValue: 100,
      rateValue: 10,
      selectRate: false,
      selectAmount: true,
      selectedFollow: 1,
      // Default AUto Stop Follow
      autoStopFollow: [
        {
          id: 4,
          name: this.$root.$t("leaderBoard.stopByWinning"),
          value: "stopWin"
        },
        {
          id: 5,
          name: this.$root.$t("leaderBoard.stopByLosing"),
          value: "stopLoss"
        },
        {
          id: 3,
          name: this.$root.$t("leaderBoard.stopByTiming"),
          value: "stopTime"
        },
        {
          id: 6,
          name: this.$root.$t("leaderBoard.stopByBets"),
          value: "stopBets"
        }
      ],
      defaultImage: "/no-profile-pic.jpg",
      selectedFruits: [],
      currentRoute: "",
      messageInput: "",
      tabActiveName: "world",
      conversationWorld: [],
      connectClient: [],
      totoalUserCount: 0,
      userId: 0
    };
  },
  computed: {
    // Get 2 Data from vuex first, in the computed
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    })
  },
  methods: {
    // Snackbar Notification
    ...mapActions(["setSnackBarMessage"]),
    // Send to Parent Components
    async closePopup() {
      this.$emit("followBetClose");
    },
    // Users Follow Bet Validation
    async followThisUser(followerID, followMethod) {
      // Check Empty Filed
      if (
        !this.selectedFollow &&
        !this.BetValue &&
        !this.autoStop &&
        !this.unfollowValue
      ) {
        return this.setSnackBarMessage(
          window.$nuxt.$root.$t("follow.followingType")
        );
      }

      // Check Amount Value or Bet Value
      if (this.selectedFollow == 1) {
        this.BetValue = this.amountValue;
        if (this.BetValue > 1000 || this.BetValue < 100)
          return this.setSnackBarMessage(
            window.$nuxt.$root.$t("follow.amountShould")
          );
      } else {
        this.BetValue = this.rateValue;
        if (this.BetValue > 100 || this.BetValue < 10)
          return this.setSnackBarMessage(
            window.$nuxt.$root.$t("follow.betRate")
          );
      }

      // Auto Stop Follow
      switch (this.autoStop) {
        case 4:
        case 5:
          if (this.unfollowValue > 1000 || this.unfollowValue < 100) {
            return this.setSnackBarMessage(
              window.$nuxt.$root.$t("follow.autoStop")
            );
          }
          break;
        case 3:
          if (this.unfollowValue > 10 || this.unfollowValue < 1) {
            return this.setSnackBarMessage(
              window.$nuxt.$root.$t("follow.daysShould")
            );
          }
          break;
        case 6:
          if (this.unfollowValue > 100 || this.unfollowValue < 1) {
            return this.setSnackBarMessage(
              window.$nuxt.$root.$t("follow.betsShould")
            );
          }
          break;
      }

      return this.follwingBetting(followerID, followMethod);
    },
    // Error Function Common
    errorShow(follingError, sucess, error, message) {
      this.FollwingError = follingError;
      this.hasError = error;
      this.hasSucess = sucess;
      this.errorMessage = message;
    },
    // Follow Users Bet API Call
    async follwingBetting(follwerUUID, method) {
      const reqBody = {
        portalProviderUUID: this.portalProviderUUID,
        userUUID: this.userUUID,
        followToUUID: follwerUUID,
        followBetRule: [
          {
            id: this.selectedFollow,
            value: this.BetValue
          }
        ],
        unFollowBetRule: [
          {
            id: this.autoStop,
            value:
              this.autoStop == 3
                ? this.unfollowValue * 1440
                : this.unfollowValue // Day Convert to Minutes 1 Day = 1440 min
          }
        ],
        method: method,
        version: config.version
      };
      try {
        var { data } = await this.$axios.post(config.followUser.url, reqBody, {
          headers: config.header
        });
        if (data.code == 200) {
             data.message[0] == "User followed successfully."
              ? this.setSnackBarMessage(this.$root.$t("follow.userFollowed")) 
              : this.setSnackBarMessage(this.$root.$t("follow.userUnFollowed"));                     
        } else {
          this.setSnackBarMessage(data.message[0]);
          // this.errorShow(true, false, true, data.message[0]);
        }
        this.$emit("followBetClose");       
      } catch (error) {
        console.log(error);
      }
    },
    // Change Amount Rate Validation
    changeAmountRate() {
      this.UserfollowType = this.selectedFollow;
      console.log(this.selectedFollow);
      if (this.selectedFollow == "Amount") {
        this.selectAmount = true;
        this.selectRate = false;
      } else {
        this.selectAmount = false;
        this.selectRate = true;
      }
    },
    // Change Amount Validation
    changeAmount(value) {
      if (value == "stopWin" || value == "stopLoss") {
        this.unfollowValue = 100;
        this.unfollowSign = "USD";
      } else if (value == "stopTime") {
        this.unFollowValueMax = 10;
        this.unFollowValueMin = 1;
        this.unfollowValue = 2;
        this.unfollowSign = "Days";
      } else {
        this.unFollowValueMax = 10;
        this.unFollowValueMin = 1;
        this.unfollowValue = 3;
        this.unfollowSign = "Bets";
      }
    },
    // Number Validation
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    }
  }
};
</script>

<style scoped>
.v-slider .v-label {
  color: green !important;
}
.title {
  text-align: center;
  color: #0b2a68;
}
.followDialog {
  width: 600px;
  border-radius: 10px;
  padding: 5px;
}
.followup {
  padding: 5px 15px;
  border-radius: 20px;
}
.followup h4 {
  color: #65686f;
}
.conve-container {
  position: relative;
  display: flex;
  flex-direction: column;
}
.buttonInvitation {
  color: #fff !important;
  border-radius: 10px;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3) !important;
  font-size: 12px;
  float: right;
}
.pimage {
  margin-right: 10px;
  width: 80px;
  height: 80px;
  border: 2px solid #dddddd;
  border-radius: 180px;
}
</style>
