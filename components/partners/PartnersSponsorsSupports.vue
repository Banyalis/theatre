<template>
    <div class="PartnersSponsorsSupports">
        <a
            v-for="(item, index) in supports"
            :key="index"
            :href="item.url"
            target="_blank"
            class="PartnersSponsorsSupports-item"
        >
            <div
                class="PartnersSponsorsSupports-itemTitle"
                v-text="item.title"
            ></div>
            <div
                class="PartnersSponsorsSupports-itemLogo"
                v-text="item.logo"
            ></div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'PartnersSponsorsSupports',

    props: {
        supports: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PartnersSponsorsSupports {
    $component: &;

    display: flex;
    flex-wrap: wrap;

    &-item {
        width: 50%;
        padding: scaling(16) scaling(16) scaling(20);

        @include desktop--large {
            padding: scaling(32) scaling(32) scaling(36);
        }

        @include desktop {
            padding: scaling(24) scaling(24) scaling(28);
        }

        @include desktop--small {
            padding: scaling(20) scaling(20) scaling(24);
        }

        @include mobile {
            width: 100%;
        }

        @include hover {
            &:hover #{$component}-itemLogo {
                color: $c-red;
            }
        }

        &:not(:last-child) {
            border-right: 1px solid $c-black;

            @include mobile {
                border-right: none;
                border-bottom: 1px solid $c-black;
            }
        }

        &Title {
            margin-bottom: scaling(40);
            color: $c-gray;
            font-size: scaling(14);
            line-height: $lh-150;
            font-family: $family-graphic;

            @include desktop--large {
                width: scaling(577);
                margin-bottom: scaling(48);
                font-size: scaling(24);
                line-height: $lh-140;
            }

            @include desktop {
                width: scaling(456);
                font-size: scaling(18);
            }

            @include desktop--small {
                width: scaling(380);
                margin-bottom: scaling(28);
            }

            @include laptop {
                width: scaling(352);
            }

            @include tablet {
                width: scaling(320);
            }

            @include mobile {
                margin-bottom: scaling(42);
            }
        }

        &Logo {
            color: $c-black;
            font-size: scaling(26);
            font-feature-settings: 'ss02' on;
            transition: color $d-hover ease-in-out;

            @include desktop--large {
                font-size: scaling(32);
            }

            @include mobile {
                font-size: scaling(20);
            }
        }
    }
}
</style>
