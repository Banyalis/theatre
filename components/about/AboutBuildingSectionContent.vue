<template>
    <div class="AboutBuildingSectionContent">
        <div
            v-for="(item, index) in content"
            :key="index"
            class="AboutBuildingSectionContent-element"
            :class="[
                `AboutBuildingSectionContent-element--${item.type}`,
                item.full
                    ? `AboutBuildingSectionContent-element--image--full`
                    : ''
            ]"
        >
            <AboutBuildingSectionContentText
                v-if="item.type === 'text'"
                :content="item.content"
            />
            <AboutBuildingSectionContentImage
                v-if="item.type === 'image'"
                :image="item"
            />
            <AboutBuildingSectionContentTitle
                v-if="item.type === 'title'"
                :content="item.content"
            />
            <CommonGallery
                v-if="item.type === 'gallery'"
                :gallery="item.gallery"
                :theme="'isBlack'"
            />
            <AboutBuildingSectionContentHint v-if="item.hint" :insert="item" />
        </div>
    </div>
</template>

<script>
import AboutBuildingSectionContentText from '~/components/about/AboutBuildingSectionContentText';
import AboutBuildingSectionContentImage from '~/components/about/AboutBuildingSectionContentImage';
import AboutBuildingSectionContentTitle from '~/components/about/AboutBuildingSectionContentTitle';
import AboutBuildingSectionContentHint from '~/components/about/AboutBuildingSectionContentHint';
import CommonGallery from '~/components/common/CommonGallery';

export default {
    name: 'AboutBuildingSectionContent',

    components: {
        AboutBuildingSectionContentText,
        AboutBuildingSectionContentImage,
        AboutBuildingSectionContentTitle,
        AboutBuildingSectionContentHint,
        CommonGallery
    },

    props: {
        content: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutBuildingSectionContent {
    $component: &;

    &-element {
        padding: 0 scaling(112);
        position: relative;

        @include desktop--large {
            padding: 0 scaling(160);
        }

        @include desktop {
            padding: 0 scaling(96);
        }

        @include desktop--small {
            padding: 0 scaling(60);
        }

        @include mobile {
            padding: 0 scaling(16);
        }

        &:first-child {
            margin-top: 0;
        }

        &:last-child {
            margin-bottom: 0;
        }

        &--text,
        &--image,
        &--title {
            &:last-child {
                padding-bottom: scaling(72);

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
                    padding-bottom: scaling(63);
                }
            }
        }

        &--image {
            margin: scaling(32) 0 scaling(52);

            @include desktop--large {
                margin: scaling(64) 0 scaling(80);
            }

            @include desktop {
                margin: scaling(52) 0 scaling(72);
            }

            @include desktop--small {
                margin: scaling(48) 0 scaling(64);
            }

            @include mobile {
                margin: scaling(32) 0 scaling(40);
            }

            &--full {
                margin: scaling(72) 0;
                padding: 0;

                @include desktop--large {
                    margin: scaling(120) 0;
                }

                @include desktop {
                    margin: scaling(100) 0;
                }

                @include desktop--small {
                    margin: scaling(80) 0;
                }

                @include mobile {
                    margin: scaling(64) 0 scaling(40);
                }
            }
        }

        &--title {
            margin: scaling(52) 0 scaling(16);

            @include desktop--large {
                margin: scaling(80) 0 scaling(32);
            }

            @include desktop {
                margin: scaling(72) 0 scaling(24);
            }

            @include desktop--small {
                margin: scaling(64) 0 scaling(20);
            }

            @include mobile {
                margin: scaling(40) 0 scaling(16);
            }
        }

        &--gallery {
            margin: scaling(72) 0;
            padding: 0;

            @include desktop--large {
                margin: scaling(120) 0;
            }

            @include desktop {
                margin: scaling(100) 0;
            }

            @include desktop--small {
                margin: scaling(80) 0;
            }

            @include mobile {
                margin: scaling(64) 0 scaling(40);
            }
        }
    }
}
</style>
