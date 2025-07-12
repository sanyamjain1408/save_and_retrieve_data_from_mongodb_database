import { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
  });

  const [searchName, setSearchName] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', formData);
      alert("✅ Data saved successfully!");
      setFormData({ name: '', email: '', mobile: '', address: '' });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save data.");
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${searchName}`);
      setSearchResult(res.data);
    } catch (err) {
      setSearchResult('not-found');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      {/* Form Box */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">User Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter Mobile Number"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Address"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Search Section */}
      <div className="mt-8 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-2">Search by Name</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter Name"
            className="flex-grow p-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
          >
            Search
          </button>
        </div>

        {/* Search Result */}
        <div className="mt-4">
          {searchResult === null ? null : searchResult === 'not-found' ? (
            <p className="text-red-500 font-medium">Not Present</p>
          ) : (
            <div className="bg-white border mt-2 p-4 rounded shadow">
              <p><strong>Name:</strong> {searchResult.name}</p>
              <p><strong>Email:</strong> {searchResult.email}</p>
              <p><strong>Mobile:</strong> {searchResult.mobile}</p>
              <p><strong>Address:</strong> {searchResult.address}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
