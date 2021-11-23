<template>
    <div
        class="NewsItem"
        :class="[item.type, item.theme ? item.theme : '', { isTheme }]"
    >
        <HiddenLink :url="item.url" />
        <div class="NewsItem-wrapper">
            <div
                v-if="!item.hideDate"
                class="NewsItem-date"
                v-text="item.date"
            ></div>
            <div class="NewsItem-category" v-text="item.category"></div>
            <div
                v-if="item.preview && !isTheme"
                class="NewsItem-image"
                :class="[item.preview.align]"
            >
                <div class="NewsItem-imageInner">
                    <picture>
                        <source
                            :srcset="
                                item.preview.image +
                                ' 1x, ' +
                                item.preview.image2x +
                                ' 2x'
                            "
                        />
                        <img :src="item.preview.image" :alt="item.title" />
                    </picture>
                </div>
            </div>
            <div class="NewsItem-title" v-text="item.title"></div>
            <div
                v-if="item.text"
                class="NewsItem-text"
                v-text="item.text"
            ></div>
            <div v-if="isTheme" class="NewsItem-buttons">
                <div
                    v-for="(button, index) in item.buttons"
                    :key="index"
                    class="NewsItem-button"
                >
                    <RoundedButton
                        :type="
                            getCurrentButtonTheme(button.isPrimary, item.theme)
                        "
                        :link="{
                            url: button.url,
                            title: button.title,
                            isExternal: button.isExternal
                        }"
                        :is-white-hover="item.theme === 'black'"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/other/RoundedButton';
import HiddenLink from '~/components/common/HiddenLink';

export default {
    name: 'NewsItem',

    components: { RoundedButton, HiddenLink },

    props: {
        item: {
            type: Object,
            required: true
        }
    },

    computed: {
        isTheme() {
            return !!this.item.theme;
        }
    },

    methods: {
        getCurrentButtonTheme(isPrimary, theme) {
            const color = theme === 'black' ? 'Red' : 'White';
            return `is${!isPrimary ? 'Transparent' : ''}${color}`;
        }
    }
};
</script>

