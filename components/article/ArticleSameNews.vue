<template>
    <div class="ArticleSameNews">
        <div class="ArticleSameNews-title" v-text="`Другие новости`"></div>
        <div class="ArticleSameNews-items">
            <div
                v-for="(item, index) in getNews"
                :key="index"
                class="ArticleSameNews-item"
            >
                <NewsItem :item="item" />
            </div>
        </div>
    </div>
</template>

<script>
import NewsItem from '@/components/news/NewsItem';
export default {
    name: 'ArticleSameNews',
    components: { NewsItem },
    props: {
        news: {
            type: Array,
            required: true
        }
    },

    computed: {
        getNews() {
            return this.news.slice(0, 3);
        }
    }
};
</script>

<style lang="scss" scoped>
.ArticleSameNews {
    $component: &;

    width: 100%;

    &-title {
        @include heading-label;

        text-align: center;
        padding: scaling(36) 0;
        border-bottom: 1px solid $c-black;

        @include desktop {
            padding: scaling(25) 0;
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
        }
    }

    &-items {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-right: -1px;

        @include mobile {
            margin-right: 0;
        }
    }

    &-item {
        width: (100% / 3);
        display: flex;
        align-items: stretch;
        border-right: 1px solid $c-black;

        @include tablet {
            width: 50%;
        }

        @include mobile {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid $c-black;
        }

        &:last-child {
            @include tablet {
                display: none;
            }
        }
    }
}
</style>
