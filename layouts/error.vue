<template>
  <div>
    <AppError />
  </div>
</template>
<script>
import AppError from "~/components/errorpage";
export default {
  layout: "desktopModern",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  },
  components: {
    AppError
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred"
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 25px;
}
</style>
