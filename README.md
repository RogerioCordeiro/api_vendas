- A configuração de campo para receber data com o tipo timestamp que será exibida ao longo do curso, deve ser substituída para que não tenhamos problemas com fuso horário.

- Em todas as aulas em que houver criação de migration, considerar colocar os campos com o tipo timestamp com o valor timestamp with time zone.

- Substituir por (em todas as migrações da aplicação):

```json
  {
  name: 'created_at',
  type: 'timestamp with time zone',
  default: 'now()',
  },
  {
  name: 'updated_at',
  type: 'timestamp with time zone',
  default: 'now()',
  },
```
