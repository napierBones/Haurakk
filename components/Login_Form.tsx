'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';

import { IoMailSharp } from 'react-icons/io5';
import { signIn } from 'next-auth/react';

import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const magicLinkSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});

const Login_Form = () => {
  const { toast } = useToast();


  const form = useForm<z.infer<typeof magicLinkSchema>>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: '',
    },
  });


  const onSubmit = async (values: z.infer<typeof magicLinkSchema>) => {
    try {
      await signIn('nodemailer', {
        email: values.email,
        redirect: false,
      
      });
      toast({
        title: 'Check your email for the magic link.',
      });
    } catch (error) {
      toast({
        title: 'Failed to send the magic link. Please try again.',
      });
      console.log(error)
    }
  };



  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full flex items-center justify-center'>
            <IoMailSharp className='mr-2 h-5 w-5' />
            Sign in with Magic Link
          </Button>
        </form>
      </Form>

      
    </>
  );
};

export default Login_Form;
