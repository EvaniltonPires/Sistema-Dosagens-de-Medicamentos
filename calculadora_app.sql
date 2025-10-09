CREATE DATABASE IF NOT EXISTS calculadora_app;

USE calculadora_app;

-- Tabela para armazenar histórico da regra de três
CREATE TABLE regra_de_tres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor_a FLOAT NOT NULL,
    valor_b FLOAT NOT NULL,
    valor_c FLOAT NOT NULL,
    resultado FLOAT NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Tabela para armazenar histórico de conversão de unidades
CREATE TABLE conversao_unidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor_original FLOAT NOT NULL,
    unidade_origem VARCHAR(10) NOT NULL,
    unidade_destino VARCHAR(10) NOT NULL,
    resultado FLOAT NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para armazenar histórico de cálculo de gotejamento
CREATE TABLE gotejamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    volume FLOAT NOT NULL,
    tempo_horas FLOAT NOT NULL,
    fator_gotejamento INT NOT NULL,
    resultado FLOAT NOT NULL,
    unidade_resultado VARCHAR(20) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para armazenar histórico da calculadora básica
CREATE TABLE calculadora_basica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    num1 FLOAT NOT NULL,
    num2 FLOAT NOT NULL,
    operacao VARCHAR(20) NOT NULL,
    resultado FLOAT NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);