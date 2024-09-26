import './App.css'
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import CustomerList from './components/CustomerList'
import { getAll, put, post, deleteById, getCount } from './restdb'
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm';
import { AuthProvider } from './hooks/AuthContext';
import RequireAuth from './components/RequireAuth';
import Login from './components/Login';

function App() {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(blankCustomer);
  const [searchText, setSearchText] = useState('');
  const [count, setCount] = useState(0);
  const [sortDirection, setSortDirection] = useState('A-Z');
  let mode = (selectedCustomer.id >= 0) ? 'Update' : 'Add';

  let callback = () => { setSelectedCustomer(blankCustomer); }

  useEffect(() => { getCustomers() }, [selectedCustomer, page, searchText, sortDirection]);

  const getCustomers = () => {
    getAll(page, setCustomers, searchText, sortDirection);
    getCount(setCount);
  }

  const handleSelectCustomer = (customer) => {
    if (selectedCustomer.id === customer.id) {
      setSelectedCustomer(blankCustomer);
    } else {
      setSelectedCustomer(customer);
    }
  }

  // used to clear a selected component if required when a user clicks the add button
  const clearSelectedCustomer = () => {
    setSelectedCustomer(blankCustomer);
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortDirectionChange = (newDirection) => {
    setSortDirection(newDirection);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // set page to 1 to collapse search results when typing in search field
    setPage(1)
  };

  const handleCancel = () => {
    setSelectedCustomer(blankCustomer);
  }

  const handleDelete = () => {
    deleteById(selectedCustomer.id, callback);
    setSelectedCustomer(blankCustomer);
  }

  const handleSave = () => {
    if (mode === 'Add') {
      post(selectedCustomer, callback);
    } else {
      put(selectedCustomer, callback);
    }
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <CustomerList search={searchText} handleSortDirectionChange={handleSortDirectionChange} count={count} clearSelectedCustomer={clearSelectedCustomer} handleSearchChange={handleSearchChange} page={page} handlePageChange={handlePageChange} customers={customers} selectedCustomer={selectedCustomer} handleSelectCustomer={handleSelectCustomer} />
          </RequireAuth>
        } />
        <Route path="/form" element={
          <RequireAuth>
            <CustomerAddUpdateForm mode={mode} selectedCustomer={selectedCustomer} handleInputChange={handleInputChange} handleSelectCustomer={handleSelectCustomer} handleDelete={handleDelete} handleSave={handleSave} handleCancel={handleCancel} />          </RequireAuth>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
