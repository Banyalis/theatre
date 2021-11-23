<template>
    <button
        v-if="loading"
        class="RoundedButton"
        :class="[type ? type : '', { isWhiteHover }, 'loading']"
    >
        <clip-loader v-if="loading" color="#cccccc" size="30px" />
    </button>
    <button
        v-else-if="!link"
        class="RoundedButton"
        :class="[type ? type : '', { isWhiteHover, isRedHover, isBlackText }]"
        @click="clickButton($event)"
        v-text="title"
    ></button>
    <a
        v-else-if="link.isExternal"
        :href="link.url"
        target="_blank"
        rel="nofollow"
        class="RoundedButton"
        :download="link.isDownload"
        :class="[type ? type : '', { isWhiteHover, isRedHover, isBlackText }]"
        v-text="link.title"
    ></a>
    <nuxt-link
        v-else
        :to="link.url"
        class="RoundedButton"
        :download="link.isDownload"
        :class="[type ? type : '', { isWhiteHover, isRedHover, isBlackText }]"
        v-text="link.title"
    ></nuxt-link>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

export default {
    name: 'RoundedButton',
    components: {
        ClipLoader
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        link: {
            type: Object,
            default: null
        },
        type: {
            type: String,
            default: 'isTransparent'
        },
        isSubmit: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        isWhiteHover: {
            type: Boolean,
            default: false
        },
        isRedHover: {
            type: Boolean,
            default: false
        },
        isBlackText: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        clickButton(event) {
            if (!this.isSubmit) event.preventDefault();

            this.$emit('click', event);
        }
    }
};
</script>

<style lang="scss" scoped>
.RoundedButton {
    @include text--button;

    max-width: 100%;
    padding: scaling(8) scaling(20);
    color: transparent;
    border: 1px solid transparent;
    border-radius: scaling(128);
    background: none;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: $d-hover color, $d-hover background, $d-hover border-color;

    @include mobile {
        padding: scaling(4) scaling(12);
    }

    &.isRed {
        color: $c-white;
        background: $c-red;
        border-color: $c-red;

        @include hover {
            &:hover {
                &.isWhiteHover {
                    color: $c-black;
                    background: $c-white;
                    border-color: $c-white;
                }

                &:not(.isWhiteHover) {
                    background: $c-black;
                    border-color: $c-black;
                }
            }
        }
    }

    &.isBlack {
        background: $c-black;
        border-color: $c-black;
        color: $c-white;

        @include hover {
            &:hover {
                background: $c-red;
                border-color: $c-red;
            }
        }
    }

    &.isTransparentBlack {
        border-color: $c-black;
        color: $c-black;

        @include hover {
            &:hover {
                color: $c-white;
                background: $c-black;
            }
        }
    }

    &.isBlackGold {
        background: $c-black;
        border-color: $c-black;
        color: $c-gold--lighten;

        @include hover {
            &:hover {
                background: $c-white;
                border-color: $c-white;
                color: $c-black;
            }
        }
    }

    &.isGoldBlack {
        background: $c-gold--lighten;
        border-color: $c-gold--lighten;
        color: $c-black;

        @include hover {
            &:hover {
                background: $c-black;
                border-color: $c-black;
                color: $c-white;
            }
        }
    }

    &.isTransparentWhite {
        border-color: $c-white;
        color: $c-white;

        @include hover {
            &:hover {
                background: $c-white;
                border-color: $c-white;
                color: $c-black;
            }
        }
    }

    &.isTransparentRed {
        border-color: $c-red;
        color: $c-red;

        @include hover {
            &:hover {
                background: $c-white;
                border-color: $c-white;
                color: $c-black;
            }
        }
    }

    &.isWhite {
        border-color: $c-white;
        background-color: $c-white;
        color: $c-red;

        @include hover {
            &:hover {
                &.isRedHover {
                    border-color: $c-red;
                    background-color: $c-red;
                    color: $c-white;
                }

                &:not(.isRedHover) {
                    border-color: $c-black;
                    background-color: $c-black;
                    color: $c-white;
                }
            }
        }
    }

    &.isBlackText {
        color: $c-black;
    }

    &.isDisabled {
        border-color: $c-gray-80;
        pointer-events: none;
        color: $c-gray;
    }

    &.loading {
        min-width: scaling(200);

        .v-spinner {
            height: 30px;
        }
    }
}
</style>
