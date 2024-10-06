import './Student.css'
import React, { useEffect, useState } from 'react'
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";

export default function Student() {

    const [student, setStudent] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/")
        .then(res => setStudent(res.data))
        .catch(err => console.log(err));
    }, []);

    const handleDelete = async(id) => {
        try {
            await axios.delete("http://localhost:8000/student/"+id)
            window.location.reload();
        } catch(err) {
            console.log(err);
        }
    }

  return (
    <div className="body bg-blue-500">
        <div className="container w-8/12">
            <Link to="/create" 
                className="btn bg-blue-500"
            >
                Add +
            </Link>
            <table className="table border border-gray-300 mt-5">
                <thead className="bg-blue-400 text-white">
                    <tr>
                        <th className="border border-gray-300 px-4 py-4">User ID</th>
                        <th className="border border-gray-300 px-4 py-4">Name</th>
                        <th className="border border-gray-300 px-4 py-4">Created Date</th>
                        <th className="border border-gray-300 px-4 py-4">Description</th>
                        <th className="w-28">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((data, idx) => {
                            return (
                                <tr key={idx}>
                                    <td className="border border-gray-300 px-4 py-3">{data.id}</td>
                                    <td className="border border-gray-300 px-4 py-3">{data.name}</td>
                                    <td className="border border-gray-300 px-4 py-3">{data.created_at}</td>
                                    <td className="border border-gray-300 px-4 py-3">{data.description}</td>
                                    <td className="action border border-gray-300 text-center p-3">
                                        <Link to={`/update/${data.id}`}>
                                            <RxUpdate className="inline-block text-3xl text-blue-500 cursor-pointer mr-4"/>
                                        </Link>
                                        <RiDeleteBin6Line onClick={e => handleDelete(data.id)} className="inline-block text-3xl text-red-600 cursor-pointer" />
                                        
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
