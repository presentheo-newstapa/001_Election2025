'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/Card";
import MobileCard from "@/components/MobileCard";
import data from "@/data/data.json";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {opacity: 1, transition: {staggerChildren: 0.2}},
};
const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -2 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }},
};

const partyList = [
  {name: "국민의힘", color: "red"},
  {name: "더불어민주당", color: "blue"},
  {name: "개혁신당", color: "orange"},
]
const candidateList = [
  {name: "홍준표", party: "국민의힘", currentPosition: "대구광역시장", formerPosition: "대구광역시장",},
  {name: "이재명", party: "더불어민주당", currentPosition: "대구광역시장", formerPosition: "대구광역시장",},
  {name: "이준석", party: "개혁신당", currentPosition: "대구광역시장", formerPosition: "대구광역시장",},
  {name: "나경원", party: "국민의힘", currentPosition: "대구광역시장", formerPosition: "대구광역시장",},
  {name: "전광훈", party: "자유통일당", currentPosition: "대구광역시장", formerPosition: "대구광역시장",},
  {name: "한동훈", party: "국민의힘", currentPosition: "대구광역시장", formerPosition: "대구광역시장",}
]
const resultList = [
  {result: "거짓", color: "black"},
  {result: "대체로 거짓", color: "navy"},
  {result: "판단 보류", color: "blue"},
  {result: "대체로 사실", color: "blue"},
  {result: "사실", color: "skyblue"},
]

