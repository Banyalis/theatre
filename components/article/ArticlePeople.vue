<template>
    <div class="ArticlePeople" :class="[`ArticlePeople--${dates.length}`]">
        <div class="ArticlePeople-dates">
            <div
                v-for="(date, index) in dates"
                :key="index"
                class="ArticlePeople-item"
            >
                <div class="ArticlePeople-itemDate" v-text="date.date"></div>
                <div class="ArticlePeople-itemPeoples">
                    <NuxtLink
                        v-for="(people, indexPeople) in date.people"
                        :key="indexPeople"
                        :to="people.url"
                        class="ArticlePeople-itemPeople"
                    >
                        <div class="ArticlePeople-itemPeopleImage">
                            <img
                                v-if="people.img"
                                :src="people.img"
                                :alt="people.name"
                            />
                            <div
                                v-else
                                class="ArticlePeople-itemPeopleImageStub"
                            >
                                <svg-icon name="icon-stub-people-mobile" />
                            </div>
                        </div>
                        <div class="ArticlePeople-itemPeopleInfo">
                            <div
                                class="ArticlePeople-itemPeopleInfoRole"
                                v-text="people.role"
                            ></div>
                            <div
                                class="ArticlePeople-itemPeopleInfoName"
                                v-text="people.name"
                            ></div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArticlePeople',

    props: {
        dates: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.ArticlePeople {
    $component: &;

    width: 100%;
    position: relative;

    &-dates {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    &-item {
        width: (416 * 100% / 896);
        border-top: 1px solid #e6e6e6;
        padding-top: scaling(12);

        &:first-child:last-child {
            width: 100%;
        }

        //@include laptop {
        //    width: 100%;
        //}
        //
        //@include tablet {
        //    width: 100%;
        //}

        @include mobile {
            width: 100%;
        }

        &:nth-child(n + 3) {
            margin-top: scaling(24);

            @include desktop--large {
                margin-top: scaling(40);
            }

            @include desktop {
                margin-top: scaling(32);
            }

            @include desktop--small {
                margin-top: scaling(28);
            }

            @include laptop {
                margin-top: scaling(24);
            }

            @include tablet {
                margin-top: scaling(24);
            }
        }

        &:not(:first-child) {
            //@include laptop {
            //    margin-top: scaling(24);
            //}
            //
            //@include tablet {
            //    margin-top: scaling(24);
            //}

            @include mobile {
                margin-top: scaling(24);
            }
        }

        &Date {
            @include text--caption;

            color: #ac914d;
        }

        &Peoples {
            width: 100%;
            margin-top: scaling(16);

            @include desktop--large {
                margin-top: scaling(20);
            }

            #{$component}--1 & {
                column-count: 2;

                //@include laptop {
                //    column-count: 1;
                //}
                //
                //@include tablet {
                //    column-count: 1;
                //}

                @include mobile {
                    column-count: 1;
                }
            }
        }

        &People {
            width: 100%;
            display: flex;
            align-items: center;
            break-inside: avoid;

            &:not(:first-child) {
                margin-top: scaling(16);
            }

            &Image {
                width: scaling(32);
                height: scaling(32);
                flex: 0 0 auto;
                display: flex;
                overflow: hidden;
                border-radius: 100%;

                @include desktop--large {
                    width: scaling(48);
                    height: scaling(48);
                }

                @include desktop {
                    width: scaling(36);
                    height: scaling(36);
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
                        stroke: $c-black;
                    }
                }
            }

            &Info {
                width: 100%;
                flex: 1 1 auto;
                display: flex;
                flex-direction: column;
                padding-left: scaling(16);

                &Role {
                    @include caption-1;

                    color: #6d6d6d;
                }

                &Name {
                    @include caption-1;

                    color: $c-black;
                }
            }
        }
    }
}
</style>
