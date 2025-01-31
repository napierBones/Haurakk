'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

import { Form, FormItem, FormLabel, FormMessage, FormControl, FormField } from '@/components/ui/form';
import { revalidatePage } from '@/server_actions';
import { addCourse } from '@/db_serverActions';


const courseSchema = z.object({
  name: z.string().nonempty({ message: 'Required' }),
  category: z.string().nonempty({ message: 'Required' }),
  trainer: z.string().nonempty({ message: 'Required' }),
});
type CourseFormType = z.infer<typeof courseSchema>;

export default function AddCourse() {
  const { toast } = useToast();
  const form = useForm<CourseFormType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: '',
      category: '',
      trainer: '',
    },
  });

  const onSubmit = async (data: CourseFormType) => {
    console.log('data', data);
  
    try {
      const result = await addCourse(data);
      console.log('result', result);
      toast({
        title: result.message,
      });
      revalidatePage('/');
      form.reset();
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
    <div className='min-w-[400px]  w-1/2 border fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 bg-white max-md:max-h-[200px] overflow-x-auto py-2'>
      <Form {...form}>
        <h1 className='text-center'>Add Course</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='p-4 md:flex items-center justify-between gap-3 w-full relative '>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='course name'
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
                    placeholder='category name'
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
                    placeholder='course trainer'
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
