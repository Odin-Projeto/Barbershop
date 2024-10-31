import { PrismaClient, Servico } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const servicos: Servico[] = [
    {
      id: 1,
      nome: 'Cabelo',
      descricao: 'Corte de cabelo',
      duracao: 60,
      porcentagem_comissao: 5,
      valor: 30,
    },
    {
      id: 2,
      nome: 'Barba',
      descricao: 'Corte de barba',
      duracao: 30,
      porcentagem_comissao: 5,
      valor: 25,
    },
    {
      id: 3,
      nome: 'Cabelo + Barba',
      descricao: 'Corte de cabelo e barba',
      duracao: 70,
      porcentagem_comissao: 5,
      valor: 50,
    },
  ];

  const existeServico = await prisma.servico.findFirst();

  if (!existeServico) await prisma.servico.createMany({ data: servicos });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
