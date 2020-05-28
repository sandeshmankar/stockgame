import secureStorage from '~/plugins/secure-storage'

class Betting {
    /**
     *
     *
     * @param {*} items
     * @memberof Betting
     */
    async cancelBettingClear(items) {

            try {
                if (items.length) {

                    items.map(item => {

                        $("#" + item.id.split("-")[0]).removeClass(item.class)

                        if ($("#" + item.id).hasClass(item.class)) {

                            secureStorage.removeItem("itemBetting")

                            $("#" + item.id).removeClass(item.class + ' ' + item.id.split("-")[1])

                        }
                    })

                }
            } catch (error) {
                console.log(error)
            }
        }
        /**
         *
         *
         * @memberof Betting
         */
    async clearBettingFailure() {
        try {

            const getItem = secureStorage.getItem("itemBetting")

            const array = JSON.parse(getItem)

            if (array.length) {

                array.map(item => {

                    $("#" + item.id.split("-")[0]).removeClass(item.class)

                    if ($("#" + item.id).hasClass(item.class)) {

                        secureStorage.removeItem("itemBetting")

                        $("#" + item.id).removeClass(item.class + ' ' + item.id.split("-")[1])

                    }
                })

            }

        } catch (error) {
            console.log(error)
        }
    }






}
export default Betting = new Betting