<template>
    <div class="People" :class="{ withSidebar: content.sidebar }">
        <CommonHero :type="type" :title="title" :tabs="tabs" />
        <CommonNavPage v-if="nav.items" :nav="nav.items" theme="isRed" />
        <!-- <div class="People-filter">
            <CommonSearchInput :placeholder="`Найти артиста`" />
            <CommonFilterButton
                v-for="(item, index) in filter"
                :key="index"
                :item="item"
            />
        </div> -->
        <PeopleSidebar v-if="content.sidebar" :sidebar="content.sidebar" />
        <div class="People-inner">
            <PeopleSections :content="content" />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { HEADER_THEMES } from '@/utils/constants';
import CommonHero from '~/components/common/CommonHero';
import CommonNavPage from '~/components/common/CommonNavPage';
// import CommonSearchInput from '~/components/common/CommonSearchInput';
// import CommonFilterButton from '~/components/common/CommonFilterButton';
import PeopleSidebar from '~/components/people/PeopleSidebar';
import PeopleSections from '~/components/people/PeopleSections';

export default {
    components: {
        CommonHero,
        CommonNavPage,
        // CommonSearchInput,
        // CommonFilterButton,
        PeopleSidebar,
        PeopleSections
    },

    beforeRouteEnter(to, from, next) {
        if (to !== from) {
            try {
                window.scrollTo(0, 0);
            } catch {}
        }

        next();
    },

    middleware: 'people',
    scrollToTop: false,

    data() {
        return {
            meta: {
                title: ''
            },
            type: 'people',
            title: 'Люди театра',
            tabs: [
                {
                    link: '/people/operatic',
                    title: 'Оперная труппа'
                },
                {
                    link: '/people/ballet',
                    title: 'Балетная труппа'
                },
                {
                    link: '/people/orchestra',
                    title: 'Оркестр'
                },
                {
                    link: '/people/leadership',
                    title: 'Руководство'
                }
            ],
            filter: [
                {
                    modifier: 'vote',
                    url: '/',
                    title: 'Тип голоса'
                }
            ]
        };
    },

    async fetch({ $config: { baseURL }, $axios, params, store }) {
        const resNav = await $axios.get(
            `${baseURL}/cms/api/pagemembers/persons/people-${params.slugCategory}-nav`
        );

        const resContent = await $axios.get(
            `${baseURL}/cms/api/pagemembers/persons/people-${
                params.slugCategory
            }${params.slugItem ? '-' + params.slugItem : ''}`
        );

        if (resNav) store.commit('people/setNav', resNav.data);
        if (resContent) store.commit('people/setContent', resContent.data);
    },

    head() {
        return {
            title: 'Большой театр • ' + this.meta.title
        };
    },

    computed: {
        ...mapState(['footerDarkTheme']),
        ...mapState('people', ['nav', 'content'])
    },

    mounted() {
        this.setTheme();

        if (this.$route.params.slugCategory === 'operatic') {
            this.meta.title = 'Оперная труппа';
        } else if (this.$route.params.slugCategory === 'ballet') {
            this.meta.title = 'Балетная труппа';
        } else if (this.$route.params.slugCategory === 'orchestra') {
            this.meta.title = 'Оркестр';
        } else if (this.$route.params.slugCategory === 'leadership') {
            this.meta.title = 'Руководство';
        }
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
.People {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    &-filter {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        background-color: $c-black--header;

        .CommonSearchInput,
        .CommonFilterButton {
            width: 50%;

            @include tablet {
                width: 100%;
            }

            @include mobile {
                width: 100%;
            }
        }
    }

    &-inner {
        width: 100%;

        #{$component}.withSidebar & {
            flex: 1;

            @include desktop--large {
                border-left: 1px solid $c-black;
            }

            @include desktop {
                border-left: 1px solid $c-black;
            }
        }
    }

    .CommonNavPage {
        border: none;
    }
}
</style>
