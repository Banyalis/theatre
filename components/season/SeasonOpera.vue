<template>
    <div class="SeasonOpera">
        <!-- <SeasonFilter :filter="filter" /> -->
        <SeasonSceneRow
            v-for="(row, index) in content"
            :key="index"
            :row="row"
        />
    </div>
</template>

<script>
import SeasonSceneRow from '@/components/season/SeasonSceneRow';
// import SeasonFilter from '@/components/season/SeasonFilter';

export default {
    name: 'SeasonsOpera',

    components: {
        SeasonSceneRow
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
            filter: [
                {
                    modifier: 'scene',
                    icon: 'chair',
                    title: 'Все сцены',
                    isFilter: true
                }
            ]
        };
    }
};
</script>

<style lang="scss">
.SeasonOpera {
    width: 100%;
}
</style>
