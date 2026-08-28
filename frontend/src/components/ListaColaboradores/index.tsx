import { useState } from "react"
import ItemColaborador from "../ItemColaborador"
import type { Colaborador } from "./script"
import "./style.css"
import type { ListaColaboradoresProps } from "./ListaColaboradoresProps"

function ListaColaboradores({
	colaboradores = [],
	onEditar,
	onExcluir,
}: ListaColaboradoresProps) {
	const [colaboradoresVisiveis, setColaboradoresVisiveis] = useState(colaboradores)

	function excluirColaborador(colaborador: Colaborador) {
		setColaboradoresVisiveis((listaAtual) =>
			listaAtual.filter(({ id }) => id !== colaborador.id),
		)
		onExcluir?.(colaborador)
	}

	return (
		<section className="lista-colaboradores" aria-labelledby="titulo-lista-colaboradores">
			<div className="lista-colaboradores-cabecalho">
				<div>
					<p className="lista-colaboradores-identificador">Colaboradores</p>
					<h2 id="titulo-lista-colaboradores">Registros cadastrados</h2>
				</div>
				<span className="lista-colaboradores-total">
					{colaboradoresVisiveis.length} cadastrados
				</span>
			</div>

			{colaboradoresVisiveis.length > 0 ? (
				<ul className="lista-colaboradores-itens">
					{colaboradoresVisiveis.map((colaborador) => (
						<ItemColaborador
							key={colaborador.id}
							colaborador={colaborador}
							onEditar={onEditar}
							onExcluir={excluirColaborador}
						/>
					))}
				</ul>
			) : (
				<p className="lista-colaboradores-vazia">Nenhum colaborador cadastrado.</p>
			)}
		</section>
	)
}

export default ListaColaboradores