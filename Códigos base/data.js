var _pj;

var diferenca_dias, meses, x, y;

function _pj_snippets(container) {
  function in_es6(left, right) {
    if (right instanceof Array || typeof right === "string") {
      return right.indexOf(left) > -1;
    } else {
      if (right instanceof Map || right instanceof Set || right instanceof WeakMap || right instanceof WeakSet) {
        return right.has(left);
      } else {
        return left in right;
      }
    }
  }

  container["in_es6"] = in_es6;
  return container;
}

_pj = {};

_pj_snippets(_pj);

function dia_no_ano(dia, mes, ano) {
  var contador_meses, numero_de_dias;
  numero_de_dias = dia;
  contador_meses = 1;

  while (contador_meses < mes) {
    if (_pj.in_es6(contador_meses, [1, 3, 5, 7, 8, 10, 12])) {
      numero_de_dias += 31;
    } else {
      if (_pj.in_es6(contador_meses, [4, 6, 9, 11])) {
        numero_de_dias += 30;
      } else {
        if (contador_meses === 2) {
          numero_de_dias += 28;
        }
      }
    }

    contador_meses += 1;
  }

  return numero_de_dias;
}

function bissexto(ano) {
  return ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0);
}

function validar_data(dia, mes, ano) {
  if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1583) {
    return false;
  }

  if (_pj.in_es6(mes, [4, 6, 9, 11]) && dia === 31) {
    return false;
  }

  if (mes === 2 && dia >= 30) {
    return false;
  }

  if (mes === 2 && dia === 29 && !bissexto(ano)) {
    return false;
  }

  return true;
}

function diferenca_data(data1, data2) {
  var ano1, ano1b, ano2, ano2b, dia1, dia2, dias_ano1, dias_ano2, dias_total, mes1, mes2;

  try {
    [dia1, mes1, ano1] = function () {
      var _pj_a = [],
          _pj_b = data1.split("/");

      for (var _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
        var datando = _pj_b[_pj_c];

        _pj_a.push(Number.parseInt(datando));
      }

      return _pj_a;
    }.call(this);
  } catch (e) {
    if (e instanceof ValueError) {
      throw new ValueError("Data inv\u00e1lida: " + data1);
    } else {
      throw e;
    }
  }

  try {
    [dia2, mes2, ano2] = function () {
      var _pj_a = [],
          _pj_b = data2.split("/");

      for (var _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
        var datador = _pj_b[_pj_c];

        _pj_a.push(Number.parseInt(datador));
      }

      return _pj_a;
    }.call(this);
  } catch (e) {
    if (e instanceof ValueError) {
      throw new ValueError("Data inv\u00e1lida: " + data2);
    } else {
      throw e;
    }
  }

  if (!validar_data(dia1, mes1, ano1)) {
    throw new ValueError("Data inv\u00e1lida: " + data1);
  }

  if (!validar_data(dia2, mes2, ano2)) {
    throw new ValueError("Data inv\u00e1lida: " + data2);
  }

  if (ano2 < ano1 || ano2 === ano1 && (mes2 < mes1 || mes2 === mes1 && dia2 < dia1)) {
    return -diferenca_data(data2, data1);
  }

  dias_ano1 = dia_no_ano(dia1, mes1, ano1);
  dias_ano2 = dia_no_ano(dia2, mes2, ano2);
  dias_total = dias_ano2 - dias_ano1 + (ano2 - ano1) * 365;
  ano1b = ano1;

  if (mes1 < 3) {
    ano1b -= 1;
  }

  ano2b = ano2;

  if (mes2 < 3) {
    ano2b -= 1;
  }

  dias_total += Number.parseInt(ano2b / 4) - Number.parseInt(ano1b / 4);
  dias_total -= Number.parseInt(ano2b / 100) - Number.parseInt(ano1b / 100);
  dias_total += Number.parseInt(ano2b / 400) - Number.parseInt(ano1b / 400);
  return dias_total;
}

x = input("Digite a primeira data: ");
y = input("Digite a segunda data: ");
diferenca_dias = diferenca_data(x, y);
meses = Number.parseInt(diferenca_dias / 30);
console.log("Per\u00edodo: " + diferenca_dias.toString() + " dias");
console.log("Per\u00edodo: " + meses.toString() + " meses e " + (diferenca_dias % 30).toString() + " dias");
