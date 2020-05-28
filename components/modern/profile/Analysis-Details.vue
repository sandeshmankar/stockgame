<template>
<div>
    <v-data-table :headers="headers" hide-actions :items="history" class="elevation-1">
        <template v-slot:headers="headers">
            <tr>
                <th class="text-white">{{$t('msg.Stock Name')}}</th>
                <th class="text-white">{{$t('msg.Total Bet')}}</th>
                <th class="text-white">{{$t('msg.winbet')}}</th>
                <th class="text-white">{{$t('msg.losebet')}}</th>
                <th class="text-white">{{$t('msg.Win Rate')}}</th>
            </tr>
        </template>
        <template v-slot:items="props">
            <td>
                {{ $t('stockname.'+props.item.stockName) }}
                {{ props.item.stockName == 'btc1' ? ' 1 ':props.item.stockName == 'btc5' ? ' 5 ':'' }}
            </td>
            <td>{{props.item.totalBet}}</td>
            <td>{{props.item.winBet}}</td>
            <td>{{props.item.loseBet}}</td>
            <td>{{props.item.winRate}}</td>
        </template>
        <template v-slot:no-data>
            <v-alert :value="true" color="#384e63" icon="priority_high" outline>
                {{$t('msg.nodata')}} :(
            </v-alert>
        </template>
    </v-data-table>
</div>
</template>

<script>
export default {
    data() {
        return {
            history: [],
            selected: [],
            headers: [{
                    text: this.$root.$t('msg.Stock Name'),
                    align: "center",
                    sortable: false,
                    value: "betId",
                    total: false,
                },
                {
                    text: this.$root.$t('msg.Total Bet'),
                    sortable: false,
                    align: "center",
                    value: "gameId",
                    total: false,
                },
                {
                    text: this.$root.$t('msg.winbet'),
                    sortable: false,
                    align: "center",
                    value: "page",
                    page: true,
                },
                {
                    text: this.$root.$t('msg.losebet'),
                    sortable: false,
                    align: "center",
                    value: "betTime",
                    total: false,
                },
                {
                    text: this.$root.$t('msg.Win Rate'),
                    sortable: false,
                    align: "center",
                    value: "betAmount",
                    total: true,
                }
            ]

        }
    },
    mounted() {
        this.getChart()
    },
    methods: {
        async getChart() {
            let dataGet = await this.$axios.$post('/api/me/betAnalysis?apikey=' + this.$store.state.auth_token)
            // console.log(dataGet.data)

            dataGet.data.forEach(element => {
                this.history.push({
                    loseBet: element.loseBet,
                    stockName: element.stockName,
                    totalBet: element.totalBet,
                    winBet: element.winBet,
                    winRate: element.winRate
                });
            });
        }
    }
}
</script>
<style scoped>
table thead tr th {
    background-color: #003e70;
    font-size: 1rem;
}

.text-white {
    color: #FFF;
}
</style>