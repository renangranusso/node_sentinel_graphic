export function createChart(ctx) {
    new Chart(ctx, {
        type: 'line', // Alterando o tipo para 'line'
        data: {
            labels: ['01-03-2023', '07-03-2023', '12-03-2023', '17-03-2023', '22-03-2023', '27-03-2023'],
            datasets: [{
                label: 'Index NDVI',
                data: [0.20638323353293406, 0.22638323353293406, 0.23638323353293406, 0.22638323353293406, 0.21638323353293406, 0.20638323353293406],
                borderColor: 'rgba(75, 192, 192, 1)', // Cor da linha
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de fundo da linha (transparente)
                borderWidth: 1, // Largura da linha
                fill: false, // Não preencher a área abaixo da linha
                tension: 0.1 // Ajusta a suavidade da linha (0 para linhas retas)
            }]
        },
        options: {
            responsive: true, // Faz o gráfico ser responsivo
            scales: {
                y: {
                    beginAtZero: true, // Começar a escala y no zero
                }
            },
            plugins: {
                legend: {
                    display: true, // Exibir a legenda
                    position: 'top' // Posição da legenda
                }
            }
        }
    });
}