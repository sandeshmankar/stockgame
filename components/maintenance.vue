<template>
  <div xs2>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 mt-5>
          <h1 class="topheader">
            OOPS!
          </h1>
          <v-img
            src="\maintenance\under-maintenanceimg.png"
            class="text-xs-center text-justify image"
          >
          </v-img>
          <div class="mainBox">
            <h1 class="header">
              SORRY, WE'RE DOWN FOR
            </h1>
            <h1 class="subhead">SCHEDULED MAINTENANCE</h1>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "desktopModern"
};
</script>
<style scoped>
.topheader {
  margin: 0px;
  color: #e1e1e1;
  text-align: center;
  font-size: 70px;
}
.mainBox {
  width: 40%;
  margin: 30px auto;
}
.header {
  color: #e1e1e1;
  font-size: 40px;
  text-align: center;
}
.subhead {
  color: #0a2a68e6;
  font-size: 40px;
  text-align: center;
}
.image {
  box-shadow: 0 25px 20px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.19);
  width: 50%;
  margin: 0 auto;
}
</style>
