import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

const RegisterForm = () => {
  console.log(useForm());

  const { register, control, handleSubmit, formState } = useForm({
    // defaultValues: {
    //   username: 'Mindia',
    //   secondname: 'Arabuli',
    //   email: 'Admin@example.com',
    // },

    defaultValues: async (data) => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users/1'
      );

      const users = await response.json();

      return {
        username: users.name,
        secondname: users.username,
        email: users.email,
        dob: new Date(),
      };
    },
  });

  // console.log(formState);
  const { errors } = formState;
  console.log(errors);

  const onSubmit = () => {
    console.log('Form Submited');
  };

  return (
    <>
      <div className='flex justify-center items-center min-h-screen'>
        <form
          className='bg-white p-6 rounded shadow-md w-max max-w-sm'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1>RegisterForm</h1>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Name
            </label>
            <input
              type='text'
              id='username'
              placeholder='Enter your name'
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none'
              {...register('username', {
                required: {
                  value: true,
                  message: 'this username input field is empty!',
                },
              })}
            />
            <p>{errors.username && errors.username.message}</p>
          </div>
          {/* seond Name */}
          <div className='mb-4'>
            <label
              htmlFor='secondName'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              SecondName
            </label>
            <input
              type='text'
              id='secondName'
              placeholder='Enter your secondName'
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none'
              {...register('secondname')}
            />
          </div>
          {/* ThirdName */}
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Email
            </label>
            <input
              type='text'
              id='email'
              placeholder='Enter your Email'
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none'
              {...register('email', {
                validate: {
                  notAdmin: (value) =>
                    value !== 'admin@example.com' || 'Reserved Email',
                },

                blackList: (value) => {
                  const blackList = ['mail.ru', 'yandex.ru'];
                  const domain = value.split('@')[1];
                  console.log(domain.split('@'));
                  return blackList.includes(domain) ? 'BlackListed Mail' : true;
                },
              })}
            />

            <p>{errors.email && <span>Reserved mail</span>}</p>
          </div>

          <div className='mb-4'>
            <label
              htmlFor='dob'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Name
            </label>
            <input
              type='date'
              id='dob'
              placeholder='Enter your dob'
              className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none'
              {...register('dob', {
                valueAsDate: true,
                required: {
                  value: true,
                  message: 'this username input field is empty!',
                },
              })}
            />
            <p>{errors.username && errors.username.message}</p>
          </div>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm'
          >
            submit
          </button>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
};

export default RegisterForm;
