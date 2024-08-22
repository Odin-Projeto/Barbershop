import { Button } from '../../components/button/button';

export function MailSended() {
  return (
    <div className='p-4 h-full flex flex-col'>
      <div className='flex flex-col text-gray-25 mt-4 items-center'>
        <h4 className='text-center'>log in</h4>
        <img className='mt-14' src='odin.png' alt='' width={80} height={80} />
        <h3 className='text-center'>Recuperação de senha</h3>
        <p>Confirme sua identidade</p>
      </div>
      <p className='text-gray-25 text-center mt-10'>
        Um e-mail de recuperação de senha foi enviado para em...@exemple.com
      </p>
      <div className='mt-auto'>
        <Button className='mt-10 w-full'>Enviar e-mail de recuperação</Button>
      </div>
    </div>
  );
}
