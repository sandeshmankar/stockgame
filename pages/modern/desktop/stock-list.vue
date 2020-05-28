<template>
  <div>
    <breadcrumbs :title="$t('breadcrumbs.stockList')" />
    <v-container>
      <v-layout row wrap mt-3 md6 align-center justify-center>
        <v-flex md10>
          <v-flex md6 class="d-flex">
        
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center justify-center>
        <v-flex md10 lg10>
          <stocklist />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import breadcrumbs from "~/components/breadcrumbs";
import stocklist from "~/components/modern/stocklist/stocklist";
export default {
  layout: "desktopModern",
  components: {
    stocklist,
    breadcrumbs
  },
  data() {
    return {
    
    };
  }
};
</script>
