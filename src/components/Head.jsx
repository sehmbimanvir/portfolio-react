import { useEffect } from 'react';

const CustomHead = ({ title = 'Manvir Singh' }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export default CustomHead;
