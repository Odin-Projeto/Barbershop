import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../../components/input';
import { Button } from '../../components/button/button';
import { Link } from 'react-router-dom';

const loginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginData = z.infer<typeof loginFormSchema>;

export function Login() {
  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema),
  });

  return (
    <FormProvider {...loginForm}>
      <form className='p-4 h-full flex flex-col'>
        <div className='flex flex-col text-gray-25 mt-4 items-center'>
          <h4 className='text-center'>log in</h4>
          <img className='mt-14' src='odin.png' alt='' width={80} height={80} />
          <h3 className='text-center'>Bem-vindo ao ODIN</h3>
          <p>Faça log in para agendamentos</p>
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
            <Input.Label>Senha</Input.Label>
            <Input.Field
              name='password'
              type='password'
              placeholder='Digite sua senha de acesso'
            />
          </Input.Root>
          <Link
            to={'/'}
            className='ml-auto text-sm font-normal text-orange-400 hover:underline underline-offset-1'
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <Button className='mt-10 w-full'>Acessar conta</Button>
        <div className='mt-auto pt-10 text-center'>
          <span className='font-light text-gray-25'>Não possui uma conta?</span>{' '}
          <Link
            to={'/'}
            className='font-bold text-orange-400 hover:underline underline-offset-1'
          >
            Cadastre-se agora
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
