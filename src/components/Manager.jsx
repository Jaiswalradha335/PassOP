import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const eyeIconRef = useRef();
    const passwordInputRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        toast("Copied to clipboard!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    };

    const showPassword = () => {
        const currentType = passwordInputRef.current.type;
        passwordInputRef.current.type = currentType === "password" ? "text" : "password";
        eyeIconRef.current.src = currentType === "password" ? "icons/eye.png" : "icons/eyecross.png";
    };

    const savePassword = () => {

        if (form.site && form.username && form.password) {
            const newPassword = { ...form, id: uuidv4() };
            const updatedPasswords = [...passwordArray, newPassword];
            setPasswordArray(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            setForm({ site: "", username: "", password: "" });
            toast("Password saved!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        } else {
            toast("Error: Please fill all fields to save a password");
        }
    };

    const deletePassword = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this password?");
        if (confirmed) {
            const updatedPasswords = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            toast("Password deleted!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    };

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id);
        if (passwordToEdit) {
            setForm(passwordToEdit);
            const updatedPasswords = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

<div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className=" p-3 md:mycontainer min-h-[80vh]">
                <h1 className="border-white text-4xl py-2 text-center">
                    <span className="py-2 border border-white text-green-700">&lt;</span>
                    <span>pass</span>
                    <span className="py-2 border border-white text-green-500">OP/&gt;</span>
                </h1>
                <p className="py-2 border border-white text-green-900 text-lg text-center">
                    Your own Password Manager
                </p>

                <div className="flex flex-col p-4 py-2 border border-white text-black gap-8 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter website URL"
                        className="rounded-full border border-green-500 w-full p-4 py-1"
                        type="text"
                        name="site"
                        id="site"
                    />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            className="rounded-full border border-green-500 w-full p-4 py-1"
                            type="text"
                            name="username"
                            id="username"
                        />
                        <div className="relative">
                            <input
                                ref={passwordInputRef}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="rounded-full border border-green-500 w-full p-4 py-1"
                                type="password"
                                name="password"
                                id="Password"
                            />
                            <span className="absolute right-[3px] top-[3px] cursor-pointer" onClick={showPassword}>
                                <img
                                    ref={eyeIconRef}
                                    className="p-1"
                                    width={27}
                                    src="icons/eye.png"
                                    alt="eye"
                                />
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={savePassword}
                        className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
                    >
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover" />
                        Save
                    </button>
                </div>

                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4">Your passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length > 0 && (
                        <table className="table-auto w-full rounded-md overflow-hidden md:10">
                            <thead className="bg-green-800 py-2 border border-white text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center">
                                                <a href={item.site} target="_blank" rel="noopener noreferrer">
                                                    <span>{item.site}</span>
                                                </a>
                                                <div
                                                    className="lordiconcopy size-7 cursor-pointer"
                                                    onClick={() => copyText(item.site)}
                                                >
                                                    <lord-icon
                                                        style={{
                                                            width: "25px",
                                                            height: "25px",
                                                            paddingTop: "3px",
                                                            paddingLeft: "3px",
                                                        }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center">
                                                <span>{item.username}</span>
                                                <div
                                                    className="lordiconcopy size-7 cursor-pointer"
                                                    onClick={() => copyText(item.username)}
                                                >
                                                    <lord-icon
                                                        style={{
                                                            width: "25px",
                                                            height: "25px",
                                                            paddingTop: "3px",
                                                            paddingLeft: "3px",
                                                        }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center">
                                                <span>{item.password}</span>
                                                <div
                                                    className="lordiconcopy size-7 cursor-pointer"
                                                    onClick={() => copyText(item.password)}
                                                >
                                                    <lord-icon
                                                        style={{
                                                            width: "25px",
                                                            height: "25px",
                                                            paddingTop: "3px",
                                                            paddingLeft: "3px",
                                                        }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="justify-center py-2 border border-white text-center">
                                            <span
                                                className="cursor-pointer mx-1"
                                                onClick={() => editPassword(item.id)}
                                            >
                                                <lord-icon

                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ width: "25px", height: "25px" }}
                                                ></lord-icon>
                                            </span>
                                            <span
                                                className="cursor-pointer mx-1"
                                                onClick={() => deletePassword(item.id)}
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ width: "25px", height: "25px" }}
                                                ></lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
