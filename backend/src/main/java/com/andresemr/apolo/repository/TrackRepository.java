package com.andresemr.apolo.repository;

import java.util.List;

import com.andresemr.apolo.model.Track;

public interface TrackRepository {

    List<Track> findAll();
    
}
