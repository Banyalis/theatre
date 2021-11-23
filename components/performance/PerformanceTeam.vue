<template>
    <div class="PerformanceTeam">
        <div
            class="PerformanceTeam-title"
            v-text="`Действующие лица и исполнители`"
        ></div>
        <div ref="anchor" class="PerformanceTeam-inner">
            <div ref="nav" class="PerformanceTeam-nav">
                <template v-for="(item, index) in nav">
                    <div
                        v-if="item.date"
                        :key="index"
                        class="PerformanceTeam-navItem"
                        :class="{ isActive: activeTab === item.hash }"
                        @click="onChangeTab(item.hash)"
                    >
                        <div
                            class="PerformanceTeam-navItemTitle"
                            v-text="item.date"
                        ></div>
                        <p
                            class="PerformanceTeam-navItemText"
                            v-text="item.day"
                        ></p>
                    </div>
                </template>
                <!-- <div
                    class="PerformanceTeam-navItem"
                    :class="{ isActive: activeArchive }"
                    @click="openDatesPopup"
                >
                    <div
                        class="PerformanceTeam-navItemTitle"
                        v-text="`Архив`"
                    ></div>
                    <p
                        class="PerformanceTeam-navItemText"
                        v-text="`Все даты`"
                    ></p>
                </div> -->
                <div
                    class="PerformanceTeam-navItem"
                    :class="{ isActive: activeAll }"
                    @click="onChangeTab('all')"
                >
                    <div
                        class="PerformanceTeam-navItemTitle"
                        v-text="`За все время`"
                    ></div>
                    <p
                        class="PerformanceTeam-navItemText"
                        v-text="`Все лица`"
                    ></p>
                </div>
            </div>
            <div class="PerformanceTeam-content">
                <div
                    v-if="
                        !activeAll &&
                        getContent.dedicated &&
                        !getContent.dedicated.image &&
                        !getContent.dedicated.text &&
                        !getContent.actors.length &&
                        !getParticipants.length
                    "
                    class="PerformanceTeam-alert"
                >
                    <!-- eslint-disable -->
                    <div
                        class="PerformanceTeam-alertTitle"
                        v-html="`Состав<br>будет объявлен позже`"
                    ></div>
                    <!-- eslint-enable -->
                </div>
                <template v-else>
                    <div class="PerformanceTeam-contentInner">
                        <div class="PerformanceTeam-header">
                            <div
                                v-if="activeAll"
                                class="PerformanceTeam-date"
                                v-text="`За все время`"
                            ></div>
                            <div
                                v-else-if="date"
                                class="PerformanceTeam-date"
                                v-text="date"
                            ></div>
                            <div
                                v-if="activeAll"
                                class="PerformanceTeam-day isAll"
                                v-text="`Все действующие лица и исполнители`"
                            ></div>
                            <div
                                v-else-if="day"
                                class="PerformanceTeam-day"
                                v-text="day"
                            ></div>
                            <div
                                class="PerformanceTeam-triggerWrapper"
                                @click="openDatesPopup"
                            >
                                <div
                                    class="PerformanceTeam-trigger"
                                    v-text="'Выбрать дату'"
                                ></div>
                            </div>
                        </div>
                        <div
                            v-if="
                                !activeAll &&
                                getContent.dedicated &&
                                (getContent.dedicated.image ||
                                    getContent.dedicated.text)
                            "
                            class="PerformanceTeam-dedicated"
                        >
                            <div class="PerformanceTeam-dedicatedInner">
                                <p
                                    class="PerformanceTeam-dedicatedText"
                                    v-text="getContent.dedicated.text"
                                ></p>
                                <div
                                    v-if="getContent.dedicated.fullText"
                                    class="PerformanceTeam-dedicatedButton"
                                    @click="openPerformancePopup"
                                    v-text="`Подробнее`"
                                ></div>
                            </div>
                            <div class="PerformanceTeam-dedicatedImage">
                                <picture v-if="getContent.dedicated.image">
                                    <source
                                        :srcset="
                                            getContent.dedicated.image +
                                            ' 1x, ' +
                                            getContent.dedicated.image2x +
                                            ' 2x'
                                        "
                                    />
                                    <img
                                        :src="getContent.dedicated.image"
                                        alt=""
                                    />
                                </picture>
                                <template v-else>
                                    <div
                                        class="
                                            PerformanceTeam-dedicatedImageStub
                                            PerformanceTeam-dedicatedImageStub--desktop
                                        "
                                    >
                                        <svg-icon
                                            name="icon-stub-people-desktop"
                                        />
                                    </div>
                                    <div
                                        class="
                                            PerformanceTeam-dedicatedImageStub
                                            PerformanceTeam-dedicatedImageStub--laptop
                                        "
                                    >
                                        <svg-icon
                                            name="icon-stub-people-laptop"
                                        />
                                    </div>
                                    <div
                                        class="
                                            PerformanceTeam-dedicatedImageStub
                                            PerformanceTeam-dedicatedImageStub--mobile
                                        "
                                    >
                                        <svg-icon
                                            name="icon-stub-people-mobile"
                                        />
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div
                            v-if="
                                !activeAll &&
                                getContent.actors &&
                                getContent.actors.length
                            "
                            class="PerformanceTeam-actors"
                            :class="{
                                isEven: even
                            }"
                        >
                            <div
                                v-for="(item, index) in getContent.actors"
                                :key="index"
                                ref="actor"
                                class="PerformanceTeam-actorsItem"
                            >
                                <div class="PerformanceTeam-actorsItemInner">
                                    <div
                                        class="PerformanceTeam-actorsItemImage"
                                    >
                                        <picture v-if="item.image">
                                            <source
                                                :srcset="
                                                    item.image +
                                                    ' 1x, ' +
                                                    item.image2x +
                                                    ' 2x'
                                                "
                                            />
                                            <img :src="item.image" alt="" />
                                        </picture>
                                        <template v-else>
                                            <div
                                                class="
                                                    PerformanceTeam-actorsItemImageStub
                                                    PerformanceTeam-actorsItemImageStub--desktop
                                                "
                                            >
                                                <svg-icon
                                                    name="icon-stub-people-desktop"
                                                />
                                            </div>
                                            <div
                                                class="
                                                    PerformanceTeam-actorsItemImageStub
                                                    PerformanceTeam-actorsItemImageStub--laptop
                                                "
                                            >
                                                <svg-icon
                                                    name="icon-stub-people-laptop"
                                                />
                                            </div>
                                            <div
                                                class="
                                                    PerformanceTeam-actorsItemImageStub
                                                    PerformanceTeam-actorsItemImageStub--mobile
                                                "
                                            >
                                                <svg-icon
                                                    name="icon-stub-people-mobile"
                                                />
                                            </div>
                                        </template>
                                    </div>
                                    <div
                                        class="
                                            PerformanceTeam-actorsItemContent
                                        "
                                    >
                                        <div
                                            class="
                                                PerformanceTeam-actorsItemRole
                                            "
                                            v-text="item.role"
                                        ></div>
                                        <div
                                            class="
                                                PerformanceTeam-actorsItemName
                                            "
                                            v-text="item.name"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="getParticipants.length"
                            class="PerformanceTeam-participants"
                        >
                            <div
                                v-for="(item, index) in getParticipants"
                                :key="index"
                                class="PerformanceTeam-participantsSection"
                                :class="{ isSplit: item.separator }"
                            >
                                <div
                                    v-if="item.title && item.roles.length >= 1"
                                    class="
                                        PerformanceTeam-participantsSectionTitle
                                    "
                                    v-text="item.title"
                                ></div>
                                <template
                                    v-for="(role, roleIndex) in item.roles"
                                >
                                    <span
                                        v-if="role.title"
                                        :key="roleIndex"
                                        class="
                                            PerformanceTeam-participantsSectionPosition
                                        "
                                        :class="{
                                            isGroupPosition:
                                                item.roles.length >= 1
                                        }"
                                        v-text="role.title"
                                    ></span>
                                    <template
                                        v-for="(
                                            member, memberIndex
                                        ) in role.members"
                                    >
                                        <div
                                            v-if="
                                                memberIndex !== 'undefined' &&
                                                memberIndex !== 'null' &&
                                                member.length > 1
                                            "
                                            :key="`${index}_${roleIndex}_${memberIndex}`"
                                            class="
                                                PerformanceTeam-participantsSectionGroup
                                            "
                                            :class="{
                                                isGroupPosition:
                                                    item.roles.length >= 1
                                            }"
                                            v-text="memberIndex"
                                        ></div>
                                        <div
                                            v-for="(
                                                memberItem, memberItemIndex
                                            ) in member"
                                            :key="`${index}_${roleIndex}_${memberIndex}_${memberItemIndex}`"
                                            class="
                                                PerformanceTeam-participantsItem
                                            "
                                            :class="{
                                                samePosition:
                                                    (!memberItem.position &&
                                                        member.length >= 1) ||
                                                    member.length > 1,
                                                isLink: memberItem.url
                                            }"
                                        >
                                            <HiddenLink
                                                v-if="memberItem.url"
                                                :url="memberItem.url"
                                            />
                                            <div
                                                class="
                                                    PerformanceTeam-participantsItemImage
                                                "
                                            >
                                                <picture
                                                    v-if="memberItem.image"
                                                >
                                                    <source
                                                        :srcset="
                                                            memberItem.image +
                                                            ' 1x, ' +
                                                            memberItem.image2x +
                                                            ' 2x'
                                                        "
                                                    />
                                                    <img
                                                        :src="memberItem.image"
                                                        alt=""
                                                    />
                                                </picture>
                                                <div
                                                    v-else
                                                    class="
                                                        PerformanceTeam-participantsItemImageStub
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
                                                class="
                                                    PerformanceTeam-participantsItemInner
                                                "
                                            >
                                                <div
                                                    v-if="member.length <= 1"
                                                    class="
                                                        PerformanceTeam-participantsItemPosition
                                                    "
                                                    v-text="memberItem.position"
                                                ></div>
                                                <div
                                                    class="
                                                        PerformanceTeam-participantsItemName
                                                    "
                                                    v-text="memberItem.name"
                                                ></div>
                                            </div>
                                        </div>
                                    </template>
                                </template>
                            </div>
                        </div>
                        <div
                            class="PerformanceTeam-hint"
                            v-text="
                                `Театр оставляет за собой право заменять исполнителей.`
                            "
                        ></div>
                    </div>
                    <div
                        v-if="
                            BUTTON_CLASSES[ticketsButton.type] !== 'isDisabled'
                        "
                        class="PerformanceTeam-footer"
                    >
                        <!-- <button
                            class="PerformanceTeam-button"
                            v-text="`Распечатать список`"
                        ></button> -->
                        <a
                            :href="ticketsButtonLink"
                            target="_blank"
                            class="PerformanceTeam-button"
                            v-text="ticketsButton.text"
                        ></a>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { DateTime } from 'luxon';
