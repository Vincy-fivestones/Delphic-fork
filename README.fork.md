# Delphic fork

This repo is forked from [marauder37/Delphic](https://github.com/marauder37/Delphic). It fixed the original repo [JSv4/Delphic](https://github.com/JSv4/Delphic/issues/16) issue 16.

## Prerequisite

- Python ([Download link](https://www.python.org/downloads/))
- NodeJS (v18.15.0 or above [Download link](https://nodejs.org/en/download))
- Docker ([Download link](https://www.docker.com/products/docker-desktop/))

## Local Development

1. Set up env

    ```commandline
      mkdir -p ./.envs/.local/
      cp -a ./docs/sample_envs/local/.frontend ./frontend
      cp -a ./docs/sample_envs/local/.django ./.envs/.local
      cp -a ./docs/sample_envs/local/.postgres ./.envs/.local
    ```

    **NOTE**

    (a) Paste the OpenAI API Key into /.envs/.local/.django
    (b) Change the PostgreSQL's DB, Username and password

2. Install required Python library

    ```
    pip install -r ./requirements/local.txt
    pre-commit install
    ```

3. Build the image

    ```commandline
    sudo docker-compose --profile fullstack -f local.yml build
    ```

4. Launch the application

    ```commandline
    sudo docker-compose --profile fullstack -f local.yml up
    ```

5.  Stop the appication and Setup a Django superuser

    This user will be also used as frontend and backend server login.

    ```
    sudo docker-compose -f local.yml run django python manage.py createsuperuser
    ```

6. Start the application again



## Develop / Modify the Frontend
It is suggested **NOT** to use the use the `--profile=fullstack` flag as every change will require a full container rebuild.

Typing yarn start will bring up your frontend development server at http://localhost:3000. You still need to launch the backend in order for it to work properly.

## Run Backend Compose Stack Without fullstack profile flag

```commandline
sudo docker-compose -f local.yml up
```
Django admin interface is hosted at http://localhost:8000/admin
