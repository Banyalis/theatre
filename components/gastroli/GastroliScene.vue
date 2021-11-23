<template>
    <div class="GastroliScene b-paddings" :class="{ oneScene }">
        <div class="GastroliScene-row">
            <div class="GastroliScene-caption">Сцена:</div>
            <div v-if="title" class="GastroliScene-title" v-text="title"></div>
            <div v-if="place" class="GastroliScene-place" v-text="place"></div>
        </div>
        <div v-if="image" class="GastroliScene-picture">
            <picture>
                <source :srcset="image + ' 1x, ' + image2x + ' 2x'" />
                <img class="GastroliScene-image" :src="image" alt="" />
            </picture>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GastroliScene',

    props: {
        title: {
            type: String,
            required: true
        },
        place: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        image2x: {
            type: String,
            required: true
        },
        oneScene: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" scoped>
.GastroliScene {
    $component: &;

    padding-top: scaling(20);
    padding-bottom: scaling(16);
    display: flex;
    flex-direction: column;
    width: 50%;

    &:first-child {
        box-shadow: 1px 0 0 0 $c-black;
    }

    @include desktop--large {
        padding-top: scaling(36);
        padding-bottom: scaling(32);
    }

    @include desktop {
        padding-top: scaling(28);
        padding-bottom: scaling(24);
    }

    @include desktop--small {
        padding-top: scaling(24);
        padding-bottom: scaling(20);
    }

    @include laptop {
        padding-bottom: scaling(20);
    }

    @include mobile {
        width: 100%;

        &:first-child {
            box-shadow: 0 1px 0 0 $c-black;
        }
    }

    @include laptop {
        flex-direction: row;
        align-items: center;
    }

    &.oneScene {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;

        @include mobile {
            flex-direction: column;
        }
    }

    &-row {
        @include laptop {
            flex: 1;
        }
    }

    &-caption {
        @include text;

        margin-bottom: scaling(48);

        @include desktop--large {
            margin-bottom: scaling(64);
        }

        @include desktop {
            margin-bottom: scaling(56);
        }
    }

    &-title {
        @include title;

        margin-bottom: scaling(12);

        @include desktop--large {
            margin-bottom: scaling(20);
        }

        @include desktop {
            margin-bottom: scaling(16);
        }

        @include laptop {
            margin-bottom: scaling(8);
        }

        @include tablet {
            margin-bottom: scaling(8);
        }

        @include mobile {
            font-size: scaling(20);
        }
    }

    &-place {
        @include text;

        color: $c-gray;
        margin-bottom: scaling(32);

        @include desktop--large {
            margin-bottom: scaling(64);
        }

        @include desktop {
            margin-bottom: scaling(48);
        }

        @include desktop--small {
            margin-bottom: scaling(37);
        }

        #{$component}.oneScene & {
            margin-bottom: 0;

            @include mobile {
                margin-bottom: scaling(32);
            }
        }
    }

    &-picture {
        width: 100%;
        position: relative;
        margin-top: auto;

        @include desktop--large {
            height: scaling(285);
        }

        @include desktop {
            height: scaling(214);
        }

        @include desktop--small {
            height: scaling(180);
        }

        @include laptop {
            height: scaling(116);
            width: (176 * 100%) / 480;
            min-width: (176 * 100%) / 480;
            margin-top: 0;
        }

        @include tablet {
            height: scaling(226);
        }

        @include mobile {
            height: scaling(166);
        }

        #{$component}.oneScene & {
            flex-shrink: 0;
            width: scaling(300);
            height: 100%;
            margin: 0 0 0 scaling(32);

            @include desktop--large {
                width: scaling(416);
            }

            @include desktop {
                width: scaling(350);
            }

            @include laptop {
                height: scaling(200);
            }

            @include tablet {
                height: scaling(200);
            }

            @include mobile {
                width: 100%;
                height: scaling(166);
                margin: 0;
            }
        }
    }

    &-image {
        @include m-absoluteObjectFit();
    }
}
</style>
