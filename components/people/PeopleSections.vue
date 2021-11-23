<template>
    <div class="PeopleSections">
        <div
            v-for="(section, sectionIndex) in content.sections"
            :key="sectionIndex"
            class="PeopleSections-item"
        >
            <div
                v-if="section.title"
                ref="title"
                class="PeopleSections-itemTitle"
                v-text="section.title"
            ></div>
            <div
                v-for="(group, groupIndex) in section.groups"
                :key="groupIndex"
                class="PeopleSections-itemGroup"
                :class="{
                    isLarge:
                        (section.groups.length >= 1 && group.position) ||
                        content.sidebar,
                    isImportantPeople: section.important
                }"
            >
                <div
                    v-if="group.position"
                    class="PeopleSections-itemGroupPosition"
                    :class="{ isSmall: group.small }"
                >
                    <div
                        ref="groupTitle"
                        class="PeopleSections-itemGroupTitle"
                        v-text="group.position"
                    ></div>
                </div>
                <div
                    v-if="group.people.length"
                    class="PeopleSections-itemGroupPeople"
                >
                    <div
                        v-for="(people, peopleIndex) in group.people"
                        :key="peopleIndex"
                        class="PeopleSections-itemGroupPeopleItem"
                        :class="{
                            isImportant: people.important,
                            isOne: people.name === 'Владимир Урин',
                            isTwo: people.name === 'Туган Сохиев',
                            isThree: people.name === 'Махар Вазиев',
                            isFour: people.name === 'Маквала Касрашвили',
                            isFive: people.name === 'Валерий Борисов',
                            isSixth: people.name === 'Дмитрий Вдовин',
                            isSeventh: people.name === 'Александр Шанин',
                            isEighth: people.name === 'Людмила Таликова',
                            isNine: people.name === 'Анна Леонова',
                            isTen: people.name === 'Ирина Черномурова',
                            isEleven: people.name === 'Елена Узкая',
                            isTwelve: people.name === 'Екатерина Миронова'
                        }"
                    >
                        <CommonPeopleCard
                            :item="people"
                            :section-important="section.important"
                            :people-list="true"
                        />
                    </div>
                </div>
                <PeopleList v-else-if="group.list.length" :list="group.list" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import PeopleList from '~/components/people/PeopleList';
import CommonPeopleCard from '~/components/common/CommonPeopleCard';

