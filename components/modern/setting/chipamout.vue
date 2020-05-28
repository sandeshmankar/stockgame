<template>
<div>
    <v-card class="my-bg">
        <v-layout row wrap justify-center>
            <v-flex xs6 md3 lg2 v-for="(item,key) in imgChip" :key="key" class="chipdiv">
                <div class="d-block">
                    <v-img width="100" :src="item.img" >
                        <v-text-field :style="isfullscreen ? 'margin-left: 31%;':''" text-center outlined v-model="getCoins_modern[key]" :class="item.color" :ref="item.id"></v-text-field>
                    </v-img>
                    <v-card-actions>
                        <v-btn text @click="conOrEClick">{{$t('msg.'+conOrE)}}</v-btn>
                    </v-card-actions>
                    <div v-show="conOrE=='confirm'">
                        <v-card-text>{{$t('msg.min')}} = $200</v-card-text>
                        <v-card-text>{{$t('msg.max')}} = $20,000</v-card-text>
                    </div>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
            <v-btn text @click="reset">{{$t('msg.resettodefault')}}</v-btn>
        </v-layout>
        <v-layout row wrap justify-center>
            <v-btn class="my-btn" @click="saveClick()">{{$t('msg.save')}}</v-btn>
            <v-btn class="my-btn cancel">{{$t('msg.cancel')}}</v-btn>
        </v-layout>
    </v-card>
</div>
</template>

<script>
import {
    mapGetters,
    mapMutations
} from "vuex";

export default {
    props:["value"],
    data() {
        return {
            conOrE: 'edit',
            isfullscreen:false,
            imgChip: [{
                    id: "ship1",
                    title: "Danger",
                    img: "/chip/danger.png"
                },
                {
                    id: "ship2",
                    title: "Primary",
                    img: "/chip/primary.png"
                },
                {
                    id: "ship3",
                    title: "success",
                    img: "/chip/success.png"
                },
                {
                    id: "ship4",
                    title: "warning",
                    img: "/chip/warning.png"
                },
                {
                    id: "ship5",
                    title: "black",
                    img: "/chip/black.png",
                    color: "text-dark"
                }
            ]
        };
    },
    computed: {
        ...mapGetters(["getCoins_modern"])
    },
    created(){
      // check is full screen or not
        let path = this.$nuxt.$route.name.split("-");
        let isfullscreen = path[1];
        if (isfullscreen === "fullscreen") {
            this.isfullscreen = true;
        } else {
            this.isfullscreen = false;
        }
    },
    methods: {
        ...mapMutations(["setCoins_modern"]),
        conOrEClick() {
            if (this.conOrE == 'edit') {
                this.conOrE = 'confirm';
            }
        },
        reset() {
            let defaultCoin = ["100", "500", "1000", "5000", "10000"];
            this.$refs.ship1[0].value = defaultCoin[0]
            this.$refs.ship2[0].value = defaultCoin[1]
            this.$refs.ship3[0].value = defaultCoin[2]
            this.$refs.ship4[0].value = defaultCoin[3]
            this.$refs.ship5[0].value = defaultCoin[4]
        },
        saveClick() {
            let ship1 = this.$refs.ship1[0].value
            let ship2 = this.$refs.ship2[0].value
            let ship3 = this.$refs.ship3[0].value
            let ship4 = this.$refs.ship4[0].value
            let ship5 = this.$refs.ship5[0].value
            let new_amount = `["${ship1}", "${ship2}", "${ship3}", "${ship4}", "${ship5}"]`;
            localStorage.setItem("coinModern", new_amount);
            this.setCoins_modern();
        }
    }
};
</script>

<style>
.chipdiv {

    padding-top: 20px;
}
</style>
