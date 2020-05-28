<template>
  <section class="breadcrumbs">
    <v-container >
      <v-parallax dark height="130">
        <v-layout align-center justify-center >
          <v-flex md5 lg5>
            <h3 class="title">{{ title }}</h3>
          </v-flex>
          <v-flex md5 lg5 class="text-right">
            <Button v-if="linkItem" :linkItem="linkItem" :btnTitle="titlebtn" />
            <Button
              v-if="linkItem2"
              :linkItem="linkItem2"
              :btnTitle="titlebtn2"
            />
          </v-flex>
        </v-layout>
      </v-parallax>
    </v-container>
  </section>
</template>
<script>
import Button from "~/components/Button";
export default {
  components: {
    Button
  },
  props: ["linkItem", "linkItem2", "title", "titlebtn", "titlebtn2"]
};
</script>
<style scoped>
.title{
  font-size: 30px !important;
}
</style>
