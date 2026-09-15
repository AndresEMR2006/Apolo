package com.andresemr.apolo.model;

public class HealthResponse {
    
    private String status;
    private String application;

    public HealthResponse(String status, String application) {
        this.status = status;
        this.application = application;
    }

    public String getStatus() {
        return status;
    }

    public String getApplication() {
        return application;
    }

}
