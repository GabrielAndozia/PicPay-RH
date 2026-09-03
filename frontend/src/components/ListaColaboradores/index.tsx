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
	function excluirColaborador(colaborador: Colaborador) {
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
					{colaboradores.length} cadastrados
				</span>
			</div>

			{carregando ? (
				<p className="lista-colaboradores-vazia">Carregando colaboradores...</p>
			) : erro ? (
				<p className="lista-colaboradores-vazia">{erro}</p>
			) : colaboradores.length > 0 ? (
				<ul className="lista-colaboradores-itens">
					{colaboradores.map((colaborador) => (
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