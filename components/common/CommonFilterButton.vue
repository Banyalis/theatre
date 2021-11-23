<template>
    <div
        class="CommonFilterButton"
        :class="[
            item.modifier ? `CommonFilterButton--${item.modifier}` : '',
            mobileFilter ? `isMobileFilter` : '',
            getActiveDates || getActiveScene ? `isActive` : ''
        ]"
    >
        <div
            v-if="item.isCheckbox"
            class="CommonFilterButton-checkbox"
            :class="{ isChecked: avaibleTickets }"
            @click="onClick"
        >
            <div class="CommonFilterButton-checkboxIcon">
                <svg-icon name="icon-checkbox" />
            </div>
            <div
                class="CommonFilterButton-checkboxTitle"
                v-text="item.title"
            ></div>
        </div>
        <component
            :is="item.url ? 'NuxtLink' : 'div'"
            v-else
            :to="item.url"
            class="CommonFilterButton-content"
            @click="onClick"
        >
            <div v-if="item.icon" class="CommonFilterButton-contentIcon">
                <svg-icon :name="'icon-' + item.icon" />
            </div>
            <div
                class="CommonFilterButton-contentTitle"
                v-text="getTitle"
            ></div>
            <svg-icon
                v-if="item.modifier !== 'buy'"
                name="icon-arrow--bottom"
            />
        </component>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';

import { DateTime } from 'luxon';
import { CONFIG_POPUPS } from '@/utils/constants';

export default {
    name: 'CommonFilterButton',

    props: {
        item: {
            type: Object,
            required: true
        },
        mobileFilter: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            avaibleTickets: false
        };
    },

    computed: {
        getTitle() {
            if (this.item.modifier === 'calendar') {
                return this.getDates ? this.getDates : 'Все даты';
            } else if (this.item.modifier === 'scene') {
                return this.getSceneFilterName()
                    ? this.getSceneFilterName()
                    : 'Все сцены';
            }
            return this.item.title;
        },

        getDateStart() {
            return this.getDatesStartFilter()
                ? DateTime.fromISO(this.getDatesStartFilter())
                      .setLocale(this.currentLocaleCode)
                      .toFormat('dd.LL')
                : undefined;
        },

        getDateEnd() {
            return this.getDatesEndFilter()
                ? DateTime.fromISO(this.getDatesEndFilter())
                      .setLocale(this.currentLocaleCode)
                      .toFormat('dd.LL')
                : undefined;
        },

        getDates() {
            return this.getDateEnd
                ? this.getDateStart + ' — ' + this.getDateEnd
                : this.getDateStart;
        },

        getActiveDates() {
            return this.getDates && this.item.modifier === 'calendar';
        },

        getActiveScene() {
            return this.getSceneFilterName() && this.item.modifier === 'scene';
        },

        ...mapState(['currentLocaleCode'])
    },

    methods: {
        onClick() {
            if (CONFIG_POPUPS[this.item.modifier]) this.openPopup();

            if (this.item.isCheckbox) {
                this.avaibleTickets = !this.avaibleTickets;

                this.setAvaibleFilter(this.avaibleTickets);
            }
        },

        openPopup() {
            const header = {
                ...CONFIG_POPUPS[this.item.modifier].header,
                // If open popup from mobile filter popup, back button is needed
                hasBackButton: this.mobileFilter
            };
            this.setPopupType(CONFIG_POPUPS[this.item.modifier].componentName);
            this.setPopupHeader(header);
            this.openPopupAction();
        },

        ...mapMutations({
            setPopupType: 'popup/updateType',
            setPopupHeader: 'popup/updateHeader',
            setAvaibleFilter: 'timetable/setAvaibleFilter'
        }),

        ...mapActions({
            openPopupAction: 'popup/open'
        }),

        ...mapGetters({
            getSceneFilterName: 'timetable/getSceneFilterName',
            getDatesStartFilter: 'timetable/getDatesStartFilter',
            getDatesEndFilter: 'timetable/getDatesEndFilter'
        })
    }
};
</script>

