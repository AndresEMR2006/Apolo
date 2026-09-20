package com.andresemr.apolo.repository;

import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

import com.andresemr.apolo.model.Track;

public interface TrackRepository {

    List<Track> findAll();

    Optional<Path> findPathById(String id);

    Optional<Track> findTrackById(String id);

}
