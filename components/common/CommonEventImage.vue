<template>
    <div
        class="CommonEventImage"
        :class="mod ? `CommonEventImage--${mod}` : ''"
    >
        <div class="CommonEventImage-inner">
            <picture>
                <source :srcset="`${image.image2x} 2x`" />
                <img :src="image.image" :alt="title" />
            </picture>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommonEventImage',

    props: {
        image: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            default: ''
        },
        mod: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonEventImage {
    $component: &;

    width: scaling(80);
    height: scaling(160);
    padding: scaling(4);
    border: 1px solid $c-black;
    border-top-left-radius: scaling(220);
    border-top-right-radius: scaling(220);
    transition: border-color $d-hover ease-in-out,
        background-color $d-hover ease-in-out;

    @include desktop--large {
        width: scaling(128);
        height: scaling(256);
        padding: scaling(8);
    }

    @include desktop {
        width: scaling(96);
        height: scaling(192);
        padding: scaling(6);
    }

    @include tablet {
        width: scaling(64);
        height: scaling(128);
    }

    @include mobile {
        width: scaling(64);
        height: scaling(128);
    }

    &--big {
        width: scaling(240);
        height: scaling(480);
        padding: scaling(12);

        @include desktop {
            width: scaling(200);
            height: scaling(400);
            padding: scaling(10);
        }

        @include desktop--small {
            width: scaling(150);
            height: scaling(300);
            padding: scaling(8);
        }

        @include laptop {
            width: scaling(120);
            height: scaling(240);
            padding: scaling(6);
        }
    }

    &-inner {
        height: 100%;
        border-top-left-radius: scaling(220);
        border-top-right-radius: scaling(220);
        overflow: hidden;

        img {
            @include m-objectFit;

            width: 100%;
            height: 100%;
        }
    }
}
</style>
