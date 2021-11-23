<template>
    <div class="SeasonInnerPages">
        <component :is="mappedComponents[type]" :content="content" />
    </div>
</template>

<script>
import Gastroli from '@/components/gastroli/Gastroli';
import Concert from '@/components/concert/Concert';

export default {
    name: 'SeasonInnerPages',

    components: {
        Gastroli,
        Concert
    },

    props: {
        type: {
            type: String,
            required: true
        },

        content: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            mappedComponents: {
                concert: 'Concert',
                tour: 'Gastroli'
            }
        };
    }
};
</script>

<style scoped></style>
