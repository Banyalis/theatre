<template>
    <div class="AboutSpectacleCard">
        <NuxtLink
            ref="button"
            to="/about/press"
            class="AboutSpectacleCard-link"
        >
            <div class="AboutSpectacleCard-linkIcon">
                <svg-icon name="icon-arrow" />
            </div>
            <div class="AboutSpectacleCard-linkTitle">Назад</div>
        </NuxtLink>
        <div ref="body" class="AboutSpectacleCard-body">
            <div class="AboutSpectacleCard-bodyInner">
                <div
                    v-if="item.image || item.image2x"
                    class="AboutSpectacleCard-image"
                >
                    <div class="AboutSpectacleCard-imageInner">
                        <picture>
                            <source
                                :srcset="
                                    item.image + ' 1x, ' + item.image2x + ' 2x'
                                "
                            />
                            <img :src="item.image" alt="" />
                        </picture>
                    </div>
                </div>
                <div class="AboutSpectacleCard-content">
                    <div
                        v-if="item.title"
                        class="AboutSpectacleCard-title"
                        v-text="item.title"
                    ></div>
                    <RoundedButton
                        v-if="item.button"
                        type="isTransparentBlack"
                        class="AboutSpectacleCard-button"
                        :link="{
                            title: item.button.title,
                            url: item.button.link
                        }"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { isDesktopSmall } from '@/utils/utils';
import RoundedButton from '@/components/other/RoundedButton';
export default {
    name: 'AboutSpectacleCard',

    components: {
        RoundedButton
    },

    props: {
        item: {
            type: Object,
            required: true
        }
    },

    computed: {
        ...mapState(['headerHeight']),
        ...mapState('popup', ['customTitle', 'data'])
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.$nextTick(this.onResize);
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            if (isDesktopSmall()) {
                this.$refs.body.style.height = `${
                    window.innerHeight -
                    this.$refs.button.$el.offsetHeight -
                    this.headerHeight
                }px`;
            } else {
                this.$refs.body.removeAttribute('style');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutSpectacleCard {
    @include desktop--large {
        height: calc(100vh - #{scaling(96)});
        position: sticky;
        top: scaling(96);
    }

    @include desktop {
        height: calc(100vh - #{scaling(73)});
        position: sticky;
        top: scaling(73);
    }

    @include desktop--small {
        height: calc(100vh - #{scaling(61)});
        position: sticky;
        top: scaling(61);
    }

    &-link {
        padding: scaling(22) 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid $c-black;

        @include desktop--large {
            padding: scaling(36) 0;
        }

        @include desktop {
            padding: scaling(25) 0;
        }

        @include mobile {
            padding: scaling(14) 0;
        }

        &Icon {
            display: flex;
            margin-right: scaling(12);

            svg {
                stroke: $c-black;
                width: scaling(19);
                height: scaling(9);

                @include desktop--large {
                    width: scaling(30);
                    height: scaling(16);
                }

                @include desktop {
                    width: scaling(30);
                    height: scaling(16);
                }
            }
        }

        &Title {
            @include text--button;

            color: $c-black;
        }
    }

    &-body {
        @include m-scrollbarHidden;

        padding: scaling(120) scaling(40) scaling(72);
        overflow-y: auto;

        @include desktop {
            padding: scaling(100) scaling(24) scaling(56);
        }

        @include desktop--small {
            padding: scaling(80) scaling(20) scaling(48);
        }

        @include laptop {
            padding: scaling(44) scaling(64) scaling(44) scaling(16);
        }

        @include tablet {
            padding: scaling(44) scaling(48) scaling(44) scaling(16);
        }

        @include mobile {
            padding: scaling(32) scaling(32);
        }

        &Inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100%;

            @include laptop {
                flex-direction: row-reverse;
                justify-content: space-between;
            }

            @include tablet {
                flex-direction: row-reverse;
                justify-content: space-between;
            }
        }
    }

    &-image {
        border: 1px solid $c-gray--header;
        border-top-left-radius: scaling(220);
        border-top-right-radius: scaling(220);

        @include desktop--large {
            width: scaling(128);
            height: scaling(256);
            padding: scaling(8);
            margin-bottom: scaling(48);
        }

        @include desktop {
            width: scaling(96);
            height: scaling(192);
            padding: scaling(6);
            margin-bottom: scaling(32);
        }

        @include desktop--small {
            width: scaling(80);
            height: scaling(160);
            padding: scaling(4);
            margin-bottom: scaling(28);
        }

        @include laptop {
            width: scaling(96);
            height: scaling(192);
            padding: scaling(6);
        }

        @include tablet {
            width: scaling(96);
            height: scaling(192);
            padding: scaling(6);
        }

        @include mobile {
            width: scaling(80);
            height: scaling(160);
            padding: scaling(4);
            margin-bottom: scaling(20);
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

    &-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        @include laptop {
            align-items: flex-start;
            max-width: scaling(608);
        }

        @include tablet {
            align-items: flex-start;
            max-width: scaling(544);
        }
    }

    &-title {
        @include heading-4;

        text-align: center;
        white-space: pre-line;

        @include laptop {
            margin-bottom: scaling(83);
            text-align: left;
            font-size: scaling(36);
        }

        @include tablet {
            margin-bottom: scaling(83);
            text-align: left;
            font-size: scaling(36);
        }

        @include mobile {
            margin-bottom: scaling(65);
            font-size: scaling(24);
        }
    }

    &-button {
        margin-top: scaling(20);
    }
}
</style>
