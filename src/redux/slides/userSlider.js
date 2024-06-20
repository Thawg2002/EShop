import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  access_token: "",
  address: "",
  avatar: "",
  phone: "",
  isAdmin: false,
  id: "",
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      // console.log("state", state);
      // console.log("action", action);
      const {
        name,
        email,
        access_token,
        address,
        avatar,
        phone,
        isAdmin,
        _id,
      } = action.payload;
      state.name = name || email;
      state.email = email;
      state.access_token = access_token;
      state.address = address;
      state.avatar = avatar;
      state.phone = phone;
      state.isAdmin = isAdmin;
      state.id = _id;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlide.actions;

export default userSlide.reducer;
