import { useEffect, useState } from "react"
import FormularioCadastro from "../FormularioCadastro"
import ListaColaboradores from "../ListaColaboradores"
import "./style.css"
import { obterSecao, secoes, type SecaoId } from "./script"
import type { SecoesProps } from "./SecoesProps"
import type { DadosCadastroColaborador } from "../FormularioCadastro/script"
import type { Colaborador } from "../ListaColaboradores/script"
import {
	criarFuncionario,
	excluirFuncionario,
	listarFuncionarios,
} from "../../services/funcionarioApi"

function Secoes({ conteudos = {} }: SecoesProps) {
	const [secaoAtual, setSecaoAtual] = useState<SecaoId>("cadastro")
	const [colaboradores, setColaboradores] = useState<Colaborador[]>([])
	const [carregandoLista, setCarregandoLista] = useState(true)
	const [enviandoCadastro, setEnviandoCadastro] = useState(false)
	const [erroLista, setErroLista] = useState<string | null>(null)
	const [erroCadastro, setErroCadastro] = useState<string | null>(null)
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
		cadastro: <FormularioCadastro onCadastrar={cadastrarColaborador} enviando={enviandoCadastro} />,
		listagem: (
			<ListaColaboradores
				colaboradores={colaboradores}
				carregando={carregandoLista}
				erro={erroLista}
				onExcluir={removerColaborador}
			/>
		),
	}
	const conteudo = conteudos[secaoAtual] ?? conteudosPadrao[secaoAtual]

	function trocarSecao(proximaSecao: SecaoId) {
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
