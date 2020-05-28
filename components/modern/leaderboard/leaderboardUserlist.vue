<template>
  <div>
    <v-flex style="margin:0px auto;">
      <v-layout row wrap>
        <v-flex grow pa-1>
          <p class="float-left md6 lg8">
            <span class="title">
              {{ $t("leaderBoard.top") }} {{ topPlayerData.length }}
              {{ $t("leaderBoard.leaders") }}
            </span>
            ({{
              this.sortbyName == "monthly"
                ? $t("leaderBoard.monthlyRankings")
                : $t("leaderBoard.weeklyRankings")
            }})
            <i
              v-if="loadingImage"
              class="fa fa-circle-o-notch fa-spin"
              style="font-size:20px;"
            ></i>
          </p>
        </v-flex>
        <v-flex grow pa-1 class="text-lg-right ranking">
          <span
            class="text-uppercase font-weight-bold"
            v-bind:class="{ active: isActiveWeek }"
            v-on:click="sortingBy('weekly')"
          >
            <v-icon small>event</v-icon>
            {{ $t("leaderBoard.weeklyRankings") }}
          </span>
          <span
            class="text-uppercase font-weight-bold"
            v-bind:class="{ active: isActiveMonth }"
            v-on:click="sortingBy('monthly')"
          >
            <v-icon small>event</v-icon>
            {{ $t("leaderBoard.monthlyRankings") }}
          </span>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex v-if="topPlayerData.length == 0">
      <h2 class="text-center" style="color:#a3a3a3;">
        {{ $t("leaderBoard.noData") }}
      </h2>
    </v-flex>
    <v-flex v-if="topPlayerData.length > 0">
      <v-flex
        xs12
        md12
        lg12
        xl12
        style="margin:0 auto;"
        v-for="(data, index) in topPlayerData"
        :key="index"
        id="userRow"
      >
        <div class="userRow leaderboard">
          <div class="rows">
            <v-icon class="tropy" color="#fad052" v-if="index == 0"
              >fa-trophy</v-icon
            >
            <v-icon class="tropy" color="#f46f86" v-if="index == 1"
              >fa-trophy</v-icon
            >
            <v-icon class="tropy" color="#7a7a7a" v-if="index == 2"
              >fa-trophy</v-icon
            >

            <nuxt-link :to="'/modern/desktop/userprofile/' + data.userUUID">
              <v-layout class="userProfileRow" pa-2>
                <v-flex md3 lg3>
                  <img class="pimage" :src="userImgProfile(data.userImage)" />
                </v-flex>
                <v-flex md9 lg9 pt-4 pl-3>
                  <v-layout mt-1>
                    <v-flex md8 lg8 style="text-align: left !important;">
                      <span class="name">
                        {{ data.username.substring(0, 10) }}
                      </span>
                    </v-flex>
                    <v-flex md4 lg4>
                      <country-flag country="us" v-if="data.country == 'USA'" />
                      <country-flag country="th" v-if="data.country == 'THA'" />
                      <country-flag country="cn" v-if="data.country == 'CHN'" />
                      <country-flag country="la" v-if="data.country == 'LAO'" />
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </nuxt-link>
          </div>
          <div class="rows">
            <h3 class="header">{{ $t("leaderBoard.winningRate") }}</h3>
            <h4 class="green--text titleText">
              {{ Math.round(data.winRate, 1) }}%
            </h4>
          </div>
          <div class="rows">
            <h3 class="header">{{ $t("leaderBoard.bets") }}</h3>
            <H4 style="color:#eb0b6e;" class="titleText">{{
              data.totalWinBets
            }}</H4>
          </div>
          <div class="rows">
            <h3 class="header">{{ $t("leaderBoard.winningAmount") }}</h3>
            <h4 style="color:#0b2a68;" class="titleText">
              ${{ Math.round(data.totalWinAmount, 1) | currency }}
            </h4>
          </div>
          <div
            v-if="data.isFollowing == 0"
            style="width:20%;padding-top:30px;"
            class="rows"
          >
            <v-btn
              class="buttonGreensmall"
              v-on:click="
                followUser(
                  data.username,
                  data.userImage,
                  data.userUUID,
                  data.isFollowing
                )
              "
              dark
              >{{ $t("userAction.followBet") }}</v-btn
            >
          </div>
          <div
            v-if="data.isFollowing == 1"
            style="width:20%;padding-top:30px;"
            class="rows"
          >
            <v-btn
              class="buttonCancel"
              v-on:click="
                followUser(
                  data.username,
                  data.userImage,
                  data.userUUID,
                  data.isFollowing
                )
              "
              dark
              >{{ $t("userAction.unFollowBet") }}</v-btn
            >
          </div>
          <div
            class="rows"
            v-if="data.isFollowing == -1"
            style="width:20%;padding-top:30px;"
          >
            <v-btn class="buttonGreensmall">{{
              $t("userAction.yourself")
            }}</v-btn>
          </div>
        </div>
      </v-flex>
    </v-flex>
    <!-- Follow and UnFollow Dialog box-->
    <v-dialog
      v-model="followDialog"
      width="500"
      class="followDialog"
      :persistent="true"
    >
      <followBet
        v-if="renderComponent"
        :username="this.username"
        :userImage="this.userImage"
        :FollowerUserUUID="this.FollowUserUUID"
        :isFollowing="this.FolloworNot"
        @followBetClose="closeFollowBet"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import config from "~/config/config.global";
