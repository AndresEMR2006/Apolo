package com.andresemr.apolo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    
}
