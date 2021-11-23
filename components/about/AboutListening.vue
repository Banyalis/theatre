<template>
    <div class="AboutListening">
        <div class="AboutListening-aside">
            <AboutListeningAside />
        </div>
        <div
            ref="content"
            class="AboutListening-content AboutListening-content--open"
        >
            <div class="AboutListening-panel">
                <div class="AboutListening-panelTitle b-scaled-paddings">
                    Прослушивания
                </div>
                <div class="AboutListening-panelClose" @click="closePopup">
                    <svg-icon name="icon-cross" />
                </div>
            </div>
            <AboutListeningContent :content="content.info" />
        </div>
    </div>
</template>

<script>
import AboutListeningAside from '@/components/about/AboutListeningAside';
import AboutListeningContent from '@/components/about/AboutListeningContent';

export default {
    name: 'AboutListening',

    components: {
        AboutListeningAside,
        AboutListeningContent
    },

    props: {
        content: {
            type: Object,
            required: true
        }
    },

    methods: {
        closePopup() {
            if (
                this.$refs.content.classList.contains(
                    'AboutListening-content--open'
                )
            ) {
                this.$refs.content.classList.remove(
                    'AboutListening-content--open'
                );
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@mixin mobile-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $c-white;
    overflow-y: auto;
    z-index: 999;
}

.AboutListening {
    display: flex;

    &-aside {
        width: 100%;
        overflow-y: auto;
        position: sticky;

        @include m-scrollbarHidden;

        @include desktop--large {
            top: scaling(96);
            max-height: calc(100vh - #{scaling(96)});
            width: (480 * 100%) / 1920;
            border-right: 1px solid $c-black;
        }

        @include desktop {
            top: scaling(72);
            max-height: calc(100vh - #{scaling(72)});
            width: (360 * 100%) / 1440;
            border-right: 1px solid $c-black;
        }

        @include desktop--small {
            top: scaling(60);
            max-height: calc(100vh - #{scaling(60)});
            width: (300 * 100%) / 1200;
            border-right: 1px solid $c-black;
        }

        @include laptop {
            top: scaling(64);
            max-height: calc(100vh - #{scaling(64)});
            width: (240 * 100%) / 960;
            border-right: 1px solid $c-black;
        }

        //@include desktop--large {
        //    width: (480 * 100%) / 1920;
        //    border-right: 1px solid $c-black;
        //}
        //
        //@include desktop {
        //    width: (480 * 100%) / 1440;
        //    border-right: 1px solid $c-black;
        //}
        //
        //@include desktop--small {
        //    width: (300 * 100%) / 1200;
        //    border-right: 1px solid $c-black;
        //}
        //
        //@include laptop {
        //    width: (240 * 100%) / 960;
        //    border-right: 1px solid $c-black;
        //}
    }

    &-content {
        width: 100%;

        @include desktop--large {
            width: (1440 * 100%) / 1920;
        }

        @include desktop {
            width: (1080 * 100%) / 1440;
        }

        @include desktop--small {
            width: (900 * 100%) / 1200;
        }

        @include laptop {
            width: (720 * 100%) / 960;
        }

        @include tablet {
            @include mobile-popup;

            display: none;
        }

        @include mobile {
            @include mobile-popup;

            display: none;
        }

        &--open {
            @include tablet {
                display: block;
            }

            @include mobile {
                display: block;
            }
        }
    }

    &-panel {
        display: none;
        align-items: center;
        justify-content: space-between;
        background-color: $c-black;
        position: sticky;
        top: 0;
        z-index: $z-two;

        &Title {
            @include text--button;

            color: $c-white;
        }

        &Close {
            padding: scaling(22);
            border-left: 1px solid $c-gray--header;

            @include mobile {
                padding: scaling(16);
            }

            svg {
                width: scaling(20);
                height: scaling(20);
                stroke: $c-white;

                @include mobile {
                    width: scaling(16);
                    height: scaling(16);
                }
            }
        }

        @include tablet {
            display: flex;
        }

        @include mobile {
            display: flex;
        }
    }
}
</style>
