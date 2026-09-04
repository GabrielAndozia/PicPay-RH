import Cabecalho from "../../components/Cabecalho"
import type { LayoutPadraoProps } from "./LayoutPadraoProps"

function LayoutPadrao({ children }: LayoutPadraoProps) {
    return (
        <div className="site">
            <Cabecalho />
            <main className="conteudo-principal">
                {children}
            </main>
        </div>
    )
}

export default LayoutPadrao