<template>
  <section class="breadcrumbs">
    <v-container>
      <v-parallax dark height="45">
        <v-layout align-center row>
          <v-flex xs6>
            <h3 class="display-2 ">{{ title }}</h3>
          </v-flex>
          <v-flex xs8 class="text-right">
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
