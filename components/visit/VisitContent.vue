<template>
    <div class="VisitContent" :class="{ isClose }">
        <div class="VisitContent-panel">
            <div class="VisitContent-panelTitle" v-text="`Визит в театр`"></div>
            <div class="VisitContent-panelClose" @click="closePopup">
                <svg-icon name="icon-cross" />
            </div>
        </div>
        <transition name="change-category" mode="out-in" appear @enter="enter">
            <div v-show="isShowContent" class="VisitContent-inner">
                <div
                    class="VisitContent-number"
                    v-text="'№' + currentSection"
                ></div>
                <div class="VisitContent-titleWrapper">
                    <div
                        class="VisitContent-title"
                        v-text="innerContent.h1"
                    ></div>
                </div>
                <div
                    v-for="(item, index) in innerContent.items"
                    :key="index"
                    class="VisitContent-item"
                    :class="[
                        item.type ? `VisitContent-item--${item.type}` : ''
                    ]"
                >
                    <div class="VisitContent-itemInner">
                        <div
                            v-if="item.type === 'h2'"
                            class="VisitContent-title--large"
                            v-text="item.text"
                        ></div>
                        <div
                            v-else-if="item.type === 'h3'"
                            class="VisitContent-title--small"
                            v-text="item.text"
                        ></div>
                        <p
                            v-else-if="item.type === 'text'"
                            class="VisitContent-text"
                            v-text="item.text"
                        ></p>
                        <ol
                            v-else-if="item.type === 'list'"
                            class="VisitContent-list"
                        >
                            <li
                                v-for="(listItem, listItemIndex) in item.list"
                                :key="listItemIndex"
                                class="VisitContent-listItem"
                                v-text="listItem.text"
                            ></li>
                        </ol>
                        <div
                            v-else-if="item.type === 'columnsRow'"
                            class="VisitContent-columnsRow"
                        >
                            <div
                                v-for="(listItem, listItemIndex) in item.list"
                                :key="listItemIndex"
                                class="VisitContent-columnsRowItem"
                            >
                                <div
                                    class="VisitContent-columnsRowItemTitle"
                                    v-text="listItem.title"
                                ></div>
                                <p
                                    class="VisitContent-columnsRowItemText"
                                    v-text="listItem.text"
                                ></p>
                            </div>
                        </div>
                        <div
                            v-else-if="item.type === 'columns'"
                            class="VisitContent-columns"
                        >
                            <div
                                v-for="(listItem, listItemIndex) in item.list"
                                :key="listItemIndex"
                                class="VisitContent-columnsItem"
                            >
                                <div
                                    class="VisitContent-columnsItemTitle"
                                    v-text="listItem.title"
                                ></div>
                                <div
                                    v-for="(
                                        value, valueIndex
                                    ) in listItem.values"
                                    :key="valueIndex"
                                    class="VisitContent-columnsItemValue"
                                    v-text="value.text"
                                ></div>
                            </div>
                        </div>
                        <div
                            v-else-if="item.type === 'alert'"
                            class="VisitContent-alert"
                        >
                            <div
                                class="VisitContent-alertTitle"
                                v-text="`Важно:`"
                            ></div>
                            <p
                                class="VisitContent-alertText"
                                v-text="item.text"
                            ></p>
                        </div>
                        <div
                            v-else-if="item.type === 'image'"
                            class="VisitContent-image"
                        >
                            <picture>
                                <source
                                    :srcset="
                                        item.image +
                                        ' 1x, ' +
                                        item.image2x +
                                        ' 2x'
                                    "
                                />
                                <img :src="item.image" alt="" />
                            </picture>
                        </div>
                        <NuxtLink
                            v-else-if="item.type === 'button'"
                            :to="item.url"
                            class="VisitContent-button"
                            v-text="item.text"
                        />
                        <div
                            v-else-if="item.type === 'map'"
                            class="VisitContent-map"
                        >
                            <iframe
                                src="https://yandex.ru/map-widget/v1/?um=constructor%3A3dc30c5400cfd594ae5be3efd4ba1f1d98f1bd7f7edfe869ba7c90ccf4b4b546&amp;source=constructor"
                                frameborder="0"
                            ></iframe>
                        </div>
                    </div>
                    <div v-if="item.hint" class="VisitContent-hint">
                        <div
                            v-if="item.hint.text"
                            class="VisitContent-hintInner"
                        >
                            <div class="VisitContent-hintNote">
                                <svg-icon name="icon-note" />
                            </div>
                            <p
                                class="VisitContent-hintText"
                                v-text="item.hint.text"
                            ></p>
                        </div>
                        <div
                            v-if="item.hint.icons"
                            class="VisitContent-hintIcons"
                        >
                            <img
                                v-for="(icon, iconIndex) in item.hint.icons"
                                :key="iconIndex"
                                :src="icon.image"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <NuxtLink
                    to="/about/documents/ticket-sales-rules"
                    class="VisitContent-footerLink"
                >
                    <div
                        class="VisitContent-footerLinkText"
                        v-text="'Документ о правилах'"
                    ></div>
                    <div class="VisitContent-footerLinkIcon">
                        <svg-icon name="icon-arrow-circle" />
                    </div>
                </NuxtLink>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'VisitContent',

    props: {
        content: {
            type: Object,
            required: true
        },
        currentSection: {
            type: Number,
            required: true
        },
        isClose: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            innerContent: {}
        };
    },

    computed: {
        ...mapState('visit', ['isShowContent'])
    },

    mounted() {
        this.toggleShowContent(true);
    },

    methods: {
        closePopup() {
            this.$emit('toggle-close-popup', true);
        },

        enter() {
            this.innerContent = { ...this.content };
        },

        ...mapMutations({
            toggleShowContent: 'visit/toggleShowContent'
        })
    }
};
</script>

