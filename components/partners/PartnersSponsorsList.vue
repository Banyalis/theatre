<template>
    <div class="PartnersSponsorsList">
        <div
            v-for="(section, sectionIndex) in sponsors"
            :key="sectionIndex"
            class="PartnersSponsorsList-section"
            :class="[
                section.large ? 'isLarge' : '',
                section.medium ? 'isMedium' : '',
                section.small ? 'isSmall' : ''
            ]"
        >
            <CommonTitle ref="title" :title="section.title" theme="isWhite" />
            <div class="PartnersSponsorsList-sectionInner">
                <a
                    v-for="(item, index) in section.company"
                    :key="index"
                    :href="item.url"
                    target="_blank"
                    class="PartnersSponsorsList-sectionCompany"
                    :class="[
                        item.large ? 'isLarge' : '',
                        item.medium ? 'isMedium' : '',
                        item.small ? 'isSmall' : ''
                    ]"
                >
                    <div class="PartnersSponsorsList-sectionCompanyLogo">
                        <picture>
                            <source
                                :srcset="
                                    item.image + ' 1x, ' + item.image2x + ' 2x'
                                "
                            />
                            <img :src="item.image" alt="" />
                        </picture>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { isMobile } from '@/utils/utils';
import CommonTitle from '~/components/common/CommonTitle';

export default {
    name: 'PartnersSponsorsList',

    components: {
        CommonTitle
    },

    props: {
        sponsors: {
            type: Array,
            required: true
        }
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
            let maxHeight = 0;

            for (const item of this.$refs.title) {
                const height =
                    item.$el.querySelector('.CommonTitle-text').offsetHeight;

                maxHeight = Math.max(height, maxHeight);
            }

            for (const item of this.$refs.title) {
                const getPaddingTop = parseInt(
                    window
                        .getComputedStyle(item.$el, null)
                        .getPropertyValue('padding-top'),
                    10
                );
                const getPaddingBottom = parseInt(
                    window
                        .getComputedStyle(item.$el, null)
                        .getPropertyValue('padding-bottom'),
                    10
                );

                if (!isMobile()) {
                    item.$el.style.height = `${
                        maxHeight + getPaddingTop + getPaddingBottom
                    }px`;
                } else {
                    item.$el.removeAttribute('style');
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.PartnersSponsorsList {
    $component: &;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-right: -1px;

    @include mobile {
        grid-template-columns: repeat(1, 1fr);
    }

    &-section {
        margin-top: -1px;
        border-right: 1px solid $c-black;

        &:not(:last-child) {
            border-bottom: 1px solid $c-black;
        }

        &.isLarge {
            grid-column: span 4;

            @include mobile {
                grid-column: span 1;
            }
        }

        &.isMedium {
            grid-column: span 3;

            @include mobile {
                grid-column: span 1;
            }
        }

        &.isSmall {
            grid-column: span 1;

            @include mobile {
                grid-column: span 1;
            }

            .CommonTitle {
                @include tablet {
                    padding: scaling(32) scaling(16) scaling(16);
                }
            }
        }

        &Inner {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            margin: 0 -1px -1px 0;

            @include mobile {
                grid-template-columns: repeat(1, 1fr);
            }
        }

        &Company {
            height: scaling(260);
            border-right: 1px solid $c-black;
            border-bottom: 1px solid $c-black;

            @include desktop {
                height: scaling(220);
            }

            @include desktop--small {
                height: scaling(180);
            }

            @include laptop {
                height: scaling(160);
            }

            @include tablet {
                height: scaling(150);
            }

            @include mobile {
                width: 100%;
                height: scaling(140);
                padding: scaling(20) scaling(70);
            }

            @include hover {
                &:hover #{$component}-sectionCompanyLogo {
                    opacity: 0.7;
                }
            }

            &.isLarge {
                grid-column: span 12;

                @include mobile {
                    grid-column: span 1;
                }
            }

            &.isMedium {
                grid-column: span 4;

                @include mobile {
                    grid-column: span 1;
                }
            }

            &.isSmall {
                grid-column: span 3;

                @include mobile {
                    grid-column: span 1;
                }
            }

            &Logo {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                overflow: hidden;
                transition: opacity $d-hover ease-in-out;

                img {
                    @include m-objectFit;

                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .CommonTitle {
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
}
</style>
