export function useSheets() {
  const GET_SHEETS_QUERY = gql`
    query GetSheets {
      sheets {
        id
        title
        content
        subject
        difficulty
        level
      }
    }
  `;
  const { data: sheets } = useAsyncQuery<{ sheets: Sheet[] }>(GET_SHEETS_QUERY);
  return {
    sheets,
  };
}

export function useSheet(id: string) {
  const GET_SHEET_QUERY = gql`
    query GetSheet($id: ID!) {
      sheet(id: $id) {
        id
        title
        content
        subject
        difficulty
        level
      }
    }
  `;

  const { data } = useAsyncQuery<{ sheet: Sheet }>(GET_SHEET_QUERY, {
    id: id,
  });

  const sheet = computed(() => data.value?.sheet ?? null);

  return { sheet };
}
