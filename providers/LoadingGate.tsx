import { createContext, useContext, useState } from "react";

interface LoadedGateContextType {
  loaded: boolean;
  setLoadingPercent: (percent: number) => void;
}

const LoadingContext = createContext<LoadedGateContextType>({ loaded: false, setLoadingPercent: () => {} });

const LoadingGate = ({ children }: { children: React.ReactNode }) => {
  const [loadingPercent, setLoadingPercent] = useState<number>(2);
  return (
    <LoadingContext.Provider value={{ loaded: loadingPercent >= 0.99, setLoadingPercent }}>
      {loadingPercent < 0.99 && (
        <div className="loading-overlay fullBleed">
          <div>
            ｡*◇☆*｡ﾟ <br />
            Loading.... {Math.round(loadingPercent * 100)}%<pre></pre>
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingGate;

export const useSetLoadingPercent = () => {
  const { setLoadingPercent } = useContext(LoadingContext);
  return  { setLoadingPercent: (n: number) => {return}};
};

export const useLoaded = () => {
  const { loaded } = useContext(LoadingContext);
  return { loaded };
};
