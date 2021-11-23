<template>
    <NuxtLink
        class="CommonPeopleCard"
        :to="item.url ? item.url : '/'"
        :class="{
            isImportant: sectionImportant || item.important,
            isDisabled: !item.url,
            isPartnersCard: partners,
            noImage: !item.image && peopleList
        }"
    >
        <div class="CommonPeopleCard-image">
            <picture v-if="item.image">
                <source :srcset="item.image + ' 1x, ' + item.image2x + ' 2x'" />
                <img :src="item.image" alt="" />
            </picture>
            <template v-else-if="!item.image && peopleList">
                <div
                    class="
                        CommonPeopleCard-imageStub
                        CommonPeopleCard-imageStub--desktop
                    "
                >
                    <svg-icon name="icon-stub-people-desktop" />
                </div>
                <div
                    class="
                        CommonPeopleCard-imageStub
                        CommonPeopleCard-imageStub--laptop
                    "
                >
                    <svg-icon name="icon-stub-people-laptop" />
                </div>
                <div
                    class="
                        CommonPeopleCard-imageStub
                        CommonPeopleCard-imageStub--mobile
                    "
                >
                    <svg-icon name="icon-stub-people-mobile" />
                </div>
            </template>
        </div>
        <div class="CommonPeopleCard-inner">
            <!-- eslint-disable -->
            <div
                class="CommonPeopleCard-name"
                v-html="item.name.split(' ').join('<br>')"
            ></div>
            <!-- eslint-enable -->
            <div
                v-if="item.position"
                class="CommonPeopleCard-position"
                v-text="item.position"
            ></div>
        </div>
    </NuxtLink>
</template>

