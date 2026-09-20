package com.andresemr.apolo.service;

import java.lang.StackWalker.Option;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

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

    @Override 
    public Optional<Track> getTrackById(String id){
        return repository.findTrackById(id);
    }

    @Override 
    public Optional<Resource> getAudioById(String id){
        
        Optional<Path> path = repository.findPathById(id);

        if (path.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(new FileSystemResource(path.get()));
    }
    
}
