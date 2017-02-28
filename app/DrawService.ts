import * as _ from 'lodash';

export class DrawService {

    states(states:number[]){
        let _states = "#states\n";
            for(let i=0; i<states.length; i++){
                _states += i !== states.length-1 ? "s" + states[i] + "\n": "s" + states[i];
            }

        return _states;
    }

    finals(finals:number[]){
        let _finals = "#accepting\n";
            for(let i=0; i<finals.length; i++){
                _finals += "s" + finals[i] + "\n";
            }

            return _finals;
    }

    symbols(symbols:string[]){
        let _symbols = "#alphabet\n";
            for(let i=0; i<symbols.length; i++){
                _symbols += symbols[i] + "\n";
            }

            return _symbols;
    }

    transitions(input:any, states:number[]){

        let _transition = "#transitions\n";
        for (let prop in input) {
            let q = "";
            let p:string = prop + ">";
            if (input.hasOwnProperty(prop)) {

                if(input[prop] === "" || _.isEmpty(_.intersection(input[prop].split(',').map(Number), states))) continue;
                let transit = _.intersection(input[prop].split(',').map(Number), states);
                for(let i=0; i<transit.length; i++){
                q += i !== transit.length-1 ? "s" + transit[i] + "," : "s" + transit[i] + "\n";
               
            }
             p += q;
            _transition += p;
            }
           
        }

        

        return _transition;

    }
 
    formatInput(input: any, states:number[], finals:number[], symbols:string[]) {

       return  this.states(states) + "\n#initial\ns0\n" + this.finals(finals) + this.symbols(symbols) + this.transitions(input, states);

    }
}
