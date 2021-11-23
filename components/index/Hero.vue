<template>
    <div class="Hero">
        <div class="Hero-wrapper">
            <div ref="logo" class="Hero-logo">
                <div class="Hero-logoInner">
                    <div class="Hero-logoImage">
                        <img src="~assets/images/index/index-logo.png" alt="" />
                    </div>
                </div>
                <div class="Hero-logoQuadriga">
                    <picture>
                        <source
                            srcset="
                                ~assets/images/index/home-1.png    1x,
                                ~assets/images/index/home-1@2x.png 2x
                            "
                        />
                        <img src="~assets/images/index/home-1.png" />
                    </picture>
                </div>
            </div>
            <div class="Hero-item">
                <div class="Hero-itemInner" :class="[item.size, item.type]">
                    <component
                        :is="mappedComponents[item.type]"
                        :items="getItems(item)"
                        :is-small-only-mobile="true"
                    />
                </div>
                <!-- TODO: Max asked for a temporary logo -->
                <div class="Hero-itemIcon">
                    <svg-icon name="header-main" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { HOME_BLOCK_TYPES } from '~/utils/constants';
import IndexItem from '~/components/index/IndexItem';
import IndexItemGroup from '~/components/index/IndexItemGroup';

export default {
    name: 'Hero',

    components: { IndexItem, IndexItemGroup },

    props: {
        item: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            mappedComponents: {
                [HOME_BLOCK_TYPES.item]: 'IndexItem',
                [HOME_BLOCK_TYPES.group]: 'IndexItemGroup'
            }
        };
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            const headerHeight =
                document.querySelector('.Header').clientHeight + 1;
            this.$refs.logo.style.marginTop = `${-headerHeight}px`;
        },

        getItems(item) {
            return item.items
                ? item.type === HOME_BLOCK_TYPES.item
                    ? item.items[0]
                    : item.items
                : undefined;
        }
    }
};
</script>

<style lang="scss" scoped>
.Hero {
    $component: &;

    width: 100%;
    position: relative;

    &-wrapper {
        width: 100%;
        display: flex;
        position: relative;
        border-bottom: 1px solid $c-black;
    }

    &-logo {
        @include m-aspectRatio(480, 806);

        width: (480 * 100% / 1920);
        border-right: 1px solid $c-black;
        z-index: ($z-header - 1);
        background-color: $c-white;
        margin-top: scaling(-96);

        @include laptop {
            display: none;
        }

        @include tablet {
            display: none;
        }

        @include mobile {
            display: none;
        }

        &Inner {
            position: absolute;
            padding: scaling(58);
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: flex-start;
        }

        &Image {
            @include m-aspectRatio(364, 369);

            width: 100%;

            img {
                @include m-absoluteObjectFit;
            }
        }

        &Quadriga {
            position: absolute;
            bottom: scaling(-45);
            left: 0;

            @include desktop {
                bottom: scaling(-35);
            }

            @include desktop--small {
                bottom: scaling(-29);
            }

            img {
                width: 100%;
            }
        }
    }

    &-item {
        width: (1440 * 100% / 1920);
        background-color: $c-gold;

        @include desktop--large {
            @include m-aspectRatio(1440, 710);
        }

        @include desktop {
            @include m-aspectRatio(1440, 710);
        }

        @include desktop--small {
            @include m-aspectRatio(1440, 710);
        }

        @include laptop {
            @include m-aspectRatio(960, 510);

            width: 100%;
        }

        @include tablet {
            @include m-aspectRatio(768, 510);

            width: 100%;
        }

        @include mobile {
            width: 100%;
        }

        &Inner {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            @include mobile {
                position: relative;
            }
        }

        &Icon {
            position: absolute;
            top: scaling(20);
            left: 0;
            right: 0;
            display: none;
            width: scaling(142);
            height: scaling(59);
            margin: 0 auto;

            @include laptop {
                display: block;
            }

            @include tablet {
                display: block;
            }

            @include mobile {
                display: block;
            }

            svg {
                width: 100%;
                height: 100%;
                fill: $c-white;
            }
        }
    }
}
</style>
