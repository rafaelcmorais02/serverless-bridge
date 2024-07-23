#!/bin/bash
DOCKERFILE_PATH="./docker/docker-compose.yml"
AWS_PROFILE="sls-bridge"
REQUIREMENTSIN_PATH="./api/config/requirements"
DOT_ENV_PATH="./docker/.env"
JSON_ENV_PATH="./api/local/local_env.json"
LOAD_VARIABLES_SCRIPT="./scripts/load_variables.py"
LOCALSTACK_SERVICE_NAME="localstack"
VENV_PATH="./api/venv/bin/activate"

. "$VENV_PATH"
if [ $1 == "start" ]; then
    touch "$DOT_ENV_PATH"

    if [ ! -f "$JSON_ENV_PATH" ]; then
        echo "Error: JSON file $JSON_ENV_PATH not found."
        exit 1
    fi
    
    # Debug: Print contents of JSON file
    echo "Contents of JSON file:"
    cat "$JSON_ENV_PATH"
    
    # Convert JSON to .env format using sed, grep, and awk
    grep -o '"[^"]*": "[^"]*"' "$JSON_ENV_PATH" | 
    sed -e 's/"//g' -e 's/: /=/' > "$DOT_ENV_PATH"
    
    # Debug: Print contents of .env file
    echo "Contents of .env file:"
    cat "$DOT_ENV_PATH"

    docker compose --file "$DOCKERFILE_PATH" up "$LOCALSTACK_SERVICE_NAME"  -d 
    if [ $? -eq 0 ]; then
        sleep 3
        python "$LOAD_VARIABLES_SCRIPT"
        if [ $? -eq 0 ]; then
            docker compose --file "$DOCKERFILE_PATH" up -d --build
            if [ $? -eq 0 ]; then
                npx sls deploy -s local --aws-profile $AWS_PROFILE --verbose 
                if [ $? -eq 0 ]; then
                    sleep 3
                    npx sls wsgi manage --command "collectstatic --noinput" -s local --aws-profile $AWS_PROFILE
                fi
            fi
        fi
    fi
elif [ $1 == "stop" ]; then
    docker compose --file "$DOCKERFILE_PATH" down
elif [ $1 == "prune" ]; then
    docker compose --file "$DOCKERFILE_PATH" down -v
elif [ $1 == "migrations" ]; then
    npx sls wsgi manage --command "showmigrations" -s local --aws-profile $AWS_PROFILE
elif [ $1 == "compile" ]; then
    pip-compile "${REQUIREMENTSIN_PATH}/local-requirements.in" --upgrade --strip-extras --no-annotate --generate-hashes --pip-args "--retries 3 --timeout 30" --allow-unsafe --output-file="${REQUIREMENTSIN_PATH}/compiled/local-requirements.txt"
    pip-compile "${REQUIREMENTSIN_PATH}/stg-requirements.in" --upgrade --strip-extras --no-annotate --generate-hashes --pip-args "--retries 3 --timeout 30" --allow-unsafe --output-file="${REQUIREMENTSIN_PATH}/compiled/stg-requirements.txt"
    pip-compile "${REQUIREMENTSIN_PATH}/prd-requirements.in" --upgrade --strip-extras --no-annotate --generate-hashes --pip-args "--retries 3 --timeout 30" --allow-unsafe --output-file="${REQUIREMENTSIN_PATH}/compiled/prd-requirements.txt"
    pip-sync "${REQUIREMENTSIN_PATH}/compiled/local-requirements.txt"
fi 