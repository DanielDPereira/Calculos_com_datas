#Código data - Início

#Use o modelo DD/MM/AAAA

def dia_no_ano(dia, mes, ano):
  numero_de_dias = dia
  contador_meses = 1
  while contador_meses < mes:
    if contador_meses in (1, 3, 5, 7, 8, 10, 12):
      numero_de_dias += 31
    elif contador_meses in (4, 6, 9, 11):
      numero_de_dias += 30
    elif contador_meses == 2:
      numero_de_dias += 28
    contador_meses += 1
  return numero_de_dias

def bissexto(ano):
  return ano % 4 == 0 and (ano % 100 != 0 or ano % 400 == 0)

def validar_data(dia, mes, ano):
  if dia < 1 or dia > 31 or mes < 1 or mes > 12 or ano < 1583:
    return False
  if mes in (4, 6, 9, 11) and dia == 31:
    return False
  if mes == 2 and dia >= 30:
    return False
  if mes == 2 and dia == 29 and not bissexto(ano):
    return False
  return True

def diferenca_data(data1, data2):

  # Separa os dados adequadamente e trata entradas mal-formadas.
  try:
    dia1, mes1, ano1 = [int(datando) for datando in data1.split("/")]
  except ValueError:
    raise ValueError('Data inválida: ' + data1)

  try:
    dia2, mes2, ano2 = [int(datador) for datador in data2.split("/")]
  except ValueError:
    raise ValueError('Data inválida: ' + data2)

  # Verifica se as datas entradas são válidas:
  if not validar_data(dia1, mes1, ano1):
    raise ValueError('Data inválida: ' + data1)
  if not validar_data(dia2, mes2, ano2):
    raise ValueError('Data inválida: ' + data2)

  # Inverte as datas se a data2 anteceder a data1.
  if ano2 < ano1 or (ano2 == ano1 and (mes2 < mes1 or (mes2 == mes1 and dia2 < dia1))):
    return -diferenca_data(data2, data1)

  # Calcula o número de dias nos anos incompletos.
  dias_ano1 = dia_no_ano(dia1, mes1, ano1)
  dias_ano2 = dia_no_ano(dia2, mes2, ano2)

  # Calcula o número de dias totais, considerando os anos incompletos e anos completos de 365 dias.
  dias_total = dias_ano2 - dias_ano1 + (ano2 - ano1) * 365

  # Considera anos começando em 01/03 para poder fazer a correção dos anos bissextos.
  ano1b = ano1
  if mes1 < 3:
    ano1b -= 1

  ano2b = ano2
  if mes2 < 3:
    ano2b -= 1

  # Soma os dias dos anos bissextos. São os divisíveis por 4 que ocorrem entre ano1b e ano2b.
  dias_total += int(ano2b / 4) - int(ano1b / 4)

  # Subtrai os dias dos anos bissextos que não existiram na etapa anterior. São os divisíveis por 100.
  dias_total -= int(ano2b / 100) - int(ano1b / 100)

  # Soma de volta os dias dos anos bissextos que foram removidos a mais na etapa anterior. São os divisíveis por 400.
  dias_total += int(ano2b / 400) - int(ano1b / 400)

  # Resultado da função.
  return dias_total


# Lê a entrada do usuário.
x = input(("Digite a primeira data: "))
y = input(("Digite a segunda data: "))

# Calcula a diferença em dias.
diferenca_dias = diferenca_data(x, y)

#Diferença em meses
meses = int(diferenca_dias/30)

print("Período: "+str(diferenca_dias)+" dias")
print("Período: "+str(meses)+" meses e "+str(diferenca_dias%30)+" dias")



#Código data - Fim
