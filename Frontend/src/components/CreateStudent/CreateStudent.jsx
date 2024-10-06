import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateStudent() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:8000/create", { name, description })
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => {
                console.error(err);
                // Optionally handle the error (show a message to the user, etc.)
            });
    }

    return (
        <div className="flex h-screen bg-blue-500 justify-center items-center">
            <div className="w-6/12 bg-white rounded-md p-7">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-medium mb-4">Add Student</h2>
                    <div className="mb-2">
                        <label htmlFor="name" className="block mb-2">Name</label>
                        <input 
                            onChange={e => setName(e.target.value)}
                            type="text" 
                            placeholder="Enter Name" 
                            className="form-control mb-3 w-full px-2 py-3 outline-none border border-gray-300" 
                            required 
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description" className="block mb-2">Description</label>
                        <input
                            onChange={e => setDescription(e.target.value)} 
                            type="text" 
                            placeholder="Write Description..." 
                            className="form-control mb-3 w-full px-2 py-3 outline-none border border-gray-300" 
                            required 
                        />
                    </div>
                    <button className="py-2 px-4 text-white bg-blue-500 rounded-md">Create User</button>
                </form>
            </div>
        </div>
    )
}
