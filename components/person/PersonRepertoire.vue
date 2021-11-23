<template>
    <div class="PersonRepertoire">
        <CommonTitle title="Репертуар" theme="isGray" />
        <div
            v-for="(section, sectionIndex) in repertoire"
            :key="sectionIndex"
            class="PersonRepertoire-section"
        >
            <div class="PersonRepertoire-year" v-text="section.year"></div>
            <div class="PersonRepertoire-list">
                <div
                    v-for="(item, index) in section.list"
                    :key="index"
                    class="PersonRepertoire-listItem"
                    :class="{
                        withoutSidebar: !item.subtitle || !item.caption,
                        isLink: item.url
                    }"
                >
                    <HiddenLink v-if="item.url" :url="item.url" />
                    <div
                        v-if="item.subtitle || item.caption"
                        class="PersonRepertoire-listItemSidebar"
                    >
                        <div
                            class="PersonRepertoire-listItemSubtitle"
                            v-text="item.subtitle.join(', ')"
                        ></div>
                        <div
                            v-if="item.caption"
                            class="PersonRepertoire-listItemCaption"
                            v-text="item.caption"
                        ></div>
                    </div>
                    <div class="PersonRepertoire-listItemContent">
                        <div class="PersonRepertoire-listItemContentInner">
                            <div
                                class="PersonRepertoire-listItemTitle"
                                v-text="item.title"
                            ></div>
                            <p
                                class="PersonRepertoire-listItemDescription"
                                v-text="item.description"
                            ></p>
                            <div
                                class="PersonRepertoire-listItemChoreographer"
                                v-text="item.choreographer"
                            ></div>
                        </div>
                        <div
                            v-if="item.image"
                            class="PersonRepertoire-listItemImage"
                        >
                            <div class="PersonRepertoire-listItemImageInner">
                                <picture>
                                    <source
                                        :srcset="
                                            item.image +
                                            ' 1x, ' +
                                            item.image2x +
                                            ' 2x'
                                        "
                                    />
                                    <img :src="item.image" alt="" />
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="repertoire.length >= 10"
            class="PersonRepertoire-button"
            v-text="`Скрыть весь репертуар`"
        ></div>
    </div>
</template>

<script>
import CommonTitle from '~/components/common/CommonTitle';
import HiddenLink from '~/components/common/HiddenLink';

