<template>
    <div class="SceneSelectPopup">
        <div class="SceneSelectPopup-items">
            <div
                v-for="(scene, index) in SCENES_CHOICES"
                :key="index"
                class="SceneSelectPopup-item"
                @click="handleScene(scene.id, scene.name)"
            >
                <SceneSelectItem
                    :title="scene.name"
                    :address="scene.address"
                    :image="scene.img"
                    :image2x="scene.img2x"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { debounce } from 'debounce';
import { mapMutations, mapActions } from 'vuex';
import { SCENES_CHOICES } from '@/utils/constants';
import SceneSelectItem from '~/components/scene/SceneSelectItem';

export default {
    name: 'SceneSelectPopup',

    components: {
        SceneSelectItem
    },

    data() {
        return {
            SCENES_CHOICES
        };
    },

    mounted() {
        this.getSceneDebounce = debounce(this.getTimetableAction, 100);
    },

    methods: {
        async handleScene(id, name) {
            this.setSceneFilter({
                sceneId: id,
                sceneName: name
            });

            await this.getSceneDebounce(this.$route.params.slug);

            this.$emit('close');
        },

        ...mapMutations({
            setSceneFilter: 'timetable/setSceneFilter'
        }),

        ...mapActions({
            getTimetableAction: 'timetable/getTimetableAction'
        })
    }
};
</script>

<style lang="scss" scoped>
.SceneSelectPopup {
    display: flex;
    flex-direction: column;
    background-color: $c-white;

    &-items {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        position: relative;
    }

    &-item {
        width: (100% / 4);

        &:not(:last-child) {
            border-right: 1px solid $c-black;
        }

        @include tablet {
            width: (100% / 2);

            &:nth-child(2n) {
                border-right: none;
            }

            &:first-child,
            &:nth-child(2) {
                border-bottom: 1px solid $c-black;
            }
        }

        @include mobile {
            width: 100%;
            border-right: none;

            &:not(:last-child) {
                border-bottom: 1px solid $c-black;
            }
        }
    }
}
</style>
