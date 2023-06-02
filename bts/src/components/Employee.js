import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { AddEmpModal } from './AddEmpModal';
import {Button, ButtonToolbar} from 'react-bootstrap';
import { EditEmpModal } from './EditEmpModal';


export class Employee extends Component {
    constructor(props)
    {
        super(props);
        this.state=
        {
            emps:[],
            addModalShow:false,
            editModalShow: false
        };
    }

    componentDidMount() {   //// render dan sonra çalışır
        this.refleshist();
     }

    componentDidUpdate(){   /// anında güncellemeyi görmek için
        this.refleshist();
    }

    refleshist()
    {
        fetch('http://localhost:65530/api/employee')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.setState({
                        emps:data
                    })
                });
    }

    deleteEmp(empid)
    {
        if(window.confirm('ARE YOU SURE'))
        {
            fetch('http://localhost:65530/api/employee/' + empid,
        {
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
         },
        })
        }

    }
render(){
    const{emps, empid, empname, depmt, mailid, doj }=this.state;
    let addModalClose = () => this.setState({addModalShow:false})
    let editModalClose = () => this.setState({editModalShow:false})
   return (
    <div>
    <Table className='mt-4' striped bordered hover size='sm'>
     <thead>
         <tr>  
             <th>EmployeeID</th>
             <th>EmployeeName</th>
             <th>Department</th>
             <th>MailID</th>
             <th>DOJ</th>
             <th>Option</th>
         </tr>
     </thead>
     <tbody>
         {emps.map(emp =>
         <tr key={emp.EmployeeID}>
             <td>{emp.EmployeeID}</td>
             <td>{emp.EmployeeName}</td>
             <td>{emp.Department}</td>
             <td>{emp.MailID}</td>
             <td>{emp.DOJ}</td>
             <td>
                 <ButtonToolbar>
                     <Button onClick={() => this.setState({
                         editModalShow: true,
                         empid: emp.EmployeeID,
                         empname: emp.EmployeeName,
                         depmt: emp.Department,
                         mailid: emp.MailID,
                         doj: emp.DOJ
                     })} >  
                         Edit
                     </Button>

                     <Button style={{marginLeft: "20px"}} variant='danger'
                         onClick={() => this.deleteEmp(emp.EmployeeID)}
                     >
                         Delete
                     </Button> 

                     <EditEmpModal 
                     show={this.state.editModalShow}
                     onHide={editModalClose}
                     empid={empid}
                     empname={empname}
                     depmt={depmt}
                     mailid={mailid}
                     doj= {doj}
                     />

                 </ButtonToolbar>

             </td>
         </tr>
         )
         }
     </tbody>

    </Table>

    <ButtonToolbar>
       <Button onClick={() => this.setState({
         addModalShow:true
       })} >
         Add Employee
       </Button>
    </ButtonToolbar>

    <AddEmpModal
     show={this.state.addModalShow} 
     onHide={addModalClose} 
     />

 </div>   
    )
  }
}   