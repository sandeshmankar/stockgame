<template>
  <v-card id="notification-box-container">
    <div class="item-list-container" v-if="data.length > 0">
      <div
        @click="$router.push(pageLink(list.type))"
        class="notification-item"
        v-for="(list, index) in data"
        :key="index"
      >
        <div>
          <v-avatar :size="40" color="#d1ecf1">
            <v-icon :size="20">fa-user-o</v-icon>
          </v-avatar>
        </div>
        <div class="message-text-container">
          <div class="title">{{ list.title }}</div>
          <!-- notificationUUID -->
          <div class="description">{{ list.message }}</div>
          <div class="dateTime">{{ list.createdAt }}</div>
          <!-- <div class="delete-notification-icon" v-if="hoverIndex === index">
          <v-icon color="#989898" :size="20">fa-times</v-icon>
        </div> -->
        </div>
      </div>
    </div>
    <div v-else class="no-notification">
      <i class="fa fa-bell-slash"></i>
      <p>there are no notifications</p>
    </div>
    <div id="view-all" @click="viewAll()">
      <span>{{ $t("notification.viewAll") }}</span>
    </div>
  </v-card>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      nodata: []
      //   for remove notification
      //   hoverIndex: ""
    };
  },
  methods: {
    viewAll() {
      this.$router.push("/modern/desktop/notification/");
      $("#closeButton").click();
    },
    pageLink(type) {
      $("#closeButton").click();
      return type == 3
        ? "/modern/desktop/profile/follower/"
        : "/modern/desktop/notification";
    }
    //   for remove notification
    // setHoverIndex(index) {
    //   this.hoverIndex = index;
    // }
  }
};
</script>

<style scoped>
#view-all {
  border-top: 1px solid #dddddd;
  text-align: center;
  cursor: pointer;
  padding:8px 4px;
  color: #003f70;
}
#notification-box-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1000;
  top: 70px;
  right: 30px;
  border-radius: 8px;
  min-width: 350px;
}
.no-notification {
  text-align: center;
  font-size: 22px;
  color: gray;
  font-weight: 100;
  min-height: 500px;
  max-height: 500px;
  position: relative;
  padding-top: 50%;
}
.item-list-container {
  padding: 8px 0px;
  min-height: 350px;
  max-height: 350px;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 7px #acacac;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #acacac;
  border-radius: 7px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2c6b9e;
}

.notification-item {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 70px;
  border-bottom: #dddddd solid 1px;
  border-radius: 0px !important;
  background-color: #f9f9f9;
  cursor: pointer;
}
.notification-item:hover {
  background-color: #fff;
}
.notification-item > div:first-child {
  width: 20%;
  text-align: center;
}
.notification-item > div:last-child {
  width: 80%;
}
.message-text-container {
  display: flex;
  flex-direction: column;
  position: relative;
}
.title {
  font-size: 14px !important;
  color: #003f70;
}
.description {
  font-size: 12px;
  color: #333;
}
.dateTime {
  font-size: 12px;
  color: #636363;
}
.delete-notification-icon {
  position: absolute;
  right: -15px;
  top: 12px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  background-color: #c5c7cb;
  justify-content: center;
  cursor: pointer;
}
</style>
