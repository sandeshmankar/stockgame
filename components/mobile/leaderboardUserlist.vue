<template>
  <div>
    <v-flex v-if="topPlayerData.length == 0">
      <h2 class="text-center" style="color:#a3a3a3;">
        {{ $t("leaderBoard.noData") }}
      </h2>
    </v-flex>
    <v-flex>
      <v-list subheader>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ $t("leaderBoard.Top10Leaders") }}
              <i v-if="loadingImage" class="fa fa-circle-o-notch fa-spin"></i>
            </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-radio-group v-model="sortValue" row>
              <v-radio
                :label="$t('leaderBoard.monthly')"
                value="monthly"
                v-on:click="sortingBy('monthly')"
              ></v-radio
              >&nbsp;
              <v-radio
                :label="$t('leaderBoard.weekly')"
                value="weekly"
                v-on:click="sortingBy('weekly')"
              ></v-radio>
            </v-radio-group>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list two-line>
        <template v-for="(item, index) in topPlayerData">
          <v-list-tile :key="item.username" avatar>
            <nuxt-link :to="'/modern/userprofile/' + item.userUUID">
              <v-list-tile-avatar>
                <img :src="userImgProfile(item.userImage)" />
              </v-list-tile-avatar>
            </nuxt-link>

            <v-list-tile-content style="width:40%;">
              <v-list-tile-title v-html="item.username"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-content>
              <v-list-tile-title
                class="green--text titleText"
                v-html="Math.round(item.winRate, 1) + '%'"
              ></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn
                v-bind:class="[
                  item.isFollowing == 0
                    ? 'buttonGreensmall'
                    : 'buttonCancelSmall'
                ]"
                v-on:click="
                  followUser(
                    item.username,
                    item.userImage,
                    item.userUUID,
                    item.isFollowing
                  )
                "
                dark
              >
                {{
                  item.isFollowing == 0
                    ? $t("userAction.follow")
                    : $t("userAction.unFollow")
                }}
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider
            v-if="index + 1 < topPlayerData.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list>
    </v-flex>

    <!-- Follow and UnFollow Dialog box-->
    <v-dialog
      :persistent="true"
      v-model="followDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark style="background-color:#2cb13b;">
          <v-btn icon dark @click="closeFollowBet">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            {{
              this.FolloworNot == 1
                ? $t("userAction.followBet")
                : $t("userAction.unFollowBet")
            }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <followBet
          v-if="renderComponent"
          :username="this.username"
          :userImage="this.userImage"
          :FollowerUserUUID="this.FollowUserUUID"
          :isFollowing="this.FolloworNot"
          @followBetClose="closeFollowBet"
        />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import config from "~/config/config.global";
import followBet from "~/components/mobile/follow/followBet";
export default {
  data() {
    return {
      renderComponent: true, // render Follow Bet
      loadingImage: false,
      sortValue: "monthly",
      defaultImage: "/no-profile-pic.jpg",
      topPlayerData: [],
      FolloworNot: "",
      FollowUserUUID: "",
      method: "",
      username: "",
      userImage: "",
      followDialog: false    
    };
  },
  components: {
    followBet
  },
  mounted() {
    this.leaderBoard();
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }) //get 2 data from vuex first, in the computed
  },
  methods: {
    // Render Follow Bet Component
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    // fetch default image or from server image
    userImgProfile(userImage) {
      return userImage === null
        ? this.defaultImage
        : `${config.apiDomain}/` + userImage;
    },
    //Sorting weekly and Monthly
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
        this.sortValue = "monthly";
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
        this.sortValue = "weekly";
        this.leaderBoard();
      }
    },
    // Close Follow Bet Popup
    closeFollowBet() {
      this.followDialog = false;
      this.leaderBoard();
    },
    // Follow and Unfollow User
    followUser(username, userImage, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      method == 0 ? (this.FolloworNot = 1) : (this.FolloworNot = 2);
      this.userImage = this.userImgProfile(userImage);
      this.followDialog = true;
      this.forceRerender();
    },
    // Fetch Top 10 users in Leaderboard
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
.followButton {
  height: auto;
  padding: 4px;
}
.successful {
  width: 10%;
  border: 1px solid;
  text-align: center;
  color: green;
}
.titleText {
  font-size: 14px;
}
.followup {
  padding: 10px;
  border-radius: 20px;
}
.ranking span:hover {
  color: green;
  cursor: pointer;
}
.topHeader p:first-child {
  border: 1px solid;
}
.header {
  color: #6c6c6c;
}
#userRow {
  border-radius: 10px;
}
.userRow {
  border: 1px solid #dddddd;
  border-radius: 10px;
  background-color: #ffffff;
  margin: 10px 0px;
}
.userRow:hover {
  background-color: #f7f7f7;
  cursor: pointer;
}
.userRow th {
  border-right: 1px solid #dddddd;
  width: 25%;
  padding: 5px;
}
.userRow th:first-child span {
  vertical-align: middle;
}
.userRow th:first-child i {
  vertical-align: middle;
  /* border-radius:10px; */
}
.pimage {
  margin-right: 10px;
  width: 70px;
  height: 70px;
  border: 2px solid #dddddd;
  border-radius: 180px;
}
</style>
