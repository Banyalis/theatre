<template>
    <div class="PosterExcursions">
        <div class="PosterExcursions-header">
            <div class="PosterExcursions-headerInner">
                <div
                    class="PosterExcursions-subtitle"
                    v-text="content.excursions.subtitle"
                ></div>
                <div
                    class="PosterExcursions-age"
                    v-text="content.excursions.age"
                ></div>
            </div>
            <div
                class="PosterExcursions-title"
                v-text="content.excursions.title"
            ></div>
        </div>
        <div class="PosterExcursions-info">
            <div
                v-for="(infoItem, infoItemIndex) in content.excursions.info"
                :key="infoItemIndex"
                class="PosterExcursions-infoItem"
            >
                <div
                    v-if="infoItem.title"
                    class="PosterExcursions-infoItemTitle"
                    v-text="infoItem.title"
                ></div>
                <div class="PosterExcursions-infoItemInner">
                    <!-- eslint-disable -->
                    <span
                        v-if="infoItem.values"
                        v-for="(value, valueIndex) in infoItem.values"
                        :key="valueIndex"
                        class="PosterExcursions-infoItemValue"
                        v-text="value.title"
                    ></span>
                    <!-- eslint-enable -->
                    <p
                        v-if="infoItem.description"
                        class="PosterExcursions-infoItemDescription"
                        v-text="infoItem.description"
                    ></p>
                    <NuxtLink
                        v-if="infoItem.link"
                        :to="infoItem.link.url"
                        class="PosterExcursions-infoItemLink"
                    >
                        {{ infoItem.link.title }}
                        <svg-icon name="icon-arrow--sideways" />
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="PosterExcursions-calendar">
            <div
                v-for="(calendarItem, calendarItemIndex) in content.excursions
                    .calendar"
                :key="calendarItemIndex"
                class="PosterExcursions-calendarItem"
                :class="{ isDisabled: calendarItem.isDisabled }"
            >
                <div class="PosterExcursions-calendarItemHeader">
                    <div
                        class="PosterExcursions-calendarItemDate"
                        v-text="calendarItem.date"
                    ></div>
                    <div
                        class="PosterExcursions-calendarItemMonth"
                        v-text="calendarItem.month"
                    ></div>
                </div>
                <div
                    class="PosterExcursions-calendarItemTickets"
                    v-text="calendarItem.tickets"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PosterExcursions',

    props: {
        content: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
@mixin l-info--desktop {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
}

@mixin l-text--large {
    color: $c-black--header;
    font-size: scaling(44);
    line-height: $lh-110;
    letter-spacing: 0.02em;

    @include desktop--large {
        font-size: scaling(80);
    }

    @include desktop {
        font-size: scaling(64);
    }

    @include desktop--small {
        font-size: scaling(55);
    }

    @include laptop {
        font-size: scaling(48);
    }

    @include mobile {
        font-size: scaling(28);
        line-height: $lh-120;
    }
}

@mixin l-text--small {
    font-size: scaling(14);
    line-height: $lh-120;
    font-family: $family-graphic;

    @include desktop--large {
        font-size: scaling(20);
    }

    @include desktop {
        font-size: scaling(18);
    }
}

.PosterExcursions {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    position: relative;

    &-header,
    &-calendar {
        width: 100%;
        border-right: none;

        @include desktop--large {
            width: (1440 * 100% / 1920);
            border-right: 1px solid $c-black;
        }

        @include desktop {
            width: (1080 * 100% / 1440);
            border-right: 1px solid $c-black;
        }

        @include desktop--small {
            width: (900 * 100% / 1200);
            border-right: 1px solid $c-black;
        }

        @include laptop {
            width: (640 * 100% / 960);
            border-right: 1px solid $c-black;
        }
    }

    &-header {
        padding: scaling(20) scaling(16);

        @include desktop--large {
            padding: scaling(36) scaling(32);
        }

        @include desktop {
            padding: scaling(28) scaling(24);
        }

        @include desktop--small {
            padding: scaling(24) scaling(20);
        }

        &Inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: scaling(64);

            @include desktop--large {
                margin-bottom: scaling(128);
            }

            @include desktop {
                margin-bottom: scaling(96);
            }

            @include desktop--small {
                margin-bottom: scaling(80);
            }

            @include mobile {
                margin-bottom: scaling(44);
            }
        }
    }

    &-subtitle {
        @include l-text--small;

        color: $c-black--lighten;

        @include mobile {
            width: scaling(240);
        }
    }

    &-age {
        @include l-text--small;

        color: $c-gray;

        @include desktop--large {
            letter-spacing: -0.02em;
        }
    }

    &-title {
        @include l-text--large;

        text-transform: uppercase;
    }

    &-calendar {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: -1px;
        border-top: 1px solid $c-black;

        &Item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: calc(100% / 6);
            padding: scaling(32) scaling(16) scaling(24);
            border-right: 1px solid $c-black;
            border-bottom: 1px solid $c-black;
            text-align: center;

            @include desktop--large {
                padding: scaling(48) scaling(32) scaling(40);
            }

            @include desktop {
                padding: scaling(40) scaling(24) scaling(32);
            }

            @include desktop--small {
                padding: scaling(36) scaling(20) scaling(28);
            }

            @include laptop {
                width: calc(100% / 4);
            }

            @include mobile {
                width: 50%;
            }

            &:nth-child(6n + 6) {
                border-right: none;

                @include laptop {
                    border-right: 1px solid $c-black;
                }
            }

            &:nth-child(4n + 4) {
                @include laptop {
                    border-right: none;
                }
            }

            &:nth-child(2n + 2) {
                @include mobile {
                    border-right: none;
                }
            }

            &.isDisabled {
                background-color: $c-gray-95;

                #{$component}-calendarItem {
                    &Date,
                    &Month {
                        color: $c-gray;
                    }
                }
            }

            &Header {
                margin-bottom: scaling(72);

                @include desktop--large {
                    margin-bottom: scaling(88);
                }

                @include desktop {
                    margin-bottom: scaling(80);
                }

                @include desktop--small {
                    margin-bottom: scaling(76);
                }
            }

            &Date {
                @include l-text--large;

                margin-bottom: scaling(8);

                @include desktop--large {
                    margin-bottom: scaling(12);
                }

                @include desktop {
                    margin-bottom: scaling(10);
                }

                @include mobile {
                    font-size: scaling(44);
                    letter-spacing: 0;
                }
            }

            &Month {
                @include l-text--small;
            }

            &Tickets {
                max-width: scaling(150);
                color: $c-gray;
                font-size: scaling(12);
                line-height: $lh-120;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(14);
                    line-height: $lh-150;
                }

                @include desktop {
                    font-size: scaling(14);
                    line-height: $lh-150;
                }
            }
        }
    }

    &-info {
        width: 100%;

        @include desktop--large {
            @include l-info--desktop;

            width: (480 * 100% / 1920);
            padding: scaling(36) scaling(32);
        }

        @include desktop {
            @include l-info--desktop;

            width: (360 * 100% / 1440);
            padding: scaling(28) scaling(24);
        }

        @include desktop--small {
            @include l-info--desktop;

            width: (300 * 100% / 1200);
            padding: scaling(24) scaling(20);
        }

        @include laptop {
            @include l-info--desktop;

            width: (320 * 100% / 960);
            padding: scaling(20) scaling(16);
        }

        @include tablet {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: -1px;
            border-top: 1px solid $c-black;
        }

        @include mobile {
            padding: scaling(24) scaling(16);
            border-top: 1px solid $c-black;
        }

        &Item {
            border-bottom: 1px solid #e3e3e3;

            @include desktop--large {
                margin-bottom: scaling(36);
                padding-bottom: scaling(36);
            }

            @include desktop {
                margin-bottom: scaling(28);
                padding-bottom: scaling(28);
            }

            @include desktop--small {
                margin-bottom: scaling(24);
                padding-bottom: scaling(24);
            }

            @include laptop {
                margin-bottom: scaling(20);
                padding-bottom: scaling(20);
            }

            @include tablet {
                width: 50%;
                padding: scaling(20) scaling(16) scaling(40);
                border-right: 1px solid $c-black;
                border-bottom: 1px solid $c-black;

                &:nth-child(2n + 2) {
                    border-right: none;
                }
            }

            @include mobile {
                display: flex;
                margin-bottom: scaling(16);
                border-bottom: none;
            }

            &:last-child {
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: none;

                @include tablet {
                    display: none;
                }

                @include mobile {
                    margin-top: scaling(20);
                    padding-top: scaling(16);
                    border-top: 1px solid #e3e3e3;
                }
            }

            &:nth-child(4) #{$component}-infoItemDescription {
                display: none;

                @include tablet {
                    display: block;
                }
            }

            &Inner {
                @include mobile {
                    flex: 1.5;
                }
            }

            &Title {
                @include l-text--small;

                margin-bottom: scaling(12);
                color: $c-gray;

                @include desktop--small {
                    margin-bottom: scaling(8);
                }

                @include laptop {
                    margin-bottom: scaling(8);
                }

                @include mobile {
                    flex: 1;
                    margin-bottom: 0;
                }
            }

            &Value {
                display: block;
                font-size: scaling(20);
                line-height: $lh-110;
                font-family: $family-graphic;

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

                @include mobile {
                    font-size: scaling(14);
                    line-height: $lh-130;
                }

                &:not(:last-of-type) {
                    margin-bottom: scaling(8);

                    @include desktop--large {
                        margin-bottom: scaling(12);
                    }

                    @include laptop {
                        margin-bottom: scaling(4);
                    }

                    @include mobile {
                        margin-bottom: scaling(4);
                    }
                }
            }

            &Description,
            &Link {
                @include l-text--small;

                @include desktop--large {
                    line-height: $lh-150;
                }

                @include desktop {
                    line-height: $lh-140;
                }

                @include desktop--small {
                    line-height: $lh-140;
                }

                @include laptop {
                    line-height: $lh-140;
                }

                @include tablet {
                    line-height: $lh-140;
                }

                @include mobile {
                    font-size: scaling(12);
                    line-height: $lh-140;
                }
            }

            &Description {
                margin-top: scaling(16);
                color: $c-gray;

                @include desktop--small {
                    margin-top: scaling(12);
                }

                @include laptop {
                    margin-top: scaling(12);
                }

                @include mobile {
                    margin-top: scaling(4);
                }
            }

            &Link {
                display: block;
                margin-top: scaling(8);
                color: $c-red;
                transition: color $d-hover ease-in-out;

                @include mobile {
                    margin-top: scaling(4);

                    svg {
                        display: none;
                    }
                }

                @include hover {
                    &:hover {
                        color: $c-black;
                    }
                }

                svg {
                    width: scaling(14);
                    height: scaling(14);
                    margin-bottom: -1px;
                    fill: currentColor;

                    @include desktop--large {
                        width: scaling(16);
                        height: scaling(16);
                    }
                }
            }
        }
    }
}
</style>
