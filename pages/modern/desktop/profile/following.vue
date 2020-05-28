<template>
  <div>
    <v-flex xs12 class="pt-5 pl-5">
      <div>
        <h2 class="text-uppercase">
          {{ $t("profile.myFollowing") }} ({{ this.countFollwing }})
        </h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <v-flex xs12 pt-5 pl-5>
      <v-flex xs10>
        <div class="title_container">
          <h3 class="text-black onFollower" v-if="followingListEmpty == true">
            <i class="fa fa-user-o fa-2x" />
            <div>{{ $t("profile.noFollowing") }}</div>
          </h3>
          <div
            class="follower_container"
            v-for="(data, index) in followingList"
            :key="index"
          >
            <nuxt-link :to="'/modern/desktop/userprofile/' + data.UUID">
              <img class="userImage" :src="imgProfile(data.profileImage)" />
              <span v-if="data.fullName" class="name">{{ data.fullName }}</span>
              <span v-if="data.fullName == null" class="name">
                {{ data.userName }}
              </span>
            </nuxt-link>
            <div class="followType">
              <span>
                <label
                  >{{
                    data.followRuleValue[0].name == "byAmount"
                      ? $t("leaderBoard.followByAmount")
                      : $t("leaderBoard.followByRate")
                  }}
                  :</label
                >
                {{ data.followRuleValue[0].value }}
              </span>
              <span>
                <label
                  >{{
                    data.unFollowRuleValue[0].name == "byWin"
                      ? $t("leaderBoard.stopByWinning")
                      : data.unFollowRuleValue[0].name == "byLose"
                      ? $t("leaderBoard.stopByLosing")
                      : data.unFollowRuleValue[0].name == "byTime"
                      ? $t("leaderBoard.stopByTiming")
                      : $t("leaderBoard.stopByBets")
                  }}:</label
                >
                {{
                  data.unFollowRuleValue[0].name == "byTime"
                    ? data.unFollowRuleValue[0].value / 1440 +"&nbsp;"+$t("msg.days")
                    : data.unFollowRuleValue[0].value
                }}
              </span>
            </div>
            <button
              class="buttonCancel btnUnfollow"
              v-on:click="
                followUserBet(
                  data.userName,
                  data.profileImage,
                  data.UUID,
                  data.isFollowing
                )
              "
            >
              {{ $t("userAction.unFollow") }}
            </button>
          </div>
        </div>
      </v-flex>
    </v-flex>
    <!-- Follow Dialog -->
    <v-dialog
      v-model="followDialog"
      width="500"
      class="followDialog"
      :persistent="true"
    >
      <followBet
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
import { mapGetters, mapActions } from "vuex";
import config from "~/config/config.global";
import followBet from "~/components/modern/follow/followBet";
export default {
  data() {
    return {
      username: "",
      userImage: "",
      FollowUserUUID: "",
      FolloworNot: "",
      followDialog: false,
      followingListEmpty: false,
      active: null,
      followingList: [],
      countFollwing: 0,
      defaultImage: "/no-profile-pic.jpg"
    };
  },
  components: {
    followBet
  },
  mounted() {
    this.getFollowingList();
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getUserUUID"])
  },
  methods: {
    // Close Follow Bet Popup
    closeFollowBet() {
      this.followDialog = false;
      this.getFollowingList();
    },
    followUserBet: function(username, userImg, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      method == 0 ? (this.FolloworNot = 1) : (this.FolloworNot = 2);
      this.userImage = userImg ? this.imgProfile(userImg) : this.defaultImage;
      this.followDialog = true;
    },
    // fetch default image or from server image
    imgProfile(userImg) {
      return userImg === null
        ? this.defaultImage
        : `${config.apiDomain}/` + userImg;
    },
    // fetch default image or from server image
    async getFollowingList() {
      try {
        const reBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          followersType: 2, // Follwing users List
          version: config.version
        };
        const res = await this.$axios.$post(
          config.getUserFollower.url,
          reBody,
          {
            headers: config.header
          }
        );
        if (res.code == 200) {
          this.followingList = res.data;
          this.countFollwing = res.data.length;
          if (this.countFollwing == 0) {
            this.followingListEmpty = true;
          } else {
            this.followingListEmpty = false;
          }
        } else {
          this.followingListEmpty = true;
        }
      } catch (ex) {
        console.error(ex.message);
      }
    }
  }
};
</script>

<style scoped>
.onFollower {
  color: #aeafb0;
  text-align: center;
  font-size: 28px;
  width: 500px;
  margin: 20% auto;
}
.followType span {
  text-align: center;
  width: 100%;
  display: block;
}
.followType label {
  width: 100%;
  font-weight: 600;
}
.followType {
  margin: 15px 5px;
}
.userImage {
  width: 120px;
  height: 120px;
  border-radius: 180px;
  margin: 0 auto;
}
.name {
  margin-top: 10px;
    font-size: 16px;
  color: #2bb13a;
  display: block;
  width: 100%;
  text-transform: capitalize;
}
.title_container {
  padding-top: 15px;
  padding-bottom: 15px;
}
.follower_container {
  border-radius: 6px;
  border: 1px solid #dddddd;
  background-color: white;
  width: 30%;
  float: left;
  margin: 5px;
  padding: 15px 10px;
  text-align: center;
}

.btnFollow {
  font-size: 16px;
  text-transform: capitalize;
  width: 130px;
  padding: 4px 0px;
  color: #fff;
  border-radius: 5px;
}

.btnUnfollow {
  font-size: 16px;
  text-transform: capitalize;
  width: 130px;
  padding: 4px 0px;
  color: #fff;
  border-radius: 5px;
}
</style>
