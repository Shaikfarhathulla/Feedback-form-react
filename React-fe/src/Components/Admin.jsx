import React, { useEffect, useState } from 'react'
import './Admin.css'
import axios from 'axios';
const Admin = () => {
  const [allReviews, setAllReviews] = useState([]);
  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const fetchAllReviews = await axios.get('http://localhost:8080/allReviews');
        setAllReviews(fetchAllReviews.data)
      } catch (error) {
        console.log(error())
      }
    }
    fetchAllReviews();
  }, [])
  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deleteReview/${id}`);
      setAllReviews(allReviews.filter(singleReview => singleReview.id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  return (
    <div className='table-div py-5'>
      <div className='w-75 bg-transparent m-auto'>
        <table className='table table-transparent border'>
          <thead>
            <th>S.No</th>
            <th>Student Name</th>
            <th>Mobile No</th>
            <th>Trainer Name</th>
            <th>Course Enrolled</th>
            <th>Overall review</th>
            <th>Delete</th>

          </thead>
          <tbody className='bg-transparent'>
            {allReviews.map((singleReview, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{singleReview.studentName}</td>
                <td>{singleReview.phNo}</td>
                <td>{singleReview.trainerName}</td>
                <td>{singleReview.batch}</td>
                <td>{singleReview.review}</td>
                <td onClick={() => deleteReview(singleReview.id)}><i className='fa fa-trash' style={{ cursor: 'pointer' }}></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin
