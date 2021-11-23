<template>
    <div class="ConcertBody">
        <div class="ConcertBody-info">
            <ConcertInfo :concert="concert" />
        </div>
        <div class="ConcertBody-program">
            <ConcertProgram
                v-if="concert.program"
                :program="concert.program"
                :structure="concert.structure"
            />
        </div>
        <div class="ConcertBody-schedule">
            <ConcertTickets :tickets="concert.tickets" />
        </div>
    </div>
</template>

<script>
import ConcertInfo from '@/components/concert/ConcertInfo';
import ConcertProgram from '@/components/concert/ConcertProgram';
import ConcertTickets from '@/components/concert/ConcertTickets';

export default {
    name: 'ConcertBody',

    components: {
        ConcertInfo,
        ConcertProgram,
        ConcertTickets
    },

    props: {
        concert: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.ConcertBody {
    width: 100%;

    &-program {
        width: 100%;
    }

    &-schedule {
        width: 100%;
    }
}
</style>
