import { useState, type ChangeEvent, type FormEvent } from "react"
import type { FormularioCadastroProps } from "./FormularioCadastroProps"
import { dadosCadastroIniciais, type DadosCadastroColaborador } from "./script"
import "./style.css"

function FormularioCadastro({ onCadastrar }: FormularioCadastroProps) {
	const [dados, setDados] = useState<DadosCadastroColaborador>(dadosCadastroIniciais)

	function alterarCampo(evento: ChangeEvent<HTMLInputElement>) {
		const { name, value } = evento.target

		setDados((dadosAtuais) => ({
			...dadosAtuais,
			[name]: value,
		}))
	}

	function cadastrarColaborador(evento: FormEvent<HTMLFormElement>) {
		evento.preventDefault()
		onCadastrar?.(dados)
		setDados(dadosCadastroIniciais)
	}

	return (
		<section className="formulario-cadastro" aria-labelledby="titulo-cadastro">
			<div className="formulario-cadastro-cabecalho">
				<p className="formulario-cadastro-identificador">Colaboradores</p>
				<h2 id="titulo-cadastro">Cadastrar colaborador</h2>
				<p>Informe os dados para incluir um novo colaborador.</p>
			</div>

			<form className="formulario-cadastro-form" onSubmit={cadastrarColaborador}>
				<div className="formulario-cadastro-campo formulario-cadastro-campo-completo">
					<label htmlFor="nome">Nome completo</label>
					<input
						id="nome"
						name="nome"
						type="text"
						value={dados.nome}
						onChange={alterarCampo}
						autoComplete="name"
						required
					/>
				</div>

				<div className="formulario-cadastro-campo">
					<label htmlFor="cargo">Cargo</label>
					<input
						id="cargo"
						name="cargo"
						type="text"
						value={dados.cargo}
						onChange={alterarCampo}
						required
					/>
				</div>

				<div className="formulario-cadastro-campo">
					<label htmlFor="email">E-mail corporativo</label>
					<input
						id="email"
						name="email"
						type="email"
						value={dados.email}
						onChange={alterarCampo}
						autoComplete="email"
						required
					/>
				</div>

				<div className="formulario-cadastro-acoes">
					<button className="formulario-cadastro-enviar" type="submit">
						Cadastrar colaborador
					</button>
				</div>
			</form>
		</section>
	)
}

export default FormularioCadastro