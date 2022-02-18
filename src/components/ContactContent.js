import React, {useState, useEffect}from 'react'
import useWindowDimensions from '../hooks/useWindowDimensions'
import "../App.css"
import { useTransition, animated } from 'react-spring';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { Document, Page, pdfjs } from "react-pdf";
import cvpdf from '../assets/CV.pdf'




function ContactContent({isDark, isAtContact}) {

   pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

   const [numPages, setNumPages] = useState(null);
   const [pageNumber, setPageNumber] = useState(1); 
   const [openCV, setOpenCV] = useState(false);

   const [currScale, setCurrScale] = useState(0.7)

   const { height, width } = useWindowDimensions();     // EKRAN BOYUTU ALAN HOOK

    useEffect(() => {               // WIDTH'E BAGLI PDF SCALE AYARLAMA
        if(width > 900){
            setCurrScale(0.7)
        }
        else{
            setCurrScale(width/1000)
        } 
    },[width])


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

    const transition = useTransition(isAtContact, { 
        from:{opacity:0},
        enter:{opacity:1},
        leave:{opacity:0},
        config:{duration:1000},

    })

    const CV = () =>{
        return (
            <>
            <div id="cv-div">
                <Document
                file={cvpdf}
                onLoadSuccess={onDocumentLoadSuccess}
                options={{
                    cMapUrl: 'cmaps/',
                    cMapPacked: true,
                  }}
                 >
                    <Page pageNumber={pageNumber} scale={currScale}/>
                </Document>
            <div style={{display:"flex",flexDirection:"row"}}>
                <button id="cv-button" onClick={()=> {setCurrScale(currScale + 0.1)}}>+</button>
                <button id="cv-button" onClick={()=>{setOpenCV(false)}}>X</button>
                <button id="cv-button" onClick={()=> {setCurrScale(currScale - 0.1)}}>-</button>
            </div>
            </div>
            </>
        )
    }

    return (
        transition(
            (styles,item)=> item && <animated.div style={styles}>
        <>
        <div className="contactContent" style={isDark ? {color:"wheat"} : {}}>
            <div className="contact-element">
                <MailOutlineIcon style={isDark ? {color:"wheat",transition:"2s",transform:"scale(2)"} : {transform:"scale(2)"}}/>
                berkealtiparmak@outlook.com
            </div>
            <div className="contact-element">
                <InstagramIcon style={isDark ? {color:"wheat",transition:"2s",transform:"scale(2)"} : {transform:"scale(2)"}}/>
                <a style={isDark ? {color:"wheat", transition:"2s"} : {transition:"2s"}} href="https://www.instagram.com/berkealtiparmakk" target="_blank" >@berkealtiparmakk</a>
            </div>
            <div className="contact-element">
                <LinkedInIcon style={isDark ? {color:"wheat",transition:"2s",transform:"scale(2)"} : {transform:"scale(2)"}}/>
                <a style={isDark ? {color:"wheat", transition:"2s"} : {transition:"2s"}} href="https://www.linkedin.com/in/berkealtiparmak" target="_blank" >berke altıparmak</a>
            </div>
            <div className="contact-element" onClick={()=> setOpenCV(!openCV)}>
                <HistoryEduIcon style={isDark ? {cursor:"pointer", color:"wheat",transition:"2s",transform:"scale(2)"} : {cursor:"pointer",transform:"scale(2)"}}/>
                <span id="" style={{cursor:"pointer"}} >CV</span>
            </div>

        </div>
        {openCV == true ? <CV /> : null}
        </>
        </animated.div>
    ))
}

export default ContactContent
