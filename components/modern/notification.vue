<template>
  <v-layout row class="justify-center">
    <v-flex xs12 md10 lg10>
      <v-data-table
        :items="notificationData"
        :items-per-page="5"
        ref="table"
        class="current-bet"
        :rows-per-page-text="msg"
      >
        <template v-slot:headers="head">
          <tr>
            <th scope="col">{{ $t("msg.titles") }}</th>
            <th scope="col">{{ $t("msg.date") }}</th>
            <th scope="col">{{ $t("msg.preview") }}</th>
          </tr>
        </template>
        <template v-slot:items="item">
          <td>{{ item.item.title }}</td>
          <td>{{ item.item.createdAt }}</td>
          <td>{{ item.item.message }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["notificationData"],
  data() {
    return {
      msg: this.$root.$t("msg.rowsPerPage")
    };
  }
};
</script>
