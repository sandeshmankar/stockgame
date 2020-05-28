<template>
  <div xs2>
    <breadcrumbs :title="$t('breadcrumbs.rule')" />
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex md10 lg10 xs12 mt-3>
          <rules />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import rules from "~/components/modern/rule/rules";
import breadcrumbs from "~/components/breadcrumbs";
export default {
  layout: "desktopModern",
  components: {
    rules,
    breadcrumbs
  }
};
</script>
