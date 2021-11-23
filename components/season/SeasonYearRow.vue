<template>
    <div class="SeasonYearRow">
        <div class="SeasonYearRow-date b-paddings" v-text="item.year"></div>
        <div class="SeasonYearRow-cards">
            <SeasonTextCard
                v-for="(card, index) in item.cards"
                ref="card"
                :key="index"
                v-model="heightsHead[`card-${index}`]"
                :date="card.date"
                :restriction="card.restriction"
                :event="card.event"
                :caption="card.caption"
                :title="card.title"
                :description="card.description"
                :is-big="card.isBig"
                :url="card.url"
                :head-height="maxHeightRow[`card-${index}`]"
            />
        </div>
    </div>
</template>

<script>
import { BREAKPOINTS } from '@/utils/constants';
import SeasonTextCard from '~/components/season/SeasonTextCard';

export default {
    name: 'SeasonYearRow',
    components: {
        SeasonTextCard
    },

    props: {
        item: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            heightsHead: {},
            maxHeightRow: {},
            cardsPerRow: {
                desktopLarge: 3,
                desktop: 3,
                desktopSmall: 3,
                laptop: 3,
                tablet: 2,
                mobile: 1
            },
            currentPerRow: 0
        };
    },

    watch: {
        heightsHead: {
            handler(cardsHeight) {
                clearTimeout(this.idSetHeightsRow);
                const heights = Object.entries(cardsHeight).map(
                    ([key, value]) => value
                );

                this.idSetHeightsRow = setTimeout(
                    () => this.setHeightsRow(heights),
                    100
                );
            },
            deep: true
        }
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        setHeightsRow(heights) {
            let maxHeightRow = heights[0];
            const newMaxHeights = {};
            let firstIndex = 0;

            this.$refs.card.forEach((card, index) => {
                const currentHeight = heights[index];

                maxHeightRow = Math.max(currentHeight, maxHeightRow);
                if (
                    (index + 1) % this.cardsPerRow[this.currentPerRow] === 0 ||
                    index + 1 === this.$refs.card.length
                ) {
                    for (let i = firstIndex; i <= index; i++) {
                        newMaxHeights[`card-${i}`] = maxHeightRow + 'px';
                    }

                    maxHeightRow = currentHeight;
                    firstIndex = index + 1;
                }
            });

            this.maxHeightRow = { ...newMaxHeights };
        },

        onResize() {
            this.currentPerRow = this.cardsPerRow.desktopLarge;
            this.currentPerRow = Object.entries(
                Object.entries(BREAKPOINTS).filter(([key, value]) =>
                    window.matchMedia(value)
                )[0]
            ).map(([key]) => key);
        }
    }
};
</script>

<style lang="scss">
.SeasonYearRow {
    width: 100%;

    &-date {
        @include text--button;

        padding-top: scaling(64);
        padding-bottom: scaling(36);
        box-shadow: 0 1px 0 $c-black, 0 -1px 0 $c-black;
        background-color: $c-gray-95;
        color: $c-black;
        text-align: center;
        position: sticky;
        z-index: $z-one;
        top: scaling(200);

        @include desktop {
            padding-top: scaling(48);
            padding-bottom: scaling(28);
            font-size: scaling(20);
            top: scaling(151);
        }

        @include desktop--small {
            padding-top: scaling(40);
            padding-bottom: scaling(20);
            top: scaling(127);
        }

        @include laptop {
            padding-top: scaling(32);
            padding-bottom: scaling(16);
            top: scaling(118);
        }

        @include tablet {
            padding-top: scaling(32);
            padding-bottom: scaling(16);
            top: scaling(118);
        }

        @include mobile {
            padding-top: scaling(32);
            padding-bottom: scaling(16);
            text-align: left;
            top: scaling(102);
        }
    }

    &-cards {
        display: flex;
        flex-wrap: wrap;
        box-shadow: 0 1px 0 $c-black;
    }
}
</style>
