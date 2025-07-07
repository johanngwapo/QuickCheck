package com.june25.june25.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.june25.june25.Entity.CourseEntity;
import com.june25.june25.Service.CourseService;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    @Autowired
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<CourseEntity> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public CourseEntity getCourse(@PathVariable String id) {
        return courseService.getCourseById(id).orElse(null);
    }

    @PostMapping("/color")
    public CourseEntity addCourse(@RequestBody CourseEntity course) {
        return courseService.addCourse(course);
    }

    @PostMapping
    public CourseEntity addColor(@RequestBody CourseEntity color) {
        return courseService.addColor(color);
    }

    @PutMapping("/{id}")
    public CourseEntity updateCourse(@PathVariable String id, @RequestBody CourseEntity course) {
        return courseService.updateCourse(id, course);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String id) {
        boolean deleted = courseService.deleteCourse(id);
        if (deleted) {
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

}
