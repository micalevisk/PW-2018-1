-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Tempo de geração: 03/07/2018 às 17:50
-- Versão do servidor: 5.7.17-0ubuntu0.16.04.1
-- Versão do PHP: 7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `skifree`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `curso`
--

CREATE TABLE `curso` (
  `id` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `sigla` char(4) NOT NULL,
  `descricao` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `curso`
--

INSERT INTO `curso` (`id`, `nome`, `sigla`, `descricao`) VALUES
(1, 'Ciência da Computação', 'CC', 'um cursin aí maroto'),
(2, 'Engenharia de Software', 'ES', 'novo rolÊ hu3'),
(3, 'Engenharia da Computação', 'EC', 'galera da FT');

-- --------------------------------------------------------

--
-- Estrutura para tabela `jogada`
--

CREATE TABLE `jogada` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `pontuacao` float NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `jogada`
--

INSERT INTO `jogada` (`id`, `id_user`, `pontuacao`, `created_at`) VALUES
(1, 3, 22.08, 1530462650),
(2, 2, 123, 1530462650);

-- --------------------------------------------------------

--
-- Estrutura para tabela `migration`
--

CREATE TABLE `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `migration`
--

INSERT INTO `migration` (`version`, `apply_time`) VALUES
('m000000_000000_base', 1527685707),
('m130524_201442_init', 1527685709);

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `auth_key` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_reset_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id_curso` int(11) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '10',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Fazendo dump de dados para tabela `user`
--

INSERT INTO `user` (`id`, `username`, `auth_key`, `password_hash`, `password_reset_token`, `email`, `id_curso`, `status`, `created_at`, `updated_at`) VALUES
(2, 'joao', '0WwFX8ZiiXPL5O52x-wmBKahAWNT1iTv', '$2y$13$KUdkiRsrvX1TuavVboJVkOgCI2FoBx5dBa.2mG.Ij.HxQyrK4IIbW', NULL, 'joao@byte.com', 1, 10, 1529498874, 1529498874),
(3, 'micalevisk', 'HGJbjlxoEzcxUnQlcqywglYzAiQr0cDT', '$2y$13$RK.8hxTHdOMzoIT.gMZjme/wwbdn8qxK4XMX.QBFC8iCiYUNNB9A2', NULL, 'mllc@icomp.ufam.edu.br', 1, 10, 1530310781, 1530310781),
(4, 'joao_byte', 'TlcpsEdNHFE52UCa9moCA61lYuqiyqdm', '$2y$13$TNcYIcGMu7LZSchnSrb2LOCphllhOZpcriZx3WtvOD1PprEstsUa.', NULL, 'byte@gmail.com', 2, 10, 1530420606, 1530420606);

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `jogada`
--
ALTER TABLE `jogada`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `migration`
--
ALTER TABLE `migration`
  ADD PRIMARY KEY (`version`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `password_reset_token` (`password_reset_token`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `curso`
--
ALTER TABLE `curso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de tabela `jogada`
--
ALTER TABLE `jogada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
