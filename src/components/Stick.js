import '../App.css';

export const StickLeft = ({leftSwing, stickLeftTop, stickLeftLeft}) => {
    return (
        <div className="stick" style={{top: stickLeftTop, left: stickLeftLeft}}>
            <div className="stickHead"></div>
            <div className="stickBody"></div>
            <div className={`stickLeftWeapon ${leftSwing ? 'animateLeftWeapon' : ''}`}></div>
            <div className="stickFeet">
                <div className="stickLeftFoot"></div>
                <div className="stickRightFoot"></div>
            </div>
        </div>
    )
}

export const StickRight = ({stickRightTop, stickRightLeft}) => {
    return (
        <div className="stick" style={{top: stickRightTop, left: stickRightLeft}}>
        <div className="stickHead"></div>
        <div className="stickBody"></div>
        <div className="stickRightWeapon"></div>
        <div className="stickFeet">
            <div className="stickLeftFoot"></div>
            <div className="stickRightFoot"></div>
        </div>
    </div>       
    )
}