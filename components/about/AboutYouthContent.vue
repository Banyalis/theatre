<template>
    <div class="AboutYouthContent">
        <div
            v-for="(section, sectionIndex) in content.sections"
            :key="sectionIndex"
            class="AboutYouthContent-section"
            :class="{
                isBlackTheme: section.isBlack
            }"
        >
            <div class="AboutYouthContent-sectionHeader">
                <div
                    class="AboutYouthContent-sectionHeaderTitle"
                    :class="{ isCategoryTitle: sectionIndex === 0 }"
                    v-text="section.header.title"
                ></div>
                <p
                    class="AboutYouthContent-sectionHeaderText"
                    v-text="section.header.text"
                ></p>
            </div>
            <div
                v-for="(item, index) in section.items"
                :key="index"
                class="AboutYouthContent-sectionComponent"
                :class="[
                    item.type
                        ? `AboutYouthContent-sectionComponent--${item.type}`
                        : ''
                ]"
            >
                <AboutYouthContacts
                    v-if="item.type === 'contacts'"
                    :contacts="item.contacts"
                />
                <AboutYouthDisciplines
                    v-if="item.type === 'disciplines'"
                    :disciplines="item.disciplines"
                />
                <AboutYouthText
                    v-if="item.type === 'text'"
                    :text="item.content"
                />
                <AboutYouthTour v-if="item.type === 'tour'" :tour="item.tour" />
                <AboutYouthGraduates
                    v-if="item.type === 'graduates'"
                    :graduates="item.graduates"
                />
                <AboutYouthTeachers
                    v-if="item.type === 'teachers'"
                    :teachers="item.teachers"
                />
                <CommonGallery
                    v-if="item.type === 'gallery'"
                    :gallery="item.gallery"
                    :theme="'isBlack'"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { isDesktopSmall } from '@/utils/utils';
import AboutYouthContacts from '~/components/about/AboutYouthContacts';
import AboutYouthDisciplines from '~/components/about/AboutYouthDisciplines';
import AboutYouthText from '~/components/about/AboutYouthText';
import AboutYouthTour from '~/components/about/AboutYouthTour';
import AboutYouthGraduates from '~/components/about/AboutYouthGraduates';
import AboutYouthTeachers from '~/components/about/AboutYouthTeachers';
import CommonGallery from '~/components/common/CommonGallery';

export default {
    name: 'AboutYouthContent',

    components: {
        AboutYouthContacts,
        AboutYouthDisciplines,
        AboutYouthText,
        AboutYouthTour,
        AboutYouthGraduates,
        AboutYouthTeachers,
        CommonGallery
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

    methods: {
        onResize() {
            if (isDesktopSmall()) {
                this.$el.style.top = `${this.headerHeight}px`;
            } else {
                this.$el.removeAttribute('style');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutYouthContent {
    $component: &;

    width: 100%;
    height: 100%;
    position: sticky;

    @include desktop--large {
        width: (1280 * 100% / 1920);
        border-right: 1px solid $c-gray--header;
    }

    @include desktop {
        width: (960 * 100% / 1440);
        border-right: 1px solid $c-gray--header;
    }

    @include desktop--small {
        width: (800 * 100% / 1200);
        border-right: 1px solid $c-gray--header;
    }

    &-section {
        &.isBlackTheme {
            background-color: $c-black--header;
        }

        &Header {
            padding: scaling(32) scaling(16) 0;

            @include desktop--large {
                padding: scaling(48) scaling(32) 0;
            }

            @include desktop {
                padding: scaling(40) scaling(24) 0;
            }

            @include desktop--small {
                padding: scaling(36) scaling(20) 0;
            }

            #{$component}-section.isBlackTheme & {
                padding-bottom: scaling(72);
                border-bottom: 1px solid $c-gray--header;

                @include desktop--large {
                    padding-bottom: scaling(120);
                }

                @include desktop {
                    padding-bottom: scaling(100);
                }

                @include desktop--small {
                    padding-bottom: scaling(80);
                }

                @include mobile {
                    padding-bottom: scaling(64);
                }
            }

            &Title {
                margin-bottom: scaling(16);
                font-size: scaling(24);
                line-height: $lh-150;
                letter-spacing: 0.02em;
                font-feature-settings: 'cpsp' on;

                @include desktop--large {
                    margin-bottom: scaling(32);
                    font-size: scaling(40);
                }

                @include desktop {
                    margin-bottom: scaling(24);
                    font-size: scaling(32);
                }

                @include desktop--small {
                    margin-bottom: scaling(20);
                    font-size: scaling(28);
                }

                @include mobile {
                    font-size: scaling(20);
                    letter-spacing: 0;
                }

                &.isCategoryTitle {
                    margin-bottom: scaling(136);
                    line-height: $lh-110;
                    text-transform: uppercase;
                    font-feature-settings: 'ss02' on;

                    @include desktop--large {
                        font-size: scaling(60);
                    }

                    @include desktop {
                        margin-bottom: scaling(97);
                        font-size: scaling(48);
                        letter-spacing: 0;
                    }

                    @include desktop--small {
                        margin-bottom: scaling(77);
                        font-size: scaling(42);
                        letter-spacing: 0;
                    }

                    @include laptop {
                        font-size: scaling(36);
                    }

                    @include tablet {
                        margin-bottom: scaling(100);
                        font-size: scaling(32);
                    }

                    @include mobile {
                        margin-bottom: scaling(80);
                        font-size: scaling(30);
                    }
                }

                #{$component}-section.isBlackTheme & {
                    color: $c-white;
                }
            }

            &Text {
                font-size: scaling(18);
                line-height: $lh-170;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(28);
                }

                @include desktop {
                    font-size: scaling(22);
                }

                @include laptop {
                    line-height: $lh-160;
                }

                @include tablet {
                    font-size: scaling(16);
                    line-height: $lh-160;
                }

                @include mobile {
                    font-size: scaling(16);
                    line-height: $lh-140;
                }

                #{$component}-section.isBlackTheme & {
                    color: $c-white;
                }
            }
        }

        &Component {
            &--disciplines,
            &--text,
            &--graduates,
            &--teachers {
                padding: 0 scaling(192);

                @include desktop {
                    padding: 0 scaling(120);
                }

                @include desktop--small {
                    padding: 0 scaling(100);
                }

                @include tablet {
                    padding: 0 scaling(112);
                }

                @include mobile {
                    padding: 0 scaling(16);
                }
            }

            &--text:last-child {
                margin-bottom: scaling(52);

                @include desktop--large {
                    margin-bottom: scaling(80);
                }

                @include desktop {
                    margin-bottom: scaling(72);
                }

                @include desktop--small {
                    margin-bottom: scaling(64);
                }

                @include mobile {
                    margin-bottom: scaling(40);
                }
            }
        }
    }
}
</style>
