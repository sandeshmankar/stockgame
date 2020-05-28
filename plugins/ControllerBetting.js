export default ({ app, store }, inject) => {

    /**   
     *  
     *
     * @param {*} items   
     */
    inject('StoreBettingonConfirm', async(items) => {
        try {
            await store.dispatch("setBettingOnConfirm", items)
        } catch (error) {
            console.log(error)
        }
    })

    /**  
     *  
     * 
     * @param {*} name   
     */
    inject('audioLibrary', (name) => {
        try {
            const loadLibrary = new Audio(`/voice/${name}`);
            return loadLibrary
        } catch (error) {
            console.log(error)
        }
    })

    /**   
     * 
     * 
     * @param {*} name   
     */
    inject('soundEffect', async(name) => {
        try {
            await app.$audioLibrary(`${name}.mp3`).play();
        } catch (error) {
            console.log(error)
        }
    })

}