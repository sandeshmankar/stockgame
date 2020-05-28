<template>
  <div v-on-clickaway="closeChat">
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          rigth
          fab
          class="liveChat"
          dark
          @click="switchChat()"
          v-on="on"
        >
          <v-icon>fa-comments</v-icon>
        </v-btn>
      </template>
      <span>{{ $t("invitation.sendInvitation") }}</span>
    </v-tooltip>

    <div id="chat-container" v-show="isShowChat">
      <div id="chat-container-header">
        <div
          @click="changeChatCannel(true)"
          :class="
            isActiveEcWorld
              ? 'chat-header-item chat-header-item-active'
              : 'chat-header-item'
          "
        >
          {{ $t("invitation.ecWorld") }}
          <span class="message-count" v-if="globalInvitation.length">{{
            globalInvitation.length
          }}</span>
        </div>
        <div
          v-if="chanelPageAvailable.includes($route.name)"
          @click="changeChatCannel(false)"
          :class="
            !isActiveEcWorld
              ? 'chat-header-item chat-header-item-active'
              : 'chat-header-item'
          "
        >
          {{ this.$route.params.id }}
          <span class="message-count" v-if="chanelInvitation.length">{{
            chanelInvitation.length
          }}</span>
        </div>
      </div>
      <div class="no-invitation" v-if="messageConversations.length <= 0">
        <i class="fa fa-bell"></i>
        <p>{{ $t("invitation.noInvitation") }}</p>
      </div>
      <div id="chatting-content" v-else>
        <div
          :class="wiseBorderColor(chat.category)"
          v-for="(chat, index) in messageConversations"
          :key="index"
        >
          <div>
            <nuxt-link :to="'/modern/desktop/userprofile/' + chat.userUUID">
              <v-avatar :size="40">
                <img :src="userImgProfile(chat.userImage)" alt="profile" />
              </v-avatar>
            </nuxt-link>
          </div>
          <!-- content catalog -->
          <!-- rank -->
          <div class="pl-2" v-if="chat.category.some(element => element == 3)">
            <span
              class="catalog-label"
              v-if="chat.category[0] == 3 && chat.category.length == 1"
              >{{ $t("invitation.winningRank") }}
            </span>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <span class="ranking" v-on="on">#{{ chat.rank }}</span>
              </template>
              <span>{{ $t("invitation.userRank") }}</span>
            </v-tooltip>
          </div>
          <!-- rank -->
          <!-- win rate -->
          <div class="pl-2" v-if="chat.category.some(element => element == 1)">
            <span
              class="catalog-label"
              v-if="chat.category[0] == 1 && chat.category.length == 1"
              >{{ $t("invitation.winningRate") }}</span
            >

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <span v-on="on" class="winRate"
                  >{{ Math.round(chat.winRate) }}%</span
                >
              </template>
              <span>{{ $t("invitation.userWinRate") }}</span>
            </v-tooltip>
          </div>
          <!-- win rate -->
          <!-- follow count -->
          <div class="pl-2 " v-if="chat.category.some(element => element == 2)">
            <span
              class="catalog-label"
              v-if="chat.category[0] == 2 && chat.category.length == 1"
              >{{ $t("invitation.totalFollower") }}
            </span>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <span class="followcount" v-on="on">{{
                  chat.followerCount
                }}</span>
              </template>
              <span>{{ $t("invitation.userFollowCount") }}</span>
            </v-tooltip>
          </div>
          <!-- follow count -->
          <!-- button action -->
          <div>
            <button
              disabled
              v-if="chat.userUUID == getUserUUID"
              class="btn-yourself"
            >
              {{ $t("userAction.yourself") }}
            </button>
            <button
              @click="
                followUser(chat.username, chat.userImage, chat.userUUID, 0)
              "
              v-else
              class="btn-follow"
            >
              {{ $t("userAction.follow") }}
            </button>
          </div>
        </div>
      </div>

      <div id="my-poper" v-if="isShowCatalog" v-on-clickaway="closePoper">
        <ul class="pa-0">
          <li
            @click="clickCatalogItem(item)"
            class="item-catalog"
            v-for="(item, index) in catalog"
            :key="index"
          >
            <input type="checkbox" :checked="selectedCatalog.includes(item)" />
            <label for="vehicle1"
              >{{ item.title }} -
              <span class="userValues"> {{ CatValue[index] }} </span></label
            >
          </li>
        </ul>
      </div>
      <div id="bottom-button">
        <span class="error-message">
          <span v-if="errorMessage"> {{ errorMessage }} </span>
        </span>

        <div class="invitation-button">
          <div
            class="catalog-container"
            @click="isShowCatalog = !isShowCatalog"
          >
            <span class="catalog-selected">
              <span v-if="selectedCatalog.length > 0">
                <span v-for="(item, index) in selectedCatalog" :key="index">
                  {{ index === 0 ? item.title : "/ " + item.title }}
                </span>
              </span>
              <span v-else class="text-uppercase">
                select Category
              </span>
            </span>
            <span style="position: relative;top: 3px;">
              <v-icon color="#fff">fa-caret-down</v-icon>
            </span>
          </div>

          <div @click="sendBtnClick()">
            <span class="text-uppercase">
              send invitations
            </span>
            <v-icon size="18" color="#fff">fa-paper-plane</v-icon>
          </div>
        </div>
      </div>
    </div>
    <!-- Follow and UnFollow Dialog box-->
    <v-dialog v-model="followDialog" width="500" class="followDialog">
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
import { mixin as clickaway } from "vue-clickaway";
import { mapGetters, mapActions } from "vuex";
import config from "~/config/config.global";
import followBet from "~/components/modern/follow/followBet";

