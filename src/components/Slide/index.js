import styles from './Slide.module.css';
export default function Slide({imagePath}){
    return(
        <div className={styles.conainer}>
            <img src={imagePath} alt="JSS ISH" />
        </div>
    )
}
