<template>
  <div>
    <v-flex>
      <v-list subheader class="topWrap">
        <v-list-tile>
          <v-list-tile-content>
            {{$t("profile.myFollowers")}}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-layout row wrap>      
          <v-flex v-if="followersList.length == 0">
          <div class="noMore">
            <h3 class="text-center" style="color:#a3a3a3;">
            {{$t("profile.noFollowers")}}
            </h3>
          </div>
        </v-flex>
      
        <v-flex xs6 sm4 v-for="(data, index) in followersList" :key="index">
          <div class="followerContainer">
            <nuxt-link :to="'/modern/userprofile/' + data.UUID">
              <img class="userImage" :src="userImgProfile(data.profileImage)" />
              <span v-if="data.fullName" class="name">{{ data.fullName }}</span>
              <span v-if="data.fullName == null" class="name">{{
                data.userName
              }}</span>
            </nuxt-link>
            <button
              v-bind:class="[
                data.isFollowing == 0
                  ? 'buttonGreen btnFollow'
                  : 'buttonCancel btnUnfollow'
              ]"
              v-on:click="
                followUser(
                  data.userName,
                  data.profileImage,
                  data.UUID,
                  data.isFollowing
                )
              "
              dark
            >
              {{
                data.isFollowing == 0
                  ? $t("userAction.follow")
                  : $t("userAction.unFollow")
              }}
            </button>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>

    <!-- Follow and UnFollow Dialog box-->
    <v-dialog
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
          <v-toolbar-title>{{
            this.FolloworNot == 1 ? this.$root.$t("userAction.followBet") : this.$root.$t("userAction.unFollowBet")
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <followBet
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
import { mapState, mapActions } from "vuex";
import config from "~/config/config.global";
import followBet from "~/components/mobile/follow/followBet";
export default {
  data() {
    return {
      followersList: [],
      defaultImage: "/no-profile-pic.jpg",
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
    this.getFollowersList();
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }) //get 2 data from vuex first, in the computed
  },
  methods: {
    ...mapActions(["setSnackBarMessage"]),
    // fetch default image or from server image
    userImgProfile(userImage) {
      return userImage === null
        ? this.defaultImage
        : `${config.apiDomain}/` + userImage;
    },
    // Close Follow Bet Popup
    closeFollowBet() {
      this.followDialog = false;
      this.getFollowersList();
    },
    // Follow and Unfollow User
    followUser(username, userImage, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      method == 0 ? (this.FolloworNot = 1) : (this.FolloworNot = 2);
      this.userImage = this.userImgProfile(userImage);
      this.followDialog = true;
    },
    // fetch User Followers List
    async getFollowersList() {
      try {
        const reBody = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          followersType: 1, // Follwing users List
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
          this.followersList = res.data;
        } else {
          this.setSnackBarMessage(config.error.general);
        }
      } catch (ex) {
        this.setSnackBarMessage(config.error.general);
        console.error(ex.message);
      }
    }

  }
};
</script>
<style scoped>
.noMore {
  margin-top: 50px;
}
.userImage {
  width: 80px;
  height: 80px;
  border-radius: 180px;
  margin: 0 auto;
}
.name {
  margin-top: 10px;
  font-size: 14px;
  color: #2bb13a;
  display: block;
  width: 100%;
  text-transform: capitalize;
}

.title_container {
  padding-top: 15px;
  padding-bottom: 15px;
}
.followerContainer {
  margin: 5px;
  border-radius: 6px;
  border: 1px solid #dddddd;
  background-color: white;
  padding: 10px;
  text-align: center;
}

.btnFollow {
  margin-top: 15px;
  font-size: 12px;
  text-transform: capitalize;
   width: 100px;
  padding: 4px 0px;
  color: #fff;
  border-radius: 5px;
}

.btnUnfollow {
  margin-top: 15px;
  font-size: 12px;
  text-transform: capitalize;
  width: 100px;
  padding: 4px 0px;
  color: #fff;
  border-radius: 5px;
}
.topWrap {
  background-color: #2bb13a;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 14px;
  height: 45px;
}
</style>
