<template>
    <div class="PersonNews">
        <CommonTitle title="Новости" theme="isGold" />
        <div class="PersonNews-list">
            <NuxtLink
                v-for="(item, index) in news"
                :key="index"
                :to="item.url"
                class="PersonNews-listItem"
            >
                <div class="PersonNews-listItemDate" v-text="item.date"></div>
                <div class="PersonNews-listItemInner">
                    <div
                        class="PersonNews-listItemTitle"
                        v-text="item.title"
                    ></div>
                    <p class="PersonNews-listItemText" v-text="item.text"></p>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script>
import CommonTitle from '~/components/common/CommonTitle';

export default {
    name: 'PersonNews',

    components: {
        CommonTitle
    },

    props: {
        news: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PersonNews {
    $component: &;

    background-color: $c-gold--lighten;

    @include laptop {
        border-bottom: 1px solid $c-black;
    }

    @include tablet {
        border-bottom: 1px solid $c-black;
    }

    @include mobile {
        border-bottom: 1px solid $c-black;
    }

    &-list {
        display: flex;
        flex-wrap: wrap;

        &Item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 50%;
            padding: scaling(20) scaling(16);
            color: $c-black;

            @include desktop--large {
                padding: scaling(36) scaling(32);
            }

            @include desktop {
                padding: scaling(28) scaling(24);
            }

            @include desktop--small {
                padding: scaling(24) scaling(20);
            }

            @include mobile {
                width: 100%;
                padding: scaling(24) scaling(16);
            }

            @include hover {
                &:hover #{$component}-listItemTitle {
                    color: $c-white;
                }
            }

            &:not(:nth-child(2n + 2)) {
                border-right: 1px solid $c-gray--header;

                @include mobile {
                    border-right: none;
                }
            }

            &:not(:last-child) {
                @include mobile {
                    border-bottom: 1px solid $c-gray--header;
                }
            }

            &Date,
            &Text {
                font-size: scaling(14);
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(20);
                }

                @include desktop {
                    font-size: scaling(18);
                }
            }

            &Date {
                line-height: $lh-130;
            }

            &Title {
                font-size: scaling(24);
                line-height: $lh-130;
                letter-spacing: 0.02em;
                font-feature-settings: 'cpsp' on;
                transition: color $d-hover ease-in-out;

                @include desktop--large {
                    margin: scaling(124) 0 scaling(32);
                    font-size: scaling(40);
                    letter-spacing: 0;
                }

                @include desktop {
                    margin: scaling(68) 0 scaling(24);
                    font-size: scaling(32);
                }

                @include desktop--small {
                    margin: scaling(59) 0 scaling(20);
                    font-size: scaling(28);
                }

                @include laptop {
                    margin: scaling(76) 0 scaling(16);
                    line-height: $lh-120;
                }

                @include tablet {
                    margin: scaling(94) 0 scaling(16);
                    line-height: $lh-120;
                }

                @include mobile {
                    margin: scaling(60) 0 scaling(12);
                    font-size: scaling(20);
                    line-height: $lh-150;
                }
            }

            &Text {
                line-height: $lh-150;
                font-feature-settings: 'cpsp' on;

                @include laptop {
                    line-height: $lh-130;
                }

                @include tablet {
                    line-height: $lh-130;
                }

                @include mobile {
                    letter-spacing: -0.01em;
                }
            }
        }
    }
}
</style>
