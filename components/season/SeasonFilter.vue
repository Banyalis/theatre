<template>
    <div class="SeasonFilter">
        <CommonSearchInput />
        <CommonFilterButton
            v-for="(item, index) in filter"
            :key="index"
            :item="item"
        />
    </div>
</template>

<script>
import CommonSearchInput from '~/components/common/CommonSearchInput';
import CommonFilterButton from '~/components/common/CommonFilterButton';

export default {
    name: 'SeasonFilter',

    components: {
        CommonSearchInput,
        CommonFilterButton
    },

    props: {
        filter: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.SeasonFilter {
    display: flex;
    width: 100%;
    background-color: $c-black;

    @include tablet {
        flex-direction: column;
    }

    @include mobile {
        flex-direction: column;
    }

    .CommonSearchInput {
        flex: 1;
        border-right: 1px solid $c-gray--header;

        @include tablet {
            border-right: none;
        }

        @include mobile {
            border-right: none;
        }
    }

    .CommonFilterButton {
        flex: 1;
    }
}
</style>
