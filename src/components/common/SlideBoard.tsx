import { useState, useRef, useEffect } from "react";

import { Board, Boards } from "@type/.";
import { IoIosArrowBack } from "react-icons/io";
import { BoardCard } from "@home/.";
import { getBoardList } from "@apis/boardApi";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/bundle";

import swipercore from "swiper";
swipercore.use([Autoplay]);

export default function SlideBoard() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [boards, setBoards] = useState<Boards>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const swiperRef = useRef<swipercore>();

  useEffect(() => {
    setLoading(true);
    getBoardList()
      .then((boardList) => {
        setBoards(boardList);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error)
    return <div>게시판을 불러오는 중 오류가 발생했습니다. ({error})</div>;

  if (loading) return <div>Loading...</div>;

  if (boards.length === 0) return <div>게시물이 없습니다..</div>;

  // 호버 시, 슬라이드 정지
  const handleMouseEnter = () => {
    if (swiperRef.current) swiperRef.current.autoplay?.stop();
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) swiperRef.current.autoplay?.start();
  };

  // 이전, 다음 버튼 이벤트핸들러
  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };

  return (
    <section className="flex flex-col desktop:gap-y-7">
      <div className="relative">
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Swiper
            className="pt-1"
            loop={boards.length >= 1}
            speed={2000}
            slideToClickedSlide={true}
            spaceBetween={30}
            slidesPerView={2}
            watchOverflow={true}
            slidesOffsetBefore={0}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: "#prev_slide",
              nextEl: "#next_slide",
            }}
            onSwiper={(e: any) => {
              setSwiper(e);
              swiperRef.current = e;
            }}
          >
            {boards.map((item: Board, idx: number) => (
              <SwiperSlide key={item.id}>
                <BoardCard key={item.id} board={item} idx={++idx} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 이전, 다음 버튼 커스텀 */}
        <button className="absolute top-1/2 -left-[50px]" onClick={handlePrev}>
          <i className="text-size-title desktop:text-[2rem] ">
            <IoIosArrowBack className="dark:fill-dark-light-color smooth-color" />
          </i>
        </button>
        <button className="absolute top-1/2 -right-[50px]" onClick={handleNext}>
          <i className="text-size-title desktop:text-[2rem] text-black-color dark:text-dark-light-color transition-colors">
            <IoIosArrowBack className="rotate-180 dark:fill-dark-light-color smooth-color" />
          </i>
        </button>
      </div>
    </section>
  );
}
