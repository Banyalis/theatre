<template>
    <div class="AboutPressInfo">
        <div class="AboutPressInfo-main b-scaled-paddings">
            <div class="AboutPressInfo-title" v-text="info.title"></div>
            <div
                class="AboutPressInfo-description"
                v-text="info.description"
            ></div>
            <div class="AboutPressInfo-staff">
                <div class="AboutPressInfo-staffLeader">
                    <div class="AboutPressInfo-staffLeaderImage">
                        <img
                            v-if="info.staff.leader.image"
                            :src="info.staff.leader.image"
                            alt=""
                        />
                        <template v-else>
                            <div
                                class="
                                    AboutPressInfo-staffLeaderImageStub
                                    AboutPressInfo-staffLeaderImageStub--desktop
                                "
                            >
                                <svg-icon name="icon-stub-people-desktop" />
                            </div>
                            <div
                                class="
                                    AboutPressInfo-staffLeaderImageStub
                                    AboutPressInfo-staffLeaderImageStub--laptop
                                "
                            >
                                <svg-icon name="icon-stub-people-laptop" />
                            </div>
                            <div
                                class="
                                    AboutPressInfo-staffLeaderImageStub
                                    AboutPressInfo-staffLeaderImageStub--mobile
                                "
                            >
                                <svg-icon name="icon-stub-people-mobile" />
                            </div>
                        </template>
                    </div>
                    <div class="AboutPressInfo-staffLeaderContent">
                        <div
                            class="AboutPressInfo-staffLeaderName"
                            v-text="info.staff.leader.name"
                        ></div>
                        <div
                            class="AboutPressInfo-staffLeaderPosition"
                            v-text="info.staff.leader.position"
                        ></div>
                    </div>
                </div>
                <div class="AboutPressInfo-staffList">
                    <div
                        class="AboutPressInfo-staffListTitle"
                        v-text="'Сотрудники пресс-службы'"
                    ></div>
                    <div class="AboutPressInfo-staffListInner">
                        <div
                            v-for="(item, index) in info.staff.list"
                            :key="index"
                            class="AboutPressInfo-staffListItem"
                        >
                            <div class="AboutPressInfo-staffListItemImage">
                                <img
                                    v-if="item.image"
                                    :src="item.image"
                                    alt=""
                                />
                                <div
                                    v-else
                                    class="
                                        AboutPressInfo-staffListItemImageStub
                                    "
                                >
                                    <svg-icon
                                        name="icon-stub-performance-desktop"
                                    />
                                    <svg-icon
                                        name="icon-stub-performance-mobile"
                                    />
                                </div>
                            </div>
                            <div
                                class="AboutPressInfo-staffListItemName"
                                v-text="item.name"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="AboutPressInfo-aside">
            <div
                v-for="(contact, contactIndex) in info.contacts"
                :key="contactIndex"
                class="AboutPressInfo-contact b-scaled-paddings"
            >
                <div
                    class="AboutPressInfo-contactCaption"
                    v-text="contact.caption"
                ></div>
                <a
                    v-if="contact.type === 'phone'"
                    :href="`tel:` + contact.link"
                    class="AboutPressInfo-contactLink"
                    v-text="contact.link"
                ></a>
                <a
                    v-if="contact.type === 'mail'"
                    :href="`mailto:` + contact.link"
                    class="AboutPressInfo-contactLink"
                    v-text="contact.link"
                ></a>
                <div
                    v-if="!contact.type"
                    class="AboutPressInfo-contactLink"
                    v-text="contact.link"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutPressInfo',

    props: {
        info: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutPressInfo {
    display: flex;
    border-bottom: 1px solid $c-black;

    @include laptop {
        flex-direction: column;
    }

    @include tablet {
        flex-direction: column;
    }

    @include mobile {
        flex-direction: column;
    }

    &-main {
        width: 100%;
        padding-top: scaling(32);
        padding-bottom: scaling(36);

        @include desktop--large {
            width: (1440 * 100%) / 1920;
            padding-top: scaling(48);
            border-right: 1px solid $c-black;
        }

        @include desktop {
            width: (1080 * 100%) / 1440;
            padding-top: scaling(40);
            border-right: 1px solid $c-black;
        }

        @include desktop--small {
            width: (900 * 100%) / 1200;
            padding-top: scaling(36);
            border-right: 1px solid $c-black;
        }

        @include laptop {
            border-bottom: 1px solid $c-black;
        }

        @include tablet {
            border-bottom: 1px solid $c-black;
        }

        @include mobile {
            border-bottom: 1px solid $c-black;
        }
    }

    &-title {
        @include heading-2;

        margin-bottom: scaling(16);

        @include desktop--large {
            margin-bottom: scaling(36);
        }

        @include desktop {
            margin-bottom: scaling(28);
        }

        @include desktop--small {
            margin-bottom: scaling(24);
        }

        @include laptop {
            margin-bottom: scaling(20);
        }
    }

    &-description {
        @include body-1;

        margin-bottom: scaling(80);

        @include desktop--large {
            margin-bottom: scaling(145);
        }

        @include desktop {
            margin-bottom: scaling(84);
        }

        @include desktop--small {
            margin-bottom: scaling(60);
        }

        @include mobile {
            margin-bottom: scaling(64);
        }
    }

    &-staff {
        display: flex;

        @include mobile {
            flex-direction: column;
        }

        &Leader {
            display: flex;
            align-items: center;
            margin-right: scaling(60);

            @include laptop {
                margin-right: scaling(50);
            }

            @include tablet {
                margin-right: scaling(16);
            }

            @include mobile {
                margin-right: 0;
                margin-bottom: scaling(32);
            }

            &Image {
                flex-shrink: 0;
                width: scaling(64);
                height: scaling(64);
                padding: scaling(4);
                border: 1px solid $c-black;
                border-radius: 100%;

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

                img {
                    @include m-objectFit();

                    width: 100%;
                    height: 100%;
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
                    }
                }
            }

            &Content {
                margin-left: scaling(16);

                @include desktop--large {
                    margin-left: scaling(32);
                }

                @include desktop {
                    margin-left: scaling(24);
                }

                @include desktop--small {
                    margin-left: scaling(20);
                }
            }

            &Name {
                font-size: scaling(12);
                line-height: $lh-160;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                font-weight: $fw-medium;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(16);
                }
            }

            &Position {
                margin-top: scaling(4);
                color: $c-gray;
                font-size: scaling(12);
                line-height: $lh-140;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(20);
                    line-height: $lh-130;
                }

                @include desktop {
                    margin-top: scaling(8);
                    font-size: scaling(14);
                    line-height: $lh-150;
                }

                @include desktop--small {
                    margin-top: scaling(8);
                    line-height: $lh-150;
                }
            }
        }

        &List {
            flex: 1;

            &Title {
                margin-bottom: scaling(24);
                padding-bottom: scaling(12);
                border-bottom: 1px solid #e6e6e6;
                color: $c-gray;
                font-size: scaling(12);
                line-height: $lh-140;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(20);
                    line-height: $lh-130;
                }

                @include desktop {
                    font-size: scaling(14);
                    line-height: $lh-150;
                }

                @include desktop--small {
                    line-height: $lh-150;
                }
            }

            &Inner {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-gap: scaling(20);

                @include mobile {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    grid-gap: scaling(16) 0;
                }
            }

            &Item {
                display: flex;
                align-items: center;

                &Image {
                    flex-shrink: 0;
                    width: scaling(28);
                    height: scaling(28);
                    margin-right: scaling(12);
                    border-radius: 100%;

                    @include desktop--large {
                        width: scaling(44);
                        height: scaling(44);
                        margin-right: scaling(24);
                    }

                    @include desktop {
                        width: scaling(36);
                        height: scaling(36);
                        margin-right: scaling(20);
                    }

                    @include desktop--small {
                        width: scaling(32);
                        height: scaling(32);
                        margin-right: scaling(16);
                    }

                    @include mobile {
                        width: scaling(32);
                        height: scaling(32);
                        margin-right: scaling(20);
                    }

                    img {
                        @include m-objectFit();

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

                &Name {
                    font-size: scaling(14);
                    line-height: $lh-130;
                    font-family: $family-graphic;

                    @include desktop--large {
                        font-size: scaling(20);
                    }

                    @include desktop {
                        font-size: scaling(18);
                    }
                }
            }
        }
    }

    &-aside {
        width: 100%;
        display: flex;
        flex-direction: column;

        @include desktop--large {
            width: (480 * 100%) / 1920;
        }

        @include desktop {
            width: (360 * 100%) / 1440;
        }

        @include desktop--small {
            width: (300 * 100%) / 1200;
        }

        @include laptop {
            flex-direction: row;
        }

        @include tablet {
            flex-direction: row;
        }
    }

    &-contact {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding-top: scaling(16);
        padding-bottom: scaling(20);

        &:last-child {
            border: none;
        }

        @include desktop--large {
            min-height: scaling(208);
            padding-top: scaling(32);
            padding-bottom: scaling(36);
            border-bottom: 1px solid $c-black;
        }

        @include desktop {
            min-height: scaling(156);
            padding-top: scaling(24);
            padding-bottom: scaling(28);
            border-bottom: 1px solid $c-black;
        }

        @include desktop--small {
            min-height: scaling(130);
            padding-top: scaling(20);
            padding-bottom: scaling(24);
            border-bottom: 1px solid $c-black;
        }

        @include laptop {
            border-right: 1px solid $c-black;
            min-height: scaling(172);
        }

        @include tablet {
            border-right: 1px solid $c-black;
            min-height: scaling(156);
        }

        @include mobile {
            min-height: scaling(120);
            border-bottom: 1px solid $c-black;
        }

        &Caption {
            @include text;

            margin-bottom: scaling(20);
            color: $c-gray;

            @include desktop--large {
                margin-bottom: scaling(36);
            }
        }

        &Link {
            color: $c-black;
            margin-top: auto;
            font-family: $family-apoc;
            line-height: $lh-110;
            font-size: scaling(20);
            transition: color $d-hover ease-in-out;

            @include desktop--large {
                font-size: scaling(32);
            }

            @include desktop {
                font-size: scaling(26);
            }

            @include tablet {
                font-size: scaling(18);
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
