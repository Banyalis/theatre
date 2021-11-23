<template>
    <div
        class="IndexItem"
        :class="[
            items.themeText,
            items.person ? items.person.align : '',
            items.type,
            { isSmallOnlyMobile }
        ]"
    >
        <nuxt-link
            v-if="items.person"
            :to="items.person.url"
            class="IndexItem-person"
        >
            <div class="IndexItem-personLabel" v-text="'Люди театра'"></div>
            <div class="IndexItem-personImage">
                <div class="IndexItem-personImageInner">
                    <img v-lazy="items.person.image" :alt="items.person.name" />
                </div>
            </div>
            <div class="IndexItem-personInfo">
                <div
                    class="IndexItem-personInfoName"
                    v-text="items.person.name"
                ></div>
                <div
                    class="IndexItem-personInfoPosition"
                    v-text="items.person.position"
                ></div>
            </div>
        </nuxt-link>
        <div class="IndexItem-content">
            <HiddenLink
                v-if="items.link"
                :url="items.link.url"
                :is-external="items.link.isExternal"
            />
            <div v-show="isChangedImage" class="IndexItem-bg">
                <img
                    v-show="isChangedImage"
                    v-lazy="getCurrentImage"
                    :data-srcset="getCurrentSrcSet"
                    :alt="items.titles.join(' ')"
                />
            </div>
            <div class="IndexItem-wrapper b-scaled-paddings">
                <div class="IndexItem-overlay"></div>
                <div class="IndexItem-top">
                    <div
                        v-if="isNeedLabel(items)"
                        class="IndexItem-label"
                        v-text="label"
                    ></div>
                    <div
                        v-if="items.category"
                        class="IndexItem-category"
                        v-text="category"
                    ></div>
                    <div
                        v-if="items.titles && items.titles.length"
                        class="IndexItem-title"
                        :class="[items.sizeTitle, items.theme_text_hover]"
                    >
                        <span
                            v-for="(title, index) in items.titles"
                            :key="index"
                            v-text="title"
                        ></span>
                    </div>
                    <div
                        v-if="items.caption"
                        class="IndexItem-caption"
                        v-text="items.caption"
                    ></div>
                </div>
                <div class="IndexItem-bottom">
                    <div
                        v-if="items.text"
                        class="IndexItem-text"
                        v-text="items.text"
                    ></div>
                    <div
                        v-if="items.description"
                        class="IndexItem-description"
                        v-text="items.description"
                    ></div>
                    <div
                        v-if="items.buttons && items.buttons.length"
                        class="IndexItem-buttons"
                    >
                        <template v-for="(button, index) in items.buttons">
                            <div
                                v-if="button.url && button.text"
                                :key="index"
                                class="IndexItem-button"
                            >
                                <RoundedButton
                                    :type="
                                        getCurrentButtonTheme(
                                            button.isPrimary,
                                            button.theme
                                        )
                                    "
                                    :is-white-hover="
                                        items.themeText === 'white'
                                    "
                                    :link="{
                                        url: button.url,
                                        title: button.text,
                                        isExternal: button.isExternal
                                    }"
                                />
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { NAMES_BREAKPOINTS, HOME_ITEM_TYPES } from '~/utils/constants';
import HiddenLink from '~/components/common/HiddenLink';
import RoundedButton from '@/components/other/RoundedButton';
import { getCurrentMediaSize } from '~/utils/utils';

