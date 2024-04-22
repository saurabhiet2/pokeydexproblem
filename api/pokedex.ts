// api/pokedex.ts
import { prisma } from '$lib/prisma';
import { z } from 'zod';
import { createTRPCRouter } from '@trpc/server';
import { Pokemon } from '$lib/types';

export const pokedexRouter = createTRPCRouter()
  .query('getPokemonArray', {
    input: z.array(z.string()),
    resolve: async ({ input }) => {
      const pokemonArray = await prisma.pokemon.findMany({
        where: {
          name: {
            in: input,
          },
        },
      });
      return pokemonArray;
    },
  });
