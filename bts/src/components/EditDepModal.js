import React, {Component} from "react";
import {Modal, Button, Row, Col, Form, FormGroup} from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import IconButton from '@mui/material/IconButton';



export class EditDepModal extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            snackbaropen: false,
            snackbarmsg:''
        }
        this.handleSubmit=this.handleSubmit.bind(this);

    }

    snackbarClose = () =>
    {
        this.setState({
            snackbaropen:false
        });
    }

    handleSubmit(e)
    {
        e.preventDefault(); // DepartmentName eşittir DepartmentName olmaması için
        // alert(e.target.DepartmentName.value)
        fetch('http://localhost:65530/api/department',{
            method: "PUT", 
            headers:{
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                DepartmentID:e.target.DepartmentID.value,
                DepartmentName:e.target.DepartmentName.value
            })
        })
             .then(res => res.JSON())
             .then((result) =>
             {
                this.setState({
                    snackbaropen:true,
                    snackbarmsg:result
                })
                //   alert(result)  
             },
             (error) => 
             {
                this.setState({
                    snackbaropen:true,
                    snackbarmsg:'Failed'
                })
                // alert('Failed')
             }
             )
    }

    render()
    {
        return(
            <div className="container" >
                <Snackbar 
                anchorOrigin={{vertical:'center',horizontal:'center' } }
                open={this.state.snackbaropen}
                autoHideDuration={3000}
                onClose={this.snackbarClose}

                message={<span id="mesage-id">{this.state.snackbarmsg}</span>}
                action={[
                    <IconButton key='close' aria-label='Close' color="inherit" onClick={this.snackbarClose} >
                        x
                    </IconButton>
                ]}


                />
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Department
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
                <Row>
                    <Col sm={6} >
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                                <Form.Label>
                                    DepartmentID
                                </Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="DepartmentID"
                                    required  // boş eklememek için
                                    disabled // değiştirememek için
                                    defaultValue={this.props.depid}
                                    placeholder="DepartmentID"        
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Department Name
                                </Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="DepartmentName"
                                    required  // boş eklememek için
                                    defaultValue={this.props.depName}
                                    placeholder="DepartmentName"        
                                />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit" >
                                    Update Department
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
          </div>
        )
    }
}