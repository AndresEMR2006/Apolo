package com.andresemr.apolo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andresemr.apolo.model.HealthResponse;

@RestController 
@CrossOrigin(origins = "http://localhost:5500")
public class HealthController {

    @GetMapping("api/status")
    public HealthResponse getStatus(){
        return new HealthResponse("UP", "Apolo");
    }
    
}
