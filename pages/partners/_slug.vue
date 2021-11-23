<template>
    <div class="Partners">
        <CommonHeadPage :title="`Партнеры`" theme="isDark" />
        <CommonNavPage :nav="nav" theme="isDark" />
        <component :is="mappedComponents[content.type]" :content="content" />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { HEADER_THEMES } from '../../utils/constants';
import CommonHeadPage from '~/components/common/CommonHeadPage';
import CommonNavPage from '~/components/common/CommonNavPage';
import PartnersSponsors from '~/components/partners/PartnersSponsors';
import PartnersAdvice from '~/components/partners/PartnersAdvice';
import PartnersFund from '~/components/partners/PartnersFund';
import PartnersSponsor from '~/components/partners/PartnersSponsor';

export default {
    components: {
        CommonHeadPage,
        CommonNavPage,
        PartnersSponsors,
        PartnersAdvice,
        PartnersFund,
        PartnersSponsor
    },

    beforeRouteEnter(to, from, next) {
        if (to !== from) {
            try {
                window.scrollTo(0, 0);
            } catch {}
        }

        next();
    },

    middleware: 'partners',
    scrollToTop: false,

    data() {
        return {
            nav: [
                {
                    url: '/partners/sponsors',
                    title: 'Спонсоры'
                },
                {
                    url: '/partners/advice',
                    title: 'Попечительский совет'
                },
                {
                    url: '/partners/fund',
                    title: 'Фонд Большого театра'
                },
                {
                    url: '/partners/sponsor',
                    title: 'Стать спонсором'
                }
            ],
            mappedComponents: {
                sponsors: 'PartnersSponsors',
                advice: 'PartnersAdvice',
                fund: 'PartnersFund',
                sponsor: 'PartnersSponsor'
            }
        };
    },

    async fetch({ $config: { baseURL }, $axios, params, store }) {
        const resData = await $axios.get(`${baseURL}/api/partners/get`, {
            params: {
                slug: params.slug
            }
        });

        if (resData) store.commit('partners/setContent', resData.data);
    },

    head() {
        return {
            title: 'Большой театр • ' + this.content.meta.title
        };
    },

    computed: {
        ...mapState('partners', ['content'])
    },

    mounted() {
        this.setTheme();
    },

    deactivated() {
        this.$destroy();
    },

    updated() {
        this.setTheme();
    },

    methods: {
        setTheme() {
            this.changeTheme({
                headerMod: HEADER_THEMES.dark,
                isFooterDark: false
            });
        },

        ...mapMutations({
            changeTheme: 'changeTheme'
        })
    }
};
</script>

<style lang="scss" scoped>
.Partners {
    $component: &;
}
</style>
