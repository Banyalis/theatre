<template>
    <div class="PerformanceSummary">
        <!-- eslint-disable-next-line -->
        <div class="PerformanceSummary-inner" v-html="summary"></div>
        <RoundedButton
            v-if="summaryFull"
            title="Подробнее"
            type="isTransparentWhite"
            class="PerformanceSummary-button"
            @click="openPopup"
        />
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { CONFIG_POPUPS } from '@/utils/constants';
import RoundedButton from '@/components/other/RoundedButton';

export default {
    name: 'PerformanceSummary',

    components: {
        RoundedButton
    },

    props: {
        summary: {
            type: String,
            default: ''
        },
        summaryFull: {
            type: String,
            default: ''
        }
    },

    computed: {
        ...mapState('performances', ['content'])
    },

    methods: {
        openPopup() {
            this.setPopupType(CONFIG_POPUPS.performance.componentName);
            this.setCustomTitle({
                titleDesktop: 'Подробнее'
            });
            this.updateData({
                sidebar: this.content,
                main: this.content.summaryFull
            });
            this.openPopupAction();
        },

        ...mapMutations({
            setPopupType: 'popup/updateType',
            setCustomTitle: 'popup/setCustomTitle',
            updateData: 'popup/updateData'
        }),

        ...mapActions({
            openPopupAction: 'popup/open'
        })
    }
};
</script>

<style lang="scss" scoped>
.PerformanceSummary {
    $component: &;

    color: $c-white;

    @include desktop--large {
        padding: scaling(64) scaling(160) scaling(120);
    }

    @include desktop {
        padding: scaling(56) scaling(120) scaling(100);
    }

    @include desktop--small {
        padding: scaling(48) scaling(100) scaling(80);
    }

    @include laptop {
        padding: scaling(40) scaling(120) scaling(80);
    }

    @include tablet {
        padding: scaling(24) scaling(64) scaling(96);
    }

    @include mobile {
        padding: scaling(32) scaling(16) scaling(44);
    }

    &::v-deep h2 {
        font-size: scaling(24);
        line-height: $lh-160;
        font-weight: $fw-bold;

        @include desktop--large {
            font-size: scaling(40);
        }

        @include desktop {
            font-size: scaling(32);
        }

        @include desktop--small {
            font-size: scaling(28);
        }

        &:not(:first-child) {
            margin-top: scaling(32);

            @include desktop--large {
                margin-top: scaling(60);
            }

            @include desktop {
                margin-top: scaling(40);
            }

            @include tablet {
                margin-top: scaling(40);
            }
        }
    }

    &::v-deep h3 {
        font-size: scaling(18);
        line-height: $lh-160;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-weight: $fw-medium;
        font-family: $family-graphic;

        @include desktop--large {
            font-size: scaling(28);
            line-height: $lh-170;
        }

        @include desktop {
            font-size: scaling(22);
            line-height: $lh-170;
        }

        @include desktop--small {
            line-height: $lh-170;
        }

        @include mobile {
            font-size: scaling(14);
        }

        &:not(:first-child) {
            margin-top: scaling(32);

            @include desktop--small {
                margin-top: scaling(26);
            }

            @include laptop {
                margin-top: scaling(22);
            }

            @include tablet {
                margin-top: scaling(22);
            }

            @include mobile {
                margin-top: scaling(17);
            }
        }
    }

    &::v-deep p {
        font-size: scaling(18);
        line-height: $lh-160;
        font-family: $family-graphic;

        @include desktop--large {
            font-size: scaling(28);
            line-height: $lh-170;
        }

        @include desktop {
            font-size: scaling(22);
            line-height: $lh-170;
        }

        @include desktop--small {
            line-height: $lh-170;
        }

        @include mobile {
            font-size: scaling(14);
        }

        &:not(:first-child) {
            margin-top: scaling(20);

            @include desktop--small {
                margin-top: scaling(16);
            }

            @include laptop {
                margin-top: scaling(12);
            }

            @include tablet {
                margin-top: scaling(12);
            }

            @include mobile {
                margin-top: scaling(8);
            }
        }
    }

    &::v-deep a {
        color: $c-red;
        transition: color $d-hover ease-in-out;

        @include hover {
            &:hover {
                color: $c-white;
            }
        }
    }

    &::v-deep b {
        font-weight: $fw-semiBold;
    }

    &-button {
        display: inline-flex;
        margin-top: scaling(36);

        @include desktop {
            margin-top: scaling(32);
        }

        @include desktop--small {
            margin-top: scaling(32);
        }

        @include tablet {
            margin-top: scaling(20);
        }

        @include mobile {
            margin-top: scaling(24);
        }
    }
}
</style>
