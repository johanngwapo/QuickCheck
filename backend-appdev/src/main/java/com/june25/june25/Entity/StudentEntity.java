package com.june25.june25.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class StudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="name")
    private String name;

    @Column(name ="email")
    private String email;

    @Column(name ="studentNo")
    private String studentNo;

    @ManyToOne
    @JoinColumn(name = "course_id") // FK column in students table
    private CourseEntity course;

    public StudentEntity() {}

    public StudentEntity(String name, String email, String studentNo, CourseEntity course) {
        this.name = name;
        this.email = email;
        this.studentNo = studentNo;
        this.course = course;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getStudentNo() { return studentNo; }
    public CourseEntity getCourse() { return course; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setStudentNo(String studentNo) { this.studentNo = studentNo; }
    public void setCourse(CourseEntity course) { this.course = course; }
}