export default {
  mixins: [clickaway],
  components: {
    followBet
  },
  props: ["gameUUID", "stockName", "pathName"],
  data() {
    return {
      renderComponent: true, // render Follow Be
      errorMessage: "",
      isShowChat: false,
      isShowCatalog: false,
      isActiveEcWorld: true,
      catalog: [
        {
          id: "1",
          title: this.$root.$t("invitation.winBets")
        },
        {
          id: "2",
          title: this.$root.$t("invitation.totalFollower")
        },
        {
          id: "3",
          title: this.$root.$t("invitation.userRank")
        }
      ],
      CatValue: [],
      userRank: "",
      userFollow: "",
      userWinRate: "",
      selectedCatalog: [],
      globalInvitation: [],
      chanelInvitation: [],
      defaultImage: "/no-profile-pic.jpg",
      FolloworNot: "",
      FollowUserUUID: "",
      method: "",
      username: "",
      userImage: "",
      followDialog: false,
      chanelPageAvailable: ["modern-desktop-id", "modern-fullscreen-id"]
    };
  },
  created() {
    this.fetchUserInvitation();
  },
  mounted() {
    this.scrollDown();
    // Users World List  Invitaion Socket
    this.listenForBroadcast(
      {
        channelName: `messageSend.${this.getPortalProviderUUID}.global`,
        eventName: "messageSend"
      },
      ({ data }) => {
        const objectArray = Object.entries(data.data);
        let newData = [];
        objectArray.forEach(([key, value]) => {
          newData[key] = value;
        });
        this.globalInvitation.push(newData);
        this.scrollDown();
      }
    );
    // Users chanel List  Invitaion Socket
    this.startSocketChanel();
  },
  watch: {
    // active ec world for some pages that only not available chanel chat
    pathName(value) {
      if (!this.chanelPageAvailable.includes(value)) {
        this.isActiveEcWorld = true;
      }
    },
    gameUUID(value) {
      // Users chanel List  Invitaion Socket
      this.startSocketChanel();
    },
    stockName(value) {
      this.chanelInvitation = [];
    },
    isActiveEcWorld() {
      setTimeout(() => {
        this.scrollDown();
      }, 10);
    }
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getUserUUID", "getStockGameId"]),
    wiseBorderColor() {
      return catalog => {
        if (catalog.length === 1) {
          switch (catalog[0]) {
            case "1":
              return "chat-message-container border-color-rate";
            case "2":
              return "chat-message-container border-color-follower";
            case "3":
              return "chat-message-container border-color-rank";
          }
        } else {
          return "chat-message-container border-color-multi";
        }
      };
    },
    messageConversations() {
      if (this.isActiveEcWorld) {
        return this.globalInvitation;
      } else {
        return this.chanelInvitation;
      }
    }
    //get 2 data from vuex first, in the computed
  },
  methods: {
    // Render Follow Bet Component
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    // Set Error from SnackBar
    ...mapActions(["setSnackBarError"]),
    startSocketChanel() {
      if (this.chanelPageAvailable.includes(this.$route.name)) {
        this.listenForBroadcast(
          {
            channelName: `messageSend.${this.getPortalProviderUUID}.${this.gameUUID}`,
            eventName: "messageSend"
          },
          ({ data }) => {
            const objectArray = Object.entries(data.data);
            let newData = [];
            objectArray.forEach(([key, value]) => {
              newData[key] = value;
            });
            this.chanelInvitation.push(newData);
            this.scrollDown();
          }
        );
      }
    },
    closePoper() {
      this.isShowCatalog = false;
    },
    closeChat() {
      this.isShowChat = false;
    },
    switchChat() {
      this.isShowChat = !this.isShowChat;
      this.fetchUserInvitation();
    },
    changeChatCannel(value) {
      this.isActiveEcWorld = value;
    },
    clickCatalogItem(object) {
      if (!this.selectedCatalog.includes(object)) {
        this.selectedCatalog.push(object);
      } else {
        this.selectedCatalog.splice(
          this.selectedCatalog.findIndex(
            item => item.title.toLowerCase() === object.title.toLowerCase()
          ),
          1
        );
      }
    },

    sendBtnClick() {
      if (!this.isActiveEcWorld) {
        this.sendInvitationChannel();
      } else {
        this.sendInvitation();
      }
    },
    // fetch Users Invitation
    async fetchUserInvitation() {
      try {
        const reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          version: config.version
        };
        const res = await this.$axios.$post(
          config.getUserInvitationDetails.url,
          reqBody,
          {
            headers: config.header
          }
        );
        this.CatValue = [
          Math.round(res.data["winRate"]) + "%",
          res.data["followerCount"],
          "#" + res.data["rank"]
        ];
      } catch (ex) {
        this.setSnackBarError(true);
      }
    },
    // Send Top Player Users Invitation
    async sendInvitation() {
      if (this.selectedCatalog.length > 0) {
        this.errorMessage = "";
        try {
          const reqBody = {
            portalProviderUUID: this.getPortalProviderUUID,
            userUUID: this.getUserUUID,
            category: this.selectedCatalog.map(e => e.id),
            version: config.version
          };
          const res = await this.$axios.$post(
            config.getUserInvitation.url,
            reqBody,
            {
              headers: config.header
            }
          );
          if (res.code == 400) {
            this.errorMessage = res.message[0];
          }
        } catch (ex) {
          this.setSnackBarError(true);
        }
      } else {
        this.errorMessage = "Please Select Category";
      }
    },
    // Channel for gameUUDI
    async sendInvitationChannel() {
      if (this.selectedCatalog.length > 0) {
        this.errorMessage = "";

        try {
          let reqBody = {
            portalProviderUUID: this.getPortalProviderUUID,
            userUUID: this.getUserUUID,
            gameUUID: this.gameUUID,
            category: this.selectedCatalog.map(e => e.id),
            version: config.version
          };
          let res = await this.$axios.$post(
            config.getUserInvitation.url,
            reqBody,
            {
              headers: config.header
            }
          );
          if (res.code == 400) {
            this.errorMessage = res.message[0];
          }
        } catch (ex) {
          this.setSnackBarError(true);
        }
      } else {
        this.errorMessage = "Please Select Category";
      }
    },
    // After more Invitation Come Scroll Down Automatically
    scrollDown() {
      if ($("#chatting-content")[0]) {
        $("#chatting-content")
          .stop()
          .animate({ scrollTop: $("#chatting-content")[0].scrollHeight }, 1000);
      }
    },
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    // fetch default image or from server image
    userImgProfile(userImage) {
      return userImage === null
        ? this.defaultImage
        : `${config.apiDomain}/` + userImage;
    },
    // Close Follow Bet Popup
    closeFollowBet() {
      this.followDialog = false;
    },
    // Follow Users Bets
    followUser(username, userImage, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      method == 0 ? (this.FolloworNot = 1) : (this.FolloworNot = 2);
      this.userImage = this.userImgProfile(userImage);
      this.followDialog = true;
      this.forceRerender();
    }
  }
};
</script>

