<template>
    <div class="PeopleList">
        <div
            v-for="(item, index) in list"
            :key="index"
            class="PeopleList-section"
        >
            <div
                v-for="(role, roleIndex) in item.roles"
                :key="roleIndex"
                class="PeopleList-sectionGroup"
                :style="{
                    gridColumn: `span ${
                        role.members.length < countColumnsResize[curMediaSize]
                            ? countColumnsMultiplier[curMediaSize] *
                              role.members.length
                            : 12
                    }`
                }"
            >
                <div
                    v-if="role.position"
                    class="PeopleList-sectionPosition"
                    v-text="role.position"
                ></div>
                <div
                    class="PeopleList-sectionInner"
                    :style="{
                        gridTemplateColumns: `repeat(${
                            role.members.length <
                            countColumnsResize[curMediaSize]
                                ? role.members.length
                                : countColumnsResize[curMediaSize]
                        }, 1fr)`
                    }"
                >
                    <div
                        v-for="(member, memberIndex) in role.members"
                        :key="memberIndex"
                        class="PeopleList-member"
                        :class="{ isLink: member.url }"
                    >
                        <div
                            class="PeopleList-memberFirstName"
                            v-text="member.firstName"
                        ></div>
                        <div
                            class="PeopleList-memberLastName"
                            v-text="member.lastName"
                        ></div>
                        <HiddenLink v-if="member.url" :url="member.url" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HiddenLink from '@/components/common/HiddenLink';
import { NAMES_BREAKPOINTS } from '@/utils/constants';
import { getCurrentMediaSize } from '~/utils/utils';

export default {
    name: 'PeopleList',

    components: {
        HiddenLink
    },

    props: {
        list: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            curMediaSize: 0,
            countColumnsResize: {
                [NAMES_BREAKPOINTS.desktopLarge]: 4,
                [NAMES_BREAKPOINTS.desktop]: 4,
                [NAMES_BREAKPOINTS.desktopSmall]: 4,
                [NAMES_BREAKPOINTS.laptop]: 3,
                [NAMES_BREAKPOINTS.tablet]: 4,
                [NAMES_BREAKPOINTS.mobile]: 2
            },
            countColumnsMultiplier: {
                [NAMES_BREAKPOINTS.desktopLarge]: 3,
                [NAMES_BREAKPOINTS.desktop]: 3,
                [NAMES_BREAKPOINTS.desktopSmall]: 3,
                [NAMES_BREAKPOINTS.laptop]: 3,
                [NAMES_BREAKPOINTS.tablet]: 3,
                [NAMES_BREAKPOINTS.mobile]: 12
            }
        };
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            this.curMediaSize = getCurrentMediaSize();
        }
    }
};
</script>

<style lang="scss" scoped>
.PeopleList {
    $component: &;

    width: 100%;
    padding: scaling(16) scaling(16) scaling(48);

    @include desktop--large {
        padding: scaling(32) scaling(32) scaling(96);
    }

    @include desktop {
        padding: scaling(24) scaling(24) scaling(72);
    }

    @include desktop--small {
        padding: scaling(20) scaling(20) scaling(60);
    }

    @include mobile {
        padding: scaling(32) scaling(16) scaling(64);
    }

    &-section {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-auto-flow: dense;
        width: 100%;

        @include desktop--large {
            grid-gap: scaling(48) scaling(75);
        }

        @include desktop {
            grid-gap: scaling(40) scaling(56);
        }

        @include desktop--small {
            grid-gap: scaling(32) scaling(46);
        }

        @include laptop {
            grid-gap: scaling(32) scaling(34);
        }

        @include tablet {
            grid-gap: scaling(32);
        }

        @include mobile {
            grid-gap: scaling(24) 0;
        }

        &Position {
            margin-bottom: scaling(12);
            padding-bottom: scaling(8);
            border-bottom: 1px solid #c4c4c4;
            color: $c-gray;
            font-size: scaling(12);
            line-height: $lh-150;
            font-family: $family-graphic;

            @include desktop--large {
                margin-bottom: scaling(16);
                padding-bottom: scaling(12);
                font-size: scaling(16);
            }

            @include desktop {
                margin-bottom: scaling(16);
                padding-bottom: scaling(12);
                font-size: scaling(14);
            }

            @include laptop {
                line-height: $lh-140;
            }

            @include tablet {
                line-height: $lh-140;
            }

            @include mobile {
                line-height: $lh-130;
            }
        }

        &Inner {
            display: grid;
            grid-gap: scaling(16) scaling(32);

            @include desktop--large {
                grid-gap: scaling(24) scaling(75);
            }

            @include desktop {
                grid-gap: scaling(20) scaling(56);
            }

            @include desktop--small {
                grid-gap: scaling(16) scaling(46);
            }

            @include laptop {
                grid-gap: scaling(16) scaling(34);
            }
        }
    }

    &-member {
        &.isLink {
            position: relative;

            @include hover {
                &:hover #{$component}-member {
                    &FirstName,
                    &LastName {
                        color: $c-red;
                    }
                }
            }
        }

        &FirstName {
            margin-bottom: scaling(4);
            color: $c-black--header;
            font-size: scaling(14);
            line-height: $lh-130;
            font-family: $family-graphic;
            transition: color $d-hover ease-in-out;

            @include desktop--large {
                font-size: scaling(20);
            }

            @include desktop {
                font-size: scaling(18);
            }

            @include desktop--small {
                font-size: scaling(16);
            }
        }

        &LastName {
            color: $c-black--header;
            font-size: scaling(12);
            line-height: $lh-160;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: $fw-medium;
            font-family: $family-graphic;
            transition: color $d-hover ease-in-out;

            @include desktop--large {
                font-size: scaling(20);
            }

            @include desktop {
                font-size: scaling(18);
                line-height: $lh-140;
            }

            @include desktop--small {
                font-size: scaling(14);
            }
        }
    }
}
</style>
