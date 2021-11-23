<template>
    <div class="PartnersSponsors">
        <PartnersSponsorsImportants :importants="content.importants" />
        <PartnersSponsorsList :sponsors="content.sponsors" />
        <PartnersSponsorsSupports :supports="content.supports" />
    </div>
</template>

<script>
import PartnersSponsorsImportants from '~/components/partners/PartnersSponsorsImportants';
import PartnersSponsorsList from '~/components/partners/PartnersSponsorsList';
import PartnersSponsorsSupports from '~/components/partners/PartnersSponsorsSupports';

export default {
    name: 'PartnersSponsors',

    components: {
        PartnersSponsorsImportants,
        PartnersSponsorsList,
        PartnersSponsorsSupports
    },

    props: {
        content: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PartnersSponsors {
    $component: &;

    overflow: hidden;
}
</style>
