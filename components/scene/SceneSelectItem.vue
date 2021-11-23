<template>
    <div class="SceneSelectItem">
        <div class="SceneSelectItem-description">
            <div class="SceneSelectItem-title" v-text="title"></div>
            <div class="SceneSelectItem-address" v-text="address"></div>
        </div>
        <div class="SceneSelectItem-image">
            <picture>
                <source
                    v-if="image2x"
                    :srcset="require(`~/assets/images/scene/${image2x}`)"
                />
                <img :src="require(`~/assets/images/scene/${image}`)" alt="" />
            </picture>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SceneSelectItem',

    props: {
        title: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        image2x: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
.SceneSelectItem {
    $component: &;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    height: 100%;
    overflow: hidden;
    cursor: pointer;

    @include hover {
        &:hover #{$component}-title {
            color: $c-red;
        }
    }

    &-description {
        position: relative;
        top: scaling(100);
        padding: 0 scaling(30) scaling(60);

        @include desktop--large {
            padding: 0 scaling(40) scaling(80);
        }

        @include desktop--small {
            top: scaling(80);
        }

        @include laptop {
            top: scaling(50);
        }

        @include tablet {
            top: scaling(40);
            padding: 0 scaling(40) scaling(40);
        }

        @include mobile {
            top: scaling(15);
            padding: 0 scaling(20) scaling(70);
        }
    }

    &-title {
        @include title;

        text-align: center;
        margin: 0 auto scaling(16);
        word-spacing: scaling(9999);
        transition: color $d-hover;

        @include mobile {
            text-align: left;
            margin: 0 0 scaling(16);
        }
    }

    &-address {
        @include text;

        text-align: center;
        color: $c-gray;

        @include mobile {
            text-align: left;
        }
    }

    &-image {
        max-width: scaling(440);
        align-self: flex-end;

        @include desktop {
            max-width: scaling(320);
        }

        @include desktop--small {
            max-width: scaling(244);
        }

        @include laptop {
            max-width: scaling(188);
        }

        @include tablet {
            max-width: scaling(232);
        }

        @include mobile {
            max-width: scaling(112);
        }

        picture {
            display: flex;

            img {
                width: 100%;
            }
        }
    }

    &.isSelected {
        background-color: $c-navy;

        #{$component}-title {
            color: $c-white;
        }

        #{$component}-address {
            color: $c-white;
        }
    }
}
</style>
