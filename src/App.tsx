import { useRef, useEffect, useState } from 'react';
import imageData from './imageData';
import gsap from 'gsap';

function App() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const firstAnimationRef = useRef<HTMLDivElement>(null);
  const firstAnimationTxtRef = useRef<Array<HTMLLIElement | null>>([]);
  const firstAnimationTtlRef = useRef<HTMLHeadingElement>(null);
  const ourServiceRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLHeadingElement>(null);
  const imageTtl = useRef<HTMLHeadingElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);
  const squareElements = useRef<Array<HTMLDivElement | null>>([]);
  const squareElementsLeft = useRef<Array<HTMLDivElement | null>>([]);
  const imageTtlLine1 = useRef<HTMLSpanElement>(null);
  const imageTtlLine2 = useRef<HTMLSpanElement>(null);

  // 現在のビデオの配列番号
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  // FV
  useEffect(() => {
    gsap.to(firstAnimationTxtRef.current, {
      delay: 0.2,
      opacity: 1,
      stagger: 0.2,
      ease: 'power2.out',
    });
    gsap.to(firstAnimationTxtRef.current, {
      delay: 1.2,
      opacity: 0,
      duration: 0.2,
    });
    gsap.to(firstAnimationTtlRef.current, {
      delay: 1.5,
      opacity: 1,
      duration: 0.5,
    });
    gsap.to(firstAnimationRef.current, {
      delay: 2,
      autoAlpha: 0,
      duration: 1,
    });
    gsap.to(ourServiceRef.current, {
      delay: 1.5,
      opacity: 1,
      duration: 1,
    });
  }, []);

  useEffect(() => {
    setHeight(
      sectionRef.current?.clientHeight ? sectionRef.current?.clientHeight : 0
    );
  }, [sectionRef]);

  // ビデオが変更された時に実行される処理
  useEffect(() => {
    // アイテムをシャッフル;
    const shuffledSquares = squareElements.current.sort(
      () => Math.random() - 0.5
    );

    gsap.to(squareElementsLeft.current, {
      opacity: 0.04,
      duration: 0.2,
    });
    gsap.fromTo(
      imageRef.current,
      {
        transform: 'scale(1.5)',
      },
      {
        transform: 'scale(1)',
        duration: 5,
        onComplete: () => {
          setCurrentImage(currentImage === 5 ? 0 : currentImage + 1);
        },
      }
    );
    gsap.fromTo(
      imageTtl.current,
      {
        duration: 1,
        opacity: 0,
        y: 20,
      },
      {
        duration: 1,
        opacity: 1,
        y: 0,
      }
    );
    gsap.to(
      [imageTtlLine1.current, imageTtlLine2.current, explanationRef.current],
      {
        duration: 1,
        opacity: 1,
      }
    );
    gsap.fromTo(
      shuffledSquares,
      {
        opacity: 0.5,
      },
      {
        opacity: 0.04,
        duration: 1,
        stagger: 0.03,
        ease: 'power2.out',
      }
    );
    gsap.to(
      [imageTtlLine1.current, imageTtlLine2.current, explanationRef.current],
      {
        delay: 3.5,
        duration: 1,
        opacity: 0,
      }
    );
    gsap.to(imageTtl.current, {
      delay: 3.5,
      duration: 1,
      opacity: 0,
      y: -20,
    });
    gsap.fromTo(
      squareElementsLeft.current,
      {
        opacity: 0.04,
        rotationY: -90,
      },
      {
        delay: 3.5,
        opacity: 0.5,
        duration: 1,
        rotationY: -180,
        ease: 'power2.out',
        stagger: 0.5 / 9,
      }
    );
  }, [currentImage]);

  return (
    <section className='topContainer' ref={sectionRef}>
      <div ref={firstAnimationRef} className='firstAnimation'>
        <ul className='firstAnimationTxt ul'>
          <li
            className='firstAnimationTxtItem'
            ref={(el: HTMLLIElement) => (firstAnimationTxtRef.current[0] = el)}
          >
            Impress
          </li>
          <li
            className='firstAnimationTxtItem'
            ref={(el: HTMLLIElement) => (firstAnimationTxtRef.current[1] = el)}
          >
            All
          </li>
          <li
            className='firstAnimationTxtItem'
            ref={(el: HTMLLIElement) => (firstAnimationTxtRef.current[2] = el)}
          >
            Five
          </li>
          <li
            className='firstAnimationTxtItem'
            ref={(el: HTMLLIElement) => (firstAnimationTxtRef.current[3] = el)}
          >
            Senses.
          </li>
        </ul>
        <h2 ref={firstAnimationTtlRef} className='firstAnimationTtl h2'>
          <img
            className='firstAnimationTtlImage'
            src='/images/logo.svg'
            alt=''
          />
        </h2>
      </div>
      <img
        className='backgroundImage'
        ref={imageRef}
        src={imageData[currentImage].url}
      />
      <div className='imageTtlArea'>
        <span className='imageTtlLine' ref={imageTtlLine1}></span>
        <h2 className='_imageTtlArea h2' ref={imageTtl}>
          <div className='imageTtl'>{imageData[currentImage].title}</div>
          <p className='imageSubTtl p'>{imageData[currentImage].subTitle}</p>
        </h2>
        <span className='imageTtlLine' ref={imageTtlLine2}></span>
        <div className='explanationArea' ref={explanationRef}>
          <p className='explanationTtl p'>
            {imageData[currentImage].explanation.title}
          </p>
          <p className='explanation p'>
            {imageData[currentImage].explanation.text}
          </p>
        </div>
      </div>
      <div className='grid19'>
        {/* 1*9グリッドアイテム */}
        {[...Array(9)].map((_, i) => (
          <div
            className='gridItem19'
            key={i}
            ref={(el: HTMLDivElement) => (squareElementsLeft.current[i] = el)}
            style={{}}
          />
        ))}
      </div>
      <div className='grid79'>
        {/* 7*9グリッドアイテム */}
        {[...Array(63)].map((_, i) => (
          <div
            className='gridItem79'
            key={i}
            ref={(el: HTMLDivElement) => (squareElements.current[i] = el)}
          />
        ))}
      </div>
      <div className='ourService' ref={ourServiceRef}>
        ( Our Service )
      </div>
      <div
        className='scroll'
        ref={scrollRef}
        onClick={() => window.scrollTo({ top: height, behavior: 'smooth' })}
      >
        <div className='scrollText'>Scroll</div>
        <div className='scrollArrow'></div>
      </div>
    </section>
  );
}

export default App;
