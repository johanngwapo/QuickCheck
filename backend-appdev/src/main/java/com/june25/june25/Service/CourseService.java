package com.june25.june25.Service;

import com.june25.june25.Entity.CourseEntity;
import com.june25.june25.Repository.CourseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private final CourseRepository courseRepo;

    public CourseService(CourseRepository courseRepo) {
        this.courseRepo = courseRepo;
    }

    public List<CourseEntity> getAllCourses() {
        return courseRepo.findAll();
    }

    public Optional<CourseEntity> getCourseById(String id) {
        return courseRepo.findById(id);
    }

    public CourseEntity addCourse(CourseEntity course) {
        return courseRepo.save(course);
    }

    public CourseEntity addColor(CourseEntity color) {
        return courseRepo.save(color);
    }

    public CourseEntity updateCourse(String id, CourseEntity updatedCourse) {
        return courseRepo.findById(id)
                .map(course -> {
                    course.setCourseDesc(updatedCourse.getCourseDesc());
                    return courseRepo.save(course);
                })
                .orElse(null);
    }

    public boolean deleteCourse(String id) {
        if (!courseRepo.existsById(id)) {
            return false; // or throw new CourseNotFoundException(id);
        }
        courseRepo.deleteById(id);
        return true;
    }

}
