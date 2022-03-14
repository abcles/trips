import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTrips, getTotalItems, getIfLoading, getTotalPages, getCurrentPage } from '../redux/selectors';
import { loadTrips, loadMoreTrips, searchTrips } from '../redux/thunks';
import TripInfo from './TripInfo';
import Search from './Search';

const Trips = ({ trips=[], loading=false, totalPages=0, currentPage=0, totalItems=0, startLoadingTrips, onLoadMorePressed, searverSearchPressed }) => {

    let [query, setQuery] = useState("");
    let [sortBy, setSortBy] = useState("price");
    let [orderBy, setOrderBy] = useState("asc");

    const filteredTrips = query === null ? trips : trips.filter(
        item => {
            return (
                item.title.toLowerCase().includes(query.toLowerCase()) ??
                item.blurb.toLowerCase().includes(query.toLowerCase()) ??
                item.description.toLowerCase().includes(query.toLowerCase()) ??
                item.difficulty.toLowerCase().includes(query.toLowerCase()) ??
                item.length.toLowerCase().includes(query.toLowerCase()) ??
                item.price.toString().toLowerCase().includes(query.toLowerCase()) ??
                item.region.toLowerCase().includes(query.toLowerCase())
          )
        }
    ).sort((a, b) => {
        let order = (orderBy === 'asc') ? 1 : -1;
        return (
            (Number.isNaN() ? 
                a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ?
                  -1 * order : 1 * order
                : 
                a[sortBy] < b[sortBy] ?
                -1 * order : 1 * order
            )
        )
    })

    useEffect(() => {
        startLoadingTrips();
    }, []);

    
    let content = 
        loading ? 
        (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
            (filteredTrips && filteredTrips.length > 0) || (query !== null) ? 
            (   
                <div className="container mx-auto mt-3 font-thin">
                    <Search query={query}
                        onQueryChange={myQuery => setQuery(myQuery)}
                        orderBy={orderBy}
                        onOrderByChange={myOrder => setOrderBy(myOrder)}
                        sortBy={sortBy}
                        onSortByChange={mySort => setSortBy(mySort)}
                        onServerSearch={ (myQuery, myOrder, mySort) => searverSearchPressed(myQuery, myOrder, mySort) }
                    />
                    <div className='flex w-full'>
                        <span className='flex-1 inline text-sky-300 text-3xl text-left'>Currently loaded {trips.length} / {totalItems}</span>
                        <span className='flex-none inline'></span>
                        <span className='flex-1 inline text-sky-300 text-3xl text-right'>Currently displayed {filteredTrips.length} / {trips.length}</span>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {filteredTrips?.map(trip => (
                            <TripInfo key={trip.id}
                                trip={trip}
                            />
                        ))}
                    </ul>
                    {
                        (currentPage < totalPages-1) &&
                            <button className='text-sky-300 text-3xl text-center hover:bg-sky-100'  onClick={() => onLoadMorePressed(currentPage+1)}>Load next page {currentPage+2} / {totalPages}</button>
                    }
               
                </div>
            )
            :
            (
                <p>
                    <em>No trips returned...</em>
                </p>
            )
        );

    return content;
}

const mapStateToProps = state => ({
    trips: getTrips(state),
    totalItems: getTotalItems(state),
    loading: getIfLoading(state),
    totalPages: getTotalPages(state),
    currentPage: getCurrentPage(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingTrips: () => dispatch(loadTrips()),
    onLoadMorePressed: (page) => dispatch(loadMoreTrips(page)),
    searverSearchPressed: (query, order, sort) => dispatch(searchTrips(query, order, sort)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Trips);