import axios from 'axios';
import {
    loadTripsInProgress,
    loadTripsSuccess,
    loadTripsError,
    searchTripsAction,
    deleteTripAction,
    createTripAction,
    editTripAction,
    goToEditTripAction
} from './actions';
import { toast } from "react-toastify";

export const loadTrips = () => async (dispatch) => {
    try {
        dispatch(loadTripsInProgress());       
        const response = await axios.get('http://localhost:8081/api/trips');
        //console.log(response?.data?.trips);
        const trips = response?.data?.trips;
        const totalItems = response?.data?.totalItems;
        const totalPages = response?.data?.totalPages;
        const currentPage = response?.data?.currentPage;
        dispatch(loadTripsSuccess({ trips, totalItems, totalPages, currentPage }));
    } catch (e) {
        dispatch(loadTripsError(e));
        toast.error("An error has occured: " + e);
    }
}

export const loadMoreTrips = (page) => async (dispatch) => {
    try {
        dispatch(loadTripsInProgress());       
        const response = await axios.get('http://localhost:8081/api/trips?page=' + page);
        //console.log(response?.data?.trips);
        const trips = response?.data?.trips;
        const totalItems = response?.data?.totalItems;
        const totalPages = response?.data?.totalPages;
        const currentPage = response?.data?.currentPage;
        dispatch(loadTripsSuccess({ trips, totalItems, totalPages, currentPage }));
    } catch (e) {
        dispatch(loadTripsError(e));
        toast.error("An error has occured: " + e);
    }
}

export const searchTrips = (query, order, sort) => async (dispatch) => {
    try {
        dispatch(loadTripsInProgress());       
        const response = await axios.get('http://localhost:8081/api/trips?filterFor=' + query + "&filterBy=title");
        //console.log(response?.data?.trips);
        const trips = response?.data?.trips;
        const totalItems = response?.data?.totalItems;
        const totalPages = response?.data?.totalPages;
        const currentPage = response?.data?.currentPage;
        dispatch(searchTripsAction({ trips, totalItems, totalPages, currentPage }));
    } catch (e) {
        toast.error("An error has occured: " + e);
    }
}

export const deleteTrip = (tripId) => async (dispatch) => {
    try {
        dispatch(loadTripsInProgress());       
        const response = await axios.delete('http://localhost:8081/api/trips?tripId=' + tripId);
        //console.log(response);
        if (response.status === 200) {
            dispatch(deleteTripAction(tripId));
        } else {
            toast.error("The trip wasn't deleted because the response status is " + response.status);
        }
    } catch (e) {
        toast.error("An error has occured: " + e);
    }
}

export const createTrip = (formData) => async (dispatch) => {
    try {    
        const response = await axios.post('http://localhost:8081/api/trips', formData);
        if (response.status === 200) {
            const trip = response?.data?.trip;
            dispatch(createTripAction({ trip }));
            toast.success("The trip has been created!", { progress: false, autoClose: 2000, draggable: true });
        } else {
            toast.error("The trip wasn't created because the response status is " + response.status);
        }
    } catch (e) {
        toast.error("An error has occured: " + e.message);
    }
}

export const editTrip = (tripId, formData) => async (dispatch) => {
    try {    
        const response = await axios.put('http://localhost:8081/api/trips?tripId=' + tripId, formData);
        if (response.status === 200) {
            const trip = response?.data?.trip;
            dispatch(editTripAction({ trip }));
            toast.success("The trip has been updated!", { progress: false, autoClose: 2000, draggable: true });
            dispatch(goToEditTripAction({trip: null}));
        } else {
            toast.error("The trip wasn't created because the response status is " + response.status);
        }
    } catch (e) {
        toast.error("An error has occured: " + e.message);
    }
}

export const goToEditTrip = (trip) => async (dispatch) => {
    try {    
        dispatch(goToEditTripAction({ trip }));
    } catch (e) {
        toast.error("An error has occured: " + e.message);
    }
}
