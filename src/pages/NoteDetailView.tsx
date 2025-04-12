import {useLocation} from 'react-router-dom';
import '../../styles/detailspage.css';

const DetailsPage = () => {
    const location = useLocation()
    const {title, description, checked} = location.state;
  return (
    <div className='container'>
        <div className='title'>
            Title: {title}
        </div>
        <div className='description'>
            {description}
        </div>
        <div className={checked?'completed':'pending'}>Status : {checked?'Completed':'Incomplete'}</div>
    </div>
  )
}

export default DetailsPage;