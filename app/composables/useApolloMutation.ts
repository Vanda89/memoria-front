import type { DocumentNode } from 'graphql';
import type { MutationOptions } from '@apollo/client/core';

export function useApolloMutation(mutationDoc: DocumentNode) {
  const nuxtApp = useNuxtApp();

  type MutateOptions = Omit<MutationOptions, 'mutation'>;

  function mutate(options: MutateOptions) {
    return nuxtApp.$apollo.defaultClient.mutate({
      mutation: mutationDoc,
      ...options,
    });
  }
  return { mutate };
}
