<template>
  <popper
    trigger="click"
    :options="{
      placement: 'bottom-top',
      modifiers: { offset: { offset: '95px' } }
    }"
  >
    <div class="popper">
      <div id="headerChat">
        <span
          class="tabs"
          @click="activeTab('world')"
          :class="{ active: tabActiveName === 'world' }"
        >
          <a href="#">
            {{ $t("invitation.ecWorld") }}
            <span class="count">{{ globalInvitation.length }}</span>
          </a>
        </span>
        <span
          class="tabs"
          @click="activeTab('chanel')"
          v-if="isShowChanel"
          :class="{ active: tabActiveName === 'chanel' }"
        >
          <a href="#">{{ stockName }} Channel</a>
        </span>
      </div>
      <!-- conversation area -->
      <div class="chatRoom">
        <!-- for EC World -->
        <div v-if="tabActiveName === 'world'">
          <div class="conve-container">     
            <div class="bodyChat">
              <div class="messageChatView noRecord" v-if="globalInvitation.length == 0">
                <i class="fa fa-bell"></i>
                <p>{{$t("invitation.noInvitation")}}</p>
              </div>

              <div class="msgUser" v-for="data in globalInvitation" :key="data.index">
                <div class="messageChatView" v-if="globalInvitation.length > 0">
                  <div>
                    <nuxt-link :to="'/modern/desktop/userprofile/' + data.userUUID">
                      <v-img
                        class="userImage"
                        :src="userImgProfile(data.userImage)"
                        aspect-ratio="1"
                        max-height="120"
                        max-width="120"
                      ></v-img>
                    </nuxt-link>
                  </div>
                  <div>
                    <div class="ranking" v-if="data.category.some(element => element == 3)">
                      <span
                        v-if="
                          data.category[0] == 3 && data.category.length == 1
                        "
                        class="label"
                      >{{$t("invitation.winningRank")}}</span>

                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <span v-on="on">#{{ data.Rank }}</span>
                        </template>
                        <span>{{$t("invitation.userRank")}}</span>
                      </v-tooltip>
                    </div>
                    <div v-if="data.category.some(element => element == 2)" class="followcount">
                      <span
                        v-if="
                          data.category[0] == 2 && data.category.length == 1
                        "
                        class="label"
                      >{{$t("invitation.totalFollower")}}</span>
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <span v-on="on">{{ data.followerCount }}</span>
                        </template>
                        <span>{{$t("invitation.userFollowCount")}}</span>
                      </v-tooltip>
                    </div>
                    <div class="winRate" v-if="data.category.some(element => element == 1)">
                      <span
                        v-if="
                          data.category[0] == 1 && data.category.length == 1
                        "
                        class="label"
                      >{{$t("invitation.winningRate")}}</span>
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <span v-on="on">{{ data.winRate }}%</span>
                        </template>
                        <span>{{$t("invitation.userWinRate")}}</span>
                      </v-tooltip>
                    </div>
                  </div>
                  <div class="followingButtton">
                    <v-btn
                      v-if="getUserUUID != data.userUUID"
                      class="following"
                      v-on:click="followUser(null, data.userImage, data.userUUID, '0')"
                    >{{$t("userAction.follow")}}</v-btn>
                    <v-btn
                      v-if="getUserUUID == data.userUUID"
                      class="following"
                    >{{$t("userAction.yourself")}}</v-btn>
                  </div>
                </div>
              </div>
            </div>
            <span class="leftMessage">
            <span v-if="invitationMessage"> {{ invitationMessage }} </span>
            </span>
            <div class="messageChat">
              <v-flex col-md-12>
                <v-btn class="buttonInvitation">
                  <v-select
                    class="selectCategory"
                    item-text="value"
                    item-value="id"
                    v-model="selectCategory"
                    :items="categoryName"
                    multiple
                    label="Select Category"
                  ></v-select>&nbsp;
                  <i @click="sendInvitation()" class="fa fa-paper-plane"></i>
                </v-btn>
              </v-flex>
            </div>
          </div>
        </div>

        <!-- for game chanel  -->
        <chanelChat
          v-show="tabActiveName === 'chanel'"
          :gameUUID="gameUUID"
          :stockName="stockName"
          :key="gameUUID"
        ></chanelChat>
      </div>
    </div>

    <!-- Follow Dialog -->
    <v-dialog v-model="dialog" width="500" class="followDialog">
      <followBet
        :username="this.username"
        :userImage="this.userImage"
        :FollowerUserUUID="this.FollowUserUUID"
        :isFollowing="this.FolloworNot"
        @followBetClose="closeFollowBet"
      />
    </v-dialog>

    <v-btn right fab slot="reference" class="liveChat">
      <v-icon>fa-comments</v-icon>
    </v-btn>
  </popper>
