import { useEffect, useState } from "react"
import FormularioCadastro from "../FormularioCadastro"
import ListaColaboradores from "../ListaColaboradores"
import "./style.css"
import { obterSecao, secoes, type SecaoId } from "./script"
import type { SecoesProps } from "./SecoesProps"
import type { DadosCadastroColaborador } from "../FormularioCadastro/script"
import type { Colaborador } from "../ListaColaboradores/script"
import {
	buscarFuncionarioPorId,
	criarFuncionario,
	excluirFuncionario,
	listarFuncionarios,
	atualizarFuncionario,
} from "../../services/funcionarioApi"

function Secoes({ conteudos = {} }: SecoesProps) {
	const [secaoAtual, setSecaoAtual] = useState<SecaoId>("cadastro")
	const [colaboradores, setColaboradores] = useState<Colaborador[]>([])
	const [carregandoLista, setCarregandoLista] = useState(true)
	const [enviandoCadastro, setEnviandoCadastro] = useState(false)
	const [enviandoEdicao, setEnviandoEdicao] = useState(false)
	const [erroLista, setErroLista] = useState<string | null>(null)
	const [erroCadastro, setErroCadastro] = useState<string | null>(null)
	const [erroEdicao, setErroEdicao] = useState<string | null>(null)
	const [colaboradorEmEdicao, setColaboradorEmEdicao] = useState<Colaborador | null>(null)
	const secao = obterSecao(secaoAtual)

	useEffect(() => {
		async function carregarColaboradores() {
			setCarregandoLista(true)
			setErroLista(null)

			try {
				const funcionarios = await listarFuncionarios()
				setColaboradores(funcionarios)
			} catch (error) {
				setErroLista(
					error instanceof Error
						? error.message
						: "Nao foi possivel carregar os colaboradores.",
				)
			} finally {
				setCarregandoLista(false)
			}
		}

		void carregarColaboradores()
	}, [])

	async function cadastrarColaborador(dados: DadosCadastroColaborador) {
		setEnviandoCadastro(true)
		setErroCadastro(null)

		try {
			const funcionarioCriado = await criarFuncionario(dados)
			setColaboradores((listaAtual) => [...listaAtual, funcionarioCriado])
		} catch (error) {
			setErroCadastro(
				error instanceof Error
					? error.message
					: "Nao foi possivel cadastrar o colaborador.",
			)
		} finally {
			setEnviandoCadastro(false)
		}
	}

	async function atualizarColaborador(id: number, dados: DadosCadastroColaborador) {
		setEnviandoEdicao(true)
		setErroEdicao(null)

		try {
			const funcionarioAtualizado = await atualizarFuncionario(id, dados)
			setColaboradores((listaAtual) =>
				listaAtual.map((colaborador) =>
					colaborador.id === funcionarioAtualizado.id ? funcionarioAtualizado : colaborador,
				),
			)
			setColaboradorEmEdicao(null)
		} catch (error) {
			setErroEdicao(
				error instanceof Error
					? error.message
					: "Nao foi possivel atualizar o colaborador.",
			)
		} finally {
			setEnviandoEdicao(false)
		}
	}

	async function buscarColaboradorPorId(id: number) {
		setEnviandoEdicao(true)
		setErroEdicao(null)

		try {
			const funcionario = await buscarFuncionarioPorId(id)
			setColaboradorEmEdicao(funcionario)
		} catch (error) {
			setErroEdicao(
				error instanceof Error
					? error.message
					: "Nao foi possivel buscar o colaborador por ID.",
			)
		} finally {
			setEnviandoEdicao(false)
		}
	}

	function iniciarEdicao(colaborador: Colaborador) {
		setErroEdicao(null)
		setColaboradorEmEdicao(colaborador)
		setSecaoAtual("edicao")
	}

	function cancelarEdicao() {
		setColaboradorEmEdicao(null)
		setErroEdicao(null)
	}

	async function removerColaborador(colaborador: Colaborador) {
		try {
			await excluirFuncionario(colaborador.id)
			setColaboradores((listaAtual) =>
				listaAtual.filter(({ id }) => id !== colaborador.id),
			)
		} catch (error) {
			setErroLista(
				error instanceof Error
					? error.message
					: "Nao foi possivel excluir o colaborador.",
			)
		}
	}

	const conteudosPadrao = {
		cadastro: (
			<FormularioCadastro
				modo="cadastro"
				onCadastrar={cadastrarColaborador}
				enviando={enviandoCadastro}
			/>
		),
		edicao: (
			<FormularioCadastro
				modo="edicao"
				onAtualizar={atualizarColaborador}
				onBuscarPorId={buscarColaboradorPorId}
				onCancelarEdicao={cancelarEdicao}
				colaboradorEmEdicao={colaboradorEmEdicao}
				enviando={enviandoEdicao}
			/>
		),
		listagem: (
			<ListaColaboradores
				colaboradores={colaboradores}
				carregando={carregandoLista}
				erro={erroLista}
				onEditar={iniciarEdicao}
				onExcluir={removerColaborador}
			/>
		),
	}
	const conteudo = conteudos[secaoAtual] ?? conteudosPadrao[secaoAtual]

	function trocarSecao(proximaSecao: SecaoId) {
		if (proximaSecao !== "edicao") {
			setColaboradorEmEdicao(null)
			setErroEdicao(null)
		}

		setSecaoAtual(proximaSecao)
	}

	return (
		<section className="secoes" aria-label="Funcionalidades de colaboradores">
			<nav className="secoes-navegacao" aria-label="Acoes de colaboradores">
				{secoes.map((opcao) => {
					const ativa = opcao.id === secaoAtual

					return (
						<button
							className="secoes-acao"
							type="button"
							key={opcao.id}
							aria-current={ativa ? "page" : undefined}
							onClick={() => trocarSecao(opcao.id)}
						>
							{opcao.titulo}
						</button>
					)
				})}
			</nav>

			<div className="secoes-conteudo">
				{secaoAtual === "cadastro" && erroCadastro ? (
					<p className="secoes-estado">{erroCadastro}</p>
				) : secaoAtual === "edicao" && erroEdicao ? (
					<p className="secoes-estado">{erroEdicao}</p>
				) : null}
				{conteudo ?? (
					<div className="secoes-estado">
						<p className="secoes-identificador">Colaboradores</p>
						<h2>{secao.titulo}</h2>
						<p>{secao.descricao}</p>
					</div>
				)}
			</div>
		</section>
	)
}

export default Secoes
