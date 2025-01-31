'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

import { Form, FormItem, FormLabel, FormMessage, FormControl, FormField } from '@/components/ui/form';
import { revalidatePage, } from '@/server_actions';

import { useRouter, useSearchParams } from 'next/navigation';
import { updateCourse } from '@/db_serverActions';

const courseSchema = z.object({
  name: z.string().nonempty({ message: 'Required' }),
  category: z.string().nonempty({ message: 'Required' }),
  trainer: z.string().nonempty({ message: 'Required' }),
});
type CourseFormType = z.infer<typeof courseSchema>;

export default function Edit_Course_Form({
  courseid,
  coursename,
  coursecategory,
  coursetrainer,
}: {
  courseid: string | null;
  coursename: string | null;
  coursecategory: string | null;
  coursetrainer: string | null;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (param: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(param, value); // Update or add the parameter
    const newSearchString = currentParams.toString();
    router.push(`?${newSearchString}`);
  };


  const form = useForm<CourseFormType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: coursename || '',
      category: coursecategory || '',
      trainer: coursetrainer || '',
    },
  });
  if (!courseid) return <p>Course ID is required</p>;
  const onSubmit = async (data: CourseFormType) => {
    console.log('data', data);

    try {
      const result = await updateCourse(courseid, data);
      console.log('result', result);
      toast({
        title: result.message,
      });
      revalidatePage('/');
      form.reset();
      updateParam('display', 'false');
    } catch (error) {
      console.log('error', error);
      if (error) {
        toast({
          title: 'Failed to add course',
        });
      }
    }
  };

  return (
    <div className=''>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-4 flex flex-col  gap-3 w-full relative'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder={coursename || ''}
                    {...form.register('name')}
                    className='pl-10'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder={coursecategory || ''}
                    {...form.register('category')}
                    className='pl-10'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='trainer'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trainer</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder={coursetrainer || ''}
                    {...form.register('name')}
                    className='pl-10'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='' type='submit'>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
