<template>
    <div
        class="CommonCharactersButton"
        :class="mod ? `CommonCharactersButton--${mod}` : ''"
        @click="openPopup"
    >
        <svg-icon name="icon-circle-team" />
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'CommonCharactersButton',

    props: {
        performanceId: {
            type: Number,
            required: true
        },
        mod: {
            type: String,
            default: ''
        }
    },

    methods: {
        openPopup() {
            this.setPopupApi(`/api/characters/get/?id=${this.performanceId}`);
        },

        ...mapMutations({
            setPopupApi: 'popup/updateApi'
        })
    }
};
</script>

<style lang="scss" scoped>
.CommonCharactersButton {
    $component: &;

    width: 100%;
    height: 100%;
    cursor: pointer;
    position: relative;

    svg {
        width: 100%;
        height: 100%;
        fill: $c-gray-80;
        transition: fill $d-hover ease-in-out;
    }

    @include hover {
        &:hover svg {
            fill: $c-black;
        }
    }

    &--dark {
        svg {
            fill: $c-gray;
        }

        @include hover {
            &:hover svg {
                fill: $c-white;
            }
        }
    }
}
</style>