export default {
    name: 'IndexItem',
    components: { RoundedButton, HiddenLink },
    props: {
        items: {
            type: Object,
            required: true
        },
        isSmallOnlyMobile: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            isSmall: false,
            isMobile: false,
            isChangedImage: false,
            labels: {
                [HOME_ITEM_TYPES.broadcast]: 'Трансляция',
                [HOME_ITEM_TYPES.notice]: 'Объявление',
                [HOME_ITEM_TYPES.performance]: 'Премьера'
            }
        };
    },

    computed: {
        label() {
            return this.items.label || this.labels[this.items.type];
        },
        category() {
            if (['o', 'b'].includes(this.items.category)) {
                return this.$t(`Index.categories.${this.items.category}`);
            }
            return this.items.category;
        },
        getCurrentImage() {
            const getFirstImage = (image) => {
                if (!image) {
                    return undefined;
                }
                if (typeof image === 'string') {
                    return image;
                }
                return image[Object.keys(image)[0]];
            };

            return (this.isSmall && !this.isSmallOnlyMobile) || this.isMobile
                ? getFirstImage(this.items.image.small)
                : getFirstImage(this.items.image.full);
        },
        getCurrentSrcSet() {
            // return undefined;
            const images =
                (this.isSmall && !this.isSmallOnlyMobile) || this.isMobile
                    ? this.items.image.small
                    : this.items.image.full;

            if (typeof images === 'string' || !images) {
                return undefined;
            }

            const keys = Object.keys(images);

            return keys
                .map((item) => {
                    let size = item.replace(keys[0], '');
                    if (!size) {
                        size = '1x';
                    }
                    return images[item]
                        ? `${images[item]} ${size}`.trim()
                        : undefined;
                })
                .filter((i) => i)
                .join(', ');
        }
    },

    mounted() {
        window.addEventListener('resize', this.onResize);

        this.onResize();

        this.isChangedImage = true;
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        getCurrentButtonTheme(isPrimary, theme) {
            return `is${!isPrimary ? 'Transparent' : ''}${
                theme?.charAt(0).toUpperCase() + theme?.slice(1)
            }`;
        },

        isNeedLabel(item) {
            return (
                item.label ||
                item.isWithLabel ||
                [HOME_ITEM_TYPES.notice, HOME_ITEM_TYPES.broadcast].includes(
                    item.type
                )
            );
        },

        onResize() {
            const curMediaSize = getCurrentMediaSize();

            this.isMobile = NAMES_BREAKPOINTS.mobile === curMediaSize;

            this.isSmall = [
                NAMES_BREAKPOINTS.mobile,
                NAMES_BREAKPOINTS.tablet,
                NAMES_BREAKPOINTS.laptop
            ].includes(curMediaSize);
        }
    }
};
</script>

