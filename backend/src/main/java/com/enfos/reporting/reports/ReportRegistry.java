package com.enfos.reporting.reports;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class ReportRegistry {

    private final Map<String, ReportRowService> servicesById;

    public ReportRegistry(List<ReportRowService> services) {
        this.servicesById = services.stream()
                .collect(Collectors.toMap(ReportRowService::reportId, Function.identity()));
    }

    public ReportRowService get(String reportId) {
        ReportRowService service = servicesById.get(reportId);
        if (service == null) {
            throw new ReportNotFoundException(reportId);
        }
        return service;
    }
}
