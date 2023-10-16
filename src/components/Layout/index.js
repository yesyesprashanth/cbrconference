import Slide from '../Slide';
import styles from './Layout.module.css';

const imagepath1 = '/images/slide1.jpg'
const imagePathlist = ['/images/slide1.jpg', '/images/slide2.jpg', '/images/slide3.jpg', 
                        '/images/slide4.jpg', '/images/slide5.jpg', '/images/slide6.jpg', 
                        '/images/slide7.jpg', '/images/slide8.jpg', '/images/slide9.jpg']



export default function Layout(){
    return(
        <div className={styles.container}>
            {
                imagePathlist.map(imagepath=>{
                    return <Slide imagePath={imagepath}/>
                })                
            }
            
        </div>
    )
}