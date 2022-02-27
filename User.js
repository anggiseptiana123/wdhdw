import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import API from "../Services";

const User = () => {
    const[nama,setnama]=useState("");
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const[role,setrole]=useState("");
    const[data,setData]=useState([]);
    const[id,setid]=useState(0);
    const[isUpdate,setisUpdate]=useState(false);

    useEffect(()=>{
        getData();
    },[]);

    async function getData(){
        API.getUser().then((res)=>{
            setData(res.data);
        })
    }

    function simpan(){
        if(!isUpdate){
            const formData = new FormData();
            formData.append("nama",nama);
            formData.append("email",email);
            formData.append("password",password);
            formData.append("role",role);
            API.postUser(formData).then((res)=>{
                alert("Data Berhasil Di Simpan");
                getData();
                setnama("");
                setemail("");
                setpassword("");
                setrole("");
            });
        }else{
            const formData = new FormData();
            formData.append("nama",nama);
            formData.append("email",email);
            formData.append("password",password);
            formData.append("role",role);
            API.updateUser(formData, id).then((res)=>{
                alert("Data Berhasil Di Update");
                getData();
                setnama("");
                setemail("");
                setpassword("");
                setrole("");
            });
        }
    }

    async function up(data){
        setnama(data.nama);
        setemail(data.email);
        setpassword(data.password);
        setrole(data.role);
        setid(data.id);
        setisUpdate(true);
    }

    async function del(id){
        if(window.confirm("Yakin Ingin Menghapus ?")){
            API.deleteUser(id).then((res)=>{
                alert("Berhasil DiHapus");
                getData();
            });
        }else{
            getData();
        }
    }

    return(
        <div>
            <Topbar/>
            <div className="row">
            <Sidebar/>
            <div className="col-10">
                <div className="row p-3">
                    <div className="col-md-4">
                        <div className="card text-start">
                            <div className="card-header">
                                <h5 className="card-title">Form User</h5>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="nama"> </label>
                                        <input type="text" placeholder="Input nama" className="form-control" name="nama" required value={nama} onChange={(e)=>setnama(e.target.value)}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"> </label>
                                        <input type="text" placeholder="Input email" className="form-control" name="email" required value={email} onChange={(e)=>setemail(e.target.value)}></input>
                                   
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password"> </label>
                                    <input type="password" placeholder="Input password" className="form-control" name="password" required value={password} onChange={(e)=>setpassword(e.target.value)}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role"></label>
                                       <select name="role" id="role" className="form-control" placeholder="input role" required value={role} onChange={(e)=>setrole(e.target.value)}>
                                           <option>Username</option>
                                           <option value="kasir">Kasir</option>
                                           <option value="admin">Admin</option>
                                           <option value="manager">Manager</option>
                                       </select>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary" onClick={simpan}>Simpan</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="row">
                            <div className="table-responsive">
                                <table className="table table-hover mt-2">
                                    <thead>
                                        <tr>
                                            <td>Id</td>
                                            <td>Nama</td>
                                            <td>Email</td>
                                            <td>Role</td>
                                            <td>Option</td>
                                            <td>Option</td>
                                        </tr>
                                    </thead>
                                    {data.map((item)=>(
                                        <tbody key={item.id.toString()}>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.nama}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={()=>del(item.id)}>Delete</button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-success" onClick={()=>up(item)}>Edit</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default User;