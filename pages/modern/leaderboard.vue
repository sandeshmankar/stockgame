<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <v-container>
      <leaderboardUserlist />
    </v-container>
  </div>
</template>
<script>
import leaderboardUserlist from "~/components/mobile/leaderboardUserlist";
export default {
  components: {
    leaderboardUserlist
  }
};
</script>
