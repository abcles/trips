package abc.les.trips.controller;

import abc.les.trips.model.Trip;
import abc.les.trips.repository.TripRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/trips")
public class TripController {

    public final static String DEFAULT_PAGE_SIZE = "10";
    public final static String DEFAULT_PAGE_INDEX = "0";
    public final static String DEFAULT_SORT = "title";

    @Autowired
    private TripRepository tripRepository;

    public TripController(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllTrips(
            @RequestParam(defaultValue = DEFAULT_PAGE_INDEX) int page,
            @RequestParam(defaultValue = DEFAULT_PAGE_SIZE) int size,
            @RequestParam(defaultValue = DEFAULT_SORT) String sortBy,
            @RequestParam(required = false) String filterBy,
            @RequestParam(required = false) String filterFor) {
        try {
            List<Trip> trips = new ArrayList<Trip>();
            Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
            Page<Trip> pageTrips;
            if (filterBy == null || filterFor == null) {
                pageTrips = tripRepository.findAll(pageable);
            } else {
                pageTrips = switch (filterBy) {
                    case "id" -> tripRepository.findByIdContainingIgnoreCase(filterFor, pageable);
                    case "blurb" -> tripRepository.findByBlurbContainingIgnoreCase(filterFor, pageable);
                    case "description" -> tripRepository.findByDescriptionContainingIgnoreCase(filterFor, pageable);
                    case "bullets" -> tripRepository.findByBulletsContainingIgnoreCase(filterFor, pageable);
                    case "difficulty" -> tripRepository.findByDifficultyContainingIgnoreCase(filterFor, pageable);
                    case "region" -> tripRepository.findByRegionContainingIgnoreCase(filterFor, pageable);
                    case "keywords" -> tripRepository.findByKeywordsContainingIgnoreCase(filterFor, pageable);
                    case "price" -> tripRepository.findByPrice(filterFor, pageable);
                    case "length" -> tripRepository.findByLength(filterFor, pageable);
                    default -> tripRepository.findByTitleContainingIgnoreCase(filterFor, pageable);
                };
            }
            trips = pageTrips.getContent();
            Map<String, Object> response = new HashMap<>();
            response.put("trips", trips);
            response.put("currentPage", pageTrips.getNumber());
            response.put("totalItems", pageTrips.getTotalElements());
            response.put("totalPages", pageTrips.getTotalPages());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity addTrip(@RequestBody Trip trip) {
        System.out.println(trip);
        try {
            trip.setId(String.valueOf(ObjectId.get()));
            trip.setBullets(trip.getBullets().replace('\n','~'));
            System.out.println(trip.getId() + " to be inserted");
            Trip insertedTrip = tripRepository.insert(trip);
            Map<String, Object> response = new HashMap<>();
            response.put("trip", insertedTrip);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception ex) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", ex.getLocalizedMessage());
            errorResponse.put("status", HttpStatus.BAD_REQUEST.toString());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity updateTrip(@RequestParam("tripId") String tripId,
                                     @RequestBody Trip trip) {
        try {
            System.out.println(tripId + " to be updated");
            Trip strip = tripRepository.findById(tripId).orElse(null);
            if (strip != null) {
                strip.setTitle      (trip.getTitle());
                strip.setBlurb      (trip.getBlurb());
                strip.setDescription(trip.getDescription());
                strip.setBullets    (trip.getBullets());
                strip.setDifficulty (trip.getTitle());
                strip.setPrice      (trip.getPrice());
                strip.setLength     (trip.getLength());
                strip.setRegion     (trip.getRegion());
                strip.setKeywords   (trip.getKeywords());
                Trip updatedTrip = tripRepository.save(strip);
                Map<String, Object> response = new HashMap<>();
                response.put("trip", updatedTrip);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("message", "Trip Id not fount in the database");
                errorResponse.put("status", HttpStatus.NOT_FOUND.toString());
                return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", ex.getLocalizedMessage());
            errorResponse.put("status", HttpStatus.BAD_REQUEST.toString());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity deleteTrip(@RequestParam("tripId") String tripId) {
        try {
            System.out.println(tripId + " to be deleted");
            Trip trip = tripRepository.findById(tripId).orElse(null);
            if (trip != null) {
                tripRepository.delete(trip);
                return ResponseEntity.ok().build();
            }
            else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
