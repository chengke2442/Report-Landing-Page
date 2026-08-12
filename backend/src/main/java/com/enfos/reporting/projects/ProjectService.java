package com.enfos.reporting.projects;

import com.enfos.reporting.reports.ReportRowService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ProjectService implements ReportRowService {

    private final List<Project> projects = List.of(
            new Project("P001", "Portal Redesign", "Engineering", "Alice Johnson", "In Progress",
                    LocalDate.of(2026, 1, 6), LocalDate.of(2026, 9, 30)),
            new Project("P002", "Q3 Sales Campaign", "Sales", "Brian Chen", "Completed",
                    LocalDate.of(2025, 7, 1), LocalDate.of(2025, 9, 30)),
            new Project("P003", "Brand Refresh", "Marketing", "Carla Diaz", "In Progress",
                    LocalDate.of(2026, 2, 10), LocalDate.of(2026, 8, 31)),
            new Project("P004", "Support Ticket Migration", "Customer Support", "David Kim", "Completed",
                    LocalDate.of(2025, 11, 1), LocalDate.of(2026, 1, 15)),
            new Project("P005", "Benefits Enrollment Overhaul", "Human Resources", "Emma Wilson", "On Hold",
                    LocalDate.of(2025, 10, 5), LocalDate.of(2026, 3, 31)),
            new Project("P006", "Expense Automation", "Finance", "Farid Haidari", "In Progress",
                    LocalDate.of(2026, 3, 1), LocalDate.of(2026, 10, 15)),
            new Project("P007", "Mobile App Beta", "Product", "Grace Lee", "In Progress",
                    LocalDate.of(2026, 4, 20), LocalDate.of(2026, 11, 30)),
            new Project("P008", "Vendor Contract Review", "Legal", "Hassan Ali", "Completed",
                    LocalDate.of(2025, 8, 12), LocalDate.of(2025, 12, 1)));

    @Override
    public String reportId() {
        return "projects";
    }

    @Override
    public List<Project> findAll() {
        return projects;
    }
}
