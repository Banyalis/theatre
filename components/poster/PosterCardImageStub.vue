<template>
    <div
        v-if="item.scene && item.scene.type === 'new'"
        class="PosterCardImageStub PosterCardImageStub--new"
    >
        <svg-icon name="icon-stub-new" />
    </div>
    <div
        v-else-if="item.scene && item.scene.type === 'chamber'"
        class="PosterCardImageStub PosterCardImageStub--chamber"
    >
        <svg-icon name="icon-stub-chamber" />
    </div>
    <div
        v-else-if="item.scene && item.scene.type === 'historical'"
        class="PosterCardImageStub PosterCardImageStub--historical"
    >
        <svg-icon name="icon-stub-historical" />
    </div>
    <div
        v-else-if="item.scene && item.scene.type === 'beethoven'"
        class="PosterCardImageStub PosterCardImageStub--beethoven"
    >
        <svg-icon name="icon-stub-beethoven" />
    </div>
</template>

<script>
export default {
    name: 'PosterCardImageStub',

    props: {
        item: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PosterCardImageStub {
    $component: &;

    width: 100%;
    height: 100%;

    &--new svg {
        stroke: #649e37;
    }

    &--chamber svg {
        stroke: #55a2ea;
    }

    &--historical svg {
        stroke: #e37d8f;
    }

    &--beethoven svg {
        stroke: #bf67ab;
    }

    svg {
        width: 100%;
        height: 100%;
    }
}
</style>
