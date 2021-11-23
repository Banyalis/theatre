<template>
    <div class="Article">
        <div class="Article-hero">
            <ArticleHero
                :type="article.type"
                :title="article.title"
                :category="article.category"
                :date="article.date"
                :poster="article.poster"
                :hide-date="article.hideDate"
            />
        </div>
        <div class="Article-body">
            <!-- eslint-disable -->
            <div
                v-if="article.description"
                class="Article-description"
                v-html="article.description"
            ></div>
            <!-- eslint-enable -->
            <div class="Article-content">
                <div
                    v-for="(block, index) in article.blocks"
                    :key="index"
                    class="Article-block"
                    :class="[block.type]"
                >
                    <ArticleBlock :type="block.type" :block="block" />
                </div>
            </div>
            <div
                v-if="article.author"
                class="Article-author"
                v-text="article.author"
            ></div>
        </div>
        <div
            v-if="article.similar && article.similar.length"
            class="Article-same"
        >
            <ArticleSameNews :news="article.similar" />
        </div>
    </div>
</template>

<script>
import ArticleBlock from '@/components/article/ArticleBlock';
import ArticleSameNews from '@/components/article/ArticleSameNews';
import { mapState, mapMutations } from 'vuex';
import { HEADER_THEMES } from '../../../utils/constants';
import ArticleHero from '~/components/article/ArticleHero';

export default {
    components: { ArticleSameNews, ArticleBlock, ArticleHero },

    async fetch({ $config: { baseURL }, $axios, store, params }) {
        if (!params.slug) {
            // TODO: Raise 404 or redirect to news list page
            return;
        }
        const data = params.slug.match(/^(\d+)-(.*)/);
        if (!data) {
            // TODO: Raise 404
            return;
        }
        const res = await $axios.get(`${baseURL}/cms/api/news/${data[1]}`);

        if (res) store.commit('article/setArticle', res.data);
    },

    head() {
        return {
            title: 'Большой театр • ' + this.article.title
        };
    },

    computed: {
        ...mapState(['footerDarkTheme']),
        ...mapState('article', ['article'])
    },

    mounted() {
        this.setTheme();
    },

    updated() {
        this.setTheme();
    },

    // need for save keep-alive in layout
    deactivated() {
        this.$destroy();
    },

    methods: {
        setTheme() {
            this.changeTheme({
                headerMod: HEADER_THEMES.dark,
                isFooterDark: false
            });
        },

        ...mapMutations({
            changeTheme: 'changeTheme'
        })
    }
};
</script>

<style lang="scss" scoped>
.Article {
    $component: &;

    &-hero {
        width: 100%;
    }

    &-body {
        width: 100%;
        position: relative;
        padding: scaling(80) scaling(96) scaling(120);

        @include desktop {
            padding: scaling(73) scaling(72) scaling(100);
        }

        @include desktop--small {
            padding: scaling(68) scaling(60) scaling(96);
        }

        @include laptop {
            padding: scaling(56) scaling(58) scaling(72);
        }

        @include tablet {
            padding: scaling(48) scaling(32) scaling(72);
        }

        @include mobile {
            padding: scaling(28) scaling(16) scaling(60);
        }
    }

    &-description {
        @include body-1;

        color: $c-black--header;
        margin: 0 auto;
        width: (1216 * 100% / 1728);

        @include laptop {
            width: 100%;
        }

        @include tablet {
            width: 100%;
        }

        @include mobile {
            width: 100%;
        }

        ::v-deep p {
            &:not(:first-child) {
                margin-top: scaling(16);

                @include desktop--large {
                    margin-top: scaling(20);
                }

                @include desktop {
                    margin-top: scaling(20);
                }
            }
        }

        ::v-deep a {
            color: $c-red;
            transition: $d-hover color;

            @include hover {
                &:hover {
                    color: $c-gold;
                }
            }
        }
    }

    &-content {
        width: 100%;
        margin-top: scaling(72);
        position: relative;

        @include desktop {
            margin-top: scaling(64);
        }

        @include desktop--small {
            margin-top: scaling(56);
        }

        @include laptop {
            margin-top: scaling(52);
        }

        @include tablet {
            margin-top: scaling(40);
        }

        @include mobile {
            margin-top: scaling(40);
        }
    }

    &-block {
        width: (896 * 100% / 1728);
        margin: 0 auto;

        @include tablet {
            width: (640 * 100% / 864);
        }

        @include mobile {
            width: 100%;
        }

        &.gallery {
            width: (1216 * 100% / 1728);

            @include tablet {
                width: 100%;
            }

            @include mobile {
                width: 100%;
            }
        }
    }

    &-author {
        width: (896 * 100% / 1728);
        margin: 0 auto;
        font-family: $family-graphic;
        font-weight: $fw-normal;
        font-size: scaling(12);
        line-height: $lh-160;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #ac914d;

        @include desktop--large {
            font-size: scaling(14);
            margin-top: scaling(80);
        }

        @include desktop {
            margin-top: scaling(72);
        }

        @include desktop--small {
            margin-top: scaling(68);
        }

        @include laptop {
            margin-top: scaling(56);
        }

        @include tablet {
            margin-top: scaling(56);
            width: (640 * 100% / 864);
        }

        @include mobile {
            margin-top: scaling(40);
            width: 100%;
        }
    }

    &-same {
        width: 100%;
        border-top: 1px solid $c-black;
    }
}
</style>
