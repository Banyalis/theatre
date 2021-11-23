<template>
    <div class="Concert">
        <div class="Concert-row">
            <div class="Concert-head">
                <SpectacleHead :concert="content" />
            </div>
            <div class="Concert-body">
                <ConcertBody :concert="content" />
            </div>
        </div>
        <div class="Concert-suggestions">
            <ConcertSuggestions :suggestions="content.suggestions" />
        </div>
    </div>
</template>

<script>
import { HEADER_THEMES } from '@/utils/constants';
import SpectacleHead from '@/components/spectacle/SpectacleHead';
import ConcertBody from '@/components/concert/ConcertBody';
import ConcertSuggestions from '@/components/concert/ConcertSuggestions';
import { mapMutations } from 'vuex';

export default {
    name: 'Concert',

    components: {
        ConcertSuggestions,
        ConcertBody,
        SpectacleHead
    },

    props: {
        content: {
            type: Object,
            required: true
        }
    },

    updated() {
        this.setTheme();
    },

    mounted() {
        this.setTheme();
    },

    methods: {
        setTheme() {
            this.changeTheme({
                headerMod: HEADER_THEMES.default,
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
.Concert {
    &-row {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid $c-black;

        @include desktop--large {
            flex-direction: row;
        }

        @include desktop {
            flex-direction: row;
        }
    }

    &-head {
        background-color: $c-red;

        @include desktop--large {
            border-right: 1px solid $c-black;
            width: (960 * 100% / 1920);
        }

        @include desktop {
            border-right: 1px solid $c-black;
            width: (720 * 100% / 1440);
        }
    }

    &-body {
        @include desktop--large {
            width: (960 * 100% / 1920);
        }

        @include desktop {
            width: (720 * 100% / 1440);
        }
    }
}
</style>
