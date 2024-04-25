import MyCar from "./MyCar";

export default function ListOfMyCars({ cars }) {
  const renderedCars = cars.map((car) => {
    return <MyCar key={car.id} car={car} />;
  });
  return (
    <div className="ml-10">
      <div className="flex flex-wrap justify-start">{renderedCars}</div>
    </div>
  );
}
