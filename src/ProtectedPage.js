import React from 'react'
import {useHistory} from 'react-router-dom'

function ProtectedPage({cmp}) {
    let Cmp = cmp
    const history = useHistory()
    
    if (!localStorage.getItem("unlock-token")) {
        history.push("/lock");
      }

    return (
        <>
          <Cmp/>  
        </>
    )
}

export default ProtectedPage