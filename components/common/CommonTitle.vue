<template>
    <div class="CommonTitle" :class="[theme ? theme : '']">
        <div class="CommonTitle-text" v-text="title"></div>
    </div>
</template>

<script>
export default {
    name: 'CommonTitle',

    props: {
        title: {
            type: String,
            required: true
        },
        theme: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonTitle {
    $component: &;

    padding: scaling(32) scaling(32) scaling(16);
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;

    @include desktop--large {
        padding: scaling(64) 0 scaling(32);
    }

    @include desktop {
        padding: scaling(48) 0 scaling(24);
    }

    @include desktop--small {
        padding: scaling(40) 0 scaling(20);
    }

    &.isGray {
        border-top-color: $c-black;
        border-bottom-color: $c-black;
        background-color: $c-gray-95;
    }

    &.isGold {
        border-top-color: $c-gray--header;
        border-bottom-color: $c-gray--header;
        background-color: $c-gold--lighten;
    }

    &.isWhite {
        border-top-color: $c-black;
        border-bottom-color: $c-black;
        background-color: $c-white;
    }

    &-text {
        font-size: scaling(14);
        line-height: $lh-140;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        text-align: center;
        font-weight: $fw-bold;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            font-size: scaling(20);
            line-height: $lh-120;
        }

        @include desktop {
            font-size: scaling(18);
            line-height: $lh-120;
        }
    }
}
</style>
