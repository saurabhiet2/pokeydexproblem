// api/pokemon.ts
import { prisma } from '$lib/prisma';
import { z } from 'zod';
import { createTRPCRouter } from '@trpc/server';
import { inferAsyncReturnType } from '@trpc/server';
import { zodResolver } from '@trpc/server';
import { GetPokemonInput, Pokemon } from '$lib/types';

export const pokemonRouter = createTRPCRouter()
  .query('getPokemon', {
    input: z.object({
      name: z.string(),
    }),
    resolve: async ({ input }) => {
      const pokemon = await prisma.pokemon.findUnique({
        where: { name: input.name },
      });
      return pokemon;
    },
  });
