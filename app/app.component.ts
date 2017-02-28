import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ArrayService } from './ArrayService';
import * as _ from 'lodash';

interface Iautomatum{
  states: number[],
  finals: number[],
  symbols: string[]
}

@Component({
  selector: 'dn-app',
  templateUrl : 'build/form.html',
  styleUrls: ['build/css/form.css']
})
export class AppComponent {

  constructor(private formBuilder: FormBuilder, private arrayService: ArrayService){
    this.buildForm();
  }


  automatumForm: FormGroup;

  show: boolean = false;

  ssMatrix:Iautomatum;

  buildForm(){
    this.automatumForm = this.formBuilder.group({
        states: this.formBuilder.control('', [Validators.required, Validators.pattern('0(,\\d)*'), this.inputSuccessive]),
        finals: this.formBuilder.control('', [Validators.required, Validators.pattern('\\d(,\\d)*')]),
        symbols: this.formBuilder.control('', [Validators.required, Validators.pattern('[a-z](,[a-z])*')])
      });
  }

  inputSuccessive(control: FormControl):{inputSuccessive: boolean}{
     let arr = control.value.split(',').map(Number);
     let count = 0;
     for(var i = 1; i<arr.length; i++){
       if(arr[i] - arr[i-1] === 1){
         count++;
       }
     }
       if(count === arr.length-1){
          return null;
       }
       else{
          return {inputSuccessive : true};
       }
  }

  onSubmit(input: Iautomatum){
    this.show = true;
    this.arrayService.formatInput(input, null);
    this.ssMatrix = {
      states : _.uniq(input.states),
      finals:  _.uniq(input.finals),
      symbols: _.uniq(input.symbols)
      
    };

    this.ssMatrix.finals = _.intersection(this.ssMatrix.finals, this.ssMatrix.states);
    
  }
  

}

