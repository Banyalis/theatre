<template>
    <div class="SeasonYearItems">
        <div class="SeasonYearItems-date b-paddings" v-text="year.year"></div>
        <div class="SeasonYearItems-items">
            <SeasonHorizontalCard
                v-for="(item, index) in year.items"
                :key="index"
                :day="item.day"
                :time="item.time"
                :caption="item.caption"
                :title="item.title"
                :musician="item.musician"
                :restriction="item.restriction"
                :info="item.info"
                :url="item.url"
            />
        </div>
    </div>
</template>

<script>
import SeasonHorizontalCard from '~/components/season/SeasonHorizontalCard';
export default {
    name: 'YearLine',
    components: {
        SeasonHorizontalCard
    },
    props: {
        year: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss">
.SeasonYearItems {
    display: flex;
    box-shadow: 0 1px 0 $c-black;

    @include laptop {
        flex-direction: column;
    }

    @include tablet {
        flex-direction: column;
    }

    @include mobile {
        flex-direction: column;
    }

    &-date {
        @include text;

        padding-top: scaling(36);
        padding-bottom: scaling(36);
        border-right: 1px solid $c-black;
        width: (384 * 100% / 1980);
        color: $c-black;

        @include desktop {
            padding-top: scaling(24);
            padding-bottom: scaling(24);
            width: (240 * 100% / 1440);
        }

        @include desktop--small {
            padding-top: scaling(20);
            padding-bottom: scaling(20);
            width: (240 * 100% / 1200);
        }

        @include laptop {
            @include text--button;

            width: 100%;
            max-width: unset;
            border-right: 0;
            border-bottom: 1px solid $c-black;
            padding-top: scaling(32);
            padding-bottom: scaling(16);
            background-color: $c-gray-95;
            text-align: center;
        }

        @include tablet {
            @include text--button;

            width: 100%;
            max-width: unset;
            border-right: 0;
            border-bottom: 1px solid $c-black;
            padding-top: scaling(32);
            padding-bottom: scaling(16);
            background-color: $c-gray-95;
            text-align: center;
        }

        @include mobile {
            @include text--button;

            width: 100%;
            max-width: unset;
            border-right: 0;
            border-bottom: 1px solid $c-black;
            padding-top: scaling(32);
            padding-bottom: scaling(16);
            background-color: $c-gray-95;
            text-align: left;
        }
    }

    &-items {
        width: 100%;
    }
}
</style>