export default function Home() {

  // 모바일 미디어 쿼리
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  
  // 데이터 상태 관리
  const [filteredData, setFilteredData] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedLegend, setselectedLegend] = useState("전체");
  const [animationKey, setAnimationKey] = useState(0);
  const [openFilter, setOpenFilter] = useState("전체");
  const [isInitialScreen, setIsInitialScreen] = useState(true);

  const handleFilteredData = (category: string, legend: string) => {
    setAnimationKey(animationKey + 1);
    setSelectedCategory(category);
    setselectedLegend(legend);
  }
  
  // 선택한 카테고리에 따라 데이터 필터링
  useEffect(() => {
    if (selectedCategory === "전체") {
      setFilteredData(data);
    } else if (selectedCategory === "인물") {
      setFilteredData(data.filter((item) => {return item.name === selectedLegend}))
    } else if (selectedCategory === "정당") {
      setFilteredData(data.filter((item) => {return item.party === selectedLegend}))
    }}, [selectedCategory, selectedLegend]
  );

  // 스크롤 시 메인 화면 감추기
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsInitialScreen(false);
      }
    }
    window.addEventListener('scroll', handleScroll);

    // 초기에도 한번 확인
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 카테고리 버튼 클래스네임
  const categoryButtonClassName = (category: string) => {
    return (
      `text-lg text-[#79797A] px-12 py-2 rounded-full border cursor-pointer shadow-sm transition-all duration-200 ease-in-out ${openFilter == category ? 'border-[#6463FF] bg-[#6463FF] text-white' : 'border-[#D9D9D9] bg-white hover:text-[#6463FF] hover:border-[#6463FF]'}`
    )
  }

  const renderFilter = () => {
    if (openFilter === "전체") {
      return ("")
    } else if (openFilter === "인물") {
      return (
        <div className="bg-white mt-4 p-4 pb-12 rounded-t-3xl border border-[#DEDEDE]">
          <ul className="flex flex-wrap gap-4">
            {candidateList.map((item, index) => (
              <li 
                key={index}
                className="cursor-pointer text-center"
                onClick={() => handleFilteredData("인물", item.name)}
              >
                <Image
                  src={`/images/candidate/${item.name}.png`}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="object-contain object-left"
                />
                <h5 className="mt-1 font-semibold">{item.name}</h5>
              </li>
            ))}
          </ul>
        </div>
      )
    } else if (openFilter === "정당") {
      return (
        <div className="bg-white mt-4 p-4 pb-12 rounded-t-3xl border border-[#DEDEDE]">
          <ul className="flex flex-wrap gap-4">
            {partyList.map((item, index) => (
              <li 
                key={index} 
                className="relative w-[120px] h-[30px] cursor-pointer"
                onClick={() => handleFilteredData("정당", item.name)}
              >
                <Image
                  src={`/images/logo/${item.name}.png`}
                  alt={item.name}
                  fill
                  className="object-contain object-center"
                />
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }


  return (
    <div className="grid bg-[#FBFBFB]">
      <main>
        {isInitialScreen ? 
          // 초기 화면에서는 메인 이미지 보여주기
          <div className="flex justify-center-safe py-8">
            <Image
              className="dark:invert"
              src="/images/main.png"
              alt="2025 대선 팩트체크"
              width={1180}
              height={200}
              priority
            />
          </div>
          :
          // 스크롤 내리면 헤더 보여주기
          <div className="sticky top-0 w-full bg-[rgba(241,241,249,0.8)] pt-2 pb-3 mb-5">
            <div className="flex justify-between max-w-[1180px] mx-auto">
              <Image
                src={'/images/header_logo.png'}
                alt="2025 대선 팩트체크"
                width={280}
                height={44}
              />
              <p className="content-center text-[#79797A]">뉴스타파 X 한국독립언론네트워크 KINN</p>
            </div>
          </div>
        }

        {isInitialScreen || (
          <div className="max-w-[1180px] mx-auto p-6 flex justify-between border border-[#D9D9D9] rounded-3xl bg-[url('/images/banner_bg.png')] bg-cover bg-no-repeat bg-center">
            {selectedCategory === "정당" && (
              <div className="p-8">
                <Image src={`/images/logo/${selectedLegend}.png`} alt={selectedLegend} width={200} height={150}/>
              </div>
              
            )}
            {selectedCategory === "인물" && (
              <div className="flex gap-4">
                <div>
                  <Image
                    src={`/images/candidate/${selectedLegend}.png`}
                    alt={selectedLegend}
                    width={150}
                    height={150}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h3>정당 이름</h3>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">{selectedLegend}</h1>
                    <h2 className="text-[#79797A] mt-2">{selectedCategory} : {selectedLegend}</h2>
                  </div>
                </div>
              </div>

            )}
            {/* 집계 */}
            <div className="grid grid-cols-5 gap-4 mt-4">
              {resultList.map((item, index) => (
                <div key={index}>
                  <h3 className="rounded-sm text-center text-[#79797A]">{item.result}</h3>
                  <p className="text-center font-bold text-[50px]">{filteredData.filter(data => data.result === item.result ).length}</p>
                </div>
              ))}
            </div>
          </div>

        )}



        {/* 카드 그리드 */}
        <div className="flex justify-center-safe">
          <motion.div 
            key = {animationKey}
            className="max-w-[1180px] grid grid-cols-12 gap-4 space-y-4 mt-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {filteredData.map((item, index) => (
              <motion.div
                className="col-span-12 lg:col-span-3 md:col-span-6 sm:col-span-12"
                key={index}
                variants={cardVariants}
              >
                {isMobile ? (
                  <MobileCard
                    name={item.name}
                    party={item.party}
                    claim={item.claim}
                    result={item.result}
                    resultDetails={item.resultDetails}
                    currentPosition={item.currentPosition}
                    formerPosition={item.formerPosition}
                    relatedArticleUrl={item.relatedArticleUrl}
                    originalUrl={item.originalUrl}
                  />
                ) : (
                  <Card
                    name={item.name}
                    party={item.party}
                    claim={item.claim}
                    result={item.result}
                    resultDetails={item.resultDetails}
                    currentPosition={item.currentPosition}
                    formerPosition={item.formerPosition}
                    relatedArticleUrl={item.relatedArticleUrl}
                    originalUrl={item.originalUrl}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* 카드 그리드 끝 */}

        {/* 필터 */}
        <div className="fixed w-full bottom-0 flex justify-center-safe pt-8 backdrop-blur-sm">
          {/* 필터 감싸기 */}
          <div className="max-w-[660px] overflow-hidden">
            {/* 카테고리 선택 버튼 */}
            <div className="flex gap-4 justify-center-safe">
              {/* className이 너무 길어지고 중첩돼서 별도 함수로 분리 */}
              <button className={categoryButtonClassName("전체")} onClick={() => {handleFilteredData("전체", "전체"); setOpenFilter("전체")}}>전체 보기</button>
              <button className={categoryButtonClassName("인물")} onClick={() => setOpenFilter("인물")}>인물별 보기</button>
              <button className={categoryButtonClassName("정당")} onClick={() => setOpenFilter("정당")}>정당별 보기</button>
            </div> 

            <motion.div>
              <AnimatePresence>
                {/* 필터 선택창 */}
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  {renderFilter()}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
        {/* 필터 끝 */}


      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center py-8">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