<style lang="scss" scoped>
.NewsItem {
    $component: &;

    width: 100%;
    position: relative;

    &.black {
        background: $c-black--header;
    }

    &.red {
        background-image: url('~assets/images/news/pattern-red.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    @include hover {
        &:hover #{$component}-title {
            color: $c-red;
        }
    }

    &-wrapper {
        position: relative;
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        padding: scaling(32) scaling(32) scaling(40);

        @include desktop {
            padding: scaling(24) scaling(24) scaling(32);
        }

        @include desktop--small {
            padding: scaling(20) scaling(20) scaling(28);
        }

        @include laptop {
            padding: scaling(16) scaling(16) scaling(24);
        }

        @include tablet {
            padding: scaling(16) scaling(16) scaling(24);
        }

        @include mobile {
            padding: scaling(20) scaling(20) scaling(24);
        }
    }

    &-date {
        @include body-3;

        margin-bottom: scaling(4);
        color: $c-red;
        width: 100%;

        @include desktop--large {
            margin-bottom: scaling(8);
        }

        @include desktop {
            margin-bottom: scaling(8);
        }

        #{$component}.isTheme & {
            text-align: center;
            color: $c-white;
        }
    }

    &-category {
        @include caption-1;

        color: $c-black;
        opacity: 0.5;
        width: 100%;

        #{$component}.isTheme & {
            text-align: center;
            color: rgba($c-white, 0.5);
        }
    }

    &-image {
        width: scaling(384);
        height: scaling(354);
        margin-top: scaling(80);

        @include desktop {
            width: scaling(288);
            height: scaling(256);
            margin-top: scaling(56);
        }

        @include desktop--small {
            width: scaling(240);
            height: scaling(220);
            margin-top: scaling(48);
        }

        @include laptop {
            width: scaling(192);
            height: scaling(176);
            margin-top: scaling(36);
        }

        @include tablet {
            width: scaling(224);
            height: scaling(220);
            margin-top: scaling(40);
        }

        @include mobile {
            width: scaling(192);
            height: scaling(176);
            margin-top: scaling(36);
        }

        #{$component}.isTheme & {
            display: none;
        }

        // &.horizontal {
        //     width: scaling(384);
        //     height: scaling(252);
        //     margin: scaling(100) 0 scaling(20);

        //     @include desktop {
        //         width: scaling(288);
        //         height: scaling(168);
        //         margin: scaling(80) 0 scaling(28);
        //     }

        //     @include desktop--small {
        //         width: scaling(240);
        //         height: scaling(154);
        //         margin: scaling(60) 0 scaling(12);
        //     }

        //     @include laptop {
        //         width: scaling(192);
        //         height: scaling(128);
        //         margin: scaling(48) 0 0;
        //     }

        //     @include tablet {
        //         width: scaling(224);
        //         height: scaling(144);
        //         margin: scaling(52) 0 scaling(12);
        //     }

        //     @include mobile {
        //         width: scaling(192);
        //         height: scaling(124);
        //         margin: scaling(48) 0 scaling(20);
        //     }
        // }

        // &.vertical {
        //     width: scaling(264);
        //     height: scaling(354);
        //     margin: scaling(80) 0 scaling(20);

        //     @include desktop {
        //         width: scaling(192);
        //         height: scaling(256);
        //         margin: scaling(56) 0 scaling(28);
        //     }

        //     @include desktop--small {
        //         width: scaling(160);
        //         height: scaling(220);
        //         margin: scaling(48) 0 scaling(12);
        //     }

        //     @include laptop {
        //         width: scaling(128);
        //         height: scaling(176);
        //         margin: scaling(36) 0 0;
        //     }

        //     @include tablet {
        //         width: scaling(160);
        //         height: scaling(220);
        //         margin: scaling(40) 0 scaling(12);
        //     }

        //     @include mobile {
        //         width: scaling(128);
        //         height: scaling(176);
        //         margin: scaling(36) 0 scaling(8);
        //     }
        // }

        // &.horizontal,
        // &.vertical {
        //     img {
        //         @include m-objectFit($size: contain, $position: center);
        //     }
        // }

        #{$component}.performance & {
            border: 1px solid $c-gray--header;
            border-top-left-radius: scaling(220);
            border-top-right-radius: scaling(220);
            transition: border-color $d-hover ease-in-out,
                background-color $d-hover ease-in-out;

            @include desktop--large {
                width: scaling(160);
                height: scaling(320);
                padding: scaling(10);
                margin: scaling(72) 0 scaling(40);
            }

            @include desktop {
                width: scaling(124);
                height: scaling(248);
                padding: scaling(8);
                margin: scaling(68) 0 scaling(56);
            }

            @include desktop--small {
                width: scaling(120);
                height: scaling(240);
                padding: scaling(6);
                margin: scaling(60) 0 scaling(20);
            }

            @include laptop {
                width: scaling(88);
                height: scaling(176);
                padding: scaling(6);
                margin: scaling(52) 0 scaling(8);
            }

            @include tablet {
                width: scaling(96);
                height: scaling(192);
                padding: scaling(6);
                margin: scaling(54) 0 scaling(22);
            }

            @include mobile {
                width: scaling(96);
                height: scaling(192);
                padding: scaling(6);
                margin: scaling(48) 0 scaling(24);
            }

            &Inner {
                border-top-left-radius: scaling(220);
                border-top-right-radius: scaling(220);
            }
        }

        #{$component}.people & {
            border: 1px solid $c-gray--header;
            border-radius: 100%;
            transition: border-color $d-hover ease-in-out,
                background-color $d-hover ease-in-out;

            @include desktop--large {
                width: scaling(212);
                height: scaling(212);
                padding: scaling(10);
                margin: scaling(90) 0 scaling(10);
            }

            @include desktop {
                width: scaling(156);
                height: scaling(156);
                padding: scaling(8);
                margin: scaling(80) 0 scaling(36);
            }

            @include desktop--small {
                width: scaling(140);
                height: scaling(140);
                padding: scaling(6);
                margin: scaling(64) 0 scaling(20);
            }

            @include laptop {
                width: scaling(116);
                height: scaling(116);
                padding: scaling(6);
                margin: scaling(52) 0 0;
            }

            @include tablet {
                width: scaling(112);
                height: scaling(112);
                padding: scaling(6);
                margin: scaling(56) 0 scaling(8);
            }

            @include mobile {
                width: scaling(112);
                height: scaling(112);
                padding: scaling(6);
                margin: scaling(56) 0 scaling(20);
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

    &-title {
        width: 100%;
        font-size: scaling(40);
        line-height: $lh-120;
        font-feature-settings: 'cpsp' on;
        color: $c-black;
        margin-top: scaling(100);
        white-space: pre-line;
        display: flex;
        flex: 1;
        align-items: flex-end;
        transition: color $d-hover ease-in-out;

        @include desktop {
            font-size: scaling(32);
            margin-top: scaling(64);
        }

        @include desktop--small {
            font-size: scaling(28);
            margin-top: scaling(60);
        }

        @include laptop {
            font-size: scaling(24);
            margin-top: scaling(72);
        }

        @include tablet {
            font-size: scaling(24);
            margin-top: scaling(60);
        }

        @include mobile {
            font-size: scaling(20);
            margin-top: scaling(48);
        }

        #{$component}.isTheme & {
            text-align: center;
            padding: 0 scaling(8) 0;
            color: $c-white;
            margin-top: scaling(128);

            @include desktop {
                padding: 0 scaling(24) 0;
                margin-top: scaling(100);
            }

            @include desktop--small {
                padding: 0 scaling(20) 0;
                margin-top: scaling(72);
            }

            @include laptop {
                padding: 0 scaling(32) 0;
                margin-top: scaling(60);
            }

            @include tablet {
                padding: 0 scaling(32) 0;
                margin-top: scaling(72);
            }

            @include mobile {
                padding: 0 scaling(12) 0;
                margin-top: scaling(68);
            }
        }
    }

    &-text {
        width: 100%;
        font-family: $family-graphic;
        font-size: scaling(14);
        line-height: 150%;
        color: $c-black;
        margin-top: scaling(12);

        @include desktop--large {
            margin-top: scaling(24);
            font-size: scaling(20);
        }

        @include desktop {
            margin-top: scaling(16);
            font-size: scaling(18);
        }

        @include desktop--small {
            margin-top: scaling(16);
        }

        #{$component}.isTheme & {
            text-align: center;
            padding: 0 scaling(48) 0;
            color: $c-white;

            @include desktop {
                padding: 0 scaling(48) 0;
            }

            @include desktop--small {
                padding: 0 scaling(50) 0;
            }

            @include laptop {
                padding: 0 scaling(32) 0;
            }

            @include tablet {
                padding: 0 scaling(48) 0;
            }

            @include mobile {
                padding: 0 scaling(28) 0;
            }
        }
    }

    &-buttons {
        width: 100%;
        display: flex;
        justify-content: center;
        z-index: $z-hiddenLink + 1;
        margin-top: scaling(140);

        @include desktop {
            margin-top: scaling(120);
        }

        @include desktop--small {
            margin-top: scaling(80);
        }

        @include laptop {
            margin-top: scaling(72);
        }

        @include tablet {
            margin-top: scaling(84);
        }

        @include mobile {
            margin-top: scaling(84);
        }
    }

    &-button {
        &:not(:first-child) {
            margin-left: scaling(8);

            @include desktop--large {
                margin-left: scaling(12);
            }

            @include desktop {
                margin-left: scaling(12);
            }
        }
    }
}
</style>
