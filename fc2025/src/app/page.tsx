'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/Card";
import data from "@/data/data.json";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -2 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }, // 부드럽고 느긋하게
  },
};

const partyList = [
  {name: "국민의힘", color: "red"},
  {name: "더불어민주당", color: "blue"},
  {name: "개혁신당", color: "orange"},
]
const candidateList = [
  {name: "홍준표", party: "국민의힘"},
  {name: "이재명", party: "더불어민주당"},
  {name: "이준석", party: "개혁신당"},
  {name: "나경원", party: "국민의힘"},
  {name: "전광훈", party: "자유통일당"},
  {name: "한동훈", party: "국민의힘"},
]
const resultList = [
  {result: "거짓", color: "black"},
  {result: "대체로 거짓", color: "navy"},
  {result: "판단 보류", color: "blue"},
  {result: "대체로 사실", color: "blue"},
  {result: "사실", color: "skyblue"},
]

export default function Home() {
  
  // 데이터 상태 관리
  const [filteredData, setFilteredData] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedLegend, setselectedLegend] = useState("전체");
  const [animationKey, setAnimationKey] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

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

  

  return (
    <div className="grid">
      <main>
        {/* 메인로고 */}
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

        {/* 상단 */}
        <div className="max-w-[1180px] mx-auto p-6 flex justify-between border border-[#D9D9D9] rounded-3xl">
          <div className="">
            <h1 className="text-2xl font-black">2025 대선 팩트체크</h1>
            <h2 className="text-lg font-bold">{selectedCategory} : {selectedLegend}</h2>
          </div>
          <div className=" grid grid-cols-5 gap-4">
            {resultList.map((item, index) => (
              <div key={index}>
                <h3 className="rounded-sm text-center text-[#79797A]">{item.result}</h3>
                <p className="text-center font-bold text-[50px]">{filteredData.filter(data => data.result === item.result ).length}</p>
              </div>
            ))}
          </div>
        </div>


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
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* 카드 그리드 끝 */}

        {/* 필터 */}
        <div className="fixed w-full bottom-0 flex justify-center-safe py-8 backdrop-blur-xs">
          <div className="max-w-[640px] flex justify-center-safe gap-8">
            <div>
              <button className="block w-full p-2 border border-gray-400 rounded-sm shadow cursor-pointer" onClick={() => handleFilteredData("전체", "전체")}>전체 보기</button>              
            </div>
            <div className="mt-4">
                <h3 className="font-black">인물별 보기</h3>
              <ul className="flex flex-wrap gap-2">
                {candidateList.map((item, index) => (
                  <li key={index} className="flex-col">
                    <button className="p-2 border mt-2 cursor-pointer bg-white" onClick={() => handleFilteredData("인물", item.name)}>{item.name}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="font-black">정당별 보기</h3>
              <ul className="flex flex-wrap gap-2">
                {partyList.map((item, index) => (
                  <li key={index} className="flex-col">
                    <button className="p-2 border mt-2 cursor-pointer bg-white" onClick={() => handleFilteredData("정당", item.name)}>{item.name}</button>
                  </li>
                ))}
              </ul>
            </div>

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
