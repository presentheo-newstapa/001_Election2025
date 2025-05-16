'use client'

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import Card from "@/components/Card";
import MobileCard from "@/components/MobileCard";
import data from "@/data/data.json";
// import { CardProps } from "@/types/props";

// 카드 애니메이션 사전 설정
const containerVariants = {
  hidden: { opacity: 0 },
  show: {opacity: 1, transition: {staggerChildren: 0.1}},
};
const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -2 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }},
};

// 정당과 후보 목록
const partyList = [
  {name: "더불어민주당", color: "blue"},
  {name: "국민의힘", color: "red"},
  {name: "개혁신당", color: "orange"},
]
const candidateList = [
  {name: "이재명", party: "더불어민주당", position: "대구광역시장", formerPosition: "대구광역시장",},
  {name: "김문수", party: "국민의힘", position: "대구광역시장", formerPosition: "대구광역시장",},
  {name: "이준석", party: "개혁신당", position: "대구광역시장", formerPosition: "대구광역시장",},
  {name: "홍준표", party: "국민의힘", position: "대구광역시장", formerPosition: "대구광역시장",},
  {name: "한동훈", party: "국민의힘", position: "대구광역시장", formerPosition: "대구광역시장",},
  {name: "유정복", party: "국민의힘", position: "인천시장", formerPosition: "대구광역시장",},
  {name: "전광훈", party: "자유통일당", position: "대구광역시장", formerPosition: "대구광역시장",}
]

const creditList = [
  {name: "기획", person: "오대양 허현재"},
  {name: "디자인", person: "이도현"},
  {name: "개발", person: "허현재"},
  {name: "팩트체크팀", person: "최기훈 최승호 김성수 박상희 김주예 신다임"},
]

const resultList = [
  {name: "거짓", color: "#666666"},
  {name: "대체로 거짓", color: "#66668D"},
  {name: "판단 유보", color: "#6665B3"},
  {name: "대체로 사실", color: "#6564D9"},
  {name: "사실", color: "#6463FF"},
]

