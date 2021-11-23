<template>
    <div class="AboutBuildingSidebar">
        <div class="AboutBuildingSidebar-walk">
            <div class="AboutBuildingSidebar-walkImage">
                <picture>
                    <source
                        srcset="
                            ~assets/images/about/walk.png    1x,
                            ~assets/images/about/walk@2x.png 2x
                        "
                    />
                    <img src="~assets/images/about/walk.png" />
                </picture>
            </div>
            <div class="AboutBuildingSidebar-walkInner">
                <div
                    class="AboutBuildingSidebar-walkTitle"
                    v-text="`Прогулка по историческому зданию`"
                ></div>
                <RoundedButton
                    class="AboutBuildingSidebar-walkButton"
                    :link="{
                        title: 'Подробности',
                        url: '/'
                    }"
                    type="isRed"
                />
            </div>
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/other/RoundedButton';

export default {
    name: 'AboutBuildingSidebar',

    components: {
        RoundedButton
    }
};
</script>

<style lang="scss" scoped>
.AboutBuildingSidebar {
    $component: &;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: none;
    border-left: 1px solid $c-black;
    background-color: $c-gold--lighten;

    @include desktop--large {
        display: block;
        width: (480 * 100% / 1920);
    }

    @include desktop {
        display: block;
        width: (360 * 100% / 1440);
    }

    @include desktop--small {
        display: block;
        width: (300 * 100% / 1200);
    }

    &-walk {
        background-color: $c-black;

        &Image {
            @include desktop--large {
                @include m-aspectRatio(480, 672);
            }

            @include desktop {
                @include m-aspectRatio(360, 496);
            }

            @include desktop--small {
                @include m-aspectRatio(300, 413);
            }

            img {
                @include m-absoluteObjectFit();
            }
        }

        &Inner {
            @include desktop--large {
                padding: 0 scaling(36) scaling(33);
            }

            @include desktop {
                padding: 0 scaling(28) scaling(24);
            }

            @include desktop--small {
                padding: 0 scaling(24) scaling(20);
            }
        }

        &Title {
            margin-bottom: scaling(32);
            color: $c-white;
            font-size: scaling(36);
            line-height: $lh-130;
            text-transform: uppercase;
            font-feature-settings: 'ss02' on;

            @include desktop {
                margin-bottom: scaling(24);
                font-size: scaling(28);
            }

            @include desktop--small {
                margin-bottom: scaling(20);
                font-size: scaling(24);
            }
        }

        &Button {
            @include hover {
                &:hover {
                    background-color: $c-white !important;
                    color: $c-black !important;
                }
            }
        }
    }
}
</style>
