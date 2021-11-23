<template>
    <div class="PerformanceScheduleItem">
        <div class="PerformanceScheduleItem-date">
            <div class="PerformanceScheduleItem-dateNumber" v-text="date"></div>
            <div class="PerformanceScheduleItem-dateDay" v-text="day"></div>
        </div>
        <div class="PerformanceScheduleItem-header">
            <div
                class="PerformanceScheduleItem-tickets"
                :class="{ isHidden: !ticketsData.freeSeats }"
                v-text="ticketsData.freeSeats ? ticketsPluralization : `0`"
            ></div>
            <div
                class="PerformanceScheduleItem-price"
                :class="{
                    isHidden: !ticketsData.minPrice && !ticketsData.maxPrice
                }"
            >
                <span ref="price" v-text="price ? `${price} ₽` : `0`"></span>
            </div>
            <div class="PerformanceScheduleItem-time" v-text="time"></div>
        </div>
        <div class="PerformanceScheduleItem-footer">
            <div class="PerformanceScheduleItem-team">
                <div v-if="item.team" class="PerformanceScheduleItem-teamInner">
                    {{ item.team }}
                    <div class="PerformanceScheduleItem-teamIcon">
                        <CommonCharactersButton
                            :performance-id="performanceId"
                            :mod="'dark'"
                        />
                    </div>
                </div>
            </div>
            <div class="PerformanceScheduleItem-button">
                <RoundedButton
                    v-if="ticketsButton"
                    :link="ticketsButtonLink"
                    :title="ticketsButton.text"
                    :type="BUTTON_CLASSES[ticketsButton.type]"
                    :loading="programsLoading"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { DateTime } from 'luxon';

import { mapState } from 'vuex';
import {
    TICKETS_BUTTONS,
    BUTTON_CLASSES,
    BUTTON_TYPES
} from '@/utils/constants';
import CommonCharactersButton from '@/components/common/CommonCharactersButton';
import RoundedButton from '@/components/other/RoundedButton';

export default {
    name: 'PerformanceScheduleItem',

    components: {
        CommonCharactersButton,
        RoundedButton
    },

    props: {
        item: {
            type: Object,
            required: true
        },

        performanceId: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            BUTTON_CLASSES
        };
    },

    computed: {
        ticketsData() {
            return this.programs[this.item.hash] || {};
        },

        ticketsPluralization() {
            return this.$tc('Common.tickets', this.ticketsData.freeSeats);
        },

        ticketsButton() {
            if (this.item.button) {
                let buttonType = BUTTON_TYPES.white;
                if (this.item.button.type === 'isDisabled') {
                    buttonType = BUTTON_TYPES.disabled;
                } else if (this.item.button.type === 'isRed') {
                    buttonType = BUTTON_TYPES.link;
                }
                return {
                    type: buttonType,
                    text: this.item.button.title
                };
            }

            const localTime = new Date();
            const performanceTime = new Date(this.item.datetime);

            performanceTime.setHours(performanceTime.getHours() - 2);

            const getDifference = localTime <= performanceTime;

            if (!this.isAnnounced) {
                return this.ticketsData.freeSeats
                    ? TICKETS_BUTTONS.buy
                    : TICKETS_BUTTONS.sold;
            } else if (!getDifference) {
                return TICKETS_BUTTONS.sold;
            } else return TICKETS_BUTTONS.soon;
        },

        ticketsButtonLink() {
            if (this.item.button) {
                return {
                    url: this.item.button.link,
                    title: this.ticketsButton.text,
                    isExternal: true
                };
            }
            if (this.ticketsButton.type === BUTTON_TYPES.link) {
                return {
                    url: `https://ticket.bolshoi.ru/show/${this.ticketsData.showId}`,
                    title: this.ticketsButton.text,
                    isExternal: true
                };
            } else return null;
        },

        price() {
            if (this.ticketsData.minPrice === this.ticketsData.maxPrice) {
                return this.ticketsData.minPrice;
            } else {
                return (
                    this.ticketsData.minPrice + '–' + this.ticketsData.maxPrice
                );
            }
        },

        isAnnounced() {
            return !this.programs[this.item.hash];
        },

        localeDate() {
            if (this.item.datetime) {
                return DateTime.fromISO(this.item.datetime, {
                    locale: this.currentLocaleCode
                });
            } else {
                return null;
            }
        },

        date() {
            return this.localeDate?.toFormat('d MMMM');
        },

        day() {
            return this.localeDate?.toFormat('EEEE');
        },

        time() {
            return this.localeDate?.toLocaleString(DateTime.TIME_24_SIMPLE);
        },

        ...mapState('performances', ['programs', 'programsLoading']),
        ...mapState(['currentLocaleCode'])
    }
};
</script>