export default {
    name: 'PersonRepertoire',

    components: {
        CommonTitle,
        HiddenLink
    },

    props: {
        repertoire: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
@mixin text {
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

.PersonRepertoire {
    $component: &;

    @include laptop {
        margin-bottom: -1px;
    }

    @include tablet {
        margin-bottom: -1px;
    }

    @include mobile {
        margin-bottom: -1px;
    }

    &-section {
        display: flex;
        flex-wrap: wrap;
    }

    &-year {
        @include text;

        width: 100%;
        padding: scaling(20) scaling(16);
        border-bottom: 1px solid $c-black;

        @include desktop--large {
            padding: scaling(36) scaling(32);
        }

        @include desktop {
            padding: scaling(28) scaling(24);
        }

        @include desktop--small {
            padding: scaling(24) scaling(20);
        }

        @include laptop {
            width: (240 * 100% / 960);
            border-right: 1px solid $c-black;
        }

        @include tablet {
            width: (192 * 100% / 768);
            border-right: 1px solid $c-black;
        }
    }

    &-list {
        width: 100%;

        @include laptop {
            flex: 1;
        }

        @include tablet {
            flex: 1;
        }

        &Item {
            display: flex;
            justify-content: space-between;
            padding: scaling(20) scaling(16);
            border-bottom: 1px solid $c-black;
            position: relative;

            @include desktop--large {
                padding: scaling(32);
            }

            @include desktop {
                padding: scaling(24);
            }

            @include desktop--small {
                padding: scaling(20);
            }

            @include mobile {
                flex-direction: column;
            }

            @include hover {
                &:is(.isLink):hover #{$component}-listItem {
                    &Title {
                        color: $c-red;
                    }

                    &Image {
                        border-color: $c-red;
                        background-color: $c-red;
                    }
                }
            }

            &Sidebar {
                width: scaling(250);
                margin-right: scaling(30);

                @include mobile {
                    width: 100%;
                    margin-right: 0;
                    margin-bottom: scaling(4);
                }
            }

            &Subtitle {
                @include text;

                color: $c-black;

                @include mobile {
                    line-height: $lh-150;
                    letter-spacing: -0.01em;
                }
            }

            &Caption {
                margin-top: scaling(7);

                @include desktop--large {
                    margin-top: scaling(6);
                }

                @include desktop--small {
                    margin-top: scaling(8);
                }

                @include mobile {
                    margin-top: scaling(4);
                }
            }

            &Content {
                display: flex;
                align-items: center;

                @include mobile {
                    align-items: flex-end;
                }

                #{$component}-listItem.withoutSidebar & {
                    width: 100%;
                }

                &Inner {
                    @include desktop--large {
                        width: scaling(288);
                    }

                    @include desktop {
                        width: scaling(236);
                    }

                    @include desktop--small {
                        width: scaling(200);
                    }

                    @include laptop {
                        width: scaling(320);
                    }

                    @include tablet {
                        width: scaling(256);
                    }

                    @include mobile {
                        width: scaling(208);
                    }

                    #{$component}-listItem.withoutSidebar & {
                        width: 100%;
                    }
                }
            }

            &Caption,
            &Description,
            &Choreographer {
                color: $c-gray;
                font-size: scaling(12);
                line-height: $lh-130;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(14);
                    line-height: $lh-150;
                }

                @include desktop {
                    font-size: scaling(14);
                }

                @include laptop {
                    font-size: scaling(14);
                }

                @include mobile {
                    line-height: $lh-140;
                }
            }

            &Title {
                color: $c-black;
                font-size: scaling(14);
                line-height: $lh-140;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                font-weight: $fw-bold;
                font-feature-settings: 'ss02' on;
                transition: color $d-hover ease-in-out;

                @include desktop--large {
                    font-size: scaling(20);
                    line-height: $lh-120;
                }

                @include desktop {
                    font-size: scaling(18);
                    line-height: $lh-120;
                }

                @include mobile {
                    margin-bottom: scaling(8);
                    font-size: scaling(20);
                    line-height: $lh-120;
                    letter-spacing: 0.02em;
                }
            }

            &Description {
                margin: scaling(8) 0 scaling(56);

                @include desktop {
                    margin: scaling(8) 0 scaling(64);
                }

                @include desktop--small {
                    margin: scaling(6) 0 scaling(72);
                }

                @include tablet {
                    margin: scaling(8) 0 scaling(72);
                }

                @include mobile {
                    display: none;
                }
            }

            &Image {
                flex-shrink: 0;
                width: scaling(64);
                height: scaling(128);
                margin-left: scaling(32);
                padding: scaling(4);
                border: 1px solid $c-black;
                border-top-left-radius: scaling(220);
                border-top-right-radius: scaling(220);
                transition: border-color $d-hover ease-in-out,
                    background-color $d-hover ease-in-out;

                @include desktop--small {
                    margin-left: scaling(16);
                }

                @include laptop {
                    margin-left: scaling(64);
                }

                @include mobile {
                    margin-left: scaling(16);
                }

                &Inner {
                    height: 100%;
                    border-top-left-radius: scaling(220);
                    border-top-right-radius: scaling(220);
                    overflow: hidden;
                }

                img {
                    @include m-objectFit;

                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    &-button {
        padding: scaling(14) 0;
        background-color: $c-black;
        cursor: pointer;
        color: $c-white;
        font-size: scaling(14);
        line-height: $lh-120;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        text-align: center;
        font-weight: $fw-bold;
        font-feature-settings: 'ss02' on;
        transition: background-color $d-hover ease-in-out;

        @include desktop--large {
            padding: scaling(24) 0;
            font-size: scaling(20);
        }

        @include desktop {
            padding: scaling(16) 0;
            font-size: scaling(18);
        }

        @include desktop--small {
            padding: scaling(12) 0 scaling(13);
            line-height: $lh-140;
        }

        @include mobile {
            padding: scaling(15) 0 scaling(16);
        }

        @include hover {
            &:hover {
                background-color: $c-red;
            }
        }
    }
}
</style>
