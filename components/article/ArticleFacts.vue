<template>
    <div class="ArticleFacts">
        <div
            v-for="(fact, index) in facts"
            :key="index"
            class="ArticleFacts-item"
        >
            <div
                v-if="fact.title"
                class="ArticleFacts-itemTitle"
                v-text="fact.title"
            ></div>
            <!--  eslint-disable  -->
            <div
                v-if="fact.text"
                class="ArticleFacts-itemText"
                v-html="fact.text"
            ></div>
            <!--  eslint-enable  -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArticleFacts',

    props: {
        facts: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.ArticleFacts {
    $component: &;

    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &-item {
        width: (416 * 100% / 896);

        @include mobile {
            width: 100%;
        }

        &:not(:first-child) {
            @include mobile {
                border-top: 1px solid #e6e6e6;
                padding-top: scaling(28);
                margin-top: scaling(28);
            }
        }

        &:nth-child(n + 3) {
            border-top: 1px solid #e6e6e6;
            padding-top: scaling(36);
            margin-top: scaling(36);

            @include desktop {
                padding-top: scaling(32);
                margin-top: scaling(32);
            }

            @include desktop--small {
                padding-top: scaling(28);
                margin-top: scaling(28);
            }

            @include laptop {
                padding-top: scaling(24);
                margin-top: scaling(24);
            }

            @include tablet {
                padding-top: scaling(24);
                margin-top: scaling(24);
            }

            @include mobile {
                padding-top: scaling(28);
                margin-top: scaling(28);
            }
        }

        &Title {
            width: 100%;
            font-family: $family-graphic;
            font-weight: $fw-normal;
            font-size: scaling(12);
            line-height: $lh-160;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #ac914d;

            @include desktop--large {
                font-size: scaling(14);
            }
        }

        &Text {
            @include text;

            line-height: $lh-160;
            color: $c-black--header;

            @include desktop--large {
                line-height: $lh-150;
            }

            #{$component}-itemTitle + & {
                margin-top: scaling(8);

                @include desktop--large {
                    margin-top: scaling(12);
                }

                @include desktop {
                    margin-top: scaling(12);
                }
            }
        }
    }
}
</style>
