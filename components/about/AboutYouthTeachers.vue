<template>
    <div class="AboutYouthTeachers" :class="{ noTeachers: !teachers.list }">
        <div class="AboutYouthTeachers-leader">
            <AboutYouthMember :member="teachers.leader" :leader="true" />
        </div>
        <div v-if="teachers.list" class="AboutYouthTeachers-inner">
            <div
                v-for="(section, sectionIndex) in teachers.list"
                :key="sectionIndex"
                class="AboutYouthTeachers-section"
            >
                <div
                    class="AboutYouthTeachers-sectionTitle"
                    v-text="section.title"
                ></div>
                <div
                    v-for="(member, memberIndex) in section.members"
                    :key="memberIndex"
                    class="AboutYouthTeachers-sectionMember"
                >
                    <AboutYouthMember :member="member" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AboutYouthMember from '~/components/about/AboutYouthMember';

export default {
    name: 'AboutYouthTeachers',

    components: {
        AboutYouthMember
    },

    props: {
        teachers: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutYouthTeachers {
    $component: &;

    @include desktop--large {
        margin: scaling(100) 0 scaling(120);
    }

    @include desktop {
        margin: scaling(80) 0 scaling(100);
    }

    @include desktop--small {
        margin: scaling(72) 0 scaling(80);
    }

    @include laptop {
        margin: scaling(64) 0 scaling(80);
    }

    @include tablet {
        margin: scaling(64) 0 scaling(72);
    }

    @include mobile {
        margin: scaling(64) 0;
    }

    &.noTeachers {
        margin: scaling(52) 0;

        @include desktop--large {
            margin: scaling(80) 0;
        }

        @include desktop {
            margin: scaling(72) 0;
        }

        @include desktop--small {
            margin: scaling(64) 0;
        }

        @include mobile {
            margin: scaling(40) 0;
        }
    }

    &-leader {
        margin-bottom: scaling(40);

        @include desktop--large {
            margin-bottom: scaling(64);
        }

        @include desktop {
            margin-bottom: scaling(48);
        }

        #{$component}.noTeachers & {
            margin-bottom: 0;
        }
    }

    &-inner {
        columns: 2;
        column-gap: scaling(64);

        @include desktop--large {
            columns: 3;
        }

        @include desktop {
            columns: 3;
            column-gap: scaling(54);
        }

        @include desktop--small {
            column-gap: scaling(40);
        }

        @include tablet {
            column-gap: scaling(32);
        }

        @include mobile {
            columns: 1;
            column-gap: 0;
        }
    }

    &-section {
        break-inside: avoid;

        @include mobile {
            &:last-child #{$component}-sectionMember {
                margin-bottom: 0;
            }
        }

        &Title {
            margin-bottom: scaling(16);
            padding-top: scaling(12);
            border-top: 1px solid #e6e6e6;
            color: $c-gold;
            font-size: scaling(12);
            line-height: $lh-160;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: $fw-medium;
            font-family: $family-graphic;

            @include desktop--large {
                margin-bottom: scaling(24);
                font-size: scaling(14);
            }

            @include desktop {
                margin-bottom: scaling(24);
            }

            @include desktop--small {
                margin-bottom: scaling(20);
            }
        }

        &Member {
            margin-bottom: scaling(12);

            @include desktop--large {
                margin-bottom: scaling(20);
            }

            @include desktop {
                margin-bottom: scaling(19);
            }

            &:last-child {
                margin-bottom: scaling(32);

                @include desktop--large {
                    margin-bottom: scaling(40);
                }

                @include desktop--small {
                    margin-bottom: scaling(28);
                }

                @include laptop {
                    margin-bottom: scaling(24);
                }

                @include tablet {
                    margin-bottom: scaling(24);
                }
            }
        }
    }
}
</style>