import VueScrollTo from 'vue-scrollto';
import {
    CONFIG_POPUPS,
    TICKETS_BUTTONS,
    BUTTON_CLASSES,
    BUTTON_TYPES
} from '@/utils/constants';
import { isDesktop, isMobile } from '@/utils/utils';
import HiddenLink from '~/components/common/HiddenLink';

export default {
    name: 'PerformanceTeam',

    components: {
        HiddenLink
    },

    props: {
        team: {
            type: Array,
            required: true
        },
        all: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            activeTab: 0,
            activeAll: false,
            even: false,
            activeArchive: false,
            BUTTON_CLASSES
        };
    },

    computed: {
        ticketsData() {
            return this.programs[this.getContent.hash] || {};
        },

        ticketsButton() {
            if (!this.isAnnounced) {
                return this.ticketsData.freeSeats
                    ? TICKETS_BUTTONS.buy
                    : TICKETS_BUTTONS.sold;
            } else return TICKETS_BUTTONS.soon;
        },

        ticketsButtonLink() {
            if (this.ticketsButton.type === BUTTON_TYPES.link) {
                return `https://ticket.bolshoi.ru/show/${this.ticketsData.showId}`;
            } else return null;
        },

        isAnnounced() {
            return !this.programs[this.getContent.hash];
        },

        getFirstHash() {
            return this.team[0].hash;
        },

        getContent() {
            return this.activeAll
                ? this.all
                : this.team.filter((item) => {
                      return item.hash === this.activeTab;
                  })[0] || {};
        },

        getParticipants() {
            const part = this.getContent.participants;
            const res = [];

            if (part)
                part.forEach((item) => {
                    const curRole = [];

                    item.roles.forEach((role) => {
                        const curMembers = {};
                        const membersList = [...role.members];

                        membersList.sort(this.sortMembers);

                        membersList.forEach((member) => {
                            const curPos = member.position;

                            if (!curMembers[curPos]) curMembers[curPos] = [];

                            curMembers[curPos].push(member);
                        });

                        curRole.push({
                            title: role.title,
                            members: curMembers
                        });
                    });

                    res.push({ roles: curRole });
                });

            return res;
        },

        localeDate() {
            if (this.getContent.datetime) {
                return DateTime.fromISO(this.getContent.datetime, {
                    locale: this.currentLocaleCode
                });
            } else {
                return null;
            }
        },

        date() {
            return this.localeDate?.toFormat('dd MMMM');
        },

        day() {
            return this.localeDate?.toFormat('EEEE, HH:mm');
        },

        nav() {
            return this.team.map((item) => {
                const datetime = DateTime.fromISO(item.datetime, {
                    locale: this.currentLocaleCode
                });

                return {
                    ...item,
                    datetime,
                    date: datetime.toFormat('dd MMMM'),
                    day: datetime.toFormat('EEEE, HH:mm')
                };
            });
        },

        ...mapState(['currentLocaleCode']),
        ...mapState('performances', ['content', 'programs'])
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        setTimeout(() => {
            this.onResize();
        }, 150);
        this.onResize();

        this.activeTab = this.getFirstHash;

        this.$root.$on('performance-calendar', (hash) => {
            this.onChangeTab(hash);

            this.nav.forEach((item) => {
                this.activeArchive = item.hash !== hash;
            });
        });
    },

    updated() {
        this.parityCheck();
        this.$emit('updated-team');
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        sortMembers(a, b) {
            if (b.gender > a.gender) {
                return -1;
            }

            if (b.gender < a.gender) {
                return 1;
            }

            if (a.surname < b.surname) {
                return -1;
            }

            return 0;
        },

        onChangeTab(hash) {
            this.activeTab = hash;
            this.activeAll = false;
            this.activeArchive = false;

            if (hash === 'all') this.activeAll = true;

            const options = {
                offset: -this.getIndent
            };

            VueScrollTo.scrollTo(this.$refs.anchor, 800, options);
        },

        onResize() {
            this.getIndent =
                document.querySelector('.Header').offsetHeight +
                document.querySelector('.Performance-nav').offsetHeight;

            this.parityCheck();
            this.setStickyStyles();
        },

        parityCheck() {
            if (this.$refs.actor)
                this.even = this.$refs.actor.length % 2 === 0 && !isMobile();
        },

        setStickyStyles() {
            if (isDesktop()) {
                this.$refs.nav.style.top = `${this.getIndent}px`;
                this.$refs.nav.style.height = `${
                    window.innerHeight - this.getIndent
                }px`;
            } else {
                this.$refs.nav.removeAttribute('style');
            }
        },

        openDatesPopup() {
            this.setPopupType(CONFIG_POPUPS.dates.componentName);
            this.setCustomTitle({
                titleDesktop: 'Выбрать дату спектакля или концерта',
                titleMobile: 'Выбрать дату '
            });
            this.updateData({
                sidebar: this.content,
                main: this.team
            });
            this.openPopupAction();
        },

        openPerformancePopup() {
            this.setPopupType(CONFIG_POPUPS.performance.componentName);
            this.setCustomTitle({
                titleDesktop: 'Подробнее'
            });
            this.updateData({
                sidebar: this.getContent.dedicated,
                main: this.getContent.dedicated.fullText,
                age: this.content.intro.age
            });
            this.openPopupAction();
        },

        ...mapMutations({
            setPopupType: 'popup/updateType',
            setCustomTitle: 'popup/setCustomTitle',
            updateData: 'popup/updateData'
        }),

        ...mapActions({
            openPopupAction: 'popup/open'
        })
    }
};
</script>

