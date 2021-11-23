<template>
    <div class="SeasonPages">
        <SeasonInnerPages
            v-if="getContent && getTypeContent"
            :type="getTypeContent"
            :content="getContent"
        />
    </div>
</template>

<script>
import { HEADER_THEMES } from '@/utils/constants';
import { mapMutations, mapState } from 'vuex';
import SeasonInnerPages from '@/components/season/SeasonInnerPages';

export default {
    name: 'SeasonPages',

    components: { SeasonInnerPages },

    async fetch({ $config: { baseURL }, $axios, params, store }) {
        if (store.state.seasonCategory[params.slugCategory]) {
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
            store.commit('seasonCategory/setContent', {
                content: res.data,
                category: params.slugCategory
            });
    },

    head() {
        return {
            title: 'Большой театр • ' + this.getContent.title
        };
    },

    computed: {
        getContent() {
            return this.content[this.$route.params.slugCategory][
                this.$route.params.slugCategory
            ]?.data;
        },

        getTypeContent() {
            return this.$route.params.slugCategory;
        },

        ...mapState('seasonCategory', ['content'])
    },

    // need for save keep-alive in layout
    deactivated() {
        this.$destroy();
    },

    updated() {
        this.setTheme();
    },

    mounted() {
        this.setTheme();
    },

    methods: {
        setTheme() {
            if (this.$route.params.slugCategory === 'tour') {
                this.changeTheme({
                    headerMod: HEADER_THEMES.gold,
                    isFooterDark: false
                });
            } else {
                this.changeTheme({
                    headerMod: HEADER_THEMES.default,
                    isFooterDark: false
                });
            }
        },

        ...mapMutations({
            changeTheme: 'changeTheme'
        })
    }
};
</script>

<style lang="scss" scoped></style>
