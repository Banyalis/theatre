<template>
    <div class="IndexNews">
        <div class="IndexNews-title" v-text="`Новости`"></div>
        <IndexNewsFavorite :favorite="items" />
        <div class="IndexNews-latest">
            <div
                v-for="(item, index) in getLatestNews"
                :key="index"
                class="IndexNews-latestItem"
            >
                <NewsItem :item="item" />
            </div>
        </div>
        <CommonSliderCards
            v-if="!!changes.length"
            title="Дебюты и изменения в составах"
            :list="changes"
            :breakpoints="breakpoints"
            component-item="NewsChangesItem"
        />
        <NuxtLink to="/news" class="IndexNews-all" v-text="'Все новости'" />
    </div>
</template>

<script>
import IndexNewsFavorite from '~/components/index/IndexNewsFavorite';
import NewsItem from '~/components/news/NewsItem';
import CommonSliderCards from '~/components/common/CommonSliderCards';

export default {
    name: 'IndexNews',

    components: {
        IndexNewsFavorite,
        NewsItem,
        CommonSliderCards
    },

    props: {
        news: {
            type: Array,
            required: true
        },
        items: {
            type: Object,
            required: false,
            default: undefined
        },
        changes: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            breakpoints: {
                320: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                1200: {
                    slidesPerView: 3
                }
            }
        };
    },

    computed: {
        getLatestNews() {
            return this.news?.filter((n) => !n.isFavorite);
        }
    }
};
</script>

<style lang="scss" scoped>
.IndexNews {
    $component: &;

    &-title,
    &-all {
        font-size: scaling(14);
        line-height: $lh-140;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        text-align: center;
        font-weight: $fw-bold;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            padding: scaling(36) 0;
            font-size: scaling(20);
            line-height: $lh-120;
        }

        @include desktop {
            padding: scaling(25) 0;
            font-size: scaling(18);
            line-height: $lh-120;
        }

        @include desktop--small {
            padding: scaling(20) 0;
        }

        @include laptop {
            padding: scaling(27) 0;
        }

        @include tablet {
            padding: scaling(22) 0;
        }

        @include mobile {
            padding: scaling(16) 0;
            font-size: scaling(13);
            line-height: $lh-130;
            letter-spacing: 0.04em;
        }
    }

    &-title {
        background-color: $c-black--header;
        border-bottom: 1px solid $c-gray--header;
        color: $c-white;
    }

    &-latest {
        display: flex;
        flex-wrap: wrap;

        &Item {
            width: calc(100% / 4);

            @include laptop {
                width: calc(100% / 3);
            }

            @include tablet {
                width: calc(100% / 3);
            }

            @include mobile {
                width: 100%;
            }

            &:not(:last-child) {
                border-right: 1px solid $c-black;

                @include mobile {
                    border-right: none;
                    border-bottom: 1px solid $c-black;
                }
            }
        }
    }

    &-all {
        display: block;
        border-top: 1px solid $c-black;
        color: $c-black;
        transition: color $d-hover ease-in-out;

        @include hover {
            &:hover {
                color: $c-red;
            }
        }
    }
}
</style>
