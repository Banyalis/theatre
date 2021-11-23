<template>
    <div class="AboutInnerPages">
        <component :is="mappedComponents[type]" :content="content" />
    </div>
</template>

<script>
import AboutSpectacle from '@/components/about/AboutSpectacle';
import AboutDocuments from '@/components/about/AboutDocuments';
import AboutListening from '@/components/about/AboutListening';

export default {
    name: 'AboutInnerPages',

    components: {
        AboutSpectacle,
        AboutDocuments,
        AboutListening
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
                press: 'AboutSpectacle',
                documents: 'AboutDocuments',
                listening: 'AboutListening'
            }
        };
    }
};
</script>

<style scoped></style>
