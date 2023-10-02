<template>
  <div class="home">
    <div id="heading-line">
      <h1>
        Delete Reservation
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>
    </div>
    <reservation-details v-bind:reservation="reservation" />
    <hr />
    Are you sure you want to delete this reservation?<br /><br />
    <button id="delete-button" v-on:click="deleteReservation">
      <font-awesome-icon icon="fa-solid fa-trash-can" /> Delete</button
    >&nbsp;
    <button v-on:click="listReservations">Cancel</button>
  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ReservationDetails from "../components/ReservationDetails.vue";
//step 5.2
import hotelService from "../services/HotelService";
export default {
  name: "ReservationDeleteView",
  components: {
    LoadingSpinner,
    ReservationDetails,
  },
  data() {
    return {
      isLoading: false, // true to indicate a call in progress
      reservation: {}, // the reservation to be deleted by this view
    };
  },

  methods: {
    getReservation(id) {
      console.log(id); // prevents a "no-unused-vars" error
      // Set the indicator that a call is in progress.
      this.isLoading = true;

      // TODO 5.3: Use the Service object to `GET /reservations/{id}`. Set the body of the result to `this.reservation`. Handle errors.
      hotelService
        .getReservationById(id)
        .then((response) => {
          this.reservation = response.data;
      // When done (whether success or error) set the indicator that the call is complete.
      this.isLoading = false;
      })
      .catch(error => {
        if (error.response.status == 404) {
          this.isLoading = false;
          alert(error);
        }
      });
    },
    deleteReservation() {
      // Set the indicator that a call is in progress.
      this.isLoading = true;

      // TODO 5.4: Use the Service object to `DELETE /reservations/{id}`. When done, call listReservations() to navigate to Hotel Details. Handle errors.
      hotelService
        .deleteReservation(this.reservation.id)
        .then(() => {
      // When done (whether success or error) set the indicator that the call is complete.
      this.isLoading = false;
      this.listReservations();
      })
      .catch(error => {
        if (error.response.status == 404) {
          this.isLoading = false;
          alert(error);
        }
      });
    },

    listReservations() {
      // Navigate to the Hotel Details page, with a parameter that says to display reservations too.
      this.$router.push({
        name: "hotel",
        params: { id: this.reservation.hotelId },
        query: { showRes: true },
      });
    },
  },

  // TODO 5.5: Create a Vue Lifecycle hook function which calls `this.getReservation()`, passing in the `id` path parameter.
created() {
    this.getReservation(this.$route.params.id);
  },
};
</script>

<style scoped>
#delete-button:hover {
  color: red;
}
</style>