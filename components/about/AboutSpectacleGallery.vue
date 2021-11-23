<template>
    <div ref="grid" class="AboutSpectacleGallery">
        <div class="AboutSpectacleGallery-dividers">
            <div class="AboutSpectacleGallery-divider"></div>
            <div class="AboutSpectacleGallery-divider"></div>
            <div class="AboutSpectacleGallery-divider"></div>
        </div>
        <div
            v-for="(item, index) in gallery"
            :key="index"
            class="AboutSpectacleGallery-card b-scaled-paddings"
        >
            <div
                class="AboutSpectacleGallery-cardImage"
                :class="{ isSmall: item.small }"
            >
                <picture>
                    <img :src="item.image" alt="" />
                </picture>
            </div>
            <div
                v-if="item.caption"
                class="AboutSpectacleGallery-cardTitle"
                v-text="item.caption"
            ></div>
            <NuxtLink
                v-if="item.link"
                :to="item.link"
                class="AboutSpectacleGallery-cardLink"
            >
                <div class="AboutSpectacleGallery-cardLinkIcon">
                    <svg-icon name="icon-download" />
                </div>
                <div
                    v-if="item.size"
                    class="AboutSpectacleGallery-cardLinkSize"
                    v-text="item.size"
                ></div>
            </NuxtLink>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutSpectacleGallery',

    props: {
        gallery: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            masonry: undefined
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
                itemSelector: '.AboutSpectacleGallery-card'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutSpectacleGallery {
    position: relative;

    &-card {
        padding-top: scaling(16);
        padding-bottom: scaling(20);
        width: 100%;
        background-color: $c-black;

        &:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: $c-gray--header;
        }

        @include desktop--large {
            padding-top: scaling(32);
            padding-bottom: scaling(38);
            width: (480 * 100%) / 1440;
        }

        @include desktop {
            padding-top: scaling(24);
            padding-bottom: scaling(30);
            width: (360 * 100%) / 1080;
        }

        @include desktop--small {
            padding-top: scaling(20);
            padding-bottom: scaling(24);
            width: (300 * 100%) / 900;
        }

        @include laptop {
            width: (320 * 100%) / 960;
        }

        @include tablet {
            width: (384 * 100%) / 768;
        }

        &Image {
            width: 100%;
            margin-bottom: scaling(16);
            height: scaling(384);

            @include desktop--large {
                height: scaling(576);
                margin-bottom: scaling(28);
            }

            @include desktop {
                height: scaling(432);
                margin-bottom: scaling(20);
            }

            @include desktop--small {
                height: scaling(380);
            }

            @include tablet {
                height: scaling(480);
            }

            &.isSmall {
                height: scaling(192);

                @include desktop--large {
                    height: scaling(288);
                }

                @include desktop {
                    height: scaling(216);
                }

                @include tablet {
                    height: scaling(240);
                }
            }

            img {
                @include m-objectFit();

                width: 100%;
                height: 100%;
            }
        }

        &Title {
            @include caption-1;

            color: $c-white;
            margin-bottom: scaling(12);
            white-space: pre-line;

            @include desktop--large {
                margin-bottom: scaling(16);
            }
        }

        &Link {
            display: flex;
            align-items: center;

            &Icon {
                margin-right: scaling(8);
                display: flex;

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

            &Size {
                @include button-text;

                color: $c-gold;
            }
        }
    }

    &-dividers {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
        z-index: $z-one;
    }

    &-divider {
        height: 100%;
        border-right: 1px solid $c-gray--header;
        width: 100%;

        &:last-child {
            border-right: none;
        }

        @include desktop--large {
            width: (480 * 100%) / 1440;
        }

        @include desktop {
            width: (360 * 100%) / 1080;
        }

        @include desktop--small {
            width: (300 * 100%) / 900;
        }

        @include laptop {
            width: (320 * 100%) / 960;
        }

        @include tablet {
            width: (384 * 100%) / 768;

            &:nth-child(1) {
                display: none;
            }
        }

        @include mobile {
            display: none;
        }
    }
}
</style>
