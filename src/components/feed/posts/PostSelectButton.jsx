import { useState } from "react";

const privacy = [
  {
    key: "public",
    label: "Public",
    icon: <i className="fa-solid fa-globe "></i>,
  },
  {
    key: "following",
    label: "Following",
    icon: <i className="fa-solid fa-user-group"></i>,
  },
  {
    key: "only_me",
    label: "Only Me",
    icon: <i className="fa-solid fa-lock "></i>,
  },
];

export default function PostSelectButton() {
  const [show, setShow] = useState(false);
  const [selectValue, setSelectValue] = useState("Public");

  function toggleShow() {
    setShow(!show);
  }

  function handleSelectedValue(value) {
    setSelectValue(value);
    setShow(false);
  }
  return (
    <div className="relative">
      <p
        onClick={toggleShow}
        className="flex items-center gap-2 p-1 hover:bg-neutral-100 rounded-xl cursor-pointer"
      >
        <span>
          <i className="fa-solid fa-globe text-neutral-400"></i>
        </span>
        <span className="text-neutral-500 text-sm">{selectValue}</span>
        <span>
          {show ? (
            <i className="fa-solid fa-chevron-up text-neutral-500 text-sm"></i>
          ) : (
            <i className="fa-solid fa-chevron-down text-neutral-500 text-sm"></i>
          )}
        </span>
      </p>
      {show && (
        <ul className="list-none bg-white border  border-neutral-200  rounded-xl overflow-hidden shadow-md min-w-35 absolute top-12">
          {privacy.map((item) => (
            <li
              onClick={() => handleSelectedValue(item.label)}
              className="flex items-center gap-2 p-3 rounded-lg text-neutral-600 text-sm hover:bg-neutral-100 cursor-pointer"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
