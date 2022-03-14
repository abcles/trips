import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getTripToEdit } from '../redux/selectors';
import { createTrip, editTrip } from '../redux/thunks';

const InputValue = ({ id, label, value, onChange }) => {
    return (
        <div className="relative mt-7 w-80" >
            <input id={id}
                name={id} 
                type="text"
                onChange={onChange}
                value={value} 
                className="peer h-10 w-full text-gray-900 placeholder-transparent shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm  border-gray-400 rounded-md" 
                placeholder={id}
            />
             <label for={id} 
                className="absolute left-0 -top-5 w-full text-sky-400 text-sm transition-all peer-placeholder-shown:text-blue-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sky-600 peer-focus:text-sm"
            > {label}
            </label>
        </div>
    )
}
const TextareaValue = ({ id, label, rows, value, onChange, showTooltip = false, tooltip}) => {
    return (
        <div className="relative mt-7 w-80 group" >
            <textarea id={id}
                name={id} 
                rows={rows}
                onChange={onChange}
                value={value} 
                className="peer w-full text-gray-900 placeholder-transparent shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm  border-gray-400 rounded-md has-tooltip" 
                placeholder={label}
            />
            {
                showTooltip ? 
                <span className="bg-sky-100 rounded hidden group-hover:block group-active:hidden absolute text-center py-2 px-6 z-50&quot;">{tooltip}</span>
                : null
            }
            <label for={id} 
                className="absolute left-0 -top-5 w-full text-sky-400 text-sm transition-all peer-placeholder-shown:text-blue-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-sky-600 peer-focus:text-sm"
            > {label}
            </label>
        </div>
    )
}

const ManageTrip = ({ onCreatePressed, onEditPressed, tripToEdit, fromCreate = false }) => {
    const clearData = {
        title:      (tripToEdit?.id && !fromCreate ? tripToEdit.title       :''),
        blurb:      (tripToEdit?.id && !fromCreate ? tripToEdit.blurb       :''),
        description:(tripToEdit?.id && !fromCreate ? tripToEdit.description :''),
        bullets:    (tripToEdit?.id && !fromCreate ? tripToEdit.bullets     :''),
        difficulty: (tripToEdit?.id && !fromCreate ? tripToEdit.difficulty  :''),
        length:     (tripToEdit?.id && !fromCreate ? tripToEdit.length      :''),
        price:      (tripToEdit?.id && !fromCreate ? tripToEdit.price       :''),
        region:     (tripToEdit?.id && !fromCreate ? tripToEdit.region      :'')
    }
    let [formData, setFormData] = useState(clearData);

    useEffect(() => {
        setFormData(clearData);
    }, [fromCreate]);
    
    return (
        <div className="flex justify-center items-center">
            <div className="container mx-auto font-thin flex justify-center items-center w-full sm:w-1/4">
                <div>
                    <ToastContainer />
                    <InputValue 
                        id="title"
                        label="Title"
                        value={formData.title}
                        onChange={(event) => { setFormData({ ...formData, title: event.target.value }) }}
                    />
                   <InputValue 
                        id="blurb"
                        label="Blurb"
                        value={formData.blurb}
                        onChange={(event) => { setFormData({ ...formData, blurb: event.target.value }) }}
                    />
                    <TextareaValue 
                        id="description"
                        label="Description"
                        rows="3"
                        value={formData.description}
                        onChange={(event) => { setFormData({ ...formData, description: event.target.value }) }}
                    />
                   <InputValue 
                        id="difficulty"
                        label="Difficulty"
                        value={formData.difficulty}
                        onChange={(event) => { setFormData({ ...formData, difficulty: event.target.value }) }}
                    />
                    <InputValue 
                        id="length"
                        label="Length"
                        value={formData.length}
                        onChange={(event) => { setFormData({ ...formData, length: event.target.value }) }}
                    />
                    <InputValue 
                        id="price"
                        label="Price"
                        value={formData.price}
                        onChange={(event) => { setFormData({ ...formData, price: (parseInt(event.target.value) ? parseInt(event.target.value) : '') }) }}
                    />
                    <InputValue 
                        id="region"
                        label="Region"
                        value={formData.region}
                        onChange={(event) => { setFormData({ ...formData, region: event.target.value }) }}
                    />
                    <TextareaValue 
                        id="bullets"
                        label="Bullets"
                        rows="3"
                        value={formData.bullets}
                        showTooltip={true}
                        tooltip="Introduce one item per line"
                        onChange={(event) => { setFormData({ ...formData, bullets: event.target.value }) }}
                    />
                    <button type="sumbit" value="Sign in" 
                        onClick={() => { tripToEdit?.id && !fromCreate ? onEditPressed(tripToEdit.id, formData) : onCreatePressed(formData); }} 
                        className="mt-7 px-4 py-2 w-full border border-transparent shadow-sm sm:max-w-xs sm:text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                        Submit
                    </button>
                    
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    tripToEdit : getTripToEdit(state),
});
const mapDispatchToProps = dispatch => ({
    onCreatePressed: (formData) => dispatch(createTrip(formData)),
    onEditPressed: (tripId, formData) => dispatch(editTrip(tripId,formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTrip);