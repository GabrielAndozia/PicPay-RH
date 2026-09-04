import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import type { FormularioCadastroProps } from "./FormularioCadastroProps"
import { dadosCadastroIniciais, type DadosCadastroColaborador } from "./script"
import "./style.css"

function FormularioCadastro({
	modo = "cadastro",
	onCadastrar,
	onAtualizar,
	onBuscarPorId,
	onCancelarEdicao,
	colaboradorEmEdicao = null,
	enviando = false,
}: FormularioCadastroProps) {
	const [dados, setDados] = useState<DadosCadastroColaborador>(dadosCadastroIniciais)
	const [idBusca, setIdBusca] = useState("")
	const [idCarregado, setIdCarregado] = useState<number | null>(null)
	const exibindoBusca = modo === "edicao"
	const emEdicao = colaboradorEmEdicao !== null
	const idBuscaNormalizado = idBusca.trim()
	const idBuscaCorrespondeAoCarregado =
		emEdicao && idCarregado !== null && idBuscaNormalizado === String(idCarregado)
	const podeEditar = !exibindoBusca || idBuscaCorrespondeAoCarregado

	useEffect(() => {
		if (colaboradorEmEdicao) {
			const { id, ...dadosColaborador } = colaboradorEmEdicao
			setDados(dadosColaborador)
			setIdBusca(String(id))
			setIdCarregado(id)
			return
		}

		setDados(dadosCadastroIniciais)
		setIdCarregado(null)
	}, [colaboradorEmEdicao])

	function alterarCampo(evento: ChangeEvent<HTMLInputElement>) {
		const { name, value } = evento.target
		const valor = name === "salario" ? Number(value) : value

		setDados((dadosAtuais) => ({
			...dadosAtuais,
			[name]: valor,
		}))
	}

	async function submeterFormulario(evento: FormEvent<HTMLFormElement>) {
		evento.preventDefault()

		if (modo === "edicao" && !emEdicao) {
			return
		}

		if (emEdicao && colaboradorEmEdicao) {
			await onAtualizar?.(colaboradorEmEdicao.id, dados)
			return
		}

		await onCadastrar?.(dados)
		setDados(dadosCadastroIniciais)
	}

	async function buscarPorId(evento: FormEvent<HTMLFormElement>) {
		evento.preventDefault()
		const id = Number(idBusca)

		if (!Number.isInteger(id) || id <= 0) {
			return
		}

		await onBuscarPorId?.(id)
	}

	function cancelarEdicao() {
		onCancelarEdicao?.()
		setDados(dadosCadastroIniciais)
		setIdBusca("")
		setIdCarregado(null)
	}

	return (
		<section className="formulario-cadastro" aria-labelledby="titulo-cadastro">
			<div className="formulario-cadastro-cabecalho">
				<p className="formulario-cadastro-identificador">Colaboradores</p>
				<h2 id="titulo-cadastro">
					{modo === "cadastro"
						? "Cadastrar colaborador"
						: emEdicao
							? "Atualizar colaborador"
							: "Pesquisar colaborador para atualizar"}
				</h2>
				<p>
					{modo === "cadastro"
						? "Informe os dados para incluir um novo colaborador."
						: emEdicao
							? "Revise os dados e confirme a atualizacao do registro."
							: "Digite o ID para carregar os dados antes de atualizar."}
				</p>

				{exibindoBusca ? (
					<form className="formulario-cadastro-busca" onSubmit={buscarPorId}>
						<label htmlFor="idBusca">Pesquisar para atualizar (ID)</label>
						<div className="formulario-cadastro-busca-campo">
							<input
								id="idBusca"
								name="idBusca"
								type="number"
								min="1"
								step="1"
								value={idBusca}
								onChange={(evento) => {
									setIdBusca(evento.target.value)
								}}
								disabled={enviando}
								placeholder="Ex.: 1"
							/>
							<button type="submit" disabled={enviando || idBusca.trim().length === 0}>
								Buscar
							</button>
						</div>
						{!podeEditar ? (
							<p className="formulario-cadastro-busca-aviso">
								Busque o ID informado para habilitar a edicao dos campos.
							</p>
						) : null}
					</form>
				) : null}
			</div>

			<form className="formulario-cadastro-form" onSubmit={submeterFormulario}>
				<div className="formulario-cadastro-campo formulario-cadastro-campo-completo">
					<label htmlFor="nome">Nome completo</label>
					<input
						id="nome"
						name="nome"
						type="text"
						value={dados.nome}
						onChange={alterarCampo}
						autoComplete="name"
						disabled={enviando || !podeEditar}
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
						disabled={enviando || !podeEditar}
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
						disabled={enviando || !podeEditar}
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
						disabled={enviando || !podeEditar}
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
						disabled={enviando || !podeEditar}
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
						disabled={enviando || !podeEditar}
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
						disabled={enviando || !podeEditar}
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
						disabled={enviando || !podeEditar}
						required
					/>
				</div>

				<div className="formulario-cadastro-acoes">
					{exibindoBusca && emEdicao ? (
						<button
							className="formulario-cadastro-cancelar"
							type="button"
							onClick={cancelarEdicao}
							disabled={enviando}
						>
							Cancelar
						</button>
					) : null}
					<button
						className="formulario-cadastro-enviar"
						type="submit"
						disabled={enviando || (exibindoBusca && (!emEdicao || !podeEditar))}
					>
						{enviando
							? exibindoBusca
								? "Atualizando..."
								: "Cadastrando..."
							: exibindoBusca
								? "Atualizar colaborador"
								: "Cadastrar colaborador"}
					</button>
				</div>
			</form>
		</section>
	)
}

export default FormularioCadastro