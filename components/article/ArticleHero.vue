<template>
    <div class="ArticleHero" :class="[type, { isPoster }]">
        <div class="ArticleHero-wrapper">
            <div class="ArticleHero-info">
                <div class="ArticleHero-infoLabel" v-text="'Новости'"></div>
                <div class="ArticleHero-infoCenter">
                    <div v-if="poster" class="ArticleHero-infoPoster">
                        <div
                            class="ArticleHero-infoPosterImage isAspect"
                            :class="[poster.align]"
                        >
                            <div class="ArticleHero-infoPosterImageInner">
                                <picture>
                                    <source
                                        :srcset="
                                            poster.image +
                                            ' 1x, ' +
                                            poster.image2x +
                                            ' 2x'
                                        "
                                    />
                                    <img :src="poster.image" :alt="title" />
                                </picture>
                            </div>
                        </div>
                    </div>
                    <!--  eslint-disable-next-line  -->
                    <div class="ArticleHero-infoTitle" v-html="title"></div>
                </div>
                <div class="ArticleHero-infoFooter">
                    <div
                        class="ArticleHero-infoCategory"
                        v-text="category"
                    ></div>
                    <div
                        v-if="!hideDate"
                        class="ArticleHero-infoDate"
                        v-text="date"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArticleHero',

    props: {
        type: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        poster: {
            type: Object,
            default: () => {}
        },
        hideDate: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        isPoster() {
            return !!this.poster;
        }
    }
};
</script>

