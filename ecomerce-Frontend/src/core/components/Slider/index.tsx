import './styles.css';


import React, {  useEffect, useRef, useState } from 'react'

const data = [
  {
    id: 1, imgUrl: 'colchon-chaide-y-chaide-continental-de-lujo-15-plazas.jpg'
  },
  {
    id: 2, imgUrl: 'COLCHON SIMMONS BACK CARE KING.jpg'
  },
  {
    id: 3, imgUrl: '02-colchones-colchon-latex-natural.jpg'
  },
  {
    id: 4, imgUrl: 'colchon1.PNG'
  },
  {
    id: 5, imgUrl: 'colchon_acces_resortado.png'
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
