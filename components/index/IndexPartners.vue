<template>
    <div class="IndexPartners">
        <div
            v-for="(item, index) in partners"
            :key="index"
            class="IndexPartners-item"
        >
            <HiddenLink v-if="item.url" :url="item.url" :is-external="true" />
            <div class="IndexPartners-itemImage">
                <picture>
                    <source
                        :srcset="item.image + ' 1x, ' + item.image2x + ' 2x'"
                    />
                    <img :src="item.image" alt="" />
                </picture>
            </div>
            <div class="IndexPartners-itemType" v-text="item.type"></div>
        </div>
    </div>
</template>

<script>
import HiddenLink from '~/components/common/HiddenLink';

export default {
    name: 'IndexPartners',

    components: {
        HiddenLink
    },

    props: {
        partners: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.IndexPartners {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    height: 100%;
    background-color: $c-red;

    &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: (100% / 2);
        padding: scaling(16);
        position: relative;

        @include desktop--large {
            padding: scaling(32);
        }

        @include desktop {
            padding: scaling(24);
        }

        @include desktop--small {
            padding: scaling(20);
        }

        @include mobile {
            width: 100%;
        }

        @include hover {
            &:hover #{$component}-itemImage {
                opacity: 0.7;
            }
        }

        &:first-child {
            width: 100%;
            border-bottom: 1px solid $c-black;

            #{$component}-item {
                &Image {
                    width: scaling(340);
                    height: scaling(68);

                    @include desktop--large {
                        width: scaling(525);
                        height: scaling(106);
                    }

                    @include laptop {
                        width: scaling(300);
                        height: scaling(60);
                    }

                    @include tablet {
                        width: scaling(264);
                        height: scaling(52);
                    }

                    @include mobile {
                        width: scaling(240);
                        height: scaling(50);
                    }
                }

                &Type {
                    margin-top: scaling(40);

                    @include desktop {
                        margin-top: scaling(33);
                    }

                    @include desktop--small {
                        margin-top: scaling(30);
                    }

                    @include laptop {
                        margin-top: scaling(22);
                    }

                    @include tablet {
                        margin-top: scaling(18);
                    }
                }
            }
        }

        &:last-child {
            border-left: 1px solid $c-black;

            @include mobile {
                border-top: 1px solid $c-black;
                border-left: none;
            }
        }

        &Image {
            display: flex;
            align-items: center;
            justify-content: center;
            width: scaling(284);
            height: scaling(62);
            transition: opacity $d-hover ease-in-out;

            @include desktop--large {
                width: scaling(400);
                height: scaling(88);
            }

            @include laptop {
                width: scaling(222);
                height: scaling(48);
            }

            @include tablet {
                width: scaling(200);
                height: scaling(42);
            }

            @include mobile {
                width: scaling(240);
                height: scaling(50);
            }

            img {
                @include m-objectFit;

                width: 100%;
                height: 100%;
            }
        }

        &Type {
            margin-top: scaling(20);
            color: $c-white;
            font-size: scaling(12);
            line-height: $lh-150;
            text-align: center;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(14);
            }

            @include desktop {
                margin-top: scaling(29);
                font-size: scaling(14);
            }

            @include laptop {
                margin-top: scaling(22);
            }

            @include tablet {
                margin-top: scaling(16);
            }

            @include mobile {
                width: scaling(230);
                margin-top: scaling(24);
            }
        }
    }
}
</style>
