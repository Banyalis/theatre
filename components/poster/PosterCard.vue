<!-- TODO: Change isOneAct class to conjugate modifier because it used for conjugate performances regardless of it's type -->
<template>
    <div
        v-if="isAvaible"
        class="PosterCard"
        :class="[
            item.modifier ? `PosterCard--${item.modifier}` : '',
            item.disabled ? `isDisabled` : '',
            item.oneAct ? `isOneAct` : '',
            item.scene ? `PosterCard--${item.scene.type}` : '',
            !item.image ? 'noPicture' : '',
            item.slug ? 'isLink' : '',
            item.category === 'concert' ? 'isConcertType' : '',
            item.category === 'contest' ? 'isContestType' : ''
        ]"
    >
        <HiddenLink
            v-if="item.slug"
            :url="
                item.category === 'concert'
                    ? `/season/${item.category}/${item.slug}/`
                    : `/performances/${item.category}/${item.slug}/`
            "
        />
        <div class="PosterCard-image">
            <div class="PosterCard-imageInner">
                <picture v-if="item.image">
                    <source
                        :srcset="item.image + ' 1x, ' + item.image2x + ' 2x'"
                    />
                    <img :src="item.image" alt="" />
                </picture>
                <template v-else>
                    <PosterCardImageStub :item="item" />
                </template>
            </div>
            <div
                v-if="oneActList.length"
                ref="slider"
                class="PosterCard-imageInner swiper-container"
            >
                <div ref="sliderInner" class="swiper-wrapper">
                    <div
                        v-for="(sliderItem, sliderItemIndex) in oneActList"
                        :key="sliderItemIndex"
                        ref="sliderItem"
                        class="swiper-slide"
                    >
                        <img
                            v-if="sliderItem.image"
                            v-lazy="sliderItem.image"
                            :data-srcset="
                                sliderItem.image +
                                ' 1x, ' +
                                sliderItem.image2x +
                                ' 2x'
                            "
                        />
                        <template v-else>
                            <PosterCardImageStub :item="item" />
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="PosterCard-content">
            <div
                v-if="item.subtitle || oneActSubtitle || item.age"
                class="PosterCard-contentHeader"
            >
                <div
                    v-if="item.subtitle || oneActSubtitle"
                    class="PosterCard-subtitle"
                    v-text="item.subtitle || oneActSubtitle"
                ></div>
                <div
                    v-if="item.age"
                    class="PosterCard-age"
                    v-text="item.age"
                ></div>
            </div>
            <div class="PosterCard-contentInner">
                <div class="PosterCard-contentWrapper">
                    <!-- eslint-disable -->
                    <h3
                        v-for="(listItem, listItemIndex) in oneActList"
                        :key="listItemIndex"
                        class="PosterCard-additionalTitle"
                        v-html="listItem.title"
                    ></h3>
                    <h3
                        ref="title"
                        class="PosterCard-title"
                        :class="{
                            isSmallTitle:
                                isSmallTitle || item.category === 'concert'
                        }"
                        v-html="item.title"
                    ></h3>
                    <!-- eslint-enable -->
                    <div
                        v-if="item.team && item.modifier !== 'broadcast'"
                        class="PosterCard-team"
                    >
                        <p class="PosterCard-teamText" v-text="item.team"></p>
                        <!-- <div class="PosterCard-teamIcon">
                            <CommonCharactersButton
                                v-if="isAnnounced"
                                :performance-id="item.id"
                            />
                        </div> -->
                    </div>
                    <!-- eslint-disable -->
                    <p
                        v-if="item.description && item.modifier === 'broadcast'"
                        class="PosterCard-description"
                        v-html="item.description"
                    ></p>
                    <!-- eslint-enable -->
                </div>
                <div v-if="time" class="PosterCard-time" v-text="time"></div>
                <!-- eslint-disable -->
                <p
                    v-if="
                        item.description &&
                        !item.oneAct &&
                        item.modifier !== 'broadcast'
                    "
                    class="PosterCard-description"
                    v-html="item.description"
                ></p>
                <div
                    v-if="item.team && item.modifier === 'broadcast'"
                    class="PosterCard-team"
                >
                    <p class="PosterCard-teamText" v-text="item.team"></p>
                    <!-- <div class="PosterCard-teamIcon">
                            <CommonCharactersButton
                                v-if="isAnnounced"
                                :performance-id="item.id"
                            />
                        </div> -->
                </div>
                <!-- eslint-enable -->
            </div>
            <!-- <div v-else class="PosterCard-team PosterCard-team--unsetted">
                <div class="PosterCard-teamText">
                    Состав объявляется за неделю до назначенной даты спектакля
                </div>
            </div> -->
        </div>
        <div
            v-if="item.modifier !== 'broadcast'"
            class="PosterCard-footer"
            :class="{
                isEmpty:
                    (item.oneAct && !item.last) ||
                    (!item.scene && !ticketsData.freeSeats && !price)
            }"
        >
            <div v-if="item.scene" class="PosterCard-scene">
                <svg-icon
                    v-if="
                        item.scene.type === 'new' ||
                        item.scene.type === 'chamber' ||
                        item.scene.type === 'historical' ||
                        item.scene.type === 'beethoven'
                    "
                    :name="'icon-' + item.scene.type"
                />
                <div
                    class="PosterCard-sceneText"
                    v-text="item.scene.name"
                ></div>
            </div>
            <div
                v-if="ticketsData.freeSeats"
                class="PosterCard-tickets"
                v-text="ticketsPluralization"
            ></div>
            <div
                v-if="price"
                class="PosterCard-price"
                v-text="price + ' ₽'"
            ></div>
            <RoundedButton
                v-if="ticketsButton"
                :link="ticketsButtonLink"
                :title="ticketsButton.text"
                :type="BUTTON_CLASSES[ticketsButton.type]"
                :loading="programsLoading"
                class="PosterCard-button"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { DateTime } from 'luxon';
