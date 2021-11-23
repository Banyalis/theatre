<template>
    <div class="AboutHistorySectionContent" :class="{ isReverse }">
        <div
            v-for="(item, index) in content"
            :key="index"
            class="AboutHistorySectionContent-element"
            :class="[
                item.type
                    ? `AboutHistorySectionContent-element--${item.type}`
                    : '',
                item.centered
                    ? `AboutHistorySectionContent-element--centered`
                    : '',
                item.full
                    ? `AboutHistorySectionContent-element--image--full`
                    : ''
            ]"
        >
            <template
                v-if="
                    HINT_INDEXES[sectionId][index] &&
                    hints &&
                    hints[HINT_INDEXES[sectionId][index].desktop]
                "
            >
                <AboutHistorySectionContentHints
                    :hints="hints[HINT_INDEXES[sectionId][index].desktop]"
                    :is-reverse="isReverse"
                />
                <div class="AboutHistorySectionContent-elementInserts">
                    <AboutHistorySectionContentInserts
                        v-for="hintIndex in HINT_INDEXES[sectionId][index]
                            .mobile"
                        :key="hintIndex"
                        :inserts="hints[hintIndex]"
                    />
                </div>
            </template>
            <div class="AboutHistorySectionContent-elementInner">
                <AboutHistorySectionContentTitle
                    v-if="item.type === 'title'"
                    :content="item.content"
                />
                <AboutHistorySectionContentTextLarge
                    v-if="item.type === 'text--large'"
                    :content="item.content"
                />
                <AboutHistorySectionContentTextSmall
                    v-if="item.type === 'text--small'"
                    :content="item.content"
                />
                <AboutHistorySectionContentQuote
                    v-if="item.type === 'quote'"
                    :quote="item"
                />
                <AboutHistorySectionContentImage
                    v-if="item.type === 'image'"
                    :image="item"
                />
                <CommonGallery
                    v-if="item.type === 'gallery'"
                    :gallery="item.gallery"
                    :theme="'isBlack'"
                />
            </div>
        </div>
    </div>
</template>

<script>
import AboutHistorySectionContentHints from '~/components/about/AboutHistorySectionContentHints';
import AboutHistorySectionContentInserts from '~/components/about/AboutHistorySectionContentInserts';
import AboutHistorySectionContentTitle from '~/components/about/AboutHistorySectionContentTitle';
import AboutHistorySectionContentTextLarge from '~/components/about/AboutHistorySectionContentTextLarge';
import AboutHistorySectionContentTextSmall from '~/components/about/AboutHistorySectionContentTextSmall';
import AboutHistorySectionContentQuote from '~/components/about/AboutHistorySectionContentQuote';
import AboutHistorySectionContentImage from '~/components/about/AboutHistorySectionContentImage';
import CommonGallery from '~/components/common/CommonGallery';

