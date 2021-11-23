const i18nOptions = {
    locales: [
        {
            name: 'Russian',
            code: 'ru',
            iso: 'ru-RU',
            file: 'ru-RU.js',
            class: 'lang-ru'
        },
        {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js',
            class: 'lang-en'
        }
    ],
    langDir: 'lang/',

    lazy: true,
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    routesNameSeparator: '---',

    detectBrowserLanguage: false,

    // detectBrowserLanguage: {
    //     // If enabled, a cookie is set once a user has been redirected to his
    //     // preferred language to prevent subsequent redirections
    //     // Set to false to redirect every time
    //     useCookie: true,
    //     // Cookie name
    //     cookieKey: 'i18n_redirected',
    //     // Set to always redirect to value stored in the cookie, not just once
    //     alwaysRedirect: true
    // },

    seo: false,
    differentDomains: false,

    vueI18n: {
        fallbackLocale: 'ru',
        silentTranslationWarn: process.env.NODE_ENV === 'production'
    }
};

module.exports = i18nOptions;