<style lang="scss" scoped>
@mixin text--large {
    color: $c-gray;
    font-size: scaling(12);
    line-height: $lh-150;
    font-family: $family-graphic;

    @include desktop--large {
        font-size: scaling(16);
    }

    @include desktop {
        font-size: scaling(14);
    }

    @include laptop {
        line-height: $lh-140;
    }

    @include tablet {
        line-height: $lh-130;
    }

    @include mobile {
        line-height: $lh-130;
    }
}

@mixin text--medium {
    font-size: scaling(14);
    line-height: $lh-140;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: $fw-bold;
    font-feature-settings: 'ss02' on;

    @include desktop--large {
        font-size: scaling(20);
        line-height: $lh-120;
    }

    @include desktop {
        font-size: scaling(18);
        line-height: $lh-120;
    }
}

@mixin text--small {
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

.PerformanceTeam {
    $component: &;

    background-color: $c-white;

    &-title {
        @include text--medium;

        padding: scaling(32) scaling(16) scaling(16);
        border-bottom: 1px solid $c-black;
        background-color: $c-gray-95;

        @include desktop--large {
            padding: scaling(64) scaling(32) scaling(32);
        }

        @include desktop {
            padding: scaling(48) scaling(24) scaling(24);
        }

        @include desktop--small {
            padding: scaling(40) scaling(20) scaling(20);
        }

        @include mobile {
            padding: scaling(32) scaling(32) scaling(16);
            text-align: center;
        }
    }

    &-inner {
        display: flex;
    }

    &-nav {
        position: sticky;
        align-self: flex-start;
        flex-shrink: 0;
        overflow-y: auto;
        scrollbar-width: none;

        @include desktop--large {
            width: (480 * 100% / 1440);
        }

        @include desktop {
            width: (360 * 100% / 1080);
        }

        @include desktop--small {
            width: (300 * 100% / 900);
        }

        @include laptop {
            width: (320 * 100% / 960);
        }

        @include tablet {
            display: none;
        }

        @include mobile {
            display: none;
        }

        &::-webkit-scrollbar {
            display: none;
        }

        &Item {
            border-bottom: 1px solid $c-black;
            cursor: pointer;
            transition: background-color $d-hover ease-in-out;

            @include desktop--large {
                padding: scaling(32);
            }

            @include desktop {
                padding: scaling(28) scaling(24);
            }

            @include desktop--small {
                padding: scaling(24) scaling(20);
            }

            @include laptop {
                padding: scaling(20) scaling(16);
            }

            @include hover {
                &:hover {
                    background-color: $c-gray-95;
                }
            }

            &.isActive {
                background-color: $c-red;
            }

            &Title {
                margin-bottom: scaling(4);
                font-size: scaling(36);
                line-height: $lh-130;
                font-family: $family-graphic;
                font-feature-settings: 'cpsp' on;

                @include desktop--large {
                    letter-spacing: -0.01em;
                }

                @include desktop {
                    font-size: scaling(28);
                    letter-spacing: -0.01em;
                }

                @include desktop--small {
                    font-size: scaling(24);
                }

                @include laptop {
                    font-size: scaling(20);
                }

                #{$component}-navItem.isActive & {
                    color: $c-white;
                }
            }

            &Text {
                @include text--small;

                color: $c-gray;

                #{$component}-navItem.isActive & {
                    color: rgba($c-white, 0.5);
                }
            }

            &:not(:last-child) {
                #{$component}-navItemText {
                    text-transform: capitalize;
                }
            }

            // &:not(:nth-last-child(-n + 2)) {
            //     #{$component}-navItemText {
            //         text-transform: capitalize;
            //     }
            // }
        }
    }

    &-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        border-left: 1px solid $c-black;

        @include tablet {
            border-left: none;
        }

        @include mobile {
            border-left: none;
        }

        &Inner {
            flex: 1;
            padding: scaling(40) scaling(32) 0;

            @include desktop--large {
                padding: scaling(64) scaling(32) 0;
            }

            @include desktop {
                padding: scaling(56) scaling(24) 0;
            }

            @include desktop--small {
                padding: scaling(48) scaling(20) 0;
            }

            @include mobile {
                padding: scaling(48) scaling(16) 0;
            }
        }
    }

    &-header {
        border-bottom: 1px solid rgba($c-black, 0.2);
        text-align: center;

        @include desktop--large {
            padding-bottom: scaling(60);
        }

        @include desktop {
            padding-bottom: scaling(48);
        }

        @include desktop--small {
            padding-bottom: scaling(44);
        }

        @include laptop {
            padding-bottom: scaling(36);
        }

        @include tablet {
            padding-bottom: scaling(32);
        }

        @include mobile {
            padding-bottom: scaling(40);
        }
    }

    &-date {
        margin-bottom: scaling(8);
        color: $c-red;
        font-size: scaling(44);
        line-height: $lh-110;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            margin-bottom: scaling(16);
            font-size: scaling(80);
        }

        @include desktop {
            margin-bottom: scaling(12);
            font-size: scaling(64);
        }

        @include desktop--small {
            font-size: scaling(55);
        }

        @include laptop {
            font-size: scaling(48);
        }

        @include mobile {
            letter-spacing: 0;
        }
    }

    &-day {
        @include text--small;

        text-transform: capitalize;

        &.isAll {
            text-transform: none;
        }
    }

    &-trigger {
        padding: scaling(5) scaling(12);
        border: 1px solid $c-black;
        border-radius: scaling(128);
        cursor: pointer;
        font-size: scaling(14);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-weight: $fw-bold;
        font-feature-settings: 'ss02' on;

        @include tablet {
            line-height: $lh-120;
        }

        @include mobile {
            line-height: $lh-140;
        }

        &Wrapper {
            display: none;
            justify-content: center;

            @include tablet {
                display: flex;
                margin-top: scaling(28);
            }

            @include mobile {
                display: flex;
                margin-top: scaling(24);
            }
        }
    }

    &-dedicated {
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba($c-black, 0.2);

        @include desktop--large {
            margin-top: scaling(40);
            padding: 0 scaling(128) scaling(40) scaling(65);
        }

        @include desktop {
            margin-top: scaling(32);
            padding: 0 scaling(92) scaling(32) scaling(48);
        }

        @include desktop--small {
            margin-top: scaling(28);
            padding: 0 scaling(74) scaling(28) scaling(20);
        }

        @include laptop {
            margin-top: scaling(25);
            padding: 0 scaling(64) scaling(25) scaling(80);
        }

        @include tablet {
            flex-direction: column-reverse;
            margin-top: scaling(32);
            padding-bottom: scaling(32);
        }

        @include mobile {
            flex-direction: column-reverse;
            margin-top: scaling(20);
            padding-bottom: scaling(20);
        }

        &Inner {
            @include tablet {
                margin-top: scaling(32);
                text-align: center;
            }

            @include mobile {
                margin-top: scaling(32);
                text-align: center;
            }
        }

        &Text {
            @include text--small;
        }

        &Button {
            @include text--medium;

            display: inline-flex;
            margin-top: scaling(16);
            cursor: pointer;
            color: $c-red;
            transition: color $d-hover ease-in-out;

            @include hover {
                &:hover {
                    color: $c-black;
                }
            }

            @include desktop--large {
                margin-top: scaling(44);
            }

            @include desktop {
                margin-top: scaling(36);
            }

            @include desktop--small {
                margin-top: scaling(28);
            }

            @include laptop {
                margin-top: scaling(20);
            }
        }

        &Image {
            flex-shrink: 0;
            padding: scaling(5);
            border: 1px solid $c-black;
            border-radius: 100%;
            overflow: hidden;

            @include desktop--large {
                width: scaling(160);
                height: scaling(160);
                margin-left: scaling(95);
                padding: scaling(8);
            }

            @include desktop {
                width: scaling(128);
                height: scaling(128);
                margin-left: scaling(68);
                padding: scaling(6);
            }

            @include desktop--small {
                width: scaling(112);
                height: scaling(112);
                margin-left: scaling(74);
            }

            @include laptop {
                width: scaling(96);
                height: scaling(96);
                margin-left: scaling(40);
                padding: scaling(4);
            }

            @include tablet {
                width: scaling(100);
                height: scaling(100);
            }

            @include mobile {
                width: scaling(80);
                height: scaling(80);
                padding: scaling(4);
            }

            img {
                @include m-objectFit;

                width: 100%;
                height: 100%;
                border-radius: 100%;
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
    }

    &-actors {
        display: flex;
        flex-wrap: wrap;
        margin-top: scaling(40);
        padding-bottom: scaling(40);
        border-bottom: 1px solid rgba($c-black, 0.2);

        @include desktop--large {
            margin-top: scaling(60);
            padding-bottom: scaling(60);
        }

        @include desktop {
            margin-top: scaling(48);
            padding-bottom: scaling(48);
        }

        @include mobile {
            padding-bottom: 0;
            border-bottom: none;
        }

        &Item {
            width: 50%;

            @include mobile {
                width: 100%;
            }

            &:nth-child(even) {
                padding-left: scaling(32);

                @include desktop {
                    padding-left: scaling(24);
                }

                @include desktop--small {
                    padding-left: scaling(20);
                }

                @include mobile {
                    padding-left: 0;
                }
            }

            &:nth-child(odd) {
                padding-right: scaling(32);
                border-right: 1px solid rgba($c-black, 0.2);

                @include desktop {
                    padding-right: scaling(24);
                }

                @include desktop--small {
                    padding-right: scaling(20);
                }

                @include mobile {
                    padding-right: 0;
                    border-right: none;
                }
            }

            &:first-child #{$component}-actorsItemInner {
                @include mobile {
                    padding-top: 0;
                }
            }

            &:last-child #{$component}-actorsItemInner {
                padding-bottom: 0;
                border-bottom: none;

                @include mobile {
                    padding-bottom: scaling(20);
                    border-bottom: 1px solid rgba($c-black, 0.2);
                }
            }

            #{$component}-actors.isEven & {
                &:nth-child(-n + 2) #{$component}-actorsItemInner {
                    padding-top: 0;
                }

                &:nth-last-child(2) #{$component}-actorsItemInner {
                    padding-bottom: 0;
                    border-bottom: none;
                }
            }

            &Inner {
                display: flex;
                flex-direction: column;
                align-items: center;
                border-bottom: 1px solid rgba($c-black, 0.2);

                @include desktop--large {
                    padding: scaling(36) 0;
                }

                @include desktop {
                    padding: scaling(28) 0;
                }

                @include desktop--small {
                    padding: scaling(24) 0;
                }

                @include laptop {
                    padding: scaling(32) 0;
                }

                @include tablet {
                    padding: scaling(40) 0;
                }

                @include mobile {
                    flex-direction: row;
                    padding: scaling(20) 0;
                }
            }

            &Image {
                flex-shrink: 0;
                padding: scaling(5);
                border: 1px solid $c-black;
                border-radius: 100%;
                overflow: hidden;

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

                @include tablet {
                    width: scaling(100);
                    height: scaling(100);
                }

                @include mobile {
                    width: scaling(80);
                    height: scaling(80);
                    padding: scaling(4);
                }

                img {
                    @include m-objectFit;

                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
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

            &Content {
                text-align: center;

                @include mobile {
                    margin-left: scaling(16);
                    text-align: left;
                }
            }

            &Role {
                margin-bottom: scaling(8);
                color: $c-gray;
                font-size: scaling(12);
                line-height: $lh-150;
                font-family: $family-graphic;

                @include desktop--large {
                    margin-top: scaling(36);
                    font-size: scaling(16);
                }

                @include desktop {
                    margin-top: scaling(28);
                    font-size: scaling(14);
                }

                @include desktop--small {
                    margin-top: scaling(24);
                    line-height: $lh-140;
                }

                @include laptop {
                    margin-top: scaling(20);
                    line-height: $lh-140;
                }

                @include tablet {
                    margin-top: scaling(16);
                    line-height: $lh-130;
                }

                @include mobile {
                    line-height: $lh-130;
                }
            }

            &Name {
                max-width: scaling(220);
                font-size: scaling(20);
                line-height: $lh-110;
                text-transform: uppercase;
                font-feature-settings: 'ss02' on;

                @include desktop--large {
                    font-size: scaling(32);
                }

                @include desktop {
                    font-size: scaling(24);
                }

                @include laptop {
                    line-height: $lh-120;
                    letter-spacing: 0.02em;
                }

                @include tablet {
                    line-height: $lh-120;
                    letter-spacing: 0.02em;
                }

                @include mobile {
                    max-width: scaling(120);
                    font-size: scaling(13);
                    line-height: $lh-130;
                    letter-spacing: 0.04em;
                }
            }
        }
    }

    &-participants {
        columns: 2;
        column-gap: scaling(64);
        margin-top: scaling(40);
        position: relative;

        @include desktop--large {
            margin-top: scaling(60);
        }

        @include desktop {
            column-gap: scaling(48);
            margin-top: scaling(48);
        }

        @include desktop--small {
            column-gap: scaling(40);
        }

        @include laptop {
            margin-top: scaling(45);
        }

        @include tablet {
            column-gap: scaling(126);
        }

        @include mobile {
            columns: 1;
            column-gap: 0;
        }

        &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: calc(50% - 1px);
            bottom: 0;
            width: 1px;
            background-color: rgba($c-black, 0.2);

            @include mobile {
                display: none;
            }
        }

        &Section {
            width: 100%;
            margin-bottom: scaling(24);
            break-inside: avoid;

            @include desktop--large {
                width: scaling(316);
                margin-bottom: scaling(32);
            }

            @include desktop {
                width: scaling(256);
                margin-bottom: scaling(28);
            }

            @include desktop--small {
                width: scaling(212);
            }

            @include laptop {
                width: scaling(216);
            }

            @include tablet {
                width: scaling(184);
                margin-bottom: scaling(20);
            }

            @include mobile {
                &:last-child {
                    margin-bottom: 0;
                }
            }

            &.isSplit {
                padding-bottom: scaling(48);
                border-bottom: 1px solid rgba($c-black, 0.2);

                @include desktop--large {
                    padding-bottom: scaling(64);
                }

                @include desktop {
                    padding-bottom: scaling(56);
                }

                @include laptop {
                    padding-bottom: scaling(44);
                }

                @include tablet {
                    padding-bottom: scaling(40);
                }
            }

            &Title {
                margin-bottom: scaling(28);
                font-size: scaling(12);
                line-height: $lh-160;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                text-align: center;
                font-weight: $fw-medium;
                font-family: $family-graphic;

                @include desktop--large {
                    margin-bottom: scaling(32);
                    font-size: scaling(14);
                }

                @include desktop--small {
                    margin-bottom: scaling(24);
                }

                @include laptop {
                    margin-bottom: scaling(20);
                }

                @include mobile {
                    margin-bottom: scaling(24);
                }
            }

            &Position {
                @include text--large;

                display: block;
                margin-bottom: scaling(8);

                @include desktop--large {
                    margin-bottom: scaling(16);
                }

                @include desktop {
                    margin-bottom: scaling(12);
                }

                @include mobile {
                    margin-left: scaling(56);
                }

                &.isGroupPosition {
                    &:not(:first-child) {
                        margin-top: scaling(28);

                        @include desktop--large {
                            margin-top: scaling(32);
                        }

                        @include desktop--small {
                            margin-top: scaling(24);
                        }

                        @include laptop {
                            margin-top: scaling(20);
                        }

                        @include mobile {
                            margin-top: scaling(24);
                        }
                    }
                }
            }

            &Group {
                @include text--large;

                display: block;
                margin-bottom: scaling(8);

                @include desktop--large {
                    margin-bottom: scaling(16);
                }

                @include desktop {
                    margin-bottom: scaling(12);
                }

                @include mobile {
                    margin-left: scaling(56);
                }

                &.isGroupPosition {
                    &:not(:first-child) {
                        margin-top: scaling(15);

                        @include desktop--large {
                            margin-top: scaling(20);
                        }
                    }
                }
            }
        }

        &Item {
            display: flex;
            align-items: center;
            position: relative;

            &:not(:first-of-type) {
                margin-top: scaling(12);

                @include desktop--large {
                    margin-top: scaling(20);
                }

                @include desktop {
                    margin-top: scaling(16);
                }

                @include laptop {
                    margin-top: scaling(17);
                }
            }

            &.samePosition {
                margin-top: scaling(8);

                @include desktop--large {
                    margin-top: scaling(12);
                }

                @include mobile {
                    margin-top: scaling(4);
                }
            }

            @include hover {
                &.isLink:hover {
                    #{$component}-participantsItemName {
                        color: $c-red;
                    }
                }
            }

            &Image {
                flex-shrink: 0;
                width: scaling(36);
                height: scaling(36);
                border-radius: 100%;
                overflow: hidden;

                @include desktop--large {
                    width: scaling(44);
                    height: scaling(44);
                }

                @include desktop--small {
                    width: scaling(32);
                    height: scaling(32);
                }

                @include laptop {
                    width: scaling(28);
                    height: scaling(28);
                }

                @include tablet {
                    width: scaling(28);
                    height: scaling(28);
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                &Stub {
                    width: 100%;
                    height: 100%;

                    svg {
                        width: 100%;
                        height: 100%;
                        stroke: $c-black;

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

            &Inner {
                margin-left: scaling(20);

                @include desktop--large {
                    margin-left: scaling(24);
                }

                @include desktop--small {
                    margin-left: scaling(16);
                }

                @include laptop {
                    margin-left: scaling(12);
                }

                @include tablet {
                    margin-left: scaling(12);
                }
            }

            &Position {
                @include text--large;

                margin-bottom: scaling(4);

                @include desktop--large {
                    margin-bottom: scaling(8);
                }

                @include mobile {
                    margin-bottom: scaling(8);
                }
            }

            &Name {
                @include text--small;

                transition: color $d-hover ease-in-out;
            }
        }
    }

    &-hint {
        @include text--small;

        margin: scaling(45) 0 scaling(80);
        text-align: center;

        @include desktop--large {
            margin: scaling(112) 0 scaling(88);
        }

        @include desktop {
            margin: scaling(56) 0 scaling(100);
        }

        @include desktop--small {
            margin: scaling(56) 0 scaling(80);
        }

        @include mobile {
            margin: scaling(48) 0 scaling(64);
            color: $c-gray;
            font-size: scaling(12);
        }
    }

    &-footer {
        position: sticky;
        bottom: 0;
        display: flex;
        flex-wrap: wrap;

        @include mobile {
            position: static;
        }
    }

    &-button {
        @include text--medium;

        width: 100%;
        padding: scaling(21);
        border: none;
        border-top: 1px solid $c-black;
        outline: none;
        cursor: pointer;
        font-family: $family-apoc;
        transition: background-color $d-hover ease-in-out,
            color $d-hover ease-in-out;
        text-align: center;

        @include desktop--large {
            padding: scaling(36);
        }

        @include desktop {
            padding: scaling(25);
        }

        @include laptop {
            padding: scaling(23);
        }

        @include tablet {
            padding: scaling(23);
        }

        // @include mobile {
        //     width: 100%;
        // }

        // &:first-child {
        //     background-color: $c-white;
        // }

        &:first-child {
            // border-left: 1px solid $c-black;
            background-color: $c-red;
            color: $c-white;

            @include mobile {
                // border-left: none;
                background-color: $c-white;
                color: $c-red;
            }
        }

        @include hover {
            &:hover {
                background-color: $c-black;
                color: $c-white;
            }
        }
    }

    &-alert {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 scaling(65);
        background-color: $c-gray-95;

        @include desktop--large {
            padding: 0 scaling(96);
        }

        @include tablet {
            height: scaling(300);
        }

        @include mobile {
            height: scaling(200);
            padding: 0 scaling(20);
        }

        &Title {
            width: 100%;
            padding: scaling(15) 0;
            border-top: 1px solid rgba($c-black, 0.2);
            border-bottom: 1px solid rgba($c-black, 0.2);
            font-size: scaling(20);
            line-height: $lh-110;
            text-transform: uppercase;
            text-align: center;
            font-feature-settings: 'ss02' on;

            @include desktop--large {
                padding: scaling(32) 0;
                font-size: scaling(36);
            }

            @include desktop {
                padding: scaling(25) 0;
                font-size: scaling(30);
            }

            @include desktop--small {
                padding: scaling(20) 0;
                font-size: scaling(25);
            }
        }
    }
}
</style>
