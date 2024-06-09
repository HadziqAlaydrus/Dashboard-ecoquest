import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const CardDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pickup");
        const updatedData = response.data.map(item => ({
            ...item,
            status: "Belum Diambil"
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
      width:"1/5",
    },
    {
      title: "Total Berat Sampah",
      width:"1/5",
    },
    {
      title: "Tanggal Pengambilan Sampah",
      width:"1/5",
    },
    {
      title: "Waktu Pengambilan Sampah",
      width:"1/5",
    },
    {
        title:"Status",
        width:"1/5",
    },
  ];

  const toggleStatus = (id) => {
    const updateData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status:
            item.status === "Belum Diambil"
              ? "Sudah Diambil "
              : "Belum Diambil",
        };
      }
      return item;
    });
    setData(updateData);
  };
  return (
    <section className="max-w-screen p-14 bg-gradient-to-tl from-cyan-800 via-teal-500 to-lime-500 pt-20">
      <div>
        <h1 className="font-bold text-7xl flex justify-center items-center p-10">
          DASHBOARD
        </h1>
        <div className="bg-gray-300 h-fit rounded-lg p-20">
          <div className="grid grid-cols-5 gap-16 border border-black ">
            {judul.map((item, index) => (
              <div key={index} className="mb-2">
                <h2>{item.title}</h2>
              </div>
            ))}
          </div>
          {data.map((item) => (
            <div key={item.id} className="grid grid-cols-5 gap-10 border p-1 mt-1 border-black">
              <p className="">{item.nama}</p>
              <p className="ml-14">{item.berat_sampah}</p>
              <p className="ml-16">{item.tanggal_pengambilan}</p>
              <p className="ml-20">{item.waktu_pengambilan}</p>
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
        </div>
      </div>
    </section>
  );
};

export default CardDashboard;