</template>
<script>
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import moment from "moment";
import config from "~/config/config.global";
import chanelChat from "./chanelChat";
import followBet from "~/components/modern/follow/followBet";
import log from "roarr";
let name = "btc5";
export default {
  components: {
    chanelChat,
    followBet,
    popper,
    config
  },
  props: {
    gameUUID: {
      type: String
    },
    stockName: {
      type: String
    }
  },
  data() {
    return {
      invitationMessage: "",
      color: "",
      mode: "",
      snackbar: false,
      timeout: 2000,
      x: null,
      y: "top",
      selectCategory: [],
      categoryName: [
        {
          id: "1",
          value: "Win Bets"
        },
        {
          id: "2",
          value: "Total Follower"
        },
        {
          id: "3",
          value: "Rank"
        }
      ],
      FolloworNot: "",
      FollowUserUUID: "",
      username: "",
      userImage: "",
      dialog: false,
      defaultImage: "/no-profile-pic.jpg",
      selectedFruits: [],
      currentRoute: "",
      messageInput: "",
      pageActiveChanel: ["modern-desktop-id", "modern-fullscreen-id"],
      tabActiveName: "world",
      globalInvitation: [],
      connectClient: [],
      totoalUserCount: 0,
      userId: 0
    };
  },
  computed: {
    icon() {
      if (this.likesAllFruit) return "mdi-close-box";
      if (this.likesSomeFruit) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    ...mapGetters(["getPortalProviderUUID", "getUserUUID", "getStockGameId"]),
    isShowChanel() {
      if (this.pageActiveChanel.includes(this.$route.name)) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
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
  },
  updated() {
    this.scrollDown();
  },
  created() {
    this.currentRoute = this.$route.name;
    //reset chat messgae
    this.messageInput = "";
  },
  methods: {
    // Set Image
    userImgProfile(userImage) {
      return userImage === null
        ? this.defaultImage
        : `${config.apiDomain}/`+userImage;
    },
    // Close Follow Bet Popup
    closeFollowBet() {
      this.dialog = false;
    },
    // Send Top Player Users Invitation
    async sendInvitation() {
      if (this.selectCategory.length > 0) {     
          try {
            const reqBody = {
              portalProviderUUID: this.getPortalProviderUUID,
              userUUID: this.getUserUUID,
              category: this.selectCategory,
              version: config.version
            };
            const res = await this.$axios.$post(
              config.getUserInvitation.url,
              reqBody,
              {
                headers: config.header
              }
            );
           if(res.code == 400){
              this.invitationMessage = res.message[0];
           }
          } catch (ex) {
            this.$swal({
              title: ex.message,
              type: "error",
              timer: 1000
            });
          }       
      }else{
        this.invitationMessage = "Please Select Cateogry.";
      }
    },   
    // Follow Users Bets
    followUser(username, userImage, userUUID, method) {     
      this.username = username;
      this.FollowUserUUID = userUUID;
      method == 0 ? this.FolloworNot = 1 : this.FolloworNot = 2 
      this.userImage = this.userImgProfile(userImage);
      this.dialog = true;
    },
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.selectedFruits = [];
        } else {
          this.selectedFruits = this.fruits.slice();
        }
      });
    },
    scrollDown() {
      $(".bodyChat")
        .stop()
        .animate(
          {
            scrollTop: $(".bodyChat")[0].scrollHeight
          },
          1000
        );
    },
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    activeTab(value) {
      this.tabActiveName = value;
    }
  }
};
</script>
<style scoped>
.theme--light.v-select .v-select__selections {
  color: #fff !important;
}
.selectCategory {
  width: 120px !important;
  font-size: 14px;
  color: #fff !important;
}
.count {
  background-color: #fff;
  border-radius: 180px;
  width: 30px;
  height: 30px;
  font-size: 12px;
  text-align: center;
}
.noRecord {
  text-align: center;
  font-size: 16px;
  padding-top: 50%;
  color: #777777;
}
.noRecord i {
  font-size: 24px;
}
.followDialog {
  width: 600px;
  border-radius: 10px;
  padding: 10px;
}
.followup {
  padding: 15px 30px;
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
  padding: 10px;
  margin-top: -8px;
  width: 96%;
  color: #fff !important;
  border-radius: 3px;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  text-align: center;
  height: 50px;
}
.buttonInvitation i {
  padding: 12px;
  font-size: 25px;
  border-left: 2px solid;
  margin-top: -27px;
}
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
.popper {
  right: 20px;
  width: 370px;
  border-radius: 10px;
  border: 1px solid #dddddd;
}
.liveChatImg {
  text-align: center;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  margin: 20% auto;
  background-color: #fff;
  /* border: 1px solid red; */
}
.liveChatButton {
  text-align: center;
  background-color: #2aaf3e;
  width: 50px;
  height: 50px;
  border-radius: 180px;
}
.chatRoom {
  height: 500px;
  width: 100%;
  padding: 2px 3px;
  border-radius: 5px;
  background-color: #fff;
}
.msgUser {
  padding: 2px 0px;
  overflow: auto;
  border-radius: 8px;
  max-width: 375px;
  text-align: justify;
  margin: 5px 0px;
  background-color: #fff;
  border: 1px solid #dddddd;
}
.filter {
  margin-top: 10px;
}
.filter .filterSpan {
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
  padding: 5px;
  margin: 10px 5px;
  font-size: 12px;
  color: #8d8c8c;
}
.follow {
  border: 1px solid orange;
}
.rank {
  border: 1px solid #c6b2f0;
}
.rate {
  border: 1px solid green;
}
.messageChatView div:first-child {
  border: none;
}
.messageChatView div {
  margin: 0px 3px;
  cursor: pointer;
  float: left;
  text-align: center;
  padding: 2px 4px;
}
.messageChatView .userImage {
  border-radius: 180px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  float: left;
  border: 1px solid #dddddd;
}
.messageChatView .userStatus {
  float: left;
  margin: 12px 5px;
  font-size: 13px;
  color: #8d8c8c;
  font-weight: 800;
}
.msgUser .ranking {
  float: left;
  font-size: 20px;
  margin: 4px 0px;
  color: #42c851;
  font-weight: 800;
  text-align: center;
}
.msgUser .followcount {
  float: left;
  font-size: 20px;
  margin: 4px 0px;
  color: #5f70b1;
  font-weight: 800;
  text-align: center;
}
.msgUser .winRate {
  float: left;
  font-size: 20px;
  margin: 4px 0px;
  color: #42c851;
  font-weight: 800;
  text-align: center;
}
.msgUser .followingButtton {
  margin: 4px 0px;
  padding: 0px;
  float: right;
}

