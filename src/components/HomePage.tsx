import NewsApi from "./newsApiOutput";
import AiNews from "./aiNewsOutput";
import NyTimes from "./nytimesOutput";
import SearchField from "./searchField";
import { useMainContext } from "../context/mainContext";
import { useEffect, useState } from "react";
import CustomizePopup from "./customizePopup";

function HomePage() {
  const { isLoading, showCustomize, setShowCustomize } = useMainContext();
  const [newsComponents, setNewsComponents] = useState<JSX.Element[]>([]); // Save components here to render if there is no loading state
  // const [showCustomize, setShowCustomize] = useState<boolean>(false);
  /**
   * Rendering components like this to avoid infinit
   * re-rendering that i faced without using useEffect hook
   */
  useEffect(() => {
    if (!isLoading) {
      setNewsComponents([
        <NewsApi key="nyTimes" />,
        <AiNews key="ai-news" />,
        <NyTimes key="nyTimes" />,
      ]);
    }
  }, [isLoading]);

  function handleCustomizeClick() {
    setShowCustomize(!showCustomize);
  }
  console.log(showCustomize);

  return (
    <>
      {isLoading && (
        <div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          role="status"
        >
          <svg
            aria-hidden="true"
            className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      <div className="flex flex-row justify-center items-center space-x-5">
        <SearchField query={""} />
        <button
          className="outline-none stroke-none bg-green-50 px-3 py-2 rounded-lg border-2 border-green-300 flex flex-row justify-center items-center space-x-3"
          onClick={handleCustomizeClick}
        >
          <svg
            className="w-5 h-5"
            width="35"
            height="36"
            viewBox="0 0 35 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.2911 0.4665C19.9709 0.171995 18.6237 0.0156528 17.2711 0C15.8871 0.016 14.5351 0.1715 13.2151 0.4665C12.933 0.528914 12.6776 0.678297 12.4849 0.89359C12.2922 1.10888 12.172 1.37923 12.1411 1.6665L11.8276 4.482C11.7827 4.87912 11.6454 5.26021 11.4268 5.59477C11.2081 5.92932 10.9142 6.20805 10.5686 6.40866C10.2229 6.60926 9.83508 6.72617 9.43613 6.75002C9.03719 6.77387 8.6382 6.704 8.2711 6.546L5.6911 5.4105C5.42923 5.29521 5.13799 5.26417 4.8577 5.32168C4.57741 5.37919 4.32192 5.5224 4.1266 5.7315C2.26072 7.72812 0.87145 10.1215 0.0631015 12.732C-0.0229692 13.0068 -0.0209431 13.3016 0.0688961 13.5751C0.158735 13.8487 0.331888 14.0873 0.564102 14.2575L2.8546 15.945C3.17706 16.1819 3.43924 16.4914 3.61994 16.8484C3.80065 17.2054 3.89481 17.5999 3.89481 18C3.89481 18.4001 3.80065 18.7946 3.61994 19.1516C3.43924 19.5086 3.17706 19.8181 2.8546 20.055L0.564102 21.747C0.332187 21.9171 0.159229 22.1555 0.0694036 22.4287C-0.020422 22.702 -0.0226255 22.9964 0.0631015 23.271C0.871454 25.883 2.25951 28.2787 4.1236 30.279C4.31874 30.4883 4.57415 30.6318 4.85445 30.6896C5.13475 30.7474 5.42608 30.7166 5.6881 30.6015L8.2801 29.463C8.64523 29.3043 9.04243 29.2333 9.43992 29.2558C9.8374 29.2782 10.2241 29.3933 10.5691 29.592C11.2681 29.997 11.7346 30.7095 11.8261 31.5135L12.1381 34.329C12.1688 34.6124 12.2865 34.8794 12.4751 35.0932C12.6636 35.3069 12.9138 35.4571 13.1911 35.523C15.8604 36.1577 18.6413 36.1577 21.3106 35.523C21.5879 35.4571 21.8381 35.3069 22.0266 35.0932C22.2152 34.8794 22.3329 34.6124 22.3636 34.329L22.6756 31.509C22.7179 31.1116 22.8534 30.7299 23.0711 30.3947C23.2888 30.0596 23.5825 29.7806 23.9283 29.5803C24.2741 29.3801 24.6623 29.2643 25.0613 29.2423C25.4603 29.2204 25.8589 29.2929 26.2246 29.454L28.8151 30.5925C29.0771 30.7076 29.3685 30.7384 29.6488 30.6806C29.9291 30.6228 30.1845 30.4793 30.3796 30.27C32.2427 28.2718 33.6307 25.8789 34.4401 23.2695C34.5262 22.9947 34.5241 22.6999 34.4343 22.4264C34.3445 22.1528 34.1713 21.9142 33.9391 21.744L31.6516 20.055C31.3291 19.8182 31.0668 19.5088 30.8859 19.1519C30.7051 18.795 30.6108 18.4005 30.6106 18.0004C30.6105 17.6003 30.7045 17.2057 30.8851 16.8486C31.0657 16.4916 31.3277 16.182 31.6501 15.945L33.9376 14.2545C34.1693 14.0842 34.3419 13.8457 34.4315 13.5725C34.521 13.2993 34.523 13.0049 34.4371 12.7305C33.6292 10.1202 32.2404 7.72677 30.3751 5.73C30.1798 5.5209 29.9243 5.37769 29.644 5.32018C29.3637 5.26267 29.0725 5.29371 28.8106 5.409L26.2306 6.5445C25.9091 6.68598 25.5618 6.75952 25.2106 6.7605C24.5821 6.75968 23.9761 6.52681 23.5088 6.10657C23.0415 5.68634 22.7459 5.10835 22.6786 4.4835L22.3636 1.665C22.3326 1.3784 22.2127 1.10869 22.0206 0.893734C21.8285 0.678782 21.5724 0.529379 21.2911 0.4665ZM17.2516 24C15.6603 24 14.1342 23.3679 13.009 22.2426C11.8837 21.1174 11.2516 19.5913 11.2516 18C11.2516 16.4087 11.8837 14.8826 13.009 13.7574C14.1342 12.6321 15.6603 12 17.2516 12C18.8429 12 20.369 12.6321 21.4942 13.7574C22.6195 14.8826 23.2516 16.4087 23.2516 18C23.2516 19.5913 22.6195 21.1174 21.4942 22.2426C20.369 23.3679 18.8429 24 17.2516 24Z"
              fill="#22c55e"
            />
          </svg>
          <p className="font-semibold text-green-500">Customize</p>
        </button>
      </div>
      {newsComponents}
      {showCustomize && <CustomizePopup />}
    </>
  );
}

export default HomePage;
