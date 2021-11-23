<template>
    <div class="CalendarContent">
        <div
            ref="header"
            class="CalendarContent-header"
            :style="{ top: popupHeaderHeight + 'px' }"
        >
            <div
                v-for="(weekday, number) in WEEKDAY_NAMES"
                :key="number"
                class="CalendarContent-weekday"
            >
                {{ weekday.short }}
            </div>
        </div>
        <div class="CalendarContent-content">
            <!-- Iterate through calendar object. Concatenate all dates in one list,
            for each month add header(visible only on mobile) and preceding & succeeding blocks if needed
            to correctly format calendar block -->
            <template v-for="(months, year, yearInd) in calendar">
                <template v-for="(month, monthNumber, monthInd) in months">
                    <div
                        :key="`${monthNumber}${monthInd}` + 'month'"
                        class="CalendarContent-subheader"
                        :style="{
                            top: `${popupHeaderHeight + headerHeight}px`
                        }"
                    >
                        <span class="CalendarContent-month">{{
                            month.name
                        }}</span>
                        <span class="CalendarContent-year">{{ year }}</span>
                    </div>
                    <!-- Preceding formatting block -->
                    <div
                        v-if="month.weeks[0].firstWeekday > WEEKDAY_FIRST"
                        :key="`${monthNumber}${monthInd}` + 'before'"
                        class="
                            CalendarContent-day
                            CalendarContent-day--empty
                            CalendarContent-day--before
                        "
                        :data-columns="
                            month.weeks[0].firstWeekday - WEEKDAY_FIRST
                        "
                        :data-year-ind="yearInd"
                        :data-month-ind="monthInd"
                    />
                    <template v-for="(week, weekInd) in month.weeks">
                        <div
                            v-for="(date, count) in week.days"
                            :key="`${monthNumber}${weekInd}${count}${monthInd}`"
                            class="CalendarContent-day"
                            :class="[
                                {
                                    isActive:
                                        year === activeYear &&
                                        monthNumber === activeMonth
                                },
                                {
                                    isRangeBorder:
                                        +date.value === +datesStartFilter ||
                                        +date.value === +datesEndFilter
                                },
                                {
                                    isRangeInner:
                                        +date.value > +datesStartFilter &&
                                        +date.value < +datesEndFilter
                                }
                            ]"
                            :data-year="year"
                            :data-month="monthNumber"
                            :data-weekday="count"
                            @click="onDayClick(date.value)"
                        >
                            <div class="CalendarContent-dayInner">
                                {{ date.value.day }}
                            </div>
                        </div>
                    </template>
                    <!-- Succeeding formatting block -->
                    <div
                        v-if="
                            month.weeks[month.weeks.length - 1].lastWeekday <
                            WEEKDAY_LAST
                        "
                        :key="`${monthNumber}${monthInd}` + 'after'"
                        class="
                            CalendarContent-day
                            CalendarContent-day--empty
                            CalendarContent-day--after
                        "
                        :data-columns="
                            WEEKDAY_LAST -
                            month.weeks[month.weeks.length - 1].lastWeekday
                        "
                    />
                </template>
            </template>
        </div>
        <button
            v-if="datesStartFilter"
            class="CalendarContent-filter"
            @click="closeFilter"
        >
            Показать спектакли в эти даты
        </button>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import {
    WEEKDAY_NAMES,
    WEEK_DAYS_NUMBER,
    WEEKDAY_FIRST,
    WEEKDAY_LAST,
    CLASSES
} from '@/utils/constants';

