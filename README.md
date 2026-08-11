
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

const fechaEl = document.getElementById('fecha');
fechaEl.textContent = new Intl.DateTimeFormat('es-CL', {
  weekday:'long', year:'numeric', month:'long', day:'2-digit'
}).format(new Date()).toUpperCase();

const money = n => '$' + new Intl.NumberFormat('es-CL', {maximumFractionDigits:2}).format(n);

fetch('https://mindicador.cl/api')
  .then(r => r.json())
  .then(data => {
    document.getElementById('uf').textContent = money(data.uf.valor);
    document.getElementById('utm').textContent = money(data.utm.valor);
    document.getElementById('dolar').textContent = money(data.dolar.valor);
    document.getElementById('euro').textContent = money(data.euro.valor);
  })
  .catch(() => {
    ['uf','utm','dolar','euro'].forEach(id => document.getElementById(id).textContent = 'N/D');
  });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const empresa = document.getElementById('empresa').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const texto = `Hola, soy ${nombre}.${empresa ? ' Empresa: ' + empresa + '.' : ''}${correo ? ' Correo: ' + correo + '.' : ''} Consulta: ${mensaje}`;
  window.open('https://wa.me/56930689052?text=' + encodeURIComponent(texto), '_blank');
});
