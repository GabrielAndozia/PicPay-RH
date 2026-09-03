import { useState, type ChangeEvent, type FormEvent } from "react"
import type { FormularioCadastroProps } from "./FormularioCadastroProps"
import { dadosCadastroIniciais, type DadosCadastroColaborador } from "./script"
import "./style.css"

function FormularioCadastro({ onCadastrar, enviando = false }: FormularioCadastroProps) {
	const [dados, setDados] = useState<DadosCadastroColaborador>(dadosCadastroIniciais)

	function alterarCampo(evento: ChangeEvent<HTMLInputElement>) {
		const { name, value } = evento.target
		const valor = name === "salario" ? Number(value) : value

		setDados((dadosAtuais) => ({
			...dadosAtuais,
			[name]: valor,
		}))
	}

	async function cadastrarColaborador(evento: FormEvent<HTMLFormElement>) {
		evento.preventDefault()
		await onCadastrar?.(dados)
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
						disabled={enviando}
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
						disabled={enviando}
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
						disabled={enviando}
						required
					/>
				</div>

				<div className="formulario-cadastro-campo">
					<label htmlFor="telefone">Telefone</label>
					<input
						id="telefone"
						name="telefone"
						type="tel"
						value={dados.telefone}
						onChange={alterarCampo}
						disabled={enviando}
						required
					/>
				</div>

				<div className="formulario-cadastro-campo">
					<label htmlFor="departamento">Departamento</label>
					<input
						id="departamento"
						name="departamento"
						type="text"
						value={dados.departamento}
						onChange={alterarCampo}
						disabled={enviando}
						required
					/>
				</div>

				<div className="formulario-cadastro-campo">
					<label htmlFor="salario">Salario</label>
					<input
						id="salario"
						name="salario"
						type="number"
						min="0"
						step="0.01"
						value={dados.salario}
						onChange={alterarCampo}
						disabled={enviando}
						required
					/>
				</div>

				<div className="formulario-cadastro-campo">
					<label htmlFor="cidade">Cidade</label>
					<input
						id="cidade"
						name="cidade"
						type="text"
						value={dados.cidade}
						onChange={alterarCampo}
						disabled={enviando}
						required
					/>
				</div>

				<div className="formulario-cadastro-campo">
					<label htmlFor="status">Status</label>
					<input
						id="status"
						name="status"
						type="text"
						value={dados.status}
						onChange={alterarCampo}
						disabled={enviando}
						required
					/>
				</div>

				<div className="formulario-cadastro-acoes">
					<button className="formulario-cadastro-enviar" type="submit" disabled={enviando}>
						{enviando ? "Cadastrando..." : "Cadastrar colaborador"}
					</button>
				</div>
			</form>
		</section>
	)
}

export default FormularioCadastro