/* @odoo-module */
import { Component, useState, onWillStart, useSubEnv, useRef, useExternalListener } from "@odoo/owl";
import { useBus, useService } from '@web/core/utils/hooks';
import { registry } from "@web/core/registry";
import { Header } from './header';
import { Body } from './body';
import { Footer } from './footer';
import { SearchEmployee } from './search';


class AppComponent extends Component {
    setup(){
        this.orm = useService('orm');
        this.root = useRef('root');
        useExternalListener(document,'keydown',this.onWindowKeyDown) // External event listener.
        useSubEnv({
        /*
         The `useSubEnv` function is used to make the defined content
         available to all child components.
        */
            orm : this.orm,
            employees : this.getFilterEmployee.bind(this)
            /*
                The `bind()` function is applied to ensure that when the
                `getFilterEmployee` function is invoked, it maintains its own
                reference to `this`, rather than inheriting it from the child environment.
            */
        });
        /*
           Since the bus is added to the environment (`env`),
           we can specify the event name and the corresponding callback function.
           You can trigger the `onClickImage` function from the child components
           by calling `this.env.bus.trigger('ON_CLICK_IMAGE', {@params})`.
        */
        useBus(this.env.bus, 'ON_CLICK_IMAGE', (event) => this.onClickImage(event));
        useBus(this.env.bus, 'ON_SEARCH', (event) => this.onSearch(event));
        /*
            The `this.selectedDepartment.teamId` is reactive, which means that
            whenever the `teamId` changes, the necessary components are re-rendered.
            The `useState` component makes this reactivity possible.
            Same goes for the `this.globalSelect`.
        */
        this.selectedDepartment = useState({ teamId: 0 });
        this.globalSelect = useState({ setActive: false , selectAll: false });
        this.selectedNoEmployeesByDept = useState({ 0:0 });
        this.employeeData = useState({ data: [] });
        /*
            Reactive components using `useState` end here.
        */
        this.selectedEmployeeIds = []; //TODO: this should be a Set `{}`
        console.log('App', this);
        onWillStart(async()=>{
            /*
                The necessary data is fetched from the backend using the
                ORM method in the onWillStart asynchronous hook.
            */
            this.employeeDepartment = await this.orm.searchRead('hr.department',[],['name']);
            this.employees = await this.orm.searchRead('hr.employee', []);
            this.employeeData.data = this.filterEmployee
        });
    }
    onWindowKeyDown(event){
        if (event.keyCode === 27) // Escape Event
            this.root.el.querySelectorAll('.modal-employee').forEach(el => el.style.display = 'none')
    }
    onSearch(event){
        const employeeIds = event.detail.employees.map(employee => employee.id)
        this.employeeData.data = this.filterEmployee.filter(employee => employeeIds.includes(employee.id))
    }
    getFilterEmployee(){
    /*
        It returns the `get filterEmployee()` function, as it cannot be directly
        called from the child environment when loaded.
    */
        return this.filterEmployee
    }
    get filterEmployee(){
    /*
       Returns the filtered the employees based on the department.
    */
         return this.selectedDepartment.teamId ? this.employees.filter( employee => employee.department_id[0] === this.selectedDepartment.teamId ) : this.employees ;
    }
    get Department(){
    /*
       Returns the currently selected department.
    */
        return this.selectedDepartment.teamId ? this.employeeDepartment.filter( department => department.id === this.selectedDepartment.teamId ) : [{ id: 0, name: 'All' }];
    }
    get selectedEmployeesByDept(){
    /*
       Returns the selected employees.
    */
        return this.filterEmployee.filter(employee => employee.clicked )
    }
    handleOnChangeDepartment(event){
    /*
       When the department is changed, the state change is managed by this
       function, which is passed as the handler to the child component.
    */
        this.selectedDepartment.teamId = parseInt(event.target.selectedOptions[0].value);
        this.employeeData.data = this.filterEmployee;
    }
    get bodyProps(){
    /*
      Returns the props to the `Body` component, and functions are bound
      with `this` so that the function can access the `env` of the parent
      class, `AppComponent`.
    */
        return {
            employeeDepartment : this.employeeDepartment,
            selectedDepartment : this.selectedDepartment,
            handleOnChangeDepartment : this.handleOnChangeDepartment.bind(this),
            globalSelect: this.globalSelect,
            selectedNoEmployeesByDept : this.selectedNoEmployeesByDept[this.selectedDepartment.teamId],
            selectAllByCategory: this.selectAllByCategory.bind(this),
            employeeData: this.employeeData.data
        }
    }
    get headerProps(){
    /*
      Returns the props to the `Header` component, and functions are bound
      with `this` so that the function can access the `env` of the parent
      class, `AppComponent`.
    */
        return {
            selectedDepartment : this.Department,
            employeesNo : this.filterEmployee.length,
            headerSelectHandler: this.headerSelectHandler.bind(this),
            headerSelectAllHandler: this.headerSelectAllHandler.bind(this),
            globalSelect: this.globalSelect
        }
    }
    clearSelectedNoEmployeesByDept(){
    /*
        Clears the `selectedNoEmployeesByDept` object by setting all values to zero.
    */
        for (const key in this.selectedNoEmployeesByDept){
             if (this.selectedNoEmployeesByDept.hasOwnProperty(key)) {
                this.selectedNoEmployeesByDept[key] = 0
             }
        }
    }
    headerSelectAllHandler(){
    /*
      This function handles the `selectAll` call.
    */
        this.selectedDepartment.teamId = 0;
        this.clearSelectedNoEmployeesByDept()
        this.headerAction(true);
    }
    headerAction(condition){
    /*
      Based on the condition, this function either selects all the
      employees or deselects all employees in all the departments.
    */
        this.globalSelect.selectAll = condition;
        if (!condition){ this.selectedEmployeeIds = [] }
        this.employees.forEach(employee => { employee.clicked = condition; if (condition) { this.addEmployeeId(employee.id); this.addCount(employee.department_id[0]); };})
        this.toggleSelect(condition)
    }
    selectAllByCategory(){
    /*
        Handles the `selectAllByCategory` call from the `Body` component.
    */
        this.filterEmployee.forEach(employee => {employee.clicked = true; let add = this.addEmployeeId(employee.id); if (add) this.addCount(employee.department_id[0]);})
        this.toggleSelect(true)
    }
    addEmployeeId(employeeId){
    /*
        The `employeeId` is added to the `selectedEmployeeIds` list only if the ID is
        not already in the list. This function returns `true` if the employee ID is new.
    */
        if (!this.selectedEmployeeIds.includes(employeeId)){
            this.selectedEmployeeIds.push(employeeId);
            return true;
        }
        return false;
    }
    headerSelectHandler(){
        /*
        The value of `this.globalSelect.setActive` will be 'true'
        when the Cancel button is clicked. Therefore, instead of using
         `!this.globalSelect.setActive`, you should use `this.globalSelect.setActive`.
        */
        if (this.globalSelect.setActive){ this.headerAction(false); this.employees.forEach(employee => employee.clicked = false);}
        this.globalSelect.setActive = !this.globalSelect.setActive
        this.clearSelectedNoEmployeesByDept()
    }
    toggleSelect(add){
        /*
         Based on the given condition, either all images are selected or deselected.
        */
        const images = add ? this.root.el.querySelectorAll('.card') : this.root.el.querySelectorAll('.standout');
        images.forEach(image =>{
            add ? image.classList.add('standout') : image.classList.remove('standout')
        });
    }
    addCount(employeeDptId){
        /*
            It checks and allocates values to the corresponding keys of `employeeID`,
            `this.selectedDepartment.teamId`, and the key `0`.
        */
        if (this.selectedDepartment.teamId != 0 && employeeDptId != 0){ this.selectedNoEmployeesByDept[0] ++ }
        if (isNaN(this.selectedNoEmployeesByDept[this.selectedDepartment.teamId])) { this.selectedNoEmployeesByDept[this.selectedDepartment.teamId] = 0};
        if (isNaN(this.selectedNoEmployeesByDept[employeeDptId])) { this.selectedNoEmployeesByDept[employeeDptId] = 0};
        if (this.selectedDepartment.teamId != employeeDptId){
            this.selectedNoEmployeesByDept[this.selectedDepartment.teamId] ++
            this.selectedNoEmployeesByDept[employeeDptId] ++
        }
        else this.selectedNoEmployeesByDept[this.selectedDepartment.teamId] ++;
    }
    onClickImage(event){
        /*
            If the "Select" button is active, the onClick function will also
            be activated, allowing you to select the images. When you select
            an image component, it receives the 'standout' attribute.
            It's important to address the situation if the selected department
            changes, as the Image components of those images might not be
            selected. To handle this, the useEffect is utilized in the Image class.

            The value of the employee ID is added or removed from the
            `this.selectedEmployeeIds` list based on the click.
        */
        if (this.globalSelect.setActive){
            const imageClassList = event.detail.imageRef.el.classList
            if (this.globalSelect.selectAll){ this.globalSelect.selectAll = false; }
            if (isNaN(this.selectedNoEmployeesByDept[this.selectedDepartment.teamId])) { this.selectedNoEmployeesByDept[this.selectedDepartment.teamId] = 0}
            imageClassList.contains('standout') ? this.selectedNoEmployeesByDept[this.selectedDepartment.teamId] -- : this.selectedNoEmployeesByDept[this.selectedDepartment.teamId] ++
            imageClassList.contains('standout') ? this.selectedEmployeeIds = this.selectedEmployeeIds.filter(item => item !== event.detail.employee.id) : this.addEmployeeId(event.detail.employee.id)
            if (this.selectedDepartment.teamId != 0) { imageClassList.contains('standout') ? this.selectedNoEmployeesByDept[0] -- : this.selectedNoEmployeesByDept[0] ++ }
            const employeeDptId = event.detail.employee.department_id[0]
            if (this.selectedDepartment.teamId != employeeDptId){
                if (isNaN(this.selectedNoEmployeesByDept[employeeDptId])) { this.selectedNoEmployeesByDept[employeeDptId] = 0}
                imageClassList.contains('standout') ? this.selectedNoEmployeesByDept[employeeDptId] -- : this.selectedNoEmployeesByDept[employeeDptId] ++
            }
            imageClassList.toggle('standout')
            this.employees.filter(employee => employee.id === event.detail.employee.id ).forEach(emp => emp.clicked = emp.clicked ? !emp.clicked : true );
        }
        else{
            /*
                Displays the corresponding modal of employees.
            */
            const modal = this.root.el.querySelector(`#modal_${event.detail.employee.id}`);
            modal.style.display = 'block';
        }
    }
}

AppComponent.template = 'App';
//Child components are added to the `components` of `AppComponent`.
AppComponent.components = {
    Header,
    Body,
    Footer,
    SearchEmployee
};
// The `odoo_app` tag is added to the action category.
registry.category('actions').add('odoo_app', AppComponent)

