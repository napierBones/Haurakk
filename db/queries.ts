import { eq } from 'drizzle-orm';
import { db } from './db';
import { coursesTable, InsertCourse, SelectCourse } from './schema';

export async function createCourse(data: InsertCourse) {
  await db.insert(coursesTable).values(data);
}
export async function getCoursebyId(id: SelectCourse['id']): Promise<
  Array<{
    id: string;
    name: string;
    category: string;
    trainer: string;
    createdAt: Date;
    updatedAt: Date;
  }>
> {
  return db.select().from(coursesTable).where(eq(coursesTable.id, id));
}

export async function updatecourse(id: SelectCourse['id'], data: Partial<Omit<SelectCourse, 'id'>>) {
    await db.update(coursesTable).set(data).where(eq(coursesTable.id, id));
}

export async function deletecourse(id: SelectCourse['id']) {
  await db.delete(coursesTable).where(eq(coursesTable.id, id));
}

export async function getAllcourses(): Promise<SelectCourse[]> {
  return db.select().from(coursesTable);
}