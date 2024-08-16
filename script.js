const form = document.querySelector('form')
const footer = document.querySelector('footer')
const valueInput = document.getElementById('amount')
const selectCoins = document.getElementById('currency')
const description = document.getElementById('description')
const result = document.getElementById('result')

async function dadosMoeda() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL');
        const dados = await response.json();
        return dados
    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
      }   
}

function formatarValor(valor) {
    return Number(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}
function montarCotacao(montante, contacao, simbolo){
    const tranformacao = montante * contacao
    description.textContent = `${simbolo} 1 = ${formatarValor(contacao)}`
    result.textContent = `${formatarValor(tranformacao)}`
    footer.classList.add('show-result')
}

valueInput.addEventListener('input', () => {
    const checkInput = /\D+/g
    valueInput.value = valueInput.value.replace(checkInput, "")
})
form.onsubmit = async (event) => {
    event.preventDefault()
    const cotacaoMoedas = await dadosMoeda()
    console.log(cotacaoMoedas)
    switch(selectCoins.value){
        case "USD":
            montarCotacao(valueInput.value, cotacaoMoedas.USDBRL.bid, 'US$')
            break
        case "EUR":
            montarCotacao(valueInput.value, cotacaoMoedas.EURBRL.bid, '€')
            break
        case "GBP":
            montarCotacao(valueInput.value, cotacaoMoedas.GBPBRL.bid, '£')
            break
    }
}