export default function Home() {

  // 모바일 미디어 쿼리
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  
  // 데이터 상태 관리
  const rawData = useMemo(() => data, []); // 초기 데이터

  // 카테고리 필터링
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedLegend, setSelectedLegend] = useState("전체");
  const [selectedResult, setSelectedResult] = useState("전체결과");
  
  // UI상태 관리
  const [isInitialScreen, setIsInitialScreen] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("전체");

  // 애니메이션 키
  const [animationKey, setAnimationKey] = useState(0);

  // 필터링 함수
  const handleFilteredData = (category: string, legend: string, result: string) => {
    window.scrollTo(0, 0)
    setAnimationKey(animationKey + 1);
    setSelectedCategory(category);
    setSelectedLegend(legend);
    setSelectedResult(result);
  }
    
  // 선택한 카테고리에 따라 데이터 필터링
  const categoryFilteredData = useMemo(() => {
    if (selectedCategory === "전체") return rawData;
    if (selectedCategory === "인물") return rawData.filter((item) => item.name === selectedLegend);
    if (selectedCategory === "정당") return rawData.filter((item) => item.party === selectedLegend);
    return []; // Default to an empty array if no conditions are met
  }, [rawData, selectedCategory, selectedLegend]); 

  // 필터링한 데이터를 검증 결과별로 다시 필터링
  const resultFilteredData = useMemo(() => {
    if (selectedResult === "전체결과") return categoryFilteredData;
    return categoryFilteredData.filter((item) => item.result === selectedResult);
  }, [categoryFilteredData, selectedResult]);


  // 스크롤 시 메인 화면 감추기
  useEffect(() => {
    const handleClick = () => setIsInitialScreen(false);
    const handleWheel = () => setIsInitialScreen(false);
    const handleTouchmove = () => setIsInitialScreen(false);
    window.addEventListener('click', handleClick);
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchmove', handleTouchmove);

    // 초기화
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchmove);
    };
  }, []);

  // 초기화면에서 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = "hidden"
    setTimeout(() => {
      if (isInitialScreen) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "auto"
      }
    }, 600)
  })

  // 커스텀 훅
  // useEffect(() => {
  //   if (elementRef.current) {
  //     const height = elementRef.current.offsetHeight;
  //   }
  // }, []);

  // 카테고리 버튼 클래스네임
  const categoryButtonClassName = (category: string) => {
    return (
      `text-lg text-[#79797A] px-12 py-2 rounded-full border cursor-pointer shadow-sm transition-all duration-200 ease-in-out ${filterCategory == category ? 'border-[#6463FF] bg-[#6463FF] text-white' : 'border-[#D9D9D9] bg-white hover:text-[#6463FF] hover:border-[#6463FF]'}`
    )
  }

  return (
    <div className="grid bg-[#FBFBFB]">
      <main>

        {/* 화면 진입시 초기 배너 */}
        <AnimatePresence>
          {isInitialScreen && 
            // 초기 화면에서는 메인 이미지 보여주기
            <motion.div 
              className="fixed top-0 w-full h-screen z-100 backdrop-blur-sm"
              initial={{y:0, opacity:1}}
              animate={{y:0, opacity:1}}
              exit={{
                y: [-40, 20, -1000],
                opacity: [1,1,0]
              }}
              transition={{
                duration: 0.6,
                ease: 'easeInOut'
              }}
            >
              <div className="absolute top-0 w-full bg-[url(/images/mainbanner.jpg)] bg-cover lg:bg-contain bg-center">
                <Image
                  className="mt-[70px] lg:mt-[96px] mx-auto"
                  src="/images/main_banner_logo.png"
                  alt="2025 대선 팩트체크"
                  width={isMobile ? 260 : 390}
                  height={isMobile ? 95 : 142}
                  priority
                />
                <p className="text-base text-center whitespace-pre-line mt-[30px] lg:text-lg">
                  {isMobile 
                    ? '오는 6월 3일, 21대 대통령 선거가 열립니다.\n매일 쏟아지는 대선 후보들의 발언들은 사실일까요?\n건강한 공론장을 위해 거짓이 사실로,\n사실이 거짓으로 둔갑하지 않도록 감시하겠습니다.'
                    : 
                    '오는 6월 3일, 21대 대통령 선거가 열립니다.\n매일 쏟아지는 대선 후보들의 발언들은 사실일까요? 거짓일까요?\n21대 대선 팩트체크를 위해 뉴스타파와 한국독립언론네트워크(KINN)가 뭉쳤습니다.\n건강한 공론장을 위해 거짓이 사실로, 사실이 거짓으로 둔갑하지 않도록 감시하겠습니다.'}</p>
                <p className="text-sm text-center mt-[15px] text-[#79797A] lg:text-base"><a href="https://newstapa.org/">뉴스타파</a> X <a href="https://withnewstapa.org/kinn/">한국독립언론네트워크 KINN</a></p>
                <Image
                  className="mt-[30px] mb-[35px] mx-auto animate-bounce"
                  src="/images/icon/arrow_down.svg"
                  alt="스크롤을 내려주세요"
                  width={26}
                  height={26}
                />
              </div>
            </motion.div>
          }

        </AnimatePresence>

        {/* 스크롤 내리면 헤더 보여주기 */}
        <div>
          <div className="sticky top-0 w-full bg-[rgba(241,241,249,0.8)] pt-2 pb-3 px-3 opacity-100 z-auto lg:px-0">
            <div className="flex justify-between max-w-[1180px] mx-auto">
              <h1 className="cursor-pointer" onClick={() => handleFilteredData("전체", "전체", "전체결과")}>
                <Image
                  src={'/images/header_logo.png'}
                  alt="2025 대선 팩트체크"
                  width={isMobile ? 130 : 280}
                  height={44}
                />
              </h1>
              <p className="text-xs content-center text-[#79797A] lg:text-base"><a href="https://newstapa.org/">뉴스타파</a> X <a href="https://withnewstapa.org/kinn/">한국독립언론네트워크 KINN</a></p>
            </div>
          </div>

          {/* 상단 정보 */}
          <div className="max-w-[1180px] mx-auto pt-7 block bg-[url('/images/main_banner_bg.png')] bg-cover bg-no-repeat bg-center lg:mt-6 lg:p-6 lg:flex lg:justify-between lg:border lg:border-[#D9D9D9] lg:rounded-[20px]">
            {/* 전체 보기 */}
            {selectedCategory === "전체" && (
              <div className="p-4 lg:p-8">
                <Image 
                  className="m-auto cursor-pointer"
                  src="/images/all_candidates.png" 
                  alt={selectedLegend} 
                  width={240} 
                  height={60} 
                  onClick={() => {handleFilteredData("전체", "전체", "전체결과")}}
                />
              </div>
            )}
            {/* 정당별 보기 */}
            {selectedCategory === "정당" && (
              <div className="p-4 lg:p-8">
                <Image 
                  className="m-auto cursor-pointer"
                  src={`/images/logo/${selectedLegend}.png`} 
                  alt={selectedLegend} 
                  width={200} 
                  height={150} 
                  onClick={() => {handleFilteredData("정당", selectedLegend, "전체결과")}}
                />
              </div>
            )}
            {/* 인물별 보기 */}
            {selectedCategory === "인물" && (
              <div className="flex gap-4 px-5 lg:px-0">
                {/* 인물 사진 */}
                <div>
                  <SafeImage
                    key={selectedLegend}
                    className="cursor-pointer rounded-[20px]"
                    src={`/images/candidate/big/${selectedLegend}.png`}
                    alt={selectedLegend}
                    width={isMobile ? 120 : 150}
                    height={isMobile ? 120 : 150}
                    onClick={() => {handleFilteredData("인물", selectedLegend, "전체결과")}} 
                    fallbackSrc={'/images/candidate/def.jpg'}
                  />
                </div>
                {/* 정당과 인물 정보 */}
                <div className="flex flex-col justify-between">
                  <div>
                    {/* 정당 로고 */}
                    {categoryFilteredData[0].party !== "" && (
                      <h3>
                        <Image
                          className="object-contain object-left cursor-pointer"
                          src={`/images/logo/${categoryFilteredData[0].party}.png`}
                          alt={categoryFilteredData[0].party}
                          width={80}
                          height={30}
                          onClick={() => handleFilteredData("정당", categoryFilteredData[0].party, "전체결과")}
                        />
                      </h3>

                    )}
                  </div>
                  <div>
                    {/* 후보 이름 */}
                    <h1 
                      className="text-3xl font-bold cursor-pointer lg:text-4xl" 
                      onClick={() => handleFilteredData("인물", selectedLegend, "전체결과")}
                    >{selectedLegend}</h1>
                    {/* 후보 직책 */}
                    <h2 className="text-[#79797A] mt-2">
                      {categoryFilteredData[0].position}
                    </h2>
                  </div>
                </div>
              </div>
            )}

            {/* 검증 결과 집계 */}
            <div className="items-center grid grid-cols-5 mt-4">
              {resultList.map((item, index) => (
                <div 
                  key={index} 
                  className={`px-1 pt-1 border rounded-[15px] cursor-pointer ${selectedResult === item.name ? "border-[#6463FF]" : "border-transparent"} lg:px-2 lg:pt-2`}
                  onClick={() => {setSelectedResult(item.name);}}
                >
                  <h3 className="text-sm lg:text-base text-center text-[#79797A]">{item.name}</h3>
                  <p className={`text-center font-bold text-[40px] lg:text-[50px] ${selectedResult === item.name ? "text-[#6463FF]" : ""}`}>{categoryFilteredData.filter(data => data.result === item.name ).length}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 카드 그리드 */}
        <div className="flex justify-center-safe min-h-[50vh]">
          <motion.div 
            key = {animationKey}
            className="max-w-[1180px] grid grid-cols-12 gap-4 mt-3 lg:mt-8 lg:space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {resultFilteredData.length !== 0 && resultFilteredData.map((item, index) => (
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
                    position={item.position}
                    relatedArticleUrl={item.relatedArticleUrl}
                    originalUrl={item.originalUrl}
                    selectedCategory={selectedCategory}
                    selectedLegend={selectedLegend}
                    selectedResult={selectedResult}
                    resultList={resultList}
                    handleFilteredData={handleFilteredData}
                  />
                ) : (
                  <Card
                    name={item.name}
                    party={item.party}
                    claim={item.claim}
                    result={item.result}
                    resultDetails={item.resultDetails}
                    position={item.position}
                    relatedArticleUrl={item.relatedArticleUrl}
                    originalUrl={item.originalUrl}
                    selectedCategory={selectedCategory}
                    selectedLegend={selectedLegend}
                    selectedResult={selectedResult}
                    resultList={resultList}
                    handleFilteredData={handleFilteredData}
                  />
                )}
              </motion.div>
            ))}
            {resultFilteredData.length === 0 && (
              <div className="col-span-12 text-center pt-[80px] pb-[160px]">
                <Image
                  className="m-auto"
                  src="/images/icon/no_search_result.png"
                  alt="검색 결과가 없습니다."
                  width={300}
                  height={240}
                />
                <p>검색 결과가 없습니다.<br/>다른 조건으로 검색하시거나, 페이지를 새로고침 해주세요.</p>
              </div>
            )}
          </motion.div>
        </div>
        {/* 카드 그리드 끝 */}

        {/* 필터 */}
        {!isMobile && (
          <div className="fixed w-full bottom-0 flex justify-center-safe" style={{background: "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #F1F1F9 100%)"}}>
            {/* 필터 감싸기 */}
            <div className="max-w-[660px] overflow-hidden">
              {/* 카테고리 선택 버튼 */}
              <div className="flex gap-4 justify-center-safe py-8">
                {/* className이 너무 길어지고 중첩돼서 별도 함수로 분리 */}
                <button className={categoryButtonClassName("전체")} onClick={() => {setFilterOpen(false); setFilterCategory("전체"); handleFilteredData("전체", "전체","전체결과");}}>전체 보기</button>
                <button className={categoryButtonClassName("인물")} onClick={() => {setFilterOpen(true); setFilterCategory("인물");}}>인물별 보기</button>
                <button className={categoryButtonClassName("정당")} onClick={() => {setFilterOpen(true); setFilterCategory("정당");}}>정당별 보기</button>
              </div>
              {filterOpen && (
                // 필터 선택창
                <AnimatePresence>
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    {filterCategory === "인물" && (
                      <div className="bg-white p-4 pb-7 rounded-t-[20px] border border-[#DEDEDE] border-b-0">
                        <ul className="flex flex-wrap gap-2 justify-center">
                          {candidateList.map((item, index) => (
                            <li 
                              key={index}
                              className="cursor-pointer text-center"
                              onClick={() => handleFilteredData("인물", item.name, "전체결과")}
                            >
                              <Image
                                src={`/images/candidate/small/${item.name}.png`}
                                alt={item.name}
                                width={80}
                                height={80}
                                className={`rounded-[10px] overflow-hidden border-2 ${selectedLegend === item.name ? "border-[#6463FF]" : "border-transparent"}`}
                              />
                              <h5 className="mt-1 font-semibold">{item.name}</h5>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {filterCategory === "정당" && (
                      <div className="bg-white px-8 py-6 pb-7 rounded-t-[20px] border border-[#DEDEDE] border-b-0">
                        <ul className="flex flex-wrap gap-4">
                          {partyList.map((item, index) => (
                            <li key={index} >
                              <button
                                className={`p-2 px-6 border rounded-full hover:border-[#6664FF] cursor-pointer ${selectedLegend === item.name ? "bg-[#F1F1F9] border-[#6463FF]" : "bg-[#ffffff] border-[#D9D9D9]"}`}
                                onClick={() => handleFilteredData("정당", item.name, "전체결과")}>{item.name}</button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* 필터 닫기 버튼 */}
                    <div className="bg-white border border-[#DEDEDE]">
                      <button className="block w-full py-3 text-center cursor-pointer" onClick={() => setFilterOpen(false)}>닫기</button>
                    </div>
                  </motion.div>

                </AnimatePresence>
              )} 

            </div>
          </div>
        )}
        {/* 필터 끝 */}

        {/* 모바일 필터 */}
        {isMobile && (
          
          <div className="fixed bottom-0 w-full">
            {/* 모바일 필터 버튼 */}
            <div className="flex justify-center py-8" style={{background: "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #F1F1F9 100%)"}}>
              <button className="bg-[#6463FF] p-4 m-auto shadow-md rounded-[15px]" onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
                <Image
                  src={mobileFilterOpen ? "/images/icon/filter_close.svg" : "/images/icon/filter_open.svg"}
                  alt="필터 아이콘"
                  width={23}
                  height={23}
                />
              </button>
            </div>
            {mobileFilterOpen && (
              // 모바일 필터 선택창
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-[#DEDEDE] shadow-md"
              >
                {/* 전체보기 */}
                <div>
                  <button className="block w-full py-4 text-center cursor-pointer font-bold" onClick={() => handleFilteredData("전체", "전체", "전체결과")}>전체보기</button>
                </div>
                <div className="p-4 border-t border-t-[#DEDEDE]">
                  {/* 인물별 보기 */}
                  <div className="mb-8">
                    <h4 className="font-bold mb-1">인물별 보기</h4> 
                    <ul className="whitespace-nowrap overflow-x-auto scroll-smooth scrollbar-hide">
                      {candidateList.map((item, index) => (
                        <li 
                          key={index}
                          className="inline-block mr-2 cursor-pointer text-center"
                          onClick={() => handleFilteredData("인물", item.name, "전체결과")}
                        >
                          <button className={`py-2 px-5 border rounded-full ${selectedLegend === item.name ? "border-[#6463FF] bg-[#F1F1F9]" : "border-[#D9D9D9]"}`}>{item.name}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* 정당별 보기 */}
                  <div className="mb-8">
                    <h4 className="font-bold mb-1">정당별 보기</h4> 
                    <ul className="whitespace-nowrap overflow-x-auto scroll-smooth scrollbar-hide">
                      {partyList.map((item, index) => (
                        <li 
                          key={index}
                          className="inline-block mr-2 cursor-pointer text-center"
                          onClick={() => handleFilteredData("정당", item.name, "전체결과")}
                        >
                          <button className={`py-2 px-5 border rounded-full ${selectedLegend === item.name ? "border-[#6463FF] bg-[#F1F1F9]" : "border-[#D9D9D9]"}`}>{item.name}</button>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </motion.div>
            )}
          </div>
        )}


      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center py-12 pb-30">
        <ul className="flex gap-2">
          {creditList.map((item, index) => (
            <li key={index} className="text-sm">
              <span className="text-[#79797A]">{item.name}</span> <span className="font-semibold">{item.person}</span>
              {index !== creditList.length - 1 && <span className="mx-1"> |</span>}
            </li>
          ))}
        </ul>

      </footer>
    </div>
  );
}
