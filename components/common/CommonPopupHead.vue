<template>
    <div
        class="CommonPopupHead"
        :class="theme ? `CommonPopupHead--${theme}` : ''"
    >
        <div
            v-if="hasBackButton"
            class="CommonPopupHead-back"
            @click="closePopup"
        >
            <svg-icon name="icon-arrow--large" />
        </div>
        <div v-if="title" class="CommonPopupHead-title" v-text="title"></div>
        <div
            v-if="title"
            class="CommonPopupHead-title CommonPopupHead-title--mobile"
            v-text="titleMobile || title"
        ></div>
        <div class="CommonPopupHead-close" @click="close">
            <svg-icon name="icon-cross" />
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { isMobile } from '@/utils/utils';

export default {
    name: 'CommonPopupHead',

    props: {
        title: {
            type: String,
            default: ''
        },
        titleMobile: {
            type: String,
            default: ''
        },
        theme: {
            type: String,
            default: 'black'
        },
        hasBackButton: {
            type: Boolean,
            default: false
        }
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },

    methods: {
        onResize() {
            this.updateHeaderHeight(this.$el.offsetHeight);
        },

        close() {
            if (!isMobile()) {
                this.closePopup();
            } else {
                this.closePopup();
                this.$root.$emit('close-filter-popup');
            }
        },

        ...mapMutations('popup', ['updateHeaderHeight']),
        ...mapActions({
            closePopup: 'popup/close'
        })
    }
};
</script>

<style lang="scss" scoped>
.CommonPopupHead {
    $component: &;

    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid transparent;
    z-index: 10;

    &--black {
        background-color: $c-black--header;
        border-bottom-color: $c-gray--header;
    }

    &--white {
        background-color: $c-white;
        border-bottom-color: $c-black;
    }

    &-back {
        display: none;
        align-items: center;
        padding: 0 scaling(16);
        border-right: 1px solid transparent;
        cursor: pointer;

        @include mobile {
            display: flex;
        }

        #{$component}--black & {
            border-right-color: $c-gray--header;
        }

        #{$component}--white & {
            border-right-color: $c-black;
        }

        svg {
            width: scaling(16);
            height: scaling(16);

            #{$component}--black & {
                fill: $c-white;
            }

            #{$component}--white & {
                fill: $c-black;
            }
        }
    }

    &-title {
        display: flex;
        align-items: center;
        padding: 0 scaling(16);
        font-size: scaling(14);
        line-height: $lh-140;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-weight: $fw-bold;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            padding: 0 scaling(32);
            font-size: scaling(20);
            line-height: $lh-120;
        }

        @include desktop {
            padding: 0 scaling(24);
            font-size: scaling(18);
            line-height: $lh-120;
        }

        @include desktop--small {
            padding: 0 scaling(20);
        }

        @include mobile {
            display: none;
        }

        &--mobile {
            display: none;
            align-items: center;

            @include mobile {
                display: flex;
            }
        }

        #{$component}--black & {
            color: $c-white;
        }

        #{$component}--white & {
            color: $c-black;
        }
    }

    &-close {
        padding: scaling(22);
        border-left: 1px solid transparent;
        cursor: pointer;
        transition: background-color $d-hover ease-in-out;

        @include desktop--large {
            padding: scaling(32);
        }

        @include desktop {
            padding: scaling(24);
        }

        @include desktop--small {
            padding: scaling(20);
        }

        @include mobile {
            padding: scaling(16);
        }

        @include hover {
            &:hover {
                background-color: $c-red;
            }
        }

        #{$component}--black & {
            border-left-color: $c-gray--header;
        }

        #{$component}--white & {
            border-left-color: $c-black;
        }

        svg {
            width: scaling(20);
            height: scaling(20);

            @include desktop--large {
                width: scaling(32);
                height: scaling(32);
            }

            @include desktop {
                width: scaling(24);
                height: scaling(24);
            }

            @include mobile {
                width: scaling(16);
                height: scaling(16);
            }

            #{$component}--black & {
                fill: $c-white;
            }

            #{$component}--white & {
                fill: $c-black;
            }
        }
    }
}
</style>
