<template>
    <div class="About">
        <CommonHeadPage :title="`О театре`" theme="isGold" />
        <CommonNavPage :nav="nav" theme="isGold" />
        <component :is="mappedComponents[content.type]" :content="content" />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { HEADER_THEMES } from '@/utils/constants';
import CommonHeadPage from '~/components/common/CommonHeadPage';
import CommonNavPage from '~/components/common/CommonNavPage';
import AboutHistory from '~/components/about/AboutHistory';
import AboutBuilding from '~/components/about/AboutBuilding';
import AboutPress from '~/components/about/AboutPress';
import AboutSpectacle from '~/components/about/AboutSpectacle';
import AboutYouth from '~/components/about/AboutYouth';
import AboutContacts from '~/components/about/AboutContacts';
import AboutDocuments from '~/components/about/AboutDocuments';
import AboutListening from '~/components/about/AboutListening';

export default {
    components: {
        CommonHeadPage,
        CommonNavPage,
        AboutHistory,
        AboutBuilding,
        AboutPress,
        AboutSpectacle,
        AboutYouth,
        AboutContacts,
        AboutDocuments,
        AboutListening
    },

    beforeRouteEnter(to, from, next) {
        if (to.name.split('-')[0] !== from.name?.split('-')[0]) {
            try {
                window.scrollTo(0, 0);
            } catch {}
        }

        next();
    },

    middleware: ['about', 'documents', 'listening'],
    scrollToTop: false,

    data() {
        return {
            nav: [
                {
                    url: '/about/history',
                    title: 'История'
                },
                {
                    url: '/about/building',
                    title: 'О здании'
                },
                {
                    url: '/about/opera',
                    title: 'Молодежная оперная программа'
                },
                {
                    url: '/about/ballet',
                    title: 'Молодежная балетная программа'
                },
                // {
                //     url: '/about/listening',
                //     title: 'Прослушивания'
                // },
                {
                    url: '/about/press',
                    title: 'Пресс-служба'
                },
                {
                    url: '/about/contacts',
                    title: 'Контакты'
                },
                {
                    url: '/about/documents',
                    title: 'Документы'
                }
            ],
            mappedComponents: {
                history: 'AboutHistory',
                building: 'AboutBuilding',
                press: 'AboutPress',
                spectacle: 'AboutSpectacle',
                youth: 'AboutYouth',
                contacts: 'AboutContacts',
                documents: 'AboutDocuments',
                listening: 'AboutListening'
            }
        };
    },

    async fetch({ $config: { baseURL }, $axios, params, store }) {
        const resData = await $axios.get(`${baseURL}/api/about/get`, {
            params: {
                slug: params.slug
            }
        });

        if (resData) store.commit('about/setContent', resData.data);
    },

    head() {
        return {
            title: 'Большой театр • ' + this.content.meta.title
        };
    },

    computed: {
        ...mapState('about', ['content'])
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
                headerMod: HEADER_THEMES.gold,
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
.About {
    $component: &;
}
</style>
