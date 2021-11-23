<template>
    <div class="PersonHero">
        <div class="PersonHero-image">
            <div class="PersonHero-imageInner">
                <picture v-if="hero.image">
                    <source
                        :srcset="hero.image + ' 1x, ' + hero.image2x + ' 2x'"
                    />
                    <img :src="hero.image" alt="" />
                </picture>
                <div v-else class="PersonHero-imageStub">
                    <svg-icon name="icon-stub-person" />
                </div>
            </div>
        </div>
        <div class="PersonHero-content">
            <div class="PersonHero-position" v-text="hero.position"></div>
            <!-- eslint-disable -->
            <div
                class="PersonHero-name"
                v-html="hero.name.split(' ').join('<br>')"
            ></div>
            <!-- eslint-enable -->
            <div class="PersonHero-rank" v-text="hero.rank"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PersonHero',

    props: {
        hero: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PersonHero {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    position: relative;
    border-bottom: 1px solid $c-black;
    background-color: $c-gold--lighten;

    @include tablet {
        padding: scaling(110) 0 scaling(20);
    }

    @include mobile {
        padding: scaling(82) 0 scaling(32);
    }

    &-image {
        display: flex;
        justify-content: center;
        flex-shrink: 0;
        width: 100%;

        @include desktop--large {
            width: (768 * 100% / 1920);
            padding: scaling(136) 0;
            border-right: 1px solid $c-gray--header;
        }

        @include desktop {
            width: (576 * 100% / 1440);
            padding: scaling(102) 0;
            border-right: 1px solid $c-gray--header;
        }

        @include desktop--small {
            width: (480 * 100% / 1200);
            padding: scaling(85) 0;
            border-right: 1px solid $c-gray--header;
        }

        @include laptop {
            width: (384 * 100% / 960);
            padding: scaling(68) 0;
            border-right: 1px solid $c-gray--header;
        }

        &Inner {
            width: scaling(216);
            height: scaling(216);
            padding: scaling(8);
            border: 1px solid $c-gray--header;
            border-radius: 50%;

            @include desktop--large {
                width: scaling(432);
                height: scaling(432);
                padding: scaling(16);
            }

            @include desktop {
                width: scaling(324);
                height: scaling(324);
                padding: scaling(12);
            }

            @include desktop--small {
                width: scaling(270);
                height: scaling(270);
                padding: scaling(10);
            }

            @include mobile {
                width: scaling(176);
                height: scaling(176);
                padding: scaling(6);
            }

            img {
                @include m-objectFit;

                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        &Stub {
            width: 100%;
            height: 100%;

            svg {
                width: 100%;
                height: 100%;
                stroke: $c-gray--header;
            }
        }
    }

    &-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        flex: 1;

        @include desktop--large {
            padding: scaling(36) 0;
        }

        @include desktop {
            padding: scaling(28) 0;
        }

        @include desktop--small {
            padding: scaling(24) 0;
        }

        @include laptop {
            padding: scaling(20) 0;
        }

        @include tablet {
            flex: auto;
            width: 100%;
        }

        @include mobile {
            flex: auto;
            width: 100%;
        }
    }

    &-position,
    &-rank {
        font-size: scaling(14);
        line-height: $lh-130;
        font-family: $family-graphic;

        @include desktop--large {
            font-size: scaling(20);
        }

        @include desktop {
            font-size: scaling(18);
        }
    }

    &-position {
        @include tablet {
            position: absolute;
            top: scaling(20);
        }

        @include mobile {
            position: absolute;
            top: scaling(32);
        }
    }

    &-name {
        line-height: $lh-130;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        text-align: center;
        font-weight: $fw-light;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            font-size: scaling(80);
        }

        @include desktop {
            font-size: scaling(64);
        }

        @include desktop--small {
            font-size: scaling(55);
        }

        @include laptop {
            font-size: scaling(48);
        }

        @include tablet {
            margin: scaling(26) 0 scaling(72);
            font-size: scaling(44);
        }

        @include mobile {
            margin: scaling(32) 0 scaling(58);
            font-size: scaling(24);
            line-height: $lh-120;
        }
    }
}
</style>
