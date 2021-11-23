<template>
    <div class="PartnersSponsorThanks">
        <div
            class="PartnersSponsorThanks-title"
            v-text="
                `Мы хотим от всего сердца поблагодарить всех тех, кто оказывает поддержку нашему театру в 243-м театральном сезоне!`
            "
        ></div>
    </div>
</template>

<script>
export default {
    name: 'PartnersSponsorThanks'
};
</script>

<style lang="scss" scoped>
.PartnersSponsorThanks {
    $component: &;

    flex-shrink: 0;

    @include desktop--large {
        padding: scaling(120) scaling(49);
    }

    @include desktop {
        padding: scaling(100) scaling(48);
    }

    @include desktop--small {
        padding: scaling(80) scaling(20);
    }

    @include laptop {
        padding: scaling(40) scaling(208);
    }

    @include tablet {
        padding: scaling(40) scaling(112);
    }

    @include mobile {
        padding: scaling(40) scaling(16);
    }

    &-title {
        font-size: scaling(20);
        line-height: $lh-140;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        text-align: center;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            font-size: scaling(36);
            letter-spacing: 0;
        }

        @include desktop {
            font-size: scaling(28);
            letter-spacing: 0;
        }

        @include desktop--small {
            font-size: scaling(24);
            letter-spacing: 0;
        }
    }
}
</style>
