import { useState } from "react";

const actions = [
  {
    key: "save",
    label: "Save",
    icon: <i class="fa-regular fa-bookmark"></i>,
  },
  {
    key: "edit",
    label: "Edit",
    icon: <i className="fa-regular fa-pen-to-square"></i>,
  },
  {
    key: "delete",
    label: "Delete",
    icon: <i className="fa-regular fa-trash-can"></i>,
  },
];

export default function EditPost() {
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
      <p onClick={toggleShow} className="cursor-pointer">
        <span>
          <i className="fa-solid fa-ellipsis"></i>
        </span>
      </p>
      {show && (
        <ul className="list-none bg-white border  border-neutral-200  rounded-xl overflow-hidden shadow-md min-w-35 absolute top-6 end-0">
          {actions.map((item) => (
            <li
              onClick={() => handleSelectedValue(item.label)}
              className={`flex items-center gap-2 p-3 rounded-lg ${item.key === "delete" ? "text-red-500" : "text-neutral-600"} text-sm hover:bg-neutral-100 cursor-pointer`}
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
