package com.enfos.reporting.users;

import java.time.LocalDate;

public record User(String userId, String name, String email, String role, String status, LocalDate createdDate) {
}
