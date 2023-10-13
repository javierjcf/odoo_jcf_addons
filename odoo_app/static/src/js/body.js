/* @odoo-module */
import { Component, useState, useRef, useEffect, onWillStart,onMounted } from "@odoo/owl";
import { useService } from '@web/core/utils/hooks';
import { useOpenChat } from "@mail/views/open_chat_hook";


export class EmployeeChart extends Component {
    setup(){
        this.modal = useRef('Modal');
        onMounted(() => {
            // Chart canvas context.
            this.chartCtx = this.modal.el.querySelector('.chart');
            this.addChart()
        })
    }
    addChart(){
        /*
           A new chart instance is created.
        */
        const chart = new Chart(this.chartCtx,{
             type: 'bar',
           data: {
           labels: this.props.employeeTimeSheet.map(employee => employee.task_id[1]),
           datasets: [{
               label: 'Employee Activity',
               data: this.props.employeeTimeSheet.map(employee => employee.unit_amount),
               backgroundColor: [
                   'rgba(255, 99,  132, .9)',
                   'rgba(255, 159, 64,  .9)',
                   'rgba(255, 205, 86,  .9)',
                   'rgba(75,  192, 192, .9)',
                   'rgba(54,  162, 235, .9)',
                   'rgba(153, 102, 255, .9)',
                   'rgba(50,  168, 82,  .9)'
               ],
               borderWidth: 1
                 }]
           },
           options: {
               scales: {
                   y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Hours Worked' // Y-axis label
                        },
                   },
                   x: {
                    title: {
                        display: true,
                        text: 'Task' // X-axis label
                        },
                   }
               }
           }

        });
    }
    handleModalClose(){
        /*
            Closes the modal when clicked on the `x` icon.
        */
        this.modal.el.style.display = "none";
    }
}
EmployeeChart.template = 'EmployeeChart'

export class Images extends Component {
    setup(){
        this.rootImage = useRef('root-image');
        this.action = useService('action')
        this.event = useState({ mouseStart: false })
        this.openChat = useOpenChat('hr.employee') // useOpenChat is used to open chats.
        onWillStart(async() => {
            this.employeeTimeSheet = await this.env.orm.searchRead('account.analytic.line',[['employee_id','=',this.props.employee.id]], [],{ limit: 7, order: 'id desc'})
        })
        useEffect((ev) => {
        /*
            The `useEffect` will be triggered whenever there is a change in
            the dependencies, which is defined as `() => [this.props.employee]`.
            This ensures that the function defined within it checks and ensures
            that no images are displayed as selected if they weren't selected
            initially. The rationale behind this is that when an image
            component is selected from a different department, and after
            changing the department, if the mounted component is not destroyed
            and re-rendered, the selection might remain. This function
            cross-checks the current props to see whether the `clicked`
            property is present to determine whether to display the selection or not.
        */
            const imageClass = this.rootImage.el.classList;
            ev.clicked ? imageClass.contains('standout') ? '' : imageClass.add('standout') : imageClass.remove('standout')
        },() => [this.props.employee]);
    };
    get image(){
    /*
        This function returns the image associated with the employee props.
    */
        return `/web/image/hr.employee/${ this.props.employee.id }/avatar_128`;
    };
    onClickImage(ev){
    /*
        This function triggers the `ON_CLICK_IMAGE` bus event in the parent class to initiate the image selection.
    */
        this.env.bus.trigger('ON_CLICK_IMAGE',{event: ev, imageRef: this.rootImage ,employee: this.props.employee});
    };
    goBackend(){
    /*
        The `this.action.doAction` method is utilized to navigate to the view of the corresponding employee props.
    */
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: this.env._t(`${this.props.employee.display_name}`),
            res_model: 'hr.employee',
            views: [[false, 'form']],
            view_mode: 'form',
            target: 'self',
            res_id: this.props.employee.id,
        });
    }
};
Images.template = 'Images';
Images.components = {
    EmployeeChart,
};

/*
   Body Component is defined here.
*/
export class Body extends Component {};
Body.components = { Images };
Body.template = 'Body';

