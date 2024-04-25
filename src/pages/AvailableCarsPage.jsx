import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import ListOfCars from "../components/Car/ListOfCars";
import Pagination from "../components/Pagination";
import { useTokenContext } from "../context/TokenContext";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import dayjs from "dayjs";
import FilterCars from "../components/FilterCars";

export default function AvailableCarsPage() {
  const navigate = useNavigate();
  const { token } = useTokenContext();

  useEffect(() => {
    if (token === null) {
      navigate("/signIn");
      return;
    }
  }, []);

  function formatNumber(num) {
    return num.toString().padStart(2, "0");
  }

  const [searchBarData, setSearchBarData] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
    location: "Berezhany",
  });
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);

  const [filterParams, setFilterParams] = useState({
    vendor: null,
    carType: null,
    maxPrice: null,
  });

  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const pageSize = 20;

  const [noCarsMessage, setNoCarsMessage] = useState(null);

  const getCarsByPagination = async (page) => {
    const params = {
      ...filterParams,
      ...searchBarData,
      page,
      pageSize,
    };
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/car/available",
        { params },
        { headers: headers }
      );
      setCars(response.data.cars);
      return response.data.cars.length;
    } catch (error) {
      console.error("Помилка діставання машин:", error);
    }
  };

  const getCars = async (data) => {
    setSearchBarData({
      location: data.location,
      startDate: `${data.startDate.$y}-${formatNumber(
        data.startDate.$M + 1
      )}-${formatNumber(data.startDate.$D)}`,
      endDate: `${data.endDate.$y}-${formatNumber(
        data.endDate.$M + 1
      )}-${formatNumber(data.endDate.$D)}`,
    });

    setIsLoading(true);

    const params = {
      ...filterParams,
      location: data.location,
      startDate: `${data.startDate.$y}-${formatNumber(
        data.startDate.$M + 1
      )}-${formatNumber(data.startDate.$D)}`,
      endDate: `${data.endDate.$y}-${formatNumber(
        data.endDate.$M + 1
      )}-${formatNumber(data.endDate.$D)}`,
      page: data.page,
      pageSize,
    };
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/car/available",
        { ...params },
        { headers: headers }
      );
      setCars(response.data.cars);
      setN2(response.data.countOfPages);
      return response.data.cars.length;
    } catch (error) {
      console.error("Помилка діставання машин:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <SearchBar
        search={getCars}
        isLoading={isLoading}
        setNoCarsMessage={setNoCarsMessage}
      />
      <FilterCars setFilterParams={setFilterParams} />
      <ListOfCars
        start={searchBarData.startDate}
        end={searchBarData.endDate}
        cars={cars}
      />
      {noCarsMessage}

      {cars.length !== 0 ? (
        <Pagination
          className="my-2.5"
          n1={n1}
          n2={n2}
          search={getCarsByPagination}
          setN1={setN1}
        />
      ) : null}
    </div>
  );
}
