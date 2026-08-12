package com.enfos.reporting.reports;

import java.time.LocalDate;

/**
 * Metadata for a report shown on the Landing Page — not the report's row data.
 */
public record Report(String id, String name, String description, LocalDate lastUpdated) {
}
