import { useState } from 'react';
import { FiAlignCenter, FiX } from 'react-icons/fi';
import { Navbar } from './Navbar';

export const Header = () => {
    const [open, setOpen] = useState(false);

    const toggleNavBar = () => {
        setOpen(!open);
    };

    return (
        <header className="bg-slate-900 stricky flex-row top-0 z-20 mx-auto w-full text-white items-center justify-center">
            <div className="flex justify-between items-center w-full h-16">
                <div className="flex items-center justify-center ml-5">
                    Seu Cliente
                </div>
                <div className="justify-end mr-5">
                    <div className="hidden lg:block">
                        <Navbar classMenuList="gap-7" />
                    </div>
                    <div>
                        <button
                            className="text-white focus:outline-none lg:hidden"
                            onClick={toggleNavBar}
                        >
                            {open ? (
                                <FiX className="size-7" />
                            ) : (
                                <FiAlignCenter className="size-7" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`flex items-center justify-center transition-all duration-800 ease-in-out ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            >
                {open ? (
                    <div className="flex lg:hidden mb-5">
                        <Navbar classMenuList="gap-7 items-center justify-center flex-col" />
                    </div>
                ) : null}
            </div>
        </header>
    );
};
