package com.andresemr.apolo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.core.io.Resource;

import com.andresemr.apolo.model.Track;

public interface TrackService {
    
    List<Track> getTracks();

    Optional<Track> getTrackById(String id);

    Optional<Resource> getAudioById(String id);
}
