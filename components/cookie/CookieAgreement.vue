<template>
    <div class="CookieAgreement" :class="{ isHidden }">
        <!-- eslint-disable-next-line -->
        <p class="CookieAgreement-text" v-html="text"></p>
        <div
            class="CookieAgreement-button"
            @click="closeAgreement"
            v-text="'Хорошо'"
        ></div>
    </div>
</template>

<script>
import { cookieAgreementVar } from '../../utils/constants.js';

export default {
    name: 'CookieAgreement',

    data() {
        return {
            text: 'Мы используем cookie-файлы. Оставаясь на сайте, вы соглашаетесь с <a href="/about/documents/privacy-policy">политикой конфиденциальности</a>',
            isHidden: true
        };
    },

    mounted() {
        if (localStorage.getItem(cookieAgreementVar) === null) {
            this.isHidden = false;
        }
    },

    methods: {
        closeAgreement() {
            localStorage.setItem(cookieAgreementVar, 'true');

            this.isHidden = true;
            this.$emit('close');
        }
    }
};
</script>

<style lang="scss" scoped>
.CookieAgreement {
    $component: &;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: scaling(13) scaling(33);
    border: 1px solid $c-gray--header;
    background-color: $c-gold--lighten;
    z-index: 100;
    transition: opacity $d-hover ease-in-out, transform $d-hover ease-in-out;

    @include desktop {
        padding: scaling(12) scaling(26);
    }

    @include desktop--small {
        padding: scaling(11) scaling(22);
    }

    @include laptop {
        padding: scaling(10) scaling(16);
    }

    @include tablet {
        padding: scaling(15) scaling(17);
    }

    @include mobile {
        flex-direction: column;
        align-items: flex-start;
        padding: scaling(16) scaling(16) scaling(36);
    }

    &.isHidden {
        opacity: 0;
        transform: translateY(100%);
    }

    &-text {
        font-size: scaling(14);
        line-height: $lh-160;
        font-family: $family-graphic;

        @include desktop--large {
            font-size: scaling(20);
            line-height: $lh-130;
        }

        @include desktop {
            font-size: scaling(18);
        }

        @include mobile {
            margin-bottom: scaling(16);
            line-height: $lh-150;
        }

        &::v-deep a {
            color: $c-white;
            transition: color $d-hover ease-in-out;

            @include laptop {
                display: block;
            }

            @include tablet {
                display: block;
            }

            @include mobile {
                display: block;
            }

            @include hover {
                &:hover {
                    color: $c-red;
                }
            }
        }
    }

    &-button {
        padding: scaling(5) scaling(12);
        border-radius: scaling(50);
        background-color: $c-black;
        cursor: pointer;
        color: $c-white;
        font-size: scaling(14);
        line-height: $lh-140;
        letter-spacing: 0.05em;
        text-transform: uppercase;
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
                background-color: $c-red;
            }
        }
    }
}
</style>