<script>
export default {
    name: 'CommonPeopleCard',

    props: {
        item: {
            type: Object,
            required: true
        },
        partners: {
            type: Boolean,
            default: false
        },
        sectionImportant: {
            type: Boolean,
            default: false
        },
        peopleList: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonPeopleCard {
    $component: &;

    display: flex;
    flex-direction: column;
    align-items: center;

    @include desktop--large {
        padding: scaling(132) scaling(32) scaling(108);
    }

    @include desktop {
        padding: scaling(100) scaling(20) scaling(88);
    }

    @include desktop--small {
        padding: scaling(108) scaling(20) scaling(88);
    }

    @include laptop {
        padding: scaling(96) scaling(16) scaling(80);
    }

    @include tablet {
        padding: scaling(92) scaling(16) scaling(80);
    }

    @include mobile {
        padding: scaling(64) scaling(16) scaling(56);
    }

    @include hover {
        &:hover #{$component} {
            &-image {
                border-color: $c-red;
                background-color: $c-red;
            }

            &-name {
                color: $c-red;
            }
        }
    }

    @include hover {
        &.noImage:hover #{$component} {
            &-image {
                border-color: $c-red;
                background-color: $c-white;

                &Stub svg {
                    stroke: $c-red;
                }
            }
        }
    }

    &.isImportant {
        @include desktop--large {
            padding: scaling(120) scaling(64) scaling(110);
        }

        @include desktop {
            padding: scaling(84) scaling(24) scaling(72);
        }

        @include desktop--small {
            padding: scaling(64) scaling(20) scaling(78);
        }

        @include laptop {
            padding: scaling(76) scaling(32) scaling(86);
        }

        @include tablet {
            padding: scaling(64) scaling(16) scaling(40);
        }

        @include mobile {
            flex-direction: row-reverse;
            justify-content: space-between;
            padding: scaling(24) scaling(28);
        }
    }

    &.isDisabled {
        pointer-events: none;
    }

    &.isPartnersCard {
        @include mobile {
            flex-direction: row;
            padding: scaling(20) 0;
        }
    }

    &-inner {
        text-align: center;

        @include desktop--large {
            margin-top: scaling(40);
        }

        @include desktop {
            margin-top: scaling(36);
        }

        @include desktop--small {
            margin-top: scaling(32);
        }

        @include laptop {
            margin-top: scaling(28);
        }

        @include tablet {
            margin-top: scaling(24);
        }

        @include mobile {
            margin-top: scaling(12);
        }

        #{$component}.isImportant & {
            margin-top: scaling(20);

            @include desktop--large {
                margin-top: scaling(28);
            }

            @include desktop {
                margin-top: scaling(24);
            }

            @include tablet {
                margin-top: scaling(16);
            }

            @include mobile {
                margin: 0 scaling(16) 0 0;
                text-align: left;
            }
        }

        #{$component}.isPartnersCard & {
            @include mobile {
                margin: 0 0 0 scaling(20);
                text-align: left;
            }
        }
    }

    &-image {
        flex-shrink: 0;
        padding: scaling(4);
        border: 1px solid $c-black;
        border-radius: 100%;
        transition: border-color $d-hover ease-in-out,
            background-color $d-hover ease-in-out;

        @include desktop--large {
            width: scaling(128);
            height: scaling(128);
            padding: scaling(6);
        }

        @include desktop {
            width: scaling(104);
            height: scaling(104);
            padding: scaling(5);
        }

        @include desktop--small {
            width: scaling(100);
            height: scaling(100);
            padding: scaling(5);
        }

        @include laptop {
            width: scaling(96);
            height: scaling(96);
        }

        @include tablet {
            width: scaling(88);
            height: scaling(88);
        }

        @include mobile {
            width: scaling(64);
            height: scaling(64);
        }

        img {
            @include m-objectFit;

            width: 100%;
            height: 100%;
            border-radius: 100%;
        }

        #{$component}.isImportant & {
            width: scaling(100);
            height: scaling(100);
            padding: scaling(5);

            @include desktop--large {
                width: scaling(160);
                height: scaling(160);
                padding: scaling(8);
            }

            @include desktop {
                width: scaling(128);
                height: scaling(128);
                padding: scaling(6);
            }

            @include desktop--small {
                width: scaling(112);
                height: scaling(112);
            }

            @include laptop {
                width: scaling(96);
                height: scaling(96);
                padding: scaling(4);
            }
        }

        &Stub {
            width: 100%;
            height: 100%;

            &--desktop {
                display: none;

                @include desktop--large {
                    display: block;
                }

                @include desktop {
                    display: block;
                }

                @include desktop--small {
                    display: block;
                }
            }

            &--laptop {
                display: none;

                @include laptop {
                    display: block;
                }

                @include tablet {
                    display: block;
                }
            }

            &--mobile {
                display: none;

                @include mobile {
                    display: block;
                }
            }

            svg {
                width: 100%;
                height: 100%;
                stroke: $c-black;
                transition: stroke $d-hover ease-in-out;
            }
        }
    }

    &-name {
        color: $c-black--header;
        font-size: scaling(20);
        line-height: $lh-130;
        font-family: $family-graphic;
        transition: color $d-hover ease-in-out;

        @include desktop--large {
            font-size: scaling(28);
        }

        @include desktop {
            font-size: scaling(22);
        }

        @include tablet {
            font-size: scaling(18);
        }

        @include mobile {
            font-size: scaling(14);
        }

        #{$component}.isImportant & {
            font-size: scaling(20);
            line-height: $lh-130;
            text-transform: uppercase;
            font-family: $family-apoc;
            font-feature-settings: 'ss02' on;

            @include desktop--large {
                font-size: scaling(36);
                line-height: $lh-120;
            }

            @include desktop {
                font-size: scaling(28);
            }

            @include desktop--small {
                font-size: scaling(24);
            }

            @include laptop {
                letter-spacing: 0.02em;
            }

            @include tablet {
                line-height: $lh-120;
                letter-spacing: 0.02em;
            }

            @include mobile {
                font-size: scaling(13);
                letter-spacing: 0.04em;
            }
        }

        #{$component}.isPartnersCard & {
            @include mobile {
                line-height: $lh-140;
            }
        }
    }

    &-position {
        margin-top: scaling(8);
        color: $c-gray;
        font-size: scaling(12);
        line-height: $lh-150;
        font-family: $family-graphic;

        @include desktop--large {
            max-width: scaling(352);
            margin-top: scaling(12);
            font-size: scaling(16);
        }

        @include desktop {
            max-width: scaling(312);
            font-size: scaling(14);
        }

        @include desktop--small {
            max-width: scaling(260);
        }

        @include laptop {
            max-width: scaling(256);
            line-height: $lh-140;
        }

        @include tablet {
            max-width: scaling(224);
            margin-top: scaling(4);
            line-height: $lh-130;
        }

        @include mobile {
            line-height: $lh-130;
        }

        #{$component}.isPartnersCard & {
            @include mobile {
                margin-top: scaling(6);
            }
        }
    }
}
</style>
