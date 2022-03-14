import { BiTrash, BiEdit } from "react-icons/bi";
import { connect } from 'react-redux';
import { deleteTrip, goToEditTrip } from '../redux/thunks';
import { useNavigate } from 'react-router-dom';

const TripInfo = ({ trip, onDeleteClink, onEditClink }) => {
  let navigate = useNavigate();
  function handleClick() {
    navigate('/edit')
  }

  return (
    <li className="px-3 py-3 flex items-start">
      <span>
        <button onClick={() => onDeleteClink(trip.id)} type="button"
          className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <BiTrash /></button>
        <button onClick={() => { 
          onEditClink(trip); 
          handleClick() 
          }} type="button"
          className="p-1.5 mr-1.5 mt-1 rounded text-white bg-sky-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <BiEdit /></button>
      </span>
      <div className="flex-grow">
        <div className="flex items-center">
          <span className="flex-none font-medium text-2xl text-blue-500">{trip.title}</span>
          <span className="flex-grow text-right">{trip.price}</span>
        </div>
        <span className="font-bold text-blue-500">{trip.blurb}</span>
        <div className="text-blue-700 overflow-ellipsis">
            {trip.description}
        </div>
        <div className="leading-tight">
            <div className="flex items-center">
                <span className="flex-none">
                    <ul className="list-disc">
                        {trip.bullets.split('~').map((el,i) => <li key={i}>{el}</li> )}
                    </ul>
                </span>
                <span className="flex-grow text-right">
                    <ul className="list-none">
                        <li>{trip.difficulty}</li>
                        <li>{trip.length}</li>
                        <li>{trip.region}</li>
                    </ul>
                </span>
            </div>
        </div>
      </div>
    </li>
  )
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  onDeleteClink: (tripId) => dispatch(deleteTrip(tripId)),
  onEditClink: (tripId) => dispatch(goToEditTrip(tripId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TripInfo);