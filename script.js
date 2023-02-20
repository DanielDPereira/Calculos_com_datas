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

    let diffInMs = 0;

    if (d1 > d2) {
        diffInMs = new Date(d1) - new Date(d2)
    }else{
        diffInMs = new Date(d2) - new Date(d1)
    }

    let diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    console.log(diffInMs)
    console.log(diffInDays)

    console.log(data1_entrada);
    console.log(data2_entrada);
    console.log("-")
    console.log(data1_array);
    console.log(data2_array);

    if (diffInDays > 1) {
        document.getElementById("resultado1").innerHTML = "<b>Diferença</b> de "+Math.abs(diffInDays)+" dias ";
    }else{
        if(diffInDays == 1) {
            document.getElementById("resultado1").innerHTML = "<b>Diferença</b> de 1 dia ";
        }
    }

    if(isNaN(diffInDays)){
        document.getElementById("resultado1").innerHTML = "<b>Insira um valor válido</b>";
        console.log("Valor NaN inserido no cálculo 1");
    }

});

const btn2 = document.querySelector("#send2");

btn2.addEventListener("click", function(e){

    e.preventDefault();

    //Data atual
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataAtual = ano + '-' + mes + '-' + dia;
    console.log(dataAtual);
    
    let data_contagem = document.getElementById('dataX').value;
    console.log(data_contagem);

    //Calculando
    const d1 = dataAtual;
    const d2 = data_contagem;
    const diffInMs   = new Date(d2) - new Date(d1)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    console.log(diffInDays)

    if(diffInDays == 0){
        document.getElementById("resultado2").innerHTML = "<b>É hoje!</b>";
    }else{
        if(diffInDays == 1){
            document.getElementById("resultado2").innerHTML = "<b>Distância</b> de "+Math.abs(diffInDays)+" dia da data atual";
        }else{
        document.getElementById("resultado2").innerHTML = "<b>Distância</b> de "+Math.abs(diffInDays)+" dias da data atual";
        }
    }

    if(isNaN(diffInDays)){
        document.getElementById("resultado2").innerHTML = "<b>Insira um valor válido</b>";
        console.log("Valor NaN inserido no cálculo 2");
    }

});