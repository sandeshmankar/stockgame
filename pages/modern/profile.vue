<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <!-- image profile  display on mobile -->
    <v-flex xs12 mt-2 mb-2 v-if="$vuetify.breakpoint.xs">
      <v-layout row>
        <v-flex xs12 sm12 md4 lg3>
          <div class="profile_head text-xs-center">
            <div class="image_container">
              <v-avatar :size="90">
                <img :src="imgProfile" alt="img-profile" />
              </v-avatar>
              <span
                class="camera_container"
                style=" position: absolute; top: 9%;"
              >
                <v-icon
                  class="selectAvatar"
                  :size="20"
                  @click="avatarDialog = true"
                  >photo_camera</v-icon
                >
              </span>
            </div>
            <h3 class="text-capitalize">
              {{ getUserInfo.firstName }} {{ getUserInfo.lastName }}
            </h3>
            <span>
              <strong>{{ $t("profile.onlineStatus") }} :</strong>
              Available
            </span>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>

    <!-- image profile display on bigger device than mobile -->
    <v-flex xs12 sm12 :class="!$vuetify.breakpoint.xs ? 'mt-2' : ''">
      <v-layout row justify-center class="text-xs-center" mb-2>
        <v-flex xs2 sm6 md4 lg3 v-if="!$vuetify.breakpoint.xs">
          <div class="profile_head text-xs-center">
            <div class="image_container">
              <v-avatar :size="50">
                <img :src="imgProfile" alt="img-profile" />
              </v-avatar>
              <span
                class="camera_container"
                style="position: absolute;top: 5%;"
              >
                <v-icon color="black" :size="20">photo_camera</v-icon>
              </span>
            </div>
            <h3 class="text-capitalize">
              {{ getUserInfo.firstName }} {{ getUserInfo.lastName }}
            </h3>
            <p>
              <strong>{{ $t("profile.onlineStatus") }} :</strong>
              {{ getUserInfo.currentActiveTime }}
            </p>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex :class="$vuetify.breakpoint.xs ? 'xs6 sm6' : 'xs4 sm6'" md4 lg3>
          <div class="amount_container">
            <div class="decorator_card decorator_card_green"></div>
            <span>{{ $t("msg.accountBalance") }}</span>
            <br />
            <span class="amount">{{ getUserBalance | currency }}</span>
            <span class="title_currentcy"></span>
          </div>
        </v-flex>

        <v-flex :class="$vuetify.breakpoint.xs ? 'xs6 sm6' : 'xs4 sm6'" md4 lg3>
          <div class="amount_container">
            <div class="decorator_card decorator_card_blue"></div>
            <span>{{ $t("msg.rollingAmount") }}</span>
            <br />
            <span class="amount">{{
              getUserInfo.rollingAmount | currency
            }}</span>
            <span class="title_currentcy"></span>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-layout>
        <v-flex xs12 pa-2>
          <div>
            <!-- form profile -->
            <form
              :style="
                $vuetify.breakpoint.xs
                  ? 'text-align: end;'
                  : 'text-align: end; margin-left: 22%'
              "
            >
              <v-layout pl-2 pt-2>
                <v-flex xs3 sm2 md2 lg2 pr-2 class="text-xs-left">
                  <label for="userName">
                    {{ $t("profile.username") }}
                    <span style="color:red;">*</span>
                  </label>
                </v-flex>
                <v-flex xs9 sm6 md6 lg6 class="text-xs-center">
                  <input
                    ref="username"
                    type="text"
                    minlength="5"
                    maxlength="20"
                    v-model.trim="userName"
                    required="true"
                    id="userName"
                    name="userName"
                    placeholder="Type your Username"
                  />
                  <span class="icon-container">
                    <v-icon
                      :size="16"
                      color="#bdbdbd"
                      @click="iconClick($event)"
                      >edit</v-icon
                    >
                  </span>
                </v-flex>
              </v-layout>

              <v-layout pl-2 pt-2>
                <v-flex xs3 sm2 md2 lg2 class="text-xs-left">
                  <label for="firstName">{{ $t("profile.firstName") }}</label>
                </v-flex>
                <v-flex xs9 sm6 md6 lg6 class="text-xs-center">
                  <input
                    ref="firstName"
                    type="text"
                    maxlength="25"
                    v-model.trim="firstName"
                    id="first-name"
                    name="first-name"
                    :placeholder="$t('profile.firstName')"
                  />
                  <span class="icon-container">
                    <v-icon
                      :size="16"
                      color="#bdbdbd"
                      @click="iconClick($event)"
                      >edit</v-icon
                    >
                  </span>
                </v-flex>
              </v-layout>

              <v-layout pl-2 pt-2>
                <v-flex xs3 sm2 md2 lg2 class="text-xs-left">
                  <label for="lastName">{{ $t("profile.lastName") }}</label>
                </v-flex>
                <v-flex xs9 sm6 md6 lg6 class="text-xs-center">
                  <input
                    ref="lastName"
                    type="text"
                    maxlength="25"
                    v-model="lastName"
                    id="last-name"
                    name="last-name"
                    :placeholder="$t('profile.lastName')"
                  />
                  <span class="icon-container">
                    <v-icon
                      :size="16"
                      color="#bdbdbd"
                      @click="iconClick($event)"
                      >edit</v-icon
                    >
                  </span>
                </v-flex>
              </v-layout>

              <v-layout pl-2 pt-2>
                <v-flex xs3 sm2 md2 lg2 pt2 class="text-xs-left">
                  <label for="gender">
                    {{ $t("profile.gender") }}
                    <span style="color:red;">*</span>
                  </label>
                </v-flex>
                <v-flex xs9 sm6 md6 lg6 class="text-xs-center">
                  <select
                    ref="gender"
                    id="gender"
                    name="gender"
                    required="true"
                    v-model="gender"
                    :value="userData.gender"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                  <span class="icon-container">
                    <v-icon :size="16" color="#bdbdbd">arrow_drop_down</v-icon>
                  </span>
                </v-flex>
              </v-layout>

              <v-layout pl-2 pt-2>
                <v-flex xs3 sm2 md2 lg2 class="text-xs-left">
                  <label for="email">{{ $t("profile.email") }}</label>
                </v-flex>
                <v-flex xs9 sm6 md6 lg6 class="text-xs-center">
                  <input
                    ref="email"
                    type="text"
                    v-model.trim="email"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                  />
                  <span class="icon-container">
                    <v-icon
                      :size="16"
                      color="#bdbdbd"
                      @click="iconClick($event)"
                      >edit</v-icon
                    >
                  </span>
                </v-flex>
              </v-layout>

              <v-layout pl-2 pt-2>
                <v-flex xs3 sm2 md2 lg2 class="text-xs-left">
                  <label for="country">
                    {{ $t("profile.country") }}
                    <span style="color:red;">*</span>
                  </label>
                </v-flex>
                <v-flex xs9 sm6 md6 lg6 class="text-xs-center">
                  <select
                    ref="country"
                    id="country"
                    name="country"
                    required="true"
                    v-model="country"
                  >
                    <option value="CHN">China</option>
                    <option value="USA">USA</option>
                    <option value="THA">Thailand</option>
                    <option value="LAO">LAOS</option>
                  </select>
                  <span class="icon-container">
                    <v-icon :size="16" color="#bdbdbd">arrow_drop_down</v-icon>
                  </span>
                </v-flex>
              </v-layout>

              <v-layout pl-2 pt-2>
                <v-flex xs3 sm2 md2 lg2></v-flex>
                <v-flex pl-3 xs9 sm6 md6 lg6 class="text-xs-left">
                  <v-btn
                    :loading="updating"
                    :disabled="updating"
                    class="btn_save"
                    @click.prevent="saveClick()"
                    >{{ $t("msg.save") }}</v-btn
                  >
                  <v-btn class="btn_cancel" @click="cancelUpdateProfile">{{
                    $t("msg.cancel")
                  }}</v-btn>
                </v-flex>
              </v-layout>
            </form>
            <div class="row" style="text-align: -webkit-center;">
              <v-btn
                @click="$refs.onlineHistory.showDialogOnlineHistory()"
                :class="
                  $vuetify.breakpoint.xs
                    ? 'btn_save width-100'
                    : 'btn_save width-50'
                "
                class="btn_save width-50"
                block
              >
                <span class="padding-right-60">{{
                  $t("profile.onlineHistory")
                }}</span>
                <i class="fa fa-plus"></i>
              </v-btn>
              <v-btn
                @click="$refs.stockAnalysis.showDialogStockAnalysis()"
                :class="
                  $vuetify.breakpoint.xs
                    ? 'btn_save width-100'
                    : 'btn_save width-50'
                "
                block
              >
                <span class="padding-right-60">{{
                  $t("profile.stockAnalysis")
                }}</span>
                <i class="fa fa-plus"></i>
              </v-btn>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>

    <!-- User Select Avatar In Profile Page -->
    <v-dialog
      v-model="avatarDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-toolbar card dark style="background-color:#2cb13b;">
          <v-btn icon dark @click="avatarDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{
            $t("profile.chooseYourAvatar")
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout style="text-align:center;height:auto;">
          <v-flex xs12 sm12>
            <div class="avatarImage" v-for="n in 10" v-bind:key="n">
              <v-img class="img" v-bind:src="imagePath + n + '.jpg'"></v-img>
              <span class="userAvatar" @click="useAvatar(n)">{{
                $t("profile.useAvatar")
              }}</span>
            </div>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar">
      {{ this.messageShow }}
      <v-btn color="pink" text @click="snackbar = false">{{
        $t("profile.useAvatar")
      }}</v-btn>
    </v-snackbar>

    <OnlineHistory ref="onlineHistory"></OnlineHistory>
    <StockAnalysis ref="stockAnalysis"></StockAnalysis>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import OnlineHistory from "~/components/mobile/onlineHistory";
