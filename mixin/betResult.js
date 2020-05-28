const jsonResult = require('~/data/result') // define the json result for the compare 
import secureStorage from '~/plugins/secure-storage'
import { mapMutations, mapGetters, mapActions } from 'vuex'
// define a mixin object
export const BetResult = {

    computed: {
        ...mapGetters(["getItemsBetting"])
    },

    methods: {

        ...mapActions([
            "setCollegeButtonNumberParent",
            "clearItemBetting",
            "clearTempMultiGameBetData"

        ]),
        /**
         *
         *
         * @param {*} result
         * @param {*} stockName
         * @param {*} betID
         * @param {*} betWin
         */
        betResult(result, stockName, betID, betWin) { // result, stockName , betID , betWin   
            this.clearItemsAfterLastDraw()
            const lastDraw = result.substr(result.length - 2); //get the last two digit
            const first = parseInt(lastDraw.slice(0, 1)); // get the first digit number  
            const last = parseInt(lastDraw.slice(1, 2)); // get the last digit number 
            const bothDigit = first + last; // get the both digit number 
            const twoDigit = lastDraw.slice(0, 1) + lastDraw.slice(1, 2); // git the two digit number          
            jsonResult.resultBet.map((items, index) => {
                if ($("#" + stockName + betID).hasClass(items.type)) {
                    items.rules.map((item, index) => {
                        if ($("#" + stockName + betID).hasClass(item.name)) {
                            switch (items.type) {
                                case 'firstdigit':
                                    this.multipleResult(item, first, stockName, betID, betWin, item.name)
                                    break;
                                case 'lastdigit':
                                    this.multipleResult(item, last, stockName, betID, betWin, item.name)
                                    break;
                                case 'bothdigit':
                                    this.multipleResult(item, bothDigit, stockName, betID, betWin, item.name)
                                    break;
                                case 'twodigit':
                                    this.multipleResultTwoDigit(item, twoDigit, stockName, betID, betWin, item.name)
                                    break;
                                default:
                            }
                        }
                    })
                }
            })
            this.setCollegeButtonNumberParent('Can not find any bet') // make the button collage 
        },

        /**
         *
         *
         * @param {*} item
         * @param {*} number
         * @param {*} stockName
         * @param {*} betID
         * @param {*} betWin
         * @param {*} name
         */
        multipleResult(item, number, stockName, betID, betWin, name) {
            const specificNumber = "#" + stockName + betID.split("-")[0] // create the variable for receive the value
            const result = item.rule.includes(number); // check the value is have or not in the json result
            if (result) {

                this.$soundEffect('win')

                $("#" + betWin).addClass('chip-animation');
                $("#" + stockName + betID).addClass(
                    betID.split("-")[0] + "-animation"
                );

                setTimeout(() => {
                    this.setCollegeButtonNumberParent("You are win") // try to set the difference value 

                    this.$soundEffect('win')

                    $("#" + stockName + betID).removeClass(
                        betID.split("-")[0]
                    );
                    $("#" + stockName + betID).removeClass(
                        betID.split("-")[0] + "-animation"
                    );
                    $(specificNumber).removeClass(
                        betID.split("-")[0] + "-animation"
                    );
                    $(specificNumber).removeClass(
                        betID.split("-")[0]);

                    $("#" + betWin).removeClass('chip-animation');
                    // this.collectCoin()
                }, 5000);

            } else if ($(specificNumber + '-' + number).hasClass(betID.split("-")[0])) {
                $(specificNumber).addClass(betID.split("-")[0]);
                $(specificNumber).addClass(
                    betID.split("-")[0] + "-animation"
                );
                $(specificNumber).addClass(
                    betID.split("-")[0]
                );
                $(specificNumber + 'Number').addClass('chip-animation');
                this.setCollegeButtonNumberParent('You are lose in else false')
                console.log('You win from  ', specificNumber + '-' + number)

                $("#" + stockName + betID).removeClass(
                    betID.split("-")[0]
                );
            } else {
                $(specificNumber + 'Number').removeClass('chip-animation');

                this.setCollegeButtonNumberParent('You are lose in else' + specificNumber + '-' + number)
                $(specificNumber).removeClass(
                    betID.split("-")[0]
                );
                $("#" + stockName + betID).removeClass(
                    betID.split("-")[0]
                );
            }
        },

        /**
         *
         *
         * @param {*} item
         * @param {*} number
         * @param {*} stockName
         * @param {*} betID
         * @param {*} betWin
         * @param {*} name
         */
        multipleResultTwoDigit(item, number, stockName, betID, betWin, name) {
            const specificNumber = "#" + stockName + betID.split("-")[0] // create the variable for receive the value
            const result = item.rule.includes(number); // check the value is have or not in the json result
            if (result) {
                this.$soundEffect('win')

                $("#" + betWin).addClass('chip-animation');
                $(specificNumber + 'Number').addClass('chip-animation');
                $("#" + stockName + betID.split("-")[0]).addClass(
                    betID.split("-")[0] + "-animation"
                );
                $("#" + stockName + betID).addClass(
                    betID.split("-")[0] + "-animation"
                );

                setTimeout(() => {
                    this.setCollegeButtonNumberParent("You are win")

                    this.$soundEffect('win')

                    $("#" + stockName + betID).removeClass(
                        betID.split("-")[0]
                    );
                    $("#" + stockName + betID).removeClass(
                        betID.split("-")[0] + "-animation"
                    );
                    $(specificNumber).removeClass(
                        betID.split("-")[0] + "-animation"
                    );
                    $(specificNumber).removeClass(
                        betID.split("-")[0]);

                    // this.collectCoin()
                    $("#" + betWin).removeClass('chip-animation');
                }, 5000);

            } else {
                $(specificNumber + 'Number').removeClass('chip-animation');
                console.log('This is the result of two digit :', specificNumber + '-' + number)
                this.setCollegeButtonNumberParent('You are lose in else' + specificNumber + '-' + number)
                $(specificNumber).removeClass(
                    betID.split("-")[0]
                );
                $("#" + stockName + betID).removeClass(
                    betID.split("-")[0]
                );
            }
            $(specificNumber + 'Number').removeClass('chip-animation');
        },


        // collection the coin when user win to the top 
        collectCoin() {
            let elements = document.getElementsByClassName("chip-animation");
            for (let i = 0; i < elements.length; i++) {
                let top =
                    elements[i].offsetParent.offsetParent.offsetTop +
                    elements[i].offsetParent.offsetTop +
                    62 +
                    elements[i].offsetParent.offsetParent.offsetParent.offsetParent
                    .offsetTop;
                let left =
                    elements[i].offsetParent.offsetParent.offsetParent.offsetParent
                    .offsetLeft + elements[i].offsetParent.offsetParent.offsetLeft;
                elements[i].style.position = "fixed";
                elements[i].style.top = top + "px";
                elements[i].style.left = left + "px";

                setTimeout(() => {
                    elements[i].style.transition = "left 1s linear, top 1s linear ";
                    elements[i].style.top =
                        document.getElementById("userBanlance").offsetTop + "px";
                    elements[i].style.left =
                        document.getElementById("userBanlance").offsetParent.offsetParent
                        .offsetLeft + "px";
                }, 1);
                // clear style
                setTimeout(() => {
                    elements[i].style.display = "none";
                    elements[i].style.top = 0;
                    elements[i].style.left = 0;
                    elements[i].style.transition = "left 0s linear, top 0s linear ";
                }, 1200);
            }
        },


        /**
         *
         *
         */
        clearItemsAfterLastDraw() {

            secureStorage.removeItem("itemBetting")

            this.clearTempMultiGameBetData()


            if (this.getItemsBetting.length) {

                this.clearItemBetting()

                secureStorage.removeItem("itemBetting")

            }
        }
    }
}