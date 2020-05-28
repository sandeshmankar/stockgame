<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogConfirm" persistent max-width="290">
      <v-card class="mb-0">
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>{{ content }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            small
            class="buttonGreen"
            color="primary"
            @click="dialogConfirmStatus(true)"
          >{{$t("logout.logout")}}</v-btn>
          <v-btn
            depressed
            small
            color="error"
            class="buttonCancel"
            @click="dialogConfirmStatus(false)"
          >{{$t("logout.cancel")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["title", "dialogConfirm", "deleteById", "content"],
  data() {
    return {};
  },
  methods: {
    async dialogConfirmStatus(val) {
      try {
        this.$emit("dialogStatus", val);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