import followBet from "~/components/modern/follow/followBet";
import countryFlag from "vue-country-flag";
export default {
  components: {
    followBet,
    countryFlag
  },
  data() {
    return {
      renderComponent: true, // render Follow Bet
      defaultImage: "/no-profile-pic.jpg",
      isActiveWeek: true,
      isActiveMonth: false,
      sortbyName: "weekly",
      loadingImage: false,
      dateFrom: "",
      dateTo: "",
      selectRate: false,
      selectAmount: true,
      topPlayerData: [],
      FolloworNot: "",
      FollowMethod: "",
      FollowUserUUID: "",
      method: "",
      username: "",
      userImage: "",
      followDialog: false
    };
    props: ["linkItem"];
  },
  mounted() {
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    )
      .toISOString()
      .substr(0, 10);
    this.dateFrom = lastWeek;
    this.dateTo = today.toISOString().substring(0, 10);
    this.leaderBoard();
  },
  computed: {
    // Get 2 data from vuex first, in the computed
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }),
    ...mapGetters(["getUserInfo"])
  },
  methods: {
    // Render Follow Bet Component
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    // Close Follow Bet Popup
    closeFollowBet() {
      this.followDialog = false;
      this.leaderBoard();
    },
    // Sorting Weekly and Monthly
    sortingBy(sort) {
      if (sort == "monthly") {
        const today = new Date();
        const monthly = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 28
        )
          .toISOString()
          .substr(0, 10);
        this.dateFrom = monthly;
        this.dateTo = today.toISOString().substring(0, 10);
        this.sortbyName = "monthly";
        this.isActiveMonth = true;
        this.isActiveWeek = false;
        this.leaderBoard();
      } else {
        const today = new Date();
        const lastWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 5
        )
          .toISOString()
          .substr(0, 10);
        this.dateFrom = lastWeek;
        this.dateTo = today.toISOString().substring(0, 10);
        this.sortbyName = "weekly";
        this.isActiveMonth = false;
        this.isActiveWeek = true;
        this.leaderBoard();
      }
    },
    // fetch default image or from server image
    userImgProfile(userImage) {
      return userImage === null
        ? this.defaultImage
        : `${config.apiDomain}/` + userImage;
    },
    // Open Dialog box When User Click on Follow Button
    followUser(username, userImage, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      method == 0 ? (this.FolloworNot = 1) : (this.FolloworNot = 2);
      this.userImage = this.userImgProfile(userImage);
      this.followDialog = true;
      this.forceRerender();
    },
    // fetch leaderboard Top Player
    async leaderBoard() {
      this.loadingImage = true;
      try {
        const reqBody = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          dateRangeFrom: this.dateFrom,
          dateRangeTo: this.dateTo,
          version: config.version
        };
        const { data } = await this.$axios.post(
          config.getLeaderBoard.url,
          reqBody,
          {
            headers: config.header
          }
        );
        this.topPlayerData = data.data;
        this.loadingImage = false;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.tropy {
  font-size: 26px;
  margin-top: 30px;
  margin-left: -25px;
  background-color: #fff;
  border: 1px solid #dddddd;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  float: left;
}
.followDialog {
  width: 600px;
  border-radius: 10px;
  padding: 10px;
}

.successful {
  width: 10%;
  border: 1px solid;
  text-align: center;
  color: green;
}
.followup {
  padding: 10px;
  border-radius: 20px;
}

.followup h3 {
  text-align: center;
  color: #0b2968;
}

.ranking span:hover {
  color: green;
  cursor: pointer;
}

.ranking span.active {
  color: green;
}

.topHeader p:first-child {
  border: 1px solid;
}
#userRow {
  border-radius: 10px;
}

.userRow {
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 10px;
  background-color: #ffffff;
  margin: 5px 0px;
  float: left;
}

.userRow:hover {
  background-color: #f7f7f7;
  cursor: pointer;
}

.userRow .rows {
  text-align: center;
  height: 120px;
  border-right: 1px solid #dddddd;
  width: 20%;
  padding: 5px;
  float: left;
}

.userRow div:first-child .name {
  margin-left: 8px;
  text-align: left !important;
  width: 100%;
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

.userRow div:first-child .name span {
  color: #333;
  margin-top: 10px;
  padding: 3px;
  font-size: 14px;
}

.userRow div:first-child img {
  margin-top: 10px;
}

.userRow div:first-child i {
  vertical-align: middle;
}
.userProfileRow {
  /* border:1px solid red; */
  margin: 12px auto;
  width: 90%;
}

.pimage {
 
  border: 2px solid #dddddd;
  border-radius: 180px;
}
</style>
