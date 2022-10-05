import React from 'react'

export default function Pagiganation() {
    return (
        <>
            <div className="row">
                <div className="d-flex justify-content-center align-item-center">
                    <div className="page-btn d-flex justify-content-center align-item-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </div>
                    <div className="page-btn d-flex justify-content-center align-item-center">1</div>
                    <div className="page-btn d-flex justify-content-center align-item-center">2</div>
                    <div className="page-btn d-flex justify-content-center align-item-center">3</div>
                    <div className="page-btn d-flex justify-content-center align-item-center">4</div>
                    <div className="page-btn d-flex justify-content-center align-item-center">5</div>
                    <div className="page-btn d-flex justify-content-center align-item-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}
