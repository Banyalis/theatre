<template>
    <div class="AboutYouth">
        <AboutYouthContent :content="content.content" />
        <AboutYouthSidebar ref="sidebar" :sidebar="content.sidebar" />
    </div>
</template>

<script>
import { isDesktopSmall } from '@/utils/utils';
import AboutYouthContent from '~/components/about/AboutYouthContent';
import AboutYouthSidebar from '~/components/about/AboutYouthSidebar';

export default {
    name: 'AboutYouth',

    components: {
        AboutYouthContent,
        AboutYouthSidebar
    },

    props: {
        content: {
            type: Object,
            required: true
        }
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.$nextTick(this.onResize);
    },

    updated() {
        this.$nextTick(this.onResize);
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            const sectionHeader = this.$el.querySelector(
                '.AboutYouthContent-sectionHeader'
            );
            const contacts = this.$el.querySelector('.AboutYouthContacts');
            const getContactsMargin = parseInt(
                window
                    .getComputedStyle(contacts, null)
                    .getPropertyValue('margin-top'),
                10
            );
            const getIndentPage =
                sectionHeader.offsetHeight +
                contacts.offsetHeight +
                getContactsMargin;
            const sidebarHeight = this.$refs.sidebar.$el.offsetHeight;

            if (!isDesktopSmall()) {
                this.$refs.sidebar.$el.style.top = `${getIndentPage}px`;
                contacts.style.marginBottom = `${sidebarHeight}px`;
            } else {
                this.$refs.sidebar.$el.removeAttribute('style');
                contacts.removeAttribute('style');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutYouth {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    position: relative;
}
</style>
