package com.enfos.reporting.reports;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReportController {

    private final ReportCatalog reportCatalog;

    public ReportController(ReportCatalog reportCatalog) {
        this.reportCatalog = reportCatalog;
    }

    @GetMapping("/api/reports")
    public List<Report> getReports() {
        return reportCatalog.findAll();
    }
}
