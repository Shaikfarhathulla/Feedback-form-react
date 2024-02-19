package com.DigitalLync.HRM.Entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Forms")
public class Form {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String email;
    @Column
    @NotEmpty(message = "studentName Cannot be empty")
    private String studentName;
    @Column
    @NotEmpty(message = "phNo Cannot be empty")
    private String phNo;
    @Column
    @NotEmpty(message = "trainerName Cannot be empty")
    private String trainerName;
    @Column
    @NotEmpty(message = "batch Cannot be empty")
    private String batch;
    @Column
    @NotEmpty(message = "review Cannot be empty")
    private String review;
}
