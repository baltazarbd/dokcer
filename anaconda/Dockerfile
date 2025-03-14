FROM nexus.fbsvc.bz/stcit_docker/python:3.12.3
WORKDIR /app
ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1 PROMETHEUS_MULTIPROC_DIR=/tmp/prometheus_multiproc
RUN mkdir -p $PROMETHEUS_MULTIPROC_DIR
RUN apt-get update \
    && apt-get install -y     curl     wget     bzip2     libgfortran5     libgomp1     liblapack3     libblas3     \
    && rm -rf /var/lib/apt/lists/*

ARG ANACONDA_URL=https://repo.anaconda.com/archive/Anaconda3-2024.06-1-Linux-x86_64.sh
ENV ANACONDA_HOME=/srv/anaconda3
ENV PATH=/srv/anaconda3/bin:/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
RUN ANACONDA_URL=https://repo.anaconda.com/archive/Anaconda3-2024.06-1-Linux-x86_64.sh wget -O /tmp/anaconda.sh "${ANACONDA_URL}"     \
    && bash /tmp/anaconda.sh -b -p ${ANACONDA_HOME}     \
    && rm /tmp/anaconda.sh     \
    && chmod -R 755 ${ANACONDA_HOME}
RUN conda config --append channels conda-forge     \
    && conda config --add pkgs_dirs /srv/pkgs/     \
    && conda config --set pip_interop_enabled True
RUN conda install --yes idaes-pse
RUN conda run  idaes get-extensions
RUN conda install --yes  -c conda-forge idaes-pse ipopt glpk
COPY requirements.txt .
RUN /srv/anaconda3/bin/pip install --no-cache-dir --upgrade pip \
    &&     /srv/anaconda3/bin/pip install --no-cache-dir -r requirements.txt \
    &&     idaes get-extensions --distro ubuntu2004
COPY . .
EXPOSE 8000
CMD ["/srv/anaconda3/bin/gunicorn", "api.main:app", "-c", "gunicorn_config.py", "--log-config", "logger.conf", "--workers", "10", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]