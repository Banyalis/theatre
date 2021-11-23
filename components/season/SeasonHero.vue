<template>
    <div class="SeasonHero">
        <div v-lazy-container="{ selector: 'img' }" class="SeasonHero-wrapper">
            <img
                :data-src="require('~/assets/images/seasons/seasons-hero.png')"
                :data-loading="
                    require('~/assets/images/seasons/seasons-hero-poor.png')
                "
                :data-srcset="
                    require('~/assets/images/seasons/seasons-hero.png') +
                    ' 1x, ' +
                    require('~/assets/images/seasons/seasons-hero@2x.png') +
                    ' 2x'
                "
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SeasonHero'
};
</script>

<style lang="scss" scoped>
.SeasonHero {
    $component: &;

    width: 100%;
    display: flex;
    justify-content: center;

    &-wrapper {
        width: (1319 * 100% / 1920);
        position: relative;

        @include desktop {
            width: (1036 * 100% / 1440);
        }

        @include desktop--small {
            width: (872 * 100% / 1200);
        }

        @include laptop {
            width: (715 * 100% / 960);
        }

        @include tablet {
            width: (653 * 100% / 768);
        }

        @include mobile {
            width: (270 * 100% / 320);
        }

        img {
            max-width: 100%;
            width: 100%;
        }
    }
}
</style>
