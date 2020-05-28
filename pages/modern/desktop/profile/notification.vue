<template>
  <div>
    <v-flex xs12 class="pt-5 pl-5">
      <div>
        <h2 class="title_menu">{{ $t("notification.myNotification") }}</h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <v-flex xs12 pt-5 pl-5>
      <v-flex xs12>
        <div class="group_container">
          <span class="group_title">
            {{
            $t("notification.receiveByEmail")
            }}
          </span>
          <div class="title_container">
            <!-- <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" @click="dialog = showAlert()"/> -->
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">
              {{
              $t("notification.insufficientBalance")
              }}
            </span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">{{ $t("notification.winingBets") }}</span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">{{ $t("notification.losingBets") }}</span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">{{ $t("notification.usersFollowMe") }}</span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">
              {{
              $t("notification.amountCreditedOrDebitedToAccount")
              }}
            </span>
            <br />
          </div>
        </div>
      </v-flex>
      <v-flex xs12>
        <div class="group_container">
          <span class="group_title">
            {{
            $t("notification.receiveByMessage")
            }}
          </span>
          <div class="title_container">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">
              {{
              $t("notification.insufficientBalance")
              }}
            </span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">{{ $t("notification.winingBets") }}</span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">{{ $t("notification.losingBets") }}</span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">{{ $t("notification.usersFollowMe") }}</span>
            <br />
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <span class="titile">
              {{
              $t("notification.amountCreditedOrDebitedToAccount")
              }}
            </span>
            <br />
          </div>
        </div>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    showAlert() {
      this.$swal.fire({
        position: "top",
        type: "success",
        title: "Changes saved",
        showConfirmButton: false,
        timer: 1000
      });
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
.title_container span {
  padding-top: 15px;
}
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  color: #353333;
}

.chart_container {
  background-color: white;
  color: black;
  padding: 10px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
  border-radius: 10px;
  width: 100%;
  height: 420px;
}
.date_picker {
  background-color: white;
  color: black;
  padding: 10px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
  border-radius: 10px;
  position: relative;
}
.title_date_picker {
  padding-left: 10px;
  padding-bottom: 5px;
  color: #353333;
  text-transform: uppercase;
  min-height: 30px;
}
.icon_date {
  float: right;
  margin-top: -2px;
}
.select_date {
  text-transform: uppercase;
}
/* checkbox */
</style>