export default {
    name: 'AboutHistorySectionContent',

    components: {
        AboutHistorySectionContentHints,
        AboutHistorySectionContentInserts,
        AboutHistorySectionContentTitle,
        AboutHistorySectionContentTextLarge,
        AboutHistorySectionContentTextSmall,
        AboutHistorySectionContentQuote,
        AboutHistorySectionContentImage,
        CommonGallery
    },

    props: {
        content: {
            type: Array,
            required: true
        },
        hints: {
            type: Array,
            required: true
        },
        sectionId: {
            type: Number,
            required: true
        },
        isReverse: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            HINT_INDEXES: {
                1: [
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 0,
                        mobile: null
                    },
                    {
                        desktop: 1,
                        mobile: [0, 1, 2]
                    },
                    {
                        desktop: 2,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 3,
                        mobile: [3]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 4,
                        mobile: [4]
                    }
                ],
                2: [
                    {
                        desktop: 0,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 1,
                        mobile: [0, 1, 2]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 2,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 3,
                        mobile: [3]
                    },
                    {
                        desktop: 4,
                        mobile: [4]
                    }
                ],
                3: [
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 0,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 1,
                        mobile: [0, 1, 2]
                    },
                    {
                        desktop: 2,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 3,
                        mobile: [3]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 4,
                        mobile: [4]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 5,
                        mobile: [5]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 6,
                        mobile: [6]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 7,
                        mobile: [7]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 8,
                        mobile: [8]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 9,
                        mobile: [9]
                    }
                ],
                4: [
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 0,
                        mobile: null
                    },
                    {
                        desktop: 1,
                        mobile: [0, 1]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 2,
                        mobile: [2]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 3,
                        mobile: [3]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 4,
                        mobile: [4]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 5,
                        mobile: [5, 6]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 6,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 7,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 8,
                        mobile: [7, 8]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 9,
                        mobile: [9]
                    }
                ],
                5: [
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 0,
                        mobile: [0]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 1,
                        mobile: [1]
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: null,
                        mobile: null
                    },
                    {
                        desktop: 2,
                        mobile: [2]
                    }
                ]
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.AboutHistorySectionContent {
    $component: &;

    padding: scaling(32) 0 scaling(72);
    position: relative;

    @include desktop--large {
        padding: scaling(48) 0 scaling(88);
    }

    @include desktop {
        padding: scaling(40) 0 scaling(100);
    }

    @include desktop--small {
        padding: scaling(36) 0 scaling(80);
    }

    @include mobile {
        padding: scaling(32) 0 scaling(64);
    }

    &:before {
        content: '';
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        border-right: 1px solid $c-gray--header;

        @include desktop--large {
            display: block;
            width: (480 * 100% / 1600);
        }

        @include desktop {
            display: block;
            width: (360 * 100% / 1200);
        }

        @include desktop--small {
            display: block;
            width: (300 * 100% / 980);
        }
    }

    &.isReverse:before {
        left: inherit;
        right: 0;
        border-left: 1px solid $c-gray--header;
        border-right: none;
    }

    &-element {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        position: relative;

        &:first-child {
            margin-top: 0;
        }

        &:last-child {
            margin-bottom: 0;
        }

        #{$component}.isReverse & {
            flex-direction: row-reverse;
        }

        &--title {
            margin-bottom: scaling(16);

            @include desktop--large {
                margin-bottom: scaling(32);
            }

            @include desktop {
                margin-bottom: scaling(24);
            }

            @include desktop--small {
                margin-bottom: scaling(20);
            }
        }

        &--text {
            &--large {
                margin-bottom: scaling(52);

                @include desktop--large {
                    margin-bottom: scaling(80);
                }

                @include desktop {
                    margin-bottom: scaling(72);
                }

                @include desktop--small {
                    margin-bottom: scaling(64);
                }

                @include mobile {
                    margin-bottom: scaling(40);
                }
            }

            &--small + #{$component}-element--title {
                margin-top: scaling(52);

                @include desktop--large {
                    margin-top: scaling(80);
                }

                @include desktop {
                    margin-top: scaling(72);
                }

                @include desktop--small {
                    margin-top: scaling(64);
                }

                @include mobile {
                    margin-top: scaling(40);
                }
            }
        }

        &--quote {
            margin: scaling(64) 0;

            @include desktop--large {
                margin: scaling(100) 0;
            }

            @include desktop {
                margin: scaling(80) 0;
            }

            @include desktop--small {
                margin: scaling(72) 0;
            }

            @include mobile {
                margin: scaling(52) 0;
            }
        }

        &--image {
            margin: scaling(32) 0 scaling(52);

            @include desktop--large {
                margin: scaling(64) 0 scaling(80);
            }

            @include desktop {
                margin: scaling(52) 0 scaling(72);
            }

            @include desktop--small {
                margin: scaling(48) 0 scaling(64);
            }

            @include mobile {
                margin: scaling(32) 0 scaling(24);
            }

            &--full {
                margin: scaling(72) 0;

                @include desktop--large {
                    margin: scaling(120) 0;
                }

                @include desktop {
                    margin: scaling(100) 0;
                }

                @include desktop--small {
                    margin: scaling(80) 0;
                }

                @include mobile {
                    margin: scaling(64) 0;
                }
            }
        }

        &--gallery {
            margin: scaling(72) 0;

            @include desktop--large {
                margin: scaling(120) 0;
            }

            @include desktop {
                margin: scaling(100) 0;
            }

            @include desktop--small {
                margin: scaling(80) 0;
            }

            @include mobile {
                margin: scaling(64) 0;
            }
        }

        &Inner {
            width: 100%;
            padding: 0 scaling(16);

            @include desktop--large {
                width: (1120 * 100% / 1600);
                padding: 0 scaling(32);
            }

            @include desktop {
                width: (840 * 100% / 1200);
                padding: 0 scaling(24);
            }

            @include desktop--small {
                width: (680 * 100% / 980);
                padding: 0 scaling(20);
            }

            #{$component}-element--centered & {
                padding: 0 scaling(160);

                @include desktop {
                    padding: 0 scaling(96);
                }

                @include desktop--small {
                    padding: 0 scaling(60);
                }

                @include laptop {
                    padding: 0 scaling(112);
                }

                @include tablet {
                    padding: 0 scaling(56);
                }

                @include mobile {
                    padding: 0 scaling(16);
                }
            }

            #{$component}-element--gallery &,
            #{$component}-element--image--full & {
                padding: 0;
            }
        }

        &Inserts {
            width: 100%;
        }
    }
}
</style>
