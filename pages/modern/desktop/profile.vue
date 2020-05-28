<template>
  <v-container>
    <input @change="uploadImage($event)" type="file" ref="inputFile" hidden />
    <v-layout pt-1 row wrap class="justify-center">
      <v-flex xs12 ms12 lg10 md10>
        <v-layout>
          <v-flex xs4 md3 lg3 xl2 class="pt-5" style="background-color:white">
            <div class="profile_head text-xs-center">
              <div class="image_container">
                <v-avatar :size="90">
                  <img :src="imgProfile" />
                </v-avatar>
                <span class="camera_container">
                  <button class="btn_camera">
                    <v-icon
                      color="black"
                      :size="20"
                      @click="avatarDialog = true"
                      >photo_camera</v-icon
                    >
                  </button>
                </span>
              </div>
              <h3 v-if="getUserInfo.firstName == null">
                {{ getUserInfo.userName }}
              </h3>
              <h3 v-if="getUserInfo.firstName" class="text-capitalize">
                {{ getUserInfo.firstName }} {{ getUserInfo.lastName }}
              </h3>
              <p>
                <b>{{ $t("profile.onlineStatus") }}</b> : {{ $t('profile.available')}}
              </p>
            </div>
            <div class="profile_menu">
              <div class="display_component"></div>
              <ul class="pa-3">
                <nuxt-link to="/modern/desktop/profile/">
                  <li
                    :class="
                      '/modern/desktop/profile/' === currentChild
                        ? 'menu_title_active'
                        : 'menu_title'
                    "
                  >
                    {{ $t("profile.basicInfo") }}
                  </li>
                </nuxt-link>
                <nuxt-link to="/modern/desktop/profile/onlinehistory/">
                  <li
                    :class="
                      '/modern/desktop/profile/onlinehistory/' === currentChild
                        ? 'menu_title_active'
                        : 'menu_title'
                    "
                  >
                    {{ $t("profile.onlineHistory") }}
                  </li>
                </nuxt-link>
                <nuxt-link to="/modern/desktop/profile/stockanalysis/">
                  <li
                    :class="
                      '/modern/desktop/profile/stockanalysis/' === currentChild
                        ? 'menu_title_active'
                        : 'menu_title'
                    "
                  >
                    {{ $t("profile.stockAnalysis") }}
                  </li>
                </nuxt-link>
                <nuxt-link to="/modern/desktop/profile/follower/">
                  <li
                    :class="
                      '/modern/desktop/profile/follower/' === currentChild
                        ? 'menu_title_active'
                        : 'menu_title'
                    "
                  >
                    {{ $t("profile.myFollowers") }}
                  </li>
                </nuxt-link>
                <nuxt-link to="/modern/desktop/profile/following/">
                  <li
                    :class="
                      '/modern/desktop/profile/following/' === currentChild
                        ? 'menu_title_active'
                        : 'menu_title'
                    "
                  >
                    {{ $t("profile.myFollowing") }}
                  </li>
                </nuxt-link>
                <nuxt-link to="/modern/desktop/profile/setting/">
                  <li
                    :class="
                      '/modern/desktop/profile/setting/' === currentChild
                        ? 'menu_title_active'
                        : 'menu_title'
                    "
                  >
                    {{ $t("profile.setting") }}
                  </li>
                </nuxt-link>
              </ul>
            </div>
          </v-flex>
          <!-- change component here when click menu  -->
          <v-flex xs8 sm9 lg10 xl10>
            <nuxt-child />
          </v-flex>
        </v-layout>
      </v-flex>

      <v-dialog v-model="avatarDialog" width="900" class="followDialog">
        <v-card class="followup">
          <h3 class="title" style="text-align: center; color: #0b2a68;">
           {{ $t('profile.chooseYourAvatar') }}
          </h3>
          <v-card-text style="text-align:center;">
            <div class="avatarImage" v-for="n in 10" v-bind:key="n">
              <v-img class="img" v-bind:src="imagePath + n + '.jpg'"></v-img>
              <span href class="userAvatar" @click="useAvatar(n)"
                >{{ $t('profile.useAvatar') }}</span
              >
            </div>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="avatarDialog = false">{{ $t('msg.close') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import config from "~/config/config.global";
import secureStorage from "../../../plugins/secure-storage";

export default {
  layout: "desktopModern",
  data() {
    return {
      imagePath: config.apiDomain + "/images/user/avatar/",
      avatarID: "",
      newImage: "",
      avatarDialog: false,
      defaultImage: `/no-profile-pic.jpg`,
      currentChild: "basicinfo",
      blurValue: 5,
      imageBase64: "",
      activeMenu: "online history",
      window: 0,
      active: null
    };
  },
  beforeUpdate() {
    // make a active menu
    this.currentChild = this.$route.path;
  },
  created() {
    // console.log(this.getUserInfo.profileImage);
    // make a active menu
    this.currentChild = this.$route.path;
    console.log(this.getUserInfo);
  },
  computed: {
    ...mapGetters(["getUserInfo", "getPortalProviderUUID", "getUserUUID"]),
    imgProfile() {
      if (this.getUserInfo.profileImage == null) {
        return `${this.defaultImage}`;
      } else {
        return `${config.apiDomain}/${this.getUserInfo.profileImage}`;
      }
    }
  },
  methods: {
    useAvatar(image) {
      this.newImage = this.imagePath + image + ".jpg";
      this.avatarID = image;
      this.avatarDialog = false;
      this.updateAvatarProfile();
    },
    ...mapActions(["setUserData"]),
    uploadImage(e) {
      let self = this;
      if (e.target.files && e.target.files[0]) {
        let FR = new FileReader();
        FR.addEventListener("load", function(e) {
          self.imageBase64 = e.target.result;
        });
        FR.readAsDataURL(e.target.files[0]);
      }
    },
    cameraClick() {
      this.$refs.inputFile.click();
    },
    // Update User Avatar
    async updateAvatarProfile() {
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
          this.blurValue = 0;
          this.setUserData();
          this.$swal({
            type: "success",
            title: this.$root.$t("msg.confirm"),
            showConfirmButton: false,
            timer: 1000
          });
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        this.imageBase64 = "";
        console.error(ex);
        this.$swal({
          title: ex.message,
          type: "error",
          timer: 1000
        });
      }
    }
  }
};
</script>

<style scoped>
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
  width: 15%;
  padding: 5px;
  display: inline-block;
}
.avatarImage .img {
  margin: 15px auto;
  border-radius: 180px;
  width: 100px;
  height: 100px;
  border: 2px solid #dddddd;
}
.followDialog {
  width: 800px;
  border-radius: 10px;
  padding: 15px;
}
.followup {
  padding: 15px 30px;
  border-radius: 20px;
}
.display_component {
  position: absolute;
  height: 550px;
  width: 5px;
  right: -5px;
  top: -73px;
  background: linear-gradient(to bottom, #6713cd 20%, #9b19a8 51%);
}
.btn_camera {
  background-color: #ffffff;
  border-radius: 50%;
  padding: 6px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
}
.btn_camera:focus {
  outline: none;
}
.image_container {
  position: relative;
  margin-bottom: 10px;
}
.blur-img {
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #39b01e;
  opacity: 0.5;
  left: 114px;
}
.camera_container {
  position: absolute;
  margin-top: 56px;
  margin-left: -28px;
  z-index: 1;
}
.profile_menu {
  margin-bottom: 100%;
  position: relative;
}

li {
  cursor: pointer;
  border-radius: 18px;
}
.menu_title {
  margin: 10px;
  padding: 15px;
  padding-left: 20px;
  text-transform: uppercase;
  font-weight: bold;
}
.menu_title_active {
  background-color: #2cb038;
  margin: 10px;
  padding: 10px;
  padding-left: 20px;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}
img {
  box-shadow: 1px 7px 19px rgb(145, 145, 145) !important;
}
</style>
