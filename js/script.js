//variaveis para manipular e popular a pagina atraves de envetos
let input = null;
let button = null;
let tabUsers =null;
let divTabUsers =null;
let divTabStatisc =null

// Variaveis para manibulação das div's de conteudo
let enableTabsUsers=null;
let enableTabsSta = null;
let load=null;
let divCountResult=null;

//variaveis auxiliares
let allUsers = []
let allStatistic =[];
let countResult = 0;


window.addEventListener('load', () =>{
  
  input = document.querySelector('input');
  divTabUsers = document.querySelector('#tabUser');
  divTabStatisc = document.querySelector('#tabStatist');
  divCountResult =document.querySelector('#countResult')
  enableDivTabsUsers = document.querySelector('#tabUsers');
  enableDivTabsSta = document.querySelector('#tabStatistc');
  divLoad= document.querySelector('#load');
  button = document.querySelector('.button');
  
  input.disabled = true;
  
  fetchUsers();
  handleInput();
 
  
});

async function fetchUsers(){
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();
  const interval = setInterval(() => {
  allUsers = json.results.map(user =>{
    const {dob,gender,name,picture} = user;
    const nome = `${name.first} ${name.last}`;
    return{
      Nome:nome.toLowerCase(),
      idade: dob.age,
      sexo: gender,
      foto:picture.thumbnail
    };
  });
  divLoad.style.display = 'none';

  enableDivTabsUsers.classList.remove('disable');
  enableDivTabsSta.classList.remove('disable');
  enableDivTabsSta.classList.add('enable');
  enableDivTabsUsers.classList.add('enable');
 
  input.disabled = false;
  input.focus();

 },3000);
}  

function handleInput(){

  input.addEventListener('keyup', () =>{
    button.disabled = true;
    if (event.target.value.length > 0){
      button.disabled = false;
      buttonSearch(event);
    } 
    if(event.key ==='Enter' && event.target.value.trim() !== ''){
      filtrar(event);
    }

  });
}

function buttonSearch(event){
  button.addEventListener('click',() =>{
    if (event.target.value.trim() !== '') {
      filtrar(event);
    }
  });
}

function filtrar(event){
  
  const dado = event.target.value;
  const usersFilter = allUsers.filter((user) =>{
    return user.Nome.includes(dado.toLowerCase());
  });

  usersFilter.sort((a, b) => {
    return a.Nome.localeCompare(b.Nome);
  });
  if(usersFilter.length===0){
    clearDivs();
    return;
  }
  renderUsers(usersFilter);
  renderStatistic(usersFilter);
}

function renderUsers(usersFilter){
  
  let tabUsersHTML = ' ';
  usersFilter.forEach(user =>{
    const {Nome,idade,foto} = user;
  
    const tabUserHTML = `
    <div class="contentUsers">
      <div class='foto'>
        <img src='${foto}'>
      </div>
      <div class='nome'>${Nome}, </div>
      <div class='idade'>${idade} </div>
    </div>
    `
   
    tabUsersHTML += tabUserHTML;
  });
  let h3 = document.querySelector('h3');
  h3.textContent='usuário(s) encontrado(s)';
  divCountResult.textContent = usersFilter.length;
  divTabUsers.innerHTML = tabUsersHTML;

}

function renderStatistic(usersFilter){
  
  const  genderF = usersFilter.filter(user =>{
      return user.sexo === 'female';
  });
  const  genderM = usersFilter.filter(user => {
    return user.sexo === 'male';
  });

  const somaIdade = usersFilter.reduce((acc,current) =>{
  return acc + current.idade;
  },0);
  
  const mediaIdade = somaIdade/usersFilter.length;
  
  const percentGenderF = (genderF.length * 100)/usersFilter.length; 
  const percentGenderM = (genderM.length * 100)/usersFilter.length; 

  let tabStatisticHTML = `
    <div class="contentStatis">
      <div class="intemContentSta">
        <div><i class="fa fa-male" aria-hidden="true"></i></div>
        <div>Homens</div>
        <div class="barraG" style="width:${percentGenderM}%;">${Math.round(percentGenderM)}%</div>
        <div>${genderM.length}</div>
      </div>
      <div class="intemContentSta">
        <div><i class="fa fa-female" aria-hidden="true"></i></div>
        <div>Mulheres</div>
        <div class="barraB" style="width:${percentGenderF}%;">${Math.round(percentGenderF)}%</div>
        <div>${genderF.length}</div>
      </div>
      <div class="intemContentSta">
        <div><i class="fa fa-birthday-cake" aria-hidden="true"></i></div>
        <div class="barraS" width="${somaIdade}%">Soma Idades</div>
        <div>${somaIdade}</div>
      </div>
      <div class="intemContentSta">
        <div><i class="fa fa-calculator" aria-hidden="true"></i></div>
        <div class="barraM" width="${mediaIdade}%">Média Idades</div>
        <div>${Math.round(mediaIdade)} Anos</div>
      </div>
    </div>
    `;
  
  
  let h3 = document.querySelector('#sta');
  h3.textContent = 'Estatísticas';
  divTabStatisc.innerHTML = tabStatisticHTML;
}

function clearDivs(){
  let h3 = document.querySelector('h3');
  h3.textContent = 'Nenhum usuário filtrado(s)';
  divCountResult.textContent = '';
  divTabUsers.innerHTML = '';

  let h3Sta = document.querySelector('#sta');
  h3Sta.textContent = 'Nada a ser exibido';
  divTabStatisc.innerHTML = '';
}
// Codigo opcional em filtrar.

 /*contTamDado=tamDado;
      if(tamDado>0){
        for (let j = 0; j < user.Nome.length;j++){
          if (user.Nome.substr(j,contTamDado+j).toLowerCase() === dado[0].toLowerCase()){
            usersFilter[cont] = user;
            cont++;
            break;
          }
          
        }
      } 
      for (let j = 0; j < user.Nome.length; j++) {
        if (user.Nome.charAt(j).toLowerCase() === dado[0].toLowerCase()) {
          usersFilter[cont] = user;
          cont++;
          break;
        }
      }*/