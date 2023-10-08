
import Notes from './Notes'
    
const Home = (props) => {
   const {showAlert} = props;
    // eslint-disable-next-line
    return (
        <div>
           <Notes showAlert = {showAlert}/>
        </div>
    )
}

export default Home
