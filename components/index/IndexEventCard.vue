<template>
    <div
        class="IndexEventCard"
        :class="[
            item.scene ? `IndexEventCard--${item.scene.type}` : '',
            !item.image ? 'noPicture' : ''
        ]"
    >
        <nuxt-link
            :to="item.url"
            class="IndexEventCard-wrapper b-scaled-paddings"
        >
            <div class="IndexEventCard-date">
                <div class="IndexEventCard-dateNumber" v-text="date"></div>
                <div class="IndexEventCard-dateTime" v-text="item.time"></div>
            </div>
            <div class="IndexEventCard-image">
                <div class="IndexEventCard-imageInner">
                    <img
                        v-if="item.image"
                        v-lazy="item.image"
                        :data-srcset="
                            item.image + ' 1x, ' + item.image2x + ' 2x'
                        "
                        :alt="item.title"
                    />
                    <template v-else>
                        <div
                            v-if="item.scene.type === 'new'"
                            class="
                                IndexEventCard-imageStub
                                IndexEventCard-imageStub--new
                            "
                        >
                            <svg-icon name="icon-stub-new" />
                        </div>
                        <div
                            v-else-if="item.scene.type === 'chamber'"
                            class="
                                IndexEventCard-imageStub
                                IndexEventCard-imageStub--chamber
                            "
                        >
                            <svg-icon name="icon-stub-chamber" />
                        </div>
                        <div
                            v-else-if="item.scene.type === 'historical'"
                            class="
                                IndexEventCard-imageStub
                                IndexEventCard-imageStub--historical
                            "
                        >
                            <svg-icon name="icon-stub-historical" />
                        </div>
                        <div
                            v-else-if="item.scene.type === 'beethoven'"
                            class="
                                IndexEventCard-imageStub
                                IndexEventCard-imageStub--beethoven
                            "
                        >
                            <svg-icon name="icon-stub-beethoven" />
                        </div>
                    </template>
                </div>
            </div>
            <div class="IndexEventCard-info">
                <div
                    class="IndexEventCard-infoCategory"
                    v-text="category"
                ></div>
                <div
                    ref="title"
                    class="IndexEventCard-infoTitle"
                    :class="{ isSmall: isSmallTitle }"
                    v-text="item.title"
                ></div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
import { DateTime } from 'luxon';
import { mapState } from 'vuex';

export default {
    name: 'IndexEventCard',

    props: {
        item: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            isSmallTitle: false
        };
    },

    computed: {
        category() {
            const category = this.item.category && this.item.category[0];
            if (['o', 'b'].includes(category)) {
                return this.$t(`Index.categories.${category}`);
            }
            return this.item.category;
        },

        date() {
            return DateTime.fromISO(this.item.datetime)
                .setLocale(this.currentLocaleCode)
                .toFormat('dd MMMM');
        },

        ...mapState(['currentLocaleCode'])
    },

    mounted() {
        const getTitleLength = this.$refs.title.innerHTML.length;

        this.isSmallTitle = getTitleLength > 45;
    }
};
</script>