<style lang="scss" scoped>
@mixin mobile-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $c-white;
    overflow-y: auto;
    z-index: 999;
}

.VisitContent {
    $component: &;

    background-color: $c-white;

    @include desktop--large {
        width: (1440 * 100% / 1920);
    }

    @include desktop {
        width: (1080 * 100% / 1440);
    }

    @include desktop--small {
        width: (900 * 100% / 1200);
    }

    @include laptop {
        width: (720 * 100% / 960);
    }

    @include tablet {
        @include mobile-popup;
    }

    @include mobile {
        @include mobile-popup;
    }

    &.isClose {
        @include tablet {
            display: none;
        }

        @include mobile {
            display: none;
        }
    }

    .change-category-enter-active,
    .change-category-leave-active {
        transition: opacity $d-hover ease-in-out;

        #{$component} {
            &-number,
            &-title {
                transition: transform $d-hover ease-in-out;
            }
        }
    }

    .change-category-enter,
    .change-category-leave-to {
        opacity: 0;

        #{$component} {
            &-number,
            &-title {
                transform: translateY(scaling(25));
            }
        }
    }

    &-panel {
        position: sticky;
        top: 0;
        display: none;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid $c-gray--header;
        background-color: $c-black--header;
        z-index: 10;

        @include tablet {
            display: flex;
        }

        @include mobile {
            display: flex;
        }

        &Title {
            @include heading-label;

            color: $c-white;

            @include tablet {
                padding: scaling(22) scaling(16);
            }

            @include mobile {
                padding: scaling(14) scaling(16);
            }
        }

        &Close {
            display: flex;
            border-left: 1px solid $c-gray--header;

            @include tablet {
                padding: scaling(22);
            }

            @include mobile {
                padding: scaling(16);
            }

            svg {
                fill: $c-white;

                @include tablet {
                    width: scaling(20);
                    height: scaling(20);
                }

                @include mobile {
                    width: scaling(16);
                    height: scaling(16);
                }
            }
        }
    }

    &-inner {
        padding: scaling(56) scaling(48) scaling(140);

        @include desktop--large {
            padding: scaling(100) scaling(96) scaling(200);
        }

        @include desktop {
            padding: scaling(80) scaling(74) scaling(180);
        }

        @include desktop--small {
            padding: scaling(64) scaling(60) scaling(160);
        }

        @include mobile {
            padding: scaling(40) scaling(16) scaling(100);
        }
    }

    &-footerLink {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: scaling(15);
        border-top: 1px solid $c-gray-80;
        color: $c-gold;
        transition: color $d-hover ease-in-out;

        @include desktop--large {
            margin-top: scaling(120);
            padding-top: scaling(24);
        }

        @include desktop {
            margin-top: scaling(100);
        }

        @include desktop--small {
            margin-top: scaling(72);
        }

        @include laptop {
            margin-top: scaling(68);
        }

        @include tablet {
            margin-top: scaling(80);
            padding-top: scaling(13);
        }

        @include mobile {
            margin-top: scaling(60);
            padding-top: scaling(12);
        }

        @include hover {
            &:hover {
                color: $c-black;
            }
        }

        &Text {
            font-size: scaling(14);
            line-height: $lh-120;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: $fw-bold;

            @include desktop--large {
                font-size: scaling(20);
            }

            @include desktop {
                font-size: scaling(18);
            }
        }

        &Icon {
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

            svg {
                width: 100%;
                height: 100%;
                fill: currentColor;
            }
        }
    }

    &-number {
        @include heading-4;

        color: $c-gray;
        text-align: center;
    }

    &-title {
        @include heading-1;

        color: $c-black--header;
        text-align: center;

        &Wrapper {
            margin: scaling(20) 0 scaling(56);
            padding-bottom: scaling(40);
            border-bottom: 1px solid $c-gray-80;

            @include desktop--large {
                margin: scaling(40) 0 scaling(100);
                padding-bottom: scaling(80);
            }

            @include desktop {
                margin: scaling(32) 0 scaling(80);
                padding-bottom: scaling(64);
            }

            @include desktop--small {
                margin: scaling(24) 0 scaling(64);
                padding-bottom: scaling(48);
            }

            @include mobile {
                margin: scaling(12) 0 scaling(40);
                padding-bottom: scaling(32);
            }
        }
    }

    &-item {
        position: relative;

        &--h2 {
            margin: scaling(40) 0 scaling(20);

            @include desktop--large {
                margin: scaling(80) 0 scaling(40);
            }

            @include desktop {
                margin: scaling(64) 0 scaling(32);
            }

            @include desktop--small {
                margin: scaling(48) 0 scaling(24);
            }

            @include mobile {
                margin: scaling(40) 0 scaling(16);
            }
        }

        &--h3 {
            margin-top: scaling(20);

            @include desktop--large {
                margin-top: scaling(40);
            }

            @include desktop {
                margin-top: scaling(32);
            }

            @include desktop--small {
                margin-top: scaling(28);
            }

            @include mobile {
                margin-top: scaling(24);
            }
        }

        &--h2,
        &--text,
        &--list {
            #{$component}-itemInner {
                width: 100%;

                @include desktop--large {
                    width: scaling(928);
                }

                @include desktop {
                    width: scaling(696);
                }

                @include desktop--small {
                    width: scaling(580);
                }

                @include laptop {
                    width: scaling(560);
                }
            }
        }

        &--text {
            margin-top: scaling(12);

            @include desktop--large {
                margin-top: scaling(20);
            }

            @include desktop {
                margin-top: scaling(16);
            }
        }

        &--columns {
            margin-top: scaling(20);

            @include desktop--large {
                margin-top: scaling(40);
            }

            @include desktop {
                margin-top: scaling(32);
            }

            @include desktop--small {
                margin-top: scaling(28);
            }

            @include mobile {
                margin-top: scaling(24);
            }

            &Row {
                margin: scaling(32) 0 scaling(48);

                @include desktop--small {
                    margin: scaling(24) 0 scaling(48);
                }

                @include laptop {
                    margin: scaling(20) 0 scaling(40);
                }

                @include tablet {
                    margin: scaling(20) 0 scaling(40);
                }

                @include mobile {
                    margin: scaling(16) 0 scaling(32);
                }
            }
        }

        &--alert {
            margin: scaling(40) 0;

            @include desktop--large {
                margin: scaling(80) 0;
            }

            @include desktop {
                margin: scaling(64) 0;
            }

            @include desktop--small {
                margin: scaling(48) 0;
            }

            &:last-child {
                margin-bottom: 0;

                #{$component}-alert {
                    padding-bottom: 0;
                    border-bottom: none;
                }
            }
        }

        &--image {
            @include desktop--large {
                margin-top: scaling(80);
            }

            @include desktop {
                margin-top: scaling(64);
            }

            @include desktop--small {
                margin-top: scaling(48);
            }

            @include laptop {
                margin-top: scaling(36);
            }

            @include tablet {
                margin-top: scaling(20);
            }

            @include mobile {
                margin-top: scaling(16);
            }
        }

        &--button {
            margin-top: scaling(20);

            @include desktop--large {
                margin-top: scaling(32);
            }

            @include desktop {
                margin-top: scaling(28);
            }

            @include desktop--small {
                margin-top: scaling(24);
            }

            @include mobile {
                margin-top: scaling(16);
            }
        }

        &--map {
            margin-top: scaling(40);

            @include desktop--large {
                margin-top: scaling(80);
            }

            @include desktop {
                margin-top: scaling(64);
            }

            @include desktop--small {
                margin-top: scaling(48);
            }

            @include mobile {
                margin-top: scaling(32);
            }
        }

        &:not(#{$component}-item--alert) {
            @include tablet {
                padding: 0 scaling(56);
            }
        }
    }

    &-title {
        &--large {
            @include heading-5;
        }

        &--small {
            @include heading-7;
        }
    }

    &-text {
        @include body-1;

        color: $c-gray--header;
    }

    &-list {
        list-style-type: none;
        counter-reset: li-counter;

        &Item {
            @include body-1;

            margin-top: scaling(4);
            padding-left: scaling(62);
            position: relative;
            color: $c-gray--header;

            @include desktop--large {
                margin-top: scaling(12);
            }

            @include desktop {
                margin-top: scaling(8);
            }

            @include laptop {
                padding-left: scaling(54);
            }

            @include tablet {
                padding-left: scaling(54);
            }

            @include mobile {
                padding-left: scaling(32);
            }

            &:before {
                content: counter(li-counter) '.';
                counter-increment: li-counter;
                position: absolute;
                top: 0;
                left: 0;
                display: block;
            }

            &:first-child {
                margin-top: scaling(12);

                @include desktop--large {
                    margin-top: scaling(20);
                }

                @include desktop {
                    margin-top: scaling(16);
                }
            }
        }
    }

    &-columns {
        display: flex;

        &Item {
            &:not(:last-child) {
                margin-right: scaling(24);

                @include desktop--large {
                    margin-right: scaling(32);
                }

                @include desktop--small {
                    margin-right: scaling(20);
                }

                @include laptop {
                    margin-right: scaling(16);
                }

                @include tablet {
                    margin-right: scaling(16);
                }
            }

            &Title,
            &Value {
                @include body-1;
            }

            &Title {
                margin-bottom: scaling(12);
                color: $c-gray;

                @include desktop--large {
                    margin-bottom: scaling(20);
                }

                @include desktop {
                    margin-bottom: scaling(16);
                }

                @include mobile {
                    margin-bottom: scaling(8);
                    font-size: scaling(12);
                    line-height: $lh-130;
                }
            }

            &Value {
                &:not(:last-child) {
                    margin-bottom: scaling(8);

                    @include desktop--small {
                        margin-bottom: scaling(4);
                    }

                    @include laptop {
                        margin-bottom: scaling(4);
                    }

                    @include mobile {
                        margin-bottom: scaling(4);
                    }
                }
            }
        }

        &RowItem {
            display: flex;

            @include mobile {
                line-height: $lh-140;
            }

            &:not(:last-child) {
                margin-bottom: scaling(12);

                @include desktop--large {
                    margin-bottom: scaling(20);
                }

                @include desktop {
                    margin-bottom: scaling(17);
                }
            }

            &Title,
            &Text {
                @include body-1;
            }

            &Title {
                flex-shrink: 0;
                width: scaling(176);
                color: $c-gray;

                @include desktop--large {
                    width: scaling(288);
                }

                @include desktop {
                    width: scaling(192);
                }

                @include desktop--small {
                    width: scaling(200);
                }

                @include mobile {
                    width: scaling(112);
                }
            }

            &Text {
                width: scaling(368);
                margin-left: scaling(16);
                color: $c-gray--header;

                @include desktop--large {
                    width: scaling(608);
                    margin-left: scaling(32);
                }

                @include desktop {
                    width: scaling(480);
                    margin-left: scaling(24);
                }

                @include desktop--small {
                    width: scaling(360);
                    margin-left: scaling(20);
                }

                @include mobile {
                    width: scaling(160);
                }
            }
        }
    }

    &-alert {
        padding: scaling(32) 0 scaling(40);
        border-top: 1px solid $c-gray-80;
        border-bottom: 1px solid $c-gray-80;

        @include desktop--large {
            padding: scaling(64) 0 scaling(96);
        }

        @include desktop {
            padding: scaling(52) 0 scaling(64);
        }

        @include desktop--small {
            padding: scaling(40) 0 scaling(48);
        }

        @include mobile {
            padding: scaling(28) 0 scaling(32);
        }

        &Title {
            @include heading-7;

            margin-bottom: scaling(12);
            color: $c-red;

            @include desktop--large {
                margin-bottom: scaling(20);
            }

            @include desktop {
                margin-bottom: scaling(16);
            }
        }

        &Text {
            @include body-4;
        }
    }

    &-button {
        @include button-text;

        display: inline-flex;
        padding: scaling(4) scaling(12) scaling(5);
        border: 1px solid $c-black;
        border-radius: scaling(128);
        color: $c-black;
        text-transform: uppercase;
        transition: background-color $d-hover ease-in-out,
            color $d-hover ease-in-out;

        @include desktop--large {
            padding: scaling(8) scaling(20);
        }

        @include desktop {
            padding: scaling(6) scaling(16);
        }

        @include hover {
            &:hover {
                background-color: $c-black;
                color: $c-white;
            }
        }
    }

    &-image {
        @include desktop--large {
            width: scaling(814);
            height: scaling(376);
        }

        @include desktop {
            width: scaling(600);
            height: scaling(246);
        }

        @include desktop--small {
            width: scaling(500);
            height: scaling(213);
        }

        @include laptop {
            width: scaling(410);
            height: scaling(181);
        }

        @include tablet {
            width: scaling(410);
            height: scaling(193);
        }

        @include mobile {
            width: 100%;
            height: scaling(156);
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &-map {
        @include desktop--large {
            height: scaling(647);
        }

        @include desktop {
            height: scaling(441);
        }

        @include desktop--small {
            height: scaling(367);
        }

        @include laptop {
            height: scaling(276);
        }

        @include tablet {
            height: scaling(519);
            margin: 0 scaling(-104) scaling(-140);
        }

        @include mobile {
            height: scaling(260);
            margin: 0 scaling(-16) scaling(-100);
        }

        iframe {
            width: 100%;
            height: 100%;
        }
    }

    &-hint {
        position: relative;
        right: 0;
        width: 100%;
        margin-top: scaling(20);

        @include desktop--large {
            position: absolute;
            top: scaling(-20);
            width: scaling(256);
        }

        @include desktop {
            position: absolute;
            top: scaling(-20);
            width: scaling(192);
        }

        @include desktop--small {
            position: absolute;
            top: scaling(-20);
            width: scaling(160);
        }

        @include mobile {
            margin-top: scaling(16);
        }

        &Inner {
            display: flex;

            @include desktop--large {
                flex-direction: column;
            }

            @include desktop {
                flex-direction: column;
            }

            @include desktop--small {
                flex-direction: column;
            }
        }

        &Note {
            flex-shrink: 0;
            width: scaling(12);
            height: scaling(12);
            margin-right: scaling(20);

            @include desktop--large {
                width: scaling(16);
                height: scaling(16);
                margin-bottom: scaling(16);
            }

            @include desktop {
                width: scaling(14);
                height: scaling(14);
                margin-bottom: scaling(12);
            }

            @include desktop--small {
                margin-bottom: scaling(8);
            }

            svg {
                width: 100%;
                height: 100%;
                fill: $c-red;
            }
        }

        &Text {
            @include caption-1;

            color: $c-gray;
        }

        &Icons {
            display: flex;
            margin-top: scaling(12);

            @include desktop--large {
                margin-top: scaling(32);
            }

            @include desktop {
                margin-top: scaling(20);
            }

            @include laptop {
                margin-left: scaling(32);
            }

            @include tablet {
                margin-left: scaling(32);
            }

            @include mobile {
                margin-left: scaling(32);
            }

            img {
                height: scaling(16);
                margin-right: scaling(12);
                object-fit: cover;

                @include desktop--large {
                    height: scaling(20);
                    margin-right: scaling(20);
                }

                @include desktop {
                    height: scaling(20);
                    margin-right: scaling(16);
                }

                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
}
</style>
