FROM node:13 as stage1
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ENV CI 1
WORKDIR /app
COPY webpack/ /app/webpack/
COPY package.json package-lock.json .babelrc .eslintrc tsconfig.json /app/
RUN echo "NODE_ENV=$NODE_ENV" >> /app/.env \
    && echo "CI=$CI" >> /app/.env \
    && echo "npm_config_loglevel=error" >> /app/.env \
    && chown -R node:node /app \
    && su - node -c "\
    cd /app \
    && set -a; source .env; set +a \
    && npm ci \
    && npm run test \
    && npm run-script build"


FROM python:3.7.7-slim as stage2
ENV PIPENV_VENV_IN_PROJECT "enabled"
ENV FLASK_APP=run.py
ENV FLASK_ENV=production
ENV FLASK_DEBUG=0
ENV FLASK_LOG=/var/log/lab-portal/flask-log.log
ENV PYCHARM_REMOTE_DEBUG=0
ENV PYCHARM_REMOTE_DEBUG_PORT=1234
ENV SECRET_KEY=xxx
ENV DATABASE_URL=xxx
ENV SESSION_REDIS=redis://redis:6379
ENV SESSION_COOKIE_NAME=genomic-lab-session
ENV NODE_ENV=production
ENV AWS_LAB_PORTAL_KEY=xxx
ENV AWS_LAB_PORTAL_SECRET=xxx
ENV CSRF_HEADER=X-CSRFToken
ENV RUN_MODE=app
ENV TZ=America/New_York
RUN apt-get update \
    && apt-get install -y \
    libev-dev \
    python3-dev \
    libevdev2 \
    libpq-dev \
    gcc \
    nginx \
    htop \
    psmisc \
    supervisor \
    git \
    && rm -rf /var/lib/apt/lists/* \
    && update-rc.d -f nginx disable
RUN pip install pipenv
COPY Pipfile Pipfile.lock /app/
RUN cd /app \
    && pipenv install --skip-lock \
    && pipenv install uwsgi pydevd-pycharm --skip-lock --ignore-pipfile

FROM stage2 as stage3
COPY build/app/nginx.nginx /etc/nginx/nginx.conf
COPY build/app/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY . /app
COPY --from=stage1 /app/app/static/dist/ /app/app/static/dist/
COPY ./build/app/entrypoint.sh /entrypoint.sh
COPY ./build/app/update_analysis_api.sh /update_analysis_api.sh
COPY ./build/app/update_runs.sh /update_runs.sh
RUN chmod +x /entrypoint.sh && chmod +x /update_analysis_api.sh && chmod +x /update_runs.sh

ENTRYPOINT /entrypoint.sh
WORKDIR /app
RUN mkdir -p /var/log/lab-portal/ \
    && mkdir -p /var/run/uwsgi/ \
    && chown -R www-data:www-data /var/log/lab-portal

