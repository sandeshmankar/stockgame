<template>
  <div>
    <v-layout row wrap justify-center>
      <div>
        <v-flex class="setting_container">
          <span class="pt-1">{{
            $t("setting.usersAllowToVisitMyProfile")
          }}</span>
          <label class="switch">
            <input
              @change="updateSetting"
              type="checkbox"
              ref="isAllowToVisitProfile"
              :checked="getUserInfo.isAllowToVisitProfile"
            />
            <span class="slider round"></span>
          </label>
        </v-flex>
        <v-flex class="setting_container">
          <span class="pt-1">{{ $t("setting.sound") }}</span>
          <label class="switch">
            <input
              @change="updateSetting"
              type="checkbox"
              ref="isSound"
              :checked="getUserInfo.isSound"
            />
            <span class="slider round"></span>
          </label>
        </v-flex>
        <v-flex class="setting_container">
          <span class="pt-1">{{ $t("setting.allowToLocation") }}</span>
          <label class="switch">
            <input
              @change="updateSetting"
              type="checkbox"
              ref="isAllowToLocation"
              :checked="getUserInfo.isAllowToLocation"
            />
            <span class="slider round"></span>
          </label>
        </v-flex>
      </div>
    </v-layout>
    <v-snackbar v-model="snackbar">
      {{ this.messageShow }}
      <v-btn flat color="pink" text @click="snackbar = false">
        {{ $t('msg.close') }}
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import config from "~/config/config.global";

export default {
  data() {
    return {
      messageShow: "",
      snackbar: false
    };
  },
  computed: {
    ...mapGetters(["getUserInfo", "getPortalProviderUUID", "getUserUUID"])
  },
  methods: {
    ...mapActions(["setUserData"]),
    // Update Sount on or Off
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
          this.snackbar = true;
          this.messageShow = this.$root.$t("msg.changesSaved");
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
.title_container {
  padding-top: 15px;
  padding-bottom: 15px;
  text-transform: capitalize;
}

.setting_container {
  margin-left: 5px;
  margin-bottom: 15px;
  position: relative;
  width: 300px;
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
  width: 65px;
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
  left: 10%;
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
