<template>
    <div class="AboutYouthMember" :class="{ isLeader: leader }">
        <div class="AboutYouthMember-image">
            <img v-if="member.image" :src="member.image" alt="" />
            <div v-else class="AboutYouthMember-imageStub">
                <svg-icon name="icon-stub-performance-desktop" />
                <svg-icon name="icon-stub-performance-mobile" />
            </div>
        </div>
        <div class="AboutYouthMember-inner">
            <div
                v-if="member.position"
                class="AboutYouthMember-position"
                v-text="member.position"
            ></div>
            <div class="AboutYouthMember-name" v-text="member.name"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutYouthMember',

    props: {
        member: {
            type: Object,
            required: true
        },
        leader: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutYouthMember {
    $component: &;

    display: flex;
    align-items: center;

    &-image {
        flex-shrink: 0;
        width: scaling(32);
        height: scaling(32);
        border-radius: 100%;
        overflow: hidden;

        @include desktop--large {
            width: scaling(44);
            height: scaling(44);
        }

        @include desktop {
            width: scaling(36);
            height: scaling(36);
        }

        #{$component}.isLeader & {
            width: scaling(64);
            height: scaling(64);
            padding: scaling(4);
            border: 1px solid $c-black;

            @include desktop--large {
                width: scaling(80);
                height: scaling(80);
            }

            @include desktop {
                width: scaling(72);
                height: scaling(72);
            }

            @include desktop--small {
                width: scaling(72);
                height: scaling(72);
            }
        }

        img {
            @include m-objectFit;

            width: 100%;
            height: 100%;
        }

        &Stub {
            width: 100%;
            height: 100%;

            svg {
                width: 100%;
                height: 100%;
                stroke: $c-gray;

                &:first-child {
                    @include mobile {
                        display: none;
                    }
                }

                &:last-child {
                    display: none;

                    @include mobile {
                        display: block;
                    }
                }
            }
        }
    }

    &-inner {
        margin-left: scaling(16);

        @include desktop--large {
            margin-left: scaling(20);
        }

        #{$component}.isLeader & {
            display: flex;
            flex-direction: column-reverse;
        }
    }

    &-position,
    &-name {
        font-size: scaling(12);
        line-height: $lh-150;
        font-family: $family-graphic;

        @include desktop--large {
            font-size: scaling(16);
        }

        @include desktop {
            font-size: scaling(14);
        }
    }

    &-position {
        color: $c-gray;

        #{$component}.isLeader & {
            font-size: scaling(12);
            line-height: $lh-140;

            @include desktop--large {
                font-size: scaling(16);
                line-height: $lh-150;
            }

            @include desktop {
                font-size: scaling(14);
                line-height: $lh-150;
            }

            @include desktop--small {
                line-height: $lh-150;
            }
        }
    }

    &-name {
        margin-top: scaling(2);

        @include desktop--large {
            margin-top: 0;
        }

        #{$component}.isLeader & {
            margin-top: 0;
            margin-bottom: scaling(8);
            font-size: scaling(12);
            line-height: $lh-160;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: $fw-medium;

            @include desktop--large {
                font-size: scaling(14);
            }

            @include laptop {
                margin-bottom: scaling(4);
            }

            @include tablet {
                margin-bottom: scaling(4);
            }

            @include mobile {
                margin-bottom: scaling(4);
            }
        }
    }
}
</style>
