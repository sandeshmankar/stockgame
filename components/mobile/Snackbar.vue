<template>
  <v-snackbar v-model="show" :timeout="2000">
    {{ message }}
    <v-btn flat color="pink" @click.native="show = false">{{ $t('msg.close') }}</v-btn>
  </v-snackbar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      show: false,
      message: ""
    };
  },
  created() {
    this.$store.watch(
      state => state.provider.snackBarMessage,
      () => {
        const msg = this.$store.state.provider.snackBarMessage;
        if (msg !== "") {
          this.show = true;
          this.message = this.$store.state.provider.snackBarMessage;
          this.setSnackBarMessage("");
        }
      }
    );
  },
  methods: {
    ...mapActions(["setSnackBarMessage"])
  }
};
</script>