import StockAnalysis from "~/components/mobile/stockAnalysis";
import config from "../../config/config.global";
import secureStorage from "../../plugins/secure-storage";

export default {
  data() {
    return {
      messageShow: "",
      userName: "",
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      country: "",
      snackbar: false,
      avatarID: "",
      newImage: "",
      imagePath: config.apiDomain + "/images/user/avatar/",
      avatarDialog: false,
      updating: false,
      defaultImage: "/no-profile-pic.jpg"
    };
  },
  components: {
    OnlineHistory,
    StockAnalysis
  },
  computed: {
    ...mapGetters([
      "getUserInfo",
      "getPortalProviderUUID",
      "getUserUUID",
      "getUserBalance"
    ]),
    imgProfile() {
      return this.getUserInfo.profileImage === null
        ? this.defaultImage
        : `${config.apiDomain}/` + this.getUserInfo.profileImage;
    },
    userData() {
      let data = this.getUserInfo;
      return data;
    }
  },
  async mounted() {
    await this.setUserData();
    this.setInputData();
  },
  methods: {
    ...mapActions(["setUserData", "setSnackBarMessage"]),
    setInputData() {
      this.firstName = this.getUserInfo.firstName
        ? this.getUserInfo.firstName
        : "";
      this.lastName = this.getUserInfo.lastName
        ? this.getUserInfo.lastName
        : "";
      this.userName = this.getUserInfo.userName;
      this.gender = this.getUserInfo.gender ? this.getUserInfo.gender : "";
      this.email = this.getUserInfo.email ? this.getUserInfo.email : "";
      this.country = this.getUserInfo.country ? this.getUserInfo.country : "";
    },
    // Update Avatar Picture
    useAvatar(image) {
      this.newImage = this.imagePath + image + ".jpg";
      this.avatarID = image;
      this.updateImageProfile();
    },
    iconClick(e) {
      e.target.parentElement.parentElement.firstElementChild.focus();
    },
    cancelUpdateProfile() {
      this.$$forceUpdate();
      this.setInputData();
    },
    // Update Profile Picture
    async updateImageProfile() {
      var reqBody = {
        avatarID: this.avatarID,
        portalProviderUUID: this.getPortalProviderUUID,
        userUUID: this.getUserUUID,
        version: config.version
      };
      try {
        var res = await this.$axios.$post(
          config.updateUserProfile.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (res.status) {
          this.avatarDialog = false;
          this.setUserData();
        } else {
          this.setSnackBarMessage(config.error.general);
        }
      } catch (ex) {
        this.setSnackBarMessage(ex);
      }
    },
    async saveClick() {
      try {
        this.updating = true;
        const ref = this.$refs;
        if (!(ref.gender.value && ref.country.value && ref.username.value)) {
          throw new Error(this.$root.$t("profile.mandatoryField"));
        }
        var formData = new FormData();
        formData.append("portalProviderUUID", this.getPortalProviderUUID);
        formData.append("userUUID", this.getUserUUID);
        formData.append("email", this.email);
        formData.append("userName", this.userName);
        formData.append("firstName", this.firstName);
        formData.append("lastName", this.lastName);
        formData.append("gender", this.gender);
        formData.append("country", this.country);
        formData.append("version", config.version);
        var res = await this.$axios.$post(
          config.updateUserProfile.url,
          formData,
          {
            headers: config.header
          }
        );
        if (res.status) {
          await this.setUserData();
          this.updating = false;
          this.setInputData();
          this.setSnackBarMessage(this.$root.$t("profile.success"));
        } else {
          this.updating = false;
          throw new Error(res.message[0]);
        }
      } catch (ex) {
        this.updating = false;
        this.setInputData();
        if (ex.message == "It should be a valid email.") {
          this.setSnackBarMessage(this.$root.$t("profile.invalidEmail"));
        } else {
          this.setSnackBarMessage(ex.message);
        }
      }
    }
  }
};
</script>
<style scoped>
.selectAvatar {
  border: 1px solid #dddddd;
  border-radius: 50%;
  padding: 3px;
  background-color: #dddddd;
  margin: 0px -20px;
  color: #333;
}
.userAvatar {
  background-color: #0c2a69;
  padding: 6px 12px;
  margin-top: 10px;
  color: #ffffff;
  border: 1px solid;
  width: 100%;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
}
.avatarImage {
  height: 200px;
  text-align: center;
  margin: 10px;
  width: 40%;
  padding: 5px;
  display: inline-block;
}
.avatarImage .img {
  margin: 15px auto;
  border-radius: 50%;
  width: 130px;
  height: 130px;
  border: 2px solid #dddddd;
}
p {
  margin-bottom: 0px !important;
}

.padding-right-60 {
  padding-right: 60%;
}

.width-50 {
  width: 50%;
}

.width-100 {
  width: 100%;
}

/* .......form....... */
label {
  text-transform: capitalize;
}

input[type="text"]:disabled {
  background-color: #ccc;
}

input[type="text"],
select {
  width: 230px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: vertical;
  background-color: white;
  padding-right: 35px;
}

select {
  cursor: pointer;
}

input:focus,
select:focus {
  outline: none;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

.col-15 {
  float: left;
  width: 24%;
  margin-top: 16px;
}

.col-85 {
  position: relative;
  float: left;
  width: auto;
  margin-top: 16px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

.btn_save {
  background-color: #38af3e !important;
  color: white;
  border-radius: 7px;
}

.btn_cancel {
  background-color: #656464 !important;
  color: white;
  border-radius: 7px;
}

.amount_container {
  background-color: white;
  color: black;
  padding: 10px 0 10px 0;
  margin: 0 10px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
  border-radius: 10px;
  border-left-width: 1px;
  border-left-color: green;
  text-align: center;
  text-transform: capitalize;
  line-height: 1.1;
  min-height: 50px;
}

.amount {
  font-size: 15px;
  font-weight: bold;
  position: relative;
}

.title_currentcy {
  color: #888888;
  font-size: 14px;
  text-transform: uppercase;
  padding-left: 5px;
  position: absolute;
}

.decorator_card {
  position: absolute;
  height: 20px;
  width: 5px;
  border-radius: 10px;
  margin-top: 8px;
  margin-left: -2px;
}

.decorator_card_green {
  background-color: #39b01e;
}

.decorator_card_blue {
  background-color: #1e45b0;
}

.decorator_card_red {
  background-color: #b01e1e;
}

.icon-container {
  position: relative;
  right: 37px;
}

/* loading.... */
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
