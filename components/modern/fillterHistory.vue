<template>
  <section class="filter">
    <v-container>
      <v-layout class="filter-history">
        <v-flex xs12 sm12 md6>
          <v-layout>
            <v-flex xs12 sm12 md5>
              <v-menu
                v-model="from"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    hide-details
                    v-model="dateFrom"
                    label="From"
                    append-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker color="#1db42f" v-model="dateFrom" @input="from = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm12 md5>
              <v-menu
                v-model="to"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    hide-details
                    v-model="dateTo"
                    label="To"
                    append-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker color="#1db42f" v-model="dateTo" @input="to = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm12 md2>
              <v-btn class="main-btn">Go</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md6>
          <v-layout>
            <v-flex xs6>
              <v-text-field hide-details placeholder="Search by name" prepend-inner-icon="search" />
            </v-flex>
            <v-flex xs6>
              <v-select hide-details :items="dropdown_font" placeholder="sort by"></v-select>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  data: () => ({
    dateFrom: new Date().toISOString().substr(0, 10),
    from: false,
    dateTo: new Date().toISOString().substr(0, 10),
    to: false,
    dropdown_font: ["day", "Week", "year"]
  })
};
</script>

<style>
</style>