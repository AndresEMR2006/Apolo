package com.andresemr.apolo.model;

public class Track {
    
    private Long id;
    private String name;
    private String artist;

    public Track(Long id, String name, String artist){
        this.id = id;
        this.name = name;
        this.artist = artist;
    }

    public Long getId(){
        return this.id;
    }

    public String getName(){
        return this.name;
    }

    public String getArtists(){
        return this.artist;
    }

}
