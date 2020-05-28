<template>
  <div>
    <ul class="main-navigation">
      <li>
        <a href="#">
          <span v-show="isMultigame" class="text-uppercase">
            <span>select here to add more stock</span>
            <span class="show-icon">
              <i class="fa fa-plus"></i>
            </span>
          </span>
          <span v-show="!isMultigame" style="font-size:0.89rem;">
            <span class="MenuStyle">
              <span>
                {{ $t("msg.SelectStock") }} <i class="fa fa-caret-right"></i
              ></span>
              <span>
                {{ $t("navlist." + getStockType(stockId)) }}
                <i class="fa fa-caret-right"></i>
              </span>
              <span
                >{{ $t(`stockname.${stockId}`) }}
                <i class="fa fa-caret-right"></i
              ></span>
              <!-- <span>  {{getLoop(stockId)}} {{$t('msg.minute')}} {{$t('msg.loop')}} <i class="fa fa-caret-right"></i> </span> -->
              <span>{{ GameId }} <i class="fa fa-caret-down"></i></span>
            </span>

            <span class="show-icon">
              <i class="fa fa-caret-down"></i>
            </span>
          </span>
        </a>
        <ul>
          <li v-for="(stockType, index) in getAllStockByType" :key="index">
            <a href="#">
              <span>{{ $t("navlist." + stockType.type) }}</span>
              <span class="show-icon">
                <i class="fa fa-caret-right"></i>
              </span>
            </a>
            <ul>
              <li
                v-for="(stockName, index) in stockType.stockName"
                :key="index"
              >
                <a href="#">
                  <span>{{ $t("stockname." + stockName.name) }}</span>
                  <span class="show-icon">
                    <i class="fa fa-caret-right"></i>
                  </span>
                </a>
                <ul>
                  <li v-for="(stockLoop, index) in stockName.loop" :key="index">
                    <span>
                      <a
                        href="#"
                        :style="
                          checkMultigameExistAndDisable({
                            stockId: stockLoop.stockId,
                            isMultigame: isMultigame
                          })
                        "
                        @click="selectedtockID(stockLoop.stockId)"
                      >
                        <span
                          >{{ stockLoop.loop }} {{ $t("msg.minute") }}
                          {{ $t("msg.loop") }}</span
                        >
                        <span
                          class="show-icon"
                          v-show="
                            checkMultigameExistAndShowIcon({
                              stockId: stockLoop.stockId,
                              isMultigame: isMultigame
                            })
                          "
                        >
                          <i class="fa fa-check"></i>
                        </span>
                      </a>
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    isMultigame: {
      type: Boolean,
      default: false
    },
    stockId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      GameId: "00000000000",
      stockData: [
        {
          type: "crypto",
          stockName: [
            {
              name: "btc",
              loop: [
                {
                  loop: 1,
                  stockId: "btc1"
                },
                {
                  loop: 5,
                  stockId: "btc5"
                }
              ]
            }
          ]
        },
        {
          type: "usa",
          stockName: [
            {
              name: "usindex",
              loop: [
                {
                  loop: 5,
                  stockId: "usindex"
                }
              ]
            }
          ]
        },
        {
          type: "china",
          stockName: [
            {
              name: "sh000001",
              loop: [
                {
                  loop: 5,
                  stockId: "sh000001"
                }
              ]
            },
            {
              name: "sz399001",
              loop: [
                {
                  loop: 5,
                  stockId: "sz399001"
                }
              ]
            },
            {
              name: "sz399415",
              loop: [
                {
                  loop: 5,
                  stockId: "sz399415"
                }
              ]
            },
            {
              name: "sh000300",
              loop: [
                {
                  loop: 5,
                  stockId: "sh000300"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  mounted() {
    setInterval(() => {
      if (this.getStockCrawlerData(this.$route.params.id) != "") {
        this.GameId = this.getStockCrawlerData(this.$route.params.id)[
          this.getStockCrawlerData(this.$route.params.id).length - 1
        ].gameId;
      }
    }, 5000);
  },
  computed: {
    ...mapGetters([
      "getStockType",
      "checkMultigameExistAndDisable",
      "checkMultigameExistAndShowIcon",
      "getAllStockByType",
      "getStockCrawlerData"
    ])
  },
  methods: {
    ...mapMutations(["addStockMultigame"]),
    selectedtockID(stockId) {
      if (this.isMultigame) {
        this.addStockMultigame(stockId);
      } else {
        this.$router.push(`/modern/desktop/${stockId}`);
      }
    }
  }
};
</script>

<style scoped>
.MenuStyle span {
  border: 1px solid #dddddd;
  color: #333;
  background-color: #fff;
  border-radius: 10px;
  padding: 6px 10px;
  font-size: 15px;
}
.show-icon {
  position: absolute;
  right: 10px;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  /* border:1px solid red; */
  /* background: #003e70; */
}

ul li {
  display: block;
  width: 100%;
  position: relative;
  float: left;
  background: #003e70;
}

li ul {
  display: none;
  min-width: 150px;
}

ul li a {
  display: block;
  width: 100%;
  padding: 0.6em;
  text-decoration: none;
  white-space: nowrap;
  color: #fff;
}
li:hover > ul {
  display: block;
  position: absolute;
}

li:hover li {
  float: none;
}

li:hover a {
  background: #dddddd;
  color: #333;
}

li:hover li a:hover {
  background: #dddddd;
}

.main-navigation li ul li {
  border-top: 0;
  z-index: 2000;
}

ul ul ul {
  left: 100%;
  top: 0;
}

ul:before,
ul:after {
  content: " ";
  /* 1 */
  display: table;
  /* 2 */
}

ul:after {
  clear: both;
}
</style>