import { isMobile } from '@/utils/utils';
import {
    TICKETS_BUTTONS,
    BUTTON_CLASSES,
    BUTTON_TYPES
} from '@/utils/constants';
import { Swiper, Autoplay } from 'swiper';
import 'swiper/swiper.scss';

import PosterCardImageStub from '@/components/poster/PosterCardImageStub';
// import CommonCharactersButton from '@/components/common/CommonCharactersButton';
import HiddenLink from '@/components/common/HiddenLink';
import RoundedButton from '@/components/other/RoundedButton';

Swiper.use([Autoplay]);

export default {
    name: 'PosterCard',

    components: {
        PosterCardImageStub,
        // CommonCharactersButton,
        HiddenLink,
        RoundedButton
    },

    props: {
        item: {
            type: Object,
            required: true
        },
        oneActSubtitle: {
            type: String,
            default: ''
        },
        oneActList: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            swiper: undefined,
            BUTTON_CLASSES,
            isSmallTitle: false
        };
    },

    // TODO: Compute button data
    computed: {
        ticketsData() {
            return this.programs[this.item.hash] || {};
        },

        ticketsPluralization() {
            return this.$tc('Common.tickets', this.ticketsData.freeSeats);
        },

        ticketsButton() {
            if (this.item.button) {
                let buttonType = BUTTON_TYPES.uploaded;
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
                return `от  ${this.ticketsData.minPrice} до ${this.ticketsData.maxPrice}`;
            }
        },

        time() {
            if (this.item.datetime) {
                return DateTime.fromISO(this.item.datetime).toLocaleString(
                    DateTime.TIME_24_SIMPLE
                );
            } else return '';
        },

        isDisabled() {
            return false;
        },

        isAnnounced() {
            return !this.programs[this.item.hash];
        },

        isAvaible() {
            return !this.avaibleFilter || this.ticketsData.freeSeats;
        },

        ...mapState('performances', ['programs', 'programsLoading']),
        ...mapState('timetable', ['avaibleFilter'])
    },

    mounted() {
        window.addEventListener('resize', this.initSwiper);
        this.initSwiper();
        this.setTitleSmallSize();
    },

    destroyed() {
        window.removeEventListener('resize', this.initSwiper);
    },

    methods: {
        initSwiper() {
            if (isMobile() && this.swiper === undefined) {
                this.swiper = new Swiper(this.$refs.slider, {
                    slidesPerView: 1,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    speed: 0
                });
            } else if (
                !isMobile() &&
                this.swiper !== undefined &&
                this.$refs.slider
            ) {
                this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.sliderInner.removeAttribute('style');
                this.$refs.sliderItem[0].removeAttribute('style');
            }
        },

        setTitleSmallSize() {
            const getTitleLength = this.$refs.title.innerHTML.length;

            this.isSmallTitle = getTitleLength > 40;
        }
    }
};
</script>

