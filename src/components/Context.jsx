import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";


export const Context = createContext();

const ContextProvider = ({children})=>{
const state = "hey"
const api_domain ="https://elexdontech.com/apiLMS"
const api_key="MY_SUPER_SECRET_ELEXDON_KEY"

const schoolInfo = useSelector((state)=>state.schoolInfo)

const universitySubscriptionPrice = 4000


  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${api_domain}/get_courses.php?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: schoolInfo.id }),
      });

      const data = await res.json();
      if (data.success) setCourses(data.courses);
    } catch (err) {
      console.error(err);
    }
  };






  const [departments, setDepartments] = useState([]);

const fetchDepartments = async () => {
  const res = await fetch(`${api_domain}/get_departments.php?key=${api_key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ school_id: schoolInfo.id }),
  });
  const data = await res.json();
  if (data.success) setDepartments(data.departments);
};


const [programs, setPrograms] = useState([]);

const fetchPrograms = async () => {
  const res = await fetch(`${api_domain}/get_programs.php?key=${api_key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ school_id: schoolInfo.id }),
  });
  const data = await res.json();
  if (data.success) setPrograms(data.programs);
};


const [announcements, setAnnouncements] = useState([]);

const fetchAnnouncements = async () => {
  const res = await fetch(`${api_domain}/get_announcements.php?key=${api_key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ school_id: schoolInfo.id }),
  });
  const data = await res.json();
  if (data.success) setAnnouncements(data.announcements);
};

useEffect(()=>{
    fetchCourses();
},[])



    return(
        <Context.Provider value={{api_domain,api_key, universitySubscriptionPrice, 
        fetchCourses, courses, setCourses, departments, setDepartments, fetchDepartments, programs, setPrograms, 
        fetchPrograms, fetchAnnouncements, announcements, setAnnouncements}}>
{children}
        </Context.Provider>
    )
}

export default ContextProvider