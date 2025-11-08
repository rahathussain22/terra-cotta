import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)
    console.log("User data: ",userData)
    if (userData) {
      setUser(userData); 
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          <p>You are not logged in. Please login to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <h1 className="text-2xl font-semibold">SETUP - Dashboard</h1>
        <div className="flex space-x-4">
          <select className="px-4 py-2 border rounded-md">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <select className="px-4 py-2 border rounded-md">
            <option value="July">July</option>
            <option value="August">August</option>
          </select>
          <select className="px-4 py-2 border rounded-md">
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>

      {/* Display logged-in user's information */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Welcome back, {user.username}!</h3>
        <p className="text-sm">Email: {user.email}</p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Payment Methods / Accounts</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label>Cash</label>
              <input type="text" className="border px-2 py-1 rounded-md" placeholder="Account 4" />
            </div>
            <div className="flex justify-between">
              <label>Credit Card</label>
              <input type="text" className="border px-2 py-1 rounded-md" placeholder="Account 5" />
            </div>
            <div className="flex justify-between">
              <label>Zelle</label>
              <input type="text" className="border px-2 py-1 rounded-md" placeholder="Account 6" />
            </div>
          </div>
        </div>

        {/* Categories Setup */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Categories Setup</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Products & Services</h4>
              <input type="text" className="border px-2 py-1 rounded-md mb-2 w-full" placeholder="Investment" />
              <input type="text" className="border px-2 py-1 rounded-md mb-2 w-full" placeholder="Fines" />
            </div>
            <div>
              <h4 className="font-semibold">Expense</h4>
              <input type="text" className="border px-2 py-1 rounded-md mb-2 w-full" placeholder="Virtual Address" />
              <input type="text" className="border px-2 py-1 rounded-md mb-2 w-full" placeholder="Google GSuite" />
            </div>
          </div>
        </div>

        {/* Monthly Goals */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Monthly Profit Goals</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label>July 2023</label>
              <input type="text" className="border px-2 py-1 rounded-md" value="0.00" />
            </div>
            <div className="flex justify-between">
              <label>August 2023</label>
              <input type="text" className="border px-2 py-1 rounded-md" value="0.00" />
            </div>
            <div className="flex justify-between">
              <label>September 2023</label>
              <input type="text" className="border px-2 py-1 rounded-md" value="2400.00" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <h4 className="font-semibold">Annual Profit Goal</h4>
              <span className="font-semibold">$49,200.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
