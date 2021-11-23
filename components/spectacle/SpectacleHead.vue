<template>
    <div ref="head" class="SpectacleHead" :class="{ isGolden }">
        <div class="SpectacleHead-main">
            <div class="SpectacleHead-row">
                <div
                    ref="title"
                    class="SpectacleHead-title"
                    v-text="concert.title"
                ></div>
                <div
                    v-if="concert.restriction"
                    class="SpectacleHead-restriction"
                    v-text="concert.restriction"
                ></div>
            </div>
            <div
                v-if="concert.artists"
                class="SpectacleHead-artists"
                v-text="concert.artists"
            ></div>
            <div
                v-if="concert.description"
                class="SpectacleHead-description"
                v-text="concert.description"
            ></div>
        </div>
        <div
            v-if="concert.sponsors || concert.tickets"
            class="SpectacleHead-footer"
        >
            <div v-if="concert.sponsors" class="SpectacleHead-sponsors">
                <div
                    class="SpectacleHead-sponsorsTitle"
                    v-text="concert.sponsors.title"
                ></div>
                <!-- eslint-disable -->
                <div
                    class="SpectacleHead-sponsorsText"
                    v-html="concert.sponsors.text"
                ></div>
                <!-- eslint-enable -->
                <div class="SpectacleHead-sponsorsLogos">
                    <div
                        v-for="(sponsor, index) in concert.sponsors.list"
                        :key="index"
                        class="SpectacleHead-sponsorsLogo"
                    >
                        <picture>
                            <img :src="sponsor" />
                        </picture>
                    </div>
                </div>
            </div>
            <div class="SpectacleHead-buyTickects" @click="scrollToTickets">
                <RoundedButton title="Билеты" type="isWhite" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import RoundedButton from '@/components/other/RoundedButton';
import { MEDIA_SIZES } from '@/utils/constants';
import VueScrollTo from 'vue-scrollto';
import { getCurrentMediaSize, isDesktopMedium } from '../../utils/utils';