export default {
    name: 'CalendarContent',
    props: {
        calendar: {
            type: Object,
            default: () => ({})
        },
        activeYear: {
            type: String,
            default: null
        },
        activeMonth: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            monthStartDayBlocks: [],
            isRangeStartClick: true,
            headerHeight: 0,
            WEEKDAY_NAMES,
            WEEK_DAYS_NUMBER,
            WEEKDAY_FIRST,
            WEEKDAY_LAST
        };
    },
    computed: {
        ...mapState('popup', {
            popupHeaderHeight: 'headerHeight'
        }),
        ...mapState('timetable', ['datesStartFilter', 'datesEndFilter'])
    },
    watch: {
        // Save DOM elements to check active month when scrolling
        calendar(val) {
            // Use $nextTick to wait DOM elements to be created
            this.$nextTick(() => {
                for (const [year, month] of Object.entries(val)) {
                    for (const monthNumber of Object.keys(month)) {
                        const block = document.querySelector(
                            `.CalendarContent-day[data-year="${year}"][data-month="${monthNumber}"]`
                        );

                        this.monthStartDayBlocks.push({
                            block,
                            year,
                            month: monthNumber
                        });
                    }
                }
            });
        }
    },
    mounted() {
        this.basePopup = document.querySelector(`.${CLASSES.basePopup}`);
        this.basePopup.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },
    beforeDestroy() {
        this.basePopup.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onScroll() {
            const middlePageY = window.innerHeight / 2;

            for (let i = this.monthStartDayBlocks.length - 1; i >= 0; i--) {
                const item = this.monthStartDayBlocks[i];
                const y = item.block.getBoundingClientRect().y;

                // Find first month from the end which cross middle line of the viewport
                if (y < middlePageY) {
                    this.$emit('change-month', item.year, item.month);

                    return;
                }
            }
        },

        onResize() {
            this.headerHeight = this.$refs.header.offsetHeight;
        },

        onDayClick(date) {
            // If selecting Range Start, clear Range End
            if (this.isRangeStartClick) {
                this.setDatesStartFilter(date);
                this.setDatesEndFilter(null);
            } else if (date < this.datesStartFilter) {
                this.setDatesEndFilter(this.datesStartFilter);
                this.setDatesStartFilter(date);
            } else this.setDatesEndFilter(date);

            // Change click type on each click: first click is selecting Range Start, second click - Range End, etc.
            this.isRangeStartClick = !this.isRangeStartClick;
        },

        updateScroll(year, month) {
            // Find first date block of current month
            const block = document.querySelector(
                `.CalendarContent-day[data-year="${year}"][data-month="${month}"]`
            );
            const offsetTop =
                block.getBoundingClientRect().top + this.basePopup.scrollTop;

            this.$nextTick(() => {
                const scrollTo = Math.round(
                    offsetTop - this.popupHeaderHeight - this.headerHeight + 1
                );

                this.basePopup.scrollTo(0, scrollTo);
            });

            this.onScroll();
        },

        async closeFilter() {
            await this.getTimetableAction(this.$route.params.slug);

            this.closePopup();
        },

        ...mapMutations({
            setDatesStartFilter: 'timetable/setDatesStartFilter',
            setDatesEndFilter: 'timetable/setDatesEndFilter'
        }),

        ...mapActions({
            getTimetableAction: 'timetable/getTimetableAction',
            closePopup: 'popup/close'
        })
    }
};
</script>

