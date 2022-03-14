package abc.les.trips.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

@Document(collection = "trip")
public class Trip {
    @Id
    private String id;
    private String title;
    private String blurb;
    private String description;
    private String bullets;
    private String difficulty;
    private Double price;
    private String length;
    private String region;
    private String keywords;

    public Trip() {}
    public Trip(String id, String title, String blurb, String description, String bullets, String difficulty,
                Double price, String length, String region, String keywords) {
        this.id = id;
        this.title = title;
        this.blurb = blurb;
        this.description = description;
        this.bullets = bullets;
        this.difficulty = difficulty;
        this.price = price;
        this.length = length;
        this.region = region;
        this.keywords = keywords;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBlurb() {
        return blurb;
    }

    public void setBlurb(String blurb) {
        this.blurb = blurb;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBullets() {
        return bullets;
    }

    public void setBullets(String bullets) {
        this.bullets = bullets;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getRegion() {
        return region;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getLength() {
        return length;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    @Override
    public String toString() {
        return "Trip{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", blurb='" + blurb + '\'' +
                ", description='" + description + '\'' +
                ", bullets='" + bullets + '\'' +
                ", difficulty='" + difficulty + '\'' +
                ", price=" + price +
                ", region='" + region + '\'' +
                ", length='" + length + '\'' +
                ", keywords='" + keywords + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Trip trip = (Trip) o;
        return Objects.equals(id, trip.id) && Objects.equals(title, trip.title) && Objects.equals(blurb, trip.blurb) &&
                Objects.equals(description, trip.description) && Objects.equals(bullets, trip.bullets) &&
                Objects.equals(difficulty, trip.difficulty) && Objects.equals(price, trip.price) &&
                Objects.equals(length, trip.length) && Objects.equals(region, trip.region) && Objects.equals(keywords, trip.keywords);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, blurb, description, bullets, difficulty, price, length, region, keywords);
    }
}
