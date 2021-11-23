<template lang="html">
    <nuxt-link
        :to="`/performances/${$route.params.slug}/${slug}`"
        class="SeasonImageCard"
        :class="[
            scene ? `SeasonImageCard--${scene.type_scene}` : '',
            !image.url ? 'noPicture' : ''
        ]"
    >
        <div
            ref="head"
            class="SeasonImageCard-head"
            :style="{ height: headHeight }"
        >
            <div ref="headInner" class="SeasonImageCard-headInner">
                <div
                    ref="caption"
                    class="SeasonImageCard-caption"
                    v-text="caption"
                ></div>
                <div
                    v-if="info"
                    ref="info"
                    class="SeasonImageCard-info"
                    v-text="info"
                ></div>
            </div>
        </div>
        <div class="SeasonImageCard-wrapper">
            <div class="SeasonImageCard-body">
                <div class="SeasonImageCard-imageOuter">
                    <div class="SeasonImageCard-imageInner">
                        <picture v-if="image.url">
                            <source :srcset="image.url2x" />
                            <img :src="image.url" />
                        </picture>
                    </div>
                </div>
                <div class="SeasonImageCard-title" v-text="title"></div>
                <div class="SeasonImageCard-musician" v-text="musician"></div>
            </div>
            <div class="SeasonImageCard-footer">
                <div class="SeasonImageCard-date" v-text="date"></div>
                <div
                    class="SeasonImageCard-restriction"
                    v-text="restriction"
                ></div>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
import { DateTime } from 'luxon';

import { mapState } from 'vuex';

import { EVENTS } from '@/utils/constants';
import { formattedRange } from '@/utils/utils';

export default {
    name: 'SeasonImageCard',

    model: {
        prop: 'on-update-height',
        event: EVENTS.onUpdateHeight
    },

    props: {
        caption: {
            type: String,
            required: true
        },
        info: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        musician: {
            type: String,
            required: true
        },
        beginAt: {
            type: String,
            default: ''
        },
        endAt: {
            type: String,
            default: ''
        },
        restriction: {
            type: String,
            required: true
        },
        scene: {
            type: Object,
            default: () => ({})
        },
        image: {
            type: Object,
            default: () => ({})
        },
        headHeight: {
            type: String,
            default: 'auto'
        }
    },

    computed: {
        date() {
            const beginAt = DateTime.fromISO(this.beginAt, {
                locale: this.currentLocaleCode
            });
            const endAt = DateTime.fromISO(this.endAt, {
                locale: this.currentLocaleCode
            });

            return formattedRange(beginAt, endAt);
        },

        ...mapState(['currentLocaleCode'])
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },

    deactivated() {
        window.removeEventListener('resize', this.onResize);

        this.$destroy();
    },

    methods: {
        onResize() {
            this.getHeightHead();
        },

        getHeightHead() {
            this.$emit(
                EVENTS.onUpdateHeight,
                this.$refs.headInner.scrollHeight
            );
        }
    }
};
</script>

<style lang="scss">
.SeasonImageCard {
    $component: &;

    padding: scaling(36) scaling(40);
    box-shadow: 1px 1px 0 $c-black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: (100% / 4);

    @include hover {
        &:hover {
            #{$component}-title {
                color: $c-red;
            }

            #{$component}-imageOuter {
                background-color: $c-red;
                border-color: $c-red;
            }
        }
    }

    @include desktop {
        padding: scaling(28) scaling(30);
    }

    @include desktop--small {
        padding: scaling(24) scaling(20);
    }

    @include laptop {
        width: (100% / 3);
        padding: scaling(24) scaling(20);
    }

    @include tablet {
        width: (100% / 2);
        padding: scaling(20) scaling(16);
    }

    @include mobile {
        width: 100%;
        padding: scaling(20);
    }

    &.noPicture #{$component}-imageInner {
        background-color: $c-red;
    }

    &--new.noPicture #{$component}-imageInner {
        background-color: $c-green;
    }

    &--chamber.noPicture #{$component}-imageInner {
        background-color: $c-blue;
    }

    &--historical.noPicture #{$component}-imageInner {
        background-color: $c-red;
    }

    &--beethoven.noPicture #{$component}-imageInner {
        background-color: #99538a;
    }

    &-head {
        display: flex;
        flex-direction: column;
        align-items: center;

        &Inner {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    &-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: scaling(80);
        flex: 1;
    }

    &-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: scaling(100);
    }

    &-footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        margin-top: auto;
    }

    &-caption {
        @include text;

        color: $c-gray;
        text-align: center;

        @include tablet {
            font-size: scaling(18);
        }
    }

    &-info {
        @include text;

        text-align: center;
        margin-top: scaling(12);
        color: $c-gray;

        @include desktop--large {
            font-size: scaling(14);
        }

        @include desktop {
            font-size: scaling(14);
        }

        @include desktop--small {
            margin-top: scaling(8);
        }

        @include laptop {
            margin-top: scaling(8);
        }

        @include tablet {
            margin-top: scaling(8);
        }

        @include mobile {
            font-size: scaling(12);
            margin-top: scaling(4);
        }
    }

    &-title {
        @include title;

        color: $c-black;
        text-align: center;
        transition: color $d-hover;

        @include laptop {
            font-size: scaling(24);
        }

        @include tablet {
            font-size: scaling(18);
        }
    }

    &-musician {
        @include text;

        color: $c-black;
        margin-top: scaling(16);
        text-align: center;

        @include desktop--small {
            margin-top: scaling(12);
        }

        @include laptop {
            margin-top: scaling(12);
        }

        @include tablet {
            margin-top: scaling(12);
        }

        @include mobile {
            margin-top: scaling(8);
        }
    }

    &-date,
    &-restriction {
        @include text;

        color: $c-gray;
        text-align: center;

        @include tablet {
            font-size: scaling(18);
        }

        @include mobile {
            font-size: scaling(12);
        }
    }

    &-restriction {
        margin-top: scaling(20);

        @include desktop {
            margin-top: scaling(16);
        }

        @include desktop--small {
            margin-top: scaling(16);
        }

        @include laptop {
            margin-top: scaling(12);
        }

        @include tablet {
            margin-top: scaling(16);
        }

        @include mobile {
            margin-top: scaling(12);
        }
    }

    &-imageInner {
        @include m-aspectRatio(112, 240);

        width: scaling(112);
        height: scaling(240);
        margin: scaling(8);
        border-top-left-radius: scaling(220);
        border-top-right-radius: scaling(220);
        display: block;
        overflow: hidden;

        img {
            @include m-absoluteObjectFit();
        }

        @include desktop {
            width: scaling(84);
            height: scaling(180);
            margin: scaling(6);
        }

        @include desktop--small {
            width: scaling(72);
            height: scaling(152);
            margin: scaling(4);
        }

        @include laptop {
            width: scaling(72);
            height: scaling(152);
            margin: scaling(4);
        }

        @include tablet {
            width: scaling(84);
            height: scaling(180);
            margin: scaling(6);
        }

        @include mobile {
            width: scaling(72);
            height: scaling(152);
            margin: scaling(4);
        }
    }

    &-imageOuter {
        border: 1px solid $c-black;
        border-top-left-radius: scaling(220);
        border-top-right-radius: scaling(220);
        margin-bottom: scaling(40);
        display: block;
        transition: background-color $d-hover, border-color $d-hover;

        @include desktop {
            margin-bottom: scaling(36);
        }

        @include desktop--small {
            margin-bottom: scaling(28);
        }

        @include laptop {
            margin-bottom: scaling(24);
        }

        @include mobile {
            margin-bottom: scaling(24);
        }
    }
}
</style>
