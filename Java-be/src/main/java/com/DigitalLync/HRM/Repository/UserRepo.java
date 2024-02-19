package com.DigitalLync.HRM.Repository;

import com.DigitalLync.HRM.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByEmail(String Username);
//    User findById(Long id);
}
