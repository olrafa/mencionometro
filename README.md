## Mencionômetro

Temos um robô rodando os principais sites de notícia do Brasil, procruando por termos específicos. Esta API serve os resultados.

O front-end para o termo "Neymar" está [aqui](https://github.com/olrafa/neymarmeter)

### Desenvolvimento

A parte mais importante do app é a API, feita em Typescript com Express.

### Clonando

Depois de clonar o repo, fazer o `npm install`. Rodando com `npm run dev`, o Express servirá o app na porta 3002 e o Nodemon fará um reload a cada vez que detectar uma mudança.

Não se esqueça de criar um arquivo `.env` com as informações do seu banco de dados local.
