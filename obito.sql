-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14-Ago-2021 às 16:04
-- Versão do servidor: 10.4.20-MariaDB
-- versão do PHP: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `obito`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `guilds`
--

CREATE TABLE `guilds` (
  `server` varchar(18) NOT NULL,
  `CHANNEL_IDMEMBERCOUNT` varchar(18) NOT NULL,
  `CHANNEL_IDWELCOME` varchar(18) NOT NULL,
  `CHANNEL_IDLEAVE` varchar(18) NOT NULL,
  `IDCARGOADD` varchar(18) NOT NULL,
  `CHANNEL_IDLOG` varchar(18) NOT NULL,
  `prefix` varchar(5) NOT NULL,
  `lang` varchar(5) NOT NULL DEFAULT 'en'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `ID` varchar(18) NOT NULL,
  `xp` int(18) NOT NULL,
  `level` int(18) NOT NULL,
  `guild` varchar(18) NOT NULL,
  `background` varchar(3000) NOT NULL,
  `fundo` varchar(3) NOT NULL DEFAULT '1',
  `color` varchar(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `guilds`
--
ALTER TABLE `guilds`
  ADD PRIMARY KEY (`server`,`CHANNEL_IDMEMBERCOUNT`,`CHANNEL_IDWELCOME`,`IDCARGOADD`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
