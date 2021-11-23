<template>
    <div class="SeasonSceneColumn">
        <div class="SeasonSceneColumn-sceneType">
            <CommonSceneType
                :title="column.scene.name"
                :type="column.scene.type"
                is-premier="isPremier"
            />
        </div>
        <div class="SeasonSceneColumn-sceneCards">
            <div
                v-for="(card, index) in column.cards"
                :key="index"
                class="SeasonSceneColumn-sceneCard"
            >
                <SeasonPremierCard
                    :date="card.premiere_date"
                    :restrictions="card.restrictions"
                    :caption="card.caption"
                    :name="card.title"
                    :author="card.musician"
                    :slug="card.slug"
                    :category="card.category"
                />
            </div>
        </div>
    </div>
</template>

<script>
import CommonSceneType from '~/components/common/CommonSceneType';
import SeasonPremierCard from '~/components/season/SeasonPremierCard';

export default {
    name: 'SeasonSceneColumn',
    components: { CommonSceneType, SeasonPremierCard },
    props: {
        column: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.SeasonSceneColumn {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    border-right: 1px solid $c-black;
    width: (100% / 3);

    &:last-child {
        border-color: $c-white;
    }

    @include tablet {
        width: 100%;
        border-right: none;
    }

    @include mobile {
        width: 100%;
        border-right: none;
    }

    &-sceneType {
        position: sticky;
        z-index: $z-one;
        top: scaling(200);

        @include desktop {
            top: scaling(151);
        }

        @include desktop--small {
            top: scaling(127);
        }

        @include laptop {
            top: scaling(118);
        }

        @include tablet {
            top: scaling(118);
        }

        @include mobile {
            top: scaling(102);
        }
    }

    &-sceneCards {
        position: sticky;
        bottom: 0;
        box-shadow: 0 0 0 1px $c-black;

        @include desktop--large {
            margin-top: scaling(120);
        }

        @include desktop {
            margin-top: scaling(92);
        }

        @include desktop--small {
            margin-top: scaling(72);
        }

        @include laptop {
            margin-top: scaling(72);
        }

        @include tablet {
            position: static;
            box-shadow: none;
        }

        @include mobile {
            position: static;
            box-shadow: none;
        }
    }

    &-sceneCard {
        @include desktop--large {
            @include m-aspectRatio(640, 406);
        }

        @include desktop {
            @include m-aspectRatio(480, 342);
        }

        @include desktop--small {
            @include m-aspectRatio(400, 274);
        }

        @include laptop {
            @include m-aspectRatio(320, 227);
        }
    }
}
</style>
