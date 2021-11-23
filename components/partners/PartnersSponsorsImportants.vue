<template>
    <div class="PartnersSponsorsImportants">
        <a
            v-for="(item, index) in importants"
            :key="index"
            :href="item.url"
            target="_blank"
            class="PartnersSponsorsImportants-item"
        >
            <div class="PartnersSponsorsImportants-itemLogo">
                <picture>
                    <source
                        :srcset="item.image + ' 1x, ' + item.image2x + ' 2x'"
                    />
                    <img :src="item.image" alt="" />
                </picture>
            </div>
            <div
                class="PartnersSponsorsImportants-itemCaption"
                v-text="item.caption"
            ></div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'PartnersSponsorsImportants',

    props: {
        importants: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PartnersSponsorsImportants {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    margin-right: -1px;

    &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: scaling(20);
        border-right: 1px solid $c-black;
        border-bottom: 1px solid $c-black;

        @include desktop--large {
            padding: scaling(40);
        }

        @include desktop {
            padding: scaling(32);
        }

        @include desktop--small {
            padding: scaling(28);
        }

        @include laptop {
            padding: scaling(24);
        }

        @include hover {
            &:hover #{$component}-itemLogo {
                opacity: 0.7;
            }
        }

        &:first-child {
            height: scaling(384);

            @include desktop {
                height: scaling(324);
            }

            @include desktop--small {
                height: scaling(280);
            }

            @include laptop {
                height: scaling(240);
            }

            @include tablet {
                height: scaling(220);
            }

            @include mobile {
                height: scaling(260);
            }
        }

        &:not(:first-child) {
            width: 50%;
            height: scaling(184);

            @include desktop--large {
                height: scaling(320);
            }

            @include desktop {
                height: scaling(272);
            }

            @include desktop--small {
                height: scaling(232);
            }

            @include laptop {
                height: scaling(200);
            }

            @include mobile {
                width: 100%;
            }
        }

        &Logo {
            display: flex;
            align-items: center;
            flex: 1;
            transition: opacity $d-hover ease-in-out;

            img {
                @include m-objectFit;

                width: 100%;
                height: 100%;
            }
        }

        &Caption {
            color: $c-black;
            font-size: scaling(12);
            line-height: $lh-130;
            text-align: center;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(20);
            }

            @include desktop {
                font-size: scaling(18);
            }

            @include desktop--small {
                font-size: scaling(18);
            }

            @include laptop {
                line-height: $lh-140;
            }

            @include mobile {
                line-height: $lh-150;
            }
        }
    }
}
</style>
