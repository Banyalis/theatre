<template>
    <div class="PerformanceSchedule">
        <div class="PerformanceSchedule-header">
            <div class="PerformanceSchedule-headerDate" v-text="`Дата`"></div>
            <div class="PerformanceSchedule-headerInner">
                <div
                    class="PerformanceSchedule-headerTickets"
                    v-text="`Билеты`"
                ></div>
                <div ref="headerPrice" class="PerformanceSchedule-headerPrice">
                    <span v-text="`Цена`"></span>
                </div>
                <div
                    class="PerformanceSchedule-headerTime"
                    v-text="`Время`"
                ></div>
            </div>
        </div>
        <div class="PerformanceSchedule-list">
            <div
                v-for="(item, index) in schedule"
                :key="index"
                class="PerformanceSchedule-listItem"
            >
                <PerformanceScheduleItem
                    ref="item"
                    :item="item"
                    :performance-id="performanceId"
                />
            </div>
        </div>
    </div>
</template>

<script>
import PerformanceScheduleItem from '@/components/performance/PerformanceScheduleItem';

export default {
    name: 'PerformanceSchedule',

    components: {
        PerformanceScheduleItem
    },

    props: {
        schedule: {
            type: Array,
            required: true
        },
        performanceId: {
            type: Number,
            required: true
        }
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        setTimeout(() => {
            this.onResize();
        }, 150);
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            this.headerPriceWidth =
                this.$refs.headerPrice.querySelector('span').offsetWidth;
            this.itemPriceWidth = this.$refs.item[0].$refs.price.offsetWidth;

            this.setPadding();
        },

        setPadding() {
            let getPadding = this.itemPriceWidth - this.headerPriceWidth;

            getPadding = getPadding < 0 ? 0 : getPadding;

            this.$refs.headerPrice.style.paddingRight = `${getPadding}px`;
        }
    }
};
</script>

<style lang="scss" scoped>
@mixin text--small {
    font-size: scaling(14);
    line-height: $lh-130;
    font-family: $family-graphic;

    @include desktop--large {
        font-size: scaling(20);
    }

    @include desktop {
        font-size: scaling(18);
    }
}

.PerformanceSchedule {
    $component: &;

    &-header {
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 1px solid $c-gray--header;

        @include desktop--large {
            padding: scaling(19) scaling(32);
        }

        @include desktop {
            padding: scaling(13) scaling(24);
        }

        @include desktop--small {
            padding: scaling(11) scaling(20);
        }

        @include laptop {
            padding: scaling(15) scaling(32);
        }

        @include tablet {
            padding: scaling(15) scaling(16);
        }

        @include mobile {
            display: none;
        }

        &Inner {
            display: flex;
        }

        &Date,
        &Tickets,
        &Price span,
        &Time {
            @include text--small;

            color: $c-white;
        }

        &Tickets,
        &Price {
            flex-shrink: 0;

            @include desktop--large {
                width: scaling(576 / 2);
            }

            @include desktop {
                width: scaling(432 / 2);
            }

            @include desktop--small {
                width: scaling(340 / 2);
            }

            @include laptop {
                width: scaling(448 / 2);
            }

            @include tablet {
                width: scaling(288 / 2);
            }
        }

        &Price,
        &Time {
            text-align: right;
        }

        &Time {
            @include desktop--large {
                width: scaling(328);
            }

            @include desktop {
                width: scaling(271);
            }

            @include desktop--small {
                width: scaling(228);
            }

            @include laptop {
                width: scaling(232);
            }

            @include tablet {
                width: scaling(216);
            }
        }
    }

    &-listItem {
        &:not(:last-child) {
            border-bottom: 1px solid $c-gray--header;
        }
    }
}
</style>
