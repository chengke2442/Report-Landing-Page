package com.enfos.reporting.reports;

import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ReportCatalog {

    private final List<Report> reports = List.of(
            new Report("users", "Users", "People in the system", LocalDate.of(2026, 8, 10)),
            new Report("departments", "Departments", "Org structure", LocalDate.of(2026, 8, 9)),
            new Report("projects", "Projects", "Active & past work", LocalDate.of(2026, 8, 8)));

    public List<Report> findAll() {
        return reports;
    }
}
