package com.andresemr.apolo.repository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

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

        try {
            List<Path> files = Files.list(musicDirectory)
                    .filter(Files::isRegularFile)
                    .filter(this::isMp3)
                    .sorted(Comparator.comparing(path -> path.getFileName().toString()))
                    .toList();

            List<Track> tracks = new ArrayList<>();

            long id = 1;

            for (Path file : files) {
                String name = removeExtension(file.getFileName().toString());

                tracks.add(new Track(id, name, ""));

                id++;
            }

            return tracks;

        } catch (IOException e) {
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