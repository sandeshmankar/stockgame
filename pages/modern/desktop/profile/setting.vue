<template>
  <div>
    <v-flex xs12 class="pt-5 pl-5">
      <div>
        <h2 class="title_menu">{{ $t("menu.setting") }}</h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <v-flex xs12 pt-5 pl-5>
      <v-flex xs12>
        <div class="group_container">
          <span class="group_title">{{ $t("setting.account") }}</span>
          <div class="title_container">
            <div class="setting_container">
              <span>{{ $t("setting.usersAllowToVisitMyProfile") }}</span>
              <label class="switch">
                <input
                  @change="updateSetting"
                  type="checkbox"
                  ref="isAllowToVisitProfile"
                  :checked="getUserInfo.isAllowToVisitProfile"
                />
                <span class="slider round"></span>
              </label>
            </div>
            <!-- <div class="setting_container">
              <span>{{ $t("setting.usersAllowFollowMe") }}</span>
              <label class="switch">
                <input
                  @change="updateSetting"
                  type="checkbox"
                  ref="isAllowToFollow"
                  :checked="getUserInfo.isAllowToFollow"
                />
                <span class="slider round"></span>
              </label>
            </div> -->
          </div>
        </div>
      </v-flex>
      <v-flex xs12>
        <div class="group_container">
          <span class="group_title">{{ $t("setting.gameOptions") }}</span>
          <div class="title_container">
            <div class="setting_container">
              <span>{{ $t("setting.sound") }}</span>
              <label class="switch">
                <input
                  @change="updateSetting"
                  type="checkbox"
                  ref="isSound"
                  :checked="getUserInfo.isSound"
                />
                <span class="slider round"></span>
              </label>
            </div>
            <div class="setting_container">
              <span>{{ $t("setting.allowToLocation") }}</span>
              <label class="switch">
                <input
                  @change="updateSetting"
                  type="checkbox"
                  ref="isAllowToLocation"
                  :checked="getUserInfo.isAllowToLocation"
                />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </v-flex>
      <v-flex xs12>
        <div class="group_container">
          <span class="group_title">{{ $t("setting.chipOptions") }}</span>
          <div class="title_container">
            <chipsAmountDesktop />
          </div>
        </div>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import config from "~/config/config.global";
import secureStorage from "../../../../plugins/secure-storage";
import chipsAmountDesktop from "~/components/modern/setting/chipamount";

export default {
  components: {
    chipsAmountDesktop
  },
  mounted() {
    // this.updateSetting();
  },
  computed: {
    ...mapGetters(["getUserInfo", "getPortalProviderUUID", "getUserUUID"])
  },
  methods: {
    ...mapActions(["setUserData"]),
    async updateSetting() {
      // set value to 1 or 0 true==1 false==0
      let isAllowToVisitProfile = this.$refs.isAllowToVisitProfile.checked
        ? true
        : false;
      let isAllowToFollow = false;
      let isSound = this.$refs.isSound.checked ? true : false;
      let isAllowToLocation = this.$refs.isAllowToLocation.checked
        ? true
        : false;
      // end set value to 1 or 0 true==1 false==0

      try {
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          version: config.version,
          isAllowToVisitProfile,
          isAllowToFollow,
          isSound,
          isAllowToLocation
        };
        var res = await this.$axios.$post(
          config.updateUserSetting.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (res.status) {
          this.$swal.fire({
            position: "top",
            type: "success",
            title: this.$root.$t("msg.changesSaved"),
            showConfirmButton: false,
            timer: 1000
          });
          this.setUserData();
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.error(ex);
        this.$swal({
          type: "error",
          title: ex.message,
          timer: 1000
        });
      }
    }
  }
};
</script>

<style scoped>
.title_menu {
  text-transform: uppercase;
}

.titile {
  padding-left: 5px;
}

.group_title {
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
}

.title_container {
  padding-top: 15px;
  padding-bottom: 15px;
  text-transform: capitalize;
}

.setting_container {
  margin-left: 5px;
  margin-bottom: 15px;
  position: relative;
  width: 500px;
  padding: 10px;
  padding-left: 15px;
  border-width: 1px;
  border-style: solid;
  border-color: #bdbec1;
  border-radius: 10px;
}

/* switch */
.switch {
  position: relative;
  float: right;
  top: -6px;
  display: inline-block;
  width: 60px;
  height: 32px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f4f6fd;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  box-shadow: 0 0 5px #bdbec1;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 3px;
  background-color: #a8a7a8;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider::before {
  background-color: #38b062;
}

input:checked + .slider {
  background-color: white;
}

input:focus + .slider {
  box-shadow: 0 0 1px gra;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
