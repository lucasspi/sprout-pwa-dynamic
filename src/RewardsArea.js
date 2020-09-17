import React, { useEffect, useState }from "react";
import { Row } from "reactstrap";
import { Colxx } from "./CustomBootstrap";
import Template from './css/template.json'
import { useDispatch, useSelector } from 'react-redux';
import numeral from 'numeral';
import { getApi } from './environment/environment'
const server = getApi('url');

function RewardsArea() {

    const [allBusiness, setAllBusiness] = useState([])

    const businessIndex = useSelector(state => state.InfosDash.businessIndex);
    const cid = useSelector(state => state.InfosDash.cid);
    const token = useSelector(state => state.InfosDash.token);
    const phone = useSelector(state => state.InfosDash.phone);
    const setup = useSelector(state => state.InfosDash.walletSetup);

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
        //gatetestb.textripple.com
        fetch(server, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('result', result);
                setAllBusiness(result.business_rewards)
            })
            .catch(error => console.log('error', error));
    }

    function logo() {
        return setup.image || Template[cid].logoExtended;
    }

    function render_rewards(rewards) {
        let rewards_grouped = rewards.reduce((objectsByKeyValue, obj) => {
            const value = obj["reward_total"];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});
        let keys = Object.keys(rewards_grouped);
        rewards_grouped = Object.values(rewards_grouped);
        return rewards_grouped.map((group, index) => {
            return (
                <Colxx md="12" key={'row-' + index}  className="mb-4" >
                    <p className="text-left" 
                    style={{margin: 2, fontSize: 15}}
                    >{numeral(keys[index]).format('0,0.[00]')} points rewards</p>
                    <div id="myWorkContent">
                        <RewardsRow key={index} rewards={group} />
                    </div>
                </Colxx>

            );
        })
    }

    const RewardsRow = ({rewards}) => {
        return rewards.map((item, index) => {
            return (
                <div key={'reward-' + index} className="ib-child mr-1">
                    <div className="box-img ">
                        <img alt="" className="box-img-inside" src={item.reward_image}/>
                    </div>
                    <p className="p-title">{item.reward_description}</p>
                </div>
            );
        })
    }
    
    return (
        <div className="bg-grey pb-5 animate__animated animate__fadeIn">
            <div className="bg-white pb-5">
                <div className="container ">
                    <div className="py-5 text-center mx-auto">
                        <img className="d-block mx-auto mb-4 animate__animated animate__pulse " src={logo()} alt="" height="72"/>
                        <h2 className="display-4 color-df pt-3">Rewards Area</h2>
                        <p className="lead color-df pb-4" style={{fontWeight: "200"}}>Here is the rewards area. Let's start!</p>
                        <div className="row mx-auto justify-content-center">
                            <div style={{height: 1, width: "100%", backgroundColor: "#dadada", marginBottom: 25 }}></div>
                        </div>
                        <p>{allBusiness && allBusiness[businessIndex] && allBusiness[businessIndex].business_name ? allBusiness[businessIndex].business_name +  " - " + allBusiness[businessIndex].location_name : "" }</p>
                        <Row>
                            { allBusiness && allBusiness[businessIndex]  && render_rewards(allBusiness[businessIndex].rewards) }

                            <Colxx md="12" className="mb-4" >
                                
                            </Colxx>
                            
                        </Row>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default RewardsArea;