import { createContext, useContext, useState } from "react";


const MainContext = createContext();

const WarningPopup = ({ confirm, cancel, text, close }) => {
    return (
        <div className="warning-popup">
            <div className="warning-popup__text">{text}</div>
            <p className="warning-popup__p">Продолжить покупку?</p>
            <div className="warning-popup__buttons">
                <button className="warning-popup__button" onClick={() => { confirm(); close() }}>Да</button>
                <button className="warning-popup__button" onClick={() => { cancel(); close() }}>Нет</button>
            </div>
        </div>
    );

}

export const MainProvider = ({ children }) => {
    const [required, setRequired] = useState(true);
    const [warningPopupSettings, setWarningPopupSettings] = useState(null);
    const openWarningPopup = (text) => {
        return new Promise((resolve, reject) => {
            setWarningPopupSettings({ text, confirm: () => resolve(true), cancel: () => resolve(false) });
        })

    }
    const value = { required, setRequired, openWarningPopup };
    return (
        <MainContext.Provider value={value} >
            {children}
            {!!warningPopupSettings && <WarningPopup {...warningPopupSettings} close={() => {
                setWarningPopupSettings(null)

            }} />}
        </MainContext.Provider>
    )
}

export const useMainContext = () => useContext(MainContext); 