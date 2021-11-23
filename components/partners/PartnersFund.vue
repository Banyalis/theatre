<template>
    <div class="PartnersFund">
        <div class="PartnersFund-content">
            <PartnersHead ref="head" :head="content.head" />
            <PartnersContacts ref="contacts" :contacts="content.contacts" />
            <PartnersFundRequisites :requisites="content.requisites" />
        </div>
        <div ref="sidebar" class="PartnersFund-sidebar">
            <PartnersMembers :members="content.members" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { isDesktopSmall } from '~/utils/utils';
import PartnersHead from '~/components/partners/PartnersHead';
import PartnersContacts from '~/components/partners/PartnersContacts';
import PartnersFundRequisites from '~/components/partners/PartnersFundRequisites';
import PartnersMembers from '~/components/partners/PartnersMembers';

export default {
    name: 'PartnersFund',

    components: {
        PartnersHead,
        PartnersContacts,
        PartnersFundRequisites,
        PartnersMembers
    },

    props: {
        content: {
            type: Object,
            required: true
        }
    },

    computed: {
        ...mapState(['headerHeight'])
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.$nextTick(this.onResize);
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            this.sidebarHeight = this.$refs.sidebar.offsetHeight;
            this.getTopIndent =
                this.$refs.head.$el.offsetHeight +
                this.$refs.contacts.$el.offsetHeight;

            this.setTopIndentSidebar();
        },

        setTopIndentSidebar() {
            if (isDesktopSmall()) {
                this.$refs.contacts.$el.removeAttribute('style');
                this.$refs.sidebar.style.top = `${this.headerHeight}px`;
                this.$refs.sidebar.style.height =
                    window.innerHeight - this.headerHeight + 'px';
            } else {
                this.$refs.contacts.$el.style.marginBottom = `${this.sidebarHeight}px`;
                this.$refs.sidebar.style.top = `${this.getTopIndent}px`;
                this.$refs.sidebar.style.height = 'auto';
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.PartnersFund {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    position: relative;

    &-content {
        width: 100%;

        @include desktop--large {
            width: (1440 * 100% / 1920);
            border-right: 1px solid $c-black;
        }

        @include desktop {
            width: (1080 * 100% / 1440);
            border-right: 1px solid $c-black;
        }

        @include desktop--small {
            width: (900 * 100% / 1200);
            border-right: 1px solid $c-black;
        }
    }

    &-sidebar {
        position: absolute;
        width: 100%;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }

        @include desktop--large {
            width: (480 * 100% / 1920);
            padding: scaling(100) scaling(32);
            position: sticky;
            background-color: $c-gray-95;
            overflow-y: auto;
        }

        @include desktop {
            width: (360 * 100% / 1440);
            padding: scaling(80) scaling(24);
            position: sticky;
            background-color: $c-gray-95;
            overflow-y: auto;
        }

        @include desktop--small {
            width: (300 * 100% / 1200);
            padding: scaling(60) scaling(20);
            position: sticky;
            background-color: $c-gray-95;
            overflow-y: auto;
        }

        @include mobile {
            border-top: 1px solid $c-black;
            padding: scaling(32) scaling(16) scaling(40);
        }
    }
}
</style>