<style scoped lang="scss">
@mixin text--large {
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
}

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

.PerformanceScheduleItem {
    display: grid;
    grid-template-columns: 1fr auto;
    color: $c-white;

    @include desktop--large {
        padding: scaling(36) scaling(32);
    }

    @include desktop {
        padding: scaling(28) scaling(24);
    }

    @include desktop--small {
        padding: scaling(24) scaling(20);
    }

    @include laptop {
        padding: scaling(24) scaling(32);
    }

    @include tablet {
        padding: scaling(20) scaling(16);
    }

    @include mobile {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: scaling(36) scaling(16);
    }

    &-date {
        grid-row: 1 / span 2;

        &Number {
            @include text--large;

            margin-bottom: scaling(4);

            @include desktop--large {
                margin-bottom: scaling(16);
            }

            @include desktop {
                margin-bottom: scaling(12);
            }

            @include laptop {
                margin-bottom: scaling(8);
            }
        }

        &Day {
            @include text--small;

            text-transform: capitalize;

            @include tablet {
                color: $c-gray;
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

    &-header {
        display: flex;
        align-items: flex-end;

        @include mobile {
            flex-direction: column;
            width: scaling(130);
        }
    }

    &-tickets,
    &-price {
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

        &.isHidden {
            opacity: 0;
        }
    }

    &-tickets {
        @include text--small;

        @include mobile {
            order: 2;
            margin: scaling(4) 0 scaling(32);
            color: $c-gray;
            font-size: scaling(12);
            line-height: $lh-140;
        }
    }

    &-price {
        @include mobile {
            order: 3;
        }

        span {
            @include text--small;
        }
    }

    &-price,
    &-time {
        text-align: right;
    }

    &-time {
        @include text--large;

        width: 100%;

        @include mobile {
            order: 1;
        }
    }

    &-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        margin-top: scaling(16);

        @include desktop--large {
            margin-top: scaling(24);
        }

        @include desktop--small {
            margin-top: scaling(12);
        }

        @include laptop {
            margin-top: scaling(18);
        }

        @include mobile {
            width: 100%;
            margin-top: 0;
            position: relative;
        }
    }

    &-team {
        padding-top: scaling(12);
        border-top: 1px solid $c-gray--header;

        @include desktop--large {
            width: scaling(576);
            margin-right: scaling(68);
        }

        @include desktop {
            width: scaling(432);
            margin-right: scaling(41);
        }

        @include desktop--small {
            width: scaling(340);
            margin-right: scaling(48);
        }

        @include laptop {
            width: scaling(448);
            margin-right: scaling(52);
        }

        @include tablet {
            width: scaling(288);
            margin-right: scaling(36);
        }

        @include mobile {
            width: 100%;
            margin-top: scaling(22);
            padding-top: scaling(16);
        }

        &Inner {
            display: flex;
            justify-content: space-between;
            color: $c-gray;
            font-size: scaling(14);
            line-height: $lh-130;
            font-family: $family-graphic;

            @include desktop--large {
                line-height: $lh-150;
            }

            @include desktop {
                line-height: $lh-150;
            }
        }

        &Icon {
            flex-shrink: 0;
            width: scaling(12);
            height: scaling(12);
            margin-left: scaling(30);

            @include desktop--large {
                width: scaling(22);
                height: scaling(22);
            }

            @include desktop {
                width: scaling(20);
                height: scaling(20);
            }

            @include tablet {
                width: scaling(15);
                height: scaling(15);
            }

            @include mobile {
                width: scaling(15);
                height: scaling(15);
            }
        }
    }

    &-button {
        display: flex;
        justify-content: flex-end;
        width: scaling(180);

        @include desktop--large {
            width: scaling(260);
        }

        @include desktop {
            width: scaling(230);
        }

        @include mobile {
            position: absolute;
            top: scaling(-9);
            width: auto;
            transform: translateY(-50%);
        }

        .RoundedButton {
            padding: scaling(5) scaling(12);

            @include desktop--large {
                padding: scaling(8) scaling(20);
            }

            @include desktop {
                padding: scaling(6) scaling(16);
            }

            &.isRed {
                @include hover {
                    &:hover {
                        background-color: $c-white;
                        color: $c-black;
                    }
                }
            }
        }
    }
}
</style>
