<template>
  <v-layout row class="justify-center">
    <v-flex xs12 md12>
      <v-data-table
        :headers="head"
        :items="desserts"
        :items-per-page="5"
        ref="table"      
        class="current-bet"
      >
        <template v-slot:items="item">
          <td>{{item.item.title}}</td>
          <td>{{item.item.createdAt}}</td>
          <td>{{item.item.message}}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["head", "desserts"],
};
</script>



