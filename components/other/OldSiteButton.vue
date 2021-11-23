<template>
    <div class="OldSiteButton" :class="{ isUpper }">
        <RoundedButton
            type="isGoldBlack"
            class="OldSiteButton-button"
            :link="{
                title: 'Перейти на старую версию сайта',
                url: 'https://2011.bolshoi.ru/',
                isExternal: true
            }"
        />
    </div>
</template>

<script>
import RoundedButton from '@/components/other/RoundedButton';
import { cookieAgreementVar } from '../../utils/constants.js';

export default {
    name: 'OldSiteButton',

    components: { RoundedButton },

    data() {
        return {
            isUpper: false
        };
    },

    mounted() {
        if (localStorage.getItem(cookieAgreementVar) === null) {
            this.isUpper = true;
        }
    },

    methods: {
        move() {
            this.isUpper = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.OldSiteButton {
    $component: &;

    position: fixed;
    right: scaling(20);
    bottom: scaling(20);
    display: flex;
    align-items: center;
    z-index: 10;
    transition: margin-bottom $d-hover ease-in-out;

    @include mobile {
        display: none;
    }

    &.isUpper {
        margin-bottom: scaling(68);
    }
}
</style>
