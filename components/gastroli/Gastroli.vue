<template>
    <div class="Gastroli">
        <div class="Gastroli-row">
            <div class="Gastroli-head">
                <SpectacleHead :concert="content" :is-golden="true" />
            </div>
            <div class="Gastroli-body">
                <GastroliBody :concert="content" />
            </div>
        </div>
        <div class="Gastroli-program">
            <div class="Gastroli-programHead">Программа гастролей</div>
            <div v-if="content.program" class="Gastroli-programCards">
                <GastroliCard
                    v-for="(programElement, programIndex) in content.program"
                    :key="programIndex"
                    :program="programElement"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import SpectacleHead from '@/components/spectacle/SpectacleHead';
import GastroliBody from '@/components/gastroli/GastroliBody';
import GastroliCard from '@/components/gastroli/GastroliCard';
import { HEADER_THEMES } from '../../utils/constants';

export default {
    name: 'Gastroli',

    components: { GastroliCard, GastroliBody, SpectacleHead },

    props: {
        content: {
            type: Object,
            required: true
        }
    },

    mounted() {
        this.setTheme();
    },

    methods: {
        setTheme() {
            this.changeTheme({
                headerMod: HEADER_THEMES.gold,
                isFooterDark: false
            });
        },

        ...mapMutations({
            changeTheme: 'changeTheme'
        })
    }
};
</script>

<style lang="scss" scoped>
.Gastroli {
    $component: &;

    &-row {
        display: flex;
        flex-direction: column;

        @include desktop--large {
            flex-direction: row;
        }

        @include desktop {
            flex-direction: row;
        }

        @include desktop--small {
            flex-direction: row;
        }
    }

    &-head {
        background-color: $c-gold--lighten;

        .SpectacleHead {
            @include desktop--small {
                height: calc(100vh - #{scaling(61)});
            }
        }

        @include desktop--large {
            width: (960 * 100%) / 1920;
        }

        @include desktop {
            width: (720 * 100%) / 1440;
        }

        @include desktop--small {
            width: (600 * 100%) / 1200;
        }
    }

    &-body {
        flex: 1;
    }

    &-program {
        &Head {
            @include text--button;

            text-transform: uppercase;
            padding: scaling(64) 0 scaling(32);
            text-align: center;
            background-color: $c-gray-95;
            border-top: 1px solid $c-black;
            border-bottom: 1px solid $c-black;
            width: 100%;
            position: sticky;
            z-index: 10;

            @include desktop--large {
                top: scaling(97);
            }

            @include desktop {
                padding-top: scaling(48);
                padding-bottom: scaling(24);
                top: scaling(72);
            }

            @include desktop--small {
                padding-top: scaling(40);
                padding-bottom: scaling(20);
                top: scaling(59);
            }

            @include laptop {
                padding-top: scaling(40);
                padding-bottom: scaling(20);
                top: scaling(64);
            }

            @include tablet {
                padding-top: scaling(44);
                padding-bottom: scaling(16);
                top: scaling(64);
            }

            @include mobile {
                padding-top: scaling(32);
                padding-bottom: scaling(16);
                top: scaling(48);
            }
        }
    }
}
</style>
