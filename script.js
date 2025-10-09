// --------------------------------------- JAVASCRIPT ---------------------------------------

// --- Funções de Abertura/Fechamento de Modais ---

/**
 * Gerenciador genérico para abrir um modal.
 * @param {string} id - O ID do modal (e.g., 'ruleOfThreeModal').
 */
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

/**
 * Gerenciador genérico para fechar um modal.
 * @param {string} id - O ID do modal (e.g., 'ruleOfThreeModal').
 */
function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

// Funções específicas de controle de modal
function openRuleOfThreeModal() { openModal('ruleOfThreeModal'); }
function closeRuleOfThreeModal() { closeModal('ruleOfThreeModal'); }

function openConversionModal() { openModal('conversionModal'); converter(); }
function closeConversionModal() { closeModal('conversionModal'); }

function openCalculatorModal() { openModal('calculatorModal'); calcular(); }
function closeCalculatorModal() { closeModal('calculatorModal'); }

function openDripRateModal() { openModal('dripRateModal'); calculateDripRate(); }
function closeDripRateModal() { closeModal('dripRateModal'); }


// --- 1. Lógica da Regra de Três ---

/**
 * Realiza o cálculo da Regra de Três Simples: X = (B * C) / A.
 */
function calculateRuleOfThree() {
    const A = parseFloat(document.getElementById('rotA').value);
    const B = parseFloat(document.getElementById('rotB').value);
    const C = parseFloat(document.getElementById('rotC').value);
    const resultElement = document.getElementById('ruleOfThreeResult');
    const errorElement = document.getElementById('rotError');
    errorElement.textContent = ''; // Limpa erro anterior

    // Validação de entrada
    if (isNaN(A) || isNaN(B) || isNaN(C)) {
        errorElement.textContent = "Erro: Insira todos os números.";
        resultElement.textContent = "0.0000";
        return;
    }
    if (A === 0) {
        errorElement.textContent = "Erro: O Valor A (base de comparação) não pode ser zero.";
        resultElement.textContent = "0.0000";
        return;
    }

    // Cálculo principal: X = (B * C) / A
    const X = (B * C) / A;

    // Exibição do resultado
    if (isFinite(X)) {
        resultElement.textContent = X.toFixed(4); 
    } else {
        errorElement.textContent = 'Erro: Resultado Inválido ou muito grande.';
        resultElement.textContent = 'ERRO';
    }
}


// --- 2. Lógica da Conversão de Unidades (Peso) ---

const conversionFactors = {
    'g': 1,
    'mg': 0.001,      // 1 mg = 0.001 g
    'mcg': 0.000001   // 1 µg = 0.000001 g
};

/**
 * Realiza a conversão entre Gramas, Miligramas e Microgramas.
 */
function converter() {
    const fromUnit = document.getElementById('conversionFromUnit').value;
    const toUnit = document.getElementById('conversionToUnit').value;
    const inputValue = parseFloat(document.getElementById('conversionValue').value);
    const resultElement = document.getElementById('conversionResult');
    const errorElement = document.getElementById('conversionError');
    errorElement.textContent = '';

    if (isNaN(inputValue) || inputValue < 0) {
        errorElement.textContent = "Valor Inválido. Insira um número positivo.";
        resultElement.textContent = "0.000000";
        return;
    }

    if (fromUnit === toUnit) {
        resultElement.textContent = inputValue.toFixed(6);
        return;
    }

    const factorFrom = conversionFactors[fromUnit];
    const valueInGrams = inputValue * factorFrom;

    const factorTo = conversionFactors[toUnit];
    let result = valueInGrams / factorTo;

    if (isFinite(result)) {
        resultElement.textContent = result.toFixed(6); 
    } else {
        errorElement.textContent = 'Erro: Resultado Inválido.';
        resultElement.textContent = 'ERRO';
    }
}


// --- 3. Lógica do Gotejamento (NOVO) ---

/**
 * Realiza o cálculo de gotejamento em gotas/min ou microgotas/min.
 */
function calculateDripRate() {
    const volume = parseFloat(document.getElementById('volume').value);
    const timeHours = parseFloat(document.getElementById('timeHours').value);
    const dripFactor = parseFloat(document.getElementById('dripFactor').value);
    const resultElement = document.getElementById('dripRateResult');
    const errorElement = document.getElementById('dripRateError');
    errorElement.textContent = '';

    if (isNaN(volume) || isNaN(timeHours) || volume < 0 || timeHours <= 0) {
        errorElement.textContent = "Erro: Insira Volume (ml) e Tempo (> 0h) válidos.";
        resultElement.textContent = "0.00 gotas/min";
        return;
    }

    const timeMinutes = timeHours * 60;
    let dripRate = (volume * dripFactor) / timeMinutes;

    let unit = (dripFactor === 20) ? "gotas/min" : "microgotas/min";

    if (isFinite(dripRate)) {
        resultElement.textContent = dripRate.toFixed(1) + " " + unit;
    } else {
        errorElement.textContent = 'Erro no cálculo do gotejamento.';
        resultElement.textContent = 'ERRO';
    }
}


// --- 4. Lógica da Calculadora Básica ---

function calcular() { 
    let num1 = parseFloat(document.getElementById('calcNum1').value) || 0; 
    let num2 = parseFloat(document.getElementById('calcNum2').value) || 0; 
    let operacao = document.getElementById('calcOperacao').value; 
    
    const resultadoElemento = document.getElementById('resultado'); 
    const errorElement = document.getElementById('calcError');
    errorElement.textContent = '';
    let resultado; 
    
    switch (operacao) { 
        case 'soma': 
            resultado = num1 + num2; 
            break; 
        case 'subtracao': 
            resultado = num1 - num2; 
            break; 
        case 'multiplicacao': 
            resultado = num1 * num2; 
            break; 
        case 'potencia':
            resultado = Math.pow(num1, num2); 
            break;
        case 'divisao': 
            if (num2 !== 0) { 
                resultado = num1 / num2; 
            } else { 
                errorElement.textContent = 'Erro: Divisão por zero.';
                resultado = 'ERRO'; 
            } 
            break; 
        default: 
            errorElement.textContent = 'Operação inválida';
            resultado = 'ERRO';
    } 

    if (typeof resultado === 'number' && isFinite(resultado)) {
        resultadoElemento.textContent = resultado.toFixed(4); 
    } else if (resultado === 'ERRO') {
        resultadoElemento.textContent = resultado; 
    } else {
        errorElement.textContent = 'Resultado muito grande/pequeno.';
        resultadoElemento.textContent = 'ERRO';
    }
} 

// Inicializa todos os modais com zero/valor inicial na carga
window.onload = function() {
    calculateRuleOfThree();
    converter();
    calculateDripRate();
    calcular();
};
