import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderDashboard from "./HeaderDashboard";

const CardDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://3.107.21.244:3000/pickup");
        const updatedData = response.data.map((item) => ({
          ...item,
          status: item.status || "Belum Diambil",
        }));
        setData(updatedData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const toggleStatus = async (id) => {
    const item = data.find((item) => item.id === id);
    if (!item) return;

    const newStatus = item.status === "Belum Diambil" ? "Sudah Diambil" : "Belum Diambil";

    try {
      console.log(`Updating status for ID: ${id} to ${newStatus}`);
      const response = await axios.patch(
        `http://3.107.21.244:3000/pickup/${id}/status`,
        { status: newStatus },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Response:', response);

      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      } else {
        console.error("Failed to update status", response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error updating status", error.response.data);
      } else {
        console.error("Error updating status", error.message);
      }
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((itemid) => itemid !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleDeletedSelected = async () => {
    try {
      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`http://3.107.21.244:3000/pickup/${id}`)
        )
      );
      setData((prevData) =>
        prevData.filter((item) => !selectedIds.includes(item.id))
      );
      setSelectedIds([]);
    } catch (error) {
      console.error("Error deleting selected items", error);
    }
  };

  return (
    <section className="max-w-screen bg-slate-100">
      <div>
        <HeaderDashboard/>
        <div className="p-14">
          <div className="flex justify-end mb-5">
            <button
              onClick={handleDeletedSelected}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete Data
            </button>
          </div>
          <SampleTable
            data={data}
            selectedIds={selectedIds}
            toggleStatus={toggleStatus}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
    </section>
  );
};

const SampleTable = ({ data, selectedIds, toggleStatus, handleCheckboxChange }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-collapse shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-left border-b-2 border-gray-300">
            <th className="px-6 py-3 whitespace-nowrap font-bold text-sm uppercase tracking-wider">
              Nama Client
            </th>
            <th className="px-6 py-3 whitespace-nowrap font-bold text-sm uppercase tracking-wider">
              Nomor Telp
            </th>
            <th className="px-6 py-3 whitespace-nowrap font-bold text-sm uppercase tracking-wider">
              Alamat
            </th>
            <th className="px-6 py-3 whitespace-nowrap font-bold text-sm uppercase tracking-wider">
              Total Berat Sampah
            </th>
            <th className="px-6 py-3 whitespace-nowrap font-bold text-sm uppercase tracking-wider">
              Tanggal Pengambilan
            </th>
            <th className="px-6 py-3 whitespace-nowrap font-bold text-sm uppercase tracking-wider">
              Waktu Pengambilan
            </th>
            <th className="px-6 py-3 whitespace-nowrap font-bold text-sm uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 whitespace-nowrap font-bold text-sm uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-300">
              <td className="px-6 py-4 whitespace-nowrap">{item.nama}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.no_telp}</td>
              <td className="px-6 py-4 w-56 line-clamp-none text-justify overflow-auto">{item.alamat}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.berat_sampah}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.tanggal_pengambilan}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.waktu_pengambilan}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${
                  item.status === "Belum Diambil" ? "bg-red-500 text-white" : "bg-green-500 text-white"
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => toggleStatus(item.id)}
                  className={`rounded px-2 py-1 ${
                    item.status === "Belum Diambil"
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {item.status === "Belum Diambil" ? "Mark as Taken" : "Mark as Not Taken"}
                </button>
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardDashboard;
