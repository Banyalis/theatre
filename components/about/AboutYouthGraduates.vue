<template>
    <div class="AboutYouthGraduates">
        <div class="AboutYouthGraduates-list">
            <div
                v-for="(item, index) in graduates"
                :key="index"
                class="AboutYouthGraduates-listItem"
            >
                <AboutYouthMember :member="item" />
            </div>
        </div>
        <RoundedButton
            :link="{
                title: 'Показать еще',
                url: '/people/operatic/youth'
            }"
            type="isTransparentBlack"
            class="AboutYouthGraduates-button"
        />
    </div>
</template>

<script>
import RoundedButton from '@/components/other/RoundedButton';
import AboutYouthMember from '~/components/about/AboutYouthMember';

export default {
    name: 'AboutYouthGraduates',

    components: {
        RoundedButton,
        AboutYouthMember
    },

    props: {
        graduates: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutYouthGraduates {
    $component: &;

    display: flex;
    flex-direction: column;
    align-items: center;
    margin: scaling(36) 0 scaling(72);

    @include desktop--large {
        margin: scaling(64) 0 scaling(120);
    }

    @include desktop {
        margin: scaling(48) 0 scaling(100);
    }

    @include desktop--small {
        margin: scaling(40) 0 scaling(80);
    }

    @include mobile {
        align-items: flex-start;
        margin: scaling(40) 0 scaling(64);
    }

    &-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
        margin-bottom: scaling(24);
        padding: scaling(28) 0;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;

        @include desktop--large {
            grid-template-columns: repeat(3, 1fr);
            grid-gap: scaling(20) scaling(64);
            margin-bottom: scaling(40);
            padding: scaling(48) 0;
        }

        @include desktop {
            grid-template-columns: repeat(3, 1fr);
            grid-gap: scaling(16) scaling(54);
            margin-bottom: scaling(32);
            padding: scaling(40) 0;
        }

        @include desktop--small {
            grid-gap: scaling(12) scaling(80);
            margin-bottom: scaling(28);
            padding: scaling(32) 0;
        }

        @include laptop {
            grid-gap: scaling(12) scaling(64);
        }

        @include tablet {
            grid-gap: scaling(12) scaling(32);
        }

        @include mobile {
            grid-template-columns: repeat(1, 1fr);
            grid-gap: scaling(12) 0;
            margin-bottom: scaling(20);
            padding: scaling(24) 0;
        }
    }
}
</style>
