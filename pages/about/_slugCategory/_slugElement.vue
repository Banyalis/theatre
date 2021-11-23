<template>
    <div class="About">
        <CommonHeadPage :title="`О театре`" theme="isGold" />
        <CommonNavPage ref="nav" :nav="nav" theme="isGold" />
        <AboutInnerPages
            v-if="getContent && getTypeContent"
            :type="getTypeContent"
            :content="getContent"
        />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { HEADER_THEMES } from '@/utils/constants';
import CommonHeadPage from '~/components/common/CommonHeadPage';
import CommonNavPage from '~/components/common/CommonNavPage';
import AboutInnerPages from '~/components/about/AboutInnerPages';

export default {
    name: 'AboutPages',

    components: {
        CommonHeadPage,
        CommonNavPage,
        AboutInnerPages
    },

    beforeRouteEnter(to, from, next) {
        if (to !== from && to.params.slugCategory !== 'documents') {
            try {
                window.scrollTo(0, 0);
            } catch {}
        }

        next();
    },

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
            ]
        };
    },

    async fetch({ $config: { baseURL }, $axios, params, store }) {
        if (
            store.state.aboutInner.content[params.slugCategory] &&
            store.state.aboutInner.content[params.slugCategory][
                params.slugElement
            ]
        ) {
            return;
        }

        const res = await $axios.get(
            `${baseURL}/api/${params.slugCategory}/get`,
            {
                params: {
                    slug: params.slugElement
                }
            }
        );

        if (res)
            store.commit('aboutInner/setContent', {
                subCategoryContent: res.data,
                category: params.slugCategory,
                subCategory: params.slugElement
            });
    },

    head() {
        return {
            title: 'Большой театр • Документы'
        };
    },

    computed: {
        getContent() {
            return (
                this.content[this.$route.params.slugCategory] &&
                this.content[this.$route.params.slugCategory][
                    this.$route.params.slugElement
                ]
            );
        },

        getTypeContent() {
            return this.$route.params.slugCategory;
        },

        ...mapState(['headerHeight']),
        ...mapState('aboutInner', ['content'])
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
