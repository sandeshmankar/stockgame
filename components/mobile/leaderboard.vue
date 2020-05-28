<template>
<div>
    <v-flex xs12 style="margin:0 auto;">
        <v-layout row>
            <v-flex xs12 grow pa-1>
                <p class="float-left md12">
                    <span class="title" xs10 sm10>{{$t('leaderboard.Top 10 Leaders')}}</span> (last updated 1 minutes ago)
                </p>
            </v-flex>
        </v-layout>
        <v-flex grow pa-1 xs12 class="text-lg-right ranking">
            <span class="text-uppercase font-weight-bold">
                <v-icon small>event</v-icon>{{$t('leaderboard.weeklyrankings')}}
            </span>
            <span class="text-uppercase font-weight-bold">
                <v-icon small>event</v-icon>{{$t('leaderboard.monthlyrankings')}}
            </span>
        </v-flex>

        <div class="userRow">
            <th>
                <img style="vertical-align:middle" class="pimage" src="https://placehold.it/60x60" />
                <h6 class="subtitle-1 text-uppercase">Ritesh Naik</h6>
                <!-- <span  style="border:1px solid red;height:30px;width:40px;" class="flag flag-us small-flag"></span>-->
            </th>
            <th>
                <h5 class="header">WINNING RATE</h5>
                <h6 class="green--text title">100 %</h6>
            </th>
            <th>
                <h5 class="header">BETS</h5>
                <h6 style="color:#eb0b6e;" class="title">20</h6>
            </th>
            <th>
                <h5 class="header">WINNING AMOUNT</h5>
                <h6 style="color:#0b2a68;" class="title">25000</h6>
            </th>
            <th>
                <v-btn class="buttonGreensmall" @click="dialog = true">{{$t('useraction.followbet')}}</v-btn>
            </th>
        </div>
    </v-flex>
    <v-dialog v-model="dialog" width="300" style="border:radius:20px; !important">
        <v-card class="followup">
            <p class="title font-weight-bold" style="text-align:center;color:#0b2a68;">FOLLOW BET</p>

            <v-card-text style="text-align:center;">
                <img class="pimage" src="https://placehold.it/60x60" width="120px" />
                <p class="subtitle-1 text-uppercase text-center pt-2">Ritesh Naik</p>
            </v-card-text>
            <v-card-actions>
                <v-flex xs12 lg6 pr-4>
                    <v-select :items="followby" label="Follow by Amount" solo></v-select>
                </v-flex>
                <v-flex xs12 lg3 pr-2>
                    <v-text-field solo label="1000" append-icon="money"></v-text-field>
                </v-flex>
                <v-flex xs12 lg3 pl-3 pb-3>
                    <v-btn color="buttonGreensmall" text @click="dialog = false">Follow</v-btn>
                </v-flex>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
export default {
    data() {
        return {
            dialog: false,
            followby: ["Follow by Amount", "Follow by Rate"]
        };
    },
    mounted() {

    },
    methods: {
        ...mapActions(["asyTopPlayer"])
    }
};
</script>

<style scoped>
.followup {
    padding: 10px;
    border-radius: 20px;
}

.ranking span:hover {
    color: green;
    cursor: pointer;
}

.topHeader p:first-child {
    border: 1px solid;
}

.header {
    color: #6c6c6c;
}

.userRow {
    border: 1px solid #dddddd;
    border-radius: 10px;
    background-color: #ffffff;
    margin: 5px 0px;
    padding: 10px 0px;
}

.userRow th {
    border-right: 1px solid #dddddd;
    width: 25%;
    padding: 5px;
}

.userRow th:first-child span {
    vertical-align: middle;
}

.userRow th:first-child i {
    vertical-align: middle;
    /* border-radius:10px; */
}

.pimage {
    border-radius: 180px;
}
</style>
