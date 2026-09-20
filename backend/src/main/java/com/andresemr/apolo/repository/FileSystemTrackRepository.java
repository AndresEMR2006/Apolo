package com.andresemr.apolo.repository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.andresemr.apolo.model.Track;

@Repository
public class FileSystemTrackRepository implements TrackRepository {

    private final Path musicDirectory;

    public FileSystemTrackRepository(
            @Value("${apolo.music.directory}") String musicDirectory) {
        this.musicDirectory = Path.of(musicDirectory);
    }

    @Override
    public List<Track> findAll() {
        if (!Files.exists(musicDirectory) || !Files.isDirectory(musicDirectory)) {
            return List.of();
        }

        List<Path> files = findTrackList();
        List<Track> tracks = new ArrayList<>();

        for (Path file : files) {
            String fileName = file.getFileName().toString();
            String name = removeExtension(fileName);

            // Por el momento utilizamos el fileName como id para 
            // no tener problemas al agregar o eliminar canciones
            tracks.add(new Track(fileName, name, "", fileName));
        }

        return tracks;

    }

    @Override 
    public Optional<Path> findPathById(String id){

        if (!Files.exists(musicDirectory) || !Files.isDirectory(musicDirectory)) {
            return Optional.empty();
        }

        List<Path> files = findTrackList();

        for(Path file: files){
            String fileName = file.getFileName().toString();
            if(fileName.equals(id)){
                return Optional.of(file);
            }
        }

        return Optional.empty();
    }

    @Override 
    public Optional<Track> findTrackById(String id){

        Optional<Path> path = findPathById(id);

        if(path.isEmpty()) return Optional.empty();

        Path file = path.get();
        String fileName = file.getFileName().toString();
        String name = removeExtension(fileName);

        return Optional.of(new Track(fileName, name, "", fileName));
    }

    private List<Path> findTrackList(){
        try{
            List<Path> files = Files.list(musicDirectory)
                    .filter(Files::isRegularFile)
                    .filter(this::isMp3)
                    .sorted(Comparator.comparing(path -> path.getFileName().toString()))
                    .toList();

                    return files;
        }catch(IOException e){
            throw new RuntimeException("No se pudieron leer las canciones", e);
        }
    }

    private boolean isMp3(Path file) {
        return file.getFileName()
                .toString()
                .toLowerCase()
                .endsWith(".mp3");
    }

    private String removeExtension(String fileName) {
        return fileName.substring(0, fileName.length() - 4);
    }
}