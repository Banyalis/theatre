<template>
    <div class="IndexNewsFavorite">
        <div class="IndexNewsFavorite-header">
            <div
                class="IndexNewsFavorite-date"
                v-text="favorite.description"
            ></div>
            <div
                class="IndexNewsFavorite-category"
                v-text="favorite.category"
            ></div>
        </div>
        <div class="IndexNewsFavorite-inner">
            <div
                v-if="
                    favorite.kind !== 'n-0' &&
                    favorite.image &&
                    favorite.image.full
                "
                class="IndexNewsFavorite-image"
                :class="[
                    favorite.kind === 'n-1' ? 'isArch' : '',
                    favorite.kind === 'n-2' ? 'isCircle' : '',
                    favorite.kind === 'n-3' ? 'isSquare' : '',
                    favorite.kind === 'n-4' ? 'isHorizontal' : '',
                    favorite.kind === 'n-5' ? 'isVertical' : ''
                ]"
            >
                <div class="IndexNewsFavorite-imageInner">
                    <img
                        :src="favorite.image.full.image"
                        :data-srcset="
                            favorite.image.full.image +
                            ' 1x, ' +
                            favorite.image.full.image2x +
                            ' 2x'
                        "
                        :alt="favorite.title"
                    />
                </div>
            </div>
            <div class="IndexNewsFavorite-title" v-text="favorite.title"></div>
        </div>
        <div
            v-if="favorite.caption || favorite.buttons.length"
            class="IndexNewsFavorite-footer"
        >
            <div
                v-if="favorite.caption"
                class="IndexNewsFavorite-caption"
                v-text="favorite.caption"
            ></div>
            <div
                v-if="favorite.buttons.length"
                class="IndexNewsFavorite-buttons"
            >
                <RoundedButton
                    v-for="(item, index) in buttons"
                    :key="index"
                    :type="item.theme"
                    :is-black-text="item.theme === 'isWhite'"
                    :is-red-hover="item.theme === 'isWhite'"
                    :link="{
                        title: item.title,
                        url: item.url
                    }"
                    class="IndexNewsFavorite-buttonsItem"
                />
            </div>
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/other/RoundedButton';

