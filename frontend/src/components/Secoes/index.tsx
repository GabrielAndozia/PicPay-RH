import { useState } from "react"
import FormularioCadastro from "../FormularioCadastro"
import ListaColaboradores from "../ListaColaboradores"
import "./style.css"
import { obterSecao, secoes, type SecaoId } from "./script"
import type { SecoesProps } from "./SecoesProps"

function Secoes({ conteudos = {} }: SecoesProps) {
	const [secaoAtual, setSecaoAtual] = useState<SecaoId>("cadastro")
	const secao = obterSecao(secaoAtual)
	const conteudosPadrao = {
		cadastro: <FormularioCadastro />,
		listagem: <ListaColaboradores />,
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
