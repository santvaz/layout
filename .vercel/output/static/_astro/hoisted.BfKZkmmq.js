import"./hoisted.CvN_TNCx.js";const o={username:e=>e?e.length<3||e.length>31||!/^[a-zA-Z0-9._-]+$/.test(e)?"El nombre de usuario debe ser válido: de al menos 3 caracteres alfanuméricos, y signos como [ . _ - ]":"":"Introduce un nombre de usuario",password:e=>e?e.length<8||e.length>255||!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(e)?"La contraseña debe tener al menos 8 caracteres, contener al menos una letra minúscula, una mayúscula y un número":"":"Introduce una contraseña"},s=["bg-red-400","border-y-red-400","border-x-red-300"],d=(e,r)=>{const t=document.getElementById(e.id+"Error");t.textContent=r,e.classList.add(...s)},c=e=>{const r=document.getElementById(e.id+"Error");r.textContent="",e.classList.remove(...s)},a=(e,r)=>{e.addEventListener("blur",t=>{const n=r(t.target.value);n?d(t.target,n):c(t.target)})},m=document.getElementById("username"),u=document.getElementById("password");a(m,o.username);a(u,o.password);
