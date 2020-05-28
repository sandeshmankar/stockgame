<template>
  <div>
   
    <v-layout row wrap justify-end>
      <v-flex xs2 class="main-select">
        <p class="ma-0">Exclusive</p>
        <v-select hide-details :items="items" label="Sort By :" solo></v-select>
      </v-flex>
    </v-layout>

    <v-flex xs12>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">game id</th>
            <th scope="col">bet id</th>
            <th scope="col">stock name</th>
            <th scope="col">amount</th>
            <th scope="col">status</th>
            <th scope="col">payout</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 10" :key="n">
            <th scope="row">0104239720185520</th>
            <td>1654231567489421321</td>
            <td>stockname aaabb</td>
            <td>$90.00</td>
            <td>pending</td>
            <td>pending</td>
          </tr>
        </tbody>
      </table>
    </v-flex>
    <h1>Hello world</h1>
    <v-btn class="main-btn back">
      <v-icon>arrow_back_ios</v-icon>back
    </v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: ["day", "weeks", "months", "years"]
    };
  }
};
</script>