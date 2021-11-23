<script src="../../../../Downloads/index.js"></script>
<template>
    <div id="layout">
        <section
            id="main-content"
            class="main-content"
            :class="{
                isDark: headerDarkTheme && footerDarkTheme,
                isScrollLocked
            }"
            :style="{ top: -savedScrollPosition + 'px' }"
        >
            <Header
                :mod="headerMod"
                :is-white="whiteTheme"
                @check-visit-page="setActiveVisitPage"
            />
            <div>
                <!--  keep-alive need for logic of the SPA Popups  -->
                <nuxt keep-alive />
            </div>
            <Footer
                :is-dark="footerDarkTheme"
                :is-active-visit="visitPageActive"
            />
        </section>
        <BasePopup />
        <CookieAgreement @close="onCookieAgreementClose" />
        <OldSiteButton ref="oldSiteButton" />
        <div class="dimmed-overlay dimmed-overlay-popup"></div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Header from '~/components/other/Header';
import Footer from '~/components/other/Footer';
import BasePopup from '~/components/other/BasePopup';
import CookieAgreement from '~/components/cookie/CookieAgreement';
import OldSiteButton from '~/components/other/OldSiteButton';

export default {
    components: { BasePopup, Footer, Header, CookieAgreement, OldSiteButton },

    head() {
        const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
        const canonicalUrl = i18nHead.link.filter(
            (item) => item.rel === 'canonical'
        )[0].href;

        return {
            htmlAttrs: {
                ...i18nHead.htmlAttrs
            },
            bodyAttrs: {
                class: ['body', this.$i18n.localeProperties.class]
            },
            meta: [
                ...i18nHead.meta,
                {
                    hid: 'og:url',
                    name: 'og:url',
                    content: canonicalUrl
                }
            ],
            link: [...i18nHead.link]
        };
    },

    data() {
        return {
            visitPageActive: false
        };
    },

    computed: {
        ...mapState([
            'headerMod',
            'footerDarkTheme',
            'whiteTheme',
            'isScrollLocked',
            'savedScrollPosition'
        ]),
        ...mapGetters(['headerDarkTheme'])
    },

    created() {
        this.setCurrentLocaleCode(this.$i18n.localeProperties.code);
    },

    mounted() {
        this.$i18n.beforeLanguageSwitch = () => {
            this.setIsLanguageSwitch(true);
        };

        this.$i18n.onLanguageSwitched = (oldCode, newCode) => {
            this.setCurrentLocaleCode(newCode);
        };
    },

    beforeMount() {
        this.$i18n.pluralizationRules = {
            ru: function (choice, choicesLength) {
                if (choice === 0) {
                    return 0;
                }

                const hundreds = choice % 100;
                const teen = hundreds > 10 && hundreds < 20;
                const endsWithOne = choice % 10 === 1;

                if (choicesLength < 4) {
                    return !teen && endsWithOne ? 1 : 2;
                }

                if (!teen && endsWithOne) {
                    return 1;
                }

                if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
                    return 2;
                }

                return choicesLength < 4 ? 2 : 3;
            }
        };
    },

    beforeDestroy() {
        this.$i18n.beforeLanguageSwitch = null;
        this.$i18n.onLanguageSwitched = null;
    },

    methods: {
        onCookieAgreementClose() {
            this.$refs.oldSiteButton.move();
        },
        setActiveVisitPage(value) {
            this.visitPageActive = value;
        },

        ...mapMutations({
            setCurrentLocaleCode: 'setCurrentLocaleCode',
            setIsLanguageSwitch: 'setIsLanguageSwitch'
        })
    }
};
</script>

<style lang="scss" scoped>
.main-content {
    //border-left: 1px solid $c-black;
    //border-right: 1px solid $c-black;
    //border-bottom: 1px solid $c-black;
    border: 1px solid $c-black;

    &.isDark {
        border-color: $c-gray--header;
        background-color: $c-black--header;
    }

    &.isScrollLocked {
        position: fixed;
        left: 0;
        width: 100%;
    }
}
</style>
