const btn = document.querySelector("#send");

btn.addEventListener("click", function(e){

    e.preventDefault();

    //Capturando as datas
    let data1_entrada = document.getElementById('data1').value;
    let data2_entrada = document.getElementById('data2').value;

    //Colocando em arrays
    let data1_array = String(data1_entrada).split("-")
    let data2_array = String(data2_entrada).split("-")

    //Arrumando a ordem dos elementos nos arrays
    data1_array.reverse()
    data2_array.reverse()

    //Criando variáveis para as únidades de tempo

    //Primeira data
    let dias_data1 = data1_array[0]
    let meses_data1 = data1_array[1]
    let anos_data1 = data1_array[2]

    //Segunda data
    let dias_data2 = data2_array[0]
    let meses_data2 = data2_array[1]
    let anos_data2 = data2_array[2]

    //Calculando
    const d1 = data1_entrada;
    const d2 = data2_entrada;
    const diffInMs   = new Date(d2) - new Date(d1)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    console.log(diffInDays)


    
    console.log(data1_entrada);
    console.log(data2_entrada);
    console.log("-")
    console.log(data1_array);
    console.log(data2_array);

});

//Início do código da operação 2

const btn2 = document.querySelector("#send2");

btn.addEventListener("click", function(e){

    e.preventDefault();

    //Data atual
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataAtual = ano + '-' + mes + '-' + dia;
    console.log(dataAtual);

    let data1_entrada = document.getElementById('dataX').value;

});