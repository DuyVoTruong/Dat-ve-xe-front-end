import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import useBenXe from "../hooks/useBenXe";

function BenXeAdminUpdate(){


    const {updateBenXe, getBenXeById} = useBenXe();
    const localtion = useLocation()
    const idBenXe = localtion.state.idBenXe;
    const benXe = getBenXeById(idBenXe)
    console.log(benXe)

    const UpdateBenXe = (idBenXe) => {
        let tenBenXe = document.getElementById("formTenBenXe").value;
        let diaChi = document.getElementById("formDiaChi").value;
        let data = {
            tenBenXe:tenBenXe,
            diaChi:diaChi
        }
        updateBenXe(data, idBenXe);
    }

    return(
        <>
        <Container style={{marginTop:"50px", marginBottom:"50px"}}>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
                <div className="border border-3 border-primary"></div>
                <Card className="shadow">
                <Card.Body>
                    <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-uppercase ">Brand</h2>
                    <div className="mb-3">
                        <Form>
                        <Form.Group className="mb-3" controlId="formTenBenXe"
                        >
                            <Form.Label className="text-center">
                            Tên bến xe
                            </Form.Label>
                            <Form.Control type="text" placeholder="Nhập tên nhà xe" defaultValue={benXe.tenBenXe} />
                        </Form.Group>

                        <Form.Group
                            className="mb-3" controlId="formDiaChi"
                        >
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" placeholder="Nhập địa chỉ" defaultValue={benXe.diaChi} />
                        </Form.Group>

                        <div className="d-grid">
                            <Button onClick={()=>UpdateBenXe()} variant="primary" type="button">
                            Update
                            </Button>
                        </div>
                        </Form>
                        <div className="mt-3">
                        <p className="mb-0  text-center">
                            Or{" "}
                            <a href="/admin/ben-xe" className="text-primary fw-bold">
                            Back
                            </a>
                        </p>
                        </div>
                    </div>
                </div>
                </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
        </>
    );
}

export default BenXeAdminUpdate;