import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';
import { EditDepModal } from './EditDepModal';



export class Department extends Component {
    constructor(props)
    {
        super(props);
        this.state=
        {
            deps:[],
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
        fetch('http://localhost:65530/api/department')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.setState({
                        deps:data
                    })
                });
        
        // this.setState({
        //     deps:[
        //         {"DepartmentID":1, "DepartmentName":"IT"},
        //         {"DepartmentID":2, "DepartmentName":"Support"},
        //     ]
        // });
    } 
    
    deleteDep(depid)
    {
        if(window.confirm('ARE YOU SURE'))
        {
            fetch('http://localhost:65530/api/department/' + depid,
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
    const{deps, depid, depname}=this.state;
    let addModalClose = () => this.setState({addModalShow:false})
    let editModalClose = () => this.setState({editModalShow:false})
   return (
    <div>
       <Table className='mt-4' striped bordered hover size='sm'>
        <thead>
            <tr>  
                <th>DepartmentID</th>
                <th>DepartmentName</th>
                <th>Option</th>
            </tr>
        </thead>
        <tbody>
            {deps.map(dep =>
            <tr key={dep.DepartmentID}>
                <td>{dep.DepartmentID}</td>
                <td>{dep.DepartmentName}</td>
                <td>
                    <ButtonToolbar>
                        <Button onClick={() => this.setState({
                            editModalShow: true,
                            depid: dep.DepartmentID,
                            depname: dep.DepartmentName
                        })} >  
                            Edit
                        </Button>

                        <Button style={{marginLeft: "20px"}} variant='danger'
                            onClick={() => this.deleteDep(dep.DepartmentID)}
                        >
                            Delete
                        </Button>

                        <EditDepModal 
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        depid={depid}
                        depName={depname}
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
            Add Department
          </Button>
       </ButtonToolbar>
       
       <AddDepModal show={this.state.addModalShow} onHide={addModalClose} />

    </div>   
    )
  }
}