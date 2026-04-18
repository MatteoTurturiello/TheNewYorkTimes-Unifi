import React, { useContext, createContext, useState } from 'react'
import type { AnyChildren } from '../../types/AnyChildren';

export type CSSSizeValue = `${number}px` | `${number}em` | `${number}rem`;
export type HexPixelValue = `#${string}`

export interface ThemeColor {
    primary: HexPixelValue;
    primaryActive: HexPixelValue;
    background: HexPixelValue;
    label: HexPixelValue;
}

export interface ThemeSpacing {
    small: CSSSizeValue;
    medium: CSSSizeValue;
    large: CSSSizeValue;
}

export interface FontSize {
    smaller: CSSSizeValue;
    small: CSSSizeValue;
    regular: CSSSizeValue;
    medium: CSSSizeValue;
    prominent: CSSSizeValue;
    large: CSSSizeValue;
    xl: CSSSizeValue;
}

export interface TextStyle {
    fontSize: CSSSizeValue
    fontWeight: number
    fontFamily: string
}

export interface FontWeight {
    regular: number;
    medium: number;
    bold: number;
}

interface LabelText {
    title: TextStyle,
    subtitle: TextStyle,
    secondaryHeadline: TextStyle,
    body: TextStyle,
    header: TextStyle,
    section: TextStyle,
    prominent: TextStyle,
    callout: TextStyle,
    caption: TextStyle,
}

export interface AppTheme {
    color: ThemeColor,
    spacing: ThemeSpacing,
    fontSize: FontSize,
    fontWeight: FontWeight,
    textStyle: LabelText
}


function createTheme(
    colors: ThemeColor,
    spacing: ThemeSpacing,
    fontSize: FontSize,
    fontWeight: FontWeight
): AppTheme {
    return {
        color: colors,
        spacing: spacing,
        fontSize: fontSize,
        fontWeight: fontWeight,
        textStyle: {
            caption: {
                fontSize: fontSize.smaller,
                fontWeight: fontWeight.regular,
                fontFamily: 'Noto Sans'
            },

            body: {
                fontSize: fontSize.regular,
                fontWeight: fontWeight.regular,
                fontFamily: 'Noto Sans',
            },

            secondaryHeadline: {
                fontSize: fontSize.regular,
                fontWeight: fontWeight.medium,
                fontFamily: 'Noto Sans'
            },

            callout: {
                fontSize: fontSize.medium,
                fontWeight: fontWeight.medium,
                fontFamily: 'Noto Sans'
            },

            subtitle: {
                fontSize: fontSize.medium,
                fontWeight: fontWeight.medium,
                fontFamily: 'Noto Sans'
            },

            header: {
                fontSize: fontSize.regular,
                fontWeight: fontWeight.bold,
                fontFamily: 'Noto Sans',
            },

            section: {
                fontSize: fontSize.prominent,
                fontWeight: fontWeight.regular,
                fontFamily: 'Noto Sans',
            },

            prominent: {
                fontSize: fontSize.prominent,
                fontWeight: fontWeight.bold,
                fontFamily: 'Noto Sans'
            },

            title: {
                fontSize: fontSize.xl,
                fontWeight: fontWeight.bold,
                fontFamily: 'Noto Sans'
            },
        }
    }
}

const newyorktimesTheme: AppTheme = createTheme(
    /*color:*/ {
        primary: '#7d161e',
        primaryActive: '#c81632',
        background: '#FFFFFF',
        label: '#0a0908'
    },

    /*spacing:*/ {
        small: '4px',
        medium: '16px',
        large: '16px'
    },

    /*fontSize:*/ {
        smaller: '12px',
        small: '13.44px',
        regular: "15px",
        medium: '0.9375em',
        prominent: '20px',
        large: '24px',
        xl: '29px',
    },

    /*fontWeight:*/ {
        regular: 400,
        medium: 600,
        bold: 700
    }
)


const ThemeContext = createContext<AppTheme>(newyorktimesTheme)

export const ThemeContextProvider: React.FC<AnyChildren> = (props) => {
    return (
        <ThemeContext.Provider value={newyorktimesTheme}>
            { props.children }
        </ThemeContext.Provider>
    )
}

export function useTheme() : AppTheme {
    const theTheme = useContext(ThemeContext)

    if (!theTheme) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return theTheme;
}