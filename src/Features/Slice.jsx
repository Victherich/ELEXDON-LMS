
// import { createSlice } from "@reduxjs/toolkit";

// const MySlice = createSlice({
//   name: "user",
//   initialState: {
//     adminInfo: null,
//     adminToken: null,

//      lecturerInfo: null,
//     lecturerToken: null,

//     studentInfo:null,
//     studentToken:null,
//   },
//   reducers: {
//     adminLogin: (state, { payload }) => {
//       state.adminInfo = payload.adminInfo;
//       state.adminToken = payload.adminToken;
//     },
//     adminLogout: (state) => {
//       state.adminInfo = null;
//       state.adminToken = null;
//     },
//     updateAdminInfo: (state, { payload }) => {
//       if (state.adminInfo) {
//         state.adminInfo = { ...state.adminInfo, ...payload };
//       }
//     },
// lecturerLogin: (state, { payload }) => {
//   state.lecturerInfo = payload.lecturerInfo;
//   state.lecturerToken = payload.lecturerToken;
// },
// lecturerLogout: (state) => {
//   state.lecturerInfo = null;
//   state.lecturerToken = null;
// },
// updateLecturerInfo: (state, { payload }) => {
//   if (state.lecturerInfo) {
//     state.lecturerInfo = { ...state.lecturerInfo, ...payload };
//   }
// },




//     studentLogin: (state, { payload }) => {
//       state.studentInfo = payload.studentInfo;
//       state.studentToken = payload.studentToken;
//     },
//     studentLogout: (state) => {
//       state.studentInfo = null;
//       state.studentToken = null;
//     },

//   },
// });

// export const { adminLogin, adminLogout, updateAdminInfo , studentLogin, studentLogout, lecturerLogin, lecturerLogout, updateLecturerInfo} = MySlice.actions;
// export default MySlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const MySlice = createSlice({
  name: "user",
  initialState: {
    adminInfo: null,
    adminToken: null,

    lecturerInfo: null,
    lecturerToken: null,

    studentInfo: null,
    studentToken: null,

    // ✅ NEW SCHOOL STATE
    schoolInfo: null,
    schoolToken: null,
  },

  reducers: {
    adminLogin: (state, { payload }) => {
      state.adminInfo = payload.adminInfo;
      state.adminToken = payload.adminToken;
    },
    adminLogout: (state) => {
      state.adminInfo = null;
      state.adminToken = null;
    },

    lecturerLogin: (state, { payload }) => {
      state.lecturerInfo = payload.lecturerInfo;
      state.lecturerToken = payload.lecturerToken;
    },
    lecturerLogout: (state) => {
      state.lecturerInfo = null;
      state.lecturerToken = null;
    },

    studentLogin: (state, { payload }) => {
      state.studentInfo = payload.studentInfo;
      state.studentToken = payload.studentToken;
    },
    studentLogout: (state) => {
      state.studentInfo = null;
      state.studentToken = null;
    },

    // ✅ NEW SCHOOL ACTIONS
    schoolLogin: (state, { payload }) => {
      state.schoolInfo = payload.schoolInfo;
      state.schoolToken = payload.schoolToken;
    },

    schoolLogout: (state) => {
      state.schoolInfo = null;
      state.schoolToken = null;
    },
  },
});

export const {
  adminLogin,
  adminLogout,
  lecturerLogin,
  lecturerLogout,
  studentLogin,
  studentLogout,

  // NEW
  schoolLogin,
  schoolLogout,
} = MySlice.actions;

export default MySlice.reducer;