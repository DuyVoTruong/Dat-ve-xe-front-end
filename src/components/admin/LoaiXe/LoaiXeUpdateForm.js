import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {getLoaiXeById} from "../../hooks/useFunction"

function LoaiXeUpdateForm({showForm, setShowForm, update, id, lx}){

    const handleClose = () => {setShowForm(false)};

    const UpdateLoaiXe = (event) => {
        event.preventDefault();
        let tenLoaiXe = document.getElementById("formTenLoaiXe").value;
        let sucChua = Number(document.getElementById("formSucChua").value);
        if(!tenLoaiXe||!sucChua){
            window.alert("Bạn phải điền đầy đủ thông tin!!!")
        }else{
            if(sucChua<1){
                window.alert("Sức chứa của xe phải lớn hơn 0")
            }else{
                let data = {
                    tenLoaiXe,sucChua
                }
                update(id, data);
                console.log(data)
            }
        }
    }


    return (
        <>
          <Modal show={showForm} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật thông tin loại xe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formTenLoaiXe">
                        <Form.Label className="text-center">
                        Tên loại xe
                        </Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên loại xe" defaultValue={lx.tenLoaiXe}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSucChua">
                        <Form.Label>Sức chứa</Form.Label>
                        <Form.Control type="number" min={1} defaultValue={lx.sucChua} placeholder="Nhập sức chứa của xe" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="button" onClick={UpdateLoaiXe}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        </>
    );

    return(
        <>
        <div className="container-dashboard">
            <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
            <div style={{border: "solid 10px blue", background:"blue"}}></div>
                <Card className="shadow">
                <Card.Body>
                    <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-uppercase ">Brand</h2>
                    <div className="mb-3">
                        <Form>
                        <Form.Group className="mb-3" controlId="formTenLoaiXe">
                            <Form.Label className="text-center">
                            Tên loại xe
                            </Form.Label>
                            <Form.Control type="text" placeholder="Nhập tên loại xe" defaultValue={lx.tenLoaiXe}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formSucChua">
                            <Form.Label>Sức chứa</Form.Label>
                            <Form.Control type="number" min={1} defaultValue={lx.sucChua} placeholder="Nhập sức chứa của xe" />
                        </Form.Group>

                        <div className="d-grid">
                            <Button onClick={UpdateLoaiXe} variant="primary" type="button">
                            Update
                            </Button>
                        </div>
                        </Form>
                        <div className="mt-3">
                        <p className="mb-0  text-center">
                            Or{" "}
                            <Link className="text-primary fw-bold" to="/admin/loai-xe">Back</Link>
                        </p>
                        </div>
                    </div>
                </div>
                </Card.Body>
                </Card>
            </Col>
            </Row>
        </div>
        </>
    );
}

export default LoaiXeUpdateForm;