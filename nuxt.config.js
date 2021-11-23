import i18nOptions from './modules/i18n';
import proxy from './modules/proxy';

// eslint-disable-next-line
// console.log(proxy);

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Большой театр • Официальный сайт',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            },
            {
                name: 'og:title',
                content: ''
            },
            {
                name: 'og:description',
                content: ''
            },
            {
                name: 'og:url',
                content: ''
            },
            {
                name: 'site_name',
                content: ''
            },
            {
                name: 'og:type',
                content: 'site'
            },
            {
                name: 'og:image',
                content: '/og/og.png'
            }
        ],
        link: [
            {
                rel: 'apple-touch-icon',
                sizes: '192x192',
                href: '/favicon/favicon-192x192.png'
            },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/favicon/favicon-180x180.png'
            },
            {
                rel: 'icon',
                sizes: '32x32',
                href: '/favicon/favicon-32x32.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon/favicon-16x16.png'
            }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/scss/fonts.scss', '@/assets/scss/base.scss'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/vue-lazyload.js', ssr: false },
        { src: '~/plugins/masonry.js', ssr: false },
        '@/plugins/commonMixin'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: false,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        // TODO: Check dotenv version on security bug
        '@nuxtjs/dotenv',
        '@nuxtjs/eslint-module',
        '@nuxtjs/google-analytics'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
        '@nuxtjs/svg-sprite',
        '@nuxtjs/proxy',
        // Doc: https://nuxt-community.github.io/nuxt-i18n/
        ['nuxt-i18n', i18nOptions],
        ['vue-scrollto/nuxt', { duration: 200 }],
        [
            '@nuxtjs/yandex-metrika',
            {
                id: 85031137,
                webvisor: true,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
            }
        ]
    ],

    googleAnalytics: {
        id: 'UA-209485542-1'
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    /*
     ** Configuration, available to client and server
     ** See https://nuxtjs.org/guide/runtime-config
     */
    publicRuntimeConfig: {
        baseURL: process.env.SERVICE_URL,
        proxyApiURL: process.env.PROXY_API_URL
    },

    serverMiddleware: [
        { path: '/api', handler: require('body-parser').json() },
        {
            path: '/api',
            handler: (req, res, next) => {
                const url = require('url');
                req.query = url.parse(req.url, true).query;
                req.params = { ...req.query, ...req.body };
                next();
            }
        },
        { path: '/api', handler: '~/serverMiddleware/api.js' }
        // {
        //     path: process.env.PROXY_API_TICKETS_ENDPOINT,
        //     handler: '~/serverMiddleware/tickets.js'
        // }
    ],

    proxy,

    styleResources: {
        scss: ['@/assets/scss/constants.scss', '@/assets/scss/mixins.scss']
    }
};
