FROM postgres:16

RUN apt update && apt install -y \
	apache2 \
	npm \
	git \
	curl \
	postgresql-contrib

ENV POSTGRES_USER=rrr \
    POSTGRES_PASSWORD=rrr \
	POSTGRES_DB=Calculadora

COPY sql/create_table.sql /docker-entrypoint-initdb.d/
	
EXPOSE 5432 80 3000

RUN echo "#!/bin/bash\n\
docker-entrypoint.sh postgres &\n\
service apache2 start\n\
tail -f /dev/null" > /usr/local/bin/start_services.sh && \
chmod +x /usr/local/bin/start_services.sh

CMD ["/usr/local/bin/start_services.sh"]