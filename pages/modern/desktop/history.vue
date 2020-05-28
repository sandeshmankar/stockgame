<template>
  <div>
    <breadcrumbs title="History" :linkItem="false" />
    <v-container> </v-container>
  </div>
</template>
<script>
import breadcrumbs from "~/components/breadcrumbs";
export default {
  layout: "desktopModern",
  components: {
    breadcrumbs
  }
};
</script>
