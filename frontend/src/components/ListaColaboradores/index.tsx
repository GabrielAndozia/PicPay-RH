import { useMemo, useState } from "react"
import ItemColaborador from "../ItemColaborador"
import ConfirmacaoExclusao from "../ConfirmacaoExclusao"
import type { Colaborador } from "./script"
import "./style.css"
import type { ListaColaboradoresProps } from "./ListaColaboradoresProps"

function normalizarTexto(valor: string): string {
	return valor
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/\s+/g, " ")
		.trim()
}

function correspondeAoFiltro(valor: string | number | null | undefined, filtro: string): boolean {
	const filtroNormalizado = normalizarTexto(filtro)

	if (!filtroNormalizado) {
		return true
	}

	const valorNormalizado = normalizarTexto(String(valor ?? ""))
	const termosBusca = filtroNormalizado.split(" ")

	return termosBusca.every((termo) => valorNormalizado.includes(termo))
}

function ListaColaboradores({
	colaboradores = [],
	carregando = false,
	erro = null,
	onEditar,
	onExcluir,
}: ListaColaboradoresProps) {
	const [filtroId, setFiltroId] = useState("")
	const [filtroNome, setFiltroNome] = useState("")
	const [filtroCargo, setFiltroCargo] = useState("")
	const [colaboradorParaExcluir, setColaboradorParaExcluir] = useState<Colaborador | null>(null)

	function abrirConfirmacaoExclusao(colaborador: Colaborador) {
		setColaboradorParaExcluir(colaborador)
	}

	function fecharConfirmacaoExclusao() {
		setColaboradorParaExcluir(null)
	}

	async function excluirColaborador() {
		if (!colaboradorParaExcluir) {
			return
		}

		await onExcluir?.(colaboradorParaExcluir)
		fecharConfirmacaoExclusao()
	}

	const colaboradoresFiltrados = useMemo(() => {
		const idNormalizado = normalizarTexto(filtroId)
		const nomeNormalizado = normalizarTexto(filtroNome)
		const cargoNormalizado = normalizarTexto(filtroCargo)

		if (!idNormalizado && !nomeNormalizado && !cargoNormalizado) {
			return colaboradores
		}

		return colaboradores.filter((colaborador) => {
			const correspondeId = correspondeAoFiltro(colaborador.id, idNormalizado)
			const correspondeNome = correspondeAoFiltro(colaborador.nome, nomeNormalizado)
			const correspondeCargo = correspondeAoFiltro(colaborador.cargo, cargoNormalizado)

			return correspondeId && correspondeNome && correspondeCargo
		})
	}, [colaboradores, filtroId, filtroNome, filtroCargo])

	return (
		<section className="lista-colaboradores" aria-labelledby="titulo-lista-colaboradores">
			<div className="lista-colaboradores-cabecalho">
				<div>
					<p className="lista-colaboradores-identificador">Colaboradores</p>
					<h2 id="titulo-lista-colaboradores">Registros cadastrados</h2>
				</div>
				<span className="lista-colaboradores-total">
					{colaboradoresFiltrados.length} de {colaboradores.length}
				</span>
			</div>

			<div className="lista-colaboradores-busca">
				<p className="lista-colaboradores-busca-rotulo">
					Pesquisar na listagem
				</p>
				<div className="lista-colaboradores-busca-campos">
					<input
						id="filtro-colaboradores-id"
						type="search"
						className="lista-colaboradores-busca-input"
						placeholder="Pesquisar por ID"
						value={filtroId}
						onChange={(event) => setFiltroId(event.target.value)}
					/>
					<input
						id="filtro-colaboradores-nome"
						type="search"
						className="lista-colaboradores-busca-input"
						placeholder="Pesquisar por nome"
						value={filtroNome}
						onChange={(event) => setFiltroNome(event.target.value)}
					/>
					<input
						id="filtro-colaboradores-cargo"
						type="search"
						className="lista-colaboradores-busca-input"
						placeholder="Pesquisar por cargo"
						value={filtroCargo}
						onChange={(event) => setFiltroCargo(event.target.value)}
					/>
				</div>
			</div>

			{carregando ? (
				<p className="lista-colaboradores-vazia">Carregando colaboradores...</p>
			) : erro ? (
				<p className="lista-colaboradores-vazia">{erro}</p>
			) : colaboradoresFiltrados.length > 0 ? (
				<ul className="lista-colaboradores-itens">
					{colaboradoresFiltrados.map((colaborador) => (
						<ItemColaborador
							key={colaborador.id}
							colaborador={colaborador}
							onEditar={onEditar}
							onExcluir={abrirConfirmacaoExclusao}
						/>
					))}
				</ul>
			) : colaboradores.length > 0 ? (
				<p className="lista-colaboradores-vazia">Nenhum colaborador encontrado para essa busca.</p>
			) : (
				<p className="lista-colaboradores-vazia">Nenhum colaborador cadastrado.</p>
			)}

			<ConfirmacaoExclusao
				colaborador={colaboradorParaExcluir}
				onConfirmar={excluirColaborador}
				onCancelar={fecharConfirmacaoExclusao}
			/>
		</section>
	)
}

export default ListaColaboradores