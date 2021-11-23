<template>
    <div class="SeasonPremiers">
        <SeasonSceneColumn
            v-for="(column, index) in content"
            :key="index"
            :column="column"
        />
    </div>
</template>

<script>
import SeasonSceneColumn from '~/components/season/SeasonSceneColumn';

export default {
    name: 'SeasonPremiers',

    components: {
        SeasonSceneColumn
    },

    props: {
        content: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss">
.SeasonPremiers {
    display: flex;
    width: 100%;

    @include tablet {
        flex-direction: column;
    }

    @include mobile {
        flex-direction: column;
    }
}
</style>
