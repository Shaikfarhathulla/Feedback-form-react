package com.DigitalLync.HRM.Controller;


import com.DigitalLync.HRM.Entity.User;
import com.DigitalLync.HRM.Entity.Form;
import com.DigitalLync.HRM.Repository.FormRepo;
import com.DigitalLync.HRM.Repository.UserRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HrmController {


    @Autowired
    UserRepo userRepo;

    @Autowired
    FormRepo formRepo;

    @PostMapping("/addUser")
    public String addUser(@RequestBody @Valid User user){

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setRole("user");

        userRepo.save(newUser);
        String str = newUser.getUsername();

        return str + " signed up successfully";
    }

    @PostMapping("adminAccess/{email}")
    public ResponseEntity<String > giveAdminAccess(@PathVariable String email){

        User user = userRepo.findByEmail(email);
        if (user != null){
            user.setRole("admin");

            userRepo.save(user);
            return ResponseEntity.ok("Given admin access to " + user.getUsername());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User doesn't exist");
        }
    }

    @PutMapping("editUser/{id}")
    public ResponseEntity<?> editUser(@PathVariable Long id, @RequestBody User updatedUser) {
        try {
            User user = userRepo.findById(id).orElse(null);

            if (user != null) {
                user.setUsername(updatedUser.getUsername());
                user.setEmail(updatedUser.getEmail());

                userRepo.save(user);
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update user");
        }
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){

        User user = userRepo.findById(id).orElse(null);
        if (user != null) {
            userRepo.deleteById(id);
            return  ResponseEntity.ok( user.getUsername() + "'s profile deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User doesn't exist");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User angularuser) {
        User existingUser = userRepo.findByEmail(angularuser.getEmail());

        if (existingUser != null && existingUser.getPassword().equals(angularuser.getPassword())) {
            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid details");
        }
    }

    @GetMapping("/findAllUsers")
    public List<User> findAllUser() {
        List<User> allUsers = userRepo.findAll();
        return allUsers;
    }

    @PostMapping("/submitForm/{email}")
    public ResponseEntity<String> submitForm(@RequestBody @Valid Form studentForm, @PathVariable String email){

        User user = userRepo.findByEmail(email);
        if(user != null) {

            Form newForm = new Form();
            newForm.setEmail(email);
            newForm.setStudentName(studentForm.getStudentName());
            newForm.setPhNo(studentForm.getPhNo());
            newForm.setTrainerName(studentForm.getTrainerName());
            newForm.setBatch(studentForm.getBatch());
            newForm.setReview(studentForm.getReview());

            formRepo.save(newForm);

            return ResponseEntity.ok("Submitted form successfully");
        } else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email doesn't exists");
        }
    }

    @PutMapping("/editForm/{id}")
    public ResponseEntity<String> editForm(@PathVariable Long id, @RequestBody(required = false) Form studentForm) {
        if (studentForm == null) {

            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("form fields cannot be empty");
        }

        Form editForm = formRepo.findById(id).orElse(null);

        if (editForm != null) {
            editForm.setStudentName(studentForm.getStudentName());
            editForm.setTrainerName(studentForm.getTrainerName());
            editForm.setBatch(studentForm.getBatch());
            editForm.setPhNo(studentForm.getPhNo());
            editForm.setReview(studentForm.getReview());

            formRepo.save(editForm);

            return ResponseEntity.ok("Review Updated");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Form id not found");
        }
    }


    @GetMapping("/getFormsByEmail/{email}")
    public List<Form> getFormsByEmail(@PathVariable String email) {
        return formRepo.findByEmail(email);
    }


    @GetMapping("/allReviews")
    public List<Form> allReviews() {
        List<Form> allReview = formRepo.findAll();
        return allReview;
    }
    
    @DeleteMapping("/deleteReview/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id){

        Form form = formRepo.findById(id).orElse(null);
        if (form != null){
            formRepo.deleteById(id);
            return ResponseEntity.ok("Deleted successfully");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Invalid form details");
        }
    }

}
