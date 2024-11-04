import { useNavigate, useSearchParams } from 'react-router-dom';
import ArrowLeft from '../../assets/arrow_left.svg?react';
import { useQuery } from '@tanstack/react-query';
import { getProfessionalById } from '../../services/requests/getProfessionalById';
import { Input } from '../../components/input';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Button } from '../../components/button/button';
import { Switch } from '@headlessui/react';
import { useEffect } from 'react';

export function ProfessionalForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { data: professional } = useQuery({
    queryKey: ['professional'],
    queryFn: () => getProfessionalById(Number(id ?? 0)),
    enabled: !!id,
  });
  const professionalForm = useForm({
    defaultValues: {},
  });
  const { reset } = professionalForm;
  function handleReturnPreviousPage() {
    navigate('/home');
  }

  useEffect(() => {
    if (professional && id) {
      reset({
        name: professional?.nome,
        email: professional?.email,
        contact: professional?.telefone,
        admin: professional.admin,
      });
    }
  }, [professional]);

  return (
    <FormProvider {...professionalForm}>
      <div className='flex flex-col h-full'>
        <div className='p-4 flex items-center gap-2 fixed bg-gray-800 w-full left-0 z-10'>
          <button
            className='bg-gray-600 rounded-full p-1'
            type='button'
            onClick={handleReturnPreviousPage}
          >
            <ArrowLeft height={24} width={24} className='fill-gray-25' />
          </button>
          <h1 className='text-gray-25'>Novo profissional</h1>
        </div>

        <div className='pt-18 p-4 flex flex-col gap-4 relative'>
          <p className='text-white'>
            {!id && 'Informe os dados do novo profissional a ser cadastrado'}
            {id && 'Edite os dados do novo profissional a ser cadastrado'}
          </p>
          <div className='flex flex-col gap-6'>
            <Input.Root>
              <Input.Label>Nome</Input.Label>
              <Input.Field type='text' name='name' />
            </Input.Root>
            <Input.Root>
              <Input.Label>E-mail</Input.Label>
              <Input.Field type='text' name='email' />
            </Input.Root>
            <Input.Root>
              <Input.Label>Contato</Input.Label>
              <Input.Field type='text' name='contact' />
            </Input.Root>
            <div>
              <Controller
                // control={control}
                name='admin'
                defaultValue={''}
                render={({ field }) => {
                  return (
                    <label
                      htmlFor=''
                      className='flex gap-2 text-white font-medium'
                    >
                      <Switch
                        {...field}
                        checked={field.value}
                        onChange={field.onChange}
                        className='group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-orange-400'
                      >
                        <span
                          aria-hidden='true'
                          className='pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7'
                        />
                      </Switch>
                      Usuário administrador
                    </label>
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className='p-4 pb-18 flex flex-col flex-1 items-end'>
          <Button type='submit' className='mt-auto w-full'>
            Salvar profissional
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
