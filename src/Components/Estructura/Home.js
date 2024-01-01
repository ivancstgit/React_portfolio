import { useEffect, useState } from "react";
import '../../Styles/Home.css';
import Body from "./Body";

export default function Home() {

    const [darkmode, setDarkmode] = useState(getInitialTheme);
    
    const [background,setBackground] = useState();

    useEffect(() =>{
        if(darkmode){
            setBackground("img-dark1 text-white");
        }
        else{
            setBackground("img-light1 text-black")
        }          
    }, [darkmode])

    function getInitialTheme() {
        const mode = localStorage.getItem('darkmode');
        return mode == "dark";
      }

    

    const toggleDarkMode = () => {
        setDarkmode(prevDarkmode => !prevDarkmode);
        const local = localStorage.getItem('darkmode')
        if(local == "dark"){
            localStorage.setItem('darkmode', "light");
        }else{
            localStorage.setItem('darkmode', "dark");
        }
    };

    const toggleLoad = () => {
        setLoaded(true);
    }

    return (
        <section className={`${background} background`}>
            <Body mode={darkmode} toggleDarkMode={toggleDarkMode} toggleLoad={toggleLoad}/>
            
            
        </section>

    )
}
