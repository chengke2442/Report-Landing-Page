package com.enfos.reporting.projects;

import java.time.LocalDate;

public record Project(
        String projectId,
        String name,
        String department,
        String owner,
        String status,
        LocalDate startDate,
        LocalDate endDate) {
}
