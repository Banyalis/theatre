<template>
    <div class="CommonSceneType b-paddings" :class="{ isCentered, isPremier }">
        <div class="CommonSceneType-text" v-text="title"></div>
        <picture v-if="image" class="CommonSceneType-image">
            <source :srcset="`/images/${image}`" />
            <img :src="`/images/${image}`" />
        </picture>
        <picture v-else-if="type" class="CommonSceneType-image">
            <img :src="require(`~/assets/images/scene/${type}.png`)" />
        </picture>
    </div>
</template>

<script>
export default {
    name: 'CommonSceneType',
    props: {
        title: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        },
        isCentered: {
            type: String,
            default: ''
        },
        isLeft: {
            type: String,
            default: ''
        },
        isPremier: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: null
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonSceneType {
    background-color: $c-gray-95;
    box-shadow: 0 1px 0 $c-black, 0 -1px 0 $c-black;
    width: 100%;
    text-align: left;
    position: relative;
    padding-top: scaling(64);
    padding-bottom: scaling(32);

    @include desktop {
        padding-top: scaling(48);
        padding-bottom: scaling(24);
    }

    @include desktop--small {
        padding-top: scaling(40);
        padding-bottom: scaling(20);
    }

    @include laptop {
        padding-top: scaling(40);
        padding-bottom: scaling(20);
    }

    @include tablet {
        padding-top: scaling(44);
        padding-bottom: scaling(16);
    }

    @include mobile {
        padding-top: scaling(32);
        padding-bottom: scaling(16);
    }

    &-text {
        @include text--button;

        text-transform: uppercase;

        @include mobile {
            word-spacing: scaling(9999);
        }
    }

    &-image {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        height: 100%;

        img {
            height: 100%;
            object-fit: contain;
        }
    }

    &.isCentered {
        text-align: center;

        @include mobile {
            text-align: left;
        }

        .CommonSceneType-text {
            word-spacing: unset;

            @include mobile {
                word-spacing: scaling(9999);
            }
        }
    }

    &.isPremier {
        padding-top: scaling(40);
        padding-bottom: scaling(32);

        @include desktop {
            padding-top: scaling(26);
            padding-bottom: scaling(24);
        }

        @include desktop--small {
            padding-top: scaling(20);
            padding-bottom: scaling(20);
        }

        @include laptop {
            padding-top: scaling(20);
            padding-bottom: scaling(20);
        }

        @include tablet {
            padding-top: scaling(44);
            padding-bottom: scaling(16);
        }

        @include mobile {
            padding-top: scaling(32);
            padding-bottom: scaling(16);
        }

        .CommonSceneType-text {
            word-spacing: scaling(9999);

            @include tablet {
                word-spacing: unset;
            }
        }
    }
}
</style>
isLeft
