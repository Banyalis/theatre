<template>
    <div class="ConcertStructure b-paddings">
        <div
            v-for="(row, index) in structure"
            :key="index"
            class="ConcertStructure-row"
        >
            <div class="ConcertStructure-position" v-text="row.role"></div>
            <div class="ConcertStructure-artists">
                <div
                    v-for="(artist, artistIndex) in row.artists"
                    :key="artistIndex"
                    class="ConcertStructure-artist"
                    :class="{ isLink: artist.url }"
                >
                    <HiddenLink v-if="artist.url" :url="artist.url" />
                    <div class="ConcertStructure-artistPicture">
                        <picture v-if="artist.image">
                            <source
                                :srcset="
                                    artist.image +
                                    ' 1x, ' +
                                    artist.image2x +
                                    ' 2x'
                                "
                            />
                            <img :src="artist.image" :alt="artist.name" />
                        </picture>
                        <div v-else class="ConcertStructure-artistPictureStub">
                            <svg-icon name="icon-stub-people-mobile" />
                        </div>
                    </div>
                    <div
                        class="ConcertStructure-artistName"
                        v-text="artist.name"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HiddenLink from '@/components/common/HiddenLink';

export default {
    name: 'ConcertStructure',

    components: {
        HiddenLink
    },

    props: {
        structure: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.ConcertStructure {
    $component: &;

    padding-bottom: scaling(64);

    @include desktop--large {
        padding-bottom: scaling(120);
    }

    @include desktop {
        padding-bottom: scaling(100);
    }

    @include desktop--small {
        padding-bottom: scaling(80);
    }

    &-row {
        display: flex;
        margin-bottom: scaling(24);

        @include desktop--large {
            margin-bottom: scaling(28);
        }

        @include desktop--small {
            margin-bottom: scaling(20);
        }

        @include laptop {
            margin-bottom: scaling(16);
        }

        @include tablet {
            margin-bottom: scaling(16);
        }

        @include mobile {
            flex-direction: column;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }

    &-position {
        @include text;

        max-width: scaling(320);
        width: 100%;
        margin-right: scaling(160);

        @include desktop {
            max-width: scaling(256);
            margin-right: scaling(104);
        }

        @include desktop--small {
            max-width: scaling(260);
            margin-right: scaling(40);
        }

        @include laptop {
            max-width: scaling(208);
            margin-right: scaling(32);
        }

        @include tablet {
            max-width: scaling(184);
            margin-right: scaling(200);
        }

        @include mobile {
            max-width: unset;
            margin-right: 0;
            margin-bottom: scaling(12);
        }
    }

    &-artist {
        display: flex;
        align-items: center;
        margin-bottom: scaling(8);

        &:last-child {
            margin-bottom: 0;
        }

        &.isLink {
            position: relative;

            @include hover {
                &:hover {
                    #{$component}-artistName {
                        color: $c-red;
                    }
                }
            }
        }

        &Picture {
            min-width: scaling(44);
            max-width: scaling(44);
            height: scaling(44);
            margin-right: scaling(24);
            border-radius: 50%;
            overflow: hidden;

            @include desktop {
                min-width: scaling(36);
                max-width: scaling(36);
                height: scaling(36);
            }

            @include desktop--small {
                min-width: scaling(32);
                max-width: scaling(32);
                height: scaling(32);
            }

            @include laptop {
                min-width: scaling(28);
                max-width: scaling(28);
                height: scaling(28);
            }

            @include tablet {
                min-width: scaling(28);
                max-width: scaling(28);
                height: scaling(28);
            }

            @include mobile {
                min-width: scaling(32);
                max-width: scaling(32);
                height: scaling(32);
            }

            &Stub {
                width: 100%;
                height: 100%;

                svg {
                    width: 100%;
                    height: 100%;
                    stroke: $c-black;
                }
            }

            img {
                @include m-objectFit(cover, center);

                width: 100%;
                height: 100%;
            }
        }

        &Name {
            @include text;

            transition: color $d-hover ease-in-out;
        }
    }
}
</style>
