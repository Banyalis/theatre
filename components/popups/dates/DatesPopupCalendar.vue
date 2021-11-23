<template>
    <div class="DatesPopupCalendar">
        <div class="DatesPopupCalendar-button" @click="changeContent('all')">
            <div
                class="DatesPopupCalendar-buttonTitle"
                v-text="'Показать за все время'"
            ></div>
            <div
                class="DatesPopupCalendar-buttonCaption"
                v-text="'Все исполнители'"
            ></div>
        </div>
        <template v-for="(year, yearIndex) in years">
            <div
                :key="yearIndex"
                class="DatesPopupCalendar-year"
                v-text="year.year"
            ></div>
            <div
                v-for="(month, monthIndex) in year.months"
                :key="monthIndex"
                class="DatesPopupCalendar-month"
            >
                <div class="DatesPopupCalendar-monthHeader">
                    <div
                        class="DatesPopupCalendar-monthTitle"
                        v-text="monthIndex"
                    ></div>
                    <div
                        class="DatesPopupCalendar-monthYear"
                        v-text="year.year"
                    ></div>
                </div>
                <div class="DatesPopupCalendar-monthDays">
                    <div
                        v-for="(day, dayIndex) in month.days"
                        :key="dayIndex"
                        class="DatesPopupCalendar-monthDaysItem"
                        @click="changeContent(day.hash)"
                    >
                        <div
                            class="DatesPopupCalendar-monthDaysItemNumber"
                            v-text="day.dayMonth"
                        ></div>
                        <div
                            class="
                                DatesPopupCalendar-monthDaysItemNumber
                                DatesPopupCalendar-monthDaysItemNumber--mobile
                            "
                            v-text="day.dayMonthMobile"
                        ></div>
                        <div class="DatesPopupCalendar-monthDaysItemInner">
                            <div
                                class="DatesPopupCalendar-monthDaysItemWeek"
                                v-text="day.dayWeek"
                            ></div>
                            <div
                                class="DatesPopupCalendar-monthDaysItemTime"
                                v-text="day.dayTime"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { DateTime } from 'luxon';

export default {
    name: 'DatesPopupCalendar',

    props: {
        calendar: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            years: []
        };
    },

    computed: {
        ...mapState(['currentLocaleCode'])
    },

    mounted() {
        const dates = {};
        let tempYear;
        let tempMonth;
        let day;

        for (const item of this.calendar) {
            const datetime = DateTime.fromISO(item.datetime, {
                locale: this.currentLocaleCode
            });

            const year = datetime.toFormat('y');
            const month = datetime.toFormat('LLLL');
            const dayMonth = datetime.toFormat('d');
            const dayMonthMobile = datetime.toFormat('dd MMMM');
            const dayWeek = datetime.toFormat('cccc');
            const dayTime = datetime.toFormat('T');
            const hash = item.hash;

            day = {
                dayMonth,
                dayMonthMobile,
                dayWeek,
                dayTime,
                hash
            };

            if (tempYear !== year) {
                tempYear = year;

                dates[tempYear] = {};
            }

            if (tempMonth !== month) {
                tempMonth = month;

                dates[tempYear][tempMonth] = {
                    days: []
                };
            }

            dates[tempYear][tempMonth].days.push(day);
        }

        for (const [year, months] of Object.entries(dates)) {
            this.years.push({
                year,
                months
            });
        }
    },

    methods: {
        changeContent(hash) {
            this.$root.$emit('performance-calendar', hash);
            this.closePopup();
        },

        ...mapActions({
            closePopup: 'popup/close'
        })
    }
};
</script>

