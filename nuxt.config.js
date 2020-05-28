const pkg = require("./package");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
import config from "./config/config.global";
module.exports = {
    mode: "spa",
    buildModules: [
        // Simple usage
        "@nuxtjs/dotenv"
        // With options
        // ['@nuxtjs/dotenv', { /* module options */ }]
    ],
    /*
     ** Headers of the page
     */
    head: {
        title: "EC Gaming",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: pkg.description }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,500i,700,900&display=swap"
            }
        ],
        script: [{
            src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
        }]
    },
    generate: {
        routes: [
            // dynamic route for desktop
            "/modern/desktop/btc1",
            "/modern/desktop/btc5",
            "/modern/desktop/sh000001",
            "/modern/desktop/sh000300",
            "/modern/desktop/sz399415",
            "/modern/desktop/sz399001",
            "/modern/desktop/usindex",
            // dynamic route for fullscreen
            "/modern/fullscreen/btc1",
            "/modern/fullscreen/btc5",
            "/modern/fullscreen/sh000001",
            "/modern/fullscreen/sh000300",
            "/modern/fullscreen/sz399415",
            "/modern/fullscreen/sz399001",
            "/modern/fullscreen/usindex",
            // dynamic route for multigame
            "/modern/multigame/btc1",
            "/modern/multigame/btc5",
            "/modern/multigame/sh000001",
            "/modern/multigame/sh000300",
            "/modern/multigame/sz399415",
            "/modern/multigame/sz399001",
            "/modern/multigame/usindex",
            // dynamic route for mobile
            "/modern/betting/btc1",
            "/modern/betting/btc5",
            "/modern/betting/sh000001",
            "/modern/betting/sh000300",
            "/modern/betting/sz399415",
            "/modern/betting/sz399001",
            "/modern/betting/usindex",
            // profile
            "/modern/desktop/profile",
            "/modern/desktop/profile/onlinehistory",
            "/modern/desktop/profile/stockanalysis",
            "/modern/desktop/profile/follower",
            "/modern/desktop/profile/notification",
            "/modern/desktop/profile/setting"
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: "~/components/loaders/PageTransition.vue",
    loadingIndicator: {
        name: "~/components/loaders/PageLoader.html",
        color: "#FDFEFE",
        background: "#2980B9"
    },
    pageTransition: {
        name: "fade",
        mode: "out-in"
    },
    /*
     ** Global CSS
     */
    css: [
        "~/assets/style/media-query.css",
        "~/assets/style/main.css",
        "~/assets/style/main.scss",
        "~/assets/style/app.styl"
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        "~/plugins/ControllerBetting",
        "@/plugins/vuetify",
        "@plugins/maintenance",
        "@plugins/js-cookie", // for setting and reading cookies
        // "~/plugins/axios",
        // "@/plugins/roarr", // for generating logs
        "@plugins/secure-storage", // for encrypting local storage
        "@/plugins/filters",
        //{ src: "~/plugins/vuex-persist", ssr: false }, // for making vuex state persistent
        "@/plugins/i18n",
        "@/plugins/login.js", // login plugin
        "@/plugins/chart",
        "@/plugins/sweetAlert",
        "@/plugins/vueScreen",
        "@/plugins/socketio",
        { src: "@/plugins/vChart", mode: "client" },
        { src: "@/plugins/ga", mode: "client" }
    ],
    router: {
        middleware: ["auth", "showLoading"]
            // middleware: 'maintenance'
    },
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage 
        "@nuxtjs/axios",
        "@nuxtjs/font-awesome",
        "@nuxtjs/moment",
        //['vue-wait/nuxt', { useVuex: true }],
        [
            "nuxt-fontawesome",
            {
                component: "fa",
                imports: [
                    //import whole set
                    {
                        set: "@fortawesome/free-solid-svg-icons",
                        icons: ["fas"]
                    }
                ]
            }
        ]
    ],
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        // baseURL: "http://uattesting.equitycapitalgaming.com/webApi",
    },
    /*
     ** Build configuration
     */
    build: {
        transpile: ["vuetify/lib", "@rabota/yandex-metrika"],
        plugins: [new VuetifyLoaderPlugin()],
        loaders: {
            stylus: {
                import: ["~assets/style/variables.styl"]
            }
        },
        /*
         ** You can extend webpack config here
         */
        extend: function(config, { isDev, isClient }) {
            if (isDev) {
                config.devtool = isClient ? "source-map" : "inline-source-map";
            }
            config.node = {
                fs: "empty"
            };
        }
    },
    server: config.serverConfig
};