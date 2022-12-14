const btn = document.querySelector("#send");

btn.addEventListener("click", function(e){

    e.preventDefault();

    //Capturando as datas

    var data1 = document.getElementById('data1').value;
    var data2 = document.getElementById('data2').value;

    console.log(data1);
    console.log(data2);

});