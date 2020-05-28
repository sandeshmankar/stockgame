<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <v-container>
      <followingList />
    </v-container>
  </div>
</template>
<script>
import followingList from "~/components/mobile/followingList";
export default {
  components: {
    followingList
  }
};
</script>
