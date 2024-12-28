CREATE TABLE Operacoes (
    id BIGINT PRIMARY KEY,  -- Chave primária do tipo BIGINT
    op VARCHAR(100) NOT NULL,  -- Coluna 'op' do tipo VARCHAR com máximo de 100 caracteres, não nula
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Coluna 'timestamp' com valor padrão sendo a hora atual
);