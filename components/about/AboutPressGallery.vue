<template>
    <div class="AboutPressGallery">
        <div
            v-if="gallery.title"
            class="AboutPressGallery-heading"
            v-text="gallery.title"
        ></div>
        <div v-if="gallery.items" ref="grid" class="AboutPressGallery-items">
            <div class="AboutPressGallery-dividers">
                <div class="AboutPressGallery-divider"></div>
                <div class="AboutPressGallery-divider"></div>
                <div class="AboutPressGallery-divider"></div>
                <div class="AboutPressGallery-divider"></div>
                <div class="AboutPressGallery-divider"></div>
            </div>
            <a
                v-for="(item, index) in gallery.items"
                :key="index"
                :href="`/archives/press/${item.title}.zip`"
                download
                class="AboutPressGallery-item b-scaled-paddings"
            >
                <div
                    class="AboutPressGallery-itemTitle"
                    v-text="item.title"
                ></div>
                <div
                    class="AboutPressGallery-itemImage"
                    :class="{ isSmall: item.small }"
                >
                    <picture>
                        <source
                            :srcset="
                                item.image + ' 1x, ' + item.image2x + ' 2x'
                            "
                        />
                        <img :src="item.image" alt="" @load="onImageLoaded" />
                    </picture>
                </div>
                <div class="AboutPressGallery-itemSize">
                    <div class="AboutPressGallery-itemSizeIcon">
                        <svg-icon name="icon-download" />
                    </div>
                    <div
                        class="AboutPressGallery-itemSizeText"
                        v-text="item.size"
                    ></div>
                </div>
            </a>
        </div>
        <!-- <button class="AboutPressGallery-load b-scaled-paddings">
            Загрузить еще
        </button> -->
    </div>
</template>

<script>
export default {
    name: 'AboutPressGallery',

    props: {
        gallery: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            masonry: undefined,
            loadedImagesCount: 0
        };
    },

    mounted() {
        this.$nextTick(this.initMasonry);
    },

    methods: {
        initMasonry() {
            this.masonry = new this.$masonry(this.$refs.grid, {
                percentPosition: true,
                stagger: 0,
                transitionDuration: 30,
                itemSelector: '.AboutPressGallery-item'
            });
        },

        onImageLoaded() {
            this.loadedImagesCount++;

            if (this.loadedImagesCount >= this.gallery.items.length) {
                this.masonry.reloadItems();
                this.masonry.layout();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutPressGallery {
    $component: &;

    background-color: $c-black--header;

    &-heading {
        @include text--button;

        padding-top: scaling(32);
        padding-bottom: scaling(16);
        text-align: center;
        color: $c-white;
        border-bottom: 1px solid $c-gray--header;
        border-top: 1px solid $c-gray--header;

        @include desktop--large {
            padding-top: scaling(64);
            padding-bottom: scaling(32);
        }

        @include desktop {
            padding-top: scaling(48);
            padding-bottom: scaling(24);
        }

        @include desktop--small {
            padding-top: scaling(40);
            padding-bottom: scaling(20);
        }
    }

    &-items {
        position: relative;
        border-bottom: 1px solid $c-gray--header;
    }

    &-item {
        width: calc(100% / 5);
        padding-top: scaling(36);
        padding-bottom: scaling(36);
        //box-shadow: 0 0 0 1px $c-gray--header;

        &:before {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: $c-gray--header;
        }

        @include desktop--large {
            padding-top: scaling(48);
            padding-bottom: scaling(48);
        }

        @include desktop {
            padding-top: scaling(40);
            padding-bottom: scaling(40);
        }

        @include laptop {
            width: calc(100% / 3);
        }

        @include tablet {
            width: calc(100% / 2);
        }

        @include mobile {
            width: 100%;
        }

        @include hover {
            &:hover #{$component}-itemTitle {
                color: $c-gold;
            }
        }

        &Title {
            @include text;

            margin-bottom: scaling(16);
            color: $c-white;
            transition: color $d-hover ease-in-out;

            @include desktop--large {
                margin-bottom: scaling(28);
            }

            @include desktop {
                margin-bottom: scaling(20);
            }
        }

        &Size {
            display: flex;
            align-items: center;
            margin-top: scaling(15);

            @include desktop--large {
                margin-top: scaling(30);
            }

            @include desktop {
                margin-top: scaling(25);
            }

            &Icon {
                display: flex;
                margin-right: scaling(8);

                svg {
                    width: scaling(16);
                    height: scaling(16);

                    @include desktop--large {
                        width: scaling(20);
                        height: scaling(20);
                    }

                    @include desktop {
                        width: scaling(18);
                        height: scaling(18);
                    }

                    @include desktop--small {
                        width: scaling(18);
                        height: scaling(18);
                    }
                }
            }

            &Text {
                @include button-text;

                color: $c-gold;
            }
        }

        &Image {
            width: 100%;
            // height: scaling(448);

            // @include desktop {
            //     height: scaling(432);
            // }

            // @include desktop--small {
            //     height: scaling(360);
            // }

            // @include laptop {
            //     height: scaling(398);
            // }

            // @include tablet {
            //     height: scaling(480);
            // }

            // @include mobile {
            //     height: scaling(398);
            // }

            // &.isSmall {
            //     height: scaling(224);

            //     @include desktop {
            //         height: scaling(216);
            //     }

            //     @include desktop--small {
            //         height: scaling(180);
            //     }

            //     @include laptop {
            //         height: scaling(199);
            //     }

            //     @include tablet {
            //         height: scaling(240);
            //     }

            //     @include mobile {
            //         height: scaling(200);
            //     }
            // }

            img {
                @include m-objectFit();

                width: 100%;
                height: 100%;
            }
        }
    }

    &-load {
        @include text--button;

        width: 100%;
        text-align: center;
        color: $c-white;
        padding-top: scaling(22);
        padding-bottom: scaling(22);

        @include desktop--large {
            padding-top: scaling(36);
            padding-bottom: scaling(36);
        }

        @include desktop {
            padding-top: scaling(24);
            padding-bottom: scaling(24);
        }

        @include desktop--small {
            padding-top: scaling(20);
            padding-bottom: scaling(20);
        }

        @include mobile {
            padding-top: scaling(14);
            padding-bottom: scaling(14);
        }
    }

    &-dividers {
        width: 100%;
        height: 100%;
        display: flex;
    }

    &-divider {
        width: calc(100% / 5);
        height: 100%;
        border-right: 1px solid $c-gray--header;

        &:last-child {
            border-right: none;
        }

        @include laptop {
            width: calc(100% / 3);

            &:nth-child(1),
            &:nth-child(2) {
                display: none;
            }
        }

        @include tablet {
            width: calc(100% / 2);

            &:nth-child(1),
            &:nth-child(2),
            &:nth-child(3) {
                display: none;
            }
        }

        @include mobile {
            display: none;
        }
    }
}
</style>
