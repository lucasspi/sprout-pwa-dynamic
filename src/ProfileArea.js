import React, { useState, useEffect } from "react";
import { Row, Label, Button } from "reactstrap";
import { Colxx } from "./CustomBootstrap";
import Template from './css/template.json'

function Sprout() {
    
    const [business, setBusiness] = useState(null);
    const [form] = useState({
        phone: "",
        email: "",
        firstname: "",
        lastname: "",
        birthday: "",
        gender: "",
        zipcode: "",
    })
    const [interests, setInterests] = useState({
        "flower": false,
        "concentrate": false,
        "prerolls": false,
        "edibles": false,
        "topicals": false,
        "accessories": false,
        "newsandevents": false,
        "vaporizers": false
    })

    function handleField(field, value){

    }

    useEffect(()=>{
        logo();
    }, [])

    function logo() {
        let pathname = window.location && window.location.pathname;
        let search = window.location && window.location.search;

        if (pathname !== "/wallet") {    
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
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
                                <Label className="form-group has-float-label mb-4">
                                    <input
                                        className="form-control" 
                                        value={form.birthday} 
                                        onChange={(event) => handleField("birthday" , event.target.value)} />
                                    <span>Bithday</span>
                                </Label>
                            </Colxx>
                            <Colxx xxs="12" md="6" className="mx-auto my-auto">                    
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
                         <Row className="justify-content-between mb-2 mx-auto my-auto">
                            <div className="pointer" onClick={() => setInterests(prevState => ({...prevState, flower: !interests.flower}))}> 
                                <div className={interests.flower ? "circle-active animate__animated animate__pulse" : "circle-disabled"}>
                                    <img alt="s" src={`/assets/${interests.flower ? "star" : "star-disabled"}.png`} className={"interese-star"} />
                                </div>
                                <p className={`${interests.flower ? "color-active mt-2" : "color-disabled mt-2"}`}>Flowers</p>
                            </div>
                            <div className="pointer" onClick={() => setInterests(prevState => ({...prevState, concentrate: !interests.concentrate}))}> 
                                <div className={interests.concentrate ? "circle-active animate__animated animate__pulse" : "circle-disabled"}>
                                    <img alt="s" src={`/assets/${interests.concentrate ? "star" : "star-disabled"}.png`} className={"interese-star"} />
                                </div>
                                <p className={`${interests.concentrate ? "color-active mt-2" : "mt-2 color-disabled"}`} >Concentrate</p>
                            </div>
                            <div className="pointer" onClick={() => setInterests(prevState => ({...prevState, prerolls: !interests.prerolls}))}> 
                                <div className={interests.prerolls ? "circle-active animate__animated animate__pulse" : "circle-disabled"}>
                                    <img alt="s" src={`/assets/${interests.prerolls ? "star" : "star-disabled"}.png`} className={"interese-star"} />
                                </div>
                                <p className={`${interests.prerolls ? "color-active mt-2" : "mt-2 color-disabled"}`} >Prerolls</p>
                            </div>
                            <div className="pointer" onClick={() => setInterests(prevState => ({...prevState, edibles: !interests.edibles}))}> 
                                <div className={interests.edibles ? "circle-active animate__animated animate__pulse" : "circle-disabled"}>
                                    <img alt="s" src={`/assets/${interests.edibles ? "star" : "star-disabled"}.png`} className={"interese-star"} />
                                </div>
                                <p className={`${interests.edibles ? "color-active mt-2" : "mt-2 color-disabled"}`} >Edibles</p>
                            </div>
                            <div className="pointer" onClick={() => setInterests(prevState => ({...prevState, topicals: !interests.topicals}))}> 
                                <div className={interests.topicals ? "circle-active animate__animated animate__pulse" : "circle-disabled"}>
                                    <img alt="s" src={`/assets/${interests.topicals ? "star" : "star-disabled"}.png`} className={"interese-star"} />
                                </div>
                                <p className={`${interests.topicals ? "color-active mt-2" : "mt-2 color-disabled"}`} >Topicals</p>
                            </div>
                            <div className="pointer" onClick={() => setInterests(prevState => ({...prevState, accessories: !interests.accessories}))}> 
                                <div className={interests.accessories ? "circle-active animate__animated animate__pulse" : "circle-disabled"}>
                                    <img alt="s" src={`/assets/${interests.accessories ? "star" : "star-disabled"}.png`} className={"interese-star"} />
                                </div>
                                <p className={`${interests.accessories ? "color-active mt-2" : "mt-2 color-disabled"}`} >Accessories</p>
                            </div>
                            <div className="pointer" onClick={() => setInterests(prevState => ({...prevState, newsandevents: !interests.newsandevents}))}> 
                                <div className={interests.newsandevents ? "circle-active animate__animated animate__pulse" : "circle-disabled"}>
                                    <img alt="s" src={`/assets/${interests.newsandevents ? "star" : "star-disabled"}.png`} className={"interese-star"} />
                                </div>
                                <p className={`${interests.newsandevents ? "color-active mt-2" : "mt-2 color-disabled"}`} >News and<br/> events</p>
                            </div>
                            <div className="pointer" onClick={() => setInterests(prevState => ({...prevState, vaporizers: !interests.vaporizers}))}> 
                                <div className={interests.vaporizers ? "circle-active animate__animated animate__pulse" : "circle-disabled"}>
                                    <img alt="s" src={`/assets/${interests.vaporizers ? "star" : "star-disabled"}.png`} className={"interese-star"} />
                                </div>
                                <p className={`${interests.vaporizers ? "color-active mt-2" : "mt-2 color-disabled"}`} >Vaporizers</p>
                            </div>
                         </Row> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sprout;