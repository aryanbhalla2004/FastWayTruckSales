import React from 'react'

export const PageTitle = (props) => {
  return (
    <div className='flex fl-center page-header-container'>
      <div className="overlay-dull-color flex fl-center">
        <div className="content-widthfix page-header flex fl-space-between fl-center">
          <h2>{props.name}</h2>
          <div className="path flex fl-center fl-space-between">
            <h3>Home</h3>
            <i className="bi bi-chevron-right primary-color"></i>
            <h3>{props.name}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
