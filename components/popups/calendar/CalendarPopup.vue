<template>
    <div class="CalendarPopup">
        <div ref="filter" class="CalendarPopup-filter">
            <CalendarFilter
                :calendar="calendar"
                :active-year="activeYear"
                :active-month="activeMonth"
                @change-month="
                    (year, month) => onMonthChange(year, month, true)
                "
            />
        </div>
        <div class="CalendarPopup-calendar">
            <CalendarContent
                ref="content"
                :calendar="calendar"
                :active-year="activeYear"
                :active-month="activeMonth"
                @change-month="onMonthChange"
            />
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { DateTime } from 'luxon';

import CalendarContent from './CalendarContent';
import CalendarFilter from './CalendarFilter';

export default {
    name: 'CalendarPopup',

    components: {
        CalendarFilter,
        CalendarContent
    },

    data() {
        return {
            dates: [],
            windowHeight: 0,
            activeYear: null,
            activeMonth: null
        };
    },

    computed: {
        datesRange() {
            return {
                startAt: DateTime.fromISO(this.calendarDates.start, {
                    locale: 'ru'
                }),
                endAt: DateTime.fromISO(this.calendarDates.end, {
                    locale: 'ru'
                })
            };
        },

        getYear() {
            return this.getDatesStartFilter()
                ? DateTime.fromISO(this.getDatesStartFilter())
                      .setLocale(this.currentLocaleCode)
                      .toFormat('y')
                : String(new Date().getFullYear());
        },

        getMonth() {
            return this.getDatesStartFilter()
                ? DateTime.fromISO(this.getDatesStartFilter())
                      .setLocale(this.currentLocaleCode)
                      .toFormat('L')
                : String(new Date().getMonth() + 1);
        },
        /*
                Generate calendar object. Structure is:
                {
                    [year]: {
                        [month]: {
                            name: <String>,
                            weeks: [
                                {
                                    firstWeekday: <Number>,
                                    lastWeekday: <Number>,
                                    days: {} // Key - is weekday, value - is date day
                                }
                            ]
                        }
                    }
                }
            */
        calendar() {
            const res = {};
            let countFromEndOfRange = this.dates.length;
            let year;
            let month;
            let week;
            let weekItem;

            for (const dateItem of this.dates) {
                const dateYear = dateItem.year;
                const dateMonth = dateItem.month;
                const dateWeek = dateItem.weekNumber;

                if (year !== dateYear) {
                    year = dateYear;
                    res[year] = {};
                }

                if (month !== dateMonth) {
                    month = dateMonth;
                    weekItem = {
                        days: {}
                    };
                    res[year][month] = {
                        name: dateItem.monthLong,
                        weeks: []
                    };
                    // If new month is started we should reinitialized week
                    res[year][month].weeks.push(weekItem);
                }

                if (week !== dateWeek) {
                    week = dateWeek;
                    // If new month was started at first day of the week, weekItem Object was already reinitialized
                    if (!weekItem || Object.keys(weekItem.days).length) {
                        weekItem = {
                            days: {}
                        };
                        res[year][month].weeks.push(weekItem);
                    }
                }

                if (!Object.keys(weekItem.days).length) {
                    weekItem.firstWeekday = dateItem.weekday;
                }
                // Update lastWeekday
                weekItem.lastWeekday = dateItem.weekday;
                weekItem.days[dateItem.weekday] = {
                    value: dateItem,
                    // Save item count from end of range to set z-index
                    countFromEndOfRange
                };

                countFromEndOfRange--;
            }

            return res;
        },

        ...mapState('timetable', ['calendarDates']),
        ...mapState('popup', ['headerHeight']),
        ...mapState(['currentLocaleCode'])
    },

    mounted() {
        this.getDates();

        this.activeYear = this.getYear;
        this.activeMonth = this.getMonth;

        window.addEventListener('resize', this.onResize);
        this.onResize();

        this.$nextTick(() => {
            this.$refs.filter.style.top = `${this.headerHeight}px`;
            this.$refs.filter.style.height =
                window.innerHeight - this.headerHeight + 'px';

            this.scrollToActiveMonth();
            this.onMonthChange(this.activeYear, this.activeMonth, true);
        });
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        getDates() {
            const dates = [];
            for (
                let date = this.datesRange.startAt;
                date <= this.datesRange.endAt;
                date = date.plus({ days: 1 })
            ) {
                dates.push(date);
            }

            this.dates = dates;
        },

        onMonthChange(year, month, updateScroll = false) {
            this.activeYear = year;
            this.activeMonth = month;

            if (updateScroll) this.$refs.content.updateScroll(year, month);
        },

        onResize() {
            this.windowHeight = window.innerHeight;
        },

        scrollToActiveMonth() {
            const activeMonth = this.$refs.filter.querySelector('.isActive');
            const yearTitleHeight = this.$refs.filter.querySelector(
                '.CalendarFilter-year'
            ).offsetHeight;
            const activeMonthOffset = activeMonth.offsetTop;
            const filterScrollHeight = this.$refs.filter.scrollHeight;
            const offsetScroll =
                activeMonthOffset > filterScrollHeight
                    ? filterScrollHeight
                    : activeMonthOffset - yearTitleHeight;

            this.$refs.filter.scrollTop = offsetScroll;
        },

        ...mapGetters({
            getDatesStartFilter: 'timetable/getDatesStartFilter'
        })
    }
};
</script>

<style lang="scss" scoped>
.CalendarPopup {
    $component: &;

    display: flex;
    width: 100%;
    min-height: 100%;
    background-color: $c-white;

    &-filter {
        @include m-scrollbarHidden;

        position: sticky;
        width: scaling(422);
        overflow-y: auto;
        border-right: 1px solid $c-gray-80;
        z-index: 10;

        @include desktop {
            width: scaling(355);
        }

        @include desktop--small {
            width: scaling(297);
        }

        @include laptop {
            width: scaling(239);
        }

        @include tablet {
            display: none;
        }

        @include mobile {
            display: none;
        }
    }

    &-calendar {
        flex: 1;
    }
}
</style>