.label {
  margin-top: -5px;
  color: #585757;
  font-size: 14px;
}
.messageChatView .following {
  float: right;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  border-radius: 6px;
  color: #fff;
  box-shadow: none;
  height: 24px;
  width: 28px;
  font-size: 13px;
}
#headerChat {
  height: 45px;
}
#headerChat span:first-child a {
  border-top-left-radius: 15px;
}
#headerChat span:last-child a {
  border-top-right-radius: 15px;
}
#headerChat .tabs span {
  background-color: #fff;
  color: #333;
  padding: 0px 4px;
  height: 30px;
  width: 30px;
  font-size: 14px;
}
#headerChat .tabs {
  text-align: center;
  width: 50%;
  float: left;
}
#headerChat .tabs a {
  font-weight: 500;
  text-transform: uppercase;
  width: 100%;
  /* border-top-right-radius: 20px; */
  font-size: 13px;
  float: left;
  padding: 10px 15px;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2) !important;
}
#headerChat .active a {
  color: #fff;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  background-color: #003e70 !important;
}
.bodyChat {
  padding-top: 10px;
  border-bottom: 1px solid #dddddd;
  background-color: #f4f4f4;
  height: 410px;
  text-align: left;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 4px;
  margin-top: 10px;
}
.msgBody {
  color: #7f7e7e;
}
.messageChat {
  width: 100%;
  bottom: 5px;
  background-color: #fff;
}
.leftMessage {
  padding: 0px 10px;
  margin-bottom: 10px;
  font-weight: 400;
  color: #ef5252;
  text-align: right;
  font-size: 12px;
  height: 20px;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 7px #acacac;
  border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #acacac;
  border-radius: 15px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2c6b9e;
}
</style>