<style scoped lang="scss">
.CalendarContent {
    $component: &;

    position: relative;

    &-header {
        position: sticky;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        justify-items: center;
        height: scaling(120);
        padding: scaling(62) 0 scaling(32);
        color: $c-gray;
        background: $c-white;
        border-right: 1px solid $c-gray-80;
        border-bottom: 1px solid $c-gray-80;
        z-index: 2;

        @include desktop {
            height: scaling(94);
            padding: scaling(48) 0 scaling(24);
        }

        @include desktop--small {
            height: scaling(80);
            padding: scaling(40) 0 scaling(20);
        }

        @include laptop {
            height: scaling(68);
            padding: scaling(32) 0 scaling(16);
        }

        @include tablet {
            height: scaling(66);
            padding: scaling(32) 0 scaling(16);
            border-bottom: none;
        }

        @include mobile {
            height: scaling(52);
            padding: scaling(24) 0 scaling(12);
            border-right: none;
            border-bottom: none;
        }
    }

    &-weekday {
        @include caption-2;
    }

    &-content {
        position: relative;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        z-index: 1;
    }

    &-subheader {
        position: sticky;
        display: none;
        height: scaling(41);
        grid-column: 1 / 8;
        background: $c-gray-95;
        padding: 0 scaling(16);
        align-items: center;
        justify-content: space-between;
        z-index: 3;

        @include tablet {
            display: flex;
            margin-top: -1px;
            border-top: 1px solid $c-gray-80;
            border-bottom: 1px solid $c-gray-80;
        }

        @include mobile {
            display: flex;
            margin-top: -1px;
            border-top: 1px solid $c-gray-80;
            border-bottom: 1px solid $c-gray-80;
        }
    }

    &-month {
        font-family: $family-apoc;
        font-size: scaling(14);
        line-height: scaling(20);
        font-weight: $fw-bold;
        color: $c-black--header;
        text-transform: uppercase;
    }

    &-year {
        font-family: $family-graphic;
        font-size: scaling(12);
        line-height: scaling(14);
        color: $c-gray;
    }

    &-day {
        position: relative;
        padding-top: 100%;
        color: $c-gray-80;
        transition: color, background;
        transition-duration: $d-hover;
        // Add negative margin to fix borders width
        margin: -1px 0 0 -1px;

        &:not(#{$component}-day--empty) {
            //border-left: 1px solid $c-gray-80;
            cursor: pointer;

            @include hover {
                &:hover {
                    background-color: $c-red;
                    color: $c-white;

                    #{$component}-monthInner {
                        border-bottom: none;
                    }
                }
            }
        }

        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border: 1px solid $c-gray-80;
            box-sizing: border-box;
        }

        &[data-weekday='1'] {
            border-left: none;
        }

        &--empty {
            display: none;
            padding-top: 0;

            &#{$component}-day--before {
                &[data-year-ind='0'][data-month-ind='0'] {
                    display: block;
                }

                &[data-columns='2'] {
                    grid-column: 1 / 3;
                }

                &[data-columns='3'] {
                    grid-column: 1 / 4;
                }

                &[data-columns='4'] {
                    grid-column: 1 / 5;
                }

                &[data-columns='5'] {
                    grid-column: 1 / 6;
                }

                &[data-columns='6'] {
                    grid-column: 1 / 7;
                }
            }

            &#{$component}-day--after {
                // border-left: 1px solid $c-gray-80;

                &:last-child {
                    display: block;
                }

                &[data-columns='2'] {
                    grid-column: 6 / 8;
                }

                &[data-columns='3'] {
                    grid-column: 5 / 8;
                }

                &[data-columns='4'] {
                    grid-column: 4 / 8;
                }

                &[data-columns='5'] {
                    grid-column: 3 / 8;
                }

                &[data-columns='6'] {
                    grid-column: 2 / 8;
                }
            }

            @include tablet {
                display: block;
            }

            @include mobile {
                display: block;
            }
        }

        &.isActive {
            color: $c-black;
        }

        &.isRangeBorder,
        &.isRangeInner {
            z-index: 2;

            &:before {
                border-color: $c-black;
            }
        }

        &.isRangeBorder {
            color: $c-white;
            background-color: $c-red;
        }

        &.isRangeInner {
            color: $c-black;
            background-color: $c-pink--dark;
        }

        &Inner {
            @include heading-1;

            position: absolute;
            display: flex;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;

            @include desktop--small {
                font-size: scaling(44);
            }

            @include laptop {
                font-size: scaling(36);
            }

            @include mobile {
                font-size: scaling(14);
            }
        }
    }

    &-filter {
        position: sticky;
        bottom: 0;
        width: 100%;
        height: scaling(96);
        font-family: $family-apoc;
        font-size: scaling(14);
        line-height: $lh-140;
        font-weight: $fw-bold;
        letter-spacing: 0.05em;
        color: $c-white;
        background: $c-black;
        text-transform: uppercase;
        border: none;
        outline: none;
        cursor: pointer;
        transition: background-color, color;
        transition-duration: $d-hover;
        z-index: 1;

        @include hover {
            &:hover {
                background-color: $c-red;
                color: $c-white;
            }
        }

        @include desktop--large {
            font-size: scaling(20);
            line-height: $lh-120;
        }

        @include desktop {
            height: scaling(72);
            font-size: scaling(20);
            line-height: $lh-120;
        }

        @include desktop--small {
            height: scaling(60);
        }

        @include laptop {
            height: scaling(64);
        }

        @include tablet {
            height: scaling(64);
        }

        @include mobile {
            height: scaling(48);
            line-height: $lh-120;
        }
    }
}
</style>