export default {
    name: 'SpectacleHead',

    components: {
        RoundedButton
    },

    props: {
        concert: {
            type: Object,
            required: true
        },
        isGolden: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            // scales: [72, 60, 48, 36],
            defaultFontSizes: { desktopLarge: 80, desktop: 60 },
            breakHeights: { desktopLarge: 1080, desktop: 972 }
            // scaleIndex: 0
        };
    },

    computed: {
        ...mapState(['headerHeight'])
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
            if (isDesktopMedium()) {
                this.reduceFontSize();
            } else {
                this.$refs.title.removeAttribute('style');
            }
        },

        reduceFontSize() {
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;

            const title = this.$refs.title;

            const curMediaSize = getCurrentMediaSize();

            const coeffFontVW = windowWidth / MEDIA_SIZES[curMediaSize];
            const coeffFontVH = windowHeight / this.breakHeights[curMediaSize];

            const currentFontVW =
                this.defaultFontSizes[curMediaSize] * coeffFontVW;

            const currentFontSize =
                coeffFontVH < 1.04
                    ? currentFontVW * coeffFontVH
                    : currentFontVW * 1.04;

            title.style.fontSize = currentFontSize + 'px';
        },

        setMinHeight() {
            const headerHeight = document.querySelector('.Header').clientHeight;
            const head = this.$refs.head;

            head.style.minHeight = `calc(100vh - ${headerHeight}px)`;
            head.style.top = `${headerHeight}px`;
        },

        scrollToTickets() {
            const options = {
                offset: -this.headerHeight + 1
            };

            VueScrollTo.scrollTo(
                document.querySelector('.ConcertBody-schedule'),
                1000,
                options
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.SpectacleHead {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: scaling(20) scaling(16);
    box-shadow: 0 0 0 1px $c-black;
    background-color: $c-red;

    &.isGolden {
        background-color: $c-gold--lighten;

        @include mobile {
            min-height: scaling(400);
        }
    }

    @include desktop--large {
        height: calc(100vh - #{scaling(97)});
        padding: scaling(36) scaling(25.5);
        position: sticky;
        top: scaling(97);
    }

    @include desktop {
        height: calc(100vh - #{scaling(73)});
        padding: scaling(28) scaling(24);
        position: sticky;
        top: scaling(73);
    }

    @include desktop--small {
        min-height: scaling(500);
        padding: scaling(24) scaling(20);
    }

    @include laptop {
        min-height: scaling(432);
    }

    @include tablet {
        min-height: scaling(576);
    }

    @include mobile {
        min-height: scaling(520);
    }

    &-main {
        margin-bottom: scaling(20);
        flex-shrink: 0;

        @include mobile {
            margin-bottom: scaling(30);
        }
    }

    &-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: scaling(8);

        @include desktop--large {
            margin-bottom: scaling(20);
        }

        @include desktop {
            margin-bottom: scaling(16);
        }

        @include desktop--small {
            margin-bottom: scaling(12);
        }
    }

    &-title {
        @include title--block;

        color: $c-white;

        @include desktop--large {
            width: (832 * 100%) / 960;
        }

        @include desktop {
            font-size: scaling(60);
            width: (600 * 100%) / 720;
        }

        @include desktop--small {
            font-size: scaling(48);
            width: (520 * 100%) / 600;
        }

        @include laptop {
            font-size: scaling(40);
            width: (688 * 100%) / 960;
        }

        @include tablet {
            font-size: scaling(44);
            width: (562 * 100%) / 768;
        }

        @include mobile {
            font-size: scaling(24);
            width: (255 * 100%) / 320;
        }
    }

    &-restriction {
        @include text;

        color: $c-white;
        margin-left: scaling(39);
    }

    &-artists {
        @include body-1;

        color: $c-white;
    }

    &-description {
        @include text;

        border-top: 1px solid rgba(0, 0, 0, 0.2);
        margin-top: scaling(16);
        padding-top: scaling(16);
        color: rgba(255, 255, 255, 0.5);

        @include desktop--large {
            margin-top: scaling(24);
            padding-top: scaling(24);
        }

        @include desktop {
            margin-top: scaling(20);
            padding-top: scaling(20);
        }

        @include desktop--small {
            margin-top: scaling(20);
            padding-top: scaling(20);
        }
    }

    &-sponsors {
        @include mobile {
            padding-top: scaling(16);
            border-top: 1px solid rgba(0, 0, 0, 0.2);
            width: 100%;
        }
    }

    &-sponsorsLogos {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    &-sponsorsLogo {
        max-width: scaling(192);
        margin-right: scaling(32);

        &:last-child {
            margin-right: 0;
        }

        @include desktop {
            max-width: scaling(144);
            margin-right: scaling(24);
        }

        @include desktop--small {
            max-width: scaling(112);
            margin-right: scaling(16);
        }

        @include laptop {
            max-width: scaling(112);
            margin-right: scaling(16);
        }

        @include tablet {
            max-width: scaling(80);
            margin-right: scaling(16);
        }

        @include mobile {
            max-width: scaling(80);
            margin-right: scaling(16);
        }

        img {
            width: 100%;
        }
    }

    &-sponsorsTitle,
    &-sponsorsText {
        @include text;

        color: $c-white;
    }

    &-sponsorsTitle {
        margin-bottom: scaling(8);

        @include desktop--large {
            margin-bottom: scaling(32);
        }

        @include desktop {
            margin-bottom: scaling(16);
        }
    }

    &-buyTickects {
        margin-left: auto;

        @include mobile {
            width: 100%;
            margin-bottom: scaling(32);

            .RoundedButton {
                width: 100%;
            }
        }
    }

    &-footer {
        margin-top: auto;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        flex-shrink: 0;

        @include mobile {
            flex-direction: column-reverse;
            align-items: flex-start;
        }
    }
}
</style>