<style lang="scss" scoped>
.CommonFilterButton {
    $component: &;

    padding: scaling(16) scaling(16) scaling(14);
    border-bottom: 1px solid $c-gray--header;

    @include desktop--large {
        padding: scaling(20) scaling(34) scaling(18);
    }

    @include desktop {
        padding: scaling(13) scaling(26) scaling(12);
    }

    @include desktop--small {
        padding: scaling(12) scaling(22) scaling(10);
    }

    @include laptop {
        padding: scaling(16) scaling(18) scaling(14);
    }

    &--buy #{$component}-contentIcon svg {
        width: scaling(16);
        height: scaling(16);

        @include desktop--small {
            width: scaling(14);
            height: scaling(14);
        }
    }

    &--yearsNews,
    &--categoriesNews {
        #{$component}-content {
            @include hover {
                &:hover #{$component}-contentIcon svg {
                    fill: $c-red;
                }
            }

            svg {
                fill: $c-black--header;
            }

            &Title {
                color: $c-black--header;
            }

            > svg {
                display: none;
            }
        }
    }

    &--subscribe {
        @include laptop {
            border-left: 1px solid $c-gray--header;
        }

        @include tablet {
            border-left: 1px solid $c-black;
        }

        #{$component}-content {
            @include hover {
                &:hover #{$component}-contentIcon svg {
                    stroke: $c-red;
                    fill: none;
                }
            }

            svg {
                stroke: $c-white;
                fill: none;

                @include tablet {
                    stroke: $c-black--header;
                }
            }

            &Title {
                @include tablet {
                    color: $c-black--header;
                }
            }

            > svg {
                display: none;
            }
        }

        #{$component}-contentIcon svg {
            width: scaling(20);
            height: scaling(20);

            @include desktop--large {
                width: scaling(24);
                height: scaling(24);
            }

            @include desktop {
                width: scaling(24);
                height: scaling(24);
            }
        }
    }

    &--yearsNews {
        border-right: 1px solid $c-black;

        @include mobile {
            border-right: none;
        }

        #{$component}-contentIcon svg {
            width: scaling(16);
            height: scaling(16);

            @include desktop--large {
                width: scaling(18);
                height: scaling(18);
            }

            @include desktop {
                width: scaling(18);
                height: scaling(18);
            }
        }
    }

    &--categoriesNews {
        #{$component}-contentIcon svg {
            width: scaling(20);
            height: scaling(20);

            @include desktop--large {
                width: scaling(24);
                height: scaling(24);
            }

            @include desktop {
                width: scaling(24);
                height: scaling(24);
            }
        }
    }

    &--calendar {
        border-right: 1px solid $c-gray--header;

        @include mobile {
            border-right: none;
        }

        #{$component}-contentIcon svg {
            width: scaling(16);
            height: scaling(16);

            @include desktop--large {
                width: scaling(18);
                height: scaling(18);
            }

            @include desktop {
                width: scaling(18);
                height: scaling(18);
            }
        }
    }

    &--scene {
        border-right: 1px solid $c-gray--header;

        @include mobile {
            border-right: none;
        }

        #{$component}-contentIcon svg {
            width: scaling(16);
            height: scaling(16);

            @include desktop--large {
                width: scaling(18);
                height: scaling(19);
            }

            @include desktop {
                width: scaling(18);
                height: scaling(19);
            }
        }
    }

    &--vote {
        @include laptop {
            border-left: 1px solid $c-gray--header;
        }

        #{$component}-content {
            @include tablet {
                flex-direction: row;

                > svg {
                    display: block;
                }
            }

            @include mobile {
                flex-direction: row;

                > svg {
                    display: block;
                }
            }
        }
    }

    &.isMobileFilter #{$component} {
        &-content {
            @include mobile {
                flex-direction: row-reverse;
            }
        }

        &-contentTitle,
        &-checkboxTitle {
            color: $c-black;
        }

        &-contentIcon svg {
            fill: $c-black;
        }

        &-checkboxIcon svg {
            stroke: $c-black;
        }
    }

    &.isActive #{$component}-contentIcon svg {
        @include mobile {
            fill: $c-red;
        }
    }

    &-content {
        display: flex;
        align-items: center;
        cursor: pointer;

        @include tablet {
            flex-direction: row-reverse;
        }

        @include mobile {
            flex-direction: row-reverse;
        }

        @include hover {
            &:hover #{$component}-contentIcon svg {
                fill: $c-red;
            }
        }

        &Icon {
            display: flex;
            align-items: center;
            flex-shrink: 0;
            width: scaling(16);
            height: scaling(16);

            @include desktop--large {
                width: scaling(20);
                height: scaling(20);
            }

            @include desktop {
                width: scaling(20);
                height: scaling(20);
            }

            @include tablet {
                justify-content: center;
            }

            @include mobile {
                justify-content: center;
            }

            svg {
                fill: $c-white;
                transition: fill $d-hover ease-in-out,
                    stroke $d-hover ease-in-out;
            }
        }

        > svg {
            flex-shrink: 0;
            width: scaling(24);
            height: scaling(24);
            stroke: $c-white;

            @include desktop--small {
                width: scaling(20);
                height: scaling(20);
            }

            @include laptop {
                display: none;
            }

            @include tablet {
                display: none;
            }

            @include mobile {
                display: none;
            }
        }
    }

    &-contentIcon,
    &-checkboxIcon {
        @include desktop--large {
            margin-right: scaling(34);
        }

        @include desktop {
            margin-right: scaling(26);
        }

        @include desktop--small {
            margin-right: scaling(22);
        }

        @include laptop {
            margin-right: scaling(18);
        }

        @include tablet {
            margin-left: scaling(10);
        }

        @include mobile {
            margin-left: scaling(10);
        }
    }

    &-contentTitle,
    &-checkboxTitle {
        width: 100%;
        color: $c-white;
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

        #{$component}.isActive & {
            @include mobile {
                color: $c-red;
            }
        }
    }

    &-checkbox {
        display: flex;
        align-items: center;
        cursor: pointer;

        @include tablet {
            flex-direction: row-reverse;
            justify-content: space-between;
        }

        @include mobile {
            flex-direction: row-reverse;
            justify-content: space-between;
        }

        @include hover {
            &:hover #{$component}-checkboxIcon svg {
                stroke: $c-red;
            }
        }

        &Icon {
            flex-shrink: 0;
            width: scaling(16);
            height: scaling(16);

            @include desktop--large {
                width: scaling(18);
                height: scaling(18);
            }

            @include desktop {
                width: scaling(18);
                height: scaling(18);
            }

            svg {
                width: 100%;
                height: 100%;
                fill: transparent;
                stroke: $c-white;
                transition: stroke $d-hover ease-in-out,
                    fill $d-hover ease-in-out;

                #{$component}-checkbox.isChecked & {
                    fill: $c-red;
                }
            }
        }

        &Title {
            #{$component}-checkbox.isChecked & {
                @include mobile {
                    color: $c-red;
                }
            }
        }
    }
}
</style>
