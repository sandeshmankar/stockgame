<template>
  <ul
    class="list"
    :style="stylesWrap"
    @mouseenter="mouseEnter()"
    @mouseleave="mouseLeave()"
  >
    <li
      v-for="(item, index) in marqueeList"
      :key="index"
      class="row"
      :style="stylesItem"
      ref="li"
      v-html="item"
    ></li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      current: -1,

      stylesWrap: {
        width: this.width,
        height: this.height
      },

      stylesItem: {
        height: this.height,
        lineHeight: this.height,
        color: this.color,
        fontSize: this.fontSize
      },
      scrollHeight: 0,
      showing: false,
      paused: false
    };
  },
  props: {
    width: {
      type: String,
      default: "200px"
    },

    height: {
      type: String,
      default: "20px"
    },

    color: {
      type: String,
      default: "#fff"
    },

    fontSize: {
      type: String,
      default: "12px"
    },

    showSpeed: {
      type: Number,
      validator(val) {
        return /^\d+$/.test(val);
      },
      default: 15
    },

    pauseTime: {
      type: Number,
      validator(val) {
        return /^\d+$/.test(val);
      },
      default: 2500
    },

    scrollSpeed: {
      type: Number,
      validator(val) {
        return /^\d+$/.test(val);
      },
      default: 22
    },

    pauseOnHover: {
      type: Boolean,
      default: false
    },

    marqueeList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  mounted() {
    if (this.marqueeList.length > 0) {
      this.init();
    }
    let vm = this;
    // let li = this.$refs.li[this.current];
    window.addEventListener("resize", function(event) {
      this.pause();
    });

    // $(document).ready(function() {
    //   $(window).resize(function() {
    //     console.log("good")
    //     // animate(li, { top: this.scrollHeight }, this.showSpeed, 0.01);
    //       this.finish(li);
    //       alert("good")
    //   });
    // });
  },
  methods: {
    init() {
      this.mqLength = this.marqueeList.length;
      this.scrollHeight = this.height.replace(/[^0-9]/gi, "");
      this.$nextTick(() => {
        this.showNext();
      });
    },
    mouseEnter() {
      if (!this.pauseOnHover === true) return false;

      this.pause();
    },
    mouseLeave() {
      if (!this.pauseOnHover === true) return false;

      this.resume();
    },
    pause() {
      this.paused = true;

      if (this.showing !== true) {
        let li = this.$refs.li[this.current];
        clearInterval(li.timer);
      }
    },
    resume() {
      this.paused = false;

      if (this.showing !== true) {
        let li = this.$refs.li[this.current];
        this.scroll(li, 1);
      }
    },
    showNext() {
      this.current++;

      if (this.current >= this.mqLength) {
        this.current = 0;
      }

      this.show(this.current);
    },
    show(i) {
      for (let item of this.$refs.li) {
        if (hasClass(item, "active")) {
          return false;
        }
      }

      let li = this.$refs.li[i];

      li.style.left = "0px";
      li.style.top = -this.scrollHeight + "px";

      addClass(li, "active");

      this.showing = true;

      animate(li, { top: 0 }, this.showSpeed, 0.01, () => {
        this.showing = false;
        this.scroll(li);
      });
    },
    scroll(li, delay) {
      if (this.paused === true) return false;

      // if (li.scrollWidth > li.clientWidth) {
      //   setTimeout(() => {
      //     if (this.paused === true) return false;

      //     animate(li, { left: -li.scrollWidth }, this.scrollSpeed, 1, () => {
      //       this.finish(li);
      //     });
      //   }, delay || 1000);
      // } else {
      setTimeout(() => {
        if (this.paused === true) return false;

        animate(li, { top: this.scrollHeight }, this.showSpeed, 0.01);
        this.finish(li);
      }, delay || this.pauseTime);
      // }
    },
    finish(li) {
      removeClass(li, "active");

      this.showNext();
    }
  },
  beforeDestroy() {
    this.pause();

    this.current = -1;
  },
  watch: {
    marqueeList(val) {
      if (val.length > 0) {
        this.init();
      }
    }
  }
};

function animate(obj, json, interval, sp, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(() => {
    var flag = true;
    for (var arr in json) {
      var icur = 0;
      if (arr == "opacity") {
        icur = Math.round(parseFloat(getStyle(obj, arr)) * 100);
      } else {
        icur = parseInt(getStyle(obj, arr));
      }
      var speed;
      if (sp == 1) {
        speed = 0;
        if (json[arr] < 0) {
          speed--;
        } else {
          speed++;
        }
      } else {
        speed = (json[arr] - icur) * sp;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      }

      if (icur != json[arr]) {
        flag = false;
      }
      if (arr == "opacity") {
        obj.style.filter = "alpha(opacity : " + (icur + speed) + ")";
        obj.style.opacity = (icur + speed) / 100;
      } else {
        obj.style[arr] = icur + speed + "px";
      }
    }

    if (flag) {
      clearInterval(obj.timer);
      if (fn) {
        fn();
      }
    }
  }, interval);
}

function getStyle(obj, name) {
  if (obj.currentStyle) {
    return obj.currentStyle[name];
  } else {
    return getComputedStyle(obj, false)[name];
  }
}

function hasClass(ele, cls) {
  let reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
  return ele.className.match(reg);
}

function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    let reg = new RegExp("/(^s*)|(s*$)/g");
    let className = ele.className.replace(reg, "");
    ele.className = className + " " + cls;
  }
}

function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    let reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}
</script>

<style scoped>
.list {
  overflow: hidden;
  position: relative;
  width: 100%;
  display: inline-block;
}
.row {
  display: block;
  white-space: nowrap;
  width: 100%;
  position: absolute;
  top: -999em;
  left: 0;
}
</style>
