'use server';

import { createCourse, deletecourse, getAllcourses, getCoursebyId, updatecourse } from './db/queries';
import { InsertCourse, SelectCourse } from './db/schema';

// Add a new course
export async function addCourse(data: InsertCourse) {
  try {
    await createCourse(data);
    return { message: 'Course successfully added' };
  } catch (error) {
    console.error('Error adding course:', error);
    return { error, message: 'Could not add course' };
  }
}

export async function getCourseById(id: string) {
  try {
    const course = await getCoursebyId(id);

    if (!course) {
      return { message: 'Course not found', course: null };
    }
    return { message: 'Course fetched successfully', course };
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    return { error, message: 'Could not fetch course', course: null };
  }
}

export async function updateCourse(id: string, updatedData: Partial<Omit<SelectCourse, 'id'>>) {
  try {
    await updatecourse(id, updatedData);
    return { message: 'Course updated successfully' };
  } catch (error) {
    console.error('Error updating course:', error);
    return { error, message: 'Could not update course' };
  }
}

export async function deleteCourse(id: string) {
  try {
    const courses = await deletecourse(id);
    return { message: 'Course deleted successfully' };
  } catch (error) {
    console.error('Error deleting course:', error);
    return { error, message: 'Could not delete course' };
  }
}

export async function getAllQueryCourses(searchQuery?: string) {
  const courses = await getAllcourses();
  if (searchQuery) {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return {
      courses: courses.filter(
        (course) =>
          course.name.toLowerCase().includes(lowerCaseQuery) ||
          course.category.toLowerCase().includes(lowerCaseQuery) ||
          course.trainer.toLowerCase().includes(lowerCaseQuery)
      ),
      message: 'Courses fetched successfully with query',
    };
  }

  return { courses, message: 'Courses fetched successfully' };
}

export async function getAllCourses() {
  const courses = await getAllcourses();
  if (courses.length === 0) {
    return { courses, message: 'No Courses' };
  }

  return { courses, message: 'Courses fetched successfully' };
}
