<template>
    <div
        class="NewsChangesItem"
        :class="[`NewsChangesItem--${item.dates.length}`]"
    >
        <div class="NewsChangesItem-wrapper">
            <div class="NewsChangesItem-date" v-text="item.date"></div>
            <div class="NewsChangesItem-type" v-text="item.category"></div>
            <div class="NewsChangesItem-title" v-text="item.title"></div>
            <div
                v-if="item.caption"
                class="NewsChangesItem-text"
                v-text="item.caption"
            ></div>
            <div class="NewsChangesItem-dates">
                <div
                    v-for="(date, index) in getDates"
                    :key="index"
                    class="NewsChangesItem-item"
                >
                    <div
                        class="NewsChangesItem-itemDate"
                        v-text="date.date"
                    ></div>
                    <div class="NewsChangesItem-itemPeoples">
                        <div
                            v-for="(people, indexPeople) in date.people"
                            :key="indexPeople"
                            class="NewsChangesItem-itemPeople"
                            :class="{ isLink: people.url }"
                        >
                            <HiddenLink v-if="people.url" :url="people.url" />
                            <div class="NewsChangesItem-itemPeopleImage">
                                <img
                                    v-if="people.img"
                                    :src="people.img"
                                    :alt="people.name"
                                />
                                <div
                                    v-else
                                    class="NewsChangesItem-itemPeopleImageStub"
                                >
                                    <svg-icon name="icon-stub-people-mobile" />
                                </div>
                            </div>
                            <div class="NewsChangesItem-itemPeopleInfo">
                                <div
                                    class="NewsChangesItem-itemPeopleInfoRole"
                                    v-text="people.role"
                                ></div>
                                <div
                                    class="NewsChangesItem-itemPeopleInfoName"
                                    v-text="people.name"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="NewsChangesItem-buttons">
            <div class="NewsChangesItem-button">
                <RoundedButton
                    type="isTransparentBlack"
                    :link="{
                        url: item.urlPerformance + '#anchor-5',
                        title: 'Билеты'
                    }"
                />
            </div>
            <div v-if="isNeedLink" class="NewsChangesItem-button">
                <RoundedButton
                    type="isTransparentBlack"
                    :link="{
                        url: item.url,
                        title: item.is_force_details
                            ? 'Подробнее'
                            : 'Весь список'
                    }"
                />
            </div>
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/other/RoundedButton';
import HiddenLink from '~/components/common/HiddenLink';

export default {
    name: 'NewsChangesItem',
    components: { RoundedButton, HiddenLink },
    props: {
        item: {
            type: Object,
            required: true
        }
    },

    computed: {
        getDates() {
            return this.item.dates.slice(0, 4);
        },

        isNeedLink() {
            if (this.item.is_force_details) {
                return true;
            }
            const dates = this.item.dates.slice(0, 4);
            const maxVisible = { 1: 10, 2: 5 };
            const currentVisible = maxVisible[dates.length] || 2;

            return (
                this.item.dates.length > 4 ||
                !!dates.filter((date) => date.people.length > currentVisible)
                    .length
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.NewsChangesItem {
    $component: &;

    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: scaling(16) scaling(16) scaling(24);

    @include desktop--large {
        padding: scaling(32) scaling(32) scaling(40);
    }

    @include desktop {
        padding: scaling(24) scaling(24) scaling(32);
    }

    @include desktop--small {
        padding: scaling(20) scaling(20) scaling(28);
    }

    &-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
    }

    &-date {
        @include body-3;

        color: $c-red;
    }

    &-type {
        @include caption-1;

        margin-top: scaling(4);
        color: rgba($c-black, 0.5);

        @include desktop--large {
            margin-top: scaling(8);
        }

        @include desktop {
            margin-top: scaling(8);
        }
    }

    &-title {
        @include body-4;

        line-height: $lh-120;
        letter-spacing: 0;
        margin-top: scaling(80);
        color: $c-black;

        @include desktop {
            margin-top: scaling(72);
        }

        @include desktop--small {
            margin-top: scaling(60);
        }

        @include laptop {
            margin-top: scaling(72);
        }

        @include tablet {
            margin-top: scaling(80);
        }

        @include mobile {
            margin-top: scaling(64);
        }
    }

    &-text {
        @include body-3;

        font-size: scaling(14);
        line-height: $lh-150;
        color: $c-black;
        margin-top: scaling(12);

        @include desktop--large {
            margin-top: scaling(24);
        }

        @include desktop {
            margin-top: scaling(16);
        }

        @include desktop--small {
            margin-top: scaling(16);
        }
    }

    &-dates {
        margin-top: scaling(24);
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        @include desktop--large {
            margin-top: scaling(32);
        }

        @include desktop {
            margin-top: scaling(28);
        }
    }

    &-item {
        width: (272 * 100% / 576);
        border-top: 1px solid #e6e6e6;
        padding-top: scaling(12);

        &:first-child:last-child {
            width: 100%;
        }

        @include laptop {
            width: 100%;
        }

        @include tablet {
            width: 100%;
        }

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
        }

        &:not(:first-child) {
            @include laptop {
                margin-top: scaling(24);
            }

            @include tablet {
                margin-top: scaling(24);
            }

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

                @include laptop {
                    column-count: 1;
                }

                @include tablet {
                    column-count: 1;
                }

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
            position: relative;

            #{$component}:not(#{$component}--1):not(#{$component}--2)
                &:nth-child(n + 3),
            #{$component}--1 &:nth-child(n + 11),
            #{$component}--2 &:nth-child(n + 6) {
                display: none;
            }

            &:nth-child(n + 3) {
                @include laptop {
                    display: none;
                }

                @include tablet {
                    display: none;
                }

                @include mobile {
                    display: none;
                }
            }

            &:not(:first-child) {
                margin-top: scaling(16);
            }

            @include hover {
                &.isLink:hover {
                    #{$component}-itemPeopleInfoName {
                        color: $c-red;
                    }
                }
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
                    transition: color $d-hover ease-in-out;
                }
            }
        }
    }

    &-buttons {
        display: flex;
        width: 100%;
        border-top: 1px solid #e6e6e6;
        margin-top: scaling(24);
        padding-top: scaling(24);

        @include desktop--large {
            margin-top: scaling(40);
            padding-top: scaling(40);
        }

        @include desktop {
            margin-top: scaling(32);
            padding-top: scaling(32);
        }

        @include desktop--small {
            margin-top: scaling(28);
            padding-top: scaling(28);
        }
    }

    &-button {
        &:not(:first-child) {
            margin-left: scaling(20);
        }
    }
}
</style>
