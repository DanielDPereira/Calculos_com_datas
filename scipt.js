const btn = document.querySelector("#send");

btn.addEventListener("click", function(e){

    e.preventDefault();

    //Capturando as datas

    let data1_entrada = document.getElementById('data1').value;
    let data2_entrada = document.getElementById('data2').value;

    let data1_array = String(data1_entrada).split("-")
    let data2_array = String(data2_entrada).split("-")

    data1_array.reverse()
    data2_array.reverse()

    console.log(data1_entrada);
    console.log(data2_entrada);
    console.log("-")
    console.log(data1_array);
    console.log(data2_array);

});