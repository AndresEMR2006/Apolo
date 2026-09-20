package com.andresemr.apolo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

import com.andresemr.apolo.service.TrackService;
import com.andresemr.apolo.model.Track;

@RestController
@RequestMapping("/api/tracks")
@CrossOrigin(origins = "http://localhost:5500")
public class TrackController {

    @Autowired 
    private TrackService service;
 
    @GetMapping
    public List<Track> getTracks(){
        return service.getTracks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Track> getTrackById(
        @PathVariable String id
    ){
        Optional<Track> track = service.getTrackById(id);

        if(track.isEmpty()) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(track.get());
    }

    @GetMapping("/{id}/audio")
    public ResponseEntity<Resource> getAudioById(
        @PathVariable String id
    ){
        Optional<Resource> resource = service.getAudioById(id);

        if(resource.isEmpty()) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(resource.get());
    }
    
}
