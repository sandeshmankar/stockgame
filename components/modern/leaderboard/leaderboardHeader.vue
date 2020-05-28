<template>
  <div>   
    <v-flex xs12 md10 lg10 style="margin:0 auto;">
      <v-layout row>
        <v-flex grow pa-1>
          <p class="float-left md6 lg8">
            <span class="title">{{$t('leaderboard.Top10Leaders')}}</span> ({{$t('leaderboard.lastupdate')}})
          </p>
        </v-flex>
        <v-flex grow pa-1 class="text-lg-right ranking">
          <span class="text-uppercase font-weight-bold">
            <v-icon small>event</v-icon>{{$t('leaderboard.weeklyrankings')}}
          </span>
          <span class="text-uppercase font-weight-bold">
            <v-icon small>event</v-icon>{{$t('leaderboard.monthlyrankings')}}
          </span>
        </v-flex>
      </v-layout>    
      </v-flex>
  </div>
</template>
<style scoped>
.followup {
  padding: 10px;
  border-radius: 20px;
}
.ranking span:hover {
  color: green;
  cursor: pointer;
}
.topHeader p:first-child {
  border: 1px solid;
}
.header {
  color: #6c6c6c;
}
.userRow {
  border-radius: 10px;
  background-color: #ffffff;
  margin: 5px 0px;
  padding: 10px 0px;
}
.userRow th {
  border-right: 1px solid #dddddd;
  width: 25%;
  padding: 5px;
}
.userRow th:first-child span {
  vertical-align: middle;
}
.userRow th:first-child i {
  vertical-align: middle;
  /* border-radius:10px; */
}
.pimage {
  border-radius: 180px;
}
</style>