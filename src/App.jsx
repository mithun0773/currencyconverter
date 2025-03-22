import { useState } from "react";
// import note2000 from "./assets/two_thousand_note.png";
import note500 from "./assets/five_hundred_note.png";
import note200 from "./assets/two_hundred_note.png";
import note100 from "./assets/one_hundred.png";
import note50 from "./assets/fifty_note.png";
import note20 from "./assets/twenty_note.png";
import note10 from "./assets/ten_note.png";
import note5 from "./assets/five_note.png";
import note2 from "./assets/two_note.png";
import note1 from "./assets/one_note.png";

const denominations = [
  // { value: 2000, img: note2000 },
  { value: 500, img: note500 },
  { value: 200, img: note200 },
  { value: 100, img: note100 },
  { value: 50, img: note50 },
  { value: 20, img: note20 },
  { value: 10, img: note10 },
  { value: 5, img: note5 },
  { value: 2, img: note2 },
  { value: 1, img: note1 },
];


function App() {
  const [counts, setCounts] = useState(
    denominations.reduce((acc, item) => ({ ...acc, [item.value]: "" }), {})
  );

  const handleChange = (e, denomination) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    setCounts({ ...counts, [denomination]: value });
  };

  const calculateTotal = () => {
    return denominations.reduce(
      (sum, { value }) => sum + (parseInt(counts[value] || 0) * value),
      0
    );
  };

  const resetInputs = () => {
    setCounts(denominations.reduce((acc, item) => ({ ...acc, [item.value]: "" }), {}));
  };

  return (
    <div className="container">
      <h1>Cash Counter</h1>

      {denominations.map(({ value, img }) => (
        <div className="row" key={value}>
          <img src={img} alt={`Rs.${value} Note`} />
          <input
            type="number"
            value={counts[value]}
            onChange={(e) => handleChange(e, value)}
            className="cash-input"
            placeholder={`Enter No. of Rs.${value} Notes`}
          />
          <span className="cash-text">{(counts[value] || 0) * value}</span>
        </div>
      ))}

      <div className="row">
        <button onClick={resetInputs}>Reset</button>
      </div>

      <div className="row result-part">
        <span>Total Cash: {calculateTotal()}</span>
        <span>{`Total Cash In Words: ${convertToWords(calculateTotal())}`}</span>
      </div>
    </div>
  );
}

function convertToWords(number) {
  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  if (number === 0) return "Zero";

  let words = "";

  if (Math.floor(number / 10000000) > 0) {
    words += convertToWords(Math.floor(number / 10000000)) + " Crore ";
    number %= 10000000;
  }

  if (Math.floor(number / 100000) > 0) {
    words += convertToWords(Math.floor(number / 100000)) + " Lakh ";
    number %= 100000;
  }

  if (Math.floor(number / 1000) > 0) {
    words += convertToWords(Math.floor(number / 1000)) + " Thousand ";
    number %= 1000;
  }

  if (Math.floor(number / 100) > 0) {
    words += convertToWords(Math.floor(number / 100)) + " Hundred ";
    number %= 100;
  }

  if (number > 0) {
    if (number < 10) words += units[number];
    else if (number < 20) words += teens[number - 10];
    else {
      words += tens[Math.floor(number / 10)];
      if (number % 10 > 0) words += " " + units[number % 10];
    }
  }

  return words.trim();
}

export default App;
