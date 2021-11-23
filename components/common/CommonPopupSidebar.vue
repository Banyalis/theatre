<template>
    <div class="CommonPopupSidebar">
        <div ref="sidebarInner" class="CommonPopupSidebar-inner">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { isLaptop } from '@/utils/utils';

export default {
    name: 'CommonPopupSidebar',

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.$nextTick(this.onResize);
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            this.setSidebarIndent();
            this.setSidebarHeight();
        },

        setSidebarIndent() {
            if (isLaptop()) {
                const headHeight =
                    document.querySelector('.CommonPopupHead').offsetHeight;

                this.$el.style.marginTop = `${headHeight}px`;
            } else {
                this.$el.style.marginTop = '0';
            }
        },

        setSidebarHeight() {
            if (!isLaptop()) {
                this.$refs.sidebarInner.style.height = `${window.innerHeight}px`;
            } else {
                this.$refs.sidebarInner.style.height = 'auto';
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonPopupSidebar {
    $component: &;

    position: sticky;
    top: 0;
    background-color: rgba($c-black, 0.6);
    backdrop-filter: blur(30px);

    @include tablet {
        position: relative;
        background-color: $c-black--header;
        backdrop-filter: none;
    }

    @include mobile {
        position: relative;
        background-color: $c-black--header;
        backdrop-filter: none;
    }

    &-inner {
        @include m-scrollbarHidden;

        overflow-y: auto;
    }
}
</style>
