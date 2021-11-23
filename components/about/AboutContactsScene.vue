<template>
    <div class="AboutContactsScene b-scaled-paddings">
        <div class="AboutContactsScene-info">
            <div
                v-if="scene.name"
                class="AboutContactsScene-name"
                v-text="scene.name"
            ></div>
            <div
                v-if="scene.address"
                class="AboutContactsScene-address"
                v-text="scene.address"
            ></div>
        </div>
        <div
            v-if="scene.image || scene.image2x"
            class="AboutContactsScene-image"
        >
            <picture>
                <source
                    :srcset="scene.image + ' 1x, ' + scene.image2x + ' 2x'"
                />
                <img :src="scene.image" alt="" />
            </picture>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutContactsScene',

    props: {
        scene: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutContactsScene {
    border-right: 1px solid $c-black;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: scaling(20) scaling(16) 0;
    border-bottom: 1px solid $c-black;

    @include desktop--large {
        width: (480 * 100%) / 1920;
        padding: scaling(72) scaling(32) 0;

        &:last-child {
            border-right: none;
        }
    }

    @include desktop {
        width: (360 * 100%) / 1440;
        padding: scaling(60) scaling(24) 0;

        &:last-child {
            border-right: none;
        }
    }

    @include desktop--small {
        width: (300 * 100%) / 1200;
        padding: scaling(52) scaling(20) 0;

        &:last-child {
            border-right: none;
        }
    }

    @include laptop {
        width: (240 * 100%) / 960;
        padding: scaling(48) scaling(16) 0;

        &:last-child {
            border-right: none;
        }
    }

    @include tablet {
        width: (384 * 100%) / 768;
        flex-direction: row;
        padding: scaling(20) 0 0 scaling(16);

        &:nth-child(even) {
            border-right: none;
        }
    }

    @include mobile {
        flex-direction: row;
        padding: scaling(20) 0 0 scaling(16);
        border-right: none;
    }

    &-info {
        @include tablet {
            min-width: (208 * 100%) / 384;
            max-width: (208 * 100%) / 384;
        }

        @include mobile {
            min-width: (176 * 100%) / 320;
            max-width: (176 * 100%) / 320;
        }
    }

    &-name {
        @include text--caption;

        text-transform: uppercase;
        margin-bottom: scaling(16);
        text-align: center;

        @include tablet {
            text-align: left;
        }

        @include mobile {
            text-align: left;
        }
    }

    &-address {
        @include heading-4;

        text-align: center;
        margin-bottom: scaling(75);

        @include tablet {
            text-align: left;
        }

        @include mobile {
            text-align: left;
        }
    }

    &-image {
        width: 100%;
        margin-top: auto;

        @include laptop {
        }

        picture {
            display: flex;
        }

        img {
            width: 100%;
        }
    }
}
</style>
