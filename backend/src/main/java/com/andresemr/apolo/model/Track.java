package com.andresemr.apolo.model;

public class Track {
    
    private Long id;
    private String name;
    private String artist;
    private String fileName;

    public Track(Long id, String name, String artist, String fileName){
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.fileName = fileName;
    }

    public Long getId(){
        return id;
    }

    public String getName(){
        return name;
    }

    public String getArtists(){
        return artist;
    }

    public String getFileName(){
        return fileName;
    }

}
