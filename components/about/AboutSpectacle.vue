<template>
    <div class="AboutSpectacle">
        <div class="AboutSpectacle-card">
            <AboutSpectacleCard :item="content.item" />
        </div>
        <div class="AboutSpectacle-gallery">
            <AboutSpectacleGallery :gallery="content.gallery" />
        </div>
    </div>
</template>

<script>
import AboutSpectacleCard from '@/components/about/AboutSpectacleCard';
import AboutSpectacleGallery from '@/components/about/AboutSpectacleGallery';

export default {
    name: 'AboutSpectacle',

    components: {
        AboutSpectacleCard,
        AboutSpectacleGallery
    },

    props: {
        content: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutSpectacle {
    display: flex;

    @include laptop {
        flex-direction: column;
    }

    @include tablet {
        flex-direction: column;
    }

    @include mobile {
        flex-direction: column;
    }

    &-card {
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
    }

    &-gallery {
        width: 100%;
        background-color: $c-background--dark;

        @include desktop--large {
            width: (1440 * 100%) / 1920;
        }

        @include desktop {
            width: (1080 * 100%) / 1440;
        }

        @include desktop--small {
            width: (900 * 100%) / 1200;
        }
    }
}
</style>
