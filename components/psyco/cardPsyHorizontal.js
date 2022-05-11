import React, { useState } from 'react'
import Image from 'next/image'

const CardPsyHorizontal = props => {
    const { idPsy } = props
    const [data, setData] = useState({
        name : '',
        surnames : ''
    })

    const getInfoPsy = id => {
        console.log(id)
    }

    return(
        <div className="col-md-12" onClick={() => getInfoPsy(idPsy)}>
            <div className="card mb-3" style={{"borderRadius" : "10px", "boxShadow" : "0px 6px 11px #585858a1", "cursor" : "pointer"}}>
                <div className="row g-0" style={{"padding" : "10px"}}>
                    <div className="col-md-4" style={{"box-shadow" : "2px 2px 7px #8d8d8d", "borderRadius" : "10px", "overflow" : 'hidden'}}>
                        <Image src={idPsy.v_image_profile} layout="responsive" width={500} height={500} alt="Psy" style={{"borderRadius" : "10px","box-shadow" : "2px 2px 7px #8d8d8d"}}/>
                    </div>
                    
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{idPsy.v_names} {idPsy.v_surnames}</h5>
                            <p className="card-text">{idPsy.v_about_me.slice(0,100)} ...</p>
                            <p className="card-text"><small className="text-muted">Selecciona para ver mas ...</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardPsyHorizontal;