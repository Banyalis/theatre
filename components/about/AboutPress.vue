<template>
    <div class="AboutPress">
        <AboutPressInfo :info="content.content.info" />
        <AboutPressGallery :gallery="content.content.gallery" />
    </div>
</template>

<script>
import AboutPressInfo from '@/components/about/AboutPressInfo';
import AboutPressGallery from '@/components/about/AboutPressGallery';

export default {
    name: 'AboutPress',

    components: { AboutPressGallery, AboutPressInfo },

    props: {
        content: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped></style>
