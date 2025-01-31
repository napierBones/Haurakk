

import { auth } from '@/auth';
import AddCourse from '@/components/Add_Course';
import AllCourses from '@/components/AllCourses';
import Edit_Course from '@/components/Edit_Course';
import { redirect } from 'next/navigation';


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}){
  const session = await auth()
 
  if (!session?.user){
    redirect("/login")
    // redirect("/api/auth/signin")
  }

  const  {query}=await searchParams
  

 return (
  <main className='flex flex-col items-center w-full'>
    <Edit_Course   />
    <AllCourses search={query}/>
   <AddCourse />
  </main>
 );
}
