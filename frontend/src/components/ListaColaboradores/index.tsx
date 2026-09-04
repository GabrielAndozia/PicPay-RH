import { useMemo, useState } from "react"
import ItemColaborador from "../ItemColaborador"
import type { Colaborador } from "./script"
import "./style.css"
import type { ListaColaboradoresProps } from "./ListaColaboradoresProps"

function ListaColaboradores({
	colaboradores = [],
	carregando = false,
	erro = null,
	onEditar,
	onExcluir,
}: ListaColaboradoresProps) {
	const [termoBusca, setTermoBusca] = useState("")

	function excluirColaborador(colaborador: Colaborador) {
		onExcluir?.(colaborador)
	}

	const colaboradoresFiltrados = useMemo(() => {
		const termoNormalizado = termoBusca.trim().toLowerCase()

		if (!termoNormalizado) {
			return colaboradores
		}

		return colaboradores.filter((colaborador) => {
			const campos = [
				colaborador.id.toString(),
				colaborador.nome,
				colaborador.email,
				colaborador.cargo,
				colaborador.departamento,
				colaborador.cidade,
				colaborador.status,
			]

			return campos.some((campo) =>
				campo.toLowerCase().includes(termoNormalizado),
			)
		})
	}, [colaboradores, termoBusca])

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
				<label htmlFor="filtro-colaboradores" className="lista-colaboradores-busca-rotulo">
					Pesquisar na listagem
				</label>
				<input
					id="filtro-colaboradores"
					type="search"
					className="lista-colaboradores-busca-input"
					placeholder="Busque por ID, nome, e-mail, cargo..."
					value={termoBusca}
					onChange={(event) => setTermoBusca(event.target.value)}
				/>
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
							onExcluir={excluirColaborador}
						/>
					))}
				</ul>
			) : colaboradores.length > 0 ? (
				<p className="lista-colaboradores-vazia">Nenhum colaborador encontrado para essa busca.</p>
			) : (
				<p className="lista-colaboradores-vazia">Nenhum colaborador cadastrado.</p>
			)}
		</section>
	)
}

export default ListaColaboradores