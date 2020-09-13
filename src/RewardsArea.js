import React, { useEffect, useState }from "react";
import { Row } from "reactstrap";
import { Colxx } from "./CustomBootstrap";
import Template from './css/template.json'

function RewardsArea() {

    const [business, setBusiness] = useState(null);

    useEffect(()=>{
        logo();
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
    
    return (
        <div className="bg-grey pb-5 animate__animated animate__fadeIn">
            <div className="bg-white pb-5">
                <div className="container ">
                    <div className="py-5 text-center mx-auto">
                        <img className="d-block mx-auto mb-4 animate__animated animate__pulse " src={business ?  Template[business].logoExtended : ""} alt="" height="72"/>
                        <h2 className="display-4 color-df pt-3">Rewards Area</h2>
                        <p className="lead color-df pb-4" style={{fontWeight: "200"}}>Here is the rewards area. Let's start!</p>
                        <div className="row mx-auto justify-content-center">
                            <div style={{height: 1, width: "100%", backgroundColor: "#dadada", marginBottom: 25 }}></div>
                        </div>
                        <Row>
                            <Colxx md="12" className="mb-4" >
                                <p className="text-left" style={{margin: 2, fontSize: 15}}>100 points rewards</p>
                                <div id="myWorkContent">
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                </div>
                            </Colxx>
                            <Colxx md="12" className="mb-4" >
                                <p className="text-left" style={{margin: 2, fontSize: 15}}>200 points rewards</p>
                                <div id="myWorkContent">
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                </div>
                            </Colxx>
                            <Colxx md="12" className="mb-4" >
                                <p className="text-left" style={{margin: 2, fontSize: 15}}>500 points rewards</p>
                                <div id="myWorkContent">
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                </div>
                            </Colxx>
                            <Colxx md="12" className="mb-4" >
                                <p className="text-left" style={{margin: 2, fontSize: 15}}>1000 points rewards</p>
                                <div id="myWorkContent">
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                    <div className="mr-3 ib-child">
                                        <div className="box-placeholders"/>
                                        <div className="label-placeholders"/>
                                        <div className="label-2-placeholders"/>
                                    </div>
                                </div>
                            </Colxx>
                        </Row>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default RewardsArea;