// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.pokemon.createMany({
    data: [
      {
        name: 'Bulbasaur',
        types: ['grass', 'poison'],
        sprite: 'https://pokemon.com/pictures/bulbasaur.png',
      },
      {
        name: 'Charmander',
        types: ['fire'],
        sprite: 'https://pokemon.com/pictures/charmander.png',
      },
      // Add more Pokémon if needed
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
