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
            window.alert("Đã xảy ra lỗi!!! Vui lòng xác nhận lại!!!")
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
            window.alert("Đã xảy ra lỗi!!! Vui lòng xác nhận lại!!!")
        } else{
            let data = {
                soGhe,ngayNhan,hinhThucThanhToan,trangThai
            }

            updateVeXe(vx.id, data);
        }
    }

    const deleteVeXe =(id)=>{
        if(window.confirm("Bạn muốn hủy vé xe này?")===true){
            fetch("http://localhost:8080/api/vexe/"+id,{
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json",
            },
            }).then(res=>res.json()).then(data=>{
                if(data.status==200){
                    window.alert("Hủy vé xe thành công!!!");
                    setLoad(true);
                }else{
                    window.alert("Đã xảy ra lỗi!!!");
                }
            })
        }
    }

    return(
        <>
        <div style={{margin: "20px", backgroundColor:"white", borderRadius: "5px"}} className="shadow">
        <div style={{display: "flex"}}>
            <input onChange={e=>setSearch(e.target.value)} className="form-control" style={{margin: "20px", width: "30%"}} type={"search"} placeholder="Tìm kiếm theo tên người đặt..."></input>
            <BsPlusSquareFill style={{marginTop: "25px"}} onClick={0} className="add-btn"></BsPlusSquareFill>
        </div>
        <div style={{padding:"20px", overflow: "auto"}}>
        {
            (()=>{
                if(tuyenXe){
                    if(tuyenXe.benXeDi&&tuyenXe.benXeDen&&tuyenXe.xe)
                    return(
                        <>
                        <div>Quản lý vé xe của tuyến xe:</div>
                        <div><b>Bến xe đi:</b> {tuyenXe.benXeDi.tenBenXe} - <b>Bến xe đến:</b> {tuyenXe.benXeDen.tenBenXe} - <b>Biển số xe:</b> {tuyenXe.xe.bienSoXe} - <b>Ngày đi:</b> {tuyenXe.ngayDi} - <b>Giờ đi:</b> {tuyenXe.gioDi}</div>
                        </>
                    )
                }
            })()
        }
        <h1 style={{textAlign: "center"}}>Danh sách các vé xe</h1>
        <Table style={{textAlign: "center"}} striped bordered hover>
        <thead>
            <tr>
            <th>STT</th>
            <th>Tên người đặt</th>
            <th>Số điện thoại</th>
            <th>Ngày đặt</th>
            <th>Ngày nhận</th>
            <th>Số ghế</th>
            <th>Loại ghế</th>
            <th>Trạng thái</th>
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
                                        <Button onClick={()=>xacNhan(vx)} style={{margin: "10px", backgroundColor:"#33FF99", color:"black"}}>Xác nhận</Button>
                                        <Button onClick={()=>deleteVeXe(vx.id)} style={{margin: "10px", backgroundColor:"#FF6600", color:"black"}}>Hủy</Button>
                                        </>
                                    )
                                }
                                else if(vx.trangThai==="ACTIVE"){
                                    return(
                                        <>
                                        <Button onClick={()=>xacNhanHoanThanh(vx)} style={{margin: "10px", backgroundColor:"#33FF99", color:"black"}}>Xác nhận hoàn thành</Button>
                                        <Button onClick={()=>deleteVeXe(vx.id)} style={{margin: "10px", backgroundColor:"#FF6600", color:"black"}}>Hủy</Button>
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