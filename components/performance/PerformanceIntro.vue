<template>
    <div class="PerformanceIntro" :class="{ isPlayVideo: isPlay }">
        <div class="PerformanceIntro-inner">
            <div class="PerformanceIntro-header">
                <div
                    class="PerformanceIntro-type"
                    v-text="intro.type ? 'Премьера' : ''"
                ></div>
                <div class="PerformanceIntro-age" v-text="intro.age"></div>
            </div>
            <div
                ref="title"
                class="PerformanceIntro-title"
                :class="{ isSmallTitle }"
                v-text="intro.title"
            ></div>
            <div ref="footer" class="PerformanceIntro-footer">
                <div
                    class="PerformanceIntro-author"
                    v-text="intro.author"
                ></div>
                <div
                    v-if="intro.video"
                    ref="switch"
                    class="PerformanceIntro-switch"
                    :class="{ isPlay }"
                >
                    <svg-icon name="icon-play" />
                    <svg-icon name="icon-pause" />
                </div>
                <RoundedButton
                    v-if="scheduleLength >= 1"
                    class="PerformanceIntro-button"
                    title="Расписание и билеты"
                    type="isRed"
                    @click="$emit('scroll-to', '#anchor-5')"
                />
            </div>
        </div>
        <div class="PerformanceIntro-video">
            <div
                v-if="intro.image"
                class="PerformanceIntro-videoCover"
                :class="{ isHidden: isPlay }"
            >
                <picture>
                    <source
                        :srcset="intro.image + ' 1x, ' + intro.image2x + ' 2x'"
                    />
                    <img :src="intro.image" alt="" />
                </picture>
            </div>
            <video ref="video">
                <source :src="intro.video" type="video/mp4" />
            </video>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { isMobile } from '@/utils/utils';
import RoundedButton from '@/components/other/RoundedButton';

export default {
    name: 'PerformanceIntro',

    components: {
        RoundedButton
    },

    props: {
        intro: {
            type: Object,
            required: true
        },
        scheduleLength: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            isPlay: false,
            isSmallTitle: false
        };
    },

    computed: {
        ...mapState(['headerHeight'])
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.$nextTick(this.onResize);
        if (this.$refs.switch) {
            this.$refs.switch.addEventListener('click', this.playVideo);
        }
        this.$refs.video.addEventListener('ended', this.endVideo);
        this.setTitleSmallSize();
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            this.introFooterHeight = this.$refs.footer.offsetHeight;

            if (this.$refs.video.paused === false)
                this.$refs.title.style.marginBottom = `-${this.introFooterHeight}px`;

            // this.setIntroStyles();
        },

        setIntroStyles() {
            if (!isMobile()) {
                this.$el.style.height = `${
                    window.innerHeight - this.headerHeight
                }px`;
            } else {
                this.$el.removeAttribute('style');
            }
        },

        playVideo() {
            if (this.$refs.video.paused === true) {
                this.$refs.video.play();
                this.isPlay = true;
                this.$refs.title.style.marginBottom = `-${this.introFooterHeight}px`;
            } else {
                this.$refs.video.pause();
                this.isPlay = false;
                this.$refs.title.removeAttribute('style');
            }
        },

        endVideo() {
            this.isPlay = false;
            this.$refs.title.removeAttribute('style');
        },

        setTitleSmallSize() {
            const getTitleLength = this.$refs.title.innerHTML.length;

            this.isSmallTitle = getTitleLength > 26;
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

    @include mobile {
        line-height: $lh-160;
    }
}

