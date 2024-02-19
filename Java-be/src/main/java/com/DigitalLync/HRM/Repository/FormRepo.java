package com.DigitalLync.HRM.Repository;

import com.DigitalLync.HRM.Entity.Form;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FormRepo extends JpaRepository<Form,Long> {
    List<Form> findByEmail(String email);
//    List<Form> findByID(Long id);
}
