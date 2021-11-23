<template>
    <div class="ConcertTickets">
        <ConcertTitle :title="`Расписание и билеты`" />
        <div class="ConcertTickets-items">
            <ConcertTicket
                v-for="(ticket, index) in tickets"
                :key="index"
                :ticket="ticket"
            />
        </div>
    </div>
</template>

<script>
import ConcertTitle from '@/components/concert/ConcertTitle';
import ConcertTicket from '@/components/concert/ConcertTicket';

export default {
    name: 'ConcertTickets',

    components: {
        ConcertTicket,
        ConcertTitle
    },

    props: {
        tickets: {
            type: Array,
            required: true
        }
    }
};
</script>

<style scoped></style>
