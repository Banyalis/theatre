<template>
    <div class="BlocksList">
        <div ref="grid" class="BlocksList-wrapper">
            <div ref="sizer" class="sizer"></div>
            <div
                v-for="(item, index) in list"
                :key="index"
                class="BlocksList-item"
                :class="[
                    item.size,
                    item.type,
                    { isSmallOnlyMobile: listWideBlocks[index] }
                ]"
                :data-size="item.size"
                :data-type="item.type"
            >
                <div class="BlocksList-itemOutter">
                    <div class="BlocksList-itemInner">
                        <component
                            :is="mappedComponents[item.type]"
                            :items="getItems(item)"
                            :events="item.events"
                            :partners="item.partners"
                            :news="item.news"
                            :changes="item.newsChanges"
                            :is-small-only-mobile="listWideBlocks[index]"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { HOME_BLOCK_TYPES } from '~/utils/constants';
// import IndexItem from '~/components/index/IndexItem';
// import IndexItemGroup from '~/components/index/IndexItemGroup';
// import IndexEvents from '~/components/index/IndexEvents';
import IndexPartners from '~/components/index/IndexPartners';
import IndexNews from '~/components/index/IndexNews';

export default {
    name: 'BlocksList',

    components: {
        // IndexItem,
        // IndexItemGroup,
        // IndexEvents,
        IndexPartners,
        IndexNews
    },

    props: {
        list: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            masonry: undefined,
            listItems: [],
            listWideBlocks: [],
            mappedComponents: {
                [HOME_BLOCK_TYPES.item]: 'IndexItem',
                [HOME_BLOCK_TYPES.group]: 'IndexItemGroup',
                [HOME_BLOCK_TYPES.events]: 'IndexEvents',
                [HOME_BLOCK_TYPES.partners]: 'IndexPartners',
                [HOME_BLOCK_TYPES.news]: 'IndexNews'
            }
        };
    },

    mounted() {
        let subArray = [];
        this.list.forEach((item, index) => {
            this.listWideBlocks.push(false);

            if (
                [
                    HOME_BLOCK_TYPES.events,
                    HOME_BLOCK_TYPES.news,
                    HOME_BLOCK_TYPES.announcements,
                    HOME_BLOCK_TYPES.partners
                ].includes(item.type)
            ) {
                this.listItems.push(subArray);
                subArray = [];
            } else {
                subArray.push({ realIndex: index, item });
            }
        });

        !!subArray.length && this.listItems.push(subArray);

        this.setWideBlocks();

        setTimeout(this.initMasonry, 100);
    },

    methods: {
        getItems(item) {
            return item.items
                ? [HOME_BLOCK_TYPES.item, HOME_BLOCK_TYPES.news].includes(
                      item.type
                  )
                    ? item.items[0]
                    : item.items
                : undefined;
        },

        setWideBlocks() {
            this.list.forEach((listItem, index) => {
                const currentSequence = this.listItems.filter(
                    (items) =>
                        !!items.filter((i) => i.realIndex === index).length
                );
                let isWide = false;

                if (currentSequence.length) {
                    isWide = !!currentSequence[0].filter((i, id) => {
                        return (
                            i.realIndex === index &&
                            id === currentSequence[0].length - 1 &&
                            id % 2 === 0
                        );
                    }).length;
                }

                if (isWide) {
                    const newListWideBlocks = this.listWideBlocks;
                    newListWideBlocks[index] = isWide;
                    this.listWideBlocks = [...newListWideBlocks];
                }
            });
        },

        initMasonry() {
            this.masonry = new this.$masonry(this.$refs.grid, {
                columnWidth: this.$refs.sizer,
                percentPosition: true,
                stagger: 0,
                transitionDuration: 0,
                itemSelector: '.BlocksList-item'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.BlocksList {
    $component: &;

    width: 100%;
    position: relative;

    &-wrapper {
        width: 100%;
        position: relative;
    }

    .sizer {
        opacity: 0;
        pointer-events: none;
        width: (320 * 100% / 1920);
    }

    &-item {
        width: 100%;
        position: relative;
        display: flex;

        @include laptop {
            width: 50% !important;
        }

        @include tablet {
            width: 50% !important;
        }

        @include mobile {
            width: 100% !important;
        }

        &Outter {
            width: 100%;
        }

        &Inner {
            @include m-absolute100;

            border-right: 1px solid $c-black;
            border-bottom: 1px solid $c-black;

            @include mobile {
                border-right: none;
            }

            #{$component}-item.isSmallOnlyMobile:last-child & {
                border-bottom: none;
            }

            #{$component}-item.news & {
                position: relative;
            }
        }

        &.full {
            width: 100%;

            #{$component}-itemOutter {
                @include allDesktopHome {
                    @include m-aspectRatio(1920, 710);
                }

                @include laptop {
                    @include m-aspectRatio(480, 640);
                }

                @include tablet {
                    @include m-aspectRatio(384, 578);
                }

                @include mobile {
                    @include m-aspectRatio(320, 466);
                }
            }
        }

        &.xLarge {
            width: (1280 * 100% / 1920);

            #{$component}-itemOutter {
                @include allDesktopHome {
                    @include m-aspectRatio(1280, 540);
                }

                @include laptop {
                    @include m-aspectRatio(480, 640);
                }

                @include tablet {
                    @include m-aspectRatio(384, 578);
                }

                @include mobile {
                    @include m-aspectRatio(320, 466);
                }
            }
        }

        &.large {
            width: (1280 * 100% / 1920);

            #{$component}-itemOutter {
                @include allDesktopHome {
                    @include m-aspectRatio(1280, 540);
                }

                @include laptop {
                    @include m-aspectRatio(480, 640);
                }

                @include tablet {
                    @include m-aspectRatio(384, 578);
                }

                @include mobile {
                    @include m-aspectRatio(320, 466);
                }
            }
        }

        &.medium {
            width: (960 * 100% / 1920);

            #{$component}-itemOutter {
                @include allDesktopHome {
                    @include m-aspectRatio(960, 710);
                }

                @include laptop {
                    @include m-aspectRatio(480, 640);
                }

                @include tablet {
                    @include m-aspectRatio(384, 578);
                }

                @include mobile {
                    @include m-aspectRatio(320, 466);
                }
            }
        }

        &.small {
            width: (640 * 100% / 1920);

            #{$component}-itemOutter {
                @include allDesktopHome {
                    @include m-aspectRatio(640, 540);
                }

                @include laptop {
                    @include m-aspectRatio(480, 640);
                }

                @include tablet {
                    @include m-aspectRatio(384, 578);
                }

                @include mobile {
                    @include m-aspectRatio(320, 466);
                }
            }
        }

        &.high {
            width: (640 * 100% / 1920);

            #{$component}-itemOutter {
                @include allDesktopHome {
                    @include m-aspectRatio(640, 1080);
                }

                @include laptop {
                    @include m-aspectRatio(480, 640);
                }

                @include tablet {
                    @include m-aspectRatio(384, 578);
                }

                @include mobile {
                    @include m-aspectRatio(320, 466);
                }
            }

            &:not(.group) #{$component}-itemOutter {
                @include mobile {
                    @include m-aspectRatio(320, 520);
                }
            }
        }

        &.isSmallOnlyMobile {
            @include laptop {
                width: 100% !important;

                #{$component}-itemOutter {
                    @include m-aspectRatio(960, 400);
                }
            }

            @include tablet {
                width: 100% !important;

                #{$component}-itemOutter {
                    @include m-aspectRatio(768, 384);
                }
            }
        }

        &.events {
            width: 100% !important;

            #{$component}-itemOutter {
                @include allDesktopHome {
                    @include m-aspectRatio(1920, 950);
                }

                @include laptop {
                    @include m-aspectRatio(960, 604);
                }

                @include tablet {
                    @include m-aspectRatio(768, 566);
                }

                @include mobile {
                    @include m-aspectRatio(320, 442);
                }
            }
        }

        &.partners {
            width: 100% !important;

            #{$component}-itemOutter {
                @include desktop--large {
                    @include m-aspectRatio(1920, 456);
                }

                @include desktop {
                    @include m-aspectRatio(1440, 378);
                }

                @include desktop--small {
                    @include m-aspectRatio(1200, 336);
                }

                @include laptop {
                    @include m-aspectRatio(960, 292);
                }

                @include tablet {
                    @include m-aspectRatio(768, 256);
                }
            }

            #{$component}-itemInner {
                @include mobile {
                    position: relative;
                }
            }
        }

        &.news {
            width: 100% !important;

            #{$component}-itemInner {
                position: relative;
            }
        }

        &.group {
            @include mobile {
                #{$component}-itemOutter {
                    @include m-aspectRatio(320, 590);
                }
            }
        }
    }
}
</style>
