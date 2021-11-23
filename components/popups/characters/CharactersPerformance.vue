<template>
    <div class="CharactersPerformance">
        <div class="CharactersPerformance-description">
            <div class="CharactersPerformance-type">{{ performance.type }}</div>
            <div class="CharactersPerformance-additionalInfo">
                {{ performance.additionalInfo }}
            </div>
        </div>
        <div class="CharactersPerformance-image">
            <CommonEventImage
                :image="performance.image"
                :title="performance.name"
                :mod="'big'"
            />
        </div>
        <div class="CharactersPerformance-info">
            <div class="CharactersPerformance-director">
                {{ performance.director }}
            </div>
            <div class="CharactersPerformance-name">
                {{ performance.name }}
            </div>
            <div class="CharactersPerformance-age">{{ performance.age }}+</div>
        </div>
    </div>
</template>

<script>
import CommonEventImage from '@/components/common/CommonEventImage';

export default {
    name: 'CharactersPerformance',
    components: {
        CommonEventImage
    },
    props: {
        performance: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style scoped lang="scss">
@mixin caption {
    font-family: $family-graphic;
    font-size: scaling(18);
    line-height: $lh-120;

    @include desktop--large {
        font-size: scaling(20);
        line-height: $lh-130;
    }

    @include laptop {
        font-size: scaling(16);
    }
}

.CharactersPerformance {
    $component: &;

    display: flex;
    flex-flow: column;
    justify-content: space-between;
    padding: scaling(32);
    color: $c-white;
    text-align: center;
    min-height: 100vh;

    @include desktop--large {
        padding: scaling(24);
    }

    @include desktop--small {
        padding: scaling(20);
    }

    @include laptop {
        padding: scaling(16);
    }

    &-type {
        @include caption;
    }

    &-additionalInfo {
        font-family: $family-graphic;
        font-size: scaling(16);
        line-height: $lh-120;
        margin-top: scaling(8);

        @include desktop--large {
            font-size: scaling(14);
            line-height: $lh-150;
            margin-top: scaling(4);
        }

        @include laptop {
            font-size: scaling(14);
        }
    }

    &-image {
        display: flex;
        justify-content: center;
        margin: scaling(15) 0;

        @include desktop--large {
            margin: scaling(20) 0;
        }

        @include laptop {
            margin: scaling(10) 0;
        }
    }

    &-director {
        @include caption;

        margin-bottom: scaling(12);

        @include laptop {
            margin-bottom: scaling(8);
        }
    }

    &-name {
        font-family: $family-apoc;
        font-size: scaling(28);
        line-height: $lh-100;
        text-transform: uppercase;
        margin-bottom: scaling(48);

        @include desktop--large {
            font-size: scaling(36);
            line-height: $lh-110;
            margin-bottom: scaling(64);
        }

        @include desktop--small {
            margin-bottom: scaling(50);
        }

        @include laptop {
            font-size: scaling(24);
            margin-bottom: scaling(61);
        }
    }

    &-age {
        font-family: $family-graphic;
        font-size: scaling(16);
        line-height: $lh-120;

        @include desktop--large {
            font-size: scaling(20);
            line-height: $lh-130;
        }
    }
}
</style>
