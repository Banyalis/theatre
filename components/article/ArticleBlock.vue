<template>
    <div class="ArticleBlock" :class="[type]">
        <div class="ArticleBlock-wrapper">
            <ArticlePeople v-if="isPeople" :dates="block.dates" />
            <ArticleFacts v-else-if="isFacts" :facts="block.items" />
            <ArticleGallery v-else-if="isGallery" :items="block.items" />
            <!--  eslint-disable  -->
            <div v-else class="ArticleBlock-text" v-html="block.content" />
            <!--  eslint-enable  -->
        </div>
    </div>
</template>

<script>
import { ARTICLE_TYPES } from '@/utils/constants';
import ArticlePeople from '@/components/article/ArticlePeople';
import ArticleFacts from '@/components/article/ArticleFacts';
import ArticleGallery from '@/components/article/ArticleGallery';

export default {
    name: 'ArticleBlock',
    components: { ArticleGallery, ArticleFacts, ArticlePeople },
    props: {
        type: {
            type: String,
            required: true
        },
        block: {
            type: Object,
            required: true
        }
    },

    computed: {
        isPeople() {
            return this.type === ARTICLE_TYPES.people;
        },

        isFacts() {
            return this.type === ARTICLE_TYPES.facts;
        },

        isGallery() {
            return this.type === ARTICLE_TYPES.gallery;
        }
    }
};
</script>

<style lang="scss" scoped>
.ArticleBlock {
    $component: &;

    width: 100%;

    &-wrapper {
        width: 100%;

        #{$component}.people & {
            margin: scaling(32) 0;

            @include desktop--large {
                margin: scaling(40) 0;
            }

            @include desktop {
                margin: scaling(36) 0;
            }
        }

        #{$component}.facts & {
            margin-top: scaling(40);

            @include desktop--large {
                margin-top: scaling(60);
            }

            @include desktop {
                margin-top: scaling(52);
            }
        }

        #{$component}.gallery & {
            margin: scaling(80) 0;

            @include desktop {
                margin: scaling(72) 0;
            }

            @include desktop--small {
                margin: scaling(68) 0;
            }

            @include laptop {
                margin: scaling(56) 0;
            }

            @include tablet {
                margin: scaling(48) 0;
            }

            @include mobile {
                margin: scaling(40) 0;
            }
        }
    }

    &-text {
        @include text;

        line-height: $lh-170;
        color: $c-gray--header;

        ::v-deep a {
            color: $c-red;
            transition: $d-hover color;

            @include hover {
                &:hover {
                    color: $c-gold;
                }
            }
        }

        ::v-deep h2 {
            @include title;

            color: $c-black;
            margin-top: scaling(80);

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
                margin-top: scaling(48);
            }

            @include mobile {
                margin-top: scaling(40);
            }

            & + p,
            & + ol,
            & + ul {
                margin-top: scaling(24);

                @include desktop--large {
                    margin-top: scaling(36);
                }

                @include desktop {
                    margin-top: scaling(28);
                }
            }
        }

        ::v-deep h3 {
            @include heading-7;

            color: $c-black;
            margin-top: scaling(40);

            @include desktop {
                margin-top: scaling(36);
            }

            @include desktop--small {
                margin-top: scaling(32);
            }

            @include laptop {
                margin-top: scaling(32);
            }

            @include tablet {
                margin-top: scaling(32);
            }

            @include mobile {
                margin-top: scaling(24);
            }
        }

        ::v-deep p,
        ::v-deep ul,
        ::v-deep ol {
            margin-top: scaling(16);

            @include desktop--large {
                margin-top: scaling(20);
            }

            @include desktop--small {
                margin-top: scaling(12);
            }
        }

        ::v-deep ol {
            counter-reset: item;
        }

        ::v-deep ol li,
        ::v-deep ul li {
            list-style: none;
            position: relative;
            counter-increment: item;
            padding-left: scaling(30);

            @include desktop--large {
                padding-left: scaling(42);
            }

            @include desktop {
                padding-left: scaling(40);
            }

            &:not(:first-child) {
                margin-top: scaling(8);

                @include desktop--large {
                    margin-top: scaling(12);
                }

                @include desktop {
                    margin-top: scaling(10);
                }
            }
        }

        ::v-deep ul li:before,
        ::v-deep ol li:before {
            position: absolute;
            left: 0;
        }

        ::v-deep ul li:before {
            content: '—';
        }

        ::v-deep ol li:before {
            content: counters(item, '.') '.' ' ';
        }

        ::v-deep .button {
            @include text--button;

            width: fit-content;
            padding: scaling(8) scaling(20);
            color: $c-black;
            border: 1px solid $c-black;
            border-radius: scaling(128);
            background: none;
            outline: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            transition: $d-hover color, $d-hover background,
                $d-hover border-color;

            @include mobile {
                padding: scaling(4) scaling(12);
            }

            @include hover {
                &:hover {
                    color: $c-white;
                    background: $c-black;
                }
            }
        }

        ::v-deep b {
            font-weight: $fw-semiBold;
        }
    }
}
</style>
