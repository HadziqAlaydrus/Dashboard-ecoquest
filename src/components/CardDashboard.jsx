import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

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

  const judul = [
    {
      title: "Nama Client",
      
    },
    { title : "Nomor Telp"},
    {
      title: "Total Berat Sampah",
      
    },
    {
      title: "Tanggal Pengambilan Sampah",
      
    },
    {
      title: "Waktu Pengambilan Sampah",
    
    },
    {
      title: "Status",
    
    },
  ];

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
      setData(data.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    } catch (error) {
      console.error("Error deleting selected items", error);
    }
  };

  return (
    <section className="max-w-screen p-14 bg-gradient-to-tl from-cyan-800 via-teal-500 to-lime-500 pt-20">
      <div>
        <h1 className="font-bold text-7xl flex justify-center items-center p-5">
          DASHBOARD
        </h1>
        <h2 className="font-bold text-7xl flex justify-center items-center mb-5">EcoQuest</h2>
        <div className="bg-gray-300 h-fit rounded-lg p-20">
          <div className="flex  gap-16  justify-center items-center border border-black ">
            {judul.map((item, index) => (
              <div key={index} className="p-1 mb-2">
                <h2>{item.title}</h2>
              </div>
            ))}
          </div>
          {data.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-7 justify-center items-center border p-1 mt-1  border-black"
            >
              <input
                type="checkbox"
                className="w-28 h-4 rounded-lg "
                checked={selectedIds.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <p className="w-1 -ml-24 py-2">{item.nama}</p>
              <p className="-ml-32 py-2">{item.no_telp}</p>
              <p className="-ml-36 py-5">{item.berat_sampah}</p>
              <p className="-ml-20 py-5">{item.tanggal_pengambilan}</p>
              <p className="ml-14 py-5">{item.waktu_pengambilan}</p>
              <button
                onClick={() => toggleStatus(item.id)}
                className={`rounded-full px-2 py-1.5 mb-5 mt-5 w-fit cursor-pointer ${
                  item.status === "Belum Diambil"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white transition duration-300 text-sm`}
                text-white
                transition
                duration-300
              >
                {item.status}
              </button>
            </div>
          ))}
          <div className="flex justify-end mt-5">
            <button
              onClick={handleDeletedSelected}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete Data
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardDashboard;
