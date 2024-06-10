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
        const response = await axios.get("https://backend-ecoquest.vercel.app/pickup");
        const updatedData = response.data.map((item) => ({
          ...item,
          status: "Belum Diambil",
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
      width: "1/5",
    },
    {
      title: "Total Berat Sampah",
      width: "1/5",
    },
    {
      title: "Tanggal Pengambilan Sampah",
      width: "1/5",
    },
    {
      title: "Waktu Pengambilan Sampah",
      width: "1/5",
    },
    {
      title: "Status",
      width: "1/5",
    },
  ];

  const toggleStatus = (id) => {
    const updateData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status:
            item.status === "Belum Diambil" ? "Sudah Diambil" : "Belum Diambil",
        };
      }
      return item;
    });
    setData(updateData);
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((item.id) = itemid !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleDeletedSelected = async () => {
    try {
      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`https://backend-ecoquest.vercel.app/pickup/${id}`)
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
        <h1 className="font-bold text-7xl flex justify-center items-center p-10">
          DASHBOARD EcoQuest
        </h1>
        <div className="bg-gray-300 h-fit rounded-lg p-20">
          <div className="grid grid-cols-5 gap-16 border border-black ">
            {judul.map((item, index) => (
              <div key={index} className="p-1 mb-2">
                <h2>{item.title}</h2>
              </div>
            ))}
          </div>
          {data.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-6 gap-10 border p-1 mt-1 border-black"
            >
              <input
                type="checkbox"
                className=""
                checked={selectedIds.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <p className="py-5">{item.nama}</p>
              <p className="ml-14 py-5">{item.berat_sampah}</p>
              <p className="ml-16 py-5">{item.tanggal_pengambilan}</p>
              <p className="ml-20 py-5">{item.waktu_pengambilan}</p>
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
