import {
    LOAD_TRIPS_IN_PROGRESS,
    LOAD_TRIPS_ERROR,
    LOAD_TRIPS_SUCCESS,
    SEARCH_TRIPS,
    DELETE_TRIP,
    CREATE_TRIP,
    EDIT_TRIP,
    GO_TO_EDIT_TRIP,
} from './actions';

const INITIAL_STATE = {
    loading: false,
    failed: false,
    error: null,
    trips: [],
    totalPages: 0,
    currentPage: 0,
    totalItems: 0,
    editedTrip: null,
}

export const tripsReducers = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case LOAD_TRIPS_IN_PROGRESS:
            return {
                ...state,
                loading: true
            };

        case LOAD_TRIPS_ERROR:
            return {
                ...state,
                loading: false,
                failed: true,
                error: action.payload
            };

        case LOAD_TRIPS_SUCCESS:
            // concatenate ...state.trips and ...action.payload.trips
            let uniqueTrips = [];
            if (state.trips) { uniqueTrips = state.trips }
            action.payload.trips.map(trip => {
                const index = uniqueTrips.findIndex(tr => tr.id === trip.id);
                if (index === -1) {
                    uniqueTrips.push(trip);
                }
                return uniqueTrips;
            });
            return {
                ...state,
                loading: false,
                failed: false,
                trips: uniqueTrips,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                totalItems: action.payload.totalItems,
            };

        case SEARCH_TRIPS:
            // replace ...state.trips with ...action.payload.trips
            return {
                ...state,
                loading: false,
                failed: false,
                trips: action.payload.trips,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                totalItems: action.payload.totalItems,
            };

        case DELETE_TRIP:
            return {
                ...state,
                loading: false,
                trips: [...state.trips.filter(trip => trip.id !== action.payload)],
                totalItems: state.totalItems - 1,
            };

        case CREATE_TRIP:
            // concatenate ...state.trips and action.payload.trip
            let uniqueTripsCreate = [];
            if (state.trips) { uniqueTripsCreate = state.trips }
            const indexCreate = uniqueTripsCreate.findIndex(tr => tr.id === action.payload.trip.id);
            if (indexCreate === -1) {
                uniqueTripsCreate.push(action.payload.trip);
            }
            return {
                ...state,
                loading: false,
                trips: uniqueTripsCreate,
                totalItems: state.totalItems + 1,
            };
        
        case EDIT_TRIP:
            // replace action.payload.trip in ...state.trips
            let uniqueTripsEdit = [];
            if (state.trips) { uniqueTripsEdit = state.trips }
            const indexEdit = uniqueTripsEdit.findIndex(tr => tr.id === action.payload.trip.id);
            if (indexEdit !== -1) {
                uniqueTripsEdit[indexEdit] = action.payload.trip;
            }
            return {
                ...state,
                loading: false,
                trips: uniqueTripsEdit,
                totalItems: state.totalItems + 1,
            };
        
        case GO_TO_EDIT_TRIP:
            return { 
                ...state,
                tripToEdit: action.payload.trip
            };

        default:    
            return state;
    }
}