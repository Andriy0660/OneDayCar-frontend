import Car from "./Car";

export default function ListOfCars({ start, end, cars }) {
  const renderedCars = cars.map((car) => {
    return <Car key={car.id} car={car} start={start} end={end} />;
  });
  return (
    <div className="ml-10">
      <div className="flex flex-wrap justify-start">{renderedCars}</div>
    </div>
  );
}