export default {
    name: 'PeopleSections',

    components: {
        PeopleList,
        CommonPeopleCard
    },

    props: {
        content: {
            type: Object,
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
            const getTitleIndent = this.$refs.title
                ? this.$refs.title[0].offsetHeight
                : 0;

            if (this.$refs.title) {
                this.$refs.title.forEach((element) => {
                    element.style.top = `${
                        this.headerHeight +
                        document.querySelector('.CommonHero-tabsOutter')
                            .offsetHeight -
                        2
                    }px`;
                });
            }

            if (this.$refs.groupTitle) {
                this.$refs.groupTitle.forEach((element) => {
                    element.style.top = `${
                        this.headerHeight +
                        document.querySelector('.CommonHero-tabsOutter')
                            .offsetHeight +
                        getTitleIndent
                    }px`;
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.PeopleSections {
    $component: &;

    &-item {
        &Title {
            width: 100%;
            padding: scaling(32) scaling(16) scaling(16);
            border-top: 1px solid $c-black;
            border-bottom: 1px solid $c-black;
            background-color: $c-gray-95;
            font-size: scaling(14);
            line-height: $lh-140;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            text-align: center;
            font-weight: $fw-bold;
            font-feature-settings: 'ss02' on;
            position: sticky;
            z-index: $z-one;

            @include desktop--large {
                padding: scaling(64) scaling(32) scaling(32);
                font-size: scaling(20);
                line-height: $lh-120;
            }

            @include desktop {
                padding: scaling(48) scaling(24) scaling(24);
                font-size: scaling(18);
                line-height: $lh-120;
            }

            @include desktop--small {
                padding: scaling(40) scaling(20) scaling(20);
            }
        }

        &Group {
            width: 100%;

            &.isLarge {
                display: flex;
                margin-bottom: -1px;
                border-bottom: 1px solid $c-black;

                @include tablet {
                    flex-direction: column;
                }

                @include mobile {
                    flex-direction: column;
                }

                #{$component}-itemGroupPeople {
                    flex: 1;
                }
            }

            &Position {
                flex-shrink: 0;
                width: 100%;
                border-right: 1px solid $c-black;

                @include desktop--large {
                    width: (640 * 100% / 1920);

                    &.isSmall {
                        width: (480 * 100% / 1920);
                    }
                }

                @include desktop {
                    width: (480 * 100% / 1440);

                    &.isSmall {
                        width: (360 * 100% / 1440);
                    }
                }

                @include desktop--small {
                    width: (480 * 100% / 1200);

                    &.isSmall {
                        width: (300 * 100% / 1920);
                    }
                }

                @include laptop {
                    width: (240 * 100% / 960);

                    &.isSmall {
                        width: (320 * 100% / 1920);
                    }
                }

                @include tablet {
                    border-right: none;
                    border-bottom: 1px solid $c-black;
                }

                @include mobile {
                    border-right: none;
                    border-bottom: 1px solid $c-black;
                }
            }

            &Title {
                font-size: scaling(14);
                line-height: $lh-140;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                font-weight: $fw-bold;
                font-feature-settings: 'ss02' on;
                position: sticky;
                padding: scaling(32) scaling(16);

                @include desktop--large {
                    font-size: scaling(20);
                    line-height: $lh-120;
                    padding: scaling(32);
                }

                @include desktop {
                    font-size: scaling(18);
                    line-height: $lh-120;
                    padding: scaling(24);
                }

                @include desktop--small {
                    padding: scaling(20);
                }

                @include laptop {
                    letter-spacing: 0;
                    text-transform: capitalize;
                    font-weight: $fw-normal;
                    font-family: $family-graphic;
                    padding: scaling(16);
                }

                @include tablet {
                    letter-spacing: 0;
                    text-transform: capitalize;
                    text-align: center;
                    font-weight: $fw-normal;
                    font-family: $family-graphic;
                }

                @include mobile {
                    letter-spacing: 0;
                    text-transform: capitalize;
                    text-align: center;
                    font-weight: $fw-normal;
                    font-family: $family-graphic;
                }
            }

            &People {
                display: flex;
                flex-wrap: wrap;
                margin: 0 -1px -1px 0;

                &Item {
                    width: calc(100% / 6);
                    border-right: 1px solid $c-black;
                    border-bottom: 1px solid $c-black;

                    @include desktop--small {
                        width: calc(100% / 5);
                    }

                    @include laptop {
                        width: calc(100% / 4);
                    }

                    @include tablet {
                        width: calc(100% / 3);
                    }

                    @include mobile {
                        width: calc(100% / 2);
                    }

                    #{$component}-itemGroup.isLarge & {
                        width: calc(100% / 3);

                        @include desktop--large {
                            width: calc(100% / 4);
                        }

                        @include desktop {
                            width: calc(100% / 4);
                        }

                        @include mobile {
                            width: calc(100% / 2);
                        }
                    }

                    #{$component}-itemGroup.isImportantPeople & {
                        width: calc(100% / 4);

                        @include laptop {
                            width: calc(100% / 3);
                        }

                        @include tablet {
                            width: calc(100% / 3);
                        }

                        @include mobile {
                            width: 100%;
                        }
                    }

                    &.isImportant {
                        @include mobile {
                            margin: 0 scaling(16);
                            border-right: none;
                            border-bottom-color: $c-gray-80;

                            &:first-child {
                                padding-top: scaling(8);
                            }

                            &:last-child {
                                padding-bottom: scaling(8);
                            }
                        }
                    }

                    &.isOne {
                        order: 1;
                    }

                    &.isTwo {
                        order: 2;
                    }

                    &.isThree {
                        order: 3;
                    }

                    &.isFour {
                        order: 4;
                    }

                    &.isFive {
                        order: 5;
                    }

                    &.isSixth {
                        order: 6;
                    }

                    &.isSeventh {
                        order: 7;
                    }

                    &.isEighth {
                        order: 8;
                    }

                    &.isNine {
                        order: 9;
                    }

                    &.isTen {
                        order: 10;
                    }

                    &.isEleven {
                        order: 11;
                    }

                    &.isTwelve {
                        order: 12;
                    }
                }
            }
        }
    }
}
</style>
