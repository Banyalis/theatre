<template>
    <div class="PosterList">
        <div class="PosterList-header">
            <div class="PosterList-headerInner">
                <div class="PosterList-title" v-text="item.title"></div>
                <div class="PosterList-age" v-text="item.age"></div>
            </div>
            <p
                v-if="item.description"
                class="PosterList-description"
                v-text="item.description"
            ></p>
        </div>
        <div class="PosterList-content">
            <PosterCard
                v-for="(listItem, listItemIndex) in item.list"
                :key="listItemIndex"
                :item="listItem"
                :one-act-subtitle="item.title"
                :one-act-list="item.list"
            />
        </div>
    </div>
</template>

<script>
import PosterCard from '~/components/poster/PosterCard';

export default {
    name: 'PosterList',

    components: {
        PosterCard
    },

    props: {
        item: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PosterList {
    $component: &;

    &-header {
        margin-bottom: scaling(32);

        @include desktop--large {
            margin-bottom: scaling(36);
        }

        @include laptop {
            margin-bottom: scaling(28);
        }

        @include tablet {
            margin-bottom: scaling(28);
        }

        @include mobile {
            display: none;
        }

        &Inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding-bottom: scaling(12);
            border-bottom: 1px solid $c-gray-80;

            @include desktop--large {
                padding-bottom: scaling(16);
            }

            @include laptop {
                padding-bottom: scaling(8);
            }

            @include tablet {
                padding-bottom: scaling(8);
            }
        }
    }

    &-title,
    &-age,
    &-description {
        font-size: scaling(14);
        line-height: $lh-130;
        font-family: $family-graphic;

        @include desktop--large {
            font-size: scaling(20);
        }

        @include desktop {
            font-size: scaling(18);
        }
    }

    &-age {
        color: $c-gray;
    }

    &-description {
        width: 100%;
        margin-top: scaling(12);
        padding-bottom: scaling(12);
        border-bottom: 1px solid $c-gray-80;
        color: $c-gray;

        @include desktop--large {
            margin-top: scaling(16);
            padding-bottom: scaling(19);
        }

        @include laptop {
            margin-top: scaling(8);
            padding-bottom: scaling(8);
        }

        @include tablet {
            margin-top: scaling(8);
            padding-bottom: scaling(8);
        }
    }

    &-content {
        @include hover {
            &:hover {
                ::v-deep .PosterCard {
                    &--new .PosterCard-scene {
                        color: #415923;
                    }

                    &--chamber .PosterCard-scene {
                        color: #185289;
                    }

                    &--historical .PosterCard-scene {
                        color: #b11632;
                    }

                    &--beethoven .PosterCard-scene {
                        color: #732e63;
                    }
                }
            }
        }
    }
}
</style>
