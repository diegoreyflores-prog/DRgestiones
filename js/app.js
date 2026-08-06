const fmt=new Intl.DateTimeFormat('es-CL',{dateStyle:'full'});document.getElementById('fecha').textContent=fmt.format(new Date());
fetch('https://mindicador.cl/api').then(r=>r.json()).then(d=>{
const f=v=>new Intl.NumberFormat('es-CL').format(v);
uf.textContent='$'+f(d.uf.valor);utm.textContent='$'+f(d.utm.valor);dolar.textContent='$'+f(d.dolar.valor);
}).catch(()=>{uf.textContent=utm.textContent=dolar.textContent='N/D';});