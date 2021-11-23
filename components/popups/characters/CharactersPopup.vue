<template>
    <div class="CharacterPopup">
        <div class="CharacterPopup-performance">
            <CharactersPerformance :performance="data.performance" />
        </div>
        <div class="CharacterPopup-content">
            <CharactersContent
                :performance-date-time="data.performance.datetime"
                :name="data.performance.name"
                :characters="data.participants"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import CharactersContent from './CharactersContent';
import CharactersPerformance from './CharactersPerformance';

export default {
    name: 'CharactersPopup',
    components: {
        CharactersContent,
        CharactersPerformance
    },
    computed: {
        ...mapState('popup', ['data'])
    }
};
</script>

<style scoped lang="scss">
.CharacterPopup {
    $component: &;

    display: flex;
    width: 100%;
    min-height: 100%;

    &-performance {
        @include m-scrollbarHidden;

        position: sticky;
        top: 0;
        height: 100vh;
        width: scaling(640);
        background-color: rgba($c-black, 0.6);
        backdrop-filter: blur(128px);
        overflow-y: auto;
        border-right: 1px solid $c-black;

        @include desktop {
            width: scaling(480);
        }

        @include desktop--small {
            width: scaling(400);
        }

        @include laptop {
            width: scaling(320);
        }

        @include tablet {
            display: none;
        }

        @include mobile {
            display: none;
        }

        img {
            position: sticky;
            top: 0;
            width: 100%;
        }
    }

    &-content {
        flex: 1;
        background-color: $c-white;
    }
}
</style>
