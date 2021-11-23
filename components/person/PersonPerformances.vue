<template>
    <div class="PersonPerformances">
        <CommonTitle title="Ближайшие спектакли" theme="isGray" />
        <div
            v-for="(section, sectionIndex) in performances"
            :key="sectionIndex"
            class="PersonPerformances-section"
        >
            <NuxtLink
                ref="card"
                :to="section.url"
                class="PersonPerformances-card"
                :class="{ noPicture: !section.image }"
            >
                <div
                    class="PersonPerformances-cardSubtitle"
                    v-text="section.subtitle"
                ></div>
                <div class="PersonPerformances-cardImage">
                    <div class="PersonPerformances-cardImageInner">
                        <picture v-if="section.image">
                            <source
                                :srcset="
                                    section.image +
                                    ' 1x, ' +
                                    section.image2x +
                                    ' 2x'
                                "
                            />
                            <img :src="section.image" alt="" />
                        </picture>
                    </div>
                </div>
                <div
                    class="PersonPerformances-cardTitle"
                    v-text="section.title"
                ></div>
                <div
                    class="PersonPerformances-cardDescription"
                    v-text="section.description"
                ></div>
                <div
                    class="PersonPerformances-cardAge"
                    v-text="section.age"
                ></div>
            </NuxtLink>
            <div class="PersonPerformances-schedule">
                <div
                    v-for="(item, index) in section.schedule"
                    :key="index"
                    class="PersonPerformances-scheduleItem"
                >
                    <div class="PersonPerformances-scheduleItemHeader">
                        <div
                            class="PersonPerformances-scheduleItemDate"
                            v-text="item.date"
                        ></div>
                        <div
                            class="PersonPerformances-scheduleItemTime"
                            v-text="item.time"
                        ></div>
                    </div>
                    <div class="PersonPerformances-scheduleItemFooter">
                        <div
                            class="PersonPerformances-scheduleItemDay"
                            v-text="item.day"
                        ></div>
                        <div
                            class="PersonPerformances-scheduleItemScene"
                            v-text="item.scene"
                        ></div>
                        <div
                            class="PersonPerformances-scheduleItemTickets"
                            v-text="item.tickets"
                        ></div>
                        <div
                            class="PersonPerformances-scheduleItemPrice"
                            v-text="item.price"
                        ></div>
                        <RoundedButton
                            title="Купить билет"
                            type="isRed"
                            class="PersonPerformances-scheduleItemButton"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { isDesktopSmall } from '@/utils/utils';
import RoundedButton from '@/components/other/RoundedButton';
import CommonTitle from '~/components/common/CommonTitle';

