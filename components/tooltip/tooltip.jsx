import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from "react-dom"
import { getTooltipPosition } from "../../helpers/helper"
import { Container } from './style';
import { render } from 'react-dom';

const Tooltip = ({elementRef, position, gap, contents }) => {
  const [show, setShow] = useState(false);
  const tooltipRef = useRef(null);
  useEffect(() => {
    const el = elementRef;
    console.log(el);
    if (!el) return;
    const handleMouseEnter = () => {
      setShow(true);
      const tooltip = tooltipRef.current;
      console.log(tooltipRef.current)
      if (!tooltip) return;
      const { left, top } = getTooltipPosition(el, tooltip, position, gap);
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    };
    const handleMouseLeave = () => {
      setShow(false);
    };
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementRef, tooltipRef.current, position, gap]);
  return createPortal(
    <Container ref={tooltipRef} show={show}>
        {contents}
    </Container>,
    document.getElementById("portal")
  )
}

export default Tooltip