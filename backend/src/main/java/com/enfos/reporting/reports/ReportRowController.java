package com.enfos.reporting.reports;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReportRowController {

    private final ReportRegistry reportRegistry;

    public ReportRowController(ReportRegistry reportRegistry) {
        this.reportRegistry = reportRegistry;
    }

    @GetMapping("/api/reports/{reportId}")
    public List<?> getReportRows(@PathVariable String reportId) {
        return reportRegistry.get(reportId).findAll();
    }
}
