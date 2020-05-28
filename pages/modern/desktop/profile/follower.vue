<template>
  <div>
    <v-flex xs12 class="pt-5 pl-5">
      <div>
        <h2 class="text-uppercase">
          {{ $t("profile.myFollowers") }} ({{ this.countFollower }})
        </h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <v-flex xs12 pt-5 pl-5>
      <v-flex xs10>
        <div class="title_container">
          <h3 class="text-black onFollower" v-if="followerEmpty == true">
            <i class="fa fa-user-o fa-2x" />
            <div>{{ $t("profile.noFollowers") }}</div>
          </h3>
          <div
            class="follower_container"
            v-for="(data, index) in followerList"
            :key="index"
          >
            <nuxt-link :to="'/modern/desktop/userprofile/' + data.UUID">
              <img class="userImage" :src="userImgProfile(data.profileImage)" />
              <span v-if="data.fullName" class="name">{{ data.fullName }}</span>
              <span v-if="data.fullName == null" class="name">{{
                data.userName
              }}</span>
            </nuxt-link>
            <button
              v-if="data.isFollowing == 0"
              class="buttonGreen btnFollow"
              v-on:click="
                followUserBet(
                  data.userName,
                  data.profileImage,
                  data.UUID,
                  data.isFollowing
                )
              "
            >
              {{ $t("leaderBoard.follow") }}
            </button>
            <button
              v-if="data.isFollowing == 1"
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
      :persistent=true
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
      followerEmpty: false,
      username: "",
      FollowUserUUID: "",
      FolloworNot: "",
      userImage: "",
      followDialog: false,
      active: null,
      followerList: [],
      countFollower: 0,
      defaultImage: "/no-profile-pic.jpg"
    };
  },
  components: {
    followBet
  },
  mounted() {
    this.getFollowerList();
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getUserUUID"])
  },
  methods: {
    // Close Follow Bet Popup
    closeFollowBet() {
      this.followDialog = false;
      this.getFollowerList();
    },
    // Follow User Bet
    followUserBet: function(username, userImg, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      method == 0 ? (this.FolloworNot = 1) : (this.FolloworNot = 2);
      this.userImage = this.userImgProfile(userImg);
      this.followDialog = true;
    },
    // fetch default image or from server image
    userImgProfile(userImg) {
      return userImg === null
        ? this.defaultImage
        : `${config.apiDomain}/` + userImg;
    },
    async getFollowerList() {
      try {
        const res = await this.$axios.$post(
          config.getUserFollower.url,
          {
            portalProviderUUID: this.getPortalProviderUUID,
            userUUID: this.getUserUUID,
            followersType: 1,
            version: config.version
          },
          {
            headers: config.header
          }
        );
        if (res.code == 200) {
          this.followerList = res.data;
          this.countFollower = res.data.length;

          if (this.countFollower == 0) {
            this.followerEmpty = true;
          } else {
            this.followerEmpty = false;
          }
        } else {
          this.followerEmpty = true;
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
  margin-top:15px;
  font-size: 16px;
  text-transform: capitalize;
  width: 130px;
  padding: 4px 0px;
  color: #fff;
  border-radius: 5px;
}

.btnUnfollow {
  margin-top:15px;
  font-size: 16px;
  text-transform: capitalize;
  width: 130px;
  padding: 4px 0px;
  color: #fff;
  border-radius: 5px;
}
</style>
