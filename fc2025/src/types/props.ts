export type CardProps = {
  name: string;
  party: string;
  claim: string;
  result: string;
  resultDetails: string[];
  position: string;
  relatedArticleUrl: string,
  originalUrl: string,
  selectedCategory: string,
  selectedLegend: string,
  selectedResult: string,
  resultList: {name: string, color: string}[],
  handleFilteredData: (category: string, legend: string, result: string) => void;
}