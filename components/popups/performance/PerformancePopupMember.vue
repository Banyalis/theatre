<template>
    <div class="PerformancePopupMember">
        <div
            class="PerformancePopupMember-subtitle"
            v-text="member.subtitle"
        ></div>
        <div class="PerformancePopupMember-inner">
            <div class="PerformancePopupMember-image">
                <picture v-if="member.image">
                    <source
                        :srcset="
                            member.image + ' 1x, ' + member.image2x + ' 2x'
                        "
                    />
                    <img :src="member.image" alt="" />
                </picture>
            </div>
            <div class="PerformancePopupMember-content">
                <div
                    class="
                        PerformancePopupMember-subtitle
                        PerformancePopupMember-subtitle--mobile
                    "
                    v-text="member.subtitle"
                ></div>
                <div
                    class="PerformancePopupMember-title"
                    v-text="member.title"
                ></div>
                <div
                    class="
                        PerformancePopupMember-age
                        PerformancePopupMember-age--mobile
                    "
                    v-text="age"
                ></div>
            </div>
        </div>
        <div class="PerformancePopupMember-age" v-text="age"></div>
    </div>
</template>

<script>
export default {
    name: 'PerformancePopupMember',

    props: {
        member: {
            type: Object,
            required: true
        },
        age: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PerformancePopupMember {
    $component: &;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 100%;
    padding: scaling(36) scaling(212);

    @include desktop {
        padding: scaling(28) scaling(60);
    }

    @include desktop--small {
        padding: scaling(24) scaling(50);
    }

    @include laptop {
        padding: scaling(28) scaling(30);
    }

    @include tablet {
        padding: scaling(52) scaling(64) scaling(68) scaling(80);
    }

    @include mobile {
        padding: scaling(22) scaling(16) scaling(26);
    }

    &-image {
        flex-shrink: 0;
        width: scaling(120);
        height: scaling(120);
        padding: scaling(6);
        border: 1px solid $c-gray--header;
        border-radius: 100%;
        overflow: hidden;

        @include desktop--large {
            width: scaling(240);
            height: scaling(240);
            padding: scaling(12);
        }

        @include desktop {
            width: scaling(200);
            height: scaling(200);
            padding: scaling(10);
        }

        @include desktop--small {
            width: scaling(150);
            height: scaling(150);
            padding: scaling(8);
        }

        img {
            @include m-objectFit;

            width: 100%;
            height: 100%;
            border-radius: 100%;
        }
    }

    &-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: scaling(10) 0;
        text-align: center;

        @include tablet {
            flex-direction: row;
            margin: 0;
            text-align: left;
        }

        @include mobile {
            margin: 0;
        }
    }

    &-content {
        @include tablet {
            margin-left: scaling(46);
        }
    }

    &-subtitle,
    &-age {
        color: $c-white;
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
            color: $c-gray;
            font-size: scaling(12);
        }

        @include mobile {
            color: $c-gray;
            font-size: scaling(16);
        }
    }

    &-subtitle {
        @include tablet {
            display: none;
        }

        @include mobile {
            margin-bottom: scaling(55);
        }

        &--mobile {
            display: none;

            @include tablet {
                display: block;
            }
        }
    }

    &-title {
        margin-top: scaling(16);
        color: $c-white;
        font-size: scaling(20);
        line-height: $lh-110;
        text-transform: uppercase;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            margin-top: scaling(32);
            font-size: scaling(36);
        }

        @include desktop {
            margin-top: scaling(24);
            font-size: scaling(28);
        }

        @include desktop--small {
            margin-top: scaling(20);
            font-size: scaling(24);
        }

        @include laptop {
            line-height: $lh-120;
            letter-spacing: 0.02em;
        }

        @include tablet {
            margin-top: scaling(8);
            line-height: $lh-120;
            letter-spacing: 0.02em;
        }

        @include mobile {
            line-height: $lh-120;
            letter-spacing: 0.02em;
        }
    }

    &-age {
        @include tablet {
            display: none;
            margin-top: scaling(8);
        }

        @include mobile {
            margin-top: scaling(92);
        }

        &--mobile {
            display: none;

            @include tablet {
                display: block;
            }
        }
    }
}
</style>
