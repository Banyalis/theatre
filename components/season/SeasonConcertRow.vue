<template>
    <div class="SeasonConcertRow">
        <div class="SeasonConcertRow-scene">
            <CommonSceneType :title="row.scene" :image="row.imgURI" />
        </div>
        <div class="SeasonConcertRow-years">
            <SeasonYearItems
                v-for="(year, index) in row.years"
                :key="index"
                :year="year"
            />
        </div>
    </div>
</template>

<script>
import CommonSceneType from '~/components/common/CommonSceneType';
import SeasonYearItems from '~/components/season/SeasonYearItems';

export default {
    name: 'SeasonConcertRow',
    components: {
        CommonSceneType,
        SeasonYearItems
    },
    props: {
        row: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss">
.SeasonConcertRow {
    &-scene {
        position: sticky;
        z-index: $z-one;
        top: scaling(200);
        z-index: 10;

        @include desktop {
            top: scaling(151);
        }

        @include desktop--small {
            top: scaling(127);
        }

        @include laptop {
            top: scaling(118);
        }

        @include tablet {
            top: scaling(118);
        }

        @include mobile {
            top: scaling(102);
        }
    }
}
</style>