<style lang="scss" scoped>
.IndexItem {
    $component: &;

    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    background: $c-black;

    @include mobile {
        min-height: scaling(466);
    }

    &.white {
        color: $c-white;
    }

    &.black {
        color: $c-black;
    }

    &.right {
        flex-direction: row-reverse;
    }

    &-overlay {
        display: none;
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;
        height: 50%;
        background: linear-gradient(
            to top,
            $c-black 80%,
            rgba($c-black, 0) 100%
        );
        width: 100%;

        .Hero & {
            @include mobile {
                display: block;
            }
        }
    }

    &-person {
        flex-direction: column;
        width: scaling(481);
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        border-width: 0;
        border-style: solid;
        border-color: $c-black;
        background: $c-gold--home;
        display: none;
        text-align: center;
        color: $c-black;

        @include desktop--large {
            display: flex;
            padding: scaling(36) scaling(32) scaling(44);
        }

        @include desktop {
            display: flex;
            width: scaling(357);
            padding: scaling(32) scaling(24) scaling(36);
        }

        @include desktop--small {
            display: flex;
            width: scaling(297);
            padding: scaling(24) scaling(20) scaling(32);
        }

        @include hover {
            &:hover #{$component}-personImage {
                border-color: $c-red;
                background-color: $c-red;
            }
        }

        #{$component}.left & {
            border-right-width: 1px;
        }

        #{$component}.right & {
            border-left-width: 1px;
        }

        .group & {
            display: none !important;
        }

        &Label {
            @include text;
        }

        &Image {
            width: scaling(204);
            height: scaling(204);
            border-radius: 100%;
            border: 1px solid $c-black;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: border-color $d-hover ease-in-out,
                background-color $d-hover ease-in-out;

            @include desktop {
                width: scaling(152);
                height: scaling(152);
            }

            @include desktop--small {
                width: scaling(136);
                height: scaling(136);
            }

            &Inner {
                border-radius: 100%;
                position: relative;
                overflow: hidden;
                width: scaling(188);
                height: scaling(188);

                @include desktop {
                    width: scaling(140);
                    height: scaling(140);
                }

                @include desktop--small {
                    width: scaling(124);
                    height: scaling(124);
                }

                img {
                    @include m-absoluteObjectFit;
                }
            }
        }

        &Info {
            &Name {
                @include title;
            }

            &Position {
                @include heading-label;

                margin-top: scaling(16);

                @include desktop {
                    margin-top: scaling(20);
                }

                @include desktop--small {
                    margin-top: scaling(12);
                }
            }
        }
    }

    &-content {
        width: 100%;
        //height: 100%;
        position: relative;
        display: flex;
        flex-shrink: 1;

        @include hover {
            &:hover #{$component}-title {
                &.white {
                    color: $c-white !important;
                }

                &.black {
                    color: $c-black !important;
                }

                &.red {
                    color: $c-red !important;
                }
            }
        }
    }

    &-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;

        img {
            @include m-absoluteObjectFit;

            @include mobile {
                position: relative;
            }
        }

        .Hero & {
            @include mobile {
                position: relative;
                height: 100%;
            }
        }
    }

    &-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        @include desktop--large {
            padding-top: scaling(32);
            padding-bottom: scaling(36);
        }

        @include desktop {
            padding-top: scaling(24);
            padding-bottom: scaling(28);
        }

        @include desktop--small {
            padding-top: scaling(24);
            padding-bottom: scaling(24);
        }

        @include laptop {
            padding-top: scaling(20);
            padding-bottom: scaling(24);

            .group #{$component}:not(.isSmallOnlyMobile) & {
                padding-top: scaling(38);
            }

            .Hero & {
                justify-content: flex-end;
            }
        }

        @include tablet {
            padding-top: scaling(20);
            padding-bottom: scaling(20);

            .group #{$component}:not(.isSmallOnlyMobile) & {
                padding-top: scaling(38);
            }

            .Hero & {
                justify-content: flex-end;
            }
        }

        @include mobile {
            padding-top: scaling(32);
            padding-bottom: scaling(32);

            .group & {
                padding-top: scaling(54);
            }

            .Hero & {
                position: absolute;
                justify-content: flex-end;
            }
        }

        .group .isWithPreview & {
            justify-content: flex-end;
        }

        .high & {
            align-items: center;
            justify-content: flex-start;
            text-align: center;
        }
    }

    &-top {
        display: flex;
        width: 80%;
        flex-wrap: wrap;
        align-items: baseline;
        z-index: 2;
        position: relative;

        #{$component}:not(.isSmallOnlyMobile) & {
            @include laptop {
                width: 100%;
                flex: 0 0 auto;
            }

            @include tablet {
                width: 100%;
                flex: 0 0 auto;
            }

            @include mobile {
                width: 100%;
                flex: 0 0 auto;
            }
        }

        #{$component}.notice:not(.isSmallOnlyMobile) &,
        #{$component}.broadcast:not(.isSmallOnlyMobile) &,
        #{$component}.model:not(.isSmallOnlyMobile) & {
            @include laptop {
                width: 100%;
                flex: 0 0 auto;
            }

            @include tablet {
                width: 100%;
                flex: 0 0 auto;
            }
        }

        #{$component}.notice &,
        #{$component}.broadcast &,
        #{$component}.model & {
            @include mobile {
                width: 100%;
                flex: 0 0 auto;
            }
        }

        .high & {
            flex-direction: column;
            align-items: center;
        }
    }

    &-bottom {
        position: relative;
        width: 55%;

        @include laptop {
            width: 100%;

            .Hero & {
                margin-top: scaling(20);
            }
        }

        @include tablet {
            width: 100%;

            .Hero & {
                margin-top: scaling(20);
            }
        }

        @include mobile {
            width: 100%;
            z-index: 3;

            .Hero & {
                margin-top: scaling(20);
            }
        }

        .BlocksList-item:not(.group)
            #{$component}.performance:not(.isSmallOnlyMobile)
            &,
        #{$component}.notice:not(.isSmallOnlyMobile) &,
        #{$component}.broadcast:not(.isSmallOnlyMobile) & {
            @include laptop {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-top: scaling(20);
            }

            @include tablet {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-top: scaling(20);
            }

            @include mobile {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-top: scaling(20);
            }
        }

        .BlocksList-item .IndexItemGroup.isWithPreview #{$component}.notice & {
            @include laptop {
                height: auto;
                padding-top: 0;
            }

            @include tablet {
                height: auto;
                padding-top: 0;
            }

            @include mobile {
                height: auto;
                padding-top: 0;
            }
        }

        #{$component}.notice.isSmallOnlyMobile & {
            @include mobile {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-top: scaling(20);
            }
        }

        .BlocksList-item .IndexItemGroup.isWithPreview #{$component}.notice & {
            @include mobile {
                height: auto;
            }
        }

        //
        //.isWithPreview #{$component}.notice.isSmallOnlyMobile & {
        //}

        .group .isWithPreview & {
            margin-top: scaling(20);
        }

        .high & {
            margin-top: scaling(20);
            width: 100%;
            max-width: scaling(430);

            @include laptop {
                max-width: scaling(320);
            }

            @include tablet {
                max-width: scaling(320);
            }
        }
    }

    &-label {
        font-size: scaling(14);
        line-height: $lh-130;
        font-family: $family-graphic;

        @include desktop--large {
            font-size: scaling(20);
        }

        @include desktop {
            font-size: scaling(18);
        }

        @include desktop--small {
            font-size: scaling(16);
        }

        .BlocksList-item:not(.high) &,
        .Hero-itemInner:not(.high) & {
            margin-right: scaling(12);
            margin-bottom: scaling(12);

            @include desktop--large {
                margin-right: scaling(20);
                margin-bottom: scaling(20);
            }

            @include desktop {
                margin-right: scaling(20);
            }

            @include desktop--small {
                margin-right: scaling(16);
            }
        }

        #{$component}.isSmallOnlyMobile & {
            @include laptop {
                margin-right: scaling(20);
            }

            @include tablet {
                margin-right: scaling(20);
            }
        }

        #{$component}.performance & {
            font-family: $family-apoc;
            text-transform: uppercase;

            @include desktop--small {
                font-size: scaling(14);
            }
        }
    }

    &-category {
        @include text;

        margin-bottom: scaling(12);

        .high & {
            @include desktop--large {
                margin-top: scaling(56);
            }

            //@include desktop {
            //    margin-top: scaling(60);
            //}
            //
            //@include desktop--small {
            //    margin-top: scaling(54);
            //}
            //
            //@include laptop {
            //    margin-top: scaling(50);
            //}
            //
            //@include tablet {
            //    margin-top: scaling(50);
            //}
            //
            //@include mobile {
            //    margin-top: scaling(66);
            //}
        }

        .high #{$component}-label + & {
            @include desktop--large {
                margin-top: scaling(32);
            }

            @include desktop {
                margin-top: scaling(24);
            }

            @include desktop--small {
                margin-top: scaling(20);
            }

            //@include laptop {
            //    margin-top: scaling(16);
            //}
            //
            //@include tablet {
            //    margin-top: scaling(16);
            //}
            //
            //@include mobile {
            //    margin-top: scaling(16);
            //}
        }
    }

    &-title {
        width: 100%;
        display: flex;
        flex-direction: column;
        transition: color $d-hover ease-in-out;
        //font-feature-settings: 'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on,
        //    'salt' on !important;

        .high & {
            @include desktop--large {
                margin-top: scaling(102);
            }

            @include desktop {
                margin-top: scaling(60);
            }

            @include desktop--small {
                margin-top: scaling(54);
            }

            @include laptop {
                margin-top: scaling(30);
            }

            @include tablet {
                margin-top: scaling(30);
            }

            @include mobile {
                margin-top: scaling(34);
            }
        }

        .high #{$component}-label + & {
            @include desktop--large {
                margin-top: scaling(78);
            }

            @include desktop {
                margin-top: scaling(60);
            }

            @include desktop--small {
                margin-top: scaling(54);
            }

            //@include laptop {
            //    margin-top: scaling(50);
            //}
            //
            //@include tablet {
            //    margin-top: scaling(50);
            //}
            //
            //@include mobile {
            //    margin-top: scaling(20);
            //}
        }

        .high #{$component}-category + & {
            margin-top: 0 !important;
        }

        .BlocksList-item:not(.group) &.big {
            @include home-heading-1;

            @include laptop {
                @include heading-2;
            }

            @include tablet {
                @include heading-2;
            }

            @include mobile {
                @include heading-2;

                font-size: scaling(30) !important;
            }
        }

        .BlocksList-item:not(.group) &.medium {
            @include heading-1;

            @include laptop {
                @include heading-2;
            }

            @include tablet {
                @include heading-2;
            }

            @include mobile {
                @include heading-2;

                font-size: scaling(30) !important;
            }
        }

        .BlocksList-item:not(.group) &.small,
        .Hero-itemInner .IndexItemGroup.isWithPreview &.small,
        .Hero-itemInner:not(.group) &.small {
            @include heading-2;

            @include mobile {
                font-size: scaling(30) !important;
            }
        }

        .BlocksList-item .IndexItemGroup:not(.isWithPreview) &.big,
        .BlocksList-item .IndexItemGroup.isWithPreview &.big {
            @include heading-1;

            @include laptop {
                @include heading-2;
            }

            @include tablet {
                @include heading-2;
            }

            @include mobile {
                @include heading-2;

                font-size: scaling(30) !important;
            }
        }

        .BlocksList-item .IndexItemGroup:not(.isWithPreview) &.medium,
        .BlocksList-item .IndexItemGroup.isWithPreview &.medium {
            @include heading-2;

            @include mobile {
                font-size: scaling(30) !important;
            }
        }

        .BlocksList-item .IndexItemGroup.isWithPreview &.medium {
            @include mobile {
                font-size: scaling(20) !important;
            }
        }

        .BlocksList-item .IndexItemGroup:not(.isWithPreview) &.small,
        .BlocksList-item .IndexItemGroup.isWithPreview &.small {
            font-size: scaling(36);
            line-height: $lh-110;
            letter-spacing: 0.02em;
            text-transform: uppercase;

            @include desktop {
                font-size: scaling(32);
            }

            @include desktop--small {
                font-size: scaling(28);
            }

            @include laptop {
                font-size: scaling(24);
            }

            @include tablet {
                font-size: scaling(22);
            }

            @include mobile {
                font-size: scaling(30);
            }
        }

        .BlocksList-item .IndexItemGroup.isWithPreview &.small {
            @include mobile {
                font-size: scaling(20);
            }
        }

        .Hero-itemInner .IndexItemGroup:not(.isWithPreview) &.big,
        .Hero-itemInner .IndexItemGroup.isWithPreview &.big,
        .Hero-itemInner:not(.group) &.big {
            @include home-heading-1;

            @include mobile {
                @include heading-2;

                font-size: scaling(30) !important;
            }
        }

        .Hero-itemInner .IndexItemGroup:not(.isWithPreview) &.medium,
        .Hero-itemInner .IndexItemGroup.isWithPreview &.medium,
        .Hero-itemInner:not(.group) &.medium {
            @include heading-1;

            @include mobile {
                @include heading-2;

                font-size: scaling(30) !important;
            }
        }

        .high .IndexItemGroup:not(.isWithPreview) &,
        .high .IndexItemGroup.isWithPreview &,
        .high:not(.group) &.small,
        .high:not(.group) &.medium,
        .high:not(.group) &.big {
            @include mobile {
                font-size: scaling(44) !important;
            }
        }

        .BlocksList-item:not(.group) #{$component}.notice &.small,
        .BlocksList-item:not(.group) #{$component}.notice &.medium,
        .BlocksList-item:not(.group) #{$component}.notice &.big,
        .IndexItemGroup:not(.isWithPreview) #{$component}.notice &.small,
        .IndexItemGroup:not(.isWithPreview) #{$component}.notice &.medium,
        .IndexItemGroup:not(.isWithPreview) #{$component}.notice &.big,
        .IndexItemGroup.isWithPreview #{$component}.notice &.small,
        .IndexItemGroup.isWithPreview #{$component}.notice &.medium,
        .IndexItemGroup.isWithPreview #{$component}.notice &.big {
            @include mobile {
                font-size: scaling(24) !important;
            }
        }

        .group:not(.high) .isWithPreview & {
            @include heading-2;

            @include mobile {
                font-size: scaling(30) !important;
            }
        }

        .group .isWithPreview [data-index='0'] & {
            display: none;
        }

        &.xSmall {
            font-size: scaling(20);
            line-height: $lh-110;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            font-weight: $fw-normal;
            font-feature-settings: 'ss02' on;

            @include desktop--large {
                font-size: scaling(36);
            }

            @include desktop {
                font-size: scaling(28);
            }

            @include desktop--small {
                font-size: scaling(24);
            }
        }

        span {
            white-space: pre-line;
        }
    }

    &-caption {
        margin-top: scaling(20);

        :not(.notice) & {
            @include text--caption;

            opacity: 0.7;
        }

        .notice & {
            @include text;
        }
    }

    &-text {
        @include body-1;

        line-height: $lh-140;
        white-space: pre-line;

        @include tablet {
            line-height: $lh-150;
        }

        @include mobile {
            line-height: $lh-130;
            font-size: scaling(16);
        }
    }

    &-description {
        @include body-3;

        opacity: 0.7;
        margin-top: scaling(8);

        @include mobile {
            opacity: 1;
            color: $c-gray;
        }
    }

    &-buttons {
        position: relative;
        margin-top: scaling(32);
        display: flex;
        z-index: $z-hiddenLink + 1;

        @include laptop {
            flex-wrap: wrap;
            margin-top: scaling(24);
        }

        @include tablet {
            flex-wrap: wrap;
            margin-top: scaling(24);
        }

        @include mobile {
            flex-wrap: wrap;
            margin-top: scaling(24);
        }

        .Hero &,
        .group .isWithPreview & {
            @include mobile {
                padding-top: scaling(20);
                border-top: 1px solid rgba(#797979, 0.2);
            }
        }
    }

    &-button {
        flex-shrink: 0;
        margin-right: scaling(12);

        @include laptop {
            margin-top: scaling(12);
        }

        @include tablet {
            margin-top: scaling(12);
        }

        @include mobile {
            margin: scaling(10) scaling(10) 0 0;
        }
    }
}
</style>
