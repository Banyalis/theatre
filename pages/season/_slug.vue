<template>
    <div class="SeasonPage">
        <CommonHero
            :type="type"
            :title="title"
            :is-title-bottom="true"
            :tabs="tabs"
        />
        <SeasonContent
            v-if="show"
            :type="$route.params.slug"
            :content="content"
        />
        <div v-else class="SeasonPage-alert" v-text="'Спектаклей нет'"></div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import SeasonContent from '@/components/season/SeasonContent';
import CommonHero from '@/components/common/CommonHero';
import { HEADER_THEMES } from '@/utils/constants';

export default {
    name: 'SeasonPage',

    components: {
        SeasonContent,
        CommonHero
    },

    middleware: 'season',
    scrollToTop: false,

    data() {
        return {
            type: 'season',
            title: 'Сезон 2021–2022',
            tabs: [
                {
                    title: 'Премьеры',
                    link: '/season/premieres'
                },
                {
                    title: 'Опера',
                    link: '/season/opera'
                },
                {
                    title: 'Балет',
                    link: '/season/ballet'
                },
                {
                    title: 'Концерты',
                    link: '/season/concert'
                },
                {
                    title: 'Гастроли',
                    link: '/season/tour'
                }
                // {
                //     title: 'Гости на наших сценах',
                //     link: '/season/guest'
                // }
            ],
            show: false
        };
    },

    async fetch({ $config: { baseURL }, $axios, params, store }) {
        const meta = await $axios.get(`${baseURL}/cms/api/season/meta/`);

        if (meta) store.commit('season/checkingCategories', meta.data);

        // TODO: Change to integrated version after all season pages will be integrated
        const CMS_CATEGORIES = ['premieres', 'opera', 'ballet'];
        const categoryIntegrated = CMS_CATEGORIES.find(
            (category) => category === params.slug
        );
        let res;

        if (categoryIntegrated) {
            res = await $axios.get(`${baseURL}/cms/api/season/${params.slug}`);

            if (res) store.commit('season/setContent', res.data);
        } else {
            res = await $axios.get(`${baseURL}/api/season/get`, {
                params: {
                    slug: params.slug
                }
            });

            if (res) store.commit('season/setStaticContent', res.data);
        }
    },

    head() {
        return {
            title: 'Большой театр • Сезон 2021—2022'
        };
    },

    computed: {
        ...mapState('season', ['content', 'categories'])
    },

    mounted() {
        this.setTheme();

        const slug = this.$route.params.slug;

        this.show = this.categories[slug] >= 1;

        if (slug === 'concert' || slug === 'tour') {
            this.show = true;
        }
    },

    updated() {
        this.setTheme();
    },

    // need for save keep-alive in layout
    deactivated() {
        this.$destroy();
    },

    methods: {
        setTheme() {
            this.changeTheme({
                headerMod: HEADER_THEMES.default,
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
.SeasonPage {
    $component: &;

    width: 100%;
    position: relative;

    &-alert {
        margin: scaling(60) auto;
        padding: scaling(24) 0;
        border-top: 1px solid rgba($c-black, 0.2);
        border-bottom: 1px solid rgba($c-black, 0.2);
        font-size: scaling(20);
        line-height: $lh-140;
        text-align: center;
        text-transform: uppercase;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            width: (700 * 100% / 1920);
            margin: scaling(100) auto;
            padding: scaling(32) 0;
            font-size: scaling(36);
            line-height: $lh-110;
        }

        @include desktop {
            width: (530 * 100% / 1440);
            margin: scaling(80) auto;
            padding: scaling(28) 0;
            font-size: scaling(28);
        }

        @include desktop--small {
            width: (440 * 100% / 1200);
            margin: scaling(68) auto;
            font-size: scaling(24);
        }

        @include laptop {
            width: (450 * 100% / 960);
            line-height: $lh-120;
            letter-spacing: 0.02em;
        }

        @include tablet {
            width: (350 * 100% / 768);
            padding: scaling(20) 0;
            letter-spacing: 0.02em;
        }

        @include mobile {
            margin: scaling(56) auto;
            padding: scaling(20) 0;
            line-height: $lh-120;
            letter-spacing: 0.02em;
        }
    }
}
</style>
