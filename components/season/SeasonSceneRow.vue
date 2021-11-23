<template>
    <div class="Season-row">
        <div class="Season-scene">
            <!-- TODO: Remove '||' for title after all pages will be integrated -->
            <CommonSceneType
                :title="title"
                :image="row.imgURI"
                :type="row.scene.type"
                is-centered="true"
            />
        </div>
        <div class="Season-cards">
            <SeasonImageCard
                v-for="(card, index) in row.cards"
                ref="card"
                :key="index"
                v-model="heightsHead[`card-${index}`]"
                :caption="card.caption"
                :info="card.info"
                :title="card.title"
                :slug="card.slug"
                :musician="card.musician"
                :begin-at="card.beginAt"
                :end-at="card.endAt"
                :restriction="card.restriction"
                :image="card.image"
                :scene="card.scene"
                :head-height="maxHeightRow[`card-${index}`]"
            />
        </div>
    </div>
</template>

<script>
import { BREAKPOINTS } from '@/utils/constants';
import CommonSceneType from '~/components/common/CommonSceneType';
import SeasonImageCard from '~/components/season/SeasonImageCard';

export default {
    name: 'SeasonSceneRow',
    components: { CommonSceneType, SeasonImageCard },
    props: {
        row: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            heightsHead: {},
            maxHeightRow: {},
            cardsPerRow: {
                desktopLarge: 4,
                desktop: 4,
                desktopSmall: 4,
                laptop: 3,
                tablet: 2,
                mobile: 1
            },
            currentPerRow: 0
        };
    },

    computed: {
        title() {
            return typeof this.row.scene === 'object'
                ? this.row.scene.name
                : this.row.scene;
        }
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

    deactivated() {
        window.removeEventListener('resize', this.onResize);

        this.$destroy();
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

<style lang="scss" scoped>
.Season {
    &-scene {
        position: sticky;
        z-index: 2;
        top: scaling(200);

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

    &-cards {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
    }

    &-card {
        width: (100% / 4);
    }
}
</style>
