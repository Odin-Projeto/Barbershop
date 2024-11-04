import { useNavigate, useSearchParams } from 'react-router-dom';
import ArrowLeft from '../../assets/arrow_left.svg?react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfessionalById } from '../../services/requests/getProfessionalById';
import { Input } from '../../components/input';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Button } from '../../components/button/button';
import { Switch } from '@headlessui/react';
import { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProfessional } from '../../services/requests/createProfessional';
import { updateProfessional } from '../../services/requests/updateProfessional';

const professionalFormSchema = z.object({
  name: z.coerce.string().min(1, 'Campo obrigatório'),
  email: z.string().email('Email incorreto'),
  contact: z.coerce.string().min(1, 'Campo obrigatório'),
  admin: z.boolean(),
});

type ProfessionalFormData = z.infer<typeof professionalFormSchema>;

export function ProfessionalForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { data: professional } = useQuery({
    queryKey: ['professional'],
    queryFn: () => getProfessionalById(Number(id ?? 0)),
    enabled: !!id,
  });
  const professionalForm = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalFormSchema),
    defaultValues: {
      admin: false,
    },
  });
  const queryClient = useQueryClient();
  const updateProfessionalMutation = useMutation({
    mutationKey: ['updateProfessional'],
    mutationFn: updateProfessional,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['professionals'],
        exact: true,
      });
    },
  });
  const createProfessionalMutation = useMutation({
    mutationKey: ['createProfessional'],
    mutationFn: createProfessional,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['professionals'],
        exact: true,
      });
    },
  });
  const { reset, handleSubmit, control } = professionalForm;

  function handleReturnPreviousPage() {
    navigate('/professionals');
  }
  function submitForm(data: ProfessionalFormData) {
    const professionalData = {
      nome: data.name,
      email: data.email,
      senha: '123',
      telefone: data.contact,
      admin: data.admin,
    };
    if (professional) {
      updateProfessionalMutation.mutate({
        id,
        ...professionalData,
      });
    } else {
      createProfessionalMutation.mutate(professionalData);
    }
    navigate('/professionals');
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
      <form onSubmit={handleSubmit(submitForm)}>
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
                <Input.ErrorMessage field='name' />
              </Input.Root>
              <Input.Root>
                <Input.Label>E-mail</Input.Label>
                <Input.Field type='text' name='email' />
                <Input.ErrorMessage field='email' />
              </Input.Root>
              <Input.Root>
                <Input.Label>Contato</Input.Label>
                <Input.Field type='text' name='contact' />
                <Input.ErrorMessage field='contact' />
              </Input.Root>
              <div>
                <Controller
                  control={control}
                  name='admin'
                  render={({ field }) => {
                    return (
                      <label
                        htmlFor=''
                        className='flex gap-2 text-white font-medium'
                      >
                        <Switch
                          // {...field}
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
      </form>
    </FormProvider>
  );
}
