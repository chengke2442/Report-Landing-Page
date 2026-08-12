package com.enfos.reporting.reports;

import java.util.List;

/**
 * Implemented by each report's service (users, departments, projects) and
 * collected into a {@link ReportRegistry} so the row endpoint can dispatch
 * to the right one by report id, without a controller per report.
 */
public interface ReportRowService {

    String reportId();

    List<?> findAll();
}
