import React, { createContext, useContext, useEffect, useState } from "react";
import { Breakpoint } from "./Breakpoint.tsx";
import type { AnyChildren } from "../types/AnyChildren";


const ScreenWidthContext = createContext<Breakpoint | null>(null);

export const ScreenWidthProvider: React.FC<AnyChildren> = (props) => {
    const makeBreakpointFromWidth: (arg0: number) => Breakpoint = (width: number) => {
        if (width < 640) {
            return Breakpoint.mobile
        } else {
            if (width < 800) {
                return Breakpoint.phablet
            } else if (width < 1024) {
                return Breakpoint.tablet
            } else if (width < 1280) {
                return Breakpoint.laptop
            } else {
                return Breakpoint.desktop
            }
        }
    }

    const [screenWidth, setScreenWidth] = useState<Breakpoint>(
        () => {
            return makeBreakpointFromWidth(window.innerWidth)
        }
    );


    useEffect(() => {
        const handleWindowResize: (arg0: UIEvent) => void = (event: UIEvent)  => {
            setScreenWidth(makeBreakpointFromWidth(window.innerWidth));
        }

        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, [])


    return <ScreenWidthContext.Provider value={screenWidth}>
        {props.children}
    </ScreenWidthContext.Provider>;
};


export function useScreenWidth(): Breakpoint {
  const context = useContext(ScreenWidthContext);

  if (context === null) {
    throw new Error("useScreenWidth must be used within a ScreenWidthProvider");
  } 

  return context;
}