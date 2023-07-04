const preguntas = {}
test1.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar el envío del formulario

    const form = event.target; // Obtener el formulario

    preguntas.p1 = form.querySelector('input[name="p1"]:checked').value;
    preguntas.p2 = form.querySelector('input[name="p2"]:checked').value;
    preguntas.p3 = form.querySelector('input[name="p3"]:checked').value;
    preguntas.p4 = form.querySelector('input[name="p4"]:checked').value;
    preguntas.p5 = form.querySelector('input[name="p5"]:checked').value;
    preguntas.p6 = form.querySelector('input[name="p6"]:checked').value;
    preguntas.p7 = form.querySelector('input[name="p7"]:checked').value;
    preguntas.p8 = form.querySelector('input[name="p8"]:checked').value;
    preguntas.p9 = form.querySelector('input[name="p9"]:checked').value;
    preguntas.p10 = form.querySelector('input[name="p10"]:checked').value;
    preguntas.p11 = form.querySelector('input[name="p11"]:checked').value;
    preguntas.p12 = form.querySelector('input[name="p12"]:checked').value;
    preguntas.p13 = form.querySelector('input[name="p13"]:checked').value;
    preguntas.p14 = form.querySelector('input[name="p14"]:checked').value;
    preguntas.p15 = form.querySelector('input[name="p15"]:checked').value;
    preguntas.p16 = form.querySelector('input[name="p16"]:checked').value;
    preguntas.p17 = form.querySelector('input[name="p17"]:checked').value;
    preguntas.p18 = form.querySelector('input[name="p18"]:checked').value;
    preguntas.p19 = form.querySelector('input[name="p19"]:checked').value;
    preguntas.p20 = form.querySelector('input[name="p20"]:checked').value;
    preguntas.p21 = form.querySelector('input[name="p21"]:checked').value;
    preguntas.p22 = form.querySelector('input[name="p22"]:checked').value;
    preguntas.p23 = form.querySelector('input[name="p23"]:checked').value;
    preguntas.p24 = form.querySelector('input[name="p24"]:checked').value;
    preguntas.p25 = form.querySelector('input[name="p25"]:checked').value;
    preguntas.p26 = form.querySelector('input[name="p26"]:checked').value;
    preguntas.p27 = form.querySelector('input[name="p27"]:checked').value;
    preguntas.p28 = form.querySelector('input[name="p28"]:checked').value;
    preguntas.p29 = form.querySelector('input[name="p29"]:checked').value;
    preguntas.p30 = form.querySelector('input[name="p30"]:checked').value;
    preguntas.p31 = form.querySelector('input[name="p31"]:checked').value;
    preguntas.p32 = form.querySelector('input[name="p32"]:checked').value;
    preguntas.p33 = form.querySelector('input[name="p33"]:checked').value;
    preguntas.p34 = form.querySelector('input[name="p34"]:checked').value;
    preguntas.p35 = form.querySelector('input[name="p35"]:checked').value;
    preguntas.p36 = form.querySelector('input[name="p36"]:checked').value;
    preguntas.p37 = form.querySelector('input[name="p37"]:checked').value;
    preguntas.p38 = form.querySelector('input[name="p38"]:checked').value;
    preguntas.p39 = form.querySelector('input[name="p39"]:checked').value;
    preguntas.p40 = form.querySelector('input[name="p40"]:checked').value;

    console.log(preguntas)

    fetch('/enviar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(preguntas)
    }).then((respuesta) => {
        console.log(respuesta)
        console.log('enviado')
    }).catch(err => console.log(err))

    showResult.classList.remove('disabled')
});




  