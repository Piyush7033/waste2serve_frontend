// export default function AdminDashboard() {
//   const stats = [
//     {
//       title: 'Total Users',
//       value: '1,250',
//     },
//     {
//       title: 'Total Orders',
//       value: '540',
//     },
//     {
//       title: 'Revenue',
//       value: '₹85,000',
//     },
//     {
//       title: 'Pending Requests',
//       value: '18',
//     },
//   ];

//   const users = [
//     {
//       id: 1,
//       name: 'Piyush Kumar',
//       email: 'piyush@gmail.com',
//       role: 'Admin',
//       status: 'Active',
//     },
//     {
//       id: 2,
//       name: 'Rahul Sharma',
//       email: 'rahul@gmail.com',
//       role: 'Donor',
//       status: 'Active',
//     },
//     {
//       id: 3,
//       name: 'Aman Verma',
//       email: 'aman@gmail.com',
//       role: 'Receiver',
//       status: 'Blocked',
//     },
//   ];

//   const donors = [
//     {
//       id: 1,
//       name: 'Rahul Sharma',
//       food: 'Rice & Vegetables',
//       quantity: '10 Plates',
//       city: 'Delhi',
//     },
//     {
//       id: 2,
//       name: 'Neha Singh',
//       food: 'Bread & Milk',
//       quantity: '15 Packets',
//       city: 'Mumbai',
//     },
//   ];

//   const receivers = [
//     {
//       id: 1,
//       name: 'Helping Hands NGO',
//       requiredFood: 'Cooked Food',
//       people: '50 People',
//       city: 'Punjab',
//     },
//     {
//       id: 2,
//       name: 'Food Care Trust',
//       requiredFood: 'Dry Food',
//       people: '30 People',
//       city: 'Delhi',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-blue-900 text-white p-5">
//         <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>

//         <ul className="space-y-4">
//           <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">
//             Dashboard
//           </li>

//           <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">
//             Users
//           </li>

//           <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">
//             Orders
//           </li>

//           <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">
//             Settings
//           </li>

//           <li className="hover:bg-red-600 p-2 rounded cursor-pointer">
//             Logout
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">
//             Admin Dashboard
//           </h2>

//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//             Add User
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//           {stats.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white p-5 rounded-2xl shadow-md"
//             >
//               <h3 className="text-gray-500 text-lg">{item.title}</h3>
//               <p className="text-3xl font-bold mt-2">{item.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Users Table */}
//         <div className="bg-white rounded-2xl shadow-md p-5 overflow-x-auto">
//           <h3 className="text-2xl font-semibold mb-4">Users List</h3>

//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200 text-left">
//                 <th className="p-3">ID</th>
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Email</th>
//                 <th className="p-3">Role</th>
//                 <th className="p-3">Status</th>
//                 <th className="p-3">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {users.map((user) => (
//                 <tr key={user.id} className="border-b">
//                   <td className="p-3">{user.id}</td>
//                   <td className="p-3">{user.name}</td>
//                   <td className="p-3">{user.email}</td>
//                   <td className="p-3">{user.role}</td>

//                   <td className="p-3">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm ${
//                         user.status === 'Active'
//                           ? 'bg-green-200 text-green-700'
//                           : 'bg-red-200 text-red-700'
//                       }`}
//                     >
//                       {user.status}
//                     </span>
//                   </td>

//                   <td className="p-3 space-x-2">
//                     <button className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500">
//                       Edit
//                     </button>

//                     <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Donors Table */}
//         <div className="bg-white rounded-2xl shadow-md p-5 overflow-x-auto mt-8">
//           <h3 className="text-2xl font-semibold mb-4">Donors List</h3>

//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200 text-left">
//                 <th className="p-3">ID</th>
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Food</th>
//                 <th className="p-3">Quantity</th>
//                 <th className="p-3">City</th>
//               </tr>
//             </thead>

//             <tbody>
//               {donors.map((donor) => (
//                 <tr key={donor.id} className="border-b">
//                   <td className="p-3">{donor.id}</td>
//                   <td className="p-3">{donor.name}</td>
//                   <td className="p-3">{donor.food}</td>
//                   <td className="p-3">{donor.quantity}</td>
//                   <td className="p-3">{donor.city}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Receivers Table */}
//         <div className="bg-white rounded-2xl shadow-md p-5 overflow-x-auto mt-8">
//           <h3 className="text-2xl font-semibold mb-4">Receivers List</h3>

//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200 text-left">
//                 <th className="p-3">ID</th>
//                 <th className="p-3">Organization</th>
//                 <th className="p-3">Required Food</th>
//                 <th className="p-3">People</th>
//                 <th className="p-3">City</th>
//               </tr>
//             </thead>

//             <tbody>
//               {receivers.map((receiver) => (
//                 <tr key={receiver.id} className="border-b">
//                   <td className="p-3">{receiver.id}</td>
//                   <td className="p-3">{receiver.name}</td>
//                   <td className="p-3">{receiver.requiredFood}</td>
//                   <td className="p-3">{receiver.people}</td>
//                   <td className="p-3">{receiver.city}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }