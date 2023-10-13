/* @odoo-module */
import { Component, useState, useRef, onMounted } from "@odoo/owl";

export class SearchEmployee extends Component {
    setup(){
        /*
            The SpeechRecognition feature is initiated using the `SpeechRecognition` constructor.
        */
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = SpeechRecognition ?  new SpeechRecognition() : null
        if (this.recognition){
            /*
                If `recognition` event listeners are added to handle the responses.
            */
            this.recognition.addEventListener("start", this.voiceHandler.bind(this))
            this.recognition.addEventListener("end", this.voiceHandler.bind(this))
            this.recognition.addEventListener("result", this.voiceResultHandler.bind(this))
        }
        this.searchRef = useRef('root-search');
        this.voice = useState({ active: false })
        this.employees = this.env.employees()
        onMounted(()=> this.searchRef.el.querySelector('.form-input-search').focus())
    }
    voiceResultHandler(event){
    /*
        Displays and triggers the `searchEmployee` function.
    */
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        this.searchRef.el.querySelector('.form-input-search').value = transcript;
        this.recognition.stop()
        this.searchEmployee()
    }
    searchEmployee(){
        /*
            Search for employees based on the input.
        */
        const inputValue = this.searchRef.el.querySelector('.form-input-search').value.toLowerCase()
        const employees = this.employees.filter(employee => employee.display_name.toLowerCase().includes(inputValue))
        this.env.bus.trigger('ON_SEARCH',{employees: employees})
    }
    handleKeyUp(event){
        /*
          Triggers the `searchEmployee` function with every key up event from the input tag.
        */
        this.searchEmployee()
    }
    voiceHandler(){
        /*
           Stops and starts the voice function during the end and start lifecycle of the `SpeechRecognition`.
        */
        this.voice.active = ! this.voice.active
        if (! this.voice.active)
            this.recognition.stop()
    }
    handleMicroPhoneStop(){
    /*
        Manually stops the voice recognition.
    */
        this.recognition.stop()
    }
    handleMicroPhone(){
        /*
            Starts the voice listening event.
        */
        this.searchRef.el.querySelector('.form-input-search').focus();
        this.recognition.continuous = true;
        this.recognition.start()
    }
}
SearchEmployee.template = 'SearchEmployee'