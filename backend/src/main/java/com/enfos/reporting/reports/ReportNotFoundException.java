package com.enfos.reporting.reports;

public class ReportNotFoundException extends RuntimeException {

    public ReportNotFoundException(String reportId) {
        super("Unknown report: " + reportId);
    }
}
