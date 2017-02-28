import * as _ from 'lodash';

export class Machine{

start:number;
states:number[];
finals:number[];
symbols:string[];
table:any;
Dstates:any;

Machine(definition:any){
           
    this.start      =   definition.start;
    this.finals     =   definition.finals;
    this.states     =   definition.states;
    this.symbols    =   definition.symbols;
    this.table      =   definition.table;
}

setStart(start:number){
    this.start  =   start;
}


setStates(states:number[]){
    this.states =   states;
}

setFinals(finals:number[]){
    this.finals =   finals;
}

setTable(table:any){
    this.table  =   table;
}


setSymbols(symbols:string[]){
    this.symbols    =   symbols;
}

Move(T:number[],x:string){
    var result:number[]  =   [],
        self    =   this;
    
    T.forEach(function(state){
        self.table[state][x].forEach(function(t:any){
            if (result.indexOf(t) < 0)
                result.push(t);
        });
    });
    return result;
}

LClosure(states:number | number[]){
    if (states instanceof Array)
        return this.LClosureT(states);
    if(typeof states === 'number')
        return this.LClosureS(states);
}

LClosureS(state:number){
    var result:number[]  =   [];
    result.push(state);
    this.table[state]['e'].forEach(function(t:any){
        result.push(t);
    });
    return result;
}

LClosureT(states:number[]){
    var t:number,stack:number[]   =   [];
    states.forEach(function(t){
        stack.push(t);
    });
    while(stack.length > 0){
        t   =   stack.pop();
        this.table[t]['e'].forEach(function(u:any){
            if (states.indexOf(u) < 0){
                states.push(u);
                stack.push(u);
            }
        })
    }
    return states;
}

Convert(def:any){

let cs:any;
    this.Machine(def);
    var LS0         =   this.LClosure(this.start),
        stack:any[]       =   [],
        T:any,U:any       =   undefined,
        self        =   this;
    
    this.Dstates    =   {};
    this.Dstates[JSON.stringify(LS0)] = {};
    stack.push(LS0);
    
    while(stack.length > 0){
        T   =   stack.pop();
        this.symbols.forEach(function(symbol){
            if (symbol != "e"){
                U   =   self.LClosure(self.Move(T,symbol));
                if (self.Dstates[JSON.stringify(U.sort())] == undefined){
                    stack.push(U);
                    self.Dstates[JSON.stringify(U)] =   {};
                }
                    self.Dstates[JSON.stringify(T)][symbol] =  JSON.stringify(U);
                
                              
            }
        });
    }
}

getDFA(def:any){
        this.Convert(def);
    return this.Dstates;
}

}
