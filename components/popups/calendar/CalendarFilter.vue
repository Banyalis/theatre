<template>
    <div class="CalendarFilter">
        <div
            v-for="(months, year) in calendar"
            :key="year"
            class="CalendarFilter-block"
        >
            <div class="CalendarFilter-year">
                {{ year }}
            </div>
            <div
                v-for="(month, monthNumber) in months"
                :key="monthNumber"
                class="CalendarFilter-month"
                :class="{
                    isActive: year == activeYear && monthNumber == activeMonth
                }"
                @click="$emit('change-month', year, monthNumber)"
            >
                <div class="CalendarFilter-monthInner">
                    {{ month.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'CalendarFilter',
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

    computed: {
        ...mapState('popup', ['headerHeight'])
    }
};
</script>

<style scoped lang="scss">
.CalendarFilter {
    $component: &;

    &-block {
        position: relative;

        &:not(:first-child) #{$component}-year {
            height: scaling(121);
            border-top: 1px solid $c-gray-80;

            @include desktop {
                height: scaling(95);
            }

            @include desktop--small {
                height: scaling(81);
            }

            @include laptop {
                height: scaling(69);
            }
        }
    }

    &-year {
        position: sticky;
        top: 0;
        height: scaling(120);
        padding: scaling(64) 0 scaling(32);
        background: $c-gray-95;
        font-size: scaling(20);
        line-height: $lh-120;
        letter-spacing: 0.05em;
        font-family: $family-apoc;
        color: $c-black;
        text-align: center;
        margin-top: -1px;
        border-bottom: 1px solid $c-gray-80;

        @include desktop {
            height: scaling(94);
            padding: scaling(48) 0 scaling(24);
            font-size: scaling(18);
        }

        @include desktop--small {
            height: scaling(80);
            padding: scaling(40) 0 scaling(20);
            font-size: scaling(14);
            line-height: $lh-130;
        }

        @include laptop {
            height: scaling(68);
            padding: scaling(32) 0 scaling(16);
            font-size: scaling(14);
            line-height: $lh-130;
        }
    }

    &-month {
        padding: 0 scaling(32);
        outline: 1px solid transparent;
        transition: outline-color, color, background-color;
        transition-duration: $d-hover;
        cursor: pointer;

        &:not(:last-child) #{$component}-monthInner {
            border-bottom: 1px solid $c-gray-95;
        }

        @include hover {
            &:hover {
                background-color: $c-red;
                color: $c-white;

                #{$component}-monthInner {
                    border-bottom-color: transparent;
                }
            }
        }

        @include desktop {
            padding: 0 scaling(24);
        }

        @include desktop--small {
            padding: 0 scaling(20);
        }

        @include laptop {
            padding: 0 scaling(16);
        }

        &.isActive {
            background-color: $c-red;
            color: $c-white;
            outline-color: $c-black;

            #{$component}-monthInner {
                border-bottom-color: transparent;
            }
        }

        &Inner {
            @include caption-2;

            padding: scaling(28) 0;
            text-transform: capitalize;
            transition: border-bottom-color $d-hover;

            @include desktop {
                padding: scaling(24) 0;
            }

            @include desktop--small {
                padding: scaling(20) 0;
            }

            @include laptop {
                padding: scaling(16) 0;
            }
        }
    }
}
</style>
