import React, { useState, useEffect } from "react";
import { Row, Label, Button } from "reactstrap";
import { Colxx } from "./CustomBootstrap";
import { useDispatch, useSelector } from 'react-redux';
import InputMask from "react-input-mask";
import Template from './css/template.json'
import { getApi } from './environment/environment'
const server = getApi('url');

function Sprout() {
    
    const [loading, setLoading] = useState(true)
    // const [setup, setSetup] = useState([])    
    const [allInterests, setAllInterests] = useState([])

    const [form, setForm] = useState(useSelector(state => state.InfosDash.user))
    // REDUX
    const dispatch = useDispatch();
    const cid = useSelector(state => state.InfosDash.cid);
    const token = useSelector(state => state.InfosDash.token);
    const phone = useSelector(state => state.InfosDash.phone);
    const user = useSelector(state => state.InfosDash);
    const setup = useSelector(state => state.InfosDash.walletSetup);

    function handleField(event){
        console.log(event)
        if(event.target && event.target.name && event.target.value){
            let name = `${event.target.name}`
            let value = `${event.target.value}`
            setForm(prevState => ({ ...prevState, [name]: value }));
        }
    }

    useEffect(() => {
        // appSetup()
        if (user && user.name) { //CASO JÁ TENHA CARREGADO
        }else{
            userFields();

        }
    }, [])

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

        fetch(server, requestOptions)
            .then(response => response.json())
            .then(result => {
                setForm({
                    address: result.customer && result.customer.address,
                    birthday: result.customer && result.customer.birthday,
                    city: result.customer && result.customer.city,
                    country: result.customer && result.customer.country,
                    email: result.customer && result.customer.email,
                    firstname: result.customer && result.customer.firstname,
                    gender: result.customer && result.customer.gender,
                    lastname: result.customer && result.customer.lastname,
                    phn: result.customer && result.customer.phn,
                    state: result.customer && result.customer.state,
                    zipcode: result.customer && result.customer.zipcode

                });
                dispatch({type: "STORAGE_USER", user: result.customer})
                dispatch({type: "STORAGE_INTERESTS", interests: result.customer.interests})
                let { interests } = result.customer
                setAllInterests(interests);
                setLoading(false)
            })
            .catch(error => console.log('error', error));
    }

    function update(item, permission) {
        setLoading(true);
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic Og==");
        myHeaders.append("Content-Type", "text/plain");

        var raw = `{
            \"cid\": \"${cid}\",
            \"token\": \"${token}\",
            \"action\": \"update_customer_info\",
            \"phn\": \"${phone}\",
            \"customer\": {
                \"phn\": \"${form.phn}\",
                \"firstname\": \"${form.firstname}\",
                \"lastname\": \"${form.lastname}\",
                \"email\": \"${form.email}\",
                \"gender\": \"${form.gender}\",
                \"address\": \"${form.address}\",
                \"city\": \"${form.city}\",
                \"country\": \"${form.country}\",
                \"state\": \"${form.state}\",
                \"zipcode\": \"${form.zipcode}\",
                \"birthday\": \"${form.birthday}\"
            }
        }`;
        console.log('Form', form, raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://gatetestb.textripple.com/wallet/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('result', result);
                setTimeout(() => {
                    setLoading(false)
                }, 2000);
            })
            .catch(error => console.log('error', error));
    }

    function handleInterests(item, permission) {
        // setLoading(true);
        
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

    function logo() {
        return setup.image || Template[cid].logoExtended;
    }

    function color () {
        return setup.color || Template[cid].color;
    }

    return (
        <div className="bg-grey pb-5 animate__animated animate__fadeIn">
            <div className="bg-white pb-5">
                <div className="container ">
                    <div className="py-5 text-center mx-auto">
                    
                        <img alt={cid} className="d-block mx-auto mb-4 animate__animated animate__pulse" src={logo()} height="72"/>
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
                                        disabled
                                        className="form-control" 
                                        value={form.phn} 
                                        name="phn" />
                                    <span>Your phone</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.email} 
                                        name="email"
                                        onChange={handleField} />
                                    <span>E-mail</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.firstname} 
                                        name="firstname"
                                        onChange={handleField}/>
                                    <span>First Name</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.lastname} 
                                        name="lastname"
                                        onChange={handleField} />
                                    <span>Last name</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="6" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <InputMask mask={'9999-99-99'} 
                                        className="form-control" 
                                        value={form.birthday} 
                                        onChange={handleField} />
                                    <span>Birthday</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="6" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <select
                                        className="form-control" 
                                        value={form.gender}
                                        name="gender"
                                        onChange={handleField}>
                                        <option value="m">Male</option>
                                        <option value="f">Female</option>
                                        </select>
                                    <span>Gender</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.zipcode} 
                                        name="zipcode"
                                        onChange={handleField} />
                                    <span>Zip/Postal Code</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.address} 
                                        name="address"
                                        onChange={handleField} />
                                    <span>Address</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.city} 
                                        name="city"
                                        onChange={handleField} />
                                    <span>City</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="4" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.state} 
                                        name="state"
                                        onChange={handleField} />
                                    <span>State</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="8" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.country} 
                                        name="country"
                                        onChange={handleField} />
                                    <span>Country</span>
                                </Label>
                            </Colxx>
                            
                            <Button
                                style={{backgroundColor: color(), borderColor: cid ? Template[cid].color : "white"}}
                                className={`btn-shadow btn-multiple-state ${loading ? "show-spinner" : ""}`} 

                                
                                size="lg"
                                onClick={update}
                            >
                                <span className="spinner d-inline-block">
                                <span className="bounce1" />
                                <span className="bounce2" />
                                <span className="bounce3" />
                            </span>
                            <span className="label">SAVE</span>
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