<style scoped>
.userValues {
  color: green;
  font-weight: 600;
  cursor: pointer;
}
button {
  outline: none;
}
.btn-yourself {
  padding: 5px 20px;
  background: linear-gradient(
    to right,
    rgba(10, 177, 118, 1) 0%,
    rgba(14, 177, 30, 1) 100%
  );
  border-radius: 5px;
  color: #fff;
  text-transform: uppercase;
}
.btn-follow {
  padding: 5px 20px;
  background: linear-gradient(
    to right,
    rgba(10, 177, 118, 1) 0%,
    rgba(14, 177, 30, 1) 100%
  );
  border-radius: 5px;
  color: #fff;
  text-transform: uppercase;
}
.chat-message-container {
  display: flex;
  background-color: #fff;
  margin: 5px;
  border-radius: 9px;
  padding: 5px 10px;
  align-items: center;
  position: relative;
  justify-content: space-between;
}
.border-color-follower {
  border: blueviolet solid 1px;
}
.border-color-rank {
  border: rgb(6, 245, 66) solid 1px;
}
.border-color-rate {
  border: red solid 1px;
}
.border-color-multi {
  border: rgb(210, 227, 243) solid 1px;
}
.item-catalog {
  padding: 8px;
  width: 100%;
  border-bottom: #e8e8e8 solid 1px;
  cursor: pointer;
}
input {
  cursor: pointer;
}
.item-catalog:last-child {
  border-bottom: none;
}
.item-catalog:hover {
  background-color: #e8e8e8;
}
#chat-container {
  position: fixed;
  z-index: 1000;
  height: 50%;
  min-height: 500px;
  max-height: 400px;
  width: 380px;
  bottom: 50px;
  right: 70px;
  background-color: #fff;
  border: green solid 1px;
  border-radius: 3px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3) !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#chat-container-header {
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.2);
}
.chat-header-item {
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  font-weight: bolder;
  font-size: 14px;
  cursor: pointer;
  background-color: #fff;
}
.chat-header-item:not(:first-child) {
  text-transform: uppercase;
}
.chat-header-item-active {
  color: #fff;
  background-color: #2baf3e;
}
#chatting-content {
  display: flex;
  flex-direction: column;
  height: 80%;
  position: relative;
  overflow-y: auto;
  background-color: #f4f4f4;
}
/* width */
#chatting-content::-webkit-scrollbar {
  width: 2px;
}

