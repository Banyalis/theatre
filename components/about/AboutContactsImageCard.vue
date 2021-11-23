<template>
    <div
        class="AboutContactsImageCard"
        :class="`AboutContactsImageCard--${mod}`"
    >
        <div class="AboutContactsImageCard-row">
            <div v-if="card.leftImage" class="AboutContactsImageCard-leftImage">
                <picture>
                    <source
                        :srcset="
                            card.leftImage + ' 1x, ' + card.leftImage2x + ' 2x'
                        "
                    />
                    <img :src="card.leftImage" alt="" />
                </picture>
            </div>
            <div class="AboutContactsImageCard-content">
                <div
                    class="AboutContactsImageCard-title"
                    v-text="card.title"
                ></div>
                <div
                    v-if="card.mobImage"
                    class="AboutContactsImageCard-contentLeftImage"
                >
                    <picture>
                        <source
                            :srcset="
                                card.mobImage +
                                ' 1x, ' +
                                card.mobImage2x +
                                ' 2x'
                            "
                        />
                        <img :src="card.mobImage" alt="" />
                    </picture>
                </div>
                <div
                    v-if="card.contentImage"
                    class="AboutContactsImageCard-contentImage"
                >
                    <picture>
                        <source
                            :srcset="
                                card.contentImage +
                                ' 1x, ' +
                                card.contentImage2x +
                                ' 2x'
                            "
                        />
                        <img :src="card.contentImage" alt="" />
                    </picture>
                </div>
                <div v-if="card.contacts" class="AboutContactsImageCard-items">
                    <div
                        v-for="(contact, contactIndex) in card.contacts"
                        :key="contactIndex"
                        class="AboutContactsImageCard-item"
                    >
                        <div
                            v-if="contact.caption"
                            class="AboutContactsImageCard-itemCaption"
                            v-text="contact.caption"
                        ></div>
                        <a
                            v-if="contact.type === 'phone'"
                            :href="`tel:` + contact.title"
                            class="AboutContactsImageCard-itemTitle"
                            v-text="contact.title"
                        ></a>
                        <a
                            v-if="contact.type === 'mail'"
                            :href="`mailto:` + contact.title"
                            class="AboutContactsImageCard-itemTitle"
                            v-text="contact.title"
                        ></a>
                        <div
                            v-if="!contact.type"
                            class="AboutContactsImageCard-itemTitle"
                            v-text="contact.title"
                        ></div>
                    </div>
                </div>
            </div>
            <div
                v-if="card.rightImage"
                class="AboutContactsImageCard-rightImage"
            >
                <picture>
                    <source
                        :srcset="
                            card.rightImage +
                            ' 1x, ' +
                            card.rightImage2x +
                            ' 2x'
                        "
                    />
                    <img :src="card.rightImage" alt="" />
                </picture>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutContactsImageCard',

    props: {
        mod: {
            type: String,
            default: 'default'
        },

        card: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutContactsImageCard {
    $component: &;

    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;

    &--default {
        background-color: $c-white;
    }

    &--black {
        background-color: $c-black;

        #{$component}-title {
            color: $c-white;
        }

        #{$component}-item {
            border-bottom: 1px solid #4d4d4d;

            &Caption {
                color: $c-white;
            }

            &Title {
                color: $c-white;
            }
        }
    }

    &-row {
        display: flex;
        align-items: flex-end;
        height: 100%;
        width: 100%;

        @include mobile {
            flex-direction: column;
        }
    }

    &-leftImage {
        min-width: (731 * 100%) / 1440;
        max-width: (731 * 100%) / 1440;
        height: scaling(529);
        margin-right: scaling(69);
        padding-top: scaling(32);

        @include desktop {
            min-width: (580 * 100%) / 1080;
            max-width: (580 * 100%) / 1080;
            padding-top: scaling(24);
            margin-right: scaling(48);
            height: scaling(458);
        }

        @include desktop--small {
            min-width: (474 * 100%) / 900;
            max-width: (474 * 100%) / 900;
            padding-top: scaling(56);
            margin-right: scaling(48);
            height: scaling(395);
        }

        @include laptop {
            min-width: (350 * 100%) / 640;
            max-width: (350 * 100%) / 640;
            padding-top: scaling(47);
            margin-right: scaling(32);
            height: scaling(320);
        }

        @include tablet {
            min-width: (256 * 100%) / 512;
            max-width: (256 * 100%) / 512;
            padding-top: scaling(56);
            margin-right: scaling(16);
            height: scaling(342);
        }

        @include mobile {
            display: none;
        }

        img {
            width: 100%;
            height: 100%;
            @include m-objectFit(cover, right);

            @include desktop--large {
                @include m-objectFit(contain, bottom);
            }
        }
    }

    &-rightImage {
        display: flex;

        @include desktop--large {
            min-width: (790 * 100%) / 1152;
            max-width: (790 * 100%) / 1152;
            height: scaling(571);
            margin-left: scaling(14);
        }

        @include desktop {
            min-width: (597 * 100%) / 864;
            max-width: (597 * 100%) / 864;
            height: scaling(461);
        }

        @include desktop--small {
            width: (520 * 100%) / 720;
            height: scaling(473);
            position: absolute;
            bottom: 0;
            right: 0;
        }

        @include laptop {
            width: (304 * 100%) / 480;
            height: scaling(350);
            position: absolute;
            bottom: 0;
            right: 0;
        }

        @include tablet {
            width: (256 * 100%) / 394;
            height: scaling(350);
            position: absolute;
            bottom: 0;
            right: 0;
        }

        img {
            width: 100%;
            height: 100%;

            @include desktop--large {
                @include m-objectFit(contain, bottom);
            }

            @include desktop {
                @include m-objectFit(contain, bottom);
            }

            @include desktop--small {
                @include m-objectFit(cover, left);
            }

            @include laptop {
                @include m-objectFit(cover, left);
            }

            @include tablet {
                @include m-objectFit(cover, left);
            }
        }
    }

    &-content {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: scaling(20);
        padding-bottom: scaling(24);
        position: relative;
        z-index: $z-one;

        @include desktop--large {
            padding-top: scaling(32);
            padding-bottom: scaling(36);
        }

        @include desktop {
            padding-top: scaling(24);
            padding-bottom: scaling(28);
        }

        @include desktop--small {
            padding-top: scaling(24);
        }

        &Image {
            align-self: flex-end;
            width: scaling(433);
            height: scaling(339);

            @include desktop {
                width: scaling(325);
                height: scaling(253);
            }

            @include desktop--small {
                width: scaling(280);
                height: scaling(219);
            }

            @include laptop {
                width: scaling(270);
                height: scaling(212);
            }

            @include tablet {
                width: scaling(250);
                height: scaling(212);
            }

            @include mobile {
                width: scaling(304);
                height: scaling(238);
            }

            img {
                @include m-objectFit();

                width: 100%;
                height: 100%;
            }
        }

        &LeftImage {
            display: none;
            width: (285 * 100%) / 320;
            height: scaling(340);
            align-self: flex-end;

            @include mobile {
                display: block;
            }

            img {
                @include m-objectFit(contain, right);

                width: 100%;
                height: 100%;
            }
        }
    }

    &-title {
        @include heading-4;

        white-space: pre-line;
        padding: 0 scaling(16);

        @include desktop--large {
            margin-bottom: scaling(47);
            padding: 0 scaling(32);
        }

        @include desktop {
            margin-bottom: scaling(66);
            padding: 0 scaling(24);
        }

        @include desktop--small {
            margin-bottom: scaling(30);
            padding: 0 scaling(20);
        }

        @include laptop {
            margin-bottom: scaling(19);
        }

        @include tablet {
            margin-bottom: scaling(32);
        }

        @include mobile {
            margin-bottom: scaling(18);
        }
    }

    &-items {
        margin-top: auto;
        padding: 0 scaling(16);

        @include desktop--large {
            padding: 0 scaling(32);
        }

        @include desktop {
            padding: 0 scaling(24);
        }

        @include desktop--small {
            padding: 0 scaling(20);
        }
    }

    &-item {
        padding-bottom: scaling(16);
        margin-bottom: scaling(16);
        border-bottom: 1px solid #e6e6e6;

        @include desktop--large {
            padding-bottom: scaling(20);
            margin-bottom: scaling(20);
        }

        @include desktop {
            padding-bottom: scaling(20);
            margin-bottom: scaling(20);
        }

        &:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }

        &Caption {
            @include body-3;

            margin-bottom: scaling(8);
            font-weight: $fw-normal;
            color: $c-black;
            opacity: 0.5;
        }

        &Title {
            color: $c-black;
            font-family: 'Apoc LC';
            font-size: scaling(20);
            line-height: $lh-110;
            transition: color $d-hover ease-in-out;

            @include desktop--large {
                font-size: scaling(32);
                line-height: $lh-110;
            }

            @include desktop {
                font-size: scaling(26);
            }

            @include hover {
                &:is(a):hover {
                    color: $c-red;
                }
            }
        }
    }
}
</style>
