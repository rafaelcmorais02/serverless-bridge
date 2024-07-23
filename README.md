# Projeto Serverless para Criação de Serviços Full Stack na AWS: APIs com DRF e SPA com React

Este monorepo é uma solução completa para desenvolvimento full stack, integrando uma API back-end em Django (DRF) com uma aplicação front-end SPA em React. A aplicação Django está configurada para implantação no AWS Lambda, utilizando LocalStack para testes locais de deployment. Além disso, está preparada para execução em contêineres Docker, facilitando o desenvolvimento local, dando suporte à ferramenta de debug do VSCode. O projeto também inclui um ambiente robusto para desenvolvimento front-end e suporte para publicação da SPA usando o AWS S3.

## Requisitos Mínimos

- **Node.js** (versão 20 ou superior)
- **Docker** (versão 27 ou superior)
- **Docker Compose** (versão 2)
- **Python** (versão 3.11 ou superior)
- **pip-tools** (versão 7 ou superior)
- **AWS CLI** (guia de instalação: https://docs.aws.amazon.com/pt_br/cli/v1/userguide/install-linux.html)

\*Obs¹: Todos os procedimentos descritos abaixo assumem SO Linux.

## Instalação

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/rafaelcmorais02/serverless-bridge.git
   cd serverless-bridge
   ```

2. **Instale Dependências Node.js**

   Navegue até a pasta raiz do projeto e execute:

   ```bash
   npm install
   ```

   Repita o mesmo procedimento dentro da pasta `client`

   ```bash
   cd client
   npm install
   ```

3. **Prepare o Ambiente Docker**

   Crie e configure os arquivos necessários:

   ```bash
   npm run compile
   ```

   \*Obs¹: Lembre-se antes de instalar o módulo pip-tools

   ```bash
   pip install pip-tools
   ```

4. **Certifique-se de que você tenha um perfil AWS configurado**

   Como esse projeto Serverless utiliza o provedor AWS, é necessário ter uma conta e ter configurado suas credenciais. Utilize o alias `sls-bridge` para seu perfil, que pode ser alterado no seguinte diretório: ~/.aws/config
   \*Obs¹: Caso o alias seja diferente de `sls-bridge`, a variável `AWS_PROFILE` deve ser alterada dentro de ./scripts/dev-utils.sh

5. **Inicie os Serviços**

   Para iniciar o ambiente de desenvolvimento, execute:

   ```bash
   npm run start
   ```

   Isso iniciará os containers Docker para LocalStack, Django e PostgreSQL.

## Desenvolvimento Back-End

Para trabalhar no back-end, navegue até a pasta `api`. Lá você encontrará a pasta `local` com o arquivo `local_env.json`. Qualquer nova variável de ambiente de desenvolvimento deve ser adicionada no mesmo JSON. Para o deploy no `localstack` a mesma propriedade deve ser incluída em `environment` do arquivo `serverless.functions`. O comando

```bash
npm run start
```

irá adicionar essas variáveis tanto no container da aplicação Django quanto na lambda wsgi dentro do `localstack`

## Desenvolvimento Front-End

Para trabalhar no front-end, navegue até a pasta `client` e siga as instruções no `package.json` para iniciar o servidor de desenvolvimento.

```bash
cd client
npm run dev
```

Qualquer variável de desenvolvimento do projeto deve ser adicionada dentro do arquivo `.env.development.local` dentro da pasta `local`, e precisa ter o prefixo `VITE_`.

## Deploy do Back-End

Ambientes para deploy <-s>

- **staging** (stg)
- **produção** (prd)

1.  **Adicione as variáveis de ambiente**

    todas as variáveis de ambiente dentro de `api/local/local_env.json` precisarão ser adicionadas do `repositório de parâmetros` da aws com seus respectivos valores atualizados. O nome deve seguir o padrão

    ```
    <nome_do_projeto>-<stage>-<nome_da_variavel>
    ```

    exemplo:

    ```
    sls-bridge-stg-POSTGRES_PASSWORD
    ```

2.  **Configure o deploy**

    as configurações específicas para o deploy do Serverless podem ser ajustadas no arquivo deploy-config.json. Caso esteja satisfeito com os valores padrão, não é necessário fazer alterações neste arquivo.

3.  **Faça o deploy**

    ```bash
    npx sls deploy -s <stage> --aws-profile <profile> --verbose
    ```

4.  **Faça a migration**

    ```bash
    npx sls wsgi manage --command "migrate" -s <stage> --aws-profile <profile> --verbose
    ```

5.  **Colete os arquivos estáticos**

    ```bash
    npx sls wsgi manage --command "collectstatic --noinput" -s <stage> --aws-profile <profile> --verbose
    ```

6.  **Teste a aplicação**

    Agora a aplicação pode ser testada acessando:

    ```
    https://<api-id>.execute-api.<region>.amazonaws.com/<stage>/admin/
    ```

## Deploy do Front-End

Ambientes para deploy <-s>

- **staging** (stg)
- **produção** (prd)

1.  **Adicione as variáveis de ambiente**

    todas as variáveis de ambiente dentro de `.env.development.local` precisarão ser adicionadas nos arquivos `.env.staging.local` e `.env.production.local` com seus respectivos valores atualizados

2.  **Crie um arquivo de build**

    dentro da pasta `client` rode o comando

    ```bash
    npm run build:<stage>
    ```

3.  **Faça o deploy**

    na raiz do projeto (onde está o arquivo .serverless.yml) rode o comando

    ```bash
    npx sls s3deploy -s <stage> --aws-profile <profile> --verbose
    ```

4.  **Teste a SPA**

    Agora a aplicação pode ser testada acessando:

    ```
    http://dist-<stage>.s3-website-<region>.amazonaws.com/
    ```
