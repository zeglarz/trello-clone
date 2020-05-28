import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";
import ITEM_TYPE from "../data/types";

export default function Item({ item, index, moveItem, status }) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredReact = ref.current.getBoundClientRect();
      const hoverMiddleY = (hoveredReact.bottom - hoveredReact.top) / 2;
      const mousePosition = monitor.getClientOffset;
      const hoverClientY = mousePosition.y - hoveredReact.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }

      moveItem(dragIndexm, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{isDragging}, drag] = useDrag({
    item: { type: ITEM_TYPE, ...item, index},
    collect: monitor => ({
      isDragging: monitor.isDragging();
    })
  });

  const [show, setShow] = useState(fasle);

  const open = () => setShow(true);
  const close = () => setShow(false);

  drag(drop(ref));

  return (
  <>
    <div
      ref={ref}
      style={{opacity: isDragging ? 0: 1}}
      className="item"
      onClick={onOpen}
    >
      <div className='color-bar' style={{backgroundColor: status.color}}>
        <p className='item-title'>{item.content}</p>
        <p className='item-status'>{item.icon}</p>
      </div>
    </div>
    <Window
      item={item}
      onClose={onClose}
      show={show}
    />
  </>
  );
};