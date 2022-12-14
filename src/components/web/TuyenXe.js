import { useContext, useEffect, useState } from "react";
import { Container, Table, ToastBody } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {GrDescend, GrAscend} from "react-icons/gr"
import { getAllBenXeUser, getAllVeXeByTuyenXeId, getTuyenXeFindByAddressDate } from "../hooks/useFunction";
import useNhaXe from "../hooks/useNhaXe";
import { MyContext } from "../../App";

function TuyenXe(){

    const token = useContext(MyContext).token;
    const account = useContext(MyContext).account;
    const [benXe, setBenXe] = useState([]);
    const [tuyenXe, setTuyenXe] = useState([]);
    const {nhaXe} = useNhaXe();
    const tinhThanh = [];
    let d = new Date();
    const toDay = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

    const [q] = useSearchParams();
    const [diemDi, setDiemDi] = useState(q.get("diemDi"));
    const [diemDen, setDiemDen] = useState(q.get("diemDen"));
    const [Ascending, SetAscending] = useState(true);
    let soGheDaDat = 0;

    const convertNgay=(d)=>{
      let ngay;
      if(d.getDate()<10||d.getMonth()<9){
          let date=d.getDate();
          let month=d.getMonth()+1;
          if(date<10){
              date="0"+date;
          }
          if(month<9){
              month="0"+month
          }
          ngay = d.getFullYear()+"-"+month+"-"+date;
      }else{
          ngay = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
      }
      return ngay;
  }

  const [date, setDate] = useState(q.get("date")||convertNgay(d));


    const onClickAscending = () =>{
        SetAscending(!Ascending);
    }

    useEffect(()=>{
      getAllBenXeUser().then(data=>{
        if(data){
          setBenXe(data)
        }
      })

      let data = {
        benXeDi:diemDi,
        benXeDen:diemDen,
        date:date
      }
      if(!diemDi&&!diemDen&&!date){
        setTuyenXe([])
      }else{
        getTuyenXeFindByAddressDate(data).then(data=>{
          if(data){
            setTuyenXe(data)
          }
          else{
            setTuyenXe([])
          }
        })
      }
    },[diemDi,diemDen,date])

    useEffect(()=>{
      window.scrollTo(0,0);
    },[]);

    const nav = useNavigate();
    const datVe =(tx)=>{
        nav("/dat-ve-xe/"+tx.id);
    }

    const giaoHang =(tx)=>{
      nav("/giao-hang/"+tx.id);
    }

    return(
        <>
        <Container>
          <div id="booking" class="section" style={{marginBottom: "100px"}}>
            <div class="section-center">
              <div class="container">
                <div>
                  <div class="booking-form shadow">
                    <form>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <span class="form-label">??i???m ??i</span>
                            <input class="form-control" type="text" placeholder="Ch???n ??i???m ??i" list="DiemDi" defaultValue={diemDi} onChange={e=>setDiemDi(e.target.value)}/>
                            <datalist id="DiemDi">
                            {benXe.map(bx=>{
                                return(<option value={bx.tinhThanh}></option>);
                            })}
                            </datalist>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <span class="form-label">??i???m ?????n</span>
                            <input class="form-control" type="text" placeholder="Ch???n ??i???m ?????n" list="DiemDen" defaultValue={diemDen} onChange={e=>setDiemDen(e.target.value)}/>
                            <datalist id="DiemDen">
                            {benXe.map(bx=>{
                              if(tinhThanh.indexOf(bx.tinhThanh)<0){
                                tinhThanh.push(bx.tinhThanh);
                                return(<option value={bx.tinhThanh}></option>);
                              }
                            })}
                            </datalist>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <span class="form-label">Ng??y ??i</span>
                            <input class="form-control" type="date" required defaultValue={date||convertNgay(d)} onChange={e=>setDate(e.target.value)}/>
                          </div>
                        </div>
                        {/*
                            (()=>{
                                if(Ascending === true){
                                    return(
                                        <div class="col-md-3">
                                        <div class="form-group">
                                            <span class="form-label">S???p x???p gi??</span>
                                            <p class="form-control center" onClick={onClickAscending} style={{display: "flex", justifyContent: "center"}}>
                                                <div style={{position: "absolute", top: "50%", transform: "inherit"}}>
                                                    <GrAscend></GrAscend>T??ng d???n
                                                </div>
                                            </p>
                                        </div>
                                        </div>
                                    );
                                }
                                else{
                                    return(
                                        <div class="col-md-3">
                                        <div class="form-group">
                                            <span class="form-label">S???p x???p gi??</span>
                                            <p class="form-control center" onClick={onClickAscending} style={{display: "flex", justifyContent: "center"}}>
                                                <div style={{position: "absolute", top: "50%", transform: "inherit"}}>
                                                    <GrDescend></GrDescend>Gi???m d???n
                                                </div>
                                            </p>
                                        </div>
                                        </div>
                                    );
                                }
                            })()*/
                        }
                        {/*
                        <div class="col-md-3">
                          <div class="form-btn">
                          <button class="submit-btn"><i class="text-white px-2 fa fa-search">T??M KI???M</i></button>
                          </div>
                      </div>*/}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <h1 style={{textAlign:"center"}}>T???t c??? tuy???n xe trong ng??y {new Date(date).toLocaleDateString('vi')}</h1>
        <Container>
        <div style={{marginTop:"30px", height:"500px", backgroundColor:"white", borderRadius: "3px", overflow: "auto"}} className="shadow">
        <div style={{padding: "20px"}}>
        <Table striped bordered hover style={{backgroundColor:"white"}}>
        <thead>
            <tr>
            <th>Tuy???n xe</th>
            <th>Nh?? xe</th>
            <th>Lo???i xe</th>
            <th>S???c ch???a</th>
            <th>Ng??y ??i</th>
            <th>Gi??? kh???i h??nh</th>
            <th>Th???i gian h??nh tr??nh</th>
            <th>Gi?? v??</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {tuyenXe.map(tx=>{
                return(
                    <>
                    <tr>
                    <td>{tx.benXeDi.tenBenXe} ({tx.benXeDi.tinhThanh}){" => "}{tx.benXeDen.tenBenXe} ({tx.benXeDen.tinhThanh})</td>
                    <td>{tx.xe.nhaXe.tenNhaXe}</td>
                    <td>{tx.xe.loaiXe.tenLoaiXe}</td>
                    <td>{tx.xe.loaiXe.sucChua}</td>
                    <td>{tx.ngayDi}</td>
                    <td>{tx.gioDi}</td>
                    <td>{tx.thoiGianHanhTrinh}</td>
                    <td>{tx.giaVe}</td>
                    <td style={{textAlign: "center"}}>
                      <button onClick={()=>{if(!account){window.alert("B???n ph???i ????ng nh???p ????? ?????t v??!!!")}else{datVe(tx)}}} style={{margin:"10px", border:"1px solid #c0c6cc", borderRadius:"15px"}}><img style={{margin:"10px",maxHeight:"80%",height:"30px",width:"30px",maxWidth:"80%"}} src="/ticket-icon.png"></img><span style={{marginRight: "10px"}}>?????t v?? xe</span></button>
                      <button onClick={()=>{if(!account){window.alert("B???n ph???i ????ng nh???p ????? nh??? giao h??ng!!!")}else{giaoHang(tx)}}} style={{margin:"10px", border:"1px solid #c0c6cc", borderRadius:"15px"}}><img style={{margin:"10px",maxHeight:"80%",height:"30px",width:"30px",maxWidth:"80%"}} src="/img/chuyen-hang.png"></img><span style={{marginRight: "10px"}}>Giao h??ng</span></button>
                    </td>
                    </tr>
                    </>
                )
            })}
            {
                (()=>{
                    soGheDaDat=0;
                })()
            }
        </tbody>
        </Table>
        </div>
        </div>
        </Container>
        </>
    )
}

export default TuyenXe;