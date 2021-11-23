<template>
    <div class="PosterBroadcasts">
        <div class="PosterBroadcasts-header">
            <p
                class="PosterBroadcasts-headerText"
                v-text="content.header.text"
            ></p>
        </div>
        <div class="PosterBroadcasts-sidebar">
            <div class="PosterBroadcasts-advertising">
                <div
                    v-for="(item, index) in content.advertising"
                    :key="index"
                    class="PosterBroadcasts-advertisingItem"
                >
                    <div
                        class="PosterBroadcasts-advertisingItemTitle"
                        v-text="item.title"
                    ></div>
                    <p
                        class="PosterBroadcasts-advertisingItemText"
                        v-text="item.text"
                    ></p>
                </div>
            </div>
            <div ref="slider" class="PosterBroadcasts-info swiper-container">
                <div
                    ref="sliderInner"
                    class="PosterBroadcasts-infoInner swiper-wrapper"
                >
                    <div
                        v-for="(item, index) in content.info"
                        :key="index"
                        ref="sliderItem"
                        class="PosterBroadcasts-infoItem swiper-slide"
                    >
                        <div
                            class="PosterBroadcasts-infoItemTitle"
                            v-text="item.title"
                        ></div>
                        <RoundedButton
                            v-if="item.button"
                            :link="{
                                url: item.button.url,
                                title: item.button.title,
                                isExternal: true
                            }"
                            type="isTransparentBlack"
                            class="PosterBroadcasts-infoItemButton"
                        />
                        <div
                            v-if="item.hint"
                            class="PosterBroadcasts-infoItemHint"
                            v-text="item.hint"
                        ></div>
                    </div>
                </div>
                <div
                    ref="sliderPagination"
                    class="PosterBroadcasts-infoPagination swiper-pagination"
                ></div>
            </div>
        </div>
        <div class="PosterBroadcasts-catalog">
            <div
                v-for="(catalogItem, catalogItemIndex) in content.catalog"
                :key="catalogItemIndex"
                class="PosterBroadcasts-catalogItem"
            >
                <div
                    ref="year"
                    class="PosterBroadcasts-catalogItemYear"
                    v-text="catalogItem.year"
                ></div>
                <div
                    v-for="(item, index) in catalogItem.items"
                    :key="index"
                    class="PosterBroadcasts-catalogItemCard"
                    :class="[item.disabled ? `isDisabled` : '']"
                >
                    <div class="PosterBroadcasts-catalogItemCardSidebar">
                        <div
                            class="PosterBroadcasts-catalogItemCardDate"
                            v-text="item.sidebar.date"
                        ></div>
                        <div
                            class="PosterBroadcasts-catalogItemCardStatus"
                            v-text="item.sidebar.status"
                        ></div>
                    </div>
                    <div class="PosterBroadcasts-catalogItemCardContent">
                        <PosterCard :item="item" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { isMobile } from '@/utils/utils';
import { Swiper, Pagination } from 'swiper';
import RoundedButton from '@/components/other/RoundedButton';
import PosterCard from '~/components/poster/PosterCard';

Swiper.use([Pagination]);

