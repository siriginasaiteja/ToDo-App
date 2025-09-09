import React from 'react'

const Headingcomp = ({first,second}) => {
  return (
    <div>
       <h1 className='text-center signup-heading'>
                        {first} <br/> {second}
                    </h1>
    </div>
  )
}

export default Headingcomp