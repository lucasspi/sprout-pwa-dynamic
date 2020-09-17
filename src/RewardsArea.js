import React, { useEffect, useState }from "react";
import { Row } from "reactstrap";
import { Colxx } from "./CustomBootstrap";
import Template from './css/template.json'
import { useDispatch, useSelector } from 'react-redux';

function RewardsArea() {

    const [allBusiness, setAllBusiness] = useState([])

    const businessIndex = useSelector(state => state.InfosDash.businessIndex);
    const cid = useSelector(state => state.InfosDash.cid);
    const token = useSelector(state => state.InfosDash.token);
    const phone = useSelector(state => state.InfosDash.phone);

    useEffect(()=>{
        load()
    }, [])

    function load() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic Og==");
        myHeaders.append("Content-Type", "text/plain");
        var raw = `{
            \"cid\": \"${cid}\",
            \"token\": \"${token}\",
            \"phn\": \"${phone}\",
            \"action\": \"rewards\"
        }`;

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
                setAllBusiness(result.business_rewards)
            })
            .catch(error => console.log('error', error));
    }
    
    return (
        <div className="bg-grey pb-5 animate__animated animate__fadeIn">
            <div className="bg-white pb-5">
                <div className="container ">
                    <div className="py-5 text-center mx-auto">
                        <img className="d-block mx-auto mb-4 animate__animated animate__pulse " src={cid ?  Template[cid].logoExtended : ""} alt="" height="72"/>
                        <h2 className="display-4 color-df pt-3">Rewards Area</h2>
                        <p className="lead color-df pb-4" style={{fontWeight: "200"}}>Here is the rewards area. Let's start!</p>
                        <div className="row mx-auto justify-content-center">
                            <div style={{height: 1, width: "100%", backgroundColor: "#dadada", marginBottom: 25 }}></div>
                        </div>
                        <p>{allBusiness && allBusiness[businessIndex] && allBusiness[businessIndex].business_name ? allBusiness[businessIndex].business_name +  " - " + allBusiness[businessIndex].location_name : "" }</p>
                        <Row>
                            <Colxx md="12"  className="mb-4" >
                                <div id="myWorkContent">
                                    {allBusiness && allBusiness[businessIndex] && allBusiness[businessIndex].rewards && allBusiness[businessIndex].rewards.map((item, index) => {return(
                                        <div key={index} className="ib-child mr-1">
                                            <div className="box-img ">
                                                <img alt="" className="box-img-inside" src={item.reward_image}/>
                                            </div>
                                            <p className="p-title">{item.reward_description}</p>
                                        </div>
                                    )})}
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