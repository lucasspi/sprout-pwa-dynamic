import React, { useState, useEffect } from "react";
import { Row, Label, Button } from "reactstrap";
import { Colxx } from "./CustomBootstrap";
import Template from './css/template.json'

function Sprout() {
    
    const [allInterests, setAllInterests] = useState([])
    const [cid, setCid] = useState("miaaaa0001")
    const [phone, setPhone] = useState("5083309917")
    const [token, setToken] = useState("")
    const [business, setBusiness] = useState(null);
    const [form, setForm] = useState({
        phone: "",
        email: "",
        firstname: "",
        lastname: "",
        birthday: "",
        gender: "",
        zipcode: "",
    })

    function handleField(field, value){

    }

    useEffect(()=>{
        let token = localStorage.getItem('token');
        logo();
        setToken(token)
        userFields();
    }, [])

    function logo() {
        let pathname = window.location && window.location.pathname;
        let search = window.location && window.location.search;

        if (pathname !== "/wallet/") {    
            if(pathname){
                pathname = pathname.split("/");
                console.log('', );
                setBusiness(pathname[1]);
            }else{
                setBusiness(null)
            }
        }else if(search){
            search = search.split("=");
            setBusiness(search[1]);
        }
    }

    function userFields() {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic Og==");
        myHeaders.append("Content-Type", "text/plain");

        var raw = `{\n    \"cid\": \"${cid}\", \n    \"phn\": \"${phone}\",\n    \"action\": \"customer_info\",\n    \"token\": \"${token}\",\n    \"permission\": \"interests,loyalty_points\"\n}`

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://gatetestb.textripple.com/wallet/", requestOptions)
            .then(response => response.json())
            .then(result => {
                setForm({
                    address: result.customer && result.customer.address,
                    birthday: result.customer && result.customer.birthday,
                    city: result.customer && result.customer.city,
                    country: result.customer && result.customer.country,
                    email: result.customer && result.customer.email,
                    firstname: result.customer && result.customer.firstname,
                    gender: result.customer && result.customer.gender == "f" ? "Female" : "Male",
                    lastname: result.customer && result.customer.lastname,
                    phone: result.customer && result.customer.phn,
                    state: result.customer && result.customer.state,
                    zipcode: result.customer && result.customer.zipcode

                });
                let { interests } = result.customer
                setAllInterests(interests);
            })
            .catch(error => console.log('error', error));
    }

    function handleInterests(item, permission) {
        let inters = {
            "interest_id": item.interest_id,
            "interest_name": item.interest_name,
            "phn": phone
        }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic Og==");
        myHeaders.append("Content-Type", "text/plain");

        var raw = `{\n \"cid\": \"${cid}\",\n \"token\": \"${token}\",\n \"action\": \"${permission}\",\n \"phn\": \"${phone}\",\n \"interest\": {\n    \"interest_id\": ${item.interest_id},\n    \"interest_name\": \"${item.interest_name}\",\n    \"phn\": \"${phone}\"\n }\n}`;
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://gatetestb.textripple.com/wallet/", requestOptions)
            .then(response => response.text())
            .then(result => {userFields()})
            .catch(error => console.log('error', error));
    }

    return (
        <div className="bg-grey pb-5 animate__animated animate__fadeIn">
            <div className="bg-white pb-5">
                <div className="container ">
                    <div className="py-5 text-center mx-auto">
                    
                        <img alt="s" className="d-block mx-auto mb-4 animate__animated animate__pulse" src={business ?  Template[business].logoExtended : ""} height="72"/>
                        <h2 className="display-4 color-df pt-3">Profile Area</h2>
                        <p className="lead color-df pb-4" style={{fontWeight: "200"}}>Some subtitles goes here to explain more.</p>
                        <p className="text-left color-df" style={{fontWeight: "600", fontSize: 16}}>Fill the fields below</p>
                        <div className="row mx-auto justify-content-center">
                            <div style={{height: 1, width: "100%", backgroundColor: "#dadada", marginBottom: 25 }}></div>
                        </div>
                        <Row className="justify-content-center">
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.phone} 
                                        onChange={(event) => handleField("phone" , event.target.value)} />
                                    <span>Your phone</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.email} 
                                        onChange={(event) => handleField("email" , event.target.value)} />
                                    <span>E-mail</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.firstname} 
                                        onChange={(event) => handleField("firstname" , event.target.value)} />
                                    <span>First Name</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.lastname} 
                                        onChange={(event) => handleField("lastname" , event.target.value)} />
                                    <span>Last name</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="6" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.birthday} 
                                        onChange={(event) => handleField("birthday" , event.target.value)} />
                                    <span>Bithday</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="6" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.gender} 
                                        onChange={(event) => handleField("gender" , event.target.value)} />
                                    <span>Gender</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.zipcode} 
                                        onChange={(event) => handleField("zipcode" , event.target.value)} />
                                    <span>Zip/Postal Code</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.address} 
                                        onChange={(event) => handleField("address" , event.target.value)} />
                                    <span>Address</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.city} 
                                        onChange={(event) => handleField("city" , event.target.value)} />
                                    <span>City</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="4" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.state} 
                                        onChange={(event) => handleField("state" , event.target.value)} />
                                    <span>State</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="8" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.country} 
                                        onChange={(event) => handleField("country" , event.target.value)} />
                                    <span>Country</span>
                                </Label>
                            </Colxx>
                            
                            <Button
                                style={{backgroundColor: business ? Template[business].color : "white", borderColor: business ? Template[business].color : "white"}}
                                className="btn-shadow"
                                size="lg"
                                onClick={() => null}
                            >
                                <span>SAVE</span>
                            </Button>
                        </Row>
                        <div className="row mx-auto justify-content-center mt-5">
                            <div style={{height: 1, width: "100%", backgroundColor: "#dadada", marginBottom: 25 }}></div>
                        </div>
                        <p className="text-left color-df" style={{fontWeight: "600", fontSize: 16}}>Interests</p>
                        {allInterests && allInterests.length ? 
                         <Row className="justify-content-between mb-2 mx-auto my-auto">
                            {allInterests.map((item, index) => {
                                return(
                                    <div key={index} className="pointer" onClick={() => {item.phn ? handleInterests(item, "remove_customer_interest") : handleInterests(item, "add_customer_interest")}}>  
                                        <div className={item.phn ? "circle-active animate__animated animate__pulse" : "circle-disabled"}>
                                            <img alt="s" src={`/assets/${item.phn ? "star" : "star-disabled"}.png`} className={"interese-star"} />
                                        </div>
                                        <p style={{width: 65}} className={`${item.phn  ? "color-active mt-2" : "color-disabled mt-2"}`}>{item.interest_name}</p>
                                    </div>
                                )
                            })}  
                         </Row> 
                         : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sprout;