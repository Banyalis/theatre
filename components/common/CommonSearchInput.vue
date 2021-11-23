<template>
    <div class="CommonSearchInput">
        <div class="CommonSearchInput-inner">
            <div class="CommonSearchInput-icon">
                <svg-icon name="icon-search" />
            </div>
            <input
                :id="searchId"
                :ref="`input-${searchId}`"
                v-model="inputValue"
                type="text"
                :placeholder="
                    placeholder ? placeholder : `Найти спектакль или концерт`
                "
                class="CommonSearchInput-field"
                @input="onInput"
                @on-input-change="changeValue"
            />
        </div>
    </div>
</template>

<script>
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'CommonSearchInput',

    props: {
        searchId: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            inputValue: ''
        };
    },

    mounted() {
        this.$root.$on(VUE_CUSTOM_EVENTS.onInputChange, this.changeValue);
    },

    destroyed() {
        this.$root.$off(VUE_CUSTOM_EVENTS.onInputChange, this.changeValue);
    },

    methods: {
        onInput() {
            this.$emit(
                VUE_CUSTOM_EVENTS.input,
                this.inputValue.trim().toLowerCase()
            );
        },

        changeValue(value) {
            this.inputValue = value;
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonSearchInput {
    $component: &;

    padding: scaling(16) scaling(16) scaling(14);
    border-bottom: 1px solid $c-gray--header;

    @include desktop--large {
        padding: scaling(20) scaling(34) scaling(18);
        border-right: 1px solid $c-gray--header;
    }

    @include desktop {
        padding: scaling(13) scaling(26) scaling(12);
        border-right: 1px solid $c-gray--header;
    }

    @include desktop--small {
        padding: scaling(12) scaling(22) scaling(10);
        border-right: 1px solid $c-gray--header;
    }

    @include laptop {
        padding: scaling(16) scaling(18) scaling(14);
    }

    &-inner {
        display: flex;
        align-items: center;

        @include tablet {
            flex-direction: row-reverse;
        }

        @include mobile {
            flex-direction: row-reverse;
        }

        @include hover {
            &:hover #{$component}-icon svg {
                fill: $c-red;
            }
        }
    }

    &-icon {
        flex-shrink: 0;
        width: scaling(16);
        height: scaling(16);

        @include desktop--large {
            width: scaling(20);
            height: scaling(20);
            margin-right: scaling(34);
        }

        @include desktop {
            width: scaling(20);
            height: scaling(20);
            margin-right: scaling(26);
        }

        @include desktop--small {
            margin-right: scaling(22);
        }

        @include laptop {
            margin-right: scaling(18);
        }

        @include tablet {
            margin-left: scaling(10);
        }

        @include mobile {
            margin-left: scaling(10);
        }

        svg {
            width: 100%;
            height: 100%;
            fill: $c-white;
            transition: fill $d-hover ease-in-out;
        }
    }

    &-field {
        width: 100%;
        border: none;
        background-color: transparent;
        outline: none;
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

        &::-webkit-input-placeholder {
            color: $c-white;
        }

        &::-moz-placeholder {
            color: $c-white;
        }

        &:-ms-input-placeholder {
            color: $c-white;
        }
    }
}
</style>
