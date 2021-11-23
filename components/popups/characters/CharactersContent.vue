<template>
    <div class="CharactersContent">
        <CommonPopupHead
            title="Действующие лица и исполнители"
            :theme="'white'"
        />
        <div class="CharactersContent-inner">
            <div class="CharactersContent-name">{{ name }}</div>
            <div class="CharactersContent-date">{{ date }}</div>
            <div class="CharactersContent-time">{{ time }}</div>
            <div class="CharactersContent-characters">
                <div
                    v-for="(section, index) in characters"
                    :key="index"
                    class="CharactersContent-section"
                >
                    <div
                        v-if="section.title"
                        class="CharactersContent-sectionTitle"
                        v-text="section.title"
                    />
                    <!-- Show role title if members doesn't have special position -->
                    <div
                        v-for="(role, roleIndex) in section.roles"
                        :key="roleIndex"
                        class="CharactersContent-role"
                        :class="[
                            {
                                'CharactersContent-role--samePositions':
                                    isRoleMembersHaveSamePositions[index][
                                        roleIndex
                                    ]
                            },
                            {
                                'CharactersContent-role--multipleMembers':
                                    role.members.length > 1
                            },
                            {
                                'CharactersContent-role--hasDivider':
                                    role.hasDivider
                            }
                        ]"
                    >
                        <div
                            v-if="role.title && role.members.length > 1"
                            class="CharactersContent-roleTitle"
                        >
                            {{ role.title + ':' }}
                        </div>
                        <div
                            v-for="(member, memberIndex) in role.members"
                            :key="`${index}_${roleIndex}_${memberIndex}`"
                            class="CharactersContent-character"
                        >
                            <!-- If all members have same position, show it only for first member -->
                            <div
                                v-if="
                                    isRoleMembersHaveSamePositions[index][
                                        roleIndex
                                    ] && memberIndex === 0
                                "
                                class="
                                    CharactersContent-characterPosition
                                    CharactersContent-characterPosition--role
                                "
                            >
                                {{
                                    role.title +
                                    (role.members.length > 1 ? ':' : '')
                                }}
                            </div>
                            <div
                                v-else-if="member.position"
                                class="CharactersContent-characterPosition"
                                v-text="member.position"
                            ></div>
                            <div
                                class="CharactersContent-characterImage"
                                :class="{
                                    'CharactersContent-characterImage--empty':
                                        !member.image
                                }"
                            >
                                <picture v-if="member.image">
                                    <source
                                        :srcset="
                                            member.image +
                                            ' 1x, ' +
                                            member.image2x +
                                            ' 2x'
                                        "
                                    />
                                    <img :src="member.image" alt="" />
                                </picture>
                            </div>
                            <div class="CharactersContent-characterInfo">
                                <div class="CharactersContent-characterName">
                                    {{ member.name }}
                                </div>
                                <div
                                    v-if="member.additional"
                                    class="
                                        CharactersContent-characterAdditional
                                    "
                                >
                                    {{ member.additional }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="CharactersContent-disclaimer">
                Театр оставляет за собой право заменять исполнителей.
            </div>
        </div>
        <div class="CharactersContent-buttons">
            <button class="CharactersContent-print">Распечатать список</button>
            <button class="CharactersContent-buy">Купить билет</button>
        </div>
    </div>
</template>

<script>
import { DATE_TIME_FORMATS } from '@/utils/constants';
import CommonPopupHead from '@/components/common/CommonPopupHead';

export default {
    name: 'CharactersContent',

    components: {
        CommonPopupHead
    },

    props: {
        // Performance DateTime in ISO-format
        performanceDateTime: {
            type: String,
            required: true
        },
        /* Array of characters, structure is:
            // List of Sections
            [
                {
                    name: String,
                    groups: [
                        {
                            name: String,
                            characters: [
                                {
                                    description: String,
                                    actor: String
                                }
                            ]
                        }
                    ]
                }
            ]
         */

        characters: {
            type: Array,
            required: true
        },

        name: {
            type: String,
            required: true
        }
    },

    computed: {
        date() {
            return this.formatDate(
                this.performanceDateTime,
                DATE_TIME_FORMATS.dayMonthString
            );
        },

        time() {
            return this.formatDate(
                this.performanceDateTime,
                DATE_TIME_FORMATS.time
            );
        },

        // Property return an array[sectionInd][roleInd] === true if role members have same positions, else false
        isRoleMembersHaveSamePositions() {
            return this.characters.map((section) => {
                return section.roles.map((role) =>
                    this.isMembersHaveSamePositions(role)
                );
            });
        }
    },

    methods: {
        isMembersHaveSamePositions(role) {
            return (
                role.title &&
                // Check if all members doesn't have positions
                role.members.reduce(
                    (result, member) => result && !member.position,
                    true
                )
            );
        }
    }
};
</script>

<style scoped lang="scss">
.CharactersContent {
    $component: &;

    &-inner {
        text-align: center;
        padding: scaling(96) scaling(96) scaling(80);

        @include desktop {
            padding: scaling(72) scaling(48);
        }

        @include desktop--small {
            padding: scaling(60) scaling(40) scaling(64);
        }

        @include laptop {
            padding: scaling(60) scaling(32) scaling(56);
        }

        @include tablet {
            padding: scaling(40) scaling(48) scaling(56);
        }

        @include mobile {
            padding: scaling(40) scaling(16) scaling(48);
        }
    }

    &-name {
        display: none;
        font-family: $family-apoc;
        text-transform: uppercase;
        letter-spacing: 0.02em;

        @include tablet {
            display: block;
            font-size: scaling(20);
            line-height: $lh-120;
            margin-bottom: scaling(40);
        }

        @include mobile {
            display: block;
            font-size: scaling(13);
            line-height: $lh-110;
            margin-bottom: scaling(32);
        }
    }

    &-date {
        @include title--block;

        color: $c-red--light;

        @include mobile {
            font-size: scaling(44);
            line-height: $lh-140;
            letter-spacing: normal;
        }
    }

    &-time {
        @include body-1;

        color: $c-black;
        margin: scaling(12) 0 scaling(80);

        @include desktop {
            margin: scaling(64);
        }

        @include desktop--small {
            margin: scaling(8) 0 scaling(52);
        }

        @include laptop {
            font-size: scaling(14);
            line-height: $lh-130;
            margin-bottom: scaling(52);
        }

        @include tablet {
            font-size: scaling(14);
            line-height: $lh-130;
            margin-bottom: scaling(60);
        }

        @include mobile {
            line-height: $lh-110;
            margin-bottom: scaling(32);
        }
    }

    &-characters {
        border-top: 1px solid $c-gray-80;
    }

    &-section {
        margin-top: scaling(40);

        @include desktop--large {
            margin-top: scaling(64);
        }

        @include desktop {
            margin-top: scaling(56);
        }

        @include desktop--small {
            margin-top: scaling(48);
        }

        @include mobile {
            margin-top: scaling(32);
        }

        &Title {
            @include heading-3;

            margin-bottom: scaling(28);

            @include desktop--large {
                margin-bottom: scaling(48);
            }

            @include desktop {
                margin-bottom: scaling(40);
            }

            @include desktop--small {
                margin-bottom: scaling(32);
            }
        }
    }

    &-role {
        margin-top: scaling(16);

        @include desktop--large {
            margin-top: scaling(32);
        }

        @include desktop {
            margin-top: scaling(24);
        }

        @include desktop--small {
            margin-top: scaling(20);
        }

        @include mobile {
            text-align: left;
            margin-top: scaling(26);
        }

        &--samePositions {
            #{$component}-roleTitle {
                display: none;

                @include mobile {
                    display: block;
                }
            }
        }

        &--multipleMembers,
        &--multipleMembers + & {
            margin-top: scaling(28);

            @include desktop--large {
                margin-top: scaling(48);
            }

            @include desktop {
                margin-top: scaling(40);
            }

            @include desktop--small {
                margin-top: scaling(32);
            }

            @include mobile {
                margin-top: scaling(38);
            }
        }

        &--multipleMembers #{$component}-characterPosition--role {
            display: none;
        }

        &--hasDivider {
            padding-bottom: scaling(40);
            margin-bottom: scaling(40);
            border-bottom: 1px solid $c-gray-80;

            @include desktop--large {
                padding-bottom: scaling(64);
                margin-bottom: scaling(64);
            }

            @include desktop {
                padding-bottom: scaling(56);
                margin-bottom: scaling(56);
            }

            @include desktop--small {
                padding-bottom: scaling(48);
                margin-bottom: scaling(48);
            }

            @include mobile {
                padding-bottom: scaling(28);
                margin-bottom: scaling(32);
            }
        }

        &Title {
            @include body-1;

            color: $c-gray;
            margin-bottom: scaling(16);

            @include desktop--large {
                margin-bottom: scaling(32);
            }

            @include desktop {
                margin-bottom: scaling(24);
            }

            @include desktop--small {
                margin-bottom: scaling(20);
            }

            @include mobile {
                font-size: scaling(12);
                line-height: $lh-130;
                margin: 0 0 scaling(12) scaling(56);
            }
        }
    }

    &-character {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text-align: left;
        color: $c-black;

        &:not(:first-child) {
            margin-top: scaling(8);

            @include desktop--large {
                margin-top: scaling(16);
            }

            @include desktop {
                margin-top: scaling(12);
            }
        }

        @include mobile {
            position: relative;
            flex-flow: column;
            justify-content: center;
            align-items: normal;
            min-height: scaling(32);
            padding-left: scaling(42);
        }

        &Position,
        &Info {
            @include body-1;

            width: 476 / 1088 * 100%;

            @include mobile {
                width: auto;
                line-height: $lh-130;
            }
        }

        &Position {
            text-align: right;
            color: $c-gray;

            @include mobile {
                text-align: left;
                font-size: scaling(12);
            }
        }

        &Image {
            width: scaling(44);
            height: scaling(44);
            margin: 0 scaling(16);
            border-radius: 50%;
            overflow: hidden;

            @include desktop--large {
                width: scaling(72);
                height: scaling(72);
                margin: 0 scaling(32);
            }

            @include desktop {
                width: scaling(64);
                height: scaling(64);
                margin: 0 scaling(24);
            }

            @include desktop--small {
                width: scaling(52);
                height: scaling(52);
                margin: 0 scaling(20);
            }

            @include mobile {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: scaling(32);
                height: scaling(32);
                margin: 0;
            }

            &--empty {
                border: 1px solid $c-black;
            }

            img {
                @include m-objectFit();

                width: 100%;
                height: 100%;
            }
        }

        &Additional {
            @include caption-1;

            color: $c-gray;

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
    }

    &-disclaimer {
        @include caption-2;

        color: $c-gray;
        margin-top: scaling(40);

        @include desktop--large {
            margin-top: scaling(64);
        }

        @include desktop {
            margin-top: scaling(56);
        }

        @include desktop--small {
            margin-top: scaling(48);
        }

        @include mobile {
            margin-top: scaling(46);
        }
    }

    &-buttons {
        display: flex;
        border-top: 1px solid $c-black;

        @include mobile {
            display: block;
        }

        button {
            @include button-text;

            flex: 1;
            height: scaling(60);
            line-height: $lh-120;
            font-weight: $fw-normal;
            cursor: pointer;

            @include desktop--large {
                height: scaling(98);
            }

            @include desktop {
                height: scaling(72);
            }

            @include laptop {
                height: scaling(64);
            }

            @include mobile {
                display: block;
                width: 100%;
            }

            @include hover {
                &:hover {
                    color: $c-white;
                }
            }
        }
    }

    &-print {
        @include hover {
            &:hover {
                background-color: $c-red;
            }
        }
    }

    &-buy {
        border-left: 1px solid $c-black;
        color: $c-red;
        transition: background-color, color;
        transition-duration: $d-hover;

        @include mobile {
            border-left: none;
            border-top: 1px solid $c-black;
        }

        @include hover {
            &:hover {
                background-color: $c-black;
            }
        }
    }
}
</style>
