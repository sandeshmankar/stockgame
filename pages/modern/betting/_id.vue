<template>
  <div>
    <v-layout style="margin: 0 0 -1% 0px;">
      <v-flex>
        <v-layout row wrap class="pt-1">
          <v-flex xs12 sm12>
            <v-layout>
              <v-flex class="text-xs-center" ma-1>
                <span class="uppercase-text grey--text"
                  >{{ $t("msg.lastDraw") }}:</span
                >
                <v-flex flex-style class="lastdraw">
                  <h4 class="body-3">
                    <span
                      class="text-black"
                      v-html="$options.filters.lastDraw(getLastDraw)"
                    ></span>
                  </h4>
                </v-flex>
              </v-flex>
              <v-flex class="text-xs-center" ma-1>
                <span class="uppercase-text grey--text"
                  >{{ $t("msg.betCloseIn") }}:</span
                >
                <v-flex flex-style class="betclose">
                  <h4 class="body-3 uppercase-text text-black">
                    {{
                      getTimerByStockName(this.$route.params.id) &&
                        getTimerByStockName(this.$route.params.id)
                          .gameEndTimeCountDownInSec
                          | betclosein(getStockLoop(this.$route.params.id))
                    }}
                  </h4>
                </v-flex>
              </v-flex>
              <v-flex class="text-xs-center" ma-1>
                <span class="uppercase-text grey--text"
                  >{{ $t("msg.lotteryDraw") }}:</span
                >
                <v-flex flex-style class="lottery">
                  <h4 class="body-3 uppercase-text text-black">
                    {{
                      getTimerByStockName(this.$route.params.id) &&
                        getTimerByStockName(this.$route.params.id)
                          .gameEndTimeCountDownInSec
                          | lotterydraw(getStockLoop(this.$route.params.id))
                    }}
                  </h4>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- betting zone -->
    <v-layout row wrap class="container-bet" mt-3>
      <v-flex xs12 sm12 md12>
        <v-layout wrap xs12>
          <v-flex xs1 align-self-center class="text-xs-right">
            <v-icon
              style="font-size:40px;"
              color="#003e70"
              v-show="isShowTrendMap"
              @click="changeShowTrendMap()"
              >keyboard_arrow_left</v-icon
            >
          </v-flex>

          <v-flex v-if="isShowTrendMap" xs10 class="text-xs-center py-2">
            <trendMap
              :dataArray="getRoadMap"
              :trendType="trendType"
              :isFullscreen="false"
              :key="
                getRoadMap[getRoadMap.length - 1].stockTimestamp + trendType
              "
              :rowTable="4"
              :lop="30"
            ></trendMap>
          </v-flex>

          <v-flex v-else sm10 xs10 class="text-xs-center">
            <span>
              <h3 class="text-uppercase">
                {{ $t("stockName." + $route.params.id) }} /
                <span>
                  {{ getStockLoop(this.$route.params.id) }}
                  {{ $t("msg.minuteGame") }}
                </span>
              </h3>
              <span class="text-primary">
                {{ $t("msg.gameId") }} :
                <span>{{ getGameUUIDByStockName(this.$route.params.id) }}</span>
              </span>
            </span>
            <v-flex sm12 xs12 class="chartDesgin">
              <v-layout pa-2>
                <v-flex xs6 class="text-xs-left" v-if="getStockLiveTime(this.stockID)">
                  <span class="text-time">{{
                    getStockLiveTime(this.stockID).split(" ")[1]
                  }}</span>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs6 class="text-xs-right">
                  <span class="text-price">
                    $ {{ getStockLivePrice(this.stockID) }}
                  </span>
                </v-flex>
              </v-layout>

              <chartMobile :stockName="$route.params.id"></chartMobile>
            </v-flex>
          </v-flex>

          <v-flex xs1 align-self-center arrow>
            <v-icon
              style="font-size:40px;"
              v-show="!isShowTrendMap"
              @click="changeShowTrendMap()"
              color="#003e70"
              >keyboard_arrow_right</v-icon
            >
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex style="background-color:rgb(242, 244, 255);">
        <div
          sm12
          xs12
          class="betClose"
          :style="$vuetify.breakpoint.xs ? 'width: 100%;' : ' width: 50%;'"
          v-if="checkBetClose"
        >
          <p>{{ $t("msg.betClosed") }}</p>
        </div>
        <v-layout wrap sm6>
          <div class="tab-menu-container">
            <div class="digit-type-container">
              <div
                class="btn-digit-type first-digit"
                @click="$refs.firstDigit.click()"
              >
                <span class="text-pre-line text-white">{{
                  $t("gamemsg.firstdigits")
                }}</span>
              </div>
              <div
                class="btn-digit-type last-digit"
                @click="$refs.lastDigit.click()"
              >
                <span class="text-pre-line text-white">{{
                  $t("gamemsg.lastdigits")
                }}</span>
              </div>
              <div
                class="btn-digit-type both-digit"
                @click="$refs.bothDigit.click()"
              >
                <span class="text-pre-line text-white">{{
                  $t("gamemsg.bothdigits")
                }}</span>
              </div>
              <div
                class="btn-digit-type two-digit"
                @click="$refs.twoDigit.click()"
              >
                <span class="text-pre-line text-white">{{
                  $t("gamemsg.twodigits")
                }}</span>
              </div>
            </div>
            <span class="active-tab-mark" :style="leftActive"></span>
          </div>

          <v-tabs
            grow
            centered
            style="width:100%;background-color: #f2f4ff;padding:0 !important;"
            @change="tabChanged($event)"
          >
            <v-tab v-show="false" ref="firstDigit">
              <span>{{ $t("gamemsg.firstdigits") }}</span>
            </v-tab>
            <v-tab v-show="false" ref="lastDigit">
              <span>{{ $t("gamemsg.lastdigits") }}</span>
            </v-tab>
            <v-tab v-show="false" ref="bothDigit">
              <span>{{ $t("gamemsg.bothdigits") }}</span>
            </v-tab>
            <v-tab v-show="false" ref="twoDigit">
              <span>{{ $t("gamemsg.twodigits") }}</span>
            </v-tab>

            <!-- First Digit -->
            <v-tab-item xs4>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'firstdigit-' + firstDigit[0].rule,
                      firstDigit[0].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[1].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.big") }}</h5>
                    <span>5 TO 9</span>
                  </v-card-title>
                </v-card>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'firstdigit-' + firstDigit[1].rule,
                      firstDigit[1].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[0].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.small") }}</h5>
                    <span>0 TO 4</span>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'firstdigit-' + firstDigit[2].rule,
                      firstDigit[2].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[2].ruleid
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.odd") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'firstdigit-' + firstDigit[3].rule,
                      firstDigit[3].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[3].ruleid
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.even") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click.stop="drawerderfirst = !drawerderfirst"
                >
                  <v-card-title class="o-even">
                    <h5>0-9</h5>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'firstdigit-' + firstDigit[6].rule,
                      firstDigit[6].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[6].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.low") }}</h5>
                    <span>0 TO 3</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'firstdigit-' + firstDigit[5].rule,
                      firstDigit[5].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[5].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.mid") }}</h5>
                    <span>4 TO 6</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'firstdigit-' + firstDigit[4].rule,
                      firstDigit[4].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: firstDigit[4].ruleid
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.high") }}</h5>
                    <span>7 TO 9</span>
                  </v-card-title>
                </v-card>
              </v-layout>
            </v-tab-item>
            <!-- First Digit -->

            <!-- last digit -->
            <v-tab-item xs4>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'lastdigit-' + lastDigit[1].rule,
                      lastDigit[1].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit-small'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.small") }}</h5>
                    <span>0 TO 4</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'lastdigit-' + lastDigit[0].rule,
                      lastDigit[0].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit-big'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.big") }}</h5>
                    <span>5 TO 9</span>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'lastdigit-' + lastDigit[2].rule,
                      lastDigit[2].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit-odd'
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.odd") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'lastdigit-' + lastDigit[3].rule,
                      lastDigit[3].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit-even'
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.even") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click.stop="drawerderlast = !drawerderlast"
                >
                  <v-card-title class="o-even">
                    <h5>0-9</h5>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'lastdigit-' + lastDigit[6].rule,
                      lastDigit[6].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit-low'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.low") }}</h5>
                    <span>0 TO 3</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'lastdigit-' + lastDigit[5].rule,
                      lastDigit[5].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit-mid'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.mid") }}</h5>
                    <span>4 TO 6</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'lastdigit-' + lastDigit[4].rule,
                      lastDigit[4].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'lastdigit-high'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.high") }}</h5>
                    <span>7 TO 9</span>
                  </v-card-title>
                </v-card>
              </v-layout>
            </v-tab-item>
            <!-- last digit -->

            <!-- Both Digit -->
            <v-tab-item xs4>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[2].rule,
                      bothDigit[2].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-small'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.small") }}</h5>
                    <span>0 TO 9</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[1].rule,
                      bothDigit[1].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-tie'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.tie") }}</h5>
                    <span>0</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[0].rule,
                      bothDigit[0].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-big'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.big") }}</h5>
                    <span>9 TO 18</span>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[3].rule,
                      bothDigit[3].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-odd'
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.odd") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[4].rule,
                      bothDigit[4].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-even'
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.even") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click.stop="drawerder018 = !drawerder018"
                >
                  <v-card-title class="o-even">
                    <h5>0-18</h5>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[7].rule,
                      bothDigit[7].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-low'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.low") }}</h5>
                    <span>0 TO 5</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[6].rule,
                      bothDigit[6].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-mid'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.mid") }}</h5>
                    <span>6 to 11</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'bothdigit-' + bothDigit[5].rule,
                      bothDigit[5].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'bothdigit-high'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.high") }}</h5>
                    <span>12 to 18</span>
                  </v-card-title>
                </v-card>
              </v-layout>
            </v-tab-item>
            <!-- Both Digit -->

            <!-- TWO Digit -->
            <v-tab-item xs4>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + bothDigit[2].rule,
                      twoDigit[2].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-small'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.small") }}</h5>
                    <span>00 TO 49</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + twoDigit[1].rule,
                      twoDigit[1].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-tie'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.tie") }}</h5>
                    <span>0</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + twoDigit[0].rule,
                      twoDigit[0].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-big'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.big") }}</h5>
                    <span>50 TO 99</span>
                  </v-card-title>
                </v-card>
              </v-layout>
              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + twoDigit[3].rule,
                      twoDigit[3].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-odd'
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.odd") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + twoDigit[4].rule,
                      twoDigit[4].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-even'
                      })
                    "
                  />
                  <v-card-title class="o-even">
                    <h5>{{ $t("gamemsg.even") }}</h5>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click.stop="drawerder099 = !drawerder099"
                >
                  <v-card-title class="o-even">
                    <h5>00-99</h5>
                  </v-card-title>
                </v-card>
              </v-layout>

              <v-layout row align-center justify-center>
                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + twoDigit[8].rule,
                      twoDigit[8].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-low'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.low") }}</h5>
                    <span>0 TO 33</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + twoDigit[7].rule,
                      twoDigit[7].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-mid'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.mid") }}</h5>
                    <span>34 to 66</span>
                  </v-card-title>
                </v-card>

                <v-card
                  class="box-click"
                  @click="
                    showBetDialog(
                      'twodigit-' + twoDigit[6].rule,
                      twoDigit[6].ruleid
                    )
                  "
                >
                  <showChipAmount
                    text-center
                    size="35px"
                    :amount="
                      getBetAmountRuleID({
                        gameUUID: getGameUUIDByStockName($route.params.id),
                        ruleID: 'twodigit-high'
                      })
                    "
                  />
                  <v-card-title class="d-block">
                    <h5>{{ $t("gamemsg.high") }}</h5>
                    <span>66 to 99</span>
                  </v-card-title>
                </v-card>
              </v-layout>
            </v-tab-item>
            <!-- TWO Digit -->
          </v-tabs>
        </v-layout>

        <div class="bettingFooter justify-center sm10 xs10">
          <span>
            {{ $t("msg.totalBet") }}:
            {{ formatToPrice(getAllBettingAmount) }}
          </span>
        </div>
      </v-flex>
    </v-layout>
    <!-- dialog chip amount come here -->
    <v-dialog
      v-model="bettingDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      light
    >
      <div class="dialog-content">
        <span class="close-dialog-icon">
          <v-icon size="30" @click="bettingDialog = false">close</v-icon>
        </span>
        <div
          xs12
          class="text-center mx-auto pa-2 round-3"
          :style="$vuetify.breakpoint.xs ? 'width: 100%;' : 'width: 60%;'"
        >
          <div class="d-block text-center" style="color:#000">
            <p class="text-uppercase">
              {{ $t("msg.stockName") }} :
              {{ $t(`stockName.${$route.params.id}`) }}
              {{ $t("msg.payout") }}:
              {{ odd }}
            </p>
            <p class="text-uppercase test-time-loop">
              {{ getStockLoop(this.$route.params.id) }}
              {{ $t("msg.minuteGame") }}
            </p>
            <p class="text-uppercase test-rule-betting">
              {{ $t("msg.bettingOn") }}
              {{
                isNaN(gameRule.split("-")[1])
                  ? $t("gamemsg." + gameRule.split("-")[0]) +
                    "-" +
                    $t("gamemsg." + gameRule.split("-")[1])
                  : $t("gamemsg." + gameRule.split("-")[0]) +
                    "-" +
                    gameRule.split("-")[1]
              }}
            </p>
          </div>
        </div>
        <div xs12 class="text-center">
          <v-avatar
            class="ma-1"
            size="60"
            v-for="(item, key) in imgChip"
            :key="key"
            @click="shipClick(getCoinsModern[key])"
          >
            <v-img class="ma-4" :src="item.img" :alt="item.title">
              <span class="setpricechip">{{ getCoinsModern[key] }}</span>
            </v-img>
          </v-avatar>
        </div>

        <div xs10 class="px-2 text-center ml-4 mt-3">
          <input
            class="round-2 text-input"
            type="number"
            readonly
            label="$0"
            v-model="betAmount"
          />
          <br />
          {{ $t("msg.min") }} = $100 ;{{ $t("msg.max") }} = $5000
        </div>

        <div xs12 class="px-2 text-center mt-3">
          <v-btn class="buttonGreen" @click="reviewbet()">{{
            $t("betting.reviewBet")
          }}</v-btn>
          <v-btn class="btn_cancel" @click="bettingDialog = false">{{
            $t("betting.cancelBet")
          }}</v-btn>
        </div>
      </div>
    </v-dialog>
    <!-- price: "200" -->
    <!-- Review bet  -->
    <v-dialog
      v-model="reviewbetDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      light
    >
      <v-card tile>
        <v-toolbar card dark style="background-color:#2cb13b;">
          <v-btn icon dark @click="reviewbetDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t("betting.reviewYourBet") }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div
          class="mx-auto round-3 mt-2"
          :style="$vuetify.breakpoint.xs ? 'width: 100%;' : 'width: 60%;'"
          color="#ffffff"
        >
          <div xs12 class="text-center mt-5 pa-3">
            <table class="table-review">
              <tr>
                <td class="text-right">{{ $t("msg.stockName") }}:</td>
                <td class="text-left pl-2 text-color-blue">
                  {{ $t(`stockName.${$route.params.id}`) }}
                </td>
              </tr>
              <tr>
                <td class="text-right">{{ $t("msg.gameId") }}:</td>
                <td class="text-left pl-2 text-color-blue">
                  {{ getGameUUIDByStockName(this.$route.params.id) }}
                </td>
              </tr>
              <tr>
                <td class="text-right">{{ $t("gameType") }}:</td>
                <td class="text-left pl-2 text-color-blue">
                  {{ getStockLoop(this.$route.params.id) }}
                  {{ $t("msg.minuteGame") }}
                </td>
              </tr>
              <tr>
                <td class="text-right">{{ $t("msg.bettingOn") }}:</td>
                <td class="text-left pl-2 text-color-blue">{{ gameRule }}</td>
              </tr>
              <tr>
                <td class="text-right">{{ $t("msg.payout") }}:</td>
                <td class="text-left pl-2 text-color-blue">1.95</td>
              </tr>
              <tr>
                <td class="text-right">{{ $t("msg.amount") }}:</td>
                <td class="text-left pl-2 text-color-green">{{ betAmount }}</td>
              </tr>
            </table>
          </div>

          <div xs12 class="text-center">
            <div class="d-block text-center" style="color:#000">
              <p>{{ $t("betting.pleaseConfirm") }}</p>
            </div>
          </div>
          <hr />

          <div xs12 class="px-2 text-center mt-3">
            <v-btn class="buttonGreen" @click="placeBet">{{
              $t("betting.placeBet")
            }}</v-btn>
            <v-btn class="btn_cancel" @click="reviewbetDialog = false">{{
              $t("betting.cancelBet")
            }}</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <!-- price: "200" -->
    <!-- End review bet -->
    <!-- Test -->

    <!-- specific number first digit -->
    <v-navigation-drawer
      class="drawer-asidebar"
      right
      v-model="drawerderfirst"
      fixed
      temporary
    >
      <div class="header-dialog">
        <h3 class="text-uppercase">{{ $t("gamemsg.firstdigit") }}</h3>
        <!-- <p>{{getStockById(this.$route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p> -->
        <v-icon size="30" @click="drawerderfirst = !drawerderfirst"
          >close</v-icon
        >
      </div>
      <hr class="head-jumbothron" />

      <v-container pa-1>
        <v-layout row wrap>
          <v-flex
            xs3
            v-for="(item, index) in firstDigitNumber"
            :key="index"
            @click="showBetDialog(`firstdigit-${index}`, item.ruleid)"
          >
            <showChipAmount
              text-center
              size="35px"
              :amount="
                getBetAmountRuleID({
                  stockId: 'btc1',
                  gameRule: `firstdigit-${index}`
                })
              "
            />
            <v-card-title class="box-click-modal o-even">
              <h5>{{ index }}</h5>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
    <!-- specific number last digit -->
    <v-navigation-drawer
      class="drawer-asidebar"
      right
      v-model="drawerderlast"
      fixed
      temporary
    >
      <div class="header-dialog">
        <h3 class="text-uppercase">{{ $t("gamemsg.lastdigit") }}</h3>
        <!-- <p>{{getStockById(this.$route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p> -->
        <v-icon size="30" @click="drawerderlast = !drawerderlast">close</v-icon>
      </div>
      <hr class="head-jumbothron" />
      <v-container pa-1>
        <v-layout row wrap>
          <v-flex
            xs3
            v-for="(item, index) in lastDigitNumber"
            :key="index"
            @click="showBetDialog(`lastdigit-${index}`, item.ruleid)"
          >
            <showChipAmount
              text-center
              size="35px"
              :amount="
                getBetAmountRuleID({
                  stockId: 'btc1',
                  gameRule: `lastdigit-${index}`
                })
              "
            />
            <v-card-title class="box-click-modal o-even">
              <h5>{{ index }}</h5>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
    <!-- both digit -->

    <v-navigation-drawer
      class="drawer-asidebar"
      right
      v-model="drawerder018"
      fixed
      temporary
    >
      <div class="header-dialog">
        <h3 class="text-uppercase">{{ $t("gamemsg.bothdigit") }}</h3>
        <!-- <p>{{getStockById(this.$route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p> -->
        <v-icon size="30" @click="drawerder018 = !drawerder018">close</v-icon>
      </div>
      <hr class="head-jumbothron" />
      <v-container pa-1>
        <v-layout row wrap>
          <v-flex
            xs3
            v-for="(item, index) in bothDigitNumber"
            :key="index"
            @click="showBetDialog(`bothdigit-${index}`, item.ruleid)"
          >
            <showChipAmount
              text-center
              size="35px"
              :amount="
                getBetAmountRuleID({
                  stockId: 'btc1',
                  gameRule: `bothdigit-${index}`
                })
              "
            />
            <v-card-title class="box-click-modal o-even">
              <h5>{{ index }}</h5>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
    <!-- 0 -99 -->
    <!-- two digit -->

    <v-navigation-drawer
      class="drawer-asidebar"
      right
      v-model="drawerder099"
      fixed
      temporary
    >
      <div style="display:flex;flex-direction:column">
        <div class="header-dialog">
          <h3 class="text-uppercase">{{ $t("gamemsg.twodigit") }}</h3>
          <!-- <p>{{getStockById(this.$route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p> -->
          <v-icon size="30" @click="drawerder099 = !drawerder099">close</v-icon>
        </div>
        <v-layout row>
          <v-tabs slider-color="#003e70" grow centered>
            <v-tab>00 - 19</v-tab>
            <v-tab>20 - 39</v-tab>
            <v-tab>40 - 59</v-tab>
            <v-tab>60 - 79</v-tab>
            <v-tab>80 - 99</v-tab>
            <!-- 0 19 -->
            <v-tab-item>
              <v-container pa-1>
                <v-layout row wrap>
                  <v-flex
                    xs3
                    v-for="(item, index) in twoDigitNumber"
                    :key="index"
                    v-show="index < 20"
                    @click="
                      showBetDialog(
                        `twodigit-${index < 10 ? '0' + index : index}`,
                        item.ruleid
                      )
                    "
                  >
                    <showChipAmount
                      text-center
                      size="35px"
                      :amount="
                        getBetAmountRuleID({
                          gameUUID: getGameUUIDByStockName($route.params.id),
                          gameRule: `twodigit-${
                            index < 10 ? '0' + index : index
                          }`
                        })
                      "
                    />
                    <v-card-title class="box-click-modal o-even">
                      <h5>{{ index < 10 ? "0" + index : index }}</h5>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tab-item>
            <!-- 0 19 -->

            <!-- 20 39 -->
            <v-tab-item>
              <v-container pa-1>
                <v-layout row wrap>
                  <v-flex
                    xs3
                    v-for="(item, index) in twoDigitNumber"
                    :key="index"
                    v-show="index > 19 && index < 40"
                    @click="showBetDialog(`twodigit-${index}`, item.ruleid)"
                  >
                    <showChipAmount
                      text-center
                      size="35px"
                      :amount="
                        getBetAmountRuleID({
                          gameUUID: getGameUUIDByStockName($route.params.id),
                          gameRule: `twodigit-${index}`
                        })
                      "
                    />
                    <v-card-title class="box-click-modal o-even">
                      <h5>{{ index }}</h5>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tab-item>
            <!-- 20 39 -->

            <!--40 59 -->
            <v-tab-item>
              <v-container pa-1>
                <v-layout row wrap>
                  <v-flex
                    xs3
                    v-for="(item, index) in twoDigitNumber"
                    :key="index"
                    v-show="index > 39 && index < 60"
                    @click="showBetDialog(`twodigit-${index}`, item.ruleid)"
                  >
                    <showChipAmount
                      text-center
                      size="35px"
                      :amount="
                        getBetAmountRuleID({
                          gameUUID: getGameUUIDByStockName($route.params.id),
                          gameRule: `twodigit-${index}`
                        })
                      "
                    />
                    <v-card-title class="box-click-modal o-even">
                      <h5>{{ index }}</h5>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tab-item>
            <!--40 59 -->

            <!--60 79 -->
            <v-tab-item>
              <v-container pa-1>
                <v-layout row wrap>
                  <v-flex
                    xs3
                    v-for="(item, index) in twoDigitNumber"
                    :key="index"
                    v-show="index > 59 && index < 80"
                    @click="showBetDialog(`twodigit-${index}`, item.ruleid)"
                  >
                    <showChipAmount
                      text-center
                      size="35px"
                      :amount="
                        getBetAmountRuleID({
                          gameUUID: getGameUUIDByStockName($route.params.id),
                          gameRule: `twodigit-${index}`
                        })
                      "
                    />
                    <v-card-title class="box-click-modal o-even">
                      <h5>{{ index }}</h5>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tab-item>
            <!--60 79 -->

            <!-- 80 99 -->
            <v-tab-item>
              <v-container pa-1>
                <v-layout row wrap>
                  <v-flex
                    xs3
                    v-for="(item, index) in twoDigitNumber"
                    :key="index"
                    v-show="index > 79"
                    @click="showBetDialog(`twodigit-${index}`, item.ruleid)"
                  >
                    <showChipAmount
                      text-center
                      size="35px"
                      :amount="
                        getBetAmountRuleID({
                          gameUUID: getGameUUIDByStockName($route.params.id),
                          gameRule: `twodigit-${index}`
                        })
                      "
                    />
                    <v-card-title class="box-click-modal o-even">
                      <h5>{{ index }}</h5>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tab-item>
            <!-- 80 99 -->
          </v-tabs>
        </v-layout>
      </div>
    </v-navigation-drawer>

    <!-- 0 -99 -->
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import gameRule from "~/data/gameRule";

import chartMobile from "~/components/mobile/chartMobile";
import payout from "~/data/payout";
import showChipAmount from "~/components/modern/showChipAmount";
import trendMap from "~/components/modern/trendMap";
import config from "~/config/config.global";
import chips from "~/data/chips";
import secureStorage from "../../../plugins/secure-storage";

export default {
  async validate({ params, store }) {
    return store.getters.getCheckStock(params.id);
  },
  data() {
    return {
      leftActive: {
        left: "2%"
      },
      // rule id
      firstDigit: gameRule.firstDigit,
      lastDigit: gameRule.lastDigit,
      bothDigit: gameRule.bothDigit,
      twoDigit: gameRule.twoDigit,
      firstDigitNumber: gameRule.firstDigitNumber,
      lastDigitNumber: gameRule.lastDigitNumber,
      bothDigitNumber: gameRule.bothDigitNumber,
      twoDigitNumber: gameRule.twoDigitNumber,
      // rule id
      trendType: "firstdigit",
      isShowTrendMap: false,
      payout_high_mid_low: payout.high_mid_low,
      payout_big_small: payout.big_small,
      payout_09: payout._09,
      payout_18: payout._18,
      payout_99: payout._99,

      stockID: "",
      bettingDialog: false,
      reviewbetDialog: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      drawerderfirst: null,
      drawerderlast: null,
      drawerder018: null,
      drawerder099: null,
      imgChip: chips.chipsDataMobile,
      odd: null,
      gameRule: "null",
      confirmDisabled: false,
      ruleid: "",
      betAmount: 0
    };
  },
  beforeDestroy() {
    this.stopListenSocket(
      `roadMap.${this.getStockUUIDByStockName(this.routeParams)}.${
        this.getPortalProviderUUID
      }`
    );
  },
  created() {
    // get road map data from API
    this.setRoadMap(this.getStockUUIDByStockName(this.$route.params.id));
    // live road map from socket
    this.listenForBroadcast(
      {
        channelName: `roadMap.${this.getStockUUIDByStockName(
          this.$route.params.id
        )}.${this.getPortalProviderUUID}`,
        eventName: "roadMap"
      },
      ({ data }) => {
        try {
          var logData = data;
          if (data.status) {
            this.setLiveRoadMap(data.data.roadMap[0]);
          } else {
            throw new Error(config.error.general);
          }
        } catch (ex) {
          console.log(ex);
        }
      }
    );
  },
  mounted() {
    this.stockID = this.$route.params.id;
    console.log(this.stockID);
  },
  components: {
    chartMobile,
    trendMap,
    showChipAmount
  },
  computed: {
    ...mapGetters([
      "getStockLivePrice",
      "getStockLiveTime",
      "getLastDraw",
      "getUserUUID",
      "getTimerByStockName",
      "getStockLoop",
      "getGameUUIDByStockName",
      "getCheckStock",
      "getCoinsModern",
      "getAllBettingAmount",
      "getBetAmountRuleID",
      "getRoadMap",
      "getStockUUIDByStockName",
      "getPortalProviderUUID"
    ]),
    // check bet close using stockOpenOrClosed and timer
    checkBetClose() {
      if (
        this.getTimerByStockName(this.stockID) &&
        this.getTimerByStockName(this.stockID).stockStatus === "Closed"
      ) {
        return true;
      }
      // check 1 or 5 loop
      if (this.getStockLoop(this.stockID) === 5) {
        if (
          this.getTimerByStockName(this.stockID) &&
          this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec ==
            240
        ) {
          this.clearDataMultiGameBet();
        }
        return (
          this.getTimerByStockName(this.stockID) &&
          this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec <= 60
        );
      } else {
        if (
          this.getTimerByStockName(this.stockID) &&
          this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec == 40
        ) {
          this.clearDataMultiGameBet();
        }
        return (
          this.getTimerByStockName(this.stockID) &&
          this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec <= 20
        );
      }
    }
  },
  methods: {
    ...mapActions([
      "setFooterBetAmount",
      "pushDataOnGoingBet",
      "clearDataMultiGameBet",
      "setLiveRoadMap",
      "setRoadMap",
      "setUserData",
      "setSnackBarMessage"
    ]),

    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    stopListenSocket(channel) {
      console.log("stopListenSocket");
      window.Echo.leave(channel);
    },
    tabChanged(e) {
      switch (e) {
        case 0:
          this.leftActive.left = "2%";
          this.trendType = "firstDigit";
          break;
        case 1:
          this.leftActive.left = "27%";

          this.trendType = "lastDigit";

          break;
        case 2:
          this.leftActive.left = "52%";

          this.trendType = "bothDigit";

          break;
        case 3:
          this.leftActive.left = "77%";
          this.trendType = "twoDigit";

          break;
        default:
          this.setSnackBarMessage(config.error.general);
      }
    },
    changeShowTrendMap() {
      this.isShowTrendMap = !this.isShowTrendMap;
    },
    //
    showBetDialog(rule, ruleid) {
      this.gameRule = rule;
      this.ruleid = ruleid;
      this.bettingDialog = true;
    },
    shipClick(value) {
      this.betAmount = this.betAmount + parseInt(value);
    },
    reviewbet() {
      if (this.betAmount > 0) {
        this.reviewbetDialog = true;
      } else {
        this.setSnackBarMessage("Please Select Chips.");
      }
    },
    // Place Bet Last Step
    placeBet() {
      let data = {
        gameUUID: this.getGameUUIDByStockName(this.$route.params.id),
        ruleID: this.ruleid,
        betAmount: this.betAmount
      };
      this.confirmDisabled = true;
      this.sendBetting(data);
    },
    // Final Betting on Mobile
    async sendBetting(betData) {
      try {
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          version: config.version,
          betData: [betData]
        };
        var res = await this.$axios.$post(config.storeBet.url, reqBody, {
          headers: config.header
        });
        if (res.status && res.data[0].status) {
          this.setUserData();
          this.betAmount = 0;
          this.bettingDialog = false;
          this.reviewbetDialog = false;
          this.pushDataOnGoingBet(res.data[0]);
          this.setSnackBarMessage("Sucessfully Bet Place.");
        } else {
          this.setSnackBarMessage(config.error.general);
        }
      } catch (ex) {
        this.confirmDisabled = false;
        this.setSnackBarMessage(ex.message);
      }
    },
    formatToPrice(value) {
      return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    }
  },
  watch: {
    // check screen size mobile or desktop version
    "$screen.width"() {
      if (this.$screen.width > 1204) {
        let linkto = `/modern/desktop/${this.$route.params.id}`;
        this.$router.push(linkto);
      }
    },
    bettingDialog(value) {
      if (!value) {
        this.betAmount = 0;
      }
    },

    // set payout
    gameRule() {
      let payoutArray1 = ["small", "big", "odd", "even"];
      let payoutArray2 = ["high", "mid", "low"];
      let payoutArray3 = ["firstdigit", "lastdigit", "bothdigit", "twodigit"];
      let array = this.gameRule.split("-");

      // check the last one is string or not
      // alert(parseInt(array[1]).isNaN)
      let firstArray = array[0];
      let lastArray = array[1];
      if (Number.isNaN(parseInt(lastArray))) {
        if (payoutArray1.includes(lastArray)) {
          this.odd = this.payout_big_small;
        } else if (payoutArray2.includes(lastArray)) {
          this.odd = this.payout_high_mid_low;
        } else {
          this.odd = "error";
        }
      } else {
        switch (firstArray) {
          case "firstdigit":
            this.odd = this.payout_09;
            break;
          case "lastdigit":
            this.odd = this.payout_09;
            break;
          case "bothdigit":
            this.odd = this.payout_18;
            break;
          case "twodigit":
            this.odd = this.payout_99;
            break;
          default:
            this.odd = "error";
        }
      }
    }
  }
};
</script>

<style scoped>
.text-time {
  font-weight: 600;
  color: #003f70;
}
.text-price {
  font-weight: 600;
  color: green;
}
.tab-menu-container {
  position: relative;
  z-index: 2;
  top: 5px;
  height: 70px;
  display: flex;
  width: 100%;
  flex-direction: column;
}
.digit-type-container {
  height: 70px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  text-align: center;
}
.btn-digit-type {
  margin: 5px;
  width: 25%;
  border-radius: 10px;
  padding: 5px;
}
.active-tab-mark {
  width: 21%;
  height: 3px;
  background-color: #2e477d;
  border-radius: 10px;
  position: relative;
  top: -3px;
  transition: left 0.3s;
}
.first-digit {
  background: rgb(13, 204, 255);
  background: linear-gradient(
    22deg,
    rgba(13, 204, 255, 1) 0%,
    rgba(71, 96, 255, 1) 100%
  );
}
.last-digit {
  background: rgb(250, 209, 38);
  background: linear-gradient(
    22deg,
    rgba(250, 209, 38, 1) 0%,
    rgba(255, 84, 79, 1) 100%
  );
}

.both-digit {
  background: rgb(182, 53, 156);
  background: linear-gradient(
    22deg,
    rgba(182, 53, 156, 1) 0%,
    rgba(239, 10, 106, 1) 100%
  );
}
.two-digit {
  background: rgb(1, 233, 189);
  background: linear-gradient(
    22deg,
    rgba(1, 233, 189, 1) 0%,
    rgba(0, 124, 222, 1) 100%
  );
}
.close-dialog-icon {
  position: absolute;
  top: 3px;
  right: 12px;
}
.dialog-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}
.header-dialog {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
}
h4 {
  font-size: 16px;
}

.text-size08 {
  padding: 0px 5px;
  font-size: 0.8em;
}

.lastdraw {
  font-size: 14px;
  border: 1px solid #4b65ff;
  border-radius: 20px;
  padding: 6px 6px;
  margin: 0px 3px;
  font-weight: 400;
  text-align: center;
}

.betclose {
  font-size: 14px;
  border: 1px solid #ef076a;
  border-radius: 20px;
  padding: 6px 10px;
  margin: 0px 3px;
  font-weight: 400;
  text-align: center;
}

.lottery {
  font-size: 14px;
  border: 1px solid #01e3bf;
  border-radius: 20px;
  padding: 6px 6px;
  margin: 0px 3px;
  font-weight: 400;
  text-align: center;
}

.chartDesgin {
  margin-top: 10px;
  padding: 0px;
  background-color: #fff;
  border-radius: 5px;
}

.v-dialog__content.v-dialog__content--active .v-dialog.v-dialog--active {
  position: absolute;
  right: 0px;
  margin: 0px;
  padding: 0px;
  width: 50%;
  max-height: 100% !important;
}

.bettingFooter {
  border-radius: 20px;
  margin: 15px 0px;
  padding: 10px;
  color: #fff;
  background-color: #8291b2;
  text-align: center !important;
  font-size: 22px;
}

.setpricechip {
  position: relative;
  top: 0px;
  color: black;
  font-size: 0.85rem;
}

.btn_cancel {
  background-color: #656464 !important;
  color: white;
  border-radius: 7px;
}

.d-grid {
  display: grid;
}

.round-2 {
  border-radius: 10px;
}

.round-3 {
  border-radius: 10px !important;
  text-align: center;
}

.test-time-loop {
  font-size: 16px;
  font-weight: bold;
}

.test-rule-betting {
  font-size: 22px;
  font-weight: bold;
  color: #193571;
}

.text-input {
  height: 40px;
  border: 2px solid #cdcdcd;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.table-review {
  margin-top: 6%;
  border: 0px;
}
.table-review td {
  padding: 8px;
}
.text-color-blue {
  color: #2e477d;
  font-weight: bold;
}

.text-color-green {
  color: #17b542;
  font-weight: bold;
}
</style>
