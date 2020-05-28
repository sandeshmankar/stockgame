<template>
<div class="table-scroll table-wrapper-scroll-y pl-3">
  <div>
    <h4 align="center" fill-height fluid justify="center" v-show="getOnGoingBet.length <= 0" class="nobetting">{{ $t("msg.noBetting") }}</h4>
    <table class="main-table" v-show="getOnGoingBet.length > 0">
      <tbody v-for="(item, index) in getOnGoingBet" :key="index">
        <tr class="table-rowheight">
          <th class="fixed-side table-headbg">{{$t('msg.betId')}}</th>
          <td>{{ item.betUUID }}</td>
        </tr>
        <tr class="table-rowheight">
          <th class="fixed-side table-headbg">{{$t('msg.gameId')}}</th>
          <td>{{ item.gameUUID }}</td>
        </tr>
        <tr class="table-rowheight">
          <th class="fixed-side table-headbg">{{$t('msg.betDetail')}}</th>
          <td>{{ item.betAmount }} on rule ({{ item.ruleName }})</td>
        </tr>
        <tr class="table-rowheight">
          <th class="fixed-side table-headbg">{{$t('msg.time')}}</th>
          <td>{{ item.betDate }} {{ item.betTime }} {{item.createdDate}} {{item.createdTime}}</td>
        </tr>
        <tr class="table-rowheight">
          <th class="fixed-side table-headbg">{{$t('msg.amount')}}</th>
          <td>{{ item.betAmount }}</td>
        </tr>
        <tr class="table-rowheight">
          <th class="fixed-side table-headbg">{{$t('msg.payout')}}</th>
          <td>{{ item.payout }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from "vuex";
export default {
  computed: {
    ...mapGetters(["getOnGoingBet", "getMultiGameBet"])
  }
};
</script>

<style scoped>
.table-rowheight {
  height: 50px;
}

.table-scroll {
  position: relative;
  min-width: 400px;
  margin: auto;
  overflow: auto;
  max-height: 350px;
}

.table-wrapper-scroll-y {
  display: block;
}

.th {
  background-color: #f1f1f1;
}

.table-wrap {
  width: 100%;
  overflow: auto;
}

.table-scroll table {
  width: 100%;
  min-width: 100%;
  margin: auto;
  border-collapse: separate;
  border-spacing: 0;
}

.table-scroll th,
.table-scroll td {
  padding: 5px 10px;
  border: 1px solid #ebeced;
  background: #fff;
  white-space: nowrap;
  vertical-align: top;
}

.table-scroll thead,
.table-scroll tfoot {
  background: #f9f9f9;
}

.clone tbody th {
  visibility: visible;
  color: red;
}

.clone .fixed-side {
  border: 1px solid #000;
  background: #f1f1f1;
  visibility: visible;
}

.table-headbg {
  background: #f1f1f1 !important;
}

.clone thead,
.clone tfoot {
  background: transparent;
}

.nobetting {
  padding: 148px 48px !important;
}

::-webkit-scrollbar {
  width: 12px;
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
