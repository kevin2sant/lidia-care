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
            <div className="card mb-3" style={{"border" : "3px solid #1976d2","borderRadius" : "5px", "boxShadow" : "0px 6px 11px #585858a1", "cursor" : "pointer"}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <center>
                        <Image src="/profile.jpg" width={500} height={500} alt="Psy"/>
                        </center>
                    </div>
                    
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{idPsy.v_names}</h5>
                            <p className="card-text">{idPsy.v_about_me.slice(0,100)} ...</p>
                            <p className="card-text"><small className="text-muted">Ver mas ...</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardPsyHorizontal;