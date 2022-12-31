import { useState } from "react";
import {  Form, Table } from "react-bootstrap";
import useBenXe from "../../hooks/useBenXe";
import {BsPlusSquareFill} from "react-icons/bs"
import {BiEdit} from "react-icons/bi"
import {ImBin} from "react-icons/im"
import BenXeAddForm from "./BenXeAddForm";
import BenXeUpdateForm from "./BenXeUpdateForm";

function BenXeAdmin(){

    const [search, setSearch] = useState("");
    const [showFormAdd, setShowFormAdd] = useState(false);
    const [showFormUpdate, setShowFormUpdate] = useState(false);
    const [id, setId] = useState();

    const {benXe, deleteBenXe, updateBenXe, addBenXe} = useBenXe();

    const DeleteBenXe = (id) => {
        if(window.confirm("Delete") === true){
            deleteBenXe(id)
        }
    }

    const handleShowFormAdd = () => setShowFormAdd(true);

    const updateActive =(id, item)=>{
        if(window.confirm("Thay đổi trạng thái")===true){
            let tenBenXe = item.tenBenXe;
            let diaChiChiTiet = item.diaChiChiTiet;
            let tinhThanh = item.tinhThanh;
            let trangThai="ACTIVE";
            let switchSelect = document.getElementById(`switch${item.id}`).checked;
            if(switchSelect === true){
                trangThai = "ACTIVE";
                document.getElementById(`switch${item.id}`).checked=false
            }else{
                trangThai = "INACTIVE";
                document.getElementById(`switch${item.id}`).checked=true
            }
            let data = {
                tenBenXe,diaChiChiTiet,tinhThanh,trangThai
            }
            if(!tenBenXe||!diaChiChiTiet||!tinhThanh||!trangThai){
                window.alert("Bạn phải điền đầy đủ thông tin!!!")
            }else{
                let data = {
                    tenBenXe,diaChiChiTiet,tinhThanh,trangThai
                }
                updateBenXe(id, data);
            }
        } else {
            let switchSelect = document.getElementById(`switch${item.id}`).checked;
            if(switchSelect === true){
                document.getElementById(`switch${item.id}`).checked = false;
            }else{
                document.getElementById(`switch${item.id}`).checked = true;
            }
        }

    }

    const update =(id)=>{
        setId(id);
        setShowFormUpdate(true);
    }

    return(
        <>
        <BenXeAddForm showFormAdd={showFormAdd} setShowFormAdd={setShowFormAdd} addBenXe={addBenXe}></BenXeAddForm>
        <BenXeUpdateForm key={id} showForm={showFormUpdate} setShowForm={setShowFormUpdate} update={updateBenXe} id={id}></BenXeUpdateForm>
        
        <div className="container-dashboard">
        <div style={{width: "100%", height: "30px", display: "flex"}}>
            <input onChange={(evt)=>setSearch(evt.target.value)} className="form-control" style={{marginRight: "10px", width: "30%"}} type={"text"} placeholder="Tìm kiếm theo tên..."></input>
            <BsPlusSquareFill onClick={handleShowFormAdd} className="add-btn"></BsPlusSquareFill>
        </div>
        <div style={{marginTop:"30px"}}>
        <Table style={{textAlign: "center"}} striped bordered hover>
        <thead>
            <tr>
            <th>Id</th>
            <th>Tên bến xe</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Hình ảnh</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {benXe.filter(item=>item.tenBenXe.toLowerCase().indexOf(search.toLowerCase())>=0).map((bx,index)=>{
                return(
                    <>
                    <tr>
                    <td>{bx.id}</td>
                    <td>{bx.tenBenXe}</td>
                    <td>{bx.diaChiChiTiet}</td>
                    {
                            (()=>{
                                if(bx.trangThai==="ACTIVE"){
                                    return(
                                        <>
                                        <td>
                                            <Form.Check
                                                onChange={()=>updateActive(bx.id, bx)}
                                                key={"ACTIVE"+index} 
                                                type="switch"
                                                defaultChecked
                                                id={`switch${bx.id}`}
                                            />
                                        </td>
                                        </>
                                    );
                                }else if(bx.trangThai==="INACTIVE"){
                                    return(
                                        <>
                                        <td>
                                            <Form.Check
                                                onChange={()=>updateActive(bx.id, bx)}
                                                key={"INACTIVE"+index}
                                                type="switch"
                                                id={`switch${bx.id}`}
                                            />
                                        </td>
                                        </>
                                    );
                                }
                            })()
                        }
                    <td width={"175px"}><img style={{height: "100px", width: "150px"}} src={bx.image}/></td>
                    <td><BiEdit className="edit-btn" onClick={()=>update(bx.id)}></BiEdit><ImBin className="delete-btn" onClick={()=>DeleteBenXe(bx.id)}></ImBin></td>
                    </tr>
                    </>
                )
            })}
        </tbody>
        </Table>
        </div>
        </div>
        </>
    );
}

export default BenXeAdmin;