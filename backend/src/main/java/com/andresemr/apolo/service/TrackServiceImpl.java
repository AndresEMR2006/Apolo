package com.andresemr.apolo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.andresemr.apolo.model.Track;
import com.andresemr.apolo.repository.FileSystemTrackRepository;

@Service 
public class TrackServiceImpl implements TrackService{

    @Autowired 
    private FileSystemTrackRepository repository;

    @Override 
    public List<Track> getTracks(){
        return repository.findAll();
    }
    
}
