<template>
    <div class="IndexEvents">
        <div class="IndexEvents-wrapper">
            <CommonSliderCards
                title="Ближайшие события"
                :list="events"
                component-item="IndexEventCard"
                :breakpoints="breakpoints"
            />
        </div>
    </div>
</template>

<script>
import CommonSliderCards from '~/components/common/CommonSliderCards';

export default {
    name: 'IndexEvents',
    components: { CommonSliderCards },
    props: {
        events: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            breakpoints: {
                320: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 3
                },
                1200: {
                    slidesPerView: 4
                }
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.IndexEvents {
    $component: &;

    width: 100%;
    height: 100%;
    position: relative;

    &-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
    }
}
</style>
