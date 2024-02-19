import React, { useEffect, useState } from 'react'
import './FeedbackForm.css'
import Header from './Header';
import axios from 'axios';
import Admin from './Admin';
const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [trainerName, setTrainerName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [suggestions, setSuggestions] = useState('');
    const [editReview, setEditReview] = useState([]);
    const [onReload, setOnReload] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            // Send form data to backend
            const response = await axios.post(`http://localhost:8080/submitForm/${localStorage.getItem('email')}`, {
                studentName: name,
                phNo: phone,
                trainerName: trainerName,
                batch: courseName,
                review: suggestions
            });
            window.alert('Feedback submitted');
            setOnReload(!onReload);

            // Optionally, you can reset the form after submission
            setName('');
            setPhone('');
            setTrainerName('');
            setCourseName('');
            setSuggestions('');
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };
    useEffect(() => {
        const userReview = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/getFormsByEmail/${localStorage.getItem('email')}`)
                setEditReview(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        userReview()
    }, [onReload])

    const handleEditReview = (index, newValue) => {
        setEditReview(prevReviews => {
            const updatedReviews = [...prevReviews];
            updatedReviews[index].review = newValue;
            return updatedReviews;
        });
    };

    const handleSaveEdit = async (index) => {
        try {
            const response = await axios.put(`http://localhost:8080/editForm/${editReview[index].id}`, {
                studentName: editReview[index].studentName,
                phNo: editReview[index].phNo,
                trainerName: editReview[index].trainerName,
                batch: editReview[index].batch,
                review: editReview[index].review
            });

            window.alert(response.data);


        } catch (error) {
            console.error('Error updating review:', error);
        }

    };
    return (
        <div className="back-color">
            <Header />
            {localStorage.getItem('role') === 'admin' ? (<Admin />) : (
                <>
                    <div className='bbl'>
                        <div className="form-box">
                            <div className="textup my-3 ">
                                <i class="fa fa-solid fa-clock"></i>
                                It only takes two minutes!!
                            </div>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="uname" className='m-0 mt-2'>
                                    <i className="fa fa-solid fa-user"></i>
                                    Name
                                </label>
                                <input type="text" id="uname" className='border border-2'
                                    name="uname" required value={name} onChange={(e) => setName(e.target.value)} />

                                <label htmlFor="phone" className='m-0 mt-2'>
                                    <i className="fa-solid fa-phone"></i>
                                    Phone No
                                </label>
                                <input type="tel" id="phone" className='border border-2'
                                    name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} />

                                <label htmlFor="trainer" className='m-0 mt-2'>
                                    <i className="fa fa-solid fa-user"></i>
                                    Trainer Name
                                </label>
                                <select id="trainer" className='border border-2'
                                    name="trainer" required value={trainerName} onChange={(e) => setTrainerName(e.target.value)}>
                                    <option value='' className="greyed">--Select--</option>
                                    <option value='Sai Kumar'>Sai Kumar</option>
                                    <option value='Manideep'>Manideep</option>
                                    <option value='Sajeed'>Sajeed</option>
                                    <option value='Ravi'>Ravi</option>
                                </select>

                                <label htmlFor="course" className='m-0 mt-2'>
                                    <i className="fa fa-solid fa-laptop"></i>
                                    Course Name
                                </label>
                                <select id="course" className='border border-2'
                                    name="course" required value={courseName} onChange={(e) => setCourseName(e.target.value)}>
                                    <option value=''>--Select--</option>
                                    <option value='Java FullStack'>Java FullStack</option>
                                    <option value='Python FullStack'>Python FullStack</option>
                                    <option value='Devops'>Devops</option>
                                    <option value='Salesforce'>Salesforce</option>
                                </select>

                                <label htmlFor="msg" className='m-0 mt-2'>
                                    <i className="fa fa-solid fa-comments" style={{ marginRight: "3px" }}></i>
                                    Write your Suggestions:
                                </label>
                                <textarea id="msg" name="msg" className='border border-2'
                                    rows="4" cols="10" required value={suggestions} onChange={(e) => setSuggestions(e.target.value)}>
                                </textarea>
                                <button className="btn btn-success w-100" type="submit">
                                    Submit
                                </button>
                            </form>
                        </div>

                    </div>
                    <div className='reviews'>
                        {editReview.map((singleReview, index) => (
                            <div key={index} className='d-flex bg-white py-2 mb-4 border rounded-3 align-items-center justify-content-between'>
                                <p className='m-0 fs-4 ps-4'>{index + 1}</p>
                                <div className='flex-grow-1 d-flex px-4 py-2 align-items-center'>
                                    <input type="text" className='border border-2' value={singleReview.review} onChange={(e) => handleEditReview(index, e.target.value)} />
                                </div>
                                <div className='d-flex align-items-center pe-4'>
                                    <button className='btn btn-success' onClick={() => handleSaveEdit(index)}>Save Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default FeedbackForm
