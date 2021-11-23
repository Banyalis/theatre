<template>
    <div class="SeasonContent">
        <component :is="mappedComponents[type]" :content="content" />
    </div>
</template>

<script>
import SeasonPremiers from '~/components/season/SeasonPremiers';
import SeasonOpera from '~/components/season/SeasonOpera';
import SeasonBallet from '~/components/season/SeasonBallet';
import SeasonConcert from '~/components/season/SeasonConcert';
import SeasonGastroli from '~/components/season/SeasonGastroli';
import SeasonGuest from '~/components/season/SeasonGuest';

export default {
    name: 'SeasonsContent',

    components: {
        SeasonPremiers,
        SeasonOpera,
        SeasonBallet,
        SeasonConcert,
        SeasonGastroli,
        SeasonGuest
    },

    props: {
        type: {
            type: String,
            required: true
        },

        content: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            mappedComponents: {
                premieres: 'SeasonPremiers',
                opera: 'SeasonOpera',
                ballet: 'SeasonBallet',
                concert: 'SeasonConcert',
                tour: 'SeasonGastroli',
                guest: 'SeasonGuest'
            }
        };
    }
};
</script>

<style lang="scss">
.SeasonContent {
    display: flex;
    width: 100%;
}
</style>
