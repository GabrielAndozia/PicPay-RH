const formatoData = new Intl.DateTimeFormat("pt-BR", {
	day: "2-digit",
	month: "long",
	year: "numeric",
	timeZone: "America/Sao_Paulo",
})

const formatoHorario = new Intl.DateTimeFormat("pt-BR", {
	hour: "2-digit",
	minute: "2-digit",
})

export function obterDataHorario(agora = new Date()) {
	return {
		data: formatoData.format(agora),
		horario: formatoHorario.format(agora),
	}
}
