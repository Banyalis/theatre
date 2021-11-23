<template>
    <div class="MobileFilter">
        <div class="MobileFilter-button" @click="openPopup">
            <div class="MobileFilter-buttonText" v-text="popup.title"></div>
            <div class="MobileFilter-buttonIcon">
                <svg-icon name="icon-filter" />
            </div>
        </div>
        <div class="MobileFilter-popup" :class="{ isOpen }">
            <div class="MobileFilter-popupHeader">
                <div class="MobileFilter-popupTitle" v-text="popup.title"></div>
                <div class="MobileFilter-popupClose" @click="closePopup">
                    <svg-icon name="icon-cross" />
                </div>
            </div>
            <div class="MobileFilter-popupContent">
                <slot></slot>
            </div>
            <div
                class="MobileFilter-popupButton"
                @click="closePopup"
                v-text="popup.button"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MobileFilter',

    props: {
        popup: {
            type: Object,
            default: undefined
        }
    },

    data() {
        return {
            isOpen: false
        };
    },

    mounted() {
        this.$root.$on('close-filter-popup', () => this.closePopup());
    },

    methods: {
        openPopup() {
            this.isOpen = true;
        },

        closePopup() {
            this.isOpen = false;
        }
    }
};
</script>

<style lang="scss" scoped>
@mixin text {
    color: $c-white;
    font-size: scaling(14);
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.MobileFilter {
    $component: &;

    width: 100%;

    &-button {
        display: none;
        align-items: center;
        justify-content: space-between;
        padding: scaling(16) scaling(16) scaling(14);
        border-bottom: 1px solid $c-gray--header;

        @include mobile {
            display: flex;
        }

        &Text {
            color: $c-white;
            font-size: scaling(14);
            line-height: $lh-130;
            font-family: $family-graphic;
        }

        &Icon {
            width: scaling(20);
            height: scaling(20);

            svg {
                width: 100%;
                height: 100%;
                fill: $c-white;
            }
        }
    }

    &-popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: none;
        flex-direction: column;
        background-color: $c-white;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transform: translateX(100%);
        transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out,
            transform 0.4s ease-in-out;

        @include mobile {
            display: flex;
        }

        &.isOpen {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
        }

        &Header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: $c-black--header;
        }

        &Title {
            @include text;

            padding: scaling(14) scaling(16);
            line-height: $lh-140;
        }

        &Close {
            display: flex;
            padding: scaling(16);
            border-left: 1px solid $c-gray--header;

            svg {
                width: scaling(16);
                height: scaling(16);
                fill: $c-white;
            }
        }

        &Content {
            flex: 1;
            border: 1px solid $c-gray--header;
            overflow-y: auto;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        &Button {
            @include text;

            padding: scaling(16) scaling(20) scaling(15);
            background-color: $c-black;
            line-height: $lh-120;
            text-align: center;
        }
    }
}
</style>
