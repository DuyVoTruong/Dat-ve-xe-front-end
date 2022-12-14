import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import BarChart from "../../thongKe/BarChart";
import { Button, Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import PieChart from "../../thongKe/PieChart";
import { MyContext } from "../../../App";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const ThongKeNhaXe =()=>{

    const token = useContext(MyContext).token;
    const account = useContext(MyContext).account;
    const [dataBar, setDataBar] = useState({});
    const [optionsBar, setOptionsBar] = useState({});
    const [dataPie, setDataPie] = useState([]);
    const [optionsPie, setOptionsPie] = useState([]);
    const [loaiXe, setLoaiXe] = useState([]);
    const [tuyenXe, setTuyenXe] = useState([]);
    const [show, setShow] = useState(false);

    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    useEffect(()=>{
      if(Number(month)&&Number(year)){
        fetch("http://localhost:8080/api/thongke/nhaxe/loai-xe",{
          method: "POST",
          headers: {
              'Authorization': 'Bearer ' + token,
              "Content-Type": "application/json",
          },
          body: JSON.stringify({month, year, nhaXeId: account.id}),
        }).then(res=>res.json()).then(data=>{
          if(data.status==200){
            setLoaiXe(data.object);
          }
        })

        fetch("http://localhost:8080/api/thongke/nhaxe/tuyenxe",{
          method: "POST",
          headers: {
              'Authorization': 'Bearer ' + token,
              "Content-Type": "application/json",
          },
          body: JSON.stringify({month, year, nhaXeId: account.id}),
        }).then(res=>res.json()).then(data=>{
          if(data.status==200){
            setTuyenXe(data.object);
          }
        })
      }
    },[month, year])

    const thongKeTheoLoaiXe =()=>{
      if(!Number(month)||!Number(year)){
        window.alert("Th??ng v?? n??m ph???i l?? s???!!!");
      }else if(Number(month)>12||Number(month)<0){
        window.alert("Th??ng ph???i n???m trong kho???ng t??? 1 ?????n 12")
      }
      else{
        setDataBar({
          labels: loaiXe.map(lx=>lx.tenLoaiXe),
          datasets: [
            {
              label: "Doanh thu (????n v???: ngh??n ?????ng)",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850"
              ],
              data: loaiXe.map(lx=>lx.tongDoanhThu)
            }
          ]
        });

        setDataPie({
          labels: loaiXe.map(lx=>lx.tenLoaiXe),
          datasets: [
            {
              label: "T??? l??? (????n v???: %)",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850"
              ],
              data: loaiXe.map(lx=>lx.tyLe)
            }
          ]
        });

        setOptionsBar({
          responsive:true,
          plugins:{
            legend: {
              //display: false,
              position: "top"
            },
            title: {
              display: true,
              text: "Doanh thu theo lo???i xe"
            }
          }
        });

        setOptionsPie({
          responsive:true,
          plugins:{
            legend: {
              //display: false,
              position: "top"
            },
            title: {
              display: true,
              text: "T??? l??? ph???n tr??m doanh thu theo lo???i xe"
            }
          }
        });
        setShow("LoaiXe");
      }
    }

    const thongKeTheoTuyenXe =()=>{
      if(!Number(month)||!Number(year)){
        window.alert("Th??ng v?? n??m ph???i l?? s???!!!");
      }else if(Number(month)>12||Number(month)<0){
        window.alert("Th??ng ph???i n???m trong kho???ng t??? 1 ?????n 12")
      }
      else{
        setDataBar({
          labels: tuyenXe.map(tx=>{return(tx.tinhThanhDi+" ?????n "+tx.tinhThanhDen)}),
          datasets: [
            {
              label: "Doanh thu (????n v???: ngh??n ?????ng)",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850"
              ],
              data: tuyenXe.map(tx=>tx.tongDoanhThu)
            }
          ]
        });
  
        setDataPie({
          labels: tuyenXe.map(tx=>{return(tx.tinhThanhDi+" ?????n "+tx.tinhThanhDen)}),
          datasets: [
            {
              label: "T??? l??? (????n v???: %)",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850"
              ],
              data: tuyenXe.map(tx=>tx.tyLe)
            }
          ]
        });
  
        setOptionsBar({
          responsive:true,
          plugins:{
            legend: {
              //display: false,
              position: "top"
            },
            title: {
              display: true,
              text: "Doanh thu theo tuy???n xe"
            }
          }
        });
  
        setOptionsPie({
          responsive:true,
          plugins:{
            legend: {
              //display: false,
              position: "top"
            },
            title: {
              display: true,
              text: "T??? l??? ph???n tr??m doanh thu theo tuy???n xe"
            }
          }
        });
        setShow("TuyenXe");
      }
    }

    return(
        <>
        <div style={{textAlign: "center", marginBottom:"30px", marginTop:"20px"}}><h1>Th???ng k??</h1></div>
        <div style={{margin: "20px", backgroundColor:"white", borderRadius: "5px"}} className="shadow">
        <div style={{display:"flex"}}>
          <Form.Label style={{margin:"15px"}}>Th??ng:</Form.Label>
          <Form.Control onChange={e=>setMonth(e.target.value)} type="text" style={{margin: "10px", width:"20%"}} placeholder="Nh???p th??ng c???n th???ng k??"></Form.Control>
          <Form.Label style={{margin:"15px"}}>N??m:</Form.Label>
          <Form.Control onChange={e=>setYear(e.target.value)} type="text" style={{margin: "10px", width:"20%"}} placeholder="Nh???p n??m c???n th???ng k??"></Form.Control>
        </div>
        <div style={{display:"flex"}}>
          <Button style={{margin: "10px"}} onClick={thongKeTheoLoaiXe}>Th???ng k?? theo lo???i xe</Button>
          <Button style={{margin: "10px"}} onClick={thongKeTheoTuyenXe}>Th???ng k?? theo tuy???n xe</Button>
        </div>
          {
            (()=>{
              if(show==="LoaiXe"){
                return(
                  <>
                  <div style={{display: "flex"}}>
                    <div style={{margin: "20px", border: "1px solid black", height:"500px", width:"550px"}}>
                      <BarChart data={dataBar} options={optionsBar}></BarChart>
                    </div>
                    <div style={{margin: "20px", border: "1px solid black", height:"500px", width:"550px"}}>
                      <PieChart data={dataPie} options={optionsPie}></PieChart>
                    </div>
                  </div>
                  </>
                )
              }else if(show==="TuyenXe"){
                return(
                  <>
                  <div style={{display: "flex"}}>
                    <div style={{margin: "20px", border: "1px solid black", height:"500px", width:"550px"}}>
                      <BarChart data={dataBar} options={optionsBar}></BarChart>
                    </div>
                    <div style={{margin: "20px", border: "1px solid black", height:"500px", width:"550px"}}>
                      <PieChart data={dataPie} options={optionsPie}></PieChart>
                    </div>
                  </div>
                  </>
                )
              }
            })()
          }
        </div>
        </>
    );
}

export default ThongKeNhaXe;