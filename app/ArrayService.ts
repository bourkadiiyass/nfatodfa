import * as _ from 'lodash';


export class ArrayService {

    formatInput(input: any, arrayTest: number[]) {


        for (let prop in input) {
            if (input.hasOwnProperty(prop)) {

                input[prop] = prop === "symbols" || input[prop] === "" ? input[prop].split(',').map(String) : !arrayTest ? input[prop].split(',').map(Number) : _.intersection(input[prop].split(',').map(Number), arrayTest);


            }
        }

    }

    machineInput(input: any, states: number[], symbols: string[], finals:number[]) {

        let inputCopy = {};
        for(let prop in input){
             if (input.hasOwnProperty(prop)) {
            inputCopy[prop] = input[prop] === [""] ? [] : input[prop];
             }
        }
       
        this.formatInput(inputCopy, states);
         for(let prop in inputCopy){
             if (inputCopy.hasOwnProperty(prop)) {
            inputCopy[prop][0] === "" ? inputCopy[prop] = [] : inputCopy[prop];
             }
        }
        let def:any = {
            'start': 0,
            'finals': finals,   // Array of finals states
            'states': states,   // Array of states
            'symbols': this.epsilonCheck(symbols), // Array of symbols 
            'table': {}
        }

        for(let st in states){
                def.table[st] = {};
        }

        for(let st in states){
            for(let sm in def.symbols){
                def.table[st][def.symbols[sm]] = def.symbols[sm] === 'e' && inputCopy['s' + st + ':e'] === undefined ? [] : inputCopy['s' + st + ':' + def.symbols[sm]] ;
            }
        }

        return def;
        };
   
   epsilonCheck(symbols:string[]){
       let stack:string[] = [];
       symbols.forEach(function(t){
        stack.push(t);
    });

       if(symbols.indexOf('e') < 0){
           stack.push
            stack.push('e');
       }

       return stack;
   }


    }


