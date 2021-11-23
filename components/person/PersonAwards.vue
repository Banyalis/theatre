<template>
    <div class="PersonAwards">
        <CommonTitle title="Награды" theme="isGray" />
        <div
            v-for="(award, awardIndex) in awards"
            :key="awardIndex"
            class="PersonAwards-section"
            :class="{ isOrdinary: award.list.length !== 1 }"
        >
            <div
                v-for="(item, index) in award.list"
                :key="index"
                ref="award"
                class="PersonAwards-item"
                :class="{ isImportant: award.list.length === 1 }"
            >
                <div class="PersonAwards-itemTitle" v-text="item.title"></div>
                <div class="PersonAwards-itemDate" v-text="item.date"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { isMobile } from '@/utils/utils';
import CommonTitle from '~/components/common/CommonTitle';

export default {
    name: 'PersonAwards',

    components: {
        CommonTitle
    },

    props: {
        awards: {
            type: Array,
            required: true
        }
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.$nextTick(this.onResize);
    },

    methods: {
        onResize() {
            const awardLength =
                this.$refs.award.filter((item) =>
                    item.parentNode.classList.contains('isOrdinary')
                ).length % 2;
            const numberDisabled = awardLength === 0 ? 2 : awardLength;

            this.$refs.award.slice(-numberDisabled).forEach((item) => {
                if (
                    !isMobile() &&
                    item.parentNode.classList.contains('isOrdinary')
                ) {
                    item.style.marginBottom = 0;
                    item.style.paddingBottom = 0;
                    item.style.borderBottom = 'none';
                } else {
                    item.removeAttribute('style');
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.PersonAwards {
    $component: &;

    &-section {
        &.isOrdinary {
            display: flex;
            flex-wrap: wrap;

            @include desktop--large {
                padding: scaling(80) scaling(128);
            }

            @include desktop {
                padding: scaling(68) scaling(96);
            }

            @include desktop--small {
                padding: scaling(50) scaling(60);
            }

            @include laptop {
                padding: scaling(50) scaling(112);
            }

            @include tablet {
                padding: scaling(50) scaling(72);
            }

            @include mobile {
                padding: scaling(32) scaling(16);
            }
        }
    }

    &-item {
        #{$component}-section.isOrdinary & {
            width: 50%;
            margin-bottom: scaling(28);
            padding-bottom: scaling(28);
            border-bottom: 1px solid rgba(#272727, 0.1);

            @include desktop--large {
                margin-bottom: scaling(36);
                padding-bottom: scaling(36);
            }

            @include desktop {
                margin-bottom: scaling(32);
                padding-bottom: scaling(32);
            }

            @include tablet {
                margin-bottom: scaling(24);
                padding-bottom: scaling(24);
            }

            @include mobile {
                width: 100%;
                margin-bottom: scaling(20);
                padding-bottom: scaling(20);
            }

            &:nth-child(odd) {
                @include desktop--large {
                    padding-right: scaling(32);
                }

                @include desktop {
                    padding-right: scaling(24);
                }

                @include desktop--small {
                    padding-right: scaling(20);
                }

                @include laptop {
                    padding-right: scaling(32);
                }

                @include tablet {
                    padding-right: scaling(24);
                }
            }

            &:nth-child(even) {
                @include desktop--large {
                    padding-left: scaling(32);
                }

                @include desktop {
                    padding-left: scaling(24);
                }

                @include desktop--small {
                    padding-left: scaling(20);
                }

                @include laptop {
                    padding-left: scaling(32);
                }

                @include tablet {
                    padding-left: scaling(24);
                }
            }

            &:last-child {
                @include mobile {
                    margin-bottom: 0;
                    padding-bottom: 0;
                    border-bottom: none;
                }
            }
        }

        &.isImportant {
            border-bottom: 1px solid $c-black;
            text-align: center;

            @include desktop--large {
                padding: scaling(80) scaling(160) scaling(84);
            }

            @include desktop {
                padding: scaling(60) scaling(96) scaling(64);
            }

            @include desktop--small {
                padding: scaling(50) scaling(60) scaling(54);
            }

            @include laptop {
                padding: scaling(50) scaling(112) scaling(54);
            }

            @include tablet {
                padding: scaling(41) scaling(72) scaling(44);
            }

            @include mobile {
                padding: scaling(32) scaling(32) scaling(36);
            }
        }

        &Title {
            margin-bottom: scaling(12);
            color: $c-black--header;
            font-size: scaling(14);
            line-height: $lh-150;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(20);
            }

            @include desktop {
                font-size: scaling(18);
            }

            @include mobile {
                margin-bottom: scaling(8);
                line-height: $lh-160;
            }

            #{$component}-item.isImportant & {
                margin-bottom: scaling(16);
                color: $c-black;
                font-size: scaling(24);
                letter-spacing: 0.02em;
                font-family: $family-apoc;
                font-feature-settings: 'cpsp' on;

                @include desktop--large {
                    margin-bottom: scaling(24);
                    font-size: scaling(40);
                }

                @include desktop {
                    margin-bottom: scaling(20);
                    font-size: scaling(32);
                }

                @include desktop--small {
                    font-size: scaling(28);
                }

                @include mobile {
                    margin-bottom: scaling(12);
                    font-size: scaling(20);
                    letter-spacing: 0;
                    line-height: $lh-150;
                }
            }
        }

        &Date {
            color: $c-gray;
            font-size: scaling(12);
            line-height: $lh-160;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(14);
            }

            @include desktop {
                line-height: $lh-140;
            }

            #{$component}-item.isImportant & {
                font-weight: $fw-medium;
            }
        }
    }
}
</style>
