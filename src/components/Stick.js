import '../App.css';

export const StickLeft = ({leftSwing, stickLeftTop, stickLeftLeft}) => {
    return (
        <div className="stick" style={{top: stickLeftTop, left: stickLeftLeft}}>
            <div className="stickHead"></div>
            <div className="stickBody"></div>
            <div className={`stickLeftWeapon ${leftSwing ? 'animateWeapon' : ''}`}></div>
            <div className="stickFeet">
                <div className="stickLeftFoot"></div>
                <div className="stickRightFoot"></div>
            </div>
        </div>
    )
}

export const StickRight = ({rightSwing, stickRightTop, stickRightLeft}) => {
    return (
        <div className="stick" style={{top: stickRightTop, left: stickRightLeft}}>
        <div className="stickHead"></div>
        <div className="stickBody"></div>
        <div className={`stickRightWeapon ${rightSwing ? 'animateWeapon' : ''}`}></div>
        <div className="stickFeet">
            <div className="stickLeftFoot"></div>
            <div className="stickRightFoot"></div>
        </div>
    </div>       
    )
}
