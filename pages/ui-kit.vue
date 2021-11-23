<template>
    <div class="StyleGuide">
        <div class="StyleGuide-wrapper b-paddings">
            <div class="StyleGuide-container">
                <div class="StyleGuide-title" v-text="`RoundedButton`"></div>
                <div class="StyleGuide-blocks buttons">
                    <div class="StyleGuide-block">
                        <div
                            class="StyleGuide-blockTitle"
                            v-text="`isRed:`"
                        ></div>
                        <RoundedButton
                            title="Кнопка c onClick"
                            type="isRed"
                            @click="onButtonClick"
                        />
                    </div>
                    <div class="StyleGuide-block">
                        <div
                            class="StyleGuide-blockTitle"
                            v-text="`isBlack:`"
                        ></div>
                        <RoundedButton
                            :link="{
                                title: 'Ссылка',
                                url: '/ui-kit',
                                isExternal: true
                            }"
                            type="isBlack"
                        />
                    </div>
                    <div class="StyleGuide-block">
                        <div
                            class="StyleGuide-blockTitle"
                            v-text="`isTransparentBlack:`"
                        ></div>
                        <RoundedButton
                            title="Кнопка"
                            type="isTransparentBlack"
                        />
                    </div>
                    <div class="StyleGuide-block">
                        <div
                            class="StyleGuide-blockTitle"
                            v-text="`isTransparentWhite:`"
                        ></div>
                        <RoundedButton
                            title="Кнопка"
                            type="isTransparentWhite"
                        />
                    </div>
                    <div class="StyleGuide-block">
                        <div
                            class="StyleGuide-blockTitle"
                            v-text="`isWhite:`"
                        ></div>
                        <RoundedButton title="Кнопка" type="isWhite" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/other/RoundedButton';
export default {
    components: { RoundedButton },

    methods: {
        onButtonClick() {
            alert('Тыкнули на кнопку');
        }
    }
};
</script>

<style lang="scss" scoped>
.StyleGuide {
    $component: &;

    width: 100%;
    position: relative;
    background: $c-gray-80;

    &-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 100px;
        padding-bottom: 100px;
    }

    &-container {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    &-title {
        @include title--block;

        color: $c-black;
        width: 100%;
        text-align: center;
        display: flex;
        flex: 0 0 auto;
    }

    &-blocks {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;

        &.buttons > * {
            width: 200px;

            &:first-child {
                width: 300px;
            }
        }
    }

    &-block {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        margin-top: 40px;

        &Title {
            @include text;

            color: $c-black;
            margin-bottom: 20px;
        }
    }
}
</style>
