<template>
    <div class="PosterHero">
        <div v-lazy-container="{ selector: 'img' }" class="PosterHero-image">
            <img
                :data-src="require('~/assets/images/poster/poster-hero.png')"
                :data-loading="
                    require('~/assets/images/poster/poster-hero-poor.png')
                "
                :data-srcset="
                    require('~/assets/images/poster/poster-hero.png') +
                    ' 1x, ' +
                    require('~/assets/images/poster/poster-hero@2x.png') +
                    ' 2x'
                "
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'PosterHero'
};
</script>

<style lang="scss" scoped>
.PosterHero {
    $component: &;

    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 100%;

    &-image {
        position: absolute;
        bottom: scaling(-10);
        display: flex;
        align-items: flex-end;

        @include desktop--large {
            width: scaling(1750);
            height: scaling(591);
        }

        @include desktop {
            width: scaling(1353);
            height: scaling(520);
        }

        @include desktop--small {
            width: scaling(1113);
            height: scaling(427);
        }

        @include laptop {
            width: scaling(920);
            height: scaling(353);
        }

        @include tablet {
            width: scaling(998);
            height: scaling(383);
        }

        @include mobile {
            width: scaling(450);
            height: scaling(228);
        }

        img {
            width: 100%;
        }
    }
}
</style>