<style lang="scss" scoped>
@mixin l-text {
    font-size: scaling(14);
    line-height: $lh-130;
    font-family: $family-graphic;

    @include desktop--large {
        font-size: scaling(20);
    }

    @include desktop {
        font-size: scaling(18);
    }

    @include mobile {
        font-size: scaling(12);
        line-height: $lh-150;
    }
}

.PosterCard {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    position: relative;

    @include mobile {
        flex-direction: row-reverse;
    }

    @include hover {
        &.isLink:hover #{$component} {
            &-additionalTitle,
            &-title,
            &-time {
                color: $c-red;
            }
        }
    }

    &.isDisabled {
        color: $c-gray;

        #{$component} {
            &-subtitle,
            &-title,
            &-time,
            &-sceneText {
                color: $c-gray;
            }
        }
    }

    &.isOneAct {
        &:not(:first-child) {
            padding-top: scaling(20);

            @include desktop--large {
                padding-top: scaling(36);
            }

            @include desktop {
                padding-top: scaling(28);
            }

            @include desktop--small {
                padding-top: scaling(24);
            }

            @include mobile {
                padding-top: 0;
            }

            #{$component}-time {
                display: none;

                @include mobile {
                    display: block;
                }
            }
        }

        &:not(:last-child) {
            @include mobile {
                display: none;
            }

            #{$component}-content {
                &Inner {
                    height: 100%;
                }

                &Wrapper {
                    border-bottom: 1px solid $c-gray-80;
                }
            }
        }

        #{$component} {
            &-imageInner {
                &:first-child {
                    @include mobile {
                        display: none;
                    }
                }

                &:last-child {
                    display: none;

                    @include mobile {
                        display: block;
                    }
                }

                .swiper-slide {
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;

                    &-active {
                        opacity: 1;
                    }
                }
            }

            &-content {
                margin-bottom: 0;

                // @include desktop--large {
                //     padding-bottom: scaling(24);
                // }

                // @include desktop {
                //     padding-bottom: scaling(21);
                // }

                // @include desktop--small {
                //     padding-bottom: scaling(16);
                // }

                &Header {
                    display: none;

                    @include mobile {
                        display: block;
                    }
                }
            }

            &-title {
                @include mobile {
                    display: none;
                }
            }

            &-team {
                margin-top: scaling(13);

                @include desktop--large {
                    margin-top: scaling(24);
                }

                @include desktop {
                    margin-top: scaling(20);
                }

                @include desktop--small {
                    margin-top: scaling(17);
                }
            }

            &-footer {
                margin-top: scaling(24);
                margin-left: 0;

                @include desktop--large {
                    margin-top: scaling(40);
                    padding-left: scaling(224);
                }

                @include desktop {
                    padding-left: scaling(168);
                }

                @include desktop--small {
                    padding-left: scaling(140);
                }

                @include laptop {
                    margin-top: scaling(20);
                    padding-left: scaling(160);
                }

                @include tablet {
                    margin-top: 0;
                    margin-left: scaling(136);
                }

                &.isEmpty {
                    display: none;
                }
            }
        }
    }

    &.noPicture {
        #{$component}-imageInner {
            background-color: $c-red;
        }
    }

    &--new {
        &.noPicture #{$component}-imageInner {
            background-color: #415923;
        }

        #{$component}-scene svg {
            stroke: #415923;
        }

        @include hover {
            &.isLink:hover #{$component} {
                &-image {
                    border-color: #415923;
                    background-color: #415923;
                }

                &-scene {
                    color: #415923;
                }
            }
        }
    }

    &--chamber {
        &.noPicture #{$component}-imageInner {
            background-color: #185289;
        }

        #{$component}-scene svg {
            stroke: #185289;
        }

        @include hover {
            &.isLink:hover #{$component} {
                &-image {
                    border-color: #185289;
                    background-color: #185289;
                }

                &-scene {
                    color: #185289;
                }
            }
        }
    }

    &--historical {
        &.noPicture #{$component}-imageInner {
            background-color: #8f1e32;
        }

        #{$component}-scene svg {
            stroke: #b11632;
        }

        @include hover {
            &.isLink:hover #{$component} {
                &-image {
                    border-color: #8f1e32;
                    background-color: #8f1e32;
                }

                &-scene {
                    color: #b11632;
                }
            }
        }
    }

    &--beethoven {
        &.noPicture #{$component}-imageInner {
            background-color: #6b2f5e;
        }

        #{$component}-scene svg {
            stroke: #732e63;
        }

        @include hover {
            &.isLink:hover #{$component} {
                &-image {
                    border-color: #6b2f5e;
                    background-color: #6b2f5e;
                }

                &-scene {
                    color: #732e63;
                }
            }
        }
    }

    &:not(&--broadcast) {
        #{$component}-team:not(#{$component}-team--unsetted) {
            opacity: 0;
            visibility: hidden;
            transition: opacity $d-hover ease-in-out,
                visibility $d-hover ease-in-out;
        }

        @include hover {
            &:hover #{$component}-team {
                opacity: 1;
                visibility: visible;
            }
        }
    }

    &--broadcast {
        @include mobile {
            flex-direction: column;
            align-items: center;
        }

        #{$component} {
            &-image {
                margin-right: scaling(32);

                @include desktop--large {
                    margin-right: scaling(64);
                }

                @include desktop {
                    margin-right: scaling(46);
                }

                @include laptop {
                    margin-right: scaling(48);
                }

                @include mobile {
                    margin: scaling(16) 0 scaling(20);
                }
            }

            &-content {
                margin-bottom: 0;

                @include mobile {
                    text-align: center;

                    &Header {
                        justify-content: center;
                        margin-bottom: scaling(8);
                    }
                }
            }

            &-subtitle {
                color: $c-black;

                @include mobile {
                    font-size: scaling(14);
                    line-height: $lh-130;
                }
            }

            &-title {
                @include mobile {
                    font-size: scaling(20);
                    line-height: $lh-140;
                }
            }

            &-description,
            &-teamText {
                font-size: scaling(12);
                line-height: $lh-130;

                @include desktop--large {
                    font-size: scaling(14);
                    line-height: $lh-150;
                }

                @include desktop {
                    font-size: scaling(14);
                    line-height: $lh-150;
                }

                @include desktop--small {
                    line-height: $lh-150;
                }

                @include laptop {
                    line-height: $lh-140;
                }
            }

            &-description {
                @include desktop--large {
                    margin-top: scaling(20);
                }

                @include tablet {
                    margin-top: scaling(32);
                }

                @include mobile {
                    margin-top: scaling(8);
                }
            }

            &-team {
                @include desktop--small {
                    margin-top: scaling(40);
                }

                @include laptop {
                    margin-top: scaling(40);
                }

                @include tablet {
                    display: none;
                }

                &Text {
                    color: $c-gray;
                }
            }
        }

        &.isDisabled #{$component}-image {
            filter: grayscale(100%);
        }
    }

    &-image {
        width: scaling(80);
        height: scaling(160);
        margin-right: scaling(72);
        padding: scaling(4);
        border: 1px solid $c-black;
        border-top-left-radius: scaling(220);
        border-top-right-radius: scaling(220);
        transition: border-color $d-hover ease-in-out,
            background-color $d-hover ease-in-out;

        @include desktop--large {
            width: scaling(128);
            height: scaling(256);
            margin-right: scaling(96);
            padding: scaling(8);
        }

        @include desktop {
            width: scaling(96);
            height: scaling(192);
            padding: scaling(6);
        }

        @include desktop--small {
            margin-right: scaling(60);
        }

        @include laptop {
            margin-right: scaling(80);
        }

        @include tablet {
            width: scaling(64);
            height: scaling(128);
        }

        @include mobile {
            width: scaling(64);
            height: scaling(128);
            margin-left: scaling(16);
            margin-right: 0;
        }

        img {
            @include m-objectFit;

            width: 100%;
            height: 100%;
        }

        &Inner {
            height: 100%;
            border-top-left-radius: scaling(220);
            border-top-right-radius: scaling(220);
            overflow: hidden;
        }

        #{$component}.isConcertType &,
        #{$component}.isContestType & {
            @include mobile {
                display: none;
            }
        }
    }

    &-content {
        flex: 1;
        margin-bottom: scaling(15);
        position: relative;

        @include desktop--large {
            margin-bottom: scaling(24);
        }

        @include desktop {
            margin-bottom: scaling(21);
        }

        @include desktop--small {
            margin-bottom: scaling(16);
        }

        @include mobile {
            display: flex;
            flex-direction: column;
            margin-bottom: 0;
        }

        &Header {
            display: flex;
            margin-bottom: scaling(20);

            @include desktop--small {
                margin-bottom: scaling(16);
            }

            @include tablet {
                margin-bottom: scaling(12);
            }

            @include mobile {
                margin-bottom: scaling(4);
            }
        }

        &Inner {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            @include mobile {
                flex: 1;
            }
        }

        &Wrapper {
            width: 100%;

            @include desktop--large {
                max-width: scaling(928);
            }

            @include desktop {
                max-width: scaling(696);
            }

            @include desktop--small {
                max-width: scaling(600);
            }

            @include laptop {
                max-width: scaling(608);
            }

            @include tablet {
                max-width: scaling(464);
            }
        }
    }

    &-subtitle {
        @include l-text;

        color: $c-gray;
    }

    &-age {
        @include l-text;

        flex: 1;
        color: $c-gray;
        text-align: right;

        @include mobile {
            display: none;
        }
    }

    &-additionalTitle {
        display: none;

        @include mobile {
            display: block;
            margin-bottom: scaling(8);
        }
    }

    &-additionalTitle,
    &-title {
        color: $c-black;
        font-size: scaling(80);
        line-height: $lh-110;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        font-weight: $fw-normal;
        transition: color $d-hover ease-in-out;

        @include desktop {
            font-size: scaling(64);
        }

        @include desktop--small {
            font-size: scaling(55);
        }

        @include laptop {
            font-size: scaling(48);
        }

        @include tablet {
            font-size: scaling(44);
        }

        @include mobile {
            font-size: scaling(22);
            line-height: $lh-120;
        }
    }

    &-title {
        &.isSmallTitle {
            font-size: scaling(20);
            line-height: $lh-130;
            letter-spacing: 0.03em;

            @include desktop--large {
                font-size: scaling(36);
            }

            @include desktop {
                font-size: scaling(28);
            }

            @include desktop--small {
                font-size: scaling(24);
            }

            @include mobile {
                font-size: scaling(22);
                line-height: $lh-120;
                letter-spacing: 0.02em;
            }
        }
    }

    &-time {
        margin-top: scaling(5);
        font-size: scaling(24);
        line-height: $lh-130;
        letter-spacing: -0.02em;
        font-family: $family-graphic;
        transition: color $d-hover ease-in-out;

        @include desktop--large {
            font-size: scaling(36);
            letter-spacing: -0.01em;
        }

        @include desktop {
            font-size: scaling(28);
            letter-spacing: -0.01em;
        }

        @include desktop--small {
            line-height: $lh-110;
        }

        @include laptop {
            line-height: $lh-110;
        }

        @include tablet {
            font-size: scaling(20);
            letter-spacing: 0;
        }

        @include mobile {
            display: flex;
            align-items: flex-end;
            width: 100%;
            order: 3;
            margin-top: scaling(10);
            color: $c-red;
            font-size: scaling(14);
            letter-spacing: 0;

            #{$component}.isOneAct & {
                margin-top: scaling(41);
            }
        }
    }

    &-description {
        @include l-text;

        width: 100%;
        margin-top: scaling(16);
        color: $c-gray;

        @include desktop--large {
            margin-top: scaling(24);
        }

        @include desktop {
            margin-top: scaling(20);
        }

        @include tablet {
            margin-top: scaling(12);
            line-height: $lh-130;
        }

        @include mobile {
            margin: scaling(12) 0 scaling(36);
        }

        &::v-deep a {
            position: relative;
            z-index: 4;
            color: $c-red;
            transition: color $d-hover ease-in-out;

            @include hover {
                &:hover {
                    color: $c-black;
                }
            }
        }
    }

    &-team {
        display: flex;
        align-items: center;
        margin-top: scaling(41);

        @include desktop--large {
            margin-top: scaling(60);
        }

        @include desktop {
            margin-top: scaling(48);
        }

        @include tablet {
            margin-top: scaling(33);
        }

        @include mobile {
            display: none;
        }

        &Text {
            @include l-text;

            @include tablet {
                line-height: $lh-130;
            }

            #{$component}-team--unsetted & {
                color: $c-gray;
            }
        }

        &Icon {
            width: scaling(14);
            height: scaling(14);
            margin-left: scaling(9);
            position: relative;
            z-index: 4;

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

    &-footer {
        @include l-text;

        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-top: scaling(15);
        border-top: 1px solid $c-gray-80;

        @include desktop--large {
            margin-left: scaling(224);
        }

        @include desktop {
            margin-left: scaling(168);
            line-height: $lh-120;
        }

        @include desktop--small {
            margin-left: scaling(140);
            padding-top: scaling(14);
        }

        @include laptop {
            margin-left: scaling(160);
            padding-top: scaling(14);
        }

        @include tablet {
            margin-left: scaling(136);
            padding-top: scaling(12);
        }

        @include mobile {
            width: 100%;
            margin-top: scaling(24);
            padding-top: scaling(12);
            line-height: $lh-120;
        }

        &.isEmpty {
            justify-content: flex-end;
        }
    }

    &-sceneText,
    &-tickets,
    &-price {
        font-family: $family-graphic;
    }

    &-tickets,
    &-price {
        @include tablet {
            display: none;
        }

        @include mobile {
            display: none;
        }
    }

    &-scene {
        display: flex;
        width: scaling(180);
        color: transparent;
        transition: color $d-hover ease-in-out;

        @include desktop--large {
            width: scaling(240);
        }

        @include desktop {
            width: scaling(220);
        }

        @include mobile {
            width: auto;
            margin-right: scaling(10);
        }

        &Text {
            color: $c-black;

            @include mobile {
                color: $c-gray;
            }
        }

        svg {
            width: scaling(14);
            height: scaling(16);
            margin-right: scaling(8);
            stroke-width: 2px;
            fill: currentColor;

            @include desktop--large {
                width: scaling(18);
                height: scaling(19);
            }

            @include desktop {
                width: scaling(18);
                height: scaling(19);
                margin-right: scaling(12);
            }

            @include mobile {
                display: none;
            }
        }
    }

    &-tickets {
        width: scaling(100);

        @include desktop--large {
            width: scaling(160);
        }

        @include desktop {
            width: scaling(140);
        }
    }

    &-price {
        width: scaling(140);

        @include desktop--large {
            width: scaling(190);
        }

        @include desktop {
            width: scaling(180);
        }
    }

    &-button {
        justify-self: flex-end;
        flex-shrink: 0;
        padding: scaling(5) scaling(12);
        position: relative;
        z-index: 4;

        @include desktop--large {
            padding: scaling(8) scaling(20);
        }

        @include desktop {
            padding: scaling(6) scaling(16);
        }
    }
}
</style>
