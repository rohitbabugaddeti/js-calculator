const opts = ['*', '/', '+', '-', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '.']; //all keys
const spec = ['*', '/', '+', '-','=']; //special function keys
let dec = false;
let eva = false;

function init() {
    document.title = "JS Calculator";
    const container = document.createElement('div');
    container.classList.add('container');
    container.style.maxWidth = '600px';
    container.style.maxHeight = '700px';
    container.style.margin='auto';
    document.body.appendChild(container);
    const output = document.createElement('input');
    output.setAttribute('type','text');
    output.classList.add('output');
    output.style.width = '100%';
    output.style.lineHeight = '50px';
    output.style.fontSize = '3em';
    output.style.textAlign = 'right';
    container.appendChild(output);
    const main = document.createElement('div');
    main.classList.add('main');
    main.style.maxWidth = '600px';
    main.style.maxHeight = '700px';
    container.appendChild(main);
    var i;
    for (i=0; i<2; i++)
    {
        temp=document.createElement('button');
        temp.setAttribute('type','button');
        temp.style.width = '23%';
        temp.style.lineHeight = '50px';
        temp.style.margin ='1%';
        temp.style.border = '0px';
        temp.val='';
        temp.style.visibility = "hidden"; //to hide a html element
        main.appendChild(temp);
    }
    makeBtn('C',clrAll);
    makeBtn('Del',clrOne);
    opts.forEach(function(opt_val){
        makeBtn(opt_val,addToOutput);
    });
    makeBtn('=',evaluate);
        function clrOne(){
            let actual = output.value;
            output.value=actual.slice(0,-1);
            //console.log(actual.slice(actual.length-1,actual.length));
            if(!output.value.includes('.')){ //check if '.' exists in the output after clearing one.
                dec=false;
            }
        }
        function clrAll(){
            output.value = '';
            dec=false;
        }
    
        function evaluate(){
            if(output.value==='' || eva){
                output.style.border = 'red 1px solid';
            }
//            else if(eva){
//                output.style.border = 'red 1px solid';
//            }
            else{
                output.style.border = '';
                output.value = eval(output.value);
            }
            
        }
    
        function makeBtn(btn_string,func){
            let btn = document.createElement('button');
            btn.setAttribute('type','button');
            btn.style.width = '23%';
            btn.style.lineHeight = '50px';
            btn.style.margin = '1%';
            btn.style.fontSize = '2em';
            btn.val = btn_string;
            btn.textContent = btn_string;
            btn.addEventListener('click',func);
            main.appendChild(btn);
    }
    
    
        function addToOutput(obj){
            //console.log(obj.target); //obj.target gives the actual element on which the event listener was defined
            let data = obj.target.val;
            //console.log(data);
            output.style.border = '';
            if(data == '.'){ //to make sure we add only one '.' in the output
                if(dec){
                    data='';
                    output.style.border = 'red 1px solid';
                }
                else{
                    dec = true;
                }
            }
            eva = spec.includes(data);
            if(eva){ //enabling adding '.' if any spec key is pressed
                dec=false;
                //console.log(spec.includes(output.value.slice(output.value.length-1,output.value.length)));
                last_val = output.value.slice(output.value.length-1,output.value.length);
                if(spec.includes(last_val) || last_val=='.'){
                    data='';
                    output.style.border = 'red 1px solid';
                }
            }
            if (output.value.length==0 && spec.includes(data)){ //check if start of the expression is a special function
                data = '';
                output.style.border = 'red 1px solid';
            }
            output.value += data;
    }
    
}

window.addEventListener("DOMContentLoaded", init);
