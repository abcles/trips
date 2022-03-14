export const getTrips = state => state.data.trips;
export const getIfLoading = state => state.data.loading;
export const getTotalPages = state => state.data.totalPages;
export const getCurrentPage = state => state.data.currentPage;
export const getTotalItems = state => state.data.totalItems;
export const totalItems = state => state.data.filterQuery;
export const getTripToEdit = state => state.data.tripToEdit;