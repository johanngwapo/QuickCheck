package com.june25.june25.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "courses")
public class CourseEntity {

    @Id
    private String courseId;
    private String courseDesc;
    private String color;

    // constructors
    public CourseEntity() {}
    
    public CourseEntity(String courseId, String courseDesc, String color) {
        this.courseId = courseId;
        this.courseDesc = courseDesc;
        this.color = color;
    }

    // getters & setters
    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseDesc() {
        return courseDesc;
    }

    public void setCourseDesc(String courseDesc) {
        this.courseDesc = courseDesc;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
