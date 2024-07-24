# Launch Your Ideas Fast: Full Stack Serverless Development on AWS with Django and React

This monorepo is designed to quickly transform ideas into production-ready applications, minimizing the inertia that often delays projects from going live. It provides a complete solution for full-stack development, integrating a back-end API in Django (DRF) with a front-end SPA in React. The Django application is configured for deployment on AWS Lambda, using LocalStack for local deployment tests. It is also prepared for running in Docker containers, facilitating local development and supporting VSCode debugging. The project includes a robust environment for front-end development and supports publishing the SPA using AWS S3.

Our goal is to enable rapid development and deployment, helping you get your ideas off the ground and into production as efficiently as possible.

## Minimum Requirements

- **Node.js** (version 20 or higher)
- **Docker** (version 27 or higher)
- **Docker Compose** (version 2)
- **Python** (version 3.11 or higher)
- **pip-tools** (version 7 or higher)
- **AWS CLI** (for installation instructions, please refer to the [AWS CLI installation guide](https://docs.aws.amazon.com/cli/v1/userguide/install-linux.html))

\*Note: All procedures below assume a Linux OS.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/rafaelcmorais02/serverless-bridge.git
   cd serverless-bridge
   ```

2. **Install Node.js Dependencies**

   Navigate to the project's `root` directory and run:

   ```bash
   npm install
   ```

   Repeat the same procedure in the `client` directory:

   ```bash
   cd client
   npm install
   ```

3. **Prepare the Docker Environment**

   Create the requiments .txt files

   ```bash
   npm run compile
   ```

   \*Note: Make sure you have installed pip-tools first:

   ```bash
   pip install pip-tools
   ```

4. **Ensure You Have an AWS Profile Configured**

   Since this Serverless project uses the AWS provider, you need an account with configured credentials. Use the alias `sls-bridge` for your profile, which can be modified in `~/.aws/config`. If your alias is different from sls-bridge, update the `AWS_PROFILE` variable in `./scripts/dev-utils.sh`.

5. **Start the Services**

   To start the development environment run:

   ```bash
   npm run start
   ```

   It will start the Docker containers for LocalStack, Django, and PostgreSQL.

## Back-End Development

To work on the back-end, navigate to the api directory. There you will find the `local` folder with the `local_env.json` file. Any new development environment variables should be added to this JSON file. For deployment to LocalStack, the same property should be included in the environment section of the `serverless.functions.yml` file. The command:

```bash
npm run start
```

will add these variables both to the Django application container and the lambda wsgi within LocalStack.

## Front-End Development

To work on the front-end, navigate to the `client` directory and follow the instructions in the `package.json` to start the development server:

```bash
cd client
npm run dev
```

Any project development variables should be added to the `.env.development.local` file in the local directory and must be prefixed with `VITE_`.

## Back-End Deployment

Deployment environments:

- **staging** (stg)
- **produção** (prd)

1.  **Add Environment Variables in AWS**

    All environment variables in `api/local/local_env.json` need to be added to the `AWS Systems Manager Parameter Store` with their updated values. The name should follow the pattern:

    ```
    <project_name>-<stage>-<variable_name>
    ```

    example:

    ```
    sls-bridge-stg-POSTGRES_PASSWORD
    ```

2.  **Configure Serverless Deployment**

    Specific deployment configurations for Serverless can be adjusted in the `deploy-config.json` file. If you are satisfied with the default values, no changes are necessary.

3.  **Deploy**

    ```bash
    npx sls deploy -s <stage> --aws-profile <profile> --verbose
    ```

4.  **Run Migrations**

    ```bash
    npx sls wsgi manage --command "migrate" -s <stage> --aws-profile <profile> --verbose
    ```

5.  **Collect Static Files**

    ```bash
    npx sls wsgi manage --command "collectstatic --noinput" -s <stage> --aws-profile <profile> --verbose
    ```

## Front-End Deployment

1.  **Add Environment Variables**

    All environment variables in `.env.example` need to be added to the `.env.staging.local` and/or `.env.production.local` files with their updated values.

2.  **Create a Build File**

    In the `client` directory, run the command:

    ```bash
    npm run build:<stage>
    ```

3.  **Deploy**

    In the project root directory (where the .serverless.yml file is located), run the command:

    ```bash
    npx sls s3deploy -s <stage> --aws-profile <profile> --verbose
    ```

4.  **Test the SPA**

    You can now test the application by accessing:

    ```
    http://dist-<stage>.s3-website-<region>.amazonaws.com/
    ```
