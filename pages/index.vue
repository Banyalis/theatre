<template>
    <div class="Index">
        <Hero :item="blocks[0]" />
        <BlocksList :list="getBlocks" />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { HEADER_THEMES } from '../utils/constants';
import Hero from '~/components/index/Hero';
import BlocksList from '~/components/index/BlocksList';

export default {
    components: { BlocksList, Hero },

    async fetch({ $config: { baseURL }, $axios, store }) {
        const res = await $axios.get(`${baseURL}/cms/api/home/get`);
        const eventsRes = await $axios.get(
            `${baseURL}/cms/api/timetable/short/`
        );
        if (eventsRes) store.commit('home/setTimetable', eventsRes.data);
        if (res) store.commit('home/setContent', res.data);

        // $axios.get(`${baseURL}/cms/api/timetable/short/`).then((res) => {
        //     if (res && res.data) {
        //         store.commit('home/setTimetable', res.data);
        //     }
        // });
    },

    computed: {
        getBlocks() {
            return this.blocks.slice(1);
        },

        ...mapState(['footerDarkTheme']),
        ...mapState('home', ['blocks'])
    },

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
                headerMod: HEADER_THEMES.home,
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
.Index {
    $component: &;

    margin: 0 -1px -1px -1px;

    @include mobile {
        margin: 0 0 -1px;
    }
}
</style>
