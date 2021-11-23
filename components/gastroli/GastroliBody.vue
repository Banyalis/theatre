<template>
    <div class="GastroliBody">
        <SpectacleSchedule :date="concert.date" :time="concert.time" />
        <div v-if="concert.scenes" class="GastroliBody-scenes">
            <GastroliScene
                v-for="(scene, sceneIndex) in concert.scenes"
                :key="sceneIndex"
                :title="scene.title"
                :place="scene.place"
                :image="scene.image"
                :image2x="scene.image2x"
                :one-scene="concert.scenes.length === 1"
            />
        </div>
        <div class="GastroliBody-info b-paddings">
            <div
                v-if="concert.about && concert.about.caption"
                class="GastroliBody-caption"
                v-text="concert.about.caption"
            ></div>
            <div
                v-if="
                    (concert.about && concert.about.title) ||
                    (concert.about && concert.about.texts)
                "
                class="GastroliBody-about"
            >
                <div
                    v-if="concert.about && concert.about.title"
                    class="GastroliBody-title"
                    v-text="concert.about.title"
                ></div>
                <div
                    v-if="concert.about && concert.about.texts"
                    class="GastroliBody-paragraphs"
                >
                    <p
                        v-for="(paragraph, paragraphIndex) in concert.about
                            .texts"
                        :key="paragraphIndex"
                        v-text="paragraph"
                    ></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SpectacleSchedule from '@/components/spectacle/SpectacleSchedule';
import GastroliScene from '@/components/gastroli/GastroliScene';
export default {
    name: 'GastroliBody',

    components: {
        GastroliScene,
        SpectacleSchedule
    },

    props: {
        concert: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.GastroliBody {
    &-scenes {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid $c-black;

        @include mobile {
            flex-direction: column;
        }
    }

    &-info {
        @include desktop--large {
            width: (832 * 100%) / 960;
            padding-top: scaling(72);
            padding-bottom: scaling(120);
        }

        @include desktop {
            width: (648 * 100%) / 720;
            padding-top: scaling(80);
            padding-bottom: scaling(100);
        }

        @include desktop--small {
            padding-top: scaling(64);
            padding-bottom: scaling(80);
        }

        @include laptop {
            width: (672 * 100%) / 960;
            margin-left: scaling(96);
            padding-top: scaling(56);
            padding-bottom: scaling(80);
        }

        @include tablet {
            padding-top: scaling(48);
            padding-bottom: scaling(100);
        }

        @include mobile {
            padding-top: scaling(48);
            padding-bottom: scaling(80);
        }
    }

    &-caption {
        @include body-4;

        padding-bottom: scaling(32);
        margin-bottom: scaling(32);
        border-bottom: 1px solid $c-gray-80;

        @include desktop--large {
            padding-bottom: scaling(64);
            margin-bottom: scaling(64);
        }

        @include desktop {
            padding-bottom: scaling(48);
            margin-bottom: scaling(48);
        }

        @include desktop--small {
            padding-bottom: scaling(40);
            margin-bottom: scaling(40);
        }

        @include tablet {
            margin-bottom: scaling(64);
        }

        @include mobile {
            margin-bottom: scaling(48);
        }

        &:last-child {
            margin-bottom: 0;
        }
    }

    &-title {
        @include body-4;

        margin-bottom: scaling(20);

        @include desktop--large {
            margin-bottom: scaling(32);
        }

        @include desktop {
            margin-bottom: scaling(24);
        }

        @include mobile {
            margin-bottom: scaling(24);
        }
    }

    &-about {
        @include tablet {
            width: (544 * 100%) / 768;
            margin: 0 auto;
        }
    }

    &-paragraphs {
        p,
        div {
            @include body-3;

            margin: scaling(12) 0;
            font-size: scaling(18);
            color: $c-gray--header;
            line-height: $lh-160;

            @include desktop--large {
                font-size: scaling(24);
                margin: scaling(20) 0;
            }

            @include desktop {
                font-size: scaling(20);
                margin: scaling(16) 0;
            }

            @include desktop--small {
                margin: scaling(16) 0;
            }

            @include tablet {
                margin: scaling(16) 0;
            }

            @include mobile {
                font-size: scaling(16);
            }
        }
    }

    &::v-deep .SpectacleSchedule {
        margin-bottom: -1px;

        &-date {
            color: $c-black;
            text-transform: inherit;
        }
    }
}
</style>