<style lang="scss" scoped>
.IndexEventCard {
    $component: &;

    width: 100%;
    position: relative;
    height: 100%;

    @include mobile {
        min-height: scaling(374);
    }

    @include hover {
        &:hover #{$component}-infoTitle {
            color: $c-red !important;
        }
    }

    &--new {
        &.noPicture #{$component}-imageInner {
            background-color: #415923;
        }

        @include hover {
            &:hover #{$component}-image {
                border-color: #415923;
                background-color: #415923;
            }
        }
    }

    &--chamber {
        &.noPicture #{$component}-imageInner {
            background-color: #185289;
        }

        @include hover {
            &:hover #{$component}-image {
                border-color: #185289;
                background-color: #185289;
            }
        }
    }

    &--historical {
        &.noPicture #{$component}-imageInner {
            background-color: #8f1e32;
        }

        @include hover {
            &:hover #{$component}-image {
                border-color: #8f1e32;
                background-color: #8f1e32;
            }
        }
    }

    &--beethoven {
        &.noPicture #{$component}-imageInner {
            background-color: #6b2f5e;
        }

        @include hover {
            &:hover #{$component}-image {
                border-color: #6b2f5e;
                background-color: #6b2f5e;
            }
        }
    }

    &-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;

        @include desktop--large {
            padding-top: scaling(88);
        }

        @include desktop {
            padding-top: scaling(64);
        }

        @include desktop--small {
            padding-top: scaling(56);
        }

        @include laptop {
            padding-top: scaling(60);
        }

        @include tablet {
            padding-top: scaling(60);
        }

        @include mobile {
            padding-top: scaling(36);
        }
    }

    &-date {
        color: $c-black;
        text-align: center;

        @include desktop--large {
            line-height: $lh-150;
        }

        @include desktop {
            line-height: $lh-130;
        }

        @include desktop--small {
            line-height: $lh-140;
        }

        @include laptop {
            line-height: $lh-140;
        }

        @include tablet {
            line-height: $lh-140;
        }

        @include mobile {
            line-height: $lh-130;
        }

        &Number {
            @include body-1;
        }

        &Time {
            @include body-1;
        }
    }

    &-image {
        width: scaling(80);
        height: scaling(160);
        padding: scaling(4);
        border: 1px solid $c-black;
        border-top-left-radius: scaling(220);
        border-top-right-radius: scaling(220);
        transition: border-color $d-hover ease-in-out,
            background-color $d-hover ease-in-out;

        @include desktop--large {
            width: scaling(128);
            height: scaling(256);
            padding: scaling(8);
            margin-top: scaling(60);
        }

        @include desktop {
            width: scaling(96);
            height: scaling(192);
            padding: scaling(6);
            margin-top: scaling(52);
        }

        @include desktop--small {
            margin-top: scaling(52);
        }

        @include laptop {
            margin-top: scaling(52);
        }

        @include tablet {
            width: scaling(64);
            height: scaling(128);
            margin-top: scaling(40);
        }

        @include mobile {
            width: scaling(64);
            height: scaling(128);
            margin-top: scaling(24);
        }

        img {
            @include m-objectFit;

            width: 100%;
            height: 100%;
        }

        &Inner {
            height: 100%;
            border-top-left-radius: scaling(220);
            border-top-right-radius: scaling(220);
            overflow: hidden;
        }

        &Stub {
            width: 100%;
            height: 100%;

            &--new svg {
                stroke: #649e37;
            }

            &--chamber svg {
                stroke: #55a2ea;
            }

            &--historical svg {
                stroke: #e37d8f;
            }

            &--beethoven svg {
                stroke: #bf67ab;
            }

            svg {
                width: 100%;
                height: 100%;
            }
        }
    }

    &-info {
        @include desktop--large {
            margin-top: scaling(88);
        }

        @include desktop {
            margin-top: scaling(64);
        }

        @include desktop--small {
            margin-top: scaling(56);
        }

        @include laptop {
            margin-top: scaling(60);
        }

        @include tablet {
            margin-top: scaling(60);
        }

        @include mobile {
            margin-top: scaling(36);
        }

        &Category {
            @include text;

            color: $c-gray;
            text-align: center;
        }

        &Title {
            @include heading-4;

            margin-top: scaling(12);
            color: $c-black;
            text-align: center;
            white-space: pre-line;
            margin-bottom: scaling(20);
            transition: $d-hover color;

            @include desktop--large {
                margin-top: scaling(16);

                &.isSmall {
                    font-size: scaling(24);
                }
            }

            @include desktop {
                margin-top: scaling(16);

                &.isSmall {
                    font-size: scaling(19);
                }
            }

            @include desktop--small {
                &.isSmall {
                    font-size: scaling(16);
                }
            }

            @include mobile {
                margin-top: scaling(8);
                font-size: scaling(13);

                &.isSmall {
                    font-size: scaling(10);
                }
            }
        }
    }
}
</style>
