import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

export const selectContacts = (state) => state.contacts.items;
export const selectFilter = (state) => state.contacts.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (items, filter) => {
    const normalized = filter.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((contact) =>
      contact.name.toLowerCase().includes(normalized)
    );
  }
);

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload ?? action.error?.message;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: "",
    name: "",
    number: "",
  },
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
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
        state.name = "";
        state.number = "";
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const deletedId = action.payload?.id ?? action.meta.arg;
        state.items = state.items.filter((item) => item.id !== deletedId);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const { setFilter, updateForm, clearForm } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
