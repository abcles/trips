package abc.les.trips.repository;

import abc.les.trips.model.Trip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TripRepository extends MongoRepository<Trip, String> {

    Page<Trip> findAll(Pageable pageable);
    Page<Trip> findByTitleContainingIgnoreCase(String filterFor, Pageable pageable);
    Page<Trip> findByBlurbContainingIgnoreCase(String filterFor, Pageable pageable);
    Page<Trip> findByDescriptionContainingIgnoreCase(String filterFor, Pageable pageable);
    Page<Trip> findByBulletsContainingIgnoreCase(String filterFor, Pageable pageable);
    Page<Trip> findByDifficultyContainingIgnoreCase(String filterFor, Pageable pageable);
    Page<Trip> findByRegionContainingIgnoreCase(String filterFor, Pageable pageable);
    Page<Trip> findByKeywordsContainingIgnoreCase(String filterFor, Pageable pageable);
    Page<Trip> findByPrice(String filterFor, Pageable pageable);
    Page<Trip> findByLength(String filterFor, Pageable pageable);
    Page<Trip> findByIdContainingIgnoreCase(String filterFor, Pageable pageable);
    /*void addTrip(Trip trip);
    /*void updateTrip(String tripId, Trip trip);
    void deleteTrip(String tripId);*/
    long count();
}