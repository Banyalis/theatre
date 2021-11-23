<template>
    <div class="News">
        <div class="News-hero">
            <h1 class="News-heroTitle" v-text="'Новости'"></h1>
        </div>
        <!-- <div class="News-filters">
            <NewsFilter :filter="filter" :popup="popup" />
        </div> -->
        <div class="News-content">
            <NewsGrid
                :list="news"
                :count-pages="countPages"
                :active-page="activePage"
            />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { HEADER_THEMES } from '../../utils/constants';
// import NewsFilter from '~/components/news/NewsFilter';
import NewsGrid from '~/components/news/NewsGrid';

export default {
    components: {
        NewsGrid
        // NewsFilter
    },

    data() {
        return {
            filter: [
                {
                    modifier: 'subscribe',
                    icon: 'mail',
                    title: 'Подписаться'
                },
                {
                    modifier: 'yearsNews',
                    icon: 'square',
                    title: 'Все года'
                },
                {
                    modifier: 'categoriesNews',
                    icon: 'list',
                    title: 'Все категории'
                }
            ],
            popup: {
                title: 'Фильтры',
                button: 'Применить фильтры'
            }
        };
    },

    async fetch({ $config: { baseURL }, $axios, store, query }) {
        const currentPage = Number(query.page) || 1;

        store.commit('news/setActivePage', currentPage);

        const res = await $axios.get(`${baseURL}/cms/api/news/`, {
            params: {
                page: currentPage
            }
        });

        if (res) store.commit('news/setNews', res.data);
    },

    head() {
        return {
            title: 'Большой театр • Новости'
        };
    },

    computed: {
        ...mapState(['footerDarkTheme']),
        ...mapState('news', [
            'news',
            'activePage',
            'countPages',
            'activeCategory',
            'activeYear'
        ])
    },

    watch: {
        activeCategory() {
            // handle for load and sort with new category
        },

        activeYear() {
            // handle for load and sort with new year
        }
    },

    watchQuery: ['page'],

    mounted() {
        this.setTheme();
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
.News {
    $component: &;

    &-hero {
        width: 100%;
        background: $c-black--header;
        display: flex;
        justify-content: center;
        border-bottom: 1px solid $c-gray--header;

        &Title {
            @include heading-2;

            color: $c-white;
            padding: scaling(160) 0;

            @include desktop {
                padding: scaling(135) 0;
            }

            @include desktop--small {
                padding: scaling(121) 0;
            }

            @include laptop {
                padding: scaling(124) 0;
            }

            @include tablet {
                padding: scaling(102) 0;
            }

            @include mobile {
                padding: scaling(93) 0;
            }
        }
    }

    &-filter {
        width: 100%;
    }
}
</style>
