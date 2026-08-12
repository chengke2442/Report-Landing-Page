package com.enfos.reporting.departments;

import com.enfos.reporting.reports.ReportRowService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class DepartmentService implements ReportRowService {

    private final List<Department> departments = List.of(
            new Department("D001", "Engineering", "Alice Johnson", 42, "San Francisco"),
            new Department("D002", "Sales", "Brian Chen", 28, "New York"),
            new Department("D003", "Marketing", "Carla Diaz", 15, "Austin"),
            new Department("D004", "Customer Support", "David Kim", 33, "Remote"),
            new Department("D005", "Human Resources", "Emma Wilson", 9, "Chicago"),
            new Department("D006", "Finance", "Farid Haidari", 12, "New York"),
            new Department("D007", "Product", "Grace Lee", 18, "San Francisco"),
            new Department("D008", "Legal", "Hassan Ali", 6, "Remote"));

    @Override
    public String reportId() {
        return "departments";
    }

    @Override
    public List<Department> findAll() {
        return departments;
    }
}