.PerformanceIntro {
    $component: &;

    height: scaling(450);
    padding: scaling(20) scaling(16);
    border-bottom: 1px solid $c-gray--header;
    position: relative;
    color: $c-white;

    @include desktop--large {
        height: scaling(900);
        padding: scaling(36) scaling(32);
    }

    @include desktop {
        height: scaling(670);
        padding: scaling(28) scaling(24);
    }

    @include desktop--small {
        height: scaling(560);
        padding: scaling(24) scaling(20);
    }

    @include mobile {
        display: flex;
        flex-direction: column-reverse;
        height: auto;
        padding: 0;
    }

    &-inner {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        position: relative;
        z-index: 10;

        @include mobile {
            position: static;
            margin-top: scaling(-30);
            padding: 0 scaling(16) scaling(18);
        }
    }

    &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: opacity $d-hover ease-in-out;

        @include mobile {
            position: absolute;
            top: scaling(18);
            left: scaling(16);
            right: scaling(16);
        }

        #{$component}.isPlayVideo & {
            opacity: 0;
        }
    }

    &-type {
        font-size: scaling(14);
        line-height: $lh-120;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-weight: $fw-bold;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            font-size: scaling(20);
        }

        @include desktop {
            font-size: scaling(18);
        }
    }

    &-age {
        @include text;
    }

    &-title {
        display: flex;
        align-items: flex-end;
        flex: 1;
        max-width: scaling(688);
        margin-bottom: scaling(5);
        font-size: scaling(60);
        line-height: $lh-110;
        text-transform: uppercase;
        font-weight: $fw-light;
        transform-origin: left bottom;
        transition: margin-bottom $d-hover ease-in-out,
            transform $d-hover ease-in-out;

        @include desktop--large {
            max-width: scaling(1088);
            margin-bottom: scaling(10);
            font-size: scaling(120);
        }

        @include desktop {
            margin-bottom: scaling(13);
            font-size: scaling(100);
        }

        @include desktop--small {
            margin-bottom: scaling(4);
            font-size: scaling(80);
        }

        @include laptop {
            max-width: scaling(556);
        }

        @include tablet {
            max-width: scaling(556);
        }

        @include mobile {
            margin-bottom: scaling(8);
            font-size: scaling(27);
            letter-spacing: 0.02em;
            font-feature-settings: 'ss02' on;
        }

        #{$component}.isPlayVideo & {
            transform: scale(0.5);

            @include mobile {
                margin-bottom: scaling(8) !important;
                transform: none;
            }
        }

        &.isSmallTitle {
            font-size: scaling(35);

            @include desktop--large {
                font-size: scaling(80);
            }

            @include desktop {
                font-size: scaling(60);
            }

            @include desktop--small {
                font-size: scaling(50);
            }

            @include mobile {
                font-size: scaling(27);
            }
        }
    }

    &-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
    }

    &-author {
        @include text;

        flex: 1;
        transition: opacity $d-hover ease-in-out;

        @include mobile {
            order: 1;
            flex: auto;
            width: 100%;
            margin-bottom: scaling(20);
        }

        #{$component}.isPlayVideo & {
            opacity: 0;

            @include mobile {
                opacity: 1;
            }
        }
    }

    &-switch {
        width: scaling(29);
        height: scaling(29);
        margin-right: scaling(12);
        cursor: pointer;
        color: $c-white;
        transition: color $d-hover ease-in-out;

        @include desktop--large {
            width: scaling(40);
            height: scaling(40);
            margin-right: scaling(32);
        }

        @include desktop {
            width: scaling(34);
            height: scaling(34);
            margin-right: scaling(16);
        }

        @include mobile {
            order: 3;
            margin-right: 0;
        }

        @include hover {
            &:hover {
                color: $c-red;
            }
        }

        &.isPlay svg {
            &:first-child {
                display: none;
            }

            &:last-child {
                display: block;
            }
        }

        svg {
            width: 100%;
            height: 100%;
            fill: none;

            &:last-child {
                display: none;
            }
        }
    }

    &-button {
        @include mobile {
            order: 2;
        }
    }

    &-video,
    &-videoCover {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    &-video {
        height: 85%;

        @include mobile {
            position: relative;
            height: scaling(220);
        }

        &:before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 35%;
            background: linear-gradient(
                180deg,
                rgba(15, 15, 15, 0) 0%,
                $c-black--header 90%
            );
            z-index: 5;

            @include mobile {
                height: 20%;
            }
        }

        &Cover {
            bottom: 0;
            transition: opacity $d-hover ease-in-out;

            &.isHidden {
                opacity: 0;
            }

            img {
                @include m-objectFit(cover, right);

                width: 100%;
                height: 100%;
            }
        }

        video {
            @include m-objectFit;

            display: none;
            width: 100%;
            height: 100%;

            #{$component}.isPlayVideo & {
                display: block;
            }
        }
    }
}
</style>
