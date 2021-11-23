<template>
    <div class="SeasonGuest">
        <!-- <SeasonFilter :filter="filter" /> -->
        <SeasonYearRow
            v-for="(item, index) in content"
            :key="index"
            :item="item"
        />
    </div>
</template>

<script>
import SeasonYearRow from '@/components/season/SeasonYearRow';
// import SeasonFilter from '@/components/season/SeasonFilter';

export default {
    name: 'SeasonGuest',

    components: {
        SeasonYearRow
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
.SeasonGuest {
    width: 100%;
}
</style>
