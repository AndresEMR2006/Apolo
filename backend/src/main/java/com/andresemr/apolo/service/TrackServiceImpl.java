package com.andresemr.apolo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.andresemr.apolo.model.Track;

@Service 
public class TrackServiceImpl implements TrackService{

    @Override 
    public List<Track> getTracks(){
        // Datos quemados temporales
        return List.of(
            new Track(1L, "Blinding Lights", "The Weeknd"),
            new Track(2L, "As It Was", "Harry Styles"),
            new Track(3L, "Starboy", "The Weeknd")
        );
    }
    
}
