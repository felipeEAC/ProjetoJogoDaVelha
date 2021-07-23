//DADOS INICIAIS
let square ={
    a1:'',     a2:'',      a3:'',
    b1:'',     b2:'',      b3:'',
    c1:'',     c2:'',      c3:''
};

let player = '';
let warning ='';
let playing = false;

reset();
// EVENTOS

        // abaixo sera apresentando duas formas do mesmo codigo

        // 1º forma

        /* 
document.querySelector('.reset').addEventListener('click',reset);
document.querySelector('div[data-item=a1').addEventListener('click', itemClick);
document.querySelector('div[data-item=a2').addEventListener('click', itemClick);
document.querySelector('div[data-item=a3').addEventListener('click', itemClick);
document.querySelector('div[data-item=b1').addEventListener('click', itemClick);
document.querySelector('div[data-item=b2').addEventListener('click', itemClick);
document.querySelector('div[data-item=b3').addEventListener('click', itemClick);
document.querySelector('div[data-item=c1').addEventListener('click', itemClick);
document.querySelector('div[data-item=c2').addEventListener('click', itemClick);
document.querySelector('div[data-item=c3').addEventListener('click', itemClick);
        */

        //2º forma
document.querySelector('.reset').addEventListener('click',reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click',itemClick);
});

//FUNÇOES
function itemClick(event){
   // console.log(event.target);  //verifica no console as teclas digitadas
   let item = event.target.getAttribute('data-item');
   if(playing && square[item] === ''){
      square[item] = player;
      renderSquare();
      togglePlayer();
  }

}

function reset(){
    warning='';

    let random = Math.floor(Math.random()*2);   //Math.floor arredeonda um numero aleatorio para menos , Math.random dera um numero aleatorio, *2 vai multilicar o numero gerado e arredondar 
    
    player = (random === 0)  ? 'x' : 'o';    // forma reduzida da operaçao abaixo

   /*
    if(random === 0){ 
        player = 'x';
    }else{
        player = 'o';
    }
  */
    for (let i in square){
        square[i]= '';
    }
    playing = true;
    renderSquare();
    renderInfo();
}

function renderSquare(){
    for(let i in square){
       // console.log("ITEM:", i);
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];       // forma simplificada da funçao abaixo  --  caso nao 
       
       /*if(square[i] != ''){
            item.innerHTML = square[i];
        }else{
            item.innerHTML = '';
        }
        */
    }
    checkGame();
}

function renderInfo(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}
function togglePlayer(){
   /*
    if(player == 'x'){
        player = 'o';
    }else{
        player = 'x';
    }
    */
    player = (player === 'x') ? 'o' : 'x' ;
    renderInfo();
}

function checkGame(){
    if(checkWinnerFor('x')){
        warning = 'O "x" venceu' ;
        playing = false;
    }else if(checkWinnerFor('o')){
        warning = 'O "o" venceu' ;
        playing = false;
    }else if(isFull()){
        warning ='Deu empate';
        playing = false;
    }
}

function checkWinnerFor(player){
    let pos = [
       'a1,a2,a3',
       'b1,b2,b3',
       'c1,c2,c3',

       'a1,b1,c1',
       'a2,b2,c2',
       'a3,b3,c3',

       'a1,b2,c3',
       'a3,b2,c1'
    ];

    for(let w in pos){
        let pArray = pos[w].split(','); // a1 a2 a3
        //pArray.every(option => square[option] === player);              // versao simplificado do if else abaixo
           
           /* // versao IF ELSE
           pArray.every((option) => {
                 if(square[option] === player){
                       return true;
                  }else{
                        return false;
                 }
             }   
            */
        let hasWon = pArray.every(option => square[option] === player);
        if(hasWon){
            return true;
        }
    }
    return false;
    
}
function isFull(){
    for(let i in square){
        if(square[i] === ''){
            return false;
        }
    }
    return true;
}