export default {
    name: 'IndexNewsFavorite',

    components: { RoundedButton },

    props: {
        favorite: {
            type: Object,
            required: true
        }
    },

    computed: {
        buttons() {
            return this.favorite.buttons.map((button, index) => {
                return {
                    ...button,
                    title: button.text,
                    theme:
                        index === 0
                            ? this.favorite.theme_button_accent === 'white'
                                ? 'isWhite'
                                : 'isRed'
                            : 'isTransparentWhite'
                };
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.IndexNewsFavorite {
    $component: &;

    display: flex;
    flex-direction: column;
    background-color: $c-black--header;
    border-bottom: 1px solid $c-gray--header;
    color: $c-white;
    text-align: center;

    @include desktop--large {
        padding: scaling(32) scaling(96) scaling(40);
    }

    @include desktop {
        padding: scaling(24) scaling(72) scaling(32);
    }

    @include desktop--small {
        padding: scaling(20) scaling(60) scaling(28);
    }

    @include laptop {
        width: 100%;
        padding: scaling(16) scaling(192) scaling(24);
    }

    @include tablet {
        width: 100%;
        padding: scaling(16) scaling(144) scaling(24);
    }

    @include mobile {
        width: 100%;
        padding: scaling(16) scaling(32) scaling(24);
    }

    &-header {
        @include laptop {
            margin-bottom: scaling(64);
        }

        @include tablet {
            margin-bottom: scaling(64);
        }

        @include mobile {
            margin-bottom: scaling(68);
        }
    }

    &-date,
    &-category,
    &-caption {
        font-family: $family-graphic;
    }

    &-date,
    &-caption {
        font-size: scaling(14);

        @include desktop--large {
            font-size: scaling(20);
        }

        @include desktop {
            font-size: scaling(18);
        }
    }

    &-date {
        margin-bottom: scaling(4);
        line-height: $lh-130;

        @include desktop--large {
            margin-bottom: scaling(8);
        }

        @include desktop {
            margin-bottom: scaling(8);
        }
    }

    &-category {
        color: rgba($c-white, 0.5);
        font-size: scaling(12);
        line-height: $lh-150;

        @include desktop--large {
            font-size: scaling(16);
        }

        @include desktop {
            font-size: scaling(14);
        }
    }

    &-inner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
    }

    &-image {
        margin-bottom: scaling(24);

        @include desktop--large {
            margin-bottom: scaling(36);
        }

        @include desktop {
            margin-bottom: scaling(32);
        }

        @include desktop--small {
            margin-bottom: scaling(28);
        }

        &.isArch,
        &.isCircle {
            border: 1px solid $c-gray--header;
        }

        &.isArch {
            width: scaling(96);
            height: scaling(192);
            padding: scaling(6);
            border-top-left-radius: scaling(220);
            border-top-right-radius: scaling(220);

            @include desktop--large {
                width: scaling(160);
                height: scaling(320);
                padding: scaling(10);
            }

            @include desktop {
                width: scaling(124);
                height: scaling(248);
                padding: scaling(8);
            }

            @include desktop--small {
                width: scaling(120);
                height: scaling(240);
            }

            @include laptop {
                width: scaling(88);
                height: scaling(176);
            }
        }

        &.isCircle {
            width: scaling(112);
            height: scaling(112);
            padding: scaling(6);
            border-radius: 100%;

            @include desktop--large {
                width: scaling(212);
                height: scaling(212);
                padding: scaling(10);
            }

            @include desktop {
                width: scaling(156);
                height: scaling(156);
                padding: scaling(8);
            }

            @include desktop--small {
                width: scaling(140);
                height: scaling(140);
            }

            @include laptop {
                width: scaling(116);
                height: scaling(116);
            }
        }

        &.isVertical {
            width: scaling(160);
            height: scaling(220);

            @include desktop--large {
                width: scaling(264);
                height: scaling(354);
            }

            @include desktop {
                width: scaling(192);
                height: scaling(256);
            }

            @include laptop {
                width: scaling(128);
                height: scaling(176);
            }

            @include mobile {
                width: scaling(128);
                height: scaling(176);
            }
        }

        &.isHorizontal {
            width: scaling(192);
            height: scaling(128);

            @include desktop--large {
                width: scaling(384);
                height: scaling(252);
            }

            @include desktop {
                width: scaling(288);
                height: scaling(168);
            }

            @include desktop--small {
                width: scaling(240);
                height: scaling(154);
            }

            @include tablet {
                width: scaling(224);
                height: scaling(144);
            }
        }

        &.isSquare {
            width: scaling(128);
            height: scaling(128);

            @include desktop--large {
                width: scaling(252);
                height: scaling(252);
            }

            @include desktop {
                width: scaling(168);
                height: scaling(168);
            }

            @include desktop--small {
                width: scaling(154);
                height: scaling(154);
            }

            @include tablet {
                width: scaling(144);
                height: scaling(144);
            }
        }

        &Inner {
            width: 100%;
            height: 100%;

            #{$component}-image.isArch &,
            #{$component}-image.isCircle & {
                overflow: hidden;
            }

            #{$component}-image.isArch & {
                border-top-left-radius: scaling(220);
                border-top-right-radius: scaling(220);
            }

            #{$component}-image.isCircle & {
                border-radius: 100%;
            }
        }

        img {
            @include m-objectFit;

            width: 100%;
            height: 100%;
        }
    }

    &-title {
        line-height: $lh-110;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            font-size: scaling(60);
            line-height: $lh-130;
        }

        @include desktop {
            font-size: scaling(48);
            line-height: $lh-120;
            letter-spacing: 0;
        }

        @include desktop--small {
            font-size: scaling(42);
            letter-spacing: 0;
        }

        @include laptop {
            font-size: scaling(36);
        }

        @include tablet {
            font-size: scaling(32);
        }

        @include mobile {
            font-size: scaling(20);
            line-height: $lh-120;
        }
    }

    &-footer {
        @include laptop {
            margin-top: scaling(80);
        }

        @include tablet {
            margin-top: scaling(80);
        }

        @include mobile {
            margin-top: scaling(88);
        }
    }

    &-caption {
        margin-bottom: scaling(20);
        line-height: $lh-160;

        @include desktop--large {
            margin-bottom: scaling(32);
            line-height: $lh-150;
        }

        @include desktop {
            margin-bottom: scaling(20);
        }

        @include tablet {
            line-height: $lh-150;
        }

        @include mobile {
            padding: 0 scaling(16);
        }
    }

    &-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: scaling(-8);

        @include desktop--large {
            margin-bottom: scaling(-12);
        }

        @include desktop {
            margin-bottom: scaling(-12);
        }

        &Item {
            margin: 0 scaling(4) scaling(8);

            @include desktop--large {
                margin: 0 scaling(6) scaling(12);
            }

            @include desktop {
                margin: 0 scaling(6) scaling(12);
            }
        }
    }
}
</style>
