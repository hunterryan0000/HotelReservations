import axios from 'axios';
const http = axios.create({
  baseURL: "http://localhost:9000"
});

/**
 * This service class is used to interact with the Hotels/Reservations API.
 * All methods return a Promise so that the calling code can handle both success and 
 * error responses appropriately. 
 */
export default {
  // TODO step 1: Add any Axios calls to the API as functions in this service object
  getHotels() {
    return http.get('/hotels');
  },

  getStates() {
    return http.get('/hotels/states');
  },

  searchHotels(stateCode) {
    return http.get('/hotels?state=' + stateCode);
  },
//TODO step 2:
  getHotelById(hotelId) {
    return http.get(`/hotels/${hotelId}`);
  },

  getReservationsByHotel(hotelId) {
    return axios.get(`/hotels/${hotelId}/reservations`);
  },

  //TODO step 3:
  addReservation(reservation) {
    return axios.post(`/reservations`, reservation);
  },

  //TODO step 4:
  getReservationById(reservationId) {
    return axios.get(`/reservations/${reservationId}`);
  },

  updateReservation(reservation) {
    return axios.put(`/reservations/${reservation.id}`, reservation);
  },

  //TODO: step 5:

  deleteReservation(reservationId) {
    return axios.delete(`/reservations/${reservationId}`);
  },

}
