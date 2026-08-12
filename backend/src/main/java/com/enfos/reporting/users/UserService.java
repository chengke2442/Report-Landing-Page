package com.enfos.reporting.users;

import com.enfos.reporting.reports.ReportRowService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class UserService implements ReportRowService {

    private final List<User> users = List.of(
            new User("U001", "Alice Johnson", "alice.johnson@enfos.com", "Admin", "Active", LocalDate.of(2024, 1, 15)),
            new User("U002", "Brian Chen", "brian.chen@enfos.com", "Editor", "Active", LocalDate.of(2024, 2, 3)),
            new User("U003", "Carla Diaz", "carla.diaz@enfos.com", "Viewer", "Active", LocalDate.of(2024, 2, 20)),
            new User("U004", "David Kim", "david.kim@enfos.com", "Editor", "Inactive", LocalDate.of(2024, 3, 5)),
            new User("U005", "Emma Wilson", "emma.wilson@enfos.com", "Admin", "Active", LocalDate.of(2024, 3, 18)),
            new User("U006", "Farid Haidari", "farid.haidari@enfos.com", "Viewer", "Active", LocalDate.of(2024, 4, 2)),
            new User("U007", "Grace Lee", "grace.lee@enfos.com", "Editor", "Active", LocalDate.of(2024, 4, 22)),
            new User("U008", "Hassan Ali", "hassan.ali@enfos.com", "Viewer", "Suspended", LocalDate.of(2024, 5, 9)),
            new User("U009", "Ingrid Novak", "ingrid.novak@enfos.com", "Admin", "Active", LocalDate.of(2024, 5, 30)),
            new User("U010", "James Carter", "james.carter@enfos.com", "Editor", "Active", LocalDate.of(2024, 6, 11)),
            new User("U011", "Karin Muller", "karin.muller@enfos.com", "Viewer", "Active", LocalDate.of(2024, 7, 1)),
            new User("U012", "Liam O'Brien", "liam.obrien@enfos.com", "Editor", "Inactive", LocalDate.of(2024, 7, 19)),
            new User("U013", "Maria Santos", "maria.santos@enfos.com", "Admin", "Active", LocalDate.of(2024, 8, 6)),
            new User("U014", "Noah Becker", "noah.becker@enfos.com", "Viewer", "Active", LocalDate.of(2024, 9, 2)),
            new User("U015", "Olivia Turner", "olivia.turner@enfos.com", "Editor", "Active", LocalDate.of(2024, 9, 25)));

    @Override
    public String reportId() {
        return "users";
    }

    @Override
    public List<User> findAll() {
        return users;
    }
}
