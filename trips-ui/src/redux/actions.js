export const LOAD_TRIPS_IN_PROGRESS = 'LOAD_TRIPS_IN_PROGRESS';
export const LOAD_TRIPS_ERROR = 'LOAD_TRIPS_ERROR';
export const LOAD_TRIPS_SUCCESS = 'LOAD_TRIPS_SUCCESS';
export const SEARCH_TRIPS = 'SEARCH_TRIPS';
export const DELETE_TRIP = 'DELETE_TRIP';
export const CREATE_TRIP = 'CREATE_TRIP';
export const EDIT_TRIP = 'EDIT_TRIP';
export const GO_TO_EDIT_TRIP = 'GO_TO_EDIT_TRIP';

export const loadTripsInProgress = payload => ({
    type: LOAD_TRIPS_IN_PROGRESS,
    payload
});

export const loadTripsError = payload => ({
    type: LOAD_TRIPS_ERROR,
    payload
});

export const loadTripsSuccess = payload => ({
    type: LOAD_TRIPS_SUCCESS,
    payload
});

export const searchTripsAction = payload => ({
    type: SEARCH_TRIPS,
    payload
});

export const deleteTripAction = payload => ({
    type: DELETE_TRIP,
    payload
});

export const createTripAction = payload => ({
    type: CREATE_TRIP,
    payload
});

export const editTripAction = payload => ({
    type: EDIT_TRIP,
    payload
});

export const goToEditTripAction = payload => ({
    type: GO_TO_EDIT_TRIP,
    payload
});