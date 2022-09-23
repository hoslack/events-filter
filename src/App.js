import { useRef, useState } from "react";
import eventsData from "./events.json";

export default function App() {
  const [cityText, setCityText] = useState("");
  const [price, setPrice] = useState(0);
  const [priceSign, setPriceSign] = useState("equal");
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  const priceRef = useRef(null);
  const cityRef = useRef(null);

  const handleCitySearch = () => {
    const searchedEvents = filteredEvents.filter((event) => {
      return event.city.toLowerCase().includes(cityText.toLowerCase());
    });
    setFilteredEvents(searchedEvents);
  };

  const handlePrice = () => {
    const priceEvents = filteredEvents.filter((event) => {
      if (priceSign === "equal") {
        return event.price === price;
      }
      if (priceSign === "less") {
        return event.price < price;
      }
    });
    setFilteredEvents(priceEvents);
  };

  const handleClear = () => {
    setCityText("");
    setPrice(0);
    setFilteredEvents(eventsData);
    priceRef.current.value = 0;
    cityRef.current.value = "";
  };

  return (
    <div className="App">
      <h1>Hello Events</h1>
      Search City:{" "}
      <input
        type="text"
        ref={cityRef}
        onChange={(e) => setCityText(e.target.value)}
      />{" "}
      <button onClick={() => handleCitySearch()}>Submit</button>
      <br />
      Search Price:{" "}
      <select
        name="priceSign"
        id="priceSign"
        onChange={(e) => setPriceSign(e.target.value)}
      >
        <option value="equal">Equal to</option>
        <option value="less">Less Than</option>
      </select>
      <input
        type="number"
        ref={priceRef}
        onChange={(e) => setPrice(Number(e.target.value))}
      />{" "}
      <button onClick={() => handlePrice()}>Submit</button>
      <br />
      <button onClick={handleClear}>Clear All</button>
      <ul>
        <h5>{`City   -   Artist   -   Price`}</h5>
        {filteredEvents.map(({ id, city, price, artist }) => {
          return (
            <li key={id}>
              <h5>{`${city} - ${artist} - ${price}`}</h5>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
