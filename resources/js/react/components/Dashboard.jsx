import React, { useState } from "react";
import { Link } from "react-router";
import logo from '../../../images/logo.png';

import { menuConfig } from "../config/menuConfig";
import PanelComponent from "./PanelComponent";

export default function Dashboard({ child }) {
    
    const [sidebarOpen, setSidebarOpen]     = useState(false);
    const [userMenuOpen, setUserMenuOpen]   = useState(false);

    return (
        <div className="min-h-screen bg-slate-100">
            {/* =========================================================
                TOP NAVBAR
            ========================================================== */}
            <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
                <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-3">
                        {/* Mobile sidebar button */}
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg
                                       text-slate-600 transition
                                       hover:bg-slate-100 hover:text-slate-900
                                       lg:hidden"
                            aria-label="Open sidebar"
                        >
                            <i className="fa fa-bars text-lg" />
                        </button>

                        {/* Logo */}
                        <Link
                            to="/dashboard/view/graphs"
                            className="flex items-center gap-3"
                        >
                            <div
                                className=" flex h-9 w-9 items-center justify-center
                                overflow-hidden rounded-lg
                                bg-white
                                shadow-sm"
                            >
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="hidden sm:block">
                                <h1 className="text-lg font-bold leading-tight text-slate-800">
                                    ELEKSI-V2
                                </h1> 

                                <p className="text-xs text-slate-400">
                                    Administration Portal
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="relative flex items-center">
                        {/* User Menu */}
                        <button
                            type="button"
                            onClick={() => setUserMenuOpen((prev) => !prev)}
                            className="flex items-center gap-2 rounded-xl border border-slate-200
                                       bg-white px-3 py-2 text-slate-600
                                       transition
                                       hover:border-slate-300
                                       hover:bg-slate-50
                                       hover:text-slate-900"
                        >
                            <span
                                className="flex h-8 w-8 items-center justify-center
                                             rounded-full bg-blue-50 text-blue-600"
                            >
                                <i className="fa fa-user" />
                            </span>

                            <span className="hidden text-sm font-medium sm:block">
                                Account
                            </span>

                            <i
                                className={`fa fa-angle-down hidden text-xs transition-transform sm:block ${
                                    userMenuOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {/* Dropdown */}
                        {userMenuOpen && (
                            <>
                                {/* Invisible backdrop */}
                                <button
                                    type="button"
                                    className="fixed inset-0 z-40 cursor-default"
                                    onClick={() => setUserMenuOpen(false)}
                                    aria-label="Close menu"
                                />

                                <div
                                    className="absolute right-0 top-12 z-50 w-52
                                               overflow-hidden rounded-xl border border-slate-200
                                               bg-white shadow-xl"
                                >
                                    <div className="border-b border-slate-100 px-4 py-3">
                                        <p className="text-sm font-semibold text-slate-800">
                                            Account
                                        </p>

                                        <p className="text-xs text-gray-600">
                                            ELEKSI Console
                                        </p>
                                    </div>

                                    <form method="POST" action="/logout">
                                        <button
                                            type="submit"
                                            className="flex w-full items-center gap-3 px-4 py-3
                                                       text-left text-sm text-slate-600
                                                       transition
                                                       hover:bg-red-50 hover:text-red-600"
                                        >
                                            <i className="fa fa-sign-out-alt w-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* =========================================================
                MOBILE SIDEBAR OVERLAY
            ========================================================== */}
            {sidebarOpen && (
                <button
                    type="button"
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar"
                />
            )}

            {/* =========================================================
                SIDEBAR
            ========================================================== */}
            <aside
                className={`
                    fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
                    bg-[#121358]
                    shadow-2xl
                    transition-transform duration-300 ease-in-out

                    lg:translate-x-0

                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Sidebar Header */}
                <div
                    className="flex h-16 items-center justify-between
                                border-b border-slate-100 px-5"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="flex h-9 w-9 items-center justify-center
                                        overflow-hidden rounded-lg bg-blue-50"
                        >
                            <img
                                src={logo}
                                alt="PIEP"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div>
                            <p className="text-sm font-bold text-white">
                                ELEKSI Console
                            </p>

                            <p className="text-[11px] text-slate-400">
                                Navigation
                            </p>
                        </div>
                    </div>

                    {/* Mobile close */}
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="flex h-9 w-9 items-center justify-center
                                   rounded-lg text-slate-500
                                   hover:bg-slate-100 hover:text-slate-800
                                   lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <i className="fa fa-times" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-3 py-5">
                    <p
                        className="mb-3 px-3 text-[10px] font-bold uppercase
                                  tracking-widest text-slate-400"
                    >
                        Main Menu
                    </p>

                    <div className="space-y-1">
                        {menuConfig.map((item, i) => (
                            <PanelComponent key={i} i={i} item={item} />
                        ))}
                    </div>
                </nav>

                {/* Sidebar Footer */}
                <div className="border-t border-slate-100 p-4">
                    <div className="rounded-xl bg-slate-50 p-3">
                        <div className="flex items-center gap-3">
                            <div
                                className="flex h-9 w-9 items-center justify-center
                                            rounded-lg bg-blue-100 text-blue-600"
                            >
                                <i className="fa fa-shield-alt" />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-xs font-semibold text-slate-700">
                                    ELEKSI Administration
                                </p>

                                <p className="text-[10px] text-slate-400">
                                    Console v1.0
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* =========================================================
                MAIN CONTENT
            ========================================================== */}
            <main className="min-h-screen pt-16 lg:pl-72">
                <div className="p-4 sm:p-6 lg:p-8">
                    <div
                        className="min-h-[calc(100vh-7rem)] rounded-2xl
                                    border border-slate-200 bg-white
                                    p-4 shadow-sm
                                    sm:p-6 lg:p-8"
                    >
                        {child}
                    </div>
                </div>
            </main>
        </div>
    );
}
