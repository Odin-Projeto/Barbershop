import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const mailSchema = z.object({
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório.')
    .email('Formato de e-mail inválido.'),
});

type UserData = z.infer<typeof mailSchema>;

export function ConfirmMail() {
  const mailForm = useForm<UserData>({
    resolver: zodResolver(mailSchema),
  });
  const { handleSubmit } = mailForm;

  function handleSendMail() {}

  return (
    <FormProvider {...mailForm}>
      <form
        className='p-4 h-full flex flex-col'
        onSubmit={handleSubmit(handleSendMail)}
      >
        <div className='flex flex-col text-gray-25 mt-4 items-center'>
          <h4 className='text-center'>log in</h4>
          <img className='mt-14' src='odin.png' alt='' width={80} height={80} />
          <h3 className='text-center'>Recuperação de senha</h3>
          <p>Confirme sua identidade</p>
        </div>
        <p className='text-gray-25 text-center mt-10'>
          Para recuperar sua senha, primeiro precisamos confirmar sua identidade
        </p>
        <div className='mt-8'>
          <Input.Root>
            <Input.Label>E-mail</Input.Label>
            <Input.Field
              name='email'
              placeholder='Digite o seu e-mail cadastrado'
            />
            <Input.ErrorMessage field='email' />
          </Input.Root>
        </div>

        <div className='mt-auto'>
          <Button className='mt-10 w-full' type='submit'>
            Enviar e-mail de recuperação
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
