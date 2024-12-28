FROM ubuntu:latest

RUN apt update && apt install -y \
    postgresql postgresql-contrib \
	apache2 \
	npm \
	git \
	curl

ENV POSTGRES_USER=rrr \
    POSTGRES_PASSWORD=rrr \
	POSTGRES_DB=Calculadora

RUN sed -i "s/local   all             all                                     peer/local   all             all                                     md5/" /etc/postgresql/*/main/pg_hba.conf

COPY sql/create_table.sql /docker-entrypoint-initdb.d/
	
EXPOSE 5432 80 3000

RUN echo "#!/bin/bash\n\
service postgresql start\n\
service apache2 start\n\
tail -f /dev/null" > /usr/local/bin/start_services.sh && \
chmod +x /usr/local/bin/start_services.sh

CMD ["/usr/local/bin/start_services.sh"]