export default {
    name: 'PersonPerformances',

    components: {
        RoundedButton,
        CommonTitle
    },

    props: {
        performances: {
            type: Array,
            required: true
        }
    },

    computed: {
        ...mapState(['headerHeight'])
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.$nextTick(this.onResize);
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            const personNavHeight =
                document.querySelector('.Person-nav').offsetHeight;

            this.$refs.card.forEach((item) => {
                if (isDesktopSmall()) {
                    item.$el.style.top = `${
                        this.headerHeight + personNavHeight
                    }px`;
                    item.$el.style.height = `${
                        window.innerHeight - this.headerHeight - personNavHeight
                    }px`;
                } else {
                    item.$el.removeAttribute('style');
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@mixin text {
    font-size: scaling(12);
    line-height: $lh-130;
    font-family: $family-graphic;

    @include desktop--large {
        font-size: scaling(20);
    }

    @include desktop {
        font-size: scaling(18);
    }

    @include desktop--small {
        font-size: scaling(14);
    }

    @include laptop {
        line-height: $lh-140;
    }
}

.PersonPerformances {
    $component: &;

    margin-top: -1px;

    &-section {
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid $c-black;
    }

    &-card {
        position: sticky;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        width: 100%;
        padding: scaling(24) scaling(20);

        @include desktop--large {
            width: (480 * 100% / 1920);
            padding: scaling(36) scaling(32);
            border-right: 1px solid $c-black;
        }

        @include desktop {
            width: (360 * 100% / 1440);
            padding: scaling(28) scaling(24);
            border-right: 1px solid $c-black;
        }

        @include desktop--small {
            width: (300 * 100% / 1200);
            border-right: 1px solid $c-black;
        }

        @include laptop {
            align-items: flex-start;
            border-bottom: 1px solid $c-black;
            position: relative;
        }

        @include tablet {
            align-items: flex-start;
            border-bottom: 1px solid $c-black;
            position: relative;
        }

        @include mobile {
            padding: scaling(24) scaling(32);
            border-bottom: 1px solid $c-black;
        }

        @include hover {
            &:hover #{$component}-card {
                &Image {
                    border-color: $c-red;
                    background-color: $c-red;
                }

                &Title {
                    color: $c-red;
                }
            }
        }

        &.noPicture #{$component}-cardImageInner {
            background-color: $c-red;
        }

        &Subtitle,
        &Description,
        &Age {
            @include text;

            color: $c-gray;

            @include laptop {
                margin-left: scaling(84);
            }

            @include tablet {
                margin-left: scaling(84);
            }
        }

        &Image {
            width: scaling(64);
            height: scaling(128);
            padding: scaling(4);
            border: 1px solid $c-black;
            border-top-left-radius: scaling(220);
            border-top-right-radius: scaling(220);
            transition: border-color $d-hover ease-in-out,
                background-color $d-hover ease-in-out;

            @include desktop--large {
                width: scaling(128);
                height: scaling(256);
                margin: scaling(100) 0 scaling(40);
                padding: scaling(8);
            }

            @include desktop {
                width: scaling(96);
                height: scaling(192);
                margin: scaling(102) 0 scaling(32);
                padding: scaling(6);
            }

            @include desktop--small {
                width: scaling(80);
                height: scaling(160);
                margin: scaling(88) 0 scaling(24);
                padding: scaling(5);
            }

            @include laptop {
                position: absolute;
            }

            @include tablet {
                position: absolute;
            }

            @include mobile {
                width: scaling(80);
                height: scaling(160);
                margin: scaling(56) 0 scaling(20);
            }

            &Inner {
                height: 100%;
                border-top-left-radius: scaling(220);
                border-top-right-radius: scaling(220);
                overflow: hidden;
            }

            img {
                @include m-objectFit;

                width: 100%;
                height: 100%;
            }
        }

        &Title {
            color: $c-black--header;
            font-size: scaling(24);
            line-height: $lh-110;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            font-feature-settings: 'ss02' on;
            transition: color $d-hover ease-in-out;

            @include desktop--large {
                font-size: scaling(36);
            }

            @include desktop {
                font-size: scaling(28);
            }

            @include laptop {
                margin: scaling(8) 0 scaling(48) scaling(84);
                font-size: scaling(20);
                line-height: $lh-120;
            }

            @include tablet {
                margin: scaling(8) 0 scaling(64) scaling(84);
                font-size: scaling(20);
                line-height: $lh-120;
            }
        }

        &Description {
            @include desktop--large {
                margin: scaling(100) 0 scaling(20);
            }

            @include desktop {
                margin: scaling(102) 0 scaling(16);
            }

            @include desktop--small {
                margin: scaling(88) 0 scaling(12);
            }

            @include mobile {
                margin: scaling(54) 0 scaling(12);
            }
        }

        &Age {
            @include laptop {
                margin-top: scaling(10);
            }

            @include tablet {
                margin-top: scaling(10);
            }
        }
    }

    &-schedule {
        flex: 1;
        margin-bottom: -1px;

        &Item {
            padding: scaling(20) scaling(16);
            border-bottom: 1px solid $c-black;

            @include desktop--large {
                padding: scaling(40) scaling(32);
            }

            @include desktop {
                padding: scaling(32) scaling(24);
            }

            @include desktop--small {
                padding: scaling(24) scaling(20);
            }

            @include mobile {
                padding: scaling(32) scaling(16);
            }

            &Header,
            &Footer {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            &Date,
            &Time {
                font-size: scaling(20);
                line-height: $lh-130;
                font-family: $family-graphic;
                font-feature-settings: 'cpsp' on;

                @include desktop--large {
                    font-size: scaling(36);
                    letter-spacing: -0.01em;
                }

                @include desktop {
                    font-size: scaling(28);
                    letter-spacing: -0.01em;
                }

                @include desktop--small {
                    font-size: scaling(24);
                }
            }

            &Date {
                color: $c-red;
            }

            &Footer {
                margin-top: scaling(12);
                padding-top: scaling(12);
                border-top: 1px solid #d6d6d6;

                @include desktop--large {
                    margin-top: scaling(20);
                    padding-top: scaling(20);
                }

                @include desktop {
                    margin-top: scaling(16);
                    padding-top: scaling(16);
                }

                @include tablet {
                    margin-top: scaling(8);
                    padding-top: scaling(8);
                }

                @include mobile {
                    flex-wrap: wrap;
                    margin-top: scaling(4);
                    padding-top: 0;
                    border-top: none;
                }
            }

            &Day,
            &Scene,
            &Tickets,
            &Price {
                @include text;

                @include laptop {
                    font-size: scaling(14);
                    line-height: $lh-130;
                }

                @include mobile {
                    width: 40%;
                    line-height: $lh-140;
                }
            }

            &Day,
            &Tickets {
                @include mobile {
                    color: $c-gray;
                }
            }

            &Scene {
                @include mobile {
                    display: none;
                }
            }

            &Tickets {
                @include mobile {
                    text-align: right;
                }
            }

            &Price {
                @include mobile {
                    margin-top: scaling(20);
                    font-size: scaling(14);
                    line-height: $lh-130;
                }
            }

            &Button {
                margin-left: scaling(70);

                @include mobile {
                    margin: scaling(20) 0 0;
                }
            }
        }
    }
}
</style>
