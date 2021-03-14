//variables
const boton=document.querySelector('#boton');
const input=document.querySelectorAll('.input');
const checkbox = document.getElementById('box');
const validar={
  usuario:document.querySelector('#usuario'),
  nombre:document.querySelector('#nombre'),
  contraseña:document.querySelector('#contraseña'),
  contraseña2:document.querySelector('#contraseña2'),
  email:document.querySelector('#email'),
  telefono:document.querySelector('#telefono'),
}
const expreciones={
  usuario:/^([a-zA-Z0-9]{4,16})$/,
  nombre:/^([a-zA-Z]{4,16})$/,
  contraseña:/^.{4,16}$/,
  email:/^([^a-zA-Z0-9]+)?([a-zA-Z0-9]+)([^a-zA-Z0-9]+)?([a-zA-Z0-9]+)?(\@)+([a-zA-Z0-9])+([.com])+([.ar]+)?$/,
  telefono:/^([0-9\+\-]{10,16})$/
};

//evemtos
eventListeners();
function eventListeners(){
  document.addEventListener('DOMContentLoaded',iniciarApp);

  boton.addEventListener('click',(e)=>{
    e.preventDefault();
    iniciarApp();
    document.querySelector('#enviar-formulario').reset();
  });

  input.forEach((e)=>{
    e.addEventListener('keyup',validacion);
  })

  checkbox.addEventListener("change", validaCheckbox);
}

//funciones
function iniciarApp(){
  boton.disabled=true;
  boton.classList.add('validacion');
  boton.classList.add('opacidad');
  input.forEach((dato)=>{
      if(dato.value.length > 0){
        Object.values(validar).some((e)=>{
          console.log(e.classList.remove('correcto'))
        })
      }
  })
}

function validacion(input){
  campo('usuario',expreciones.usuario,'#usuario',input);
  campo('nombre',expreciones.nombre,'#nombre',input);
  campo('contraseña',expreciones.contraseña,'#contraseña',input);
  campo('email',expreciones.email,'#email',input);
  campo('telefono',expreciones.telefono,'#telefono',input);
  contraseña2('contraseña2','#contraseña2',input);
}

function campo(objeto,exprecion,id,input){
  if(input.target.classList.contains(`${objeto}`)){
    if(exprecion.test(input.target.value)){
      correcto(`${id}`);
    }else{
      incorrecto(`${id}`);
      if(input.target.value.length === 0){
        document.querySelector(`${id}`).classList.remove('incorrecto');
        document.querySelector(`${id}`).classList.remove('mensaje-error-activo');
      }
    }
  }
}

function contraseña2(objeto,id,input){
  if(input.target.classList.contains(`${objeto}`)){
    if(input.target.value === document.querySelector('#contraseña input').value){
      correcto(`${id}`);
    }else{
      incorrecto(`${id}`);
      if(input.target.value.length === 0){
        document.querySelector(`${id}`).classList.remove('incorrecto');
        document.querySelector(`${id}`).classList.remove('mensaje-error-activo');
      }
    }
  }
}

function validaCheckbox(){
  if(checkbox.checked){
    document.querySelector('#validar-box').classList.add('validar');
  }else{
    document.querySelector('#validar-box').classList.remove('validar');
  }

  verificacion();
}

function verificacion(){
  if(validar.usuario.classList.contains('correcto') && validar.nombre.classList.contains('correcto') && validar.contraseña.classList.contains('correcto') && validar.contraseña2.classList.contains('correcto') && validar.email.classList.contains('correcto') && validar.telefono.classList.contains('correcto') && document.querySelector('#validar-box').classList.contains('validar')){
    boton.classList.remove('opacidad');
    boton.classList.remove('validacion');
    boton.disabled=false;
  }
}

function correcto(id){
  document.querySelector(id).classList.remove('incorrecto');
  document.querySelector(id).classList.add('correcto');
  document.querySelector(id).classList.remove('mensaje-error-activo');
}
function incorrecto(id){
  document.querySelector(id).classList.remove('correcto');
  document.querySelector(id).classList.add('incorrecto');
  document.querySelector(id).classList.add('mensaje-error-activo');
}