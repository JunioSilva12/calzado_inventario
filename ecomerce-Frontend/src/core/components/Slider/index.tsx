import './styles.css';


import React, {  useEffect, useRef, useState } from 'react'

const data = [
  {
    id: 1, imgUrl: 'PRUEBA.jpeg'
  },
  {
    id: 2, imgUrl: 'PRUEBA.jpeg'
  },
  {
    id: 3, imgUrl: 'PRUEBA.jpeg'
  },
  {
    id: 4, imgUrl: 'PRUEBA.jpeg'
  },
  {
    id: 5, imgUrl: 'PRUEBA.jpeg'
  }
];


interface Slide {
  id: number;
  imgUrl: string;
}

interface SliderProps {
  data: Slide[];
}

const Slider: React.FC<SliderProps> = () => 

{
  const listRef = useRef<HTMLUListElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const listNode = listRef.current;
    if (listNode) {
      const imgNode = listNode.querySelectorAll("li > img")[currentIndex];
      if (imgNode) {
        imgNode.scrollIntoView({
          behavior: "smooth"
        });
      }
    }

  }, [currentIndex]);


  const scrollToImage = (direction: string) => {
    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      })
    } else {
      const isLastSlide = currentIndex === data.length - 1;
      if (!isLastSlide) {
        setCurrentIndex(curr => curr + 1);
      }
    }
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  }
/////////////////
  return (
    <div className="main-container">
      <div className="slider-container">
        <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10092;</div>
        <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10093;</div>
        <div className="container-images">
          <ul ref={listRef}>
            {
              data.map((item) => {
                return <li key={item.id}>
                  <img src={`src/core/assets/images/${item.imgUrl}`} width={600} height={320} />
                </li>
              })
            }
          </ul>
        </div>
        <div className="dots-container">
          {
            data.map((_: unknown, idx:number ) => (
              <div key={idx}
                className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(idx)}>
                
              </div>))
          }
        </div>
      </div>
    </div >
  )
}
  export default Slider;
