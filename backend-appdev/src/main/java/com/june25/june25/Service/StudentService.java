package com.june25.june25.Service;

import com.june25.june25.Entity.StudentEntity;
import com.june25.june25.Entity.CourseEntity;
import com.june25.june25.Repository.CourseRepository;
import com.june25.june25.Repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository repository;
    private final CourseRepository courseRepository;

    public StudentService(StudentRepository repository, CourseRepository courseRepository) {
        this.repository = repository;
        this.courseRepository = courseRepository;
    }

    public List<StudentEntity> getStudentsByCourse(String courseId) {
        return repository.findByCourse_CourseId(courseId);
    }

    public List<StudentEntity> getAllStudents() {
        return repository.findAll();
    }

    public Optional<StudentEntity> getStudentById(Long id) {
        return repository.findById(id);
    }

    public StudentEntity createStudent(StudentEntity student) {
        if (student.getCourse() == null || student.getCourse().getCourseId() == null) {
            throw new RuntimeException("Course ID is required");
        }

        CourseEntity course = courseRepository.findById(student.getCourse().getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        student.setCourse(course); // ✅ bind actual course entity

        return repository.save(student);
    }

    public StudentEntity updateStudent(Long id, StudentEntity updatedStudent) {
        return repository.findById(id).map(student -> {
            student.setName(updatedStudent.getName());
            student.setEmail(updatedStudent.getEmail());
            student.setStudentNo(updatedStudent.getStudentNo());

            // fetch and assign course entity again if changed
            if (updatedStudent.getCourse() != null) {
                CourseEntity course = courseRepository.findById(updatedStudent.getCourse().getCourseId())
                        .orElseThrow(() -> new RuntimeException("Course not found"));
                student.setCourse(course);
            }

            return repository.save(student);
        }).orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }
}