export default {
    name: 'PosterBroadcasts',

    components: {
        RoundedButton,
        PosterCard
    },

    props: {
        content: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            swiper: undefined
        };
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            this.headerHeight = document.querySelector('.Header').offsetHeight;

            this.$refs.year.forEach((item) => {
                item.style.top = `${this.headerHeight}px`;
            });

            this.initSwiper();
        },

        initSwiper() {
            if (isMobile() && this.swiper === undefined) {
                this.swiper = new Swiper(this.$refs.slider, {
                    slidesPerView: 1,
                    autoHeight: true,
                    loop: true,
                    pagination: {
                        el: this.$refs.sliderPagination,
                        clickable: true
                    }
                });
            } else if (!isMobile() && this.swiper !== undefined) {
                this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.sliderInner.removeAttribute('style');
                this.$refs.sliderItem[0].removeAttribute('style');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@mixin l-sidebar--desktop {
    position: absolute;
    top: 0;
    right: 0;
}

@mixin l-text--large {
    font-size: scaling(20);
    line-height: $lh-130;
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
}

@mixin l-text--medium {
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

@mixin l-text--small {
    color: $c-gray;
    font-size: scaling(12);
    line-height: $lh-150;
    font-family: $family-graphic;

    @include desktop--large {
        font-size: scaling(14);
        line-height: $lh-120;
    }

    @include desktop {
        font-size: scaling(14);
    }

    @include laptop {
        line-height: $lh-140;
    }

    @include tablet {
        line-height: $lh-130;
    }

    @include mobile {
        line-height: $lh-130;
    }
}

.PosterBroadcasts {
    $component: &;

    position: relative;

    &-header,
    &-catalog {
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
    }

    &-header {
        padding: scaling(20) scaling(16) scaling(64);
        border-bottom: 1px solid $c-black;

        @include desktop--large {
            padding: scaling(36) scaling(32) scaling(128);
            border-bottom: none;
        }

        @include desktop {
            padding: scaling(28) scaling(24) scaling(96);
            border-bottom: none;
        }

        @include desktop--small {
            padding: scaling(24) scaling(20) scaling(80);
            border-bottom: none;
        }

        &Text {
            @include l-text--large;

            @include desktop--large {
                width: scaling(1088);
            }

            @include desktop {
                width: scaling(816);
            }

            @include desktop--small {
                width: scaling(680);
            }

            @include laptop {
                width: scaling(448);
            }

            @include tablet {
                width: scaling(544);
            }
        }
    }

    &-sidebar {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        @include desktop--large {
            @include l-sidebar--desktop;

            width: (480 * 100% / 1920);
        }

        @include desktop {
            @include l-sidebar--desktop;

            width: (360 * 100% / 1440);
        }

        @include desktop--small {
            @include l-sidebar--desktop;

            width: (300 * 100% / 1200);
        }
    }

    &-advertisingItem,
    &-infoItem {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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

        &Title {
            @include l-text--medium;

            flex: 1;

            @include desktop--large {
                margin-bottom: scaling(64);
            }

            @include desktop {
                margin-bottom: scaling(48);
            }

            @include desktop--small {
                margin-bottom: scaling(40);
            }

            @include mobile {
                color: $c-gray;
                line-height: $lh-140;
            }
        }
    }

    &-advertising {
        @include laptop {
            width: (323 * 100% / 960);
            border-right: 1px solid $c-black;
        }

        @include tablet {
            width: (257 * 100% / 768);
            border-right: 1px solid $c-black;
        }

        @include mobile {
            padding: 0 scaling(16);
        }

        &Item {
            @include laptop {
                &:first-child {
                    height: scaling(160);
                }

                &:last-child {
                    height: scaling(197);
                }
            }

            @include tablet {
                &:first-child {
                    height: scaling(160);
                }

                &:last-child {
                    height: scaling(197);
                }
            }

            @include mobile {
                padding: scaling(24) 0;
            }

            &:not(:first-child) {
                border-top: 1px solid $c-black;

                @include mobile {
                    border-color: #e3e3e3;
                }
            }

            &Title {
                @include mobile {
                    margin-bottom: scaling(4);
                }
            }

            &Text {
                @include l-text--large;

                @include mobile {
                    font-size: scaling(14);
                }
            }
        }
    }

    &-info {
        border-bottom: 1px solid $c-black;

        @include laptop {
            width: (637 * 100% / 960);
            border-bottom: none;
        }

        @include tablet {
            width: (511 * 100% / 768);
            border-bottom: none;
        }

        @include mobile {
            border-top: 1px solid $c-black;
            border-bottom: none;
        }

        &Inner {
            display: flex;
            flex-wrap: wrap;
            height: auto;

            @include mobile {
                flex-wrap: nowrap;
            }
        }

        &Item {
            border-top: 1px solid $c-black;

            @include laptop {
                width: 50%;

                &:first-child {
                    width: 100%;
                    height: scaling(160);
                    border-top: none;
                }

                &:nth-child(2n) {
                    border-right: 1px solid $c-black;
                }

                &:not(:first-child) {
                    height: scaling(197);
                }
            }

            @include tablet {
                width: 50%;

                &:first-child {
                    width: 100%;
                    height: scaling(160);
                    border-top: none;
                }

                &:nth-child(2n) {
                    border-right: 1px solid $c-black;
                }

                &:not(:first-child) {
                    height: scaling(197);
                }
            }

            @include mobile {
                flex-shrink: 0;
                padding: scaling(24) scaling(16) scaling(44);
                border-top: none;
            }

            &Title {
                @include mobile {
                    margin-bottom: scaling(16);
                }
            }

            &Button {
                padding: scaling(5) scaling(12);

                @include desktop--large {
                    padding: scaling(8) scaling(20);
                }

                @include desktop {
                    padding: scaling(6) scaling(16);
                }
            }

            &Hint {
                @include l-text--small;

                margin-top: scaling(12);

                @include desktop--large {
                    margin-top: scaling(20);
                }
            }
        }

        &Pagination {
            display: none;
            margin: 0 0 scaling(24) scaling(16);

            @include mobile {
                display: flex;
            }

            &::v-deep .swiper-pagination-bullet {
                width: scaling(8);
                height: scaling(8);
                border-radius: 100%;
                background-color: #ececec;
                cursor: pointer;
                transition: background-color $d-hover ease-in-out;

                &:not(:last-child) {
                    margin-right: scaling(8);
                }

                &.swiper-pagination-bullet-active {
                    background-color: $c-red;
                }
            }
        }
    }

    &-catalogItem {
        &Year {
            position: sticky;
            padding: scaling(32) scaling(32) scaling(16);
            border-top: 1px solid $c-black;
            border-bottom: 1px solid $c-black;
            background-color: $c-gray-95;
            z-index: 10;
            font-size: scaling(14);
            line-height: $lh-120;
            letter-spacing: 0.05em;
            text-align: center;
            font-feature-settings: 'ss02' on;

            @include desktop--large {
                padding: scaling(64) scaling(64) scaling(32);
                font-size: scaling(20);
            }

            @include desktop {
                padding: scaling(48) scaling(48) scaling(24);
                font-size: scaling(18);
            }

            @include desktop--small {
                padding: scaling(40) scaling(40) scaling(20);
            }

            @include mobile {
                padding: scaling(36) scaling(36) scaling(17);
            }
        }

        &Card {
            display: flex;
            flex-wrap: wrap;

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
                padding: scaling(20) scaling(16);
            }

            @include tablet {
                padding: scaling(24) scaling(16);
            }

            @include mobile {
                padding: scaling(32) scaling(16);
            }

            &:not(:last-child) {
                border-bottom: 1px solid $c-black;
            }

            &.isDisabled #{$component}-catalogItemCard {
                &Date {
                    color: $c-gray;
                }

                &Status {
                    color: $c-red;
                }
            }

            &Sidebar {
                width: scaling(160);
                margin-right: scaling(32);

                @include desktop--large {
                    width: scaling(256);
                    margin-right: scaling(60);
                }

                @include desktop {
                    width: scaling(216);
                    margin-right: scaling(22);
                }

                @include desktop--small {
                    width: scaling(180);
                }

                @include mobile {
                    width: 100%;
                    margin-right: 0;
                    text-align: center;
                }
            }

            &Date {
                @include l-text--medium;

                margin-bottom: scaling(4);
                color: $c-red;
            }

            &Status {
                @include l-text--small;

                @include desktop--large {
                    line-height: $lh-150;
                }

                @include tablet {
                    line-height: $lh-120;
                }
            }

            &Content {
                flex: 1;

                @include mobile {
                    flex: auto;
                    width: 100%;
                }
            }
        }
    }
}
</style>
