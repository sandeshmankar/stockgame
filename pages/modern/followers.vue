<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <v-container>
      <followerList />
    </v-container>
  </div>
</template>
<script>
import followerList from "~/components/mobile/followerList";
export default {
  components: {
    followerList
  }
};
</script>
