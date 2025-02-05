// import React, { useState } from "react";

import { useCounter } from "../utils/store/useCounter";

// const CounterApp = () => {
//   const [count, setCount] = useState(0);
//   return (
//     <>
//       <div>CounterApp</div>
//       <ButtonKurang count={count} setCount={setCount} />;<h2>{count}</h2>
//       <ButtonTambah count={count} setCount={setCount} />;
//     </>
//   );
// };

// export default CounterApp;

// const ButtonKurang = ({ count, setCount }) => {
//   return (
//     <>
//       <button onClick={() => setCount(count - 1)}>Kurang</button>
//     </>
//   );
// };

// const ButtonTambah = ({ count, setCount }) => {
//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>Tambah</button>
//     </>
//   );
// };

const CounterApp = () => {
  const { count } = useCounter();
  const { name } = useCounter();
  return (
    <>
      <div>CounterApp {name}</div>
      <ButtonKurang />
      <h2>{count}</h2>
      <ButtonTambah />
    </>
  );
};

export default CounterApp;

const ButtonKurang = () => {
  const { btnKurang } = useCounter();

  return (
    <>
      <button onClick={btnKurang}>Kurang</button>
    </>
  );
};

const ButtonTambah = ({ count, setCount }) => {
  const { btnTambah } = useCounter();

  return (
    <>
      <button onClick={btnTambah}>Tambah</button>
    </>
  );
};
