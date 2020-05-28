<template>
  <v-layout row class="justify-center">
    <v-flex xs12 md12>
      <v-list-tile v-if="notificationData.length == 0" class="notBets">
        <h3>{{$t("notification.noNotification")}}</h3>
      </v-list-tile>
      <v-list three-line v-if="notificationData.length > 0">
        <template v-for="(item, index) in notificationData">
          <v-list-tile :key="item.date">
            <v-list-tile-content>
              <v-list-tile-sub-title class="heading" v-html="item.title"></v-list-tile-sub-title>
              <v-list-tile-sub-title v-html="item.message"></v-list-tile-sub-title>
              <v-list-tile-sub-title v-html="item.createdAt"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider :key="index"></v-divider>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["notificationData"]
};
</script>

<style scoped>
.notBets {
  font-size: 16px;
  color: #9e8e8e;
  text-align: center;
  margin: 50% auto;
}
.notBets h3 {
  text-align: center;
  margin: 0 auto;
}
.heading {
  font-weight: 600;
}
table {
  border: none;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 2px 3px 10px rgb(0, 0, 0, 0.3);
}

.thead-dark {
  border-radius: 10px !important;
  color: #fff;
  background-color: #f5f5f5;
}

.bg-colors {
  font-size: 18px;
  color: #333;
  background-color: #f5f5f5 !important;
  border-bottom: 1px solid #ddd;
  padding: 10px;
}

tbody tr td {
  padding: 20px;
  font-size: 16px;
}
</style>
