<template>
    <div class="SeasonConcert">
        <!-- <SeasonFilter :filter="filter" /> -->
        <SeasonConcertRow
            v-for="(row, index) in content"
            :key="index"
            :row="row"
        />
    </div>
</template>

<script>
import SeasonConcertRow from '~/components/season/SeasonConcertRow';
// import SeasonFilter from '~/components/season/SeasonFilter';

export default {
    name: 'SeasonOpera',

    components: {
        SeasonConcertRow
        // SeasonFilter
    },

    props: {
        content: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            filter: []
        };
    }
};
</script>

<style lang="scss">
.SeasonConcert {
    width: 100%;
}
</style>
