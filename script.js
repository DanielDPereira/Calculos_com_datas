// Normaliza uma data para a meia-noite, para remover a influência do fuso horário.
function normalizarData(data) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate());
}

function lerDataDoInput(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (!elemento.value) {
    return null;
  }
  const [ano, mes, dia] = elemento.value.split('-').map(Number);
  return new Date(ano, mes - 1, dia);
}

function formatarDataParaBR(data) {
  return data.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function diasEntreDatas(dataA, dataB) {
  const msPorDia = 86400000; // Milissegundos em um dia
  const dataInicial = normalizarData(dataA);
  const dataFinal = normalizarData(dataB);
  const diferencaEmMs = dataFinal - dataInicial;
  return Math.round(diferencaEmMs / msPorDia);
}

function calcularSemanasEDias(totalDeDias) {
  const diasNaSemana = 7;
  const semanas = Math.floor(totalDeDias / diasNaSemana);
  const diasRestantes = totalDeDias % diasNaSemana;
  return { semanas, diasRestantes };
}

function calcularDiferencaTotal(dataInicial, dataFinal) {
  // Garante que a data inicial seja sempre a menor para facilitar o cálculo.
  let inicio = new Date(dataInicial);
  let fim = new Date(dataFinal);
  if (fim < inicio) {
    [inicio, fim] = [fim, inicio];
  }

  let anos = fim.getFullYear() - inicio.getFullYear();
  let meses = fim.getMonth() - inicio.getMonth();
  let dias = fim.getDate() - inicio.getDate();

  // Ajustes para casos onde o dia ou mês final é menor que o inicial.
  if (dias < 0) {
    meses--;
    const ultimoDiaDoMesAnterior = new Date(fim.getFullYear(), fim.getMonth(), 0).getDate();
    dias += ultimoDiaDoMesAnterior;
  }
  if (meses < 0) {
    anos--;
    meses += 12;
  }
  
  return { anos, meses, dias };
}

// --- LÓGICA PRINCIPAL ---

document.addEventListener('DOMContentLoaded', () => {

  const painelDiferenca = document.getElementById('painel-diferenca');
  const painelHoje = document.getElementById('painel-hoje');
  const abas = document.querySelectorAll('.tab-btn');
  
  // Troca de abas
  abas.forEach(aba => {
    aba.addEventListener('click', () => {
      abas.forEach(a => a.setAttribute('aria-selected', 'false'));
      aba.setAttribute('aria-selected', 'true');

      const abaSelecionada = aba.dataset.tab;
      if (abaSelecionada === 'between') {
        painelHoje.classList.add('hidden');
        painelDiferenca.classList.remove('hidden');
      } else {
        painelDiferenca.classList.add('hidden');
        painelHoje.classList.remove('hidden');
      }
    });
  });

  // Botões de atalho (Hoje, Amanhã, etc.)
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const diasParaAdicionar = Number(chip.dataset.days || 0);
      const dataBase = normalizarData(new Date());
      dataBase.setDate(dataBase.getDate() + diasParaAdicionar);
      
      const inputDataAlvo = document.getElementById('data-alvo');
      inputDataAlvo.value = dataBase.toISOString().split('T')[0];
    });
  });

  // Botão "Calcular" do painel "Entre Datas"
  const btnCalcularDiferenca = document.getElementById('btn-calcular-diferenca');
  btnCalcularDiferenca.addEventListener('click', () => {
    const dataInicial = lerDataDoInput('data-inicial');
    const dataFinal = lerDataDoInput('data-final');
    const aviso = document.getElementById('aviso-diferenca');
    const painelResultados = document.getElementById('resultados-diferenca');

    if (!dataInicial || !dataFinal) {
      aviso.classList.remove('hidden');
      painelResultados.classList.add('hidden');
      return;
    }
    aviso.classList.add('hidden');

    const totalDeDias = Math.abs(diasEntreDatas(dataInicial, dataFinal));
    const { semanas, diasRestantes } = calcularSemanasEDias(totalDeDias);
    const { anos, meses, dias } = calcularDiferencaTotal(dataInicial, dataFinal);

    document.getElementById('resumo-diferenca').innerHTML = `
      <li><strong>${totalDeDias}</strong> dia(s) no total</li>
      <li><strong>${semanas}</strong> semana(s) e <strong>${diasRestantes}</strong> dia(s)</li>
      <li><strong>${anos}</strong> ano(s), <strong>${meses}</strong> mês(es) e <strong>${dias}</strong> dia(s)</li>
    `;
    document.getElementById('detalhes-diferenca').innerHTML = `
      <li>De <strong>${formatarDataParaBR(dataInicial)}</strong> até <strong>${formatarDataParaBR(dataFinal)}</strong></li>
    `;
    
    painelResultados.classList.remove('hidden');
  });

  // Botão "Calcular" do painel "A partir de Hoje"
  const btnCalcularHoje = document.getElementById('btn-calcular-hoje');
  btnCalcularHoje.addEventListener('click', () => {
    const dataAlvo = lerDataDoInput('data-alvo');
    const aviso = document.getElementById('aviso-hoje');
    const painelResultados = document.getElementById('resultados-hoje');

    if (!dataAlvo) {
      aviso.classList.remove('hidden');
      painelResultados.classList.add('hidden');
      return;
    }
    aviso.classList.add('hidden');

    const hoje = normalizarData(new Date());
    const totalDeDias = diasEntreDatas(hoje, dataAlvo);
    const { anos, meses, dias } = calcularDiferencaTotal(hoje, dataAlvo);

    let mensagem;
    if (totalDeDias === 0) {
      mensagem = `Hoje é a data alvo (<strong>${formatarDataParaBR(dataAlvo)}</strong>).`;
    } else if (totalDeDias > 0) {
      mensagem = `Faltam <strong>${anos}</strong> ano(s), <strong>${meses}</strong> mês(es) e <strong>${dias}</strong> dia(s) para <strong>${formatarDataParaBR(dataAlvo)}</strong>.`;
    } else {
      mensagem = `Se passaram <strong>${anos}</strong> ano(s), <strong>${meses}</strong> mês(es) e <strong>${dias}</strong> dia(s) desde <strong>${formatarDataParaBR(dataAlvo)}</strong>.`;
    }

    document.getElementById('resumo-hoje').innerHTML = `<li>${mensagem}</li>`;
    painelResultados.classList.remove('hidden');
  });

});