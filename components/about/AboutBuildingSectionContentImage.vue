<template>
    <div
        class="AboutBuildingSectionContentImage"
        :class="{ isFull: image.full }"
    >
        <div class="AboutBuildingSectionContentImage-inner">
            <picture>
                <source :srcset="image.src + ' 1x, ' + image.src2x + ' 2x'" />
                <img :src="image.src" alt="" />
            </picture>
        </div>
        <div
            v-if="image.title || image.text"
            class="AboutBuildingSectionContentImage-content"
        >
            <div
                class="AboutBuildingSectionContentImage-title"
                v-text="image.title"
            ></div>
            <p
                class="AboutBuildingSectionContentImage-text"
                v-text="image.text"
            ></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutBuildingSectionContentImage',

    props: {
        image: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutBuildingSectionContentImage {
    $component: &;

    &-inner {
        @include m-aspectRatio(544, 332);

        @include desktop--large {
            @include m-aspectRatio(800, 532);
        }

        @include desktop {
            @include m-aspectRatio(648, 432);
        }

        @include desktop--small {
            @include m-aspectRatio(560, 400);
        }

        @include mobile {
            @include m-aspectRatio(288, 202);
        }

        #{$component}.isFull & {
            @include m-aspectRatio(1120, 608);

            @include desktop {
                @include m-aspectRatio(840, 456);
            }

            @include desktop--small {
                @include m-aspectRatio(680, 380);
            }

            @include laptop {
                @include m-aspectRatio(768, 400);
            }

            @include tablet {
                @include m-aspectRatio(768, 320);
            }

            @include mobile {
                @include m-aspectRatio(320, 220);
            }
        }

        img {
            @include m-absoluteObjectFit();
        }
    }

    &-content {
        margin-top: scaling(20);

        @include desktop--large {
            margin-top: scaling(32);
        }

        @include desktop {
            margin-top: scaling(24);
        }

        @include mobile {
            margin-top: scaling(16);
        }

        #{$component}.isFull & {
            padding: 0 scaling(112);

            @include desktop--large {
                padding: 0 scaling(160);
            }

            @include desktop {
                padding: 0 scaling(96);
            }

            @include desktop--small {
                padding: 0 scaling(60);
            }

            @include mobile {
                padding: 0 scaling(16);
            }
        }
    }

    &-title {
        margin-bottom: scaling(8);
        font-size: scaling(14);
        line-height: $lh-130;
        font-family: $family-graphic;

        @include desktop--large {
            font-size: scaling(20);
            line-height: $lh-120;
        }

        @include desktop {
            font-size: scaling(18);
        }

        @include tablet {
            margin-bottom: scaling(4);
        }

        @include mobile {
            line-height: $lh-160;
        }
    }

    &-text {
        color: $c-gray;
        font-size: scaling(12);
        line-height: $lh-140;
        font-family: $family-graphic;

        @include desktop--large {
            font-size: scaling(14);
        }

        @include desktop {
            font-size: scaling(14);
            line-height: $lh-150;
        }

        @include desktop--small {
            line-height: $lh-150;
        }

        @include mobile {
            line-height: $lh-130;
        }
    }
}
</style>
