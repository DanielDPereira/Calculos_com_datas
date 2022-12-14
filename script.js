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


    console.log(data1_entrada);
    console.log(data2_entrada);
    console.log("-")
    console.log(data1_array);
    console.log(data2_array);

});