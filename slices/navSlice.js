import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    routeDetails: null
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
        setRouteDetails: (state, action) => {
            state.routeDetails = action.payload;
        },
    }
})

export const { setOrigin, setDestination, setTravelTimeInformation, setRouteDetails } = navSlice.actions;

// Selectors

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectRouteDetails = (state) => state.nav.routeDetails;

export default navSlice.reducer;