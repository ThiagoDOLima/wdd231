const local = window.location.search;
//console.log(local);

const info = new URLSearchParams(local);
//console.log(info);
//Retirei as informações de console
//console.log(info.get('primeiro'));
//console.log(info.get('sobrenome'));
//onsole.log(info.get('ordenancas'));
//console.log(info.get('data'));
//console.log(info.get('local'));
//console.log(info.get('fone'));
//console.log(info.get('email'));

document.querySelector('#resultados').innerHTML = `
    <p>Agendamento para ${info.get('primeiro')} ${info.get('sobrenome')}</p>
    <p>Procurardor para ${info.get('ordenancas')} em ${info.get('data')} no Templo ${info.get('local')}</p>
    <p><p>Seu Telefone: ${info.get('fone')} <p>
    <p>Seu email é ${info.get('email')}</p>
    `;
