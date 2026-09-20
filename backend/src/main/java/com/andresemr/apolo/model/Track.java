package com.andresemr.apolo.model;

public class Track {
    
    private String id;
    private String name;
    private String artist;
    private String fileName;

    public Track(String id, String name, String artist, String fileName){
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.fileName = fileName;
    }

    public String getId(){
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
