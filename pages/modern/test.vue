<template>
  <div>
    <div>
      <div style="position:relative;height:50px">
        <div class="item">
          55
        </div>
      </div>

      <div style="position:relative;height:50px">
        <div class="item">
          66
        </div>
      </div>
    </div>
    <v-btn @click="go">go</v-btn>
    <v-btn @click="reset">reset</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      top: 450,
      left: 0,
      position: "relative",
      display: "block",
      boxShadow: {
        border: "1px solid",
        padding: "10px",
        boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"
      }
    };
  },
  methods: {
    reset() {
      this.top = 450;
      this.left = 0;
      this.display = "block";
      this.position = "relative";
    },
    go() {
      let elements = document.getElementsByClassName("item");
      console.log(elements.length);
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.top = "-28px";
        elements[i].style.left = "1900px";
        // setTimeout(() => {
        //   elements[i].style.display = "none";
        // }, 2000 + i * 800);
      }
    }
  },
  watch: {
    left(value) {
      let _this = this;
      if (value === 1950) {
        setTimeout(() => {
          // _this.display = "none";
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
div {
  width: 100%;
  height: 600px;
  background: blue;
}

.item {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
  z-index: 2;
  transition: left 2s linear, top 2s linear;
  color: white;
  font-weight: bold;
  text-align: center;
  line-height: 50px;
}
</style>
