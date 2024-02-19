package com.DigitalLync.HRM.Entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    @NotEmpty(message = "username Cannot be empty")
    private String username;
    @Column
    @NotEmpty(message = "email Cannot be empty")
    private String email;
    @Column
    @NotEmpty(message = "password Cannot be empty")
    private String password;
    @Column
    private String role;
}