<style lang="scss" scoped>
.DatesPopupCalendar {
    $component: &;

    border-left: 1px solid $c-black;
    border-right: 1px solid $c-black;

    &-button {
        display: none;
        padding: scaling(20) scaling(16);
        border-bottom: 1px solid $c-black;
        line-height: $lh-130;
        font-family: $family-graphic;

        @include mobile {
            display: block;
        }

        &Title {
            margin-bottom: scaling(4);
            font-size: scaling(20);
            font-feature-settings: 'cpsp' on;
        }

        &Caption {
            color: $c-gray;
            font-size: scaling(14);
        }
    }

    &-year {
        padding: scaling(32) scaling(16) scaling(16);
        border-bottom: 1px solid $c-black;
        background-color: $c-gray-95;
        font-size: scaling(14);
        line-height: $lh-140;
        letter-spacing: 0.05em;
        text-align: center;
        font-weight: $fw-bold;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            padding: scaling(64) scaling(32) scaling(32);
            font-size: scaling(20);
            line-height: $lh-120;
        }

        @include desktop {
            padding: scaling(48) scaling(24) scaling(24);
            font-size: scaling(18);
            line-height: $lh-120;
        }

        @include desktop--small {
            padding: scaling(40) scaling(20) scaling(20);
        }

        @include mobile {
            display: none;
        }
    }

    &-month {
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid $c-black;

        &Header {
            width: (480 * 100% / 1440);
            padding: scaling(20) scaling(16);
            border-right: 1px solid $c-black;

            @include desktop--large {
                padding: scaling(36) scaling(32);
            }

            @include desktop {
                width: (360 * 100% / 1080);
                padding: scaling(28) scaling(24);
            }

            @include desktop--small {
                width: (300 * 100% / 900);
                padding: scaling(24) scaling(20);
            }

            @include laptop {
                width: (240 * 100% / 720);
            }

            @include tablet {
                width: (256 * 100% / 768);
            }

            @include mobile {
                width: 100%;
                padding: scaling(36) scaling(16) scaling(16);
                border-right: none;
                border-bottom: 1px solid $c-black;
                background-color: $c-gray-95;
                text-align: center;
            }
        }

        &Title {
            color: $c-red;
            font-size: scaling(20);
            line-height: $lh-130;
            font-family: $family-graphic;
            font-feature-settings: 'cpsp' on;

            @include desktop--large {
                font-size: scaling(36);
                letter-spacing: -0.01em;
            }

            @include desktop {
                font-size: scaling(28);
                letter-spacing: -0.01em;
            }

            @include desktop--small {
                font-size: scaling(24);
            }

            @include tablet {
                color: $c-black;
            }

            @include mobile {
                margin-bottom: scaling(4);
                color: $c-black--header;
                font-size: scaling(14);
                line-height: $lh-120;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                font-weight: $fw-bold;
                font-family: $family-apoc;
            }
        }

        &Year {
            display: none;
            color: $c-gray;
            font-size: scaling(12);
            line-height: $lh-130;
            font-family: $family-graphic;

            @include mobile {
                display: block;
            }
        }

        &Days {
            display: flex;
            flex-wrap: wrap;
            width: (960 * 100% / 1440);
            margin-bottom: -1px;

            @include desktop {
                width: (720 * 100% / 1080);
            }

            @include desktop--small {
                width: (600 * 100% / 900);
            }

            @include laptop {
                width: (480 * 100% / 720);
            }

            @include tablet {
                width: (512 * 100% / 768);
            }

            @include mobile {
                width: 100%;
            }

            &Item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: calc(100% / 4);
                border-bottom: 1px solid $c-black;
                cursor: pointer;
                transition: background-color $d-hover ease-in-out;

                @include desktop--large {
                    padding: scaling(36) scaling(40);
                }

                @include desktop {
                    padding: scaling(28) scaling(24);
                }

                @include desktop--small {
                    padding: scaling(24) scaling(9);
                }

                @include laptop {
                    padding: scaling(20) scaling(10);
                }

                @include tablet {
                    padding: scaling(20) scaling(4);
                }

                @include mobile {
                    flex-direction: row;
                    justify-content: space-between;
                    width: 100%;
                    padding: scaling(24) scaling(16);
                }

                &:not(:nth-child(4n + 4)) {
                    border-right: 1px solid $c-black;

                    @include mobile {
                        border-right: none;
                    }
                }

                @include hover {
                    &:hover {
                        background-color: $c-red;

                        #{$component} {
                            &-monthDaysItemNumber,
                            &-monthDaysItemWeek,
                            &-monthDaysItemTime {
                                color: $c-white;
                            }
                        }
                    }
                }

                &Number {
                    font-size: scaling(45);
                    line-height: $lh-110;
                    letter-spacing: 0.02em;
                    font-feature-settings: 'ss02' on;
                    transition: color $d-hover ease-in-out;

                    @include desktop--large {
                        font-size: scaling(80);
                    }

                    @include desktop {
                        font-size: scaling(64);
                    }

                    @include desktop--small {
                        font-size: scaling(55);
                    }

                    @include mobile {
                        display: none;
                        color: #1c1d1f;
                        font-size: scaling(20);
                        line-height: $lh-130;
                        letter-spacing: 0;
                        font-family: $family-graphic;
                    }

                    &--mobile {
                        display: none;

                        @include mobile {
                            display: block;
                        }
                    }
                }

                &Inner {
                    margin-top: scaling(8);
                    text-align: center;

                    @include desktop--large {
                        margin-top: scaling(12);
                    }

                    @include desktop--small {
                        margin-top: scaling(4);
                    }

                    @include laptop {
                        margin-top: scaling(4);
                    }

                    @include mobile {
                        display: flex;
                        margin-top: 0;
                    }
                }

                &Week {
                    margin-bottom: scaling(76);

                    @include desktop--large {
                        margin-bottom: scaling(136);
                    }

                    @include desktop {
                        margin-bottom: scaling(90);
                    }

                    @include laptop {
                        margin-bottom: scaling(52);
                    }

                    @include mobile {
                        display: flex;
                        margin-right: scaling(2);
                        margin-bottom: 0;
                    }

                    &:after {
                        content: ',';
                        display: none;

                        @include mobile {
                            display: block;
                        }
                    }
                }

                &Week,
                &Time {
                    font-size: scaling(14);
                    line-height: $lh-130;
                    font-family: $family-graphic;
                    transition: color $d-hover ease-in-out;

                    @include desktop--large {
                        font-size: scaling(20);
                    }

                    @include desktop {
                        font-size: scaling(18);
                    }

                    @include laptop {
                        font-size: scaling(12);
                        line-height: $lh-140;
                    }

                    @include mobile {
                        color: $c-gray;
                        font-size: scaling(12);
                        line-height: $lh-140;
                    }
                }
            }
        }
    }
}
</style>
