# Calculadora - Sistemas Distribuídos

**Escola:** Escola Superior de Tecnologia e Gestão de Lamego

**Docente:** Nuno Romeu Cardoso Sequeira 

**Disciplina:** Sistemas Distribuidos

**Estudantes:** Ricardo Cunha, Rodrigo Siqueira e Ronilson Gomes 

**Projeto:** Calculadora Distribuída em Modelo Cliente-Servidor com API RESTful.

**Front-end:** Desenvolvido por Rodrigo Siqueira (HTML, CSS e JavaScript)

**Back-end:** Desenvolvido por Ricardo Cunha (Express.js e JSON)

**Configuração do Docker e da Base de Dados:** Desenvolvido por Ronilson Gomes (Docker e PostgreSQL)

## Configuração Docker

Criar container:
```bash
docker run -it -p 8080:80 -p 3000:3000 --name teste-SD ubuntu
```

Instalar dependências:
```bash
apt update && apt install apache2 -y && apt install git -y && apt install npm -y
```

Iniciar o apache:
```bash
service apache2 start && cd /var/www/html
```

Clonar repositório e instalar dependências:
```bash
git clone https://github.com/RodrigoESTGL/Calculadora_SD.git && cd Calculadora_SD && npm install
```

Correr o servidor:
```bash
node JS/server.js
```

Após isso, é só aceder a [localhost:8080/Calculadora_SD](http://localhost:8080/Calculadora_SD)
