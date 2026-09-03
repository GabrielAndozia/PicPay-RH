import { useEffect, useState } from "react"
import "./style.css"
import { obterDataHorario } from "./script"

function Cabecalho() {
    const [dataHorario, setDataHorario] = useState(obterDataHorario)

    useEffect(() => {
        const intervalo = window.setInterval(() => {
            setDataHorario(obterDataHorario())
        }, 1000)

        return () => window.clearInterval(intervalo)
    }, [])

    return (
        <header className="cabecalho">
            <div className="cabecalho-marca">
                <img className="cabecalho-logo" src="/icon-picpay.png" alt="Logo do PicPay" />
                <div>
                    <p className="cabecalho-nome">PicPay</p>
                </div>
            </div>

            <div className="cabecalho-titulo">
                <p className="cabecalho-rotulo">Painel administrativo</p>
                <h1>Sistema de RH</h1>
            </div>

            <div className="cabecalho-status" aria-label="Data e horario atuais">
                <p className="cabecalho-data">{dataHorario.data}</p>
                <p className="cabecalho-horario">{dataHorario.horario}</p>
            </div>
        </header>
    )
}

export default Cabecalho