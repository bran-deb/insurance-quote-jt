// constructores
function Seguro(marca, year, tipo) {
    this.marca = marca
    this.year = year
    this.tipo = tipo
}
//Realiza la cotizacion de los datos
Seguro.prototype.cotizarSeguro = function () {
    /*
    1=americano 1.15
    2=asiatico 1.05
    3=Europeo 1.35
    */
    let cantidad
    const base = 2000

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15
            break;
        case '2':
            cantidad = base * 1.05
            break
        case '3':
            cantidad = base * 1.35
        default:
            break;
    }
    //leer el año
    const diferencia = new Date().getFullYear() - this.year
    //cada año que la diferencia es mayor el costo reduce un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100
    //si el seguro es basico se multiplica por un 30% mas
    //si el seguro es completo se multiplica por un 50% mas
    if (this.tipo === 'basico') {
        cantidad *= 1.30
    } else {
        cantidad *= 1.50
    }
    return cantidad
}

function UI() { }
//llena las opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear()
    min = max - 20

    const selectYear = document.querySelector('#year')

    for (let i = max; i > min; i--) {
        let option = document.createElement('option')
        option.value = i
        option.textContent = i
        selectYear.appendChild(option)
    }
}
//muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div')

    if (tipo === 'error') {
        div.classList.add('error')
    }
    else {
        div.classList.add('correcto')
    }
    div.classList.add('mensaje', 'mt-10')
    div.textContent = mensaje

    const formulario = document.querySelector('#cotizar-seguro')
    formulario.insertBefore(div, document.querySelector('#resultado'))

    setTimeout(() => {
        div.remove()
    }, 1000)
}

UI.prototype.mostrarResultado = (total, seguro) => {
    //crear el resultado
    const div = document.createElement('div')
    div.classList.add('mt-10')

    div.innerHTML = `
    <p class="header">tu resumen</p>
    <p class="font-bold">Total: ${total}</p>
    `
    const resultado = document.querySelector('#resultado')

    //Mostrar el spinner
    const spinner = document.querySelector('#cargando')
    spinner.style.display = 'block'

    setTimeout(() => {
        spinner.style.display = 'none'//cambiar spinner a none
        resultado.appendChild(div)//mostramos resultado
    }, 3000)
}


//Instanciar UI
const ui = new UI()

//cargamos el DOM
document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones()//llena el SELECT con los años
})

addEventListeners()
function addEventListeners() {
    const formulario = document.querySelector('#cotizar-seguro')
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e) {
    e.preventDefault()
    //leer marca seleccionada
    const marca = document.querySelector('#marca').value
    //leer year seleccionado
    const year = document.querySelector('#year').value
    //leer tipo de cobertura [DE UN RADIO INPUT/BUTTON]
    const tipo = document.querySelector('input[name="tipo"]:checked').value

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son Obligatorios', 'error')
        return
    }
    ui.mostrarMensaje('Cotizando...', 'correcto')

    const seguro = new Seguro(marca, year, tipo);
    //instanciar el seguro
    const total = seguro.cotizarSeguro()
    //Utilizar el prototype que va a cotizar
    ui.mostrarResultado(total, seguro)
}



