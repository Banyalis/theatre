<template>
    <div
        class="AboutHistorySectionContentImage"
        :class="{ isFull: image.full }"
    >
        <div class="AboutHistorySectionContentImage-inner">
            <picture>
                <source :srcset="image.src + ' 1x, ' + image.src2x + ' 2x'" />
                <img :src="image.src" alt="" />
            </picture>
        </div>
        <div class="AboutHistorySectionContentImage-content">
            <div
                class="AboutHistorySectionContentImage-title"
                v-text="image.title"
            ></div>
            <p
                class="AboutHistorySectionContentImage-description"
                v-text="image.description"
            ></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutHistorySectionContentImage',

    props: {
        image: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutHistorySectionContentImage {
    $component: &;

    &-inner {
        @include desktop--large {
            height: scaling(570);
        }

        @include desktop {
            height: scaling(460);
        }

        @include desktop--small {
            height: scaling(400);
        }

        @include laptop {
            height: scaling(390);
        }

        @include tablet {
            height: scaling(330);
        }

        @include mobile {
            height: scaling(200);
        }

        #{$component}.isFull & {
            @include desktop--large {
                height: scaling(610);
            }

            @include desktop--small {
                height: scaling(380);
            }

            @include laptop {
                height: scaling(400);
            }

            @include tablet {
                height: scaling(320);
            }

            @include mobile {
                height: scaling(150);
            }
        }

        img {
            @include m-objectFit;

            width: 100%;
            height: 100%;
        }
    }

    &-content {
        #{$component}.isFull & {
            padding: 0 scaling(128);

            @include desktop {
                padding: 0 scaling(72);
            }

            @include desktop--small {
                padding: 0 scaling(40);
            }

            @include laptop {
                padding: 0 scaling(96);
            }

            @include tablet {
                padding: 0 scaling(40);
            }

            @include mobile {
                padding: 0 scaling(16);
            }
        }
    }

    &-title {
        margin-top: scaling(20);
        font-size: scaling(14);
        line-height: $lh-130;
        font-family: $family-graphic;

        @include desktop--large {
            margin-top: scaling(32);
            font-size: scaling(20);
        }

        @include desktop {
            margin-top: scaling(24);
            font-size: scaling(18);
        }

        @include mobile {
            margin-top: scaling(16);
            line-height: $lh-160;
        }
    }

    &-description {
        margin-top: scaling(4);
        color: $c-gray;
        font-size: scaling(12);
        line-height: $lh-130;
        font-family: $family-graphic;

        @include desktop--large {
            margin-top: scaling(8);
            font-size: scaling(14);
            line-height: $lh-140;
        }

        @include desktop {
            font-size: scaling(14);
            line-height: $lh-150;
        }

        @include desktop--small {
            line-height: $lh-150;
        }

        @include laptop {
            line-height: $lh-140;
        }
    }
}
</style>
