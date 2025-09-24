# App

Brev.ly server app.

## Requisitos

- [ ]  Deve ser possível criar um link
- [ ]  Não deve ser possível criar um link com URL encurtada mal formatada
- [ ]  Não deve ser possível criar um link com URL encurtada já existente
- [ ]  Deve ser possível deletar um link
- [ ]  Deve ser possível obter a URL original por meio de uma URL encurtada
- [ ]  Deve ser possível listar todas as URL’s cadastradas
- [ ]  Deve ser possível incrementar a quantidade de acessos de um link
- [x]  Deve ser possível exportar os links criados em um CSV
- [ ]  Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
- [x]  Deve ser gerado um nome aleatório e único para o arquivo
- [x]  Deve ser possível realizar a listagem de forma performática
- [x]  O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.