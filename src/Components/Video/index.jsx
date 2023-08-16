import react from 'react'

export const VideoComponent = () => {
    return (
        <div className="grid-inner-container">
        <div className="grid-inner-container-content">
            <div className="grid-inner-container-content-header">
                    <i className="fas fa-folder-open"></i>
                    <i className="fas fa-download"></i>
                    <i className="fas fa-share"></i>
            </div>
            <div className="grid-inner-container-content-body">
                    <i className="fas fa-video"></i>
            </div>
            <div className="grid-inner-container-content-footer">
                <p>Date</p>
            </div>
        </div>
    </div>
    )
}