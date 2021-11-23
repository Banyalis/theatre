<template>
    <div class="AboutBuildingSectionHead">
        <div class="AboutBuildingSectionHead-inner">
            <div
                class="AboutBuildingSectionHead-title"
                v-text="head.title"
            ></div>
            <div v-if="head.address" class="AboutBuildingSectionHead-address">
                <p
                    class="AboutBuildingSectionHead-addressText"
                    v-text="head.address"
                ></p>
            </div>
        </div>
        <p class="AboutBuildingSectionHead-text" v-text="head.text"></p>
    </div>
</template>

<script>
export default {
    name: 'AboutBuildingSectionHead',

    props: {
        head: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutBuildingSectionHead {
    $component: &;

    margin-bottom: scaling(80);
    padding: scaling(32) scaling(16);

    @include desktop--large {
        padding: scaling(48) scaling(32);
    }

    @include desktop {
        margin-bottom: scaling(72);
        padding: scaling(40) scaling(24);
    }

    @include desktop--small {
        margin-bottom: scaling(64);
        padding: scaling(31) scaling(20);
    }

    @include laptop {
        margin-bottom: scaling(52);
    }

    @include tablet {
        margin-bottom: scaling(58);
    }

    @include mobile {
        margin-bottom: scaling(32);
    }

    &-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: scaling(32);
        padding-bottom: scaling(24);
        border-bottom: 1px solid $c-gray-light;

        @include desktop--large {
            margin-bottom: scaling(48);
            padding-bottom: scaling(40);
        }

        @include desktop {
            margin-bottom: scaling(40);
            padding-bottom: scaling(36);
        }

        @include desktop--small {
            margin-bottom: scaling(36);
            padding-bottom: scaling(28);
        }

        @include mobile {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: scaling(20);
            padding-bottom: scaling(20);
        }
    }

    &-title {
        font-size: scaling(20);
        line-height: $lh-120;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            font-size: scaling(36);
            line-height: $lh-130;
            letter-spacing: 0;
        }

        @include desktop {
            font-size: scaling(28);
            line-height: $lh-110;
            letter-spacing: 0;
        }

        @include desktop--small {
            font-size: scaling(24);
            line-height: $lh-110;
            letter-spacing: 0;
        }

        @include mobile {
            margin-bottom: scaling(12);
        }
    }

    &-address {
        display: flex;
        align-items: center;

        &Text {
            color: $c-gray;
            font-size: scaling(14);
            line-height: $lh-160;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(20);
                line-height: $lh-130;
            }

            @include desktop {
                font-size: scaling(18);
            }
        }
    }

    &-text {
        font-size: scaling(18);
        line-height: $lh-170;
        font-family: $family-graphic;

        @include desktop--large {
            font-size: scaling(28);
        }

        @include desktop {
            font-size: scaling(22);
        }

        @include laptop {
            line-height: $lh-160;
        }

        @include tablet {
            font-size: scaling(16);
            line-height: $lh-160;
        }

        @include mobile {
            font-size: scaling(16);
            line-height: $lh-150;
        }
    }
}
</style>
