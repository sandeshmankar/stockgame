<template>
  <div>
    <breadcrumbs
      :title="$t('breadcrumbs.leaderBoard')"
      linkItem="bet-history"
      :titlebtn="$t('breadcrumbs.betHistory')"
    />
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex md12 lg10 xs12 mt-2>
          <!--  Leaderboard Users List -->
          <leaderboardUserlist />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import leaderboardUserlist from "~/components/modern/leaderboard/leaderboardUserlist";
import breadcrumbs from "~/components/breadcrumbs";
export default {
  layout: "desktopModern",
  components: {
    breadcrumbs,
    leaderboardUserlist: leaderboardUserlist
  },
  data() {
    return {
      tabs: ["history", "current bet"],
      active: null
    };
  }
};
</script>
