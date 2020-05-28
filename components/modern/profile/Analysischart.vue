<template>
<div class="text-xs-center">
    <v-alert :value="true" color="#384e63" icon="priority_high" outline v-show="!load">
        Sorry,  No Data to display :(
    </v-alert>
    <canvas ref="planetchart" class="set-height" v-show="load"></canvas>
    <v-progress-linear :indeterminate="true" color="blue darken-3" v-show="!load"></v-progress-linear>
</div>
</template>

<script>
import {
    Line,
    mixins
} from 'vue-chartjs'
import VueCharts from "vue-chartjs";
import Chart from 'chart.js';
export default {
    data() {
        return {
            load: false,
            stockname: [],
            betlose: [],
            betwon: [],
        }
    },
    mounted() {
        // this.getChart()
        setInterval(() => {
            if (this.load == false) {
                this.getChart()
            }
        }, 1000)
    },
    methods: {
        setZero(num, digit) {
            var zero = '';
            for (var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        formatToPrice(value) {
            if (this.$route.params.id.split('-')[1] == 'usindex') {
                return `${Number(value).toFixed(4)}`;
            } else {
                return `${Number(value).toFixed(2)}`;
            }
        },
        async getChart() {
            this.stockname = []
            this.betlose = []
            this.betwon = []
            let dataGet = await this.$axios.$post('/api/me/betAnalysis?apikey=' + this.$store.state.auth_token)
            if (dataGet.data == "") return this.load = false;

            dataGet.data.forEach(element => {
                this.load = true
                this.stockname.push(element.stockName == 'btc1' ? this.$root.$t('stockname.' + element.stockName) + ' ' + '1' : element.stockName == 'btc5' ? this.$root.$t('stockname.' + element.stockName) + ' ' + '5' : this.$root.$t('stockname.' + element.stockName));
                this.betlose.push(element.loseBet);
                this.betwon.push(element.winBet);
            });
            let config = {
                type: "bar",
                data: {
                    labels: this.stockname,
                    datasets: [{
                            label: this.$root.$t('msg.winbet'),
                            data: this.betwon,
                            backgroundColor: "blue"
                        },
                        {
                            label: this.$root.$t('msg.losebet'),
                            data: this.betlose,
                            backgroundColor: "red"
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    },
                    tooltips: {
                        mode: "index",
                        intersect: false
                    },
                    hover: {
                        mode: "nearest",
                        intersect: true
                    }
                }
            }

            const ctx = this.$refs.planetchart;
            const mychart = new Chart(ctx, config);

        }
    }
}
</script>

<style scoped>
.set-height {
    height: 300px;
}

.v-progress-circular {
    margin: 1rem
}
</style>
