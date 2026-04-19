import React from 'react';
import { useScreenWidth } from '../../Screen/UseScreenWidth';
import { Breakpoint } from '../../Screen/Breakpoint';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';

interface MenuItem {
    title: string;
    items: string[];
}

interface HeaderProps {
    menuItems: MenuItem[];
    logo: string;
    language: 'en' | 'it';
    onLanguageToggle: (newLanguage: 'en' | 'it') => void;
}

export const Header: React.FC<HeaderProps> = (props) => {
    const breakpoint = useScreenWidth();
    const isLargeScreen = breakpoint >= Breakpoint.tablet;

    return isLargeScreen ? (
        <HeaderDesktop {...props} />
    ) : (
        <HeaderMobile {...props} />
    );
};
