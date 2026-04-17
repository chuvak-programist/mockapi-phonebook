import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

const contactsAdapter = createEntityAdapter();

const initialState = contactsAdapter.getInitialState({
  isLoading: false,
  error: null,
  filter: "",
  name: "",
  number: "",
});

export const {
  selectAll: selectContacts,
} = contactsAdapter.getSelectors((state) => state.contacts);

export const selectFilter = (state) => state.contacts.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (items, filter) => {
    const normalized = filter.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((c) =>
      c.name.toLowerCase().includes(normalized)
    );
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    updateForm: (state, action) => {
      const { field, value } = action.payload;
      if (field === "name" || field === "number") {
        state[field] = value;
      }
    },
    clearForm: (state) => {
      state.name = "";
      state.number = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        contactsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        contactsAdapter.addOne(state, action.payload);
        state.name = "";
        state.number = "";
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        contactsAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message;
      });
  },
});

export const { setFilter, updateForm, clearForm } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;