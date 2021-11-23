<template>
    <div
        class="CommonPopupPoster"
        :class="[theme ? `CommonPopupPoster--${theme}` : '']"
    >
        <div class="CommonPopupPoster-subtitle" v-text="poster.subtitle"></div>
        <div class="CommonPopupPoster-inner">
            <div class="CommonPopupPoster-image">
                <div class="CommonPopupPoster-imageInner">
                    <picture v-if="poster.image">
                        <source
                            :srcset="
                                poster.image + ' 1x, ' + poster.image2x + ' 2x'
                            "
                        />
                        <img :src="poster.image" alt="" />
                    </picture>
                </div>
            </div>
            <div class="CommonPopupPoster-content">
                <div
                    class="
                        CommonPopupPoster-subtitle
                        CommonPopupPoster-subtitle--mobile
                    "
                    v-text="poster.subtitle"
                ></div>
                <div
                    class="CommonPopupPoster-title"
                    v-text="poster.title"
                ></div>
                <div
                    class="CommonPopupPoster-author"
                    v-text="poster.author"
                ></div>
            </div>
        </div>
        <div class="CommonPopupPoster-age" v-text="poster.age"></div>
    </div>
</template>

<script>
export default {
    name: 'CommonPopupPoster',

    props: {
        poster: {
            type: Object,
            required: true
        },
        theme: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonPopupPoster {
    $component: &;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 100%;

    &--performance {
        padding: scaling(36) scaling(212);

        @include desktop {
            padding: scaling(28) scaling(60);
        }

        @include desktop--small {
            padding: scaling(24) scaling(50);
        }

        @include laptop {
            padding: scaling(28) scaling(30);
        }

        @include mobile {
            padding: scaling(22) scaling(32);
        }
    }

    &--dates {
        padding: scaling(36) scaling(40);

        @include desktop {
            padding: scaling(24) scaling(48);
        }

        @include desktop--small {
            padding: scaling(28) scaling(20);
        }

        @include laptop {
            padding: scaling(20);
        }

        @include mobile {
            padding: scaling(24) scaling(16);
        }
    }

    @include tablet {
        padding: scaling(40) scaling(64) scaling(40) scaling(16);
    }

    &-image {
        flex-shrink: 0;
        width: scaling(80);
        height: scaling(160);
        padding: scaling(4);
        border: 1px solid $c-gray--header;
        border-top-left-radius: scaling(220);
        border-top-right-radius: scaling(220);

        @include tablet {
            margin-left: scaling(50);
        }

        #{$component}--performance & {
            @include desktop--large {
                width: scaling(240);
                height: scaling(480);
                padding: scaling(15);
            }

            @include desktop {
                width: scaling(200);
                height: scaling(400);
                padding: scaling(10);
            }

            @include desktop--small {
                width: scaling(150);
                height: scaling(300);
                padding: scaling(7);
            }

            @include laptop {
                width: scaling(120);
                height: scaling(240);
                padding: scaling(6);
            }
        }

        #{$component}--dates & {
            @include desktop--large {
                width: scaling(200);
                height: scaling(400);
                padding: scaling(10);
            }

            @include desktop {
                width: scaling(150);
                height: scaling(300);
                padding: scaling(7);
            }

            @include desktop--small {
                width: scaling(120);
                height: scaling(240);
                padding: scaling(6);
            }

            @include laptop {
                width: scaling(100);
                height: scaling(200);
                padding: scaling(6);
            }

            @include mobile {
                width: scaling(70);
                height: scaling(140);
                margin-left: scaling(15);
            }
        }

        &Inner {
            height: 100%;
            border-top-left-radius: scaling(220);
            border-top-right-radius: scaling(220);
            overflow: hidden;

            img {
                @include m-objectFit;

                width: 100%;
                height: 100%;
            }
        }
    }

    &-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: scaling(10) 0;
        text-align: center;

        @include tablet {
            flex-direction: row-reverse;
            align-items: flex-end;
            justify-content: space-between;
            margin: 0;
            text-align: left;
        }

        @include mobile {
            margin: 0;
        }

        #{$component}--dates & {
            @include mobile {
                flex-direction: row-reverse;
                align-items: flex-end;
                justify-content: space-between;
                text-align: left;
            }
        }
    }

    &-content {
        display: flex;
        flex-direction: column;
    }

    &-subtitle,
    &-author,
    &-age {
        color: $c-white;
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
            font-size: scaling(16);
        }

        #{$component}--dates & {
            @include mobile {
                font-size: scaling(14);
            }
        }
    }

    &-subtitle {
        @include tablet {
            order: 3;
            display: none;
            margin-top: scaling(12);
            color: $c-gray;
        }

        @include mobile {
            margin-bottom: scaling(48);
            color: $c-gray;
        }

        #{$component}--dates & {
            @include mobile {
                display: none;
            }
        }

        &--mobile {
            display: none;

            @include tablet {
                display: block;
            }

            #{$component}--dates & {
                @include mobile {
                    display: block;
                    margin-bottom: 0;
                }
            }
        }
    }

    &-title {
        margin-top: scaling(32);
        color: $c-white;
        font-size: scaling(24);
        line-height: $lh-110;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        font-feature-settings: 'ss02' on;

        @include laptop {
            letter-spacing: 0;
        }

        @include tablet {
            order: 2;
            margin-top: scaling(12);
            font-size: scaling(44);
        }

        #{$component}--performance & {
            @include desktop--large {
                margin-top: scaling(47);
                font-size: scaling(80);
            }

            @include desktop {
                font-size: scaling(64);
            }

            @include desktop--small {
                font-size: scaling(55);
            }

            @include laptop {
                margin-top: scaling(24);
            }

            @include mobile {
                margin-top: scaling(20);
            }
        }

        #{$component}--dates & {
            @include desktop--large {
                margin-top: scaling(40);
                font-size: scaling(36);
                letter-spacing: 0;
            }

            @include desktop {
                font-size: scaling(28);
                letter-spacing: 0;
            }

            @include desktop--small {
                margin-top: scaling(24);
                letter-spacing: 0;
            }

            @include laptop {
                margin-top: scaling(20);
            }

            @include mobile {
                margin-top: scaling(8);
            }
        }
    }

    &-author {
        margin-top: scaling(12);

        @include tablet {
            order: 1;
            margin-top: 0;
            color: $c-gray;
        }

        @include mobile {
            margin-top: scaling(8);
        }

        #{$component}--performance & {
            @include desktop--large {
                margin-top: scaling(16);
            }
        }

        #{$component}--dates & {
            @include desktop--large {
                margin-top: scaling(20);
            }

            @include desktop {
                margin-top: scaling(16);
            }

            @include laptop {
                margin-top: scaling(8);
            }

            @include mobile {
                color: $c-gray;
            }
        }
    }

    &-age {
        @include tablet {
            display: none;
        }

        #{$component}--performance & {
            @include mobile {
                margin-top: scaling(48);
                color: $c-gray;
            }
        }

        #{$component}--dates & {
            @include mobile {
                display: none;
            }
        }
    }
}
</style>
