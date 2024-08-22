import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../../components/input';
import { Button } from '../../components/button/button';

const createUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type UserData = z.infer<typeof createUserSchema>;

export function ResetPassword() {
  const createUserForm = useForm<UserData>({
    resolver: zodResolver(createUserSchema),
  });

  return (
    <FormProvider {...createUserForm}>
      <form className='p-4 h-full flex flex-col'>
        <div className='flex flex-col text-gray-25 mt-4 items-center'>
          <h4 className='text-center'>log in</h4>
          <img className='mt-14' src='odin.png' alt='' width={80} height={80} />
          <h3 className='text-center'>Recuperação de senha</h3>
          <p>Crie uma nova senha para acesso</p>
        </div>
        <div className='flex w-full flex-col gap-5'>
          <Input.Root>
            <Input.Label>E-mail</Input.Label>
            <Input.Field
              name='email'
              placeholder='Digite o seu e-mail cadastrado'
            />
          </Input.Root>
          <Input.Root>
            <Input.Label>Nova senha</Input.Label>
            <Input.Field
              name='password'
              type='password'
              placeholder='Digite sua senha de acesso'
            />
          </Input.Root>
          <Input.Root>
            <Input.Label>Confirmar nova senha</Input.Label>
            <Input.Field
              name='password'
              type='password'
              placeholder='Digite sua senha de acesso'
            />
          </Input.Root>
        </div>
        <div className='mt-auto'>
          <Button className='mt-10 w-full'>Definir nova senha</Button>
        </div>
      </form>
    </FormProvider>
  );
}
