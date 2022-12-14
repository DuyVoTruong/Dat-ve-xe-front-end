import { useContext, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { BsPlusSquareFill } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import { useLocation, useParams } from "react-router-dom";
import { MyContext } from "../../../App";
import { getAllVeXeByTuyenXeId, getTuyenXeById } from "../../hooks/useFunction";
import useTuyenXe from "../../hooks/useTuyenXe";
import useVeXe from "../../hooks/useVeXe";

const QuanLyVeXe =()=>{
    const account = useContext(MyContext).account;
    const token = useContext(MyContext).token;
    const tuyenXeId = useParams().id;
    const [search, setSearch] = useState("");
    const [veXe, setVeXe] = useState([]);
    const [tuyenXe, setTuyenXe] = useState([]);
    const [load,setLoad] = useState(false);
    let stt = 0;


    const updateVeXe =(id,data)=>{
        fetch(`http://localhost:8080/api/vexe/${id}`, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res=>res.json()).then(data=>{
            if(data.status==200){
                window.alert("Success");
                setLoad(true);
            }
        })
    }

    useEffect(()=>{
        getAllVeXeByTuyenXeId(tuyenXeId, token).then(data=>{
            if(data){
                setVeXe(data);
            }
        })
        getTuyenXeById(tuyenXeId, token).then(data=>{
            if(data){
                setTuyenXe(data);
            }
        })
        setLoad(false);
    },[load])

    const xacNhan=(vx)=>{
        let soGhe = [vx.soGhe];
        let ngayNhan = vx.ngayNhan;
        let hinhThucThanhToan = vx.hinhThucThanhToan;
        let trangThai = "ACTIVE";

        let data = {
            soGhe,ngayNhan,hinhThucThanhToan,trangThai
        }

        if(!soGhe||!ngayNhan||!hinhThucThanhToan||!trangThai){
            window.alert("???? x???y ra l???i!!! Vui l??ng x??c nh???n l???i!!!")
        } else{
            let data = {
                soGhe,ngayNhan,hinhThucThanhToan,trangThai
            }

            updateVeXe(vx.id, data);
        }
    }

    const xacNhanHoanThanh=(vx)=>{
        let soGhe = [vx.soGhe];
        let ngayNhan = vx.ngayNhan;
        let hinhThucThanhToan = vx.hinhThucThanhToan;
        let trangThai = "COMPLETED";

        let data = {
            soGhe,ngayNhan,hinhThucThanhToan,trangThai
        }

        if(!soGhe||!ngayNhan||!hinhThucThanhToan||!trangThai){
            window.alert("???? x???y ra l???i!!! Vui l??ng x??c nh???n l???i!!!")
        } else{
            let data = {
                soGhe,ngayNhan,hinhThucThanhToan,trangThai
            }

            updateVeXe(vx.id, data);
        }
    }

    const deleteVeXe =(id)=>{
        if(window.confirm("B???n mu???n h???y v?? xe n??y?")===true){
            fetch("http://localhost:8080/api/vexe/"+id,{
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json",
            },
            }).then(res=>res.json()).then(data=>{
                if(data.status==200){
                    window.alert("H???y v?? xe th??nh c??ng!!!");
                    setLoad(true);
                }else{
                    window.alert("???? x???y ra l???i!!!");
                }
            })
        }
    }

    return(
        <>
        <div style={{margin: "20px", backgroundColor:"white", borderRadius: "5px"}} className="shadow">
        <div style={{display: "flex"}}>
            <input onChange={e=>setSearch(e.target.value)} className="form-control" style={{margin: "20px", width: "30%"}} type={"search"} placeholder="T??m ki???m theo t??n ng?????i ?????t..."></input>
            <BsPlusSquareFill style={{marginTop: "25px"}} onClick={0} className="add-btn"></BsPlusSquareFill>
        </div>
        <div style={{padding:"20px", overflow: "auto"}}>
        {
            (()=>{
                if(tuyenXe){
                    if(tuyenXe.benXeDi&&tuyenXe.benXeDen&&tuyenXe.xe)
                    return(
                        <>
                        <div>Qu???n l?? v?? xe c???a tuy???n xe:</div>
                        <div><b>B???n xe ??i:</b> {tuyenXe.benXeDi.tenBenXe} - <b>B???n xe ?????n:</b> {tuyenXe.benXeDen.tenBenXe} - <b>Bi???n s??? xe:</b> {tuyenXe.xe.bienSoXe} - <b>Ng??y ??i:</b> {tuyenXe.ngayDi} - <b>Gi??? ??i:</b> {tuyenXe.gioDi}</div>
                        </>
                    )
                }
            })()
        }
        <h1 style={{textAlign: "center"}}>Danh s??ch c??c v?? xe</h1>
        <Table style={{textAlign: "center"}} striped bordered hover>
        <thead>
            <tr>
            <th>STT</th>
            <th>T??n ng?????i ?????t</th>
            <th>S??? ??i???n tho???i</th>
            <th>Ng??y ?????t</th>
            <th>Ng??y nh???n</th>
            <th>S??? gh???</th>
            <th>Lo???i gh???</th>
            <th>Tr???ng th??i</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
        {
            veXe.map(vx=>{
                stt=stt+1;
                return(
                    <tr>
                        <td>{stt}</td>
                        <td>{vx.user.hoTen}</td>
                        <td>{vx.user.sdt}</td>
                        <td>{vx.ngayDat}</td>
                        <td>{vx.ngayNhan}</td>
                        <td>{vx.soGhe}</td>
                        <td>{vx.tuyenXe.xe.loaiXe.tenLoaiXe}</td>
                        <td>{vx.trangThai}</td>
                        {
                            (()=>{
                                if(vx.trangThai==="INACTIVE"){
                                    return(
                                        <>
                                        <Button onClick={()=>xacNhan(vx)} style={{margin: "10px", backgroundColor:"#33FF99", color:"black"}}>X??c nh???n</Button>
                                        <Button onClick={()=>deleteVeXe(vx.id)} style={{margin: "10px", backgroundColor:"#FF6600", color:"black"}}>H???y</Button>
                                        </>
                                    )
                                }
                                else if(vx.trangThai==="ACTIVE"){
                                    return(
                                        <>
                                        <Button onClick={()=>xacNhanHoanThanh(vx)} style={{margin: "10px", backgroundColor:"#33FF99", color:"black"}}>X??c nh???n ho??n th??nh</Button>
                                        <Button onClick={()=>deleteVeXe(vx.id)} style={{margin: "10px", backgroundColor:"#FF6600", color:"black"}}>H???y</Button>
                                        </>
                                    )
                                }
                            })()
                        }
                    </tr>
                )
            })
        }
        </tbody>
        </Table>
        </div>
        </div>
        </>
    );
}

export default QuanLyVeXe;