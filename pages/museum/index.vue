<template>
    <div class="Museum">
        <MuseumHero :content="content.data" :aside="randomCard" />
        <div class="Museum-content">
            <MuseumBlock
                v-for="(block, index) in content.data.blocks"
                :key="index"
                :block="block"
            />
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { HEADER_THEMES } from '@/utils/constants';
import MuseumHero from '@/components/museum/MuseumHero';
import MuseumBlock from '@/components/museum/MuseumBlock';

export default {
    components: {
        MuseumBlock,
        MuseumHero
    },

    async fetch({ $config: { baseURL }, $axios, store }) {
        const res = await $axios.get(`${baseURL}/api/museum/get`);

        if (res) store.commit('museum/setContent', res.data);
    },

    head() {
        return {
            title: 'Большой театр • Музей'
        };
    },

    computed: {
        randomCard() {
            return this.content.data.headerCards[
                this.$store.state.museum.photoNumber
            ];
        },

        ...mapState('museum', ['content'])
    },

    mounted() {
        this.setTheme();
        this.$store.commit('museum/setPhotoNumber', this.getRandomNumber());
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

        getRandomNumber() {
            return (this.randomNumber = Math.floor(
                Math.random() * this.content.data.headerCards.length
            ));
        },

        ...mapMutations({
            changeTheme: 'changeTheme'
        })
    }
};
</script>

<style scoped></style>