<style lang="scss" scoped>
.ArticleHero {
    $component: &;

    width: 100%;
    position: relative;
    background: $c-black--header;

    &-wrapper {
        width: 100%;
        position: relative;
        display: flex;
        align-items: stretch;
        justify-content: flex-end;
        min-height: scaling(704);

        @include desktop {
            min-height: scaling(528);
        }

        @include desktop--small {
            min-height: scaling(440);
        }

        @include laptop {
            min-height: scaling(400);
        }

        @include tablet {
            min-height: 0;
        }

        @include mobile {
            min-height: 0;
        }
    }

    &-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: scaling(36) 0;
        color: $c-white;

        #{$component}.isPoster & {
            width: (1152 * 100% / 1920);

            @include tablet {
                width: 100%;
                justify-content: flex-start;
            }

            @include mobile {
                width: 100%;
                justify-content: flex-start;
            }
        }

        &Label {
            @include text;

            text-align: center;
        }

        &Center {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;

            @include tablet {
                position: relative;
                width: 100%;
                margin: scaling(67) 0;
            }

            @include mobile {
                position: relative;
                width: 100%;
                margin: scaling(60) 0;
            }
        }

        &Poster {
            position: absolute;
            left: 0;
            top: 0;
            border-right: 1px solid $c-gray--header;
            width: (768 * 100% / 1920);
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            @include tablet {
                position: relative;
                width: 100%;
                height: auto;
                margin-bottom: scaling(40);
            }

            @include mobile {
                position: relative;
                width: 100%;
                height: auto;
                margin-bottom: scaling(28);
            }

            &Image {
                &.isAspect {
                    width: scaling(576);
                    height: scaling(472);

                    @include desktop {
                        width: scaling(432);
                        height: scaling(352);
                    }

                    @include desktop--small {
                        width: scaling(360);
                        height: scaling(296);
                    }

                    @include laptop {
                        width: scaling(288);
                        height: scaling(232);
                    }

                    @include tablet {
                        width: scaling(384);
                        height: scaling(314);
                    }

                    @include mobile {
                        width: scaling(224);
                        height: scaling(188);
                    }
                }

                &.horizontal {
                    width: scaling(384 * 1.5);
                    height: scaling(252 * 1.5);

                    @include desktop {
                        width: scaling(288 * 1.5);
                        height: scaling(168 * 1.5);
                    }

                    @include desktop--small {
                        width: scaling(240 * 1.5);
                        height: scaling(154 * 1.5);
                    }

                    @include laptop {
                        width: scaling(192 * 1.5);
                        height: scaling(128 * 1.5);
                    }

                    @include tablet {
                        width: scaling(384);
                        height: scaling(284);
                    }

                    @include mobile {
                        width: scaling(224);
                        height: scaling(136);
                    }
                }

                &.vertical {
                    width: scaling(264 * 1.5);
                    height: scaling(354 * 1.5);

                    @include desktop {
                        width: scaling(192 * 1.5);
                        height: scaling(256 * 1.5);
                    }

                    @include desktop--small {
                        width: scaling(160 * 1.5);
                        height: scaling(220 * 1.5);
                    }

                    @include laptop {
                        width: scaling(128 * 1.5);
                        height: scaling(176 * 1.5);
                    }

                    @include tablet {
                        width: scaling(228);
                        height: scaling(314);
                    }

                    @include mobile {
                        width: scaling(140);
                        height: scaling(188);
                    }
                }

                &.horizontal,
                &.vertical {
                    img {
                        @include m-objectFit($size: contain, $position: center);
                    }
                }

                #{$component}.performance & {
                    border: 1px solid $c-gray--header;
                    border-top-left-radius: scaling(220);
                    border-top-right-radius: scaling(220);

                    @include desktop--large {
                        width: scaling(240);
                        height: scaling(480);
                        padding: scaling(12);
                    }

                    @include desktop {
                        width: scaling(200);
                        height: scaling(400);
                        padding: scaling(10);
                    }

                    @include desktop--small {
                        width: scaling(150);
                        height: scaling(300);
                        padding: scaling(8);
                    }

                    @include laptop {
                        width: scaling(120);
                        height: scaling(240);
                        padding: scaling(6);
                    }

                    @include tablet {
                        width: scaling(120);
                        height: scaling(240);
                        padding: scaling(6);
                    }

                    @include mobile {
                        width: scaling(80);
                        height: scaling(160);
                        padding: scaling(4);
                    }

                    &Inner {
                        border-top-left-radius: scaling(220);
                        border-top-right-radius: scaling(220);
                    }
                }

                #{$component}.people & {
                    border: 1px solid $c-gray--header;
                    border-radius: 100%;

                    @include desktop--large {
                        width: scaling(432);
                        height: scaling(432);
                        padding: scaling(16);
                    }

                    @include desktop {
                        width: scaling(324);
                        height: scaling(324);
                        padding: scaling(12);
                    }

                    @include desktop--small {
                        width: scaling(270);
                        height: scaling(270);
                        padding: scaling(10);
                    }

                    @include laptop {
                        width: scaling(216);
                        height: scaling(216);
                        padding: scaling(8);
                    }

                    @include tablet {
                        width: scaling(216);
                        height: scaling(216);
                        padding: scaling(8);
                    }

                    @include mobile {
                        width: scaling(176);
                        height: scaling(176);
                        padding: scaling(6);
                    }

                    &Inner {
                        border-radius: 100%;
                    }
                }

                &Inner {
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                }

                img {
                    @include m-objectFit(contain);

                    width: 100%;
                    height: 100%;
                }
            }
        }

        &Title {
            @include heading-2;

            text-align: center;
            margin: scaling(36) 0;
            width: (768 * 100% / 1152);
            max-width: scaling(768);
            white-space: pre-line;

            @include desktop {
                width: (624 * 100% / 824);
                max-width: scaling(624);
            }

            @include desktop--small {
                width: (520 * 100% / 720);
                max-width: scaling(520);
            }

            @include laptop {
                width: (480 * 100% / 576);
                max-width: scaling(480);
            }

            @include tablet {
                width: (512 * 100% / 768);
                max-width: scaling(512);
                margin: 0;
            }

            @include mobile {
                width: (256 * 100% / 320);
                max-width: scaling(256);
                margin: 0;
            }
        }

        &Footer {
            width: 100%;
            display: flex;
            justify-content: center;
        }

        &Category,
        &Date {
            @include text;
        }

        &Date {
            margin-left: scaling(16);

            @include desktop--large {
                margin-left: scaling(24);
            }

            @include desktop {
                margin-left: scaling(20);
            }
        }
    }
}
</style>
