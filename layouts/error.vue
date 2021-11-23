<template>
    <div class="NotFound">
        <div class="NotFound-inner">
            <div
                class="NotFound-text"
                v-text="'Такой страницы не существует, либо она была удалена'"
            ></div>
            <NuxtLink
                to="/"
                class="NotFound-button"
                v-text="'Перейти на главную'"
            ></NuxtLink>
        </div>
        <div class="NotFound-image"></div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { HEADER_THEMES } from '@/utils/constants';

export default {
    name: 'NotFound',

    head() {
        return {
            title: 'Большой театр • Страница не найдена'
        };
    },

    updated() {
        this.setTheme();
    },

    mounted() {
        this.setTheme();
    },

    methods: {
        setTheme() {
            this.changeTheme({
                headerMod: HEADER_THEMES.dark,
                isFooterDark: true
            });
        },

        ...mapMutations({
            changeTheme: 'changeTheme'
        })
    }
};
</script>

<style lang="scss" scoped>
.NotFound {
    $component: &;

    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: scaling(700);
    padding: scaling(60);
    position: relative;

    @include desktop--large {
        height: scaling(992);
        padding: scaling(72);
    }

    @include desktop--small {
        height: scaling(640);
        padding: scaling(48);
    }

    @include laptop {
        height: scaling(524);
        padding: scaling(48);
    }

    @include tablet {
        height: scaling(768);
    }

    @include mobile {
        height: scaling(416);
        padding: scaling(32) scaling(23);
    }

    &-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 10;
    }

    &-text {
        margin-bottom: scaling(16);
        color: $c-white;
        font-size: scaling(18);
        line-height: $lh-170;
        text-align: center;
        font-family: $family-graphic;

        @include desktop--large {
            margin-bottom: scaling(28);
            font-size: scaling(28);
        }

        @include desktop {
            margin-bottom: scaling(20);
            font-size: scaling(22);
        }

        @include laptop {
            margin-bottom: scaling(20);
            line-height: $lh-160;
        }

        @include tablet {
            font-size: scaling(16);
            line-height: $lh-160;
        }

        @include mobile {
            font-size: scaling(14);
            line-height: $lh-160;
        }
    }

    &-button {
        padding: scaling(5) scaling(12);
        border-radius: scaling(50);
        background-color: $c-red;
        color: $c-white;
        font-size: scaling(14);
        line-height: $lh-140;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-weight: $fw-bold;
        font-feature-settings: 'ss02' on;
        transition: background-color $d-hover ease-in-out;

        @include desktop--large {
            padding: scaling(8) scaling(20);
            font-size: scaling(20);
            line-height: $lh-120;
        }

        @include desktop {
            padding: scaling(6) scaling(16);
            font-size: scaling(18);
            line-height: $lh-120;
        }

        @include hover {
            &:hover {
                background-color: $c-black;
            }
        }
    }

    &-image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: contain;
        background-position: bottom;
        background-repeat: no-repeat;
        background-image: url('~assets/images/404/desktop-large.png');

        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            background-image: url('~assets/images/404/desktop-large@2x.png');
        }

        @include desktop {
            background-image: url('~assets/images/404/desktop.png');

            @media (-webkit-min-device-pixel-ratio: 2),
                (min-resolution: 192dpi) {
                background-image: url('~assets/images/404/desktop@2x.png');
            }
        }

        @include desktop--small {
            background-image: url('~assets/images/404/desktop-small.png');

            @media (-webkit-min-device-pixel-ratio: 2),
                (min-resolution: 192dpi) {
                background-image: url('~assets/images/404/desktop-small@2x.png');
            }
        }

        @include laptop {
            background-image: url('~assets/images/404/laptop.png');

            @media (-webkit-min-device-pixel-ratio: 2),
                (min-resolution: 192dpi) {
                background-image: url('~assets/images/404/laptop@2x.png');
            }
        }

        @include tablet {
            background-image: url('~assets/images/404/tablet.png');

            @media (-webkit-min-device-pixel-ratio: 2),
                (min-resolution: 192dpi) {
                background-image: url('~assets/images/404/tablet@2x.png');
            }
        }

        @include mobile {
            background-image: url('~assets/images/404/mobile.png');

            @media (-webkit-min-device-pixel-ratio: 2),
                (min-resolution: 192dpi) {
                background-image: url('~assets/images/404/mobile@2x.png');
            }
        }
    }
}
</style>