/* Handle */
#chatting-content::-webkit-scrollbar-thumb {
  background: #2baf3e;
}

#bottom-button {
  position: relative;
  height: 80px;

  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
.invitation-button {
  display: flex;
  height: 40px;
  width: 85%;
  line-height: 40px;
  background: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  border-radius: 5px;
  color: #fff;
  text-align: center;
  align-self: center;
}
.invitation-button > div {
  width: 50%;
  cursor: pointer;
}
.invitation-button > div:first-child {
  border-right: #e8e8e8 solid 1px;
  font-weight: bold;
}
.invitation-button > div:last-child {
  font-weight: bolder;
}
.catalog-selected {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 12px;
  cursor: pointer;
}
.catalog-container {
  display: flex;
  padding: 0 4px;
  justify-content: space-between;
}
#my-poper {
  position: absolute;
  display: block;
  background-color: #fff;
  opacity: 1 !important;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3) !important;
  width: 175px;
  bottom: 90px;
  left: 40px;
  border: #e8e8e8 solid 1px;
}
#my-poper:after,
#my-poper:before {
  top: 100%;
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

#my-poper:after {
  border-color: rgba(213, 213, 213, 0);
  border-top-color: #fff;
  border-width: 2px;
  margin-left: -2px;
}
#my-poper:before {
  border-color: rgba(245, 245, 245, 0);
  border-top-color: #fff;
  border-width: 8px;
  margin-left: -8px;
}

/* message style */
.userList {
  border-bottom: 1px solid #dddddd;
}
.ranking {
  color: #42c851;
  font-weight: 800;
  text-align: center;
  font-size: 1.5em;
}
.followcount {
  color: #5f70b1;
  font-weight: 800;
  text-align: center;
  font-size: 1.5em;
}
.winRate {
  color: #ed4561;
  font-weight: 800;
  text-align: center;
  font-size: 1.5em;
}
.catalog-label {
  padding-right: 5px;
  color: #585757;
  font-size: 16px;
  font-weight: 600;
}
.bodyChat {
  padding-top: 10px;
  border-bottom: 1px solid #dddddd;
  background-color: #f4f4f4;
  height: 500px;
  text-align: left;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 4px;
  margin-top: 10px;
}
.topWrap {
  background-color: #2bb13a;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 14px;
  height: 45px;
}
.ranking span:hover {
  color: green;
  cursor: pointer;
}
/* chat icon */
.liveChat {
  z-index: 999;
  position: fixed;
  right: 0px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  color: #fff;
  background-color: #2aaf3e !important;
}
.message-count {
  background-color: #585757;
  color: #fff;
  padding: 0 10px;
  border-radius: 40px;
}
.no-invitation {
  text-align: center;
  font-size: 18px;
  color: gray;
  font-weight: 100;
}

.error-message {
  min-height: 20px;
  margin-right: 5px;
  font-weight: 400;
  color: #ef5252;
  text-align: right;
  font-size: 12px;
}
</style>
