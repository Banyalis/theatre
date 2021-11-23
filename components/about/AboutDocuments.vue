<template>
    <div class="AboutDocuments">
        <div class="AboutDocuments-aside">
            <AboutDocumentsAside @toggle-close-document="toggleCloseDocument" />
        </div>
        <div
            ref="content"
            class="AboutDocuments-content"
            :class="{ isClose: isCloseDocument }"
        >
            <div class="AboutDocuments-panel">
                <div
                    class="AboutDocuments-panelTitle b-scaled-paddings"
                    v-text="'Документы'"
                ></div>
                <div class="AboutDocuments-panelClose" @click="closeDocument">
                    <svg-icon name="icon-cross" />
                </div>
            </div>
            <AboutDocumentsContent :content="content.info" />
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import AboutDocumentsAside from '@/components/about/AboutDocumentsAside';
import AboutDocumentsContent from '@/components/about/AboutDocumentsContent';

export default {
    name: 'AboutDocuments',

    components: {
        AboutDocumentsAside,
        AboutDocumentsContent
    },

    props: {
        content: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            isCloseDocument: false
        };
    },

    methods: {
        toggleCloseDocument(isClose) {
            this.isCloseDocument = isClose;
        },

        closeDocument() {
            this.isCloseDocument = true;
            this.unblockScroll();
        },

        ...mapMutations({ unblockScroll: 'unblockScroll' })
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

.AboutDocuments {
    display: flex;

    &-aside {
        width: 100%;

        @include desktop--large {
            width: (480 * 100%) / 1920;
            border-right: 1px solid $c-black;
        }

        @include desktop {
            width: (360 * 100%) / 1440;
            border-right: 1px solid $c-black;
        }

        @include desktop--small {
            width: (300 * 100%) / 1200;
            border-right: 1px solid $c-black;
        }

        @include laptop {
            width: (240 * 100%) / 960;
            border-right: 1px solid $c-black;
        }
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
        }

        @include mobile {
            @include mobile-popup;
        }

        &.isClose {
            @include tablet {
                display: none;
            }

            @include mobile {
                display: none;
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
