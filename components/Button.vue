<template>
  <v-btn class="main-btn" :to="linkItem">{{ btnTitle }}</v-btn>
</template>
<script>
export default {
  props: ["linkItem", "btnTitle"]
};
</script>

<style></style>
