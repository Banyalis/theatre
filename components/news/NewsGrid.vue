<template>
    <div class="NewsGrid">
        <div class="NewsGrid-wrapper">
            <div ref="grid" class="NewsGrid-list">
                <div class="NewsGrid-listDividers">
                    <div class="NewsGrid-listDivider"></div>
                    <div class="NewsGrid-listDivider"></div>
                </div>
                <div ref="sizer" class="sizer"></div>
                <div
                    v-for="(item, index) in list"
                    :key="`news_${index}`"
                    class="NewsGrid-listItem"
                >
                    <component :is="mappedComponent[item.type]" :item="item" />
                </div>
            </div>
            <CommonPagination
                v-if="countPages > 1"
                :page-count="countPages"
                :active-page-number="activePage"
            />
        </div>
    </div>
</template>

<script>
import { NEWS_ITEM_TYPES } from '~/utils/constants';
import NewsChangesItem from '~/components/news/NewsChangesItem';
import NewsItem from '~/components/news/NewsItem';
import CommonPagination from '~/components/common/CommonPagination';

export default {
    name: 'NewsGrid',

    components: {
        CommonPagination,
        NewsItem,
        NewsChangesItem
    },

    props: {
        list: {
            type: Array,
            required: true
        },

        countPages: {
            type: Number,
            required: true
        },

        activePage: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            mappedComponent: {
                [NEWS_ITEM_TYPES.common]: 'NewsItem',
                [NEWS_ITEM_TYPES.people]: 'NewsItem',
                [NEWS_ITEM_TYPES.performance]: 'NewsItem',
                [NEWS_ITEM_TYPES.replacement]: 'NewsChangesItem'
            }
        };
    },

    watch: {
        list: {
            deep: true,
            handler() {
                this.$nextTick(() => {
                    this.masonry.reloadItems();
                    this.masonry.layout();
                });
            }
        }
    },

    mounted() {
        setTimeout(this.initMasonry, 100);
    },

    methods: {
        initMasonry() {
            this.masonry = new this.$masonry(this.$refs.grid, {
                columnWidth: this.$refs.sizer,
                percentPosition: true,
                stagger: 0,
                transitionDuration: 0,
                itemSelector: '.NewsGrid-listItem'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.NewsGrid {
    $component: &;

    width: 100%;
    position: relative;

    &-wrapper {
        width: 100%;
        position: relative;
    }

    &-list {
        position: relative;
        width: 100%;

        .sizer {
            width: (100% / 3);

            @include tablet {
                width: 50%;
            }

            @include mobile {
                width: 100%;
            }
        }

        &Item {
            width: (100% / 3);
            border-bottom: 1px solid $c-black;

            @include tablet {
                width: 50%;
            }

            @include mobile {
                width: 100%;
            }
        }

        &Dividers {
            width: 100%;
            height: 100%;
            display: flex;
        }

        &Divider {
            height: 100%;
            width: (100% / 3);
            border-right: 1px solid $c-black;

            @include tablet {
                width: 50%;

                &:last-child {
                    display: none;
                }
            }

            @include mobile {
                display: none;
            }
        }
    }
}
</style>
