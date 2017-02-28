import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ArrayService } from './ArrayService';
import { DrawService } from './DrawService';
import { Machine } from './ConversionService';
import * as _ from 'lodash';

declare var $: any;
declare var Viz: any;
declare var noam: any;


@Component({
  selector: 'dn-transit',
  templateUrl: 'build/transit.html',
  styleUrls: ['build/css/form.css']
})
export class TransitComponent {


  constructor(private formBuilder: FormBuilder, private arrayService: ArrayService, private DrawService: DrawService, private Machine: Machine) { }

  transitionForm: FormGroup;
  formObject: any = {};

  @Input()
  states: number[];
  @Input()
  symbols: string[];
  @Input()
  finals: number[];

  ngOnInit() {
    this.buildForm();
  }


  buildForm() {


    for (let i = 0; i < this.states.length; i++) {
      for (let j = 0; j < this.symbols.length; j++) {
        this.formObject["s" + i + ":" + this.symbols[j]] = this.formBuilder.control('', [Validators.pattern('\\d(,\\d)*')]);
      }
    }

    this.transitionForm = this.formBuilder.group(this.formObject);


  }

  drawGraph(automaton: any, a: number) {

    var dotString = noam.fsm.printDotFormat(automaton);
    var gvizXml = Viz(dotString, "svg");
    $("#automatonGraph" + a).html(gvizXml);
    this.reorderCirclesInAcceptingStates(automaton.acceptingStates);
    $("#automatonGraph svg").width($("#automatonGraph").width());

  }


  reorderCirclesInAcceptingStates(states: any) {
    var stateElements = this.getElementsOfStates(states);

    for (var i = 0; i < stateElements.length; i++) {
      var e1 = $(stateElements[i].children("ellipse")[0]);
      var e2 = $(stateElements[i].children("ellipse")[1]);
      e1.insertAfter(e2);
    }
  }

  getElementsOfStates(states: any) {
    let retVal: any = [];

    for (var i = 0; i < states.length; i++) {
      $("title:contains('" + states[i].toString() + "')").each(function (index: any, element: any) {
        if ($(this).text() === states[i].toString()) {
          retVal.push($(this).parent());
        }
      });
    }

    return retVal;
  }


  onSubmit(input: any) {

    



    $('#fsm').attr('value', this.DrawService.formatInput(input, this.states, this.finals, this.symbols));

    let automaton = noam.fsm.parseFsmFromString($("#fsm").attr("value"));

    this.drawGraph(automaton, 0); 



  }

  onSubmitC(input: any) {

   
    let dfa = this.Machine.getDFA(this.arrayService.machineInput(input, this.states, this.symbols, this.finals));

    $('#fsm1').attr('value', this.DrawService.formatInput(this.determinise(dfa)[0], this.determinise(dfa)[1], this.determinise(dfa)[2], this.symbols));

    let automaton = noam.fsm.parseFsmFromString($("#fsm1").attr("value"));

    this.drawGraph(automaton, 1); 





  }

  home(){
    location.reload();
  }

  determinise(dfa: any) {

    let i = 0;
    let stack = {};
    let res = {};
    let states: number[] = [];
    let finals: number[] = [];
    let result: any = [];


    for (let prop in dfa) {
      if (dfa.hasOwnProperty(prop)) {

        stack[prop] = i++;

      }
    }

    for (let prop in dfa) {

      for (let p in dfa[prop]) {
        let q: string;
        if (dfa[prop].hasOwnProperty(p)) {

          q = 's' + stack[prop] + ':' + p;
          res[q] = '' + stack[dfa[prop][p]];

        }

      }
    }

    for (let p in stack) {
      if (stack.hasOwnProperty(p)) {
        states.push(stack[p]);
        if (!_.isEmpty(_.intersection(JSON.parse(p), this.finals)))
          finals.push(stack[p]);
      }
    }

    result.push(res);
    result.push(states);
    result.push(finals);

    return result;

